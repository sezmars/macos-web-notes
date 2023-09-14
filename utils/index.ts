export const formatDate = (
  time: string,
  type: "onlyTime" | "fullDate" = "onlyTime",
) => {
  const date = new Date(time);

  const clock = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

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

export const truncateText = (text, length) => {
  if (text.length <= length) {
    return text;
  } else {
    return text.substring(0, length) + "...";
  }
};