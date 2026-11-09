/** Resolve a file in `public/images` against the deploy base path. */
export function imagePath(file: string): string {
  return `${import.meta.env.BASE_URL}images/${file}`;
}
