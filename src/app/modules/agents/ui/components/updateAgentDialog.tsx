import { ResponsiveDialogue } from "@/components/responsiveDialogue";
import { AgentForm } from "./agentForm";
import { AgentGetOne } from "../../types";
interface UpdateAgentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: AgentGetOne;
}
export const UpdateAgentDialog = ({
  open,
  onOpenChange,
  initialValues,
}: UpdateAgentDialogProps) => {
  return (
    <ResponsiveDialogue
      open={open}
      onOpenChange={onOpenChange}
      title="Edit Agent"
      description="Edit the agent details"
    >
      <AgentForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
        initialValues={initialValues}
      />
    </ResponsiveDialogue>
  );
};
