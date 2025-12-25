/**
 * Smartstorify - Main JavaScript
 * Pure vanilla JS, no frameworks
 */

(function() {
  'use strict';

  // ========================================
  // Mobile Menu
  // ========================================
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  const iconMenu = menuToggle?.querySelector('.icon-menu');
  const iconClose = menuToggle?.querySelector('.icon-close');

  function toggleMobileMenu() {
    const isOpen = mobileMenu.classList.toggle('open');
    iconMenu?.classList.toggle('hidden', isOpen);
    iconClose?.classList.toggle('hidden', !isOpen);
  }

  function closeMobileMenu() {
    mobileMenu?.classList.remove('open');
    iconMenu?.classList.remove('hidden');
    iconClose?.classList.add('hidden');
  }

  menuToggle?.addEventListener('click', toggleMobileMenu);

  // Close on link click
  mobileMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (mobileMenu?.classList.contains('open') &&
        !mobileMenu.contains(e.target) &&
        !menuToggle?.contains(e.target)) {
      closeMobileMenu();
    }
  });

  // ========================================
  // Smooth Scroll for Section Links
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        closeMobileMenu();
      }
    });
  });

  // ========================================
  // Active Section Tracking (Home page only)
  // ========================================
  const sections = ['hero', 'solutions', 'technology', 'innovation', 'faqs'];
  const navLinks = document.querySelectorAll('.nav-link[data-section]');

  function updateActiveSection() {
    const scrollPosition = window.scrollY + 200;

    for (const sectionId of sections) {
      const section = document.getElementById(sectionId);
      if (section) {
        const top = section.offsetTop;
        const height = section.offsetHeight;

        if (scrollPosition >= top && scrollPosition < top + height) {
          navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.section === sectionId);
          });
          break;
        }
      }
    }
  }

  if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
    window.addEventListener('scroll', throttle(updateActiveSection, 100), { passive: true });
    updateActiveSection();
  }

  // ========================================
  // Technology Tabs
  // ========================================
  const tabButtons = document.querySelectorAll('[data-tab]');
  const tabContents = document.querySelectorAll('[data-tab-content]');
  const tabIndicator = document.querySelector('.tab-indicator');

  tabButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      const tabId = button.dataset.tab;

      // Update buttons
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Update content
      tabContents.forEach(content => {
        content.classList.toggle('active', content.dataset.tabContent === tabId);
      });

      // Update indicator
      if (tabIndicator) {
        tabIndicator.style.left = `${index * 50}%`;
      }
    });
  });

  // ========================================
  // Copy to Clipboard
  // ========================================
  document.querySelectorAll('[data-copy]').forEach(button => {
    button.addEventListener('click', async () => {
      const text = button.dataset.copy;
      const iconCopy = button.querySelector('.icon-copy');
      const iconCheck = button.querySelector('.icon-check');

      try {
        await navigator.clipboard.writeText(text);

        // Show success state
        iconCopy?.classList.add('hidden');
        iconCheck?.classList.remove('hidden');
        button.classList.add('copied');

        // Reset after 2 seconds
        setTimeout(() => {
          iconCopy?.classList.remove('hidden');
          iconCheck?.classList.add('hidden');
          button.classList.remove('copied');
        }, 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    });
  });

  // ========================================
  // Cookie Panel
  // ========================================
  const cookiePanel = document.querySelector('[data-cookie-panel]');
  const cookieAccept = document.querySelector('[data-cookie-accept]');
  const cookieDecline = document.querySelector('[data-cookie-decline]');

  function showCookiePanel() {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent && cookiePanel) {
      setTimeout(() => {
        cookiePanel.classList.add('visible');
      }, 1000);
    }
  }

  function hideCookiePanel() {
    cookiePanel?.classList.remove('visible');
  }

  cookieAccept?.addEventListener('click', () => {
    localStorage.setItem('cookie-consent', 'accepted');
    hideCookiePanel();
  });

  cookieDecline?.addEventListener('click', () => {
    localStorage.setItem('cookie-consent', 'declined');
    hideCookiePanel();
  });

  showCookiePanel();

  // ========================================
  // Scroll to Top on Page Load
  // ========================================
  if (window.location.hash) {
    history.replaceState(null, '', window.location.pathname);
  }
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

  // ========================================
  // Utility Functions
  // ========================================
  function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

})();
