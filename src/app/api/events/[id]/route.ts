import { readEvents, writeEvents } from '@/utils/fileHandler';
import { updateEventSchema } from '@/types/schemas';

type Params = {
    id: string;
}

export async function GET(req: Request, { params: { id }}: { params: Params }) {
    try {
        const events = await readEvents();
        const event = events.find((obj) => obj.id === id);

        if (!event) {
            return Response.json({ message: 'Event not found', code: 404, success: false }, { status: 404 });
        }

        return Response.json({ data: event, message: 'Event found', code: 200, success: true }, { status: 200 });
    } catch(err) {
        console.error(err);
        return Response.json({ message: 'Error fetching event', code: 500, success: false }, { status: 500 });
    }
}

export async function PUT(req: Request, { params: { id }}: { params: Params }) {
    try {
        const events = await readEvents();
        const body = await req.json();

        if (!body) {
            return Response.json({ message: 'No event data provided', code: 400, success: false }, { status: 400 });
        }

        const index = events.findIndex((obj) => obj.id === id);

        if (index === -1) {
            return Response.json({ message: 'Event not found', code: 404, success: false }, { status: 404 });
        }

        const parsedData = updateEventSchema.safeParse(body);

        if (!parsedData.success) {
            return Response.json({ message: 'Invalid event data', code: 400, success: false }, { status: 400 });
        }

        const newEvent = { ...events[index], ...parsedData.data };

        events[index] = newEvent;
        await writeEvents(events);
        return Response.json({ data: newEvent, message: 'Event updated successfully', code: 200, success: true }, { status: 200 });
    } catch(err) {
        console.error(err);
        return Response.json({ message: 'Error updating event', code: 500, success: false }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params: { id }}: { params: Params }) {
    try {
        const events = await readEvents();
        const index = events.findIndex((obj) => obj.id === id);

        if (index === -1) {
            return Response.json({ message: 'Event not found', code: 404, success: false }, { status: 404 });
        }

        events.splice(index, 1);
        await writeEvents(events);
        return Response.json({ message: 'Event deleted successfully', code: 200, success: true }, { status: 200 });
    } catch(err) {
        console.error(err);
        return Response.json({ message: 'Error deleting event', code: 500, success: false }, { status: 500 });
    }
}