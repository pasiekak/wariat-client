export interface IEvent {
  id: number;
  title: string;
  place: string;
  date: Date | string;
  content: string;
  published: boolean;
  youtubeURL: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}
