import { useQuery } from '@tanstack/react-query';
import { eventsAPI } from '../api/events';

export const useEventInfo = () => {
  return useQuery({
    queryKey: ['event'],
    queryFn: eventsAPI.getEventInfo,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};