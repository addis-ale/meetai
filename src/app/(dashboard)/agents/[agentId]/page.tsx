import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { getQueryClient, trpc } from "@/trpc/server";
import {
  AgentIdView,
  AgentIdViewError,
  AgentIdViewLoading,
} from "@/app/modules/agents/ui/view/agent-id-view";

interface Props {
  params: Promise<{ agentId: string }>;
}
const AgentDetailPage = async ({ params }: Props) => {
  const { agentId } = await params;
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.agents.getOne.queryOptions({ id: agentId })
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<AgentIdViewLoading />}>
        <ErrorBoundary fallback={<AgentIdViewError />}>
          <AgentIdView agentId={agentId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};

export default AgentDetailPage;
