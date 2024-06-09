import axios from 'axios';
import useSWR from 'swr';
import { IEvent } from '@/types/event';

const useEvents = (callback?: Function) => {
  const api = axios.create({
    baseURL: "/api",
  });

  const fetcher = (url: string) => api.get(url).then((res) => res.data.data);

  const { data, error, mutate, isLoading } = useSWR<IEvent[], Error>('/events', fetcher, {
    onSuccess: (data, key) => {
      if (callback) callback();
      return data;
    },
  });

  return { data, error, isLoading };
};

export default useEvents;