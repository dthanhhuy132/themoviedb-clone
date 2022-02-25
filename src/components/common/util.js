export function truncate(text, number) {
  return text.lenght < number ? text : `${text.slice(0, number)}...`;
}
