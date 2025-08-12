import { ResponsiveDialogue } from "@/components/responsiveDialogue";

import { MeetingForm } from "./meetingForm";
import { MeetingGetOne } from "../../types";
interface UpdateMeetingDialog {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: MeetingGetOne;
}
export const UpdateMeetingDialog = ({
  open,
  onOpenChange,
  initialValues,
}: UpdateMeetingDialog) => {
  return (
    <ResponsiveDialogue
      open={open}
      onOpenChange={onOpenChange}
      title="Edit Meeting"
      description="Edit the Meeting details"
    >
      <MeetingForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
        initialValues={initialValues}
      />
    </ResponsiveDialogue>
  );
};
