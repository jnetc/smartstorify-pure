/**
 * Smartstorify - Motion One Animations
 * Replicated from original Framer Motion implementation
 * https://motion.dev
 */

import { animate, stagger, inView, scroll } from 'https://cdn.jsdelivr.net/npm/motion@11/+esm';

// Easing presets (matching Framer Motion)
const easeOut = [0, 0, 0.58, 1];
const easeInOut = [0.42, 0, 0.58, 1];

// ========================================
// Hero Section Animations
// ========================================
const heroContent = document.querySelector('.hero-content');
if (heroContent) {
  // Badge - opacity: 0→1, y: 20→0, duration: 0.6s
  const badge = heroContent.querySelector('.hero-badge');
  if (badge) {
    animate(badge,
      { opacity: [0, 1], y: [20, 0] },
      { duration: 0.6, easing: easeOut }
    );
  }

  // Title - opacity: 0→1, y: 30→0, duration: 0.6s
  const title = heroContent.querySelector('h1');
  if (title) {
    animate(title,
      { opacity: [0, 1], y: [30, 0] },
      { duration: 0.6, easing: easeOut }
    );
  }

  // CTA Button - opacity: 0→1, y: 20→0, duration: 0.6s
  const cta = heroContent.querySelector('.hero-cta');
  if (cta) {
    animate(cta,
      { opacity: [0, 1], y: [20, 0] },
      { duration: 0.6, easing: easeOut }
    );
  }
}

// Hero text section - opacity: 0→1, y: 30→0, duration: 0.8s
const heroText = document.querySelector('.hero-text');
if (heroText) {
  inView(heroText, ({ target }) => {
    animate(target,
      { opacity: [0, 1], y: [30, 0] },
      { duration: 0.8, easing: easeOut }
    );
  }, { margin: '-100px', amount: 0.3 });
}

// ========================================
// Section Headers Animation
// opacity: 0→1, y: 40→0, duration: 0.6s
// ========================================
document.querySelectorAll('.section-header').forEach(header => {
  inView(header, ({ target }) => {
    const badge = target.querySelector('.badge');
    const title = target.querySelector('h2');
    const desc = target.querySelector('p');

    const elements = [badge, title, desc].filter(Boolean);
    elements.forEach((el, i) => {
      animate(el,
        { opacity: [0, 1], y: [40, 0] },
        { duration: 0.6, delay: i * 0.1, easing: easeOut }
      );
    });
  }, { margin: '-100px', amount: 0.3 });
});

// ========================================
// Cards Grid Animation
// opacity: 0→1, y: 40→0, duration: 0.6s, delay: 0.2s + stagger
// ========================================
document.querySelectorAll('.cards-grid').forEach(grid => {
  const cards = grid.querySelectorAll('.card');
  if (cards.length > 0) {
    inView(grid, () => {
      animate(cards,
        { opacity: [0, 1], y: [40, 0] },
        { duration: 0.6, delay: stagger(0.1, { start: 0.2 }), easing: easeOut }
      );
    }, { margin: '-50px', amount: 0.1 });
  }
});

// ========================================
// Technology Tabs Animation
// Tab content: opacity: 0→1, y: 20→0, duration: 0.4s
// ========================================
const tabContents = document.querySelectorAll('[data-tab-content]');
tabContents.forEach(content => {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class' && content.classList.contains('active')) {
        // Reset and animate
        content.style.opacity = '0';
        content.style.transform = 'translateY(20px)';
        animate(content,
          { opacity: [0, 1], y: [20, 0] },
          { duration: 0.4, easing: easeOut }
        );
      }
    });
  });
  observer.observe(content, { attributes: true });
});

// Tab indicator animation (handled via CSS transition, but enhance with Motion)
const tabIndicator = document.querySelector('.tab-indicator');
const tabButtons = document.querySelectorAll('[data-tab]');
if (tabIndicator && tabButtons.length > 0) {
  tabButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      animate(tabIndicator,
        { left: [`${index * 50}%`] },
        { duration: 0.3, easing: easeInOut }
      );
    });
  });
}

// ========================================
// FAQ Items Animation
// opacity: 0→1, x: -20→0, staggered
// ========================================
const faqList = document.querySelector('.faq-list');
if (faqList) {
  const faqItems = faqList.querySelectorAll('.faq-item');
  inView(faqList, () => {
    animate(faqItems,
      { opacity: [0, 1], x: [-20, 0] },
      { duration: 0.4, delay: stagger(0.08), easing: easeOut }
    );
  }, { margin: '-50px', amount: 0.2 });
}

// ========================================
// Code Window Animation
// opacity: 0→1, y: 20→0, scale: 0.98→1
// ========================================
document.querySelectorAll('.code-window').forEach(codeWindow => {
  inView(codeWindow, ({ target }) => {
    animate(target,
      { opacity: [0, 1], y: [20, 0], scale: [0.98, 1] },
      { duration: 0.6, easing: easeOut }
    );
  }, { margin: '-50px' });
});

