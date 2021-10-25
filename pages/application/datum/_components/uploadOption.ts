export interface uploadOption {
  headers: any
  withCredentials: boolean
  file: File
  data: any
  filename: string
  action: string
  onProgress: (e: ProgressEvent) => void
  onSuccess: (res: any) => void
  onError: (e: any) => void
  _id: string
  _chunks: number
  _currentChunk: number
}
