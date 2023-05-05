export default function formatDate(dateArray) {
  try {
    const [year, month, day] = dateArray;
    const date = new Date(year, month - 1, day);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  } catch (error) {
    return "";
  }
}

export function dateToArray(dateString = "") {
  try {
    const [year, month, day] = dateString.split("-").map(Number);
    return [year, month, day];
  } catch (error) {}
}

export function formatDateArrayToString(arr = []) {
  try {
    const [year, month, day] = arr;
    const date = new Date(year, month - 1, day);
    const formattedDate = date.toISOString().slice(0, 10);
    return formattedDate;
  } catch (error) {
    console.log(arr);
  }
}
export function formatDateString(date) {
  try {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    const seconds = String(d.getSeconds()).padStart(2, "0");
    return `${day}-${
      months[Number(month - 1)]
    }-${year} ${hours}:${minutes}:${seconds}`;
  } catch (error) {
    return "";
  }
}
