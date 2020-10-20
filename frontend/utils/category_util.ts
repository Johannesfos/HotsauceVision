export const categoryList = [
  'lifestyle',
  'wedding',
  'concert',
  'landscape',
  'food',
  'portrait',
] as const

export type Category = typeof categoryList[number]

export const categoryToString = (category: Category) => {
  return capitalize(category)
}

const capitalize = (s: string) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}
