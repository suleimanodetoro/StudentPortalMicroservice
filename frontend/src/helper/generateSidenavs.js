function capitalizeText(text) {
  let words = text.toLowerCase().split(" ");
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].substring(1);
  }
  return words.join(" ");
}

export const generateNestedNav = (...data) =>
  data.map((item) => {
    const title = item.toLowerCase();
    return {
      title: capitalizeText(title),
      icon: "bi bi-chevron-down",
      child: [
        {
          title: `Add ${capitalizeText(title)}`,
          link: `/add-${title}`,
        },
        {
          title: `${title} List`,
          link: `/${title}-list`,
        },
      ],
    };
  });
