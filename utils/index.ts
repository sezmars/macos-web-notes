export const formatDate = (
  time: string,
  type: "onlyTime" | "fullDate" = "onlyTime",
) => {
  const date = new Date(time);

  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
  };

  if (type === "fullDate") {
    options.second = "2-digit";
  }

  const clock = date.toLocaleTimeString([], options);

  if (type === "onlyTime") {
    return `${clock}`;
  }

  if (type === "fullDate") {
    const year = date.toLocaleString("default", { year: "numeric" });
    const month = date.toLocaleString("default", { month: "2-digit" });
    const day = date.toLocaleString("default", { day: "2-digit" });

    return `${year}/${month}/${day} ${clock}`;
  }
};
export default defineNuxtPlugin(() => {
  return {
    provide: {
      filters: { formatDate },
    },
  };
});

export const truncateText = (text: string, length: number) => {
  if (text.length <= length) {
    return text;
  } else {
    return text.substring(0, length) + "...";
  }
};

export const formatTitle = (content: string) => {
  const regexPattern = /#\s+(.+)/g;
  const headings: string[] = [];
  let match: RegExpExecArray | null;

  while ((match = regexPattern.exec(content)) !== null) {
    headings.push(match[1]);
  }

  const isHeading = content[0]?.trim().includes("#");

  if (isHeading) {
    return truncateText(headings[0], 20).trim();
  }

  return truncateText(content, 20)?.trim();
};

export enum Common {
  toggleDeleteModal = "toggle-delete-modal",
  toggleMenu = "toggle-menu",
  newNote = "New Note",
}
