export default function toStandardFormat(str = "") {
  // Convert string to lowercase and split into words
  const words = str.toLowerCase().split(" ");

  // Capitalize first letter of the first word
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);

  // Join words back into a string and add a period at the end if one is not already present
  let result = words.join(" ");

  return result;
}
