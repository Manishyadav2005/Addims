/**
 * Smoothly scrolls to a target section by element ID, accounting for fixed navbar height.
 */
export function scrollToSection(sectionId: string, customOffset = 80): boolean {
  const elem = document.getElementById(sectionId);
  if (elem) {
    const yCoordinate = elem.getBoundingClientRect().top + window.pageYOffset;
    const targetPosition = Math.max(0, yCoordinate - customOffset);
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    });

    // Update URL hash without causing a page jump
    if (window.location.hash !== `#${sectionId}`) {
      window.history.replaceState(null, '', `#${sectionId}`);
    }
    return true;
  }
  return false;
}

export function scrollToTop(): void {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
  if (window.location.hash) {
    window.history.replaceState(null, '', window.location.pathname);
  }
}
