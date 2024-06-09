import { readEvents, writeEvents } from '@/utils/fileHandler';
import { createEventSchema } from '@/types/schemas';

export async function GET() {
    try {
        const events = await readEvents();
        return Response.json({ data: events, message: 'Events fetched successfully', code: 200, success: true }, { status: 200 });
    } catch {
        return Response.json({ message: 'Error adding event', code: 500, success: false }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const events = await readEvents();
        const body = await req.json();

        if (!body) {
            return Response.json({ message: 'No event data provided', code: 400, success: false }, { status: 400 });
        }

        const parsedData = createEventSchema.safeParse(body);

        if (!parsedData.success) {
            return Response.json({ message: 'Invalid event data', code: 400, success: false }, { status: 400 });
        }

        const newEvent = { ...parsedData.data, id: Date.now().toString() };
        events.push(newEvent);
        await writeEvents(events);
        return Response.json({ data: newEvent, message: 'Event added successfully', code: 201, success: true }, { status: 201 });
    } catch(err) {
        console.error(err);
        return Response.json({ message: 'Error adding event', code: 500, success: false }, { status: 500 });
    }
}
