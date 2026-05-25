const personalPhotoModules = import.meta.glob([
  "../assets/Personal_photo/*.webp",
  "../assets/Personal_photo/*.jpeg",
  "../assets/Personal_photo/*.jpg",
  "../assets/Personal_photo/*.png",
], {
  eager: true,
  import: "default",
}) as Record<string, string>;

const personalPhotoPrefixes = [
  "/src/assets/Personal_photo/",
  "src/assets/Personal_photo/",
];

export function resolveTeamImage(image: string) {
  const matchedPrefix = personalPhotoPrefixes.find((prefix) => image.startsWith(prefix));

  if (!matchedPrefix) {
    return image;
  }

  const filename = image.slice(matchedPrefix.length);
  return personalPhotoModules[`../assets/Personal_photo/${filename}`] ?? image;
}
