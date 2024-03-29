export interface IEvent {
  id: number;
  title: string;
  place: string;
  date: Date | string;
  content: string;
  published: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}
