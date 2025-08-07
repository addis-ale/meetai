"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon, XCircle } from "lucide-react";
import { DEFAULT_PAGE } from "@/constants";
import { NewAgentDialog } from "./newAgentDialog";
import { useState } from "react";
import { useAgentsFilters } from "../../hooks/use-agents-filters";
import { AgentsSearchFilter } from "./agentsSearchFilters";
export const ListHeader = () => {
  const [filters, setFilters] = useAgentsFilters();
  const [dialogOpen, setIsDialogOpen] = useState(false);
  const isFiltesModified = !!filters.search;
  const onClearFilters = () => {
    setFilters({ search: "", page: DEFAULT_PAGE });
  };
  return (
    <>
      <NewAgentDialog open={dialogOpen} onOpenChange={setIsDialogOpen} />
      <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h5 className="font-medium text-xl">My Agents</h5>
          <Button onClick={() => setIsDialogOpen(true)}>
            <PlusIcon />
            New Agent
          </Button>
        </div>
        <div className="flex items-center gap-x-2 p-1 ">
          <AgentsSearchFilter />
          {isFiltesModified && (
            <Button variant={"outline"} onClick={onClearFilters}>
              <XCircle />
              Clear
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
