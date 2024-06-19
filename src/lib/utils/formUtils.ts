export const createMaxErrorMessage = (field: string, maxLength: number) =>
  `${field} must be at most ${maxLength} characters long.`;

export const createMinErrorMessage = (field: string, minLength: number) =>
  `${field} must be at least ${minLength} characters long.`;
