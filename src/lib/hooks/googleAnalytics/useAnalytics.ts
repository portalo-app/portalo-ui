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

const trackSettingsClickNavigationOrFeature = (item: string) => {
  trackGAEvent('Settings', 'ClickNavigationOrFeature', item);
};

// Spaces events
const trackCreateSpace = (item: string) => {
  trackGAEvent('Space', 'Create', item);
};

const trackDeleteSpace = (item: string) => {
  trackGAEvent('Space', 'Delete', item);
};

// Elements events
const trackCreateElement = (item: string) => {
  trackGAEvent('Element', 'Create', item);
};

const trackDeleteElement = (item: string) => {
  trackGAEvent('Element', 'Delete', item);
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
    trackSettingsClickNavigationOrFeature,

    // Spaces events
    trackCreateSpace,
    trackDeleteSpace,

    // Elements events
    trackCreateElement,
    trackDeleteElement,
  };
};

export default useAnalytics;
