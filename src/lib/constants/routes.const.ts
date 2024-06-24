export const ROUTES = {
  APP: '/',
  APP_HELP: '/help',
  APP_PROFILE: '/profiles',
  APP_CREATE_PROFILE: '/profiles/new',
  APP_FOLDER: '/folders',
  APP_CREATE_FOLDER: '/folders/new',
  APP_ADDRESS: '/addresses',
  APP_CREATE_ADDRESS: '/addresses/new',
  APP_SELECT_ENTITY: '/select-entity',
  APP_NOTIFICATION: '/notifications',
  APP_SETTINGS: '/settings',
  APP_ABOUT: '/about',
  APP_TERMS_AND_CONDITIONS: '/terms-and-conditions',
  APP_PRIVACY_POLICY: '/privacy-policy',
} as const;

export type ObjectValues<T> = T[keyof T];

export type Routes = ObjectValues<typeof ROUTES>;
export type RoutesKeys = keyof typeof ROUTES;

export type route = {
  title: string;
  url: Routes;
  readOnly: boolean;
};

export const ROUTES_LAYOUT: route[] = [
  {
    title: 'Home',
    url: ROUTES.APP,
    readOnly: true,
  },
  {
    title: 'Help',
    url: ROUTES.APP_HELP,
    readOnly: true,
  },
  {
    title: 'Profile',
    url: ROUTES.APP_PROFILE,
    readOnly: true,
  },
  {
    title: 'Create Profile',
    url: ROUTES.APP_CREATE_PROFILE,
    readOnly: true,
  },
  {
    title: 'Folder',
    url: ROUTES.APP_FOLDER,
    readOnly: true,
  },
  {
    title: 'Create Folder',
    url: ROUTES.APP_CREATE_FOLDER,
    readOnly: true,
  },
  {
    title: 'Addresses',
    url: ROUTES.APP_ADDRESS,
    readOnly: true,
  },
  {
    title: 'Create Address',
    url: ROUTES.APP_CREATE_ADDRESS,
    readOnly: true,
  },
  {
    title: 'Select Entity',
    url: ROUTES.APP_SELECT_ENTITY,
    readOnly: true,
  },
  {
    title: 'Notifications',
    url: ROUTES.APP_NOTIFICATION,
    readOnly: true,
  },
  {
    title: 'Settings',
    url: ROUTES.APP_SETTINGS,
    readOnly: true,
  },
  {
    title: 'About',
    url: ROUTES.APP_ABOUT,
    readOnly: true,
  },
  {
    title: 'Privacy policy',
    url: ROUTES.APP_PRIVACY_POLICY,
    readOnly: true,
  },
  {
    title: 'Terms and conditions',
    url: ROUTES.APP_TERMS_AND_CONDITIONS,
    readOnly: true,
  },
];
