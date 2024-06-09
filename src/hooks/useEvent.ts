import useSWR from 'swr';
import { IEvent } from '@/types/event';
import api from '@/utils/api';

const useEvent = (id: string, callback?: Function) => {
  const fetcher = (url: string) => api.get(url).then((res) => res.data.data);

  const { data, error, isLoading } = useSWR<IEvent, Error>(`/auth/events/${id}`, fetcher, {
    onSuccess: (data, key) => {
      if (callback) callback();
      return data;
    },
  });

  return { data, error, isLoading };
};

export default useEvent;