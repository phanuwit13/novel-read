export interface ResponseStatus {
  code: string
  message: string
}

export interface AllChapterItem {
  value: string
  label: string
}
export interface NovelItem {
  url: string
  name: string
  id: string
}

export interface AllChapterResponse {
  status: ResponseStatus
  data: AllChapterItem[]
}
export interface AllNovelResponse {
  status: ResponseStatus
  data: NovelItem[]
}

export interface ChapterResponse {
  status: ResponseStatus
  data: string
}
