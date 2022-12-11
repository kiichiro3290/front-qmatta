// 仮のデータ構造
type PriorityType = 'なるはや' | 'いつでも' | '緊急' | 'まったり'
type StatusType = '解決' | 'クマった' | 'ピンチ' | '回答募集中'

type Question = {
  title: string
  createdAt: Date
  status: StatusType
  label: string[]
  priority: PriorityType
}
