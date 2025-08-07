import { eq, getTableColumns, sql } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { agents } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { agentsInsertSchema } from "../schemas";
export const agentsRouter = createTRPCRouter({
  // TODO: change getone to use protectedProcedure
  getOne: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const [existingAgent] = await db
        .select({ meetingCount: sql<number>`5`, ...getTableColumns(agents) })
        .from(agents)
        .where(eq(agents.id, input.id));
      console.log("existing Agent", existingAgent);
      return existingAgent;
    }),
  // TODO: change getmany to use protectedProcedure
  getMany: protectedProcedure.query(async () => {
    const data = await db
      .select({ meetingCount: sql<number>`5`, ...getTableColumns(agents) })
      .from(agents);
    return data;
  }),
  create: protectedProcedure
    .input(agentsInsertSchema)
    .mutation(async ({ input, ctx }) => {
      const [createdAgent] = await db
        .insert(agents)
        .values({
          ...input,
          userId: ctx.auth.user.id,
        })
        .returning();
      return createdAgent;
    }),
});
