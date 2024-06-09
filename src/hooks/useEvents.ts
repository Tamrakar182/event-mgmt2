import useSWR from 'swr';
import { IEvent } from '@/types/event';
import api from '@/utils/api';

const useEvents = (callback?: Function) => {
  const fetcher = (url: string) => api.get(url).then((res) => res.data.data);

  const { data, error, mutate, isLoading } = useSWR<IEvent[], Error>('/events', fetcher, {
    onSuccess: (data, key) => {
      if (callback) callback();
      return data;
    },
  });

  const removeEvent = async (event: IEvent) => {
    if (!data) {
      return false;
    }
    await api.delete<IEvent>(`/events/${event.id}`);
    mutate(data.filter((item) => item.id === event.id, false));
  };

  return { data, error, isLoading, removeEvent };
};

export default useEvents;