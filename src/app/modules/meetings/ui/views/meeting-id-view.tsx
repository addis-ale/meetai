"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { ErrorState } from "@/components/errorState";
import { LoadingState } from "@/components/loadingState";
import { useTRPC } from "@/trpc/client";
import { MeetingIdViewHeader } from "../components/meetingIdViewHeader";
import { useConfirm } from "@/hooks/use-confirm";
import { UpdateMeetingDialog } from "../components/updateMeetingDialog";
import { UpcomingState } from "../components/upcomingState";
import { ActiveState } from "../components/activeState";
import { CancelledState } from "../components/cancelledState";
import { ProcessingState } from "../components/processingState";

interface Props {
  meetingId: string;
}
export const MeetingIdView = ({ meetingId }: Props) => {
  const [updateAgentDialogOpen, setUpdateAgentDialogOpen] = useState(false);
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({
      id: meetingId,
    })
  );
  const removeMeeting = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({})
        );
        //TODO: invalidate free tier usage
        router.push("/meetings");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );
  const [RemoveConfirmation, confirmRemove] = useConfirm(
    "Are you sure?",
    `The following action will remove this meeting.`
  );
  const handleRemoveMeeting = async () => {
    const ok = await confirmRemove();
    if (!ok) return;
    await removeMeeting.mutateAsync({ id: meetingId });
  };
  const isActive = data.status === "active";
  const isUpcoming = data.status === "upcoming";
  const isCancelled = data.status === "cancelled";
  const isCompleted = data.status === "completed";
  const isProcessing = data.status === "processing";
  return (
    <>
      <RemoveConfirmation />
      <UpdateMeetingDialog
        open={updateAgentDialogOpen}
        onOpenChange={setUpdateAgentDialogOpen}
        initialValues={data}
      />
      <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <MeetingIdViewHeader
          meetingId={meetingId}
          onEdit={() => setUpdateAgentDialogOpen(true)}
          onRemove={handleRemoveMeeting}
          meetingName={data.name}
        />
        {isCancelled && <CancelledState />}
        {isProcessing && <ProcessingState />}
        {isCompleted && <div>Completed</div>}
        {isActive && <ActiveState meetingId={meetingId} />}
        {isUpcoming && (
          <UpcomingState
            meetingId={meetingId}
            isCancelling={false}
            onCancelMeeting={() => {}}
          />
        )}
      </div>
    </>
  );
};

export const MeetingIdViewLoading = () => {
  return (
    <LoadingState
      title="Loading Meeting"
      description="This may take a few seconds"
    />
  );
};
export const MeetingIdViewError = () => {
  return (
    <ErrorState
      title="Error Loading Meeting"
      description="Something went wrong please try again..."
    />
  );
};
