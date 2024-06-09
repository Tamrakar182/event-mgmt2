/**
 * @jest-environment node
 */
import { readEvents } from '@/utils/fileHandler';
import { POST, GET } from './route';

describe('GET /events', () => {
    it('should get all events', async () => {
        const mockReq = {
            json: jest.fn(),
          } as any;

        const events = await readEvents();   
        const res = await GET(mockReq);
        const body = await res.json();

        const expectedResponse = {
            data: events,
            message: 'Events fetched successfully',
            code: 200,
            success: true
        }

        expect(res.status).toEqual(200);
        expect(body).toEqual(expectedResponse);
    });
});

describe('POST /events', () => {
    it('should create a new event', async () => {
        const requestObj = {
            json: async () => ({
                "title": "What the sigma",
                "description": "This is a new event",
                "totalParticipants": 70,
                "startDate": "2024-07-01",
                "endDate": "2024-07-02"
              }),
          } as any;
        
          const response = await POST(requestObj);
          const body = await response.json();

          const sucessfulResponse = {
            data: {
              id: expect.any(String),
              title: 'What the sigma',
              description: 'This is a new event',
              totalParticipants: 70,
              startDate: '2024-07-01',
              endDate: '2024-07-02'
            },
            message: 'Event added successfully',
            code: 201,
            success: true
          }

          expect(response.status).toEqual(201);
          expect(body).toEqual(sucessfulResponse);
    });
});