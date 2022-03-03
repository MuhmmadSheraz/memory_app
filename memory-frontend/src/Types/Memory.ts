export type Memory = {
  _id: string
  title: string
  description: string
  image: string
  createdAt: string
  likes: string[]
  tags: string[]
}
export type CreateMemoryBody = {
  title: string
  description: string
  image: string
  userId: string
}
export type LikeMemoryBody = {
  memoryId: string
}
