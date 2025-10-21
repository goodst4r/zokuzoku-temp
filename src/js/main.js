// main.js
(function () {
  const loadingScreen = document.querySelector('.loading-screen');

  if (!loadingScreen) {
    return;
  }

  const hideLoadingScreen = () => {
    loadingScreen.classList.add('is-hidden');
  };

  // Fallback: hide after 4.5s even if load event is slow.
  const timeoutId = window.setTimeout(hideLoadingScreen, 4500);

  window.addEventListener('load', () => {
    window.clearTimeout(timeoutId);
    // Slight delay to let the final progress animation play.
    window.setTimeout(hideLoadingScreen, 1200);
  });
})();

// Hamburger Menu
(function () {
  const hamburger = document.querySelector('.hamburger');
  const siteNav = document.querySelector('.site-nav');

  if (!hamburger || !siteNav) {
    return;
  }

  // Create overlay element
  const overlay = document.createElement('div');
  overlay.className = 'mobile-overlay';
  document.body.appendChild(overlay);

  const toggleMenu = () => {
    const isOpen = hamburger.classList.toggle('is-active');
    siteNav.classList.toggle('is-open');
    overlay.classList.toggle('is-visible');
    hamburger.setAttribute('aria-expanded', isOpen);

    // Prevent body scroll when menu is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  hamburger.addEventListener('click', toggleMenu);

  // Close menu when clicking overlay
  overlay.addEventListener('click', toggleMenu);

  // Close menu when clicking nav links
  const navLinks = siteNav.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (hamburger.classList.contains('is-active')) {
        toggleMenu();
      }
    });
  });

  // Close menu on window resize if larger than 720px
  window.addEventListener('resize', () => {
    if (window.innerWidth > 720 && hamburger.classList.contains('is-active')) {
      toggleMenu();
    }
  });
})();

// Header Scroll Behavior (SP only)
(function () {
  const header = document.querySelector('.site-header');

  if (!header) {
    return;
  }

  let lastScrollY = window.scrollY;
  let ticking = false;

  const updateHeaderVisibility = () => {
    const currentScrollY = window.scrollY;

    // Only apply on mobile (720px or less)
    if (window.innerWidth <= 720) {
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // Scrolling down & past threshold - hide header
        header.classList.add('is-hidden');
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show header
        header.classList.remove('is-hidden');
      }

      // Always show header at the top of the page
      if (currentScrollY <= 10) {
        header.classList.remove('is-hidden');
      }
    } else {
      // Remove class on desktop
      header.classList.remove('is-hidden');
    }

    lastScrollY = currentScrollY;
    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeaderVisibility);
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 720) {
      header.classList.remove('is-hidden');
    }
  });
})();
