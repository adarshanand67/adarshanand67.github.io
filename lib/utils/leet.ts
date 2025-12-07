export const leetMap: Record<string, string> = {
  a: "4",
  b: "8",
  e: "3",
  g: "6",
  i: "!",
  l: "1",
  o: "0",
  s: "5",
  t: "7",
  z: "2",
  A: "4",
  B: "8",
  E: "3",
  G: "6",
  I: "!",
  L: "1",
  O: "0",
  S: "5",
  T: "7",
  Z: "2",
};

export function toLeetSpeak(text: string): string {
  return text
    .split("")
    .map((char) => leetMap[char] || char)
    .join("");
}
