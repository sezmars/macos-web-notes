import searchTextHL from 'search-text-highlight'

export const domHighlighter = (value: string, searchResult: string) => {
  return searchTextHL.highlight(value, searchResult)
}
