/**
 * @jest-environment node
 */
import { PUT, DELETE } from "./route";
import { readEvents } from '@/utils/fileHandler';

describe('PUT /events/:id', () => {
  it('should update an event', async () => {
    const events = await readEvents();

    const requestObj = {
        json: async () => ({
            "title": "What the sigma 2: Electric Boogaloo",
            "description": "This is a updated event",
            "totalParticipants": 70,
            "startDate": "2024-07-01",
            "endDate": "2024-07-02"
          }),
      } as any;


    const res = await PUT(requestObj, { params: { id: events[0].id } });
    const body = await res.json();

    const sucessfulResponse ={
        data: {
          id: events[0].id,
          title: 'What the sigma 2: Electric Boogaloo',
          description: 'This is a updated event',
          totalParticipants: 70,
          startDate: '2024-07-01',
          endDate: '2024-07-02'
        },
        message: 'Event updated successfully',
        code: 200,
        success: true
    }

    expect(res.status).toEqual(200);
    expect(body).toEqual(sucessfulResponse);
  });
});

describe('DELETE /events/:id', () => {
  it('should delete an event', async () => {
    const events = await readEvents();

    const mockRes = {
      json: jest.fn(),
    } as any;

    const res = await DELETE(mockRes, { params: { id: events[0].id } });
    const body = await res.json();

    const expectedResponse = {
        message: 'Event deleted successfully',
        code: 200,
        success: true
    }

    expect(res.status).toEqual(200);
    expect(body).toEqual(expectedResponse);
  });
});