export const tagsChecker = (en, other) => {

  const enTags = en.match(/[<\[](.*?)[>\]]/g) || []
  const otherTags = other.match(/[<\[](.*?)[>\]]/g) || []
  return enTags.reduce((acc, it, i) =>
    acc && it === otherTags[i]
   , true)
}

export const empty = (en, other) => 
  en.trim().length > 0 && ((other && other.trim().length === 0) || !other)
