// iOS Safari detection and handling utilities

export const isIOSSafari = (): boolean => {
  const userAgent = navigator.userAgent;
  const isIOS = /iPad|iPhone|iPod/.test(userAgent);
  const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
  return isIOS && isSafari;
};

export const isIOSWebView = (): boolean => {
  const userAgent = navigator.userAgent;
  const isIOS = /iPad|iPhone|iPod/.test(userAgent);
  const isWebView = !(/Safari/.test(userAgent));
  return isIOS && isWebView;
};

export const getIOSVersion = (): number | null => {
  const userAgent = navigator.userAgent;
  const match = userAgent.match(/OS (\d+)_/);
  return match ? parseInt(match[1], 10) : null;
};

// Check if we're in a problematic iOS Safari environment
export const isProblematicIOSEnvironment = (): boolean => {
  if (!isIOSSafari()) return false;
  
  const iosVersion = getIOSVersion();
  // iOS versions that have known Firebase issues
  return iosVersion !== null && iosVersion >= 12;
};

// Network status monitoring for iOS Safari
export const addNetworkListener = (callback: (isOnline: boolean) => void) => {
  const handleOnline = () => callback(true);
  const handleOffline = () => callback(false);
  
  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);
  
  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
};

// Enhanced error logging for iOS Safari
export const logIOSNetworkError = (error: any, context: string) => {
  if (isIOSSafari()) {
    console.group(`🍎 iOS Safari Network Error - ${context}`);
    console.error('Error:', error);
    console.log('User Agent:', navigator.userAgent);
    console.log('iOS Version:', getIOSVersion());
    console.log('Online Status:', navigator.onLine);
    console.log('Connection:', (navigator as any).connection);
    console.groupEnd();
  }
};
