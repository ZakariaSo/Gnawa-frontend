import { useQuery } from '@tanstack/react-query';
import { artistsAPI } from '../api/artists';

export const useArtists = () => {
  return useQuery({
    queryKey: ['artists'],
    queryFn: artistsAPI.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useArtist = (id: string) => {
  return useQuery({
    queryKey: ['artist', id],
    queryFn: () => artistsAPI.getById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};