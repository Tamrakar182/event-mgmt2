export interface IEvent {
    id: string;
    title: string;
    description: string;
    totalParticipants: number;
    startDate: string;
    endDate: string;
  }
  
export interface IRequestType {
    data: IEvent[];
    status: number;
    message: string;
    success: boolean;
}