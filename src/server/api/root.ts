import { createTRPCRouter } from "~/server/api/trpc";
import { generateRouter } from "~/server/api/routers/generate";
import { checkoutRouter } from "~/server/api/routers/checkout";
import { userRouter } from "./routers/user";



/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  generate: generateRouter,
  checkout: checkoutRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
