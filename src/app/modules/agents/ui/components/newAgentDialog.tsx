import { ResponsiveDialogue } from "@/components/responsiveDialogue";
import { AgentForm } from "./agentForm";
interface NewAgentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export const NewAgentDialog = ({ open, onOpenChange }: NewAgentDialogProps) => {
  return (
    <ResponsiveDialogue
      open={open}
      onOpenChange={onOpenChange}
      title="New Agent"
      description="Create a new agent"
    >
      <AgentForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
      />
    </ResponsiveDialogue>
  );
};
