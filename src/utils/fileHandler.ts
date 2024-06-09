import path from 'path';
import { promises as fs } from 'fs';
import { IEvent } from "@/types/event"

export const filePath = path.join(process.cwd(), 'data', 'events.json');

export const readEvents = async (): Promise<IEvent[]> => {
    try {
        const data = await fs.readFile(filePath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        throw error
    }
  };

export const writeEvents = async (events: IEvent[]) => {
    try {
        await fs.writeFile(filePath, JSON.stringify(events, null, 2));
    } catch (error) {
        throw error;
    }
};