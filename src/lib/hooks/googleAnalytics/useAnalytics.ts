import ReactGA4 from 'react-ga4';

const initializeGA = () => {
  const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;

  if (!googleAnalyticsId) return;

  ReactGA4.initialize(googleAnalyticsId);
};

const trackGAEvent = (category: string, action: string, label?: string) => {
  ReactGA4.event({
    category,
    action,
    label,
  });
};

// Menu events
const trackShareAppClicked = () => {
  trackGAEvent('Menu', 'ShareAppClicked');
};

const trackNeoPowerSiteClicked = () => {
  trackGAEvent('Menu', 'NeoPowerSiteClicked');
};

const trackTwitterClicked = () => {
  trackGAEvent('Menu', 'TwitterClicked');
};

// Mobile Bottom Navbar events
const trackMobileBottomNavbarMenuItem = (item: string) => {
  trackGAEvent('MobileBottomNavbarMenuItem', 'ClickMenuItem', item);
};

const trackClickNavigationOrFeature = (item: string) => {
  trackGAEvent('MenuItems', 'ClickNavigationOrFeature', item);
};

// Profile events
const trackCreateProfile = (id: string) => {
  trackGAEvent('Profile', 'Create', id);
};

const trackDeleteProfile = (id: string) => {
  trackGAEvent('Profile', 'Delete', id);
};

const trackEditProfile = (id: string) => {
  trackGAEvent('Profile', 'Edit', id);
};

// File events
const trackCreateFile = (item: string) => {
  trackGAEvent('File', 'Create', item);
};

const trackDeleteFile = (item: string) => {
  trackGAEvent('File', 'Delete', item);
};

const trackEditFile = (item: string) => {
  trackGAEvent('File', 'Edit', item);
};

/**
 * Hook containing all the required functions to track analytics
 */
const useAnalytics = () => {
  return {
    initializeGA,

    // Menu events
    trackShareAppClicked,
    trackNeoPowerSiteClicked,
    trackTwitterClicked,

    // Mobile Bottom Navbar events
    trackMobileBottomNavbarMenuItem,

    // Settings events
    trackClickNavigationOrFeature,

    // Profile events
    trackCreateProfile,
    trackDeleteProfile,
    trackEditProfile,

    // File events
    trackCreateFile,
    trackDeleteFile,
    trackEditFile,
  };
};

export default useAnalytics;
