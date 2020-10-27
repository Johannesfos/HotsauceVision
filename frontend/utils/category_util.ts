export const categoryList = [
  'lifestyle',
  'concert',
  'wedding',
  'urban',
  'nature',
] as const

export type Category = typeof categoryList[number]

export const categoryToString = (category: Category) => {
  if (category) return capitalize(category)
}

const capitalize = (s: string) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}
