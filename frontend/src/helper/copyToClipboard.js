export default function copyToClipboard(text) {
  if (process.env.NODE_ENV === "development" && false) {
    const input = document.createElement("textarea");
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
  }
}
