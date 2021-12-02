export interface BlogModel {
  created_at: string
  id: number
  provider: string
  tags: { id: string; name: string }[]
  title: string
  type: number
  content: string
}
