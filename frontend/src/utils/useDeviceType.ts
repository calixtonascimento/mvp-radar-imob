interface DeviceType {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

const MOBILE_UA_REGEX = /android|iphone|ipod|windows phone|blackberry|bb[0-9]+|mobile/i;
const TABLET_UA_REGEX = /ipad|tablet|kindle|silk|playbook|(android(?!.*mobile))/i;

function detectDeviceType(): DeviceType {
  // SSR always returns desktop (Does not work)
  if (typeof navigator === 'undefined' || typeof window === 'undefined') {
    return { isMobile: false, isTablet: false, isDesktop: true };
  }

  const ua = navigator.userAgent;
  const isMobileUA = MOBILE_UA_REGEX.test(ua);
  const isTabletUA = !isMobileUA && TABLET_UA_REGEX.test(ua);

  if (isMobileUA) return { isMobile: true, isTablet: false, isDesktop: false };
  if (isTabletUA) return { isMobile: false, isTablet: true, isDesktop: false };

  if (window.matchMedia('(max-width: 767px)').matches) {
    return { isMobile: true, isTablet: false, isDesktop: false };
  }
  if (window.matchMedia('(min-width: 768px) and (max-width: 1023px)').matches) {
    return { isMobile: false, isTablet: true, isDesktop: false };
  }

  return { isMobile: false, isTablet: false, isDesktop: true };
}

const deviceType: DeviceType = detectDeviceType();

export function useDeviceType(): DeviceType {
  return deviceType;
}
