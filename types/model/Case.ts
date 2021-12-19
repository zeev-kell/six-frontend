export interface CaseModel {
  id: number
  title: string
  provider: string
  category: { id: string; name: string }[]
  content: string
  description: string
}
