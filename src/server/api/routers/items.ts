import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';

// Sample data for demonstration
const items = [
  { id: '1', name: 'Coffee', price: 5.99, category: 'beverages' },
  { id: '2', name: 'Sandwich', price: 8.99, category: 'food' },
  { id: '3', name: 'Tea', price: 3.99, category: 'beverages' },
];

export const itemsRouter = createTRPCRouter({
  getAll: publicProcedure.query(() => {
    return items;
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      const item = items.find((item) => item.id === input.id);
      if (!item) {
        throw new Error('Item not found');
      }
      return item;
    }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1, 'Name is required'),
        price: z.number().positive('Price must be positive'),
        category: z.enum(['food', 'beverages', 'desserts']),
      }),
    )
    .mutation(({ input }) => {
      const newItem = {
        id: (items.length + 1).toString(),
        ...input,
      };
      items.push(newItem);
      return newItem;
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1, 'Name is required').optional(),
        price: z.number().positive('Price must be positive').optional(),
        category: z.enum(['food', 'beverages', 'desserts']).optional(),
      }),
    )
    .mutation(({ input }) => {
      const itemIndex = items.findIndex((item) => item.id === input.id);
      if (itemIndex === -1) {
        throw new Error('Item not found');
      }

      const updatedItem = {
        ...items[itemIndex],
        ...input,
      };
      items[itemIndex] = updatedItem;
      return updatedItem;
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input }) => {
      const itemIndex = items.findIndex((item) => item.id === input.id);
      if (itemIndex === -1) {
        throw new Error('Item not found');
      }

      const deletedItem = items.splice(itemIndex, 1)[0];
      return deletedItem;
    }),
});
