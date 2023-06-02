export const pasteFromClipboard = (): Promise<string> =>
  navigator.clipboard.readText();
