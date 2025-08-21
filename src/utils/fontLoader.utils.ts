// Font loading utility for iOS Safari compatibility
export const loadGoogleFonts = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Check if fonts are already loaded
    if (document.fonts && document.fonts.check('1em "Open Sans"')) {
      resolve();
      return;
    }

    // Create a link element for Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&display=fallback';
    link.rel = 'stylesheet';
    link.type = 'text/css';

    // Handle successful font loading
    link.onload = () => {
      // Wait for fonts to be ready
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => resolve()).catch(() => resolve());
      } else {
        // Fallback for older browsers
        setTimeout(() => resolve(), 100);
      }
    };

    // Handle font loading errors
    link.onerror = () => {
      console.warn('Failed to load Google Fonts, falling back to system fonts');
      resolve(); // Still resolve to continue app loading
    };

    // Add to document head
    document.head.appendChild(link);

    // Fallback timeout
    setTimeout(() => {
      console.warn('Font loading timeout, continuing with fallback fonts');
      resolve();
    }, 3000);
  });
};

// Font display fallback for iOS Safari
export const ensureFontDisplay = (): void => {
  // Add CSS to ensure text visibility during font load
  const style = document.createElement('style');
  style.textContent = `
    body {
      font-display: fallback;
    }
    * {
      font-display: fallback;
    }
  `;
  document.head.appendChild(style);
};
