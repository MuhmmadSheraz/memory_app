export type Memory = {
  _id: string
  title: string
  description: string
  image: string | { public_id: string; url: string }
  createdAt: string
  likes: string[]
  tags: string[]
  userId: string
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
