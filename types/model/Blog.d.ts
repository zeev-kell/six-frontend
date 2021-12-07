export interface BlogModel {
  created_at: string
  id: number
  provider: string
  category: { id: string; name: string }[]
  title: string
  type: number
  content: string
  image: string
  description: string
  next: BlogModel
  previous: BlogModel
}
