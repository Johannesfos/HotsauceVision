import { Category } from '../../utils/category_util'

export interface ImageModel {
  id: string
  path: string
  category: Category
  description: string
  author?: string
}

export const createImageModel = (
  id: string,
  path: string,
  category: Category,
  description: string,
  author: string
): ImageModel => ({
  id: id,
  path: path,
  category: category,
  description: description,
  author: author,
})
