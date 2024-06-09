import { IEvent } from "@/types/event";
import axios from "axios";

const api = axios.create({
    baseURL: "/api",
  });

let list: IEvent[] = [];

export const getEvents = async () => {
  const { data } = await api.get("/events/");

  list = data.data;
  return list;
};

export const createEvent = async (obj: IEvent) => {
  const { data } = await api.post("/events/", obj);

  list.push(data);
  return list;
};

export const updateEvent = async (id: string, obj: IEvent) => {
  const { data } = await api.put(`/events/${id}/`, obj);

  list = list.map((item: IEvent) => {
    if (item.id === id) {
      return data;
    }
    return item;
  });

  return list;
};

export const deleteEvent = async (id: string) => {
  await api.delete(`/events/${id}/`);
  list = list.filter((item: IEvent) => item.id !== id);
  return list;
};
