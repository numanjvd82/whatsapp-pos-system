// import { z } from 'zod';
// import { TRPCError } from '@trpc/server';
// import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';

// // Zod schemas for validation
// const ItemCategorySchema = z.enum(['FOOD', 'BEVERAGES', 'DESSERTS']);

// export const itemsRouter = createTRPCRouter({
//   getAll: publicProcedure.query(async ({ ctx }) => {
//     const items = await ctx.prisma.item.findMany({
//       orderBy: { createdAt: 'desc' },
//     });
//     return items;
//   }),

//   getById: publicProcedure
//     .input(z.object({ id: z.string() }))
//     .query(async ({ input, ctx }) => {
//       const item = await ctx.prisma.item.findUnique({
//         where: { id: input.id },
//       });

//       if (!item) {
//         throw new TRPCError({
//           code: 'NOT_FOUND',
//           message: 'Item not found',
//         });
//       }

//       return item;
//     }),

//   create: publicProcedure
//     .input(
//       z.object({
//         name: z.string().min(1, 'Name is required'),
//         price: z.number().positive('Price must be positive'),
//         category: ItemCategorySchema,
//         description: z.string().optional(),
//         imageUrl: z.string().url().optional(),
//       }),
//     )
//     .mutation(async ({ input, ctx }) => {
//       const item = await ctx.prisma.item.create({
//         data: {
//           name: input.name,
//           price: input.price,
//           category: input.category,
//           description: input.description,
//           imageUrl: input.imageUrl,
//         },
//       });
//       return item;
//     }),

//   update: publicProcedure
//     .input(
//       z.object({
//         id: z.string(),
//         name: z.string().min(1, 'Name is required').optional(),
//         price: z.number().positive('Price must be positive').optional(),
//         category: ItemCategorySchema.optional(),
//         description: z.string().optional(),
//         imageUrl: z.string().url().optional(),
//         inStock: z.boolean().optional(),
//       }),
//     )
//     .mutation(async ({ input, ctx }) => {
//       const { id, ...updateData } = input;

//       try {
//         const item = await ctx.prisma.item.update({
//           where: { id },
//           data: updateData,
//         });
//         return item;
//       } catch {
//         throw new TRPCError({
//           code: 'NOT_FOUND',
//           message: 'Item not found',
//         });
//       }
//     }),

//   delete: publicProcedure
//     .input(z.object({ id: z.string() }))
//     .mutation(async ({ input, ctx }) => {
//       try {
//         const item = await ctx.prisma.item.delete({
//           where: { id: input.id },
//         });
//         return item;
//       } catch {
//         throw new TRPCError({
//           code: 'NOT_FOUND',
//           message: 'Item not found',
//         });
//       }
//     }),

//   toggleStock: publicProcedure
//     .input(z.object({ id: z.string() }))
//     .mutation(async ({ input, ctx }) => {
//       const item = await ctx.prisma.item.findUnique({
//         where: { id: input.id },
//       });

//       if (!item) {
//         throw new TRPCError({
//           code: 'NOT_FOUND',
//           message: 'Item not found',
//         });
//       }

//       const updatedItem = await ctx.prisma.item.update({
//         where: { id: input.id },
//         data: { inStock: !item.inStock },
//       });

//       return updatedItem;
//     }),
// });
