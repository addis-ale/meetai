"use client";
import { useState } from "react";
import { useTRPC } from "@/trpc/client";
import { useMeetingsFilter } from "../../hooks/use-meetings-filters";
import { useQuery } from "@tanstack/react-query";
import { CommandSelect } from "@/components/command-select";
import { GeneratedAvatar } from "@/components/generatedAvatar";
export const AgentIdFilter = () => {
  const [filter, setFilters] = useMeetingsFilter();
  const trpc = useTRPC();
  const [agentSearch, setAgentSearch] = useState("");
  const { data } = useQuery(
    trpc.agents.getMany.queryOptions({ pageSize: 100, search: agentSearch })
  );
  return (
    <CommandSelect
      className="h-9"
      placeholder="Agent"
      options={(data?.items ?? []).map((agent) => ({
        id: agent.id,
        value: agent.id,
        children: (
          <div className="flex items-center gap-x-2">
            <GeneratedAvatar
              className="size-4"
              seed={agent.name}
              variant="bottsNeutral"
            />
            {agent.name}
          </div>
        ),
      }))}
      onSelect={(value) => setFilters({ agentId: value })}
      onSearch={setAgentSearch}
      value={filter.agentId}
    />
  );
};
