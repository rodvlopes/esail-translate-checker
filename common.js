export const tagsMatch = (en, other='') => {

  const enTags = en.match(/[<\[](.*?)[>\]]/g) || []
  const otherTags = other.match(/[<\[](.*?)[>\]]/g) || []
  const match = enTags.reduce((acc, it, i) =>
    acc && it === otherTags[i]
   , true)
  return match ? true : { en: enTags, other: otherTags }
}

export const empty = (en, other) => 
  en.trim().length > 0 && ((other && other.trim().length === 0) || !other)
