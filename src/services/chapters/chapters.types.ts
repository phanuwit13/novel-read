export interface ResponseStatus {
  code: string
  message: string
}

export interface AllChapterItem {
  "value": string
  "label": string
}

export interface AllChapterResponse {
  status: ResponseStatus
  data: AllChapterItem[]
}


export interface ChapterResponse {
  status: ResponseStatus
  data: string
}
