import { translit } from "./translit-generator"

export const generateSlug = (word) => {
  return translit(word).replace(/ /g, '_').toLowerCase()
} 