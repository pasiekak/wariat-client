import { IEventsItems } from "../../../types/items";
import { Dispatch, SetStateAction } from "react";
import { IEvent } from "../../../../../api/types/IEvent";
import { IBanner } from "../../../../message-banner/types/IBanner";
import IImage from "../../images/types/IImage";

export type useEventsFunctionsProps = {
  events: IEventsItems;
  setEvents: Dispatch<SetStateAction<IEventsItems>>;
  addBanner: (banner: IBanner) => void;
};

export type useEventsFunctionsReturnedFunctions = {
  getEvent: (id: number) => IEvent | undefined;
  addEvent: (data: EventAddForm) => Promise<IEvent | null>;
  addImagesToEvent: (data: EventImagesAddFnProps) => Promise<IImage[] | null>;
  updateEvent: (eventID: number, event: EventAddEditFnProps) => void;
  deleteEvent: (eventID: number) => Promise<void>;
  generateDefaultValues: () => EventAddForm;
};

export type EventAddForm = {
  title: string;
  place: string;
  date: Date | string;
  content: string;
  published: boolean;
  images: File[];
};

export type EventAddEditFnProps = {
  title: string;
  place: string;
  date: Date | string;
  content: string;
  published: boolean;
};

export type EventImagesAddFnProps = {
  eventID: number;
  images: File[];
};