// ========================================
// Mobile Menu Animation (matching Header.tsx)
// Overlay: opacity 0→1, duration: 0.3s
// Nav items: stagger x: -20→0, delay +0.05s each
// Demo button: scale 0.9→1, delay: 0.5s
// ========================================
const mobileMenu = document.querySelector('[data-mobile-menu]');
if (mobileMenu) {
  const menuLinks = mobileMenu.querySelectorAll('a');

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class') {
        if (mobileMenu.classList.contains('open')) {
          // Animate overlay
          animate(mobileMenu,
            { opacity: [0, 1] },
            { duration: 0.3, easing: easeInOut }
          );

          // Animate menu items with stagger (delay starts at 0.15s, +0.05s each)
          animate(menuLinks,
            { opacity: [0, 1], x: [-20, 0] },
            { duration: 0.3, delay: stagger(0.05, { start: 0.15 }), easing: easeOut }
          );

          // Demo button (last item) - scale animation
          const demoBtn = mobileMenu.querySelector('.cta-btn');
          if (demoBtn) {
            animate(demoBtn,
              { opacity: [0, 1], scale: [0.9, 1] },
              { duration: 0.3, delay: 0.5, easing: easeOut }
            );
          }
        }
      }
    });
  });
  observer.observe(mobileMenu, { attributes: true });
}

// ========================================
// Cookie Panel Animation
// y: 100→0, opacity: 0→1, duration: 0.4s
// ========================================
const cookiePanel = document.querySelector('[data-cookie-panel]');
if (cookiePanel) {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class') {
        if (cookiePanel.classList.contains('visible')) {
          animate(cookiePanel,
            { y: [100, 0], opacity: [0, 1] },
            { duration: 0.4, easing: easeOut }
          );
        }
      }
    });
  });
  observer.observe(cookiePanel, { attributes: true });
}

// ========================================
// Blog Grid Animation (for blog.html)
// Header: y: 30→0, duration: 0.6s
// Grid: y: 40→0, duration: 0.6s, delay: 0.2s
// ========================================
const blogHeader = document.querySelector('.blog-header');
if (blogHeader) {
  inView(blogHeader, ({ target }) => {
    animate(target,
      { opacity: [0, 1], y: [30, 0] },
      { duration: 0.6, easing: easeOut }
    );
  }, { amount: 0.3 });
}

const blogGrid = document.querySelector('.blog-grid');
if (blogGrid) {
  const blogCards = blogGrid.querySelectorAll('.blog-card');
  inView(blogGrid, () => {
    animate(blogCards,
      { opacity: [0, 1], y: [40, 0] },
      { duration: 0.6, delay: stagger(0.1, { start: 0.2 }), easing: easeOut }
    );
  }, { margin: '-50px', amount: 0.1 });
}

// ========================================
// Contact Page Animation (for contact.html)
// Same pattern as blog
// ========================================
const contactHeader = document.querySelector('.contact-header');
if (contactHeader) {
  inView(contactHeader, ({ target }) => {
    animate(target,
      { opacity: [0, 1], y: [30, 0] },
      { duration: 0.6, easing: easeOut }
    );
  }, { amount: 0.3 });
}

const contactCards = document.querySelector('.contact-cards');
if (contactCards) {
  const cards = contactCards.querySelectorAll('.contact-card');
  inView(contactCards, () => {
    animate(cards,
      { opacity: [0, 1], y: [40, 0] },
      { duration: 0.6, delay: stagger(0.15, { start: 0.2 }), easing: easeOut }
    );
  }, { amount: 0.3 });
}

// ========================================
// Social CTA Animation
// Heading: scale 0.9→1, duration: 0.8s
// Buttons: y: 20→0, stagger
// ========================================
const socialSection = document.querySelector('section:last-of-type .container[style*="text-align: center"]');
if (socialSection) {
  const heading = socialSection.querySelector('h2');
  const buttons = socialSection.querySelectorAll('.card');

  inView(socialSection, () => {
    if (heading) {
      animate(heading,
        { opacity: [0, 1], scale: [0.9, 1] },
        { duration: 0.8, easing: easeOut }
      );
    }
    if (buttons.length > 0) {
      animate(buttons,
        { opacity: [0, 1], y: [20, 0] },
        { duration: 0.5, delay: stagger(0.1, { start: 0.3 }), easing: easeOut }
      );
    }
  }, { margin: '-100px' });
}

// ========================================
// Footer Animation
// opacity: 0→1, y: 30→0
// ========================================
const footer = document.querySelector('.footer');
if (footer) {
  const footerContent = footer.querySelector('.footer-content');
  if (footerContent) {
    inView(footer, () => {
      animate(footerContent,
        { opacity: [0, 1], y: [30, 0] },
        { duration: 0.6, easing: easeOut }
      );
    });
  }
}

// ========================================
// Blog Post Page Animation
// ========================================
const blogPost = document.querySelector('.blog-post');
if (blogPost) {
  const postHeader = blogPost.querySelector('.blog-post-header');
  const postImage = blogPost.querySelector('.blog-post-image');
  const postContent = blogPost.querySelector('.blog-post-content');

  if (postHeader) {
    animate(postHeader,
      { opacity: [0, 1], y: [30, 0] },
      { duration: 0.6, easing: easeOut }
    );
  }

  if (postImage) {
    animate(postImage,
      { opacity: [0, 1], scale: [0.98, 1] },
      { duration: 0.8, delay: 0.2, easing: easeOut }
    );
  }

  if (postContent) {
    animate(postContent,
      { opacity: [0, 1], y: [20, 0] },
      { duration: 0.6, delay: 0.4, easing: easeOut }
    );
  }
}

// ========================================
// Policy Page Animation
// ========================================
const policySection = document.querySelector('.policy');
if (policySection) {
  const policyContent = policySection.querySelector('.policy-content');
  if (policyContent) {
    animate(policyContent,
      { opacity: [0, 1], y: [30, 0] },
      { duration: 0.6, delay: 0.2, easing: easeOut }
    );
  }
}

console.log('Motion One animations loaded (Framer Motion replica)');
