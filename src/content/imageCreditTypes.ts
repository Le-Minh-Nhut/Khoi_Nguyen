export interface ImageCredit {
  /** File name inside public/images, e.g. "cat-exchange.webp". */
  file: string;
  /** Commons file title (without the "File:" prefix). */
  title: string;
  author: string;
  /** Short licence name as published on Commons, e.g. "CC BY-SA 4.0". */
  license: string;
  /** Commons file page. */
  sourceUrl: string;
}
