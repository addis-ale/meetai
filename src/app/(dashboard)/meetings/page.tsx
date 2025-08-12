import { Suspense } from "react";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { ErrorBoundary } from "react-error-boundary";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import {
  MeetingsView,
  MeetingsViewError,
  MeetingsViewLoading,
} from "@/app/modules/meetings/ui/views/meeting-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { auth } from "@/lib/auth";
import { MeetingsListHeader } from "@/app/modules/meetings/ui/components/meetingListHeader";
import { SearchParams } from "nuqs";
import { loadSearchParams } from "@/app/modules/meetings/params";
interface Props {
  seachParams: Promise<SearchParams>;
}
const MeeetingsPage = async ({ seachParams }: Props) => {
  const filters = await loadSearchParams(seachParams);
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/sign-in");
  }
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.meetings.getMany.queryOptions({ ...filters })
  );
  return (
    <>
      <MeetingsListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<MeetingsViewLoading />}>
          <ErrorBoundary fallback={<MeetingsViewError />}>
            <MeetingsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default MeeetingsPage;
