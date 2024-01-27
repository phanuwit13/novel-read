import { apiClient } from '../../utils/api'
import { useQuery } from '@tanstack/react-query'
import { AllChapterResponse, ChapterResponse } from './chapters.types'

export const useGetAllChapter = () => {
  return useQuery({
    queryKey: ['get-all-chapter'],
    queryFn: (): Promise<AllChapterResponse> => apiClient.get(`/all-chapter`),
    retry: 0,
  })
}

export const useGetChapter = ({ cp }: { cp: string }) => {
  return useQuery({
    queryKey: ['get-chapter', cp],
    queryFn: (): Promise<ChapterResponse> => apiClient.get(`/chapter?url=${encodeURI(cp)}`),
    retry: 0,
    enabled: Boolean(cp) || false,
  })
}
