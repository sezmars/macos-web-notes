export const truncateText = (text: string, length: number) => {
  if (text.length <= length) {
    return text
  } else {
    return text.substring(0, length) + '...'
  }
}

export const formatTitle = (content: string) => {
  const regexPattern = /#\s+(.+)/g
  const headings: string[] = []
  let match: RegExpExecArray | null

  while ((match = regexPattern.exec(content)) !== null) {
    headings.push(match[1])
  }

  const isHeading = content[0]?.trim().includes('#')

  if (isHeading) {
    return truncateText(headings[0], 20).trim()
  }

  return truncateText(content, 20)?.trim()
}
