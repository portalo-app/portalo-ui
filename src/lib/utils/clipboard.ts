export const pasteFromClipboard = (): Promise<string> =>
  navigator.clipboard.readText();

export const canPasteFormClipboard = (): boolean =>
  !!navigator?.clipboard?.readText;
