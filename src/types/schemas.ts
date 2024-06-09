import { z } from 'zod';

export const createEventSchema = z.object({
    title: z.string(),
    description: z.string(),
    totalParticipants: z.number(),
    startDate: z.string(),
    endDate: z.string(),
});

export const updateEventSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    totalParticipants: z.number().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
});