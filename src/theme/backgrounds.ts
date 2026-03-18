export const backgrounds = {
  // Light mode backgrounds
  light: {
    primary: 'url(/images/Light-Background.png)',
    fallback: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  },

  // Dark mode backgrounds
  dark: {
    primary: 'url(/images/Dark-Background.png)',
    fallback: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
  },

  // Gradient overlays (for additional effects)
  overlays: {
    light: 'rgba(255, 255, 255, 0.05)',
    medium: 'rgba(255, 255, 255, 0.1)',
    dark: 'rgba(0, 0, 0, 0.3)',
  },

  // Pattern backgrounds (SVG patterns for additional texture)
  patterns: {
    dots: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='2' cy='2' r='1'/%3E%3C/g%3E%3C/svg%3E\")",
    grid: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none'/%3E%3Cpath d='M0 20h40M20 0v40' stroke='%23ffffff' stroke-opacity='0.05' stroke-width='1'/%3E%3C/svg%3E\")",
  },
};
