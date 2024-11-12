import { Comment } from "./CommentModel"

export interface Product {
  id: string,
  imageUrl: string,
  name: string,
  count: number,
  size: {
  width: number,
  height: number
  },
  weight: string,
  comments: Comment[]
  }