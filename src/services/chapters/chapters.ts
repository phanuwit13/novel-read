import { apiClient } from '../../utils/api'
import { useQuery } from '@tanstack/react-query'
import { AllChapterResponse, AllNovelResponse, ChapterResponse } from './chapters.types'

export const useGetAllChapter = (id:string) => {
  return useQuery({
    queryKey: ['get-all-chapter',id],
    queryFn: (): Promise<AllChapterResponse> => apiClient.get(`/all-chapter/${id}`),
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

export const useGetAllNovel = () => {
  return useQuery({
    queryKey: ['get-all-novel'],
    queryFn: (): Promise<AllNovelResponse> => apiClient.get(`/novel-list`),
    retry: 0,
  })
}
