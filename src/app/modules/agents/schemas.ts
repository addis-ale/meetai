import { z } from "zod";
export const agentsInsertSchema = z.object({
  name: z.string().min(1, { message: "Agent name must be provided" }),
  instructions: z
    .string()
    .min(1, { message: "Agent instructions must be provided" }),
});
