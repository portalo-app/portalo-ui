export const ROUTES = {
  HOME: '/',
  APP: '/app',
  APP_PROFILE: '/app/profile',
  APP_CREATE_PROFILE: '/app/create-profile',
} as const;

export type ObjectValues<T> = T[keyof T];

export type Routes = ObjectValues<typeof ROUTES>;
export type RoutesKeys = keyof typeof ROUTES;
