/**
 * CG Recruiting & Development - Main JavaScript
 * Vanilla JS only - no frameworks
 */

(function() {
  'use strict';

  // ==========================================================================
  // DOM Ready
  // ==========================================================================
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initMobileNav();
    initScrollAnimations();
    initFAQ();
    initPricingToggle();
    initSmoothScroll();
    initHeaderScroll();
  }

  // ==========================================================================
  // Mobile Navigation
  // ==========================================================================
  function initMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const mobileNav = document.querySelector('.nav-mobile');
    const mobileLinks = document.querySelectorAll('.nav-mobile .nav-link');
    const dropdowns = document.querySelectorAll('.nav-mobile .nav-dropdown-toggle');

    if (!toggle || !mobileNav) return;

    // Toggle mobile nav
    toggle.addEventListener('click', function() {
      toggle.classList.toggle('active');
      mobileNav.classList.toggle('active');
      document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });

    // Close on link click
    mobileLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        // Check if it's a dropdown toggle
        if (link.classList.contains('nav-dropdown-toggle')) {
          const parent = link.closest('.nav-dropdown');
          parent.classList.toggle('active');
          return;
        }
        toggle.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Handle dropdown toggles in mobile
    dropdowns.forEach(function(dropdownToggle) {
      dropdownToggle.addEventListener('click', function(e) {
        e.preventDefault();
        const parent = dropdownToggle.closest('.nav-dropdown');
        parent.classList.toggle('active');
      });
    });

    // Close on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
        toggle.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // ==========================================================================
  // Scroll Animations (Intersection Observer)
  // ==========================================================================
  function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in, .stagger-children');

    if (!fadeElements.length || !('IntersectionObserver' in window)) {
      // Fallback: show all elements immediately
      fadeElements.forEach(function(el) {
        el.classList.add('visible');
      });
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    fadeElements.forEach(function(el) {
      observer.observe(el);
    });
  }

  // ==========================================================================
  // FAQ Accordion
  // ==========================================================================
  function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    if (!faqItems.length) return;

    faqItems.forEach(function(item) {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');

      if (!question || !answer) return;

      question.addEventListener('click', function() {
        const isOpen = item.classList.contains('active');

        // Close all other items
        faqItems.forEach(function(otherItem) {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
          }
        });

        // Toggle current item
        item.classList.toggle('active');

        // Set aria-expanded
        question.setAttribute('aria-expanded', !isOpen);
      });

      // Keyboard accessibility
      question.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          question.click();
        }
      });
    });
  }

  // ==========================================================================
  // Pricing Toggle (Monthly / Annual)
  // ==========================================================================
  function initPricingToggle() {
    const toggle = document.querySelector('.pricing-toggle-switch');
    const monthlyLabel = document.querySelector('[data-pricing="monthly"]');
    const annualLabel = document.querySelector('[data-pricing="annual"]');
    const monthlyPrices = document.querySelectorAll('[data-price="monthly"]');
    const annualPrices = document.querySelectorAll('[data-price="annual"]');

    if (!toggle) return;

    let isAnnual = false;

    toggle.addEventListener('click', function() {
      isAnnual = !isAnnual;
      toggle.classList.toggle('active', isAnnual);

      if (monthlyLabel) monthlyLabel.classList.toggle('active', !isAnnual);
      if (annualLabel) annualLabel.classList.toggle('active', isAnnual);

      // Toggle price visibility
      monthlyPrices.forEach(function(el) {
        el.style.display = isAnnual ? 'none' : 'block';
      });

      annualPrices.forEach(function(el) {
        el.style.display = isAnnual ? 'block' : 'none';
      });
    });

    // Keyboard accessibility
    toggle.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle.click();
      }
    });
  }

  // ==========================================================================
  // Smooth Scroll for Anchor Links
  // ==========================================================================
  function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(function(link) {
      link.addEventListener('click', function(e) {
        const href = link.getAttribute('href');

        if (href === '#') return;

        const target = document.querySelector(href);

        if (target) {
          e.preventDefault();
          const headerHeight = document.querySelector('.header')?.offsetHeight || 70;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // ==========================================================================
  // Header Scroll Effect
  // ==========================================================================
  function initHeaderScroll() {
    const header = document.querySelector('.header');

    if (!header) return;

    let lastScroll = 0;

    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;

      // Add/remove scrolled class based on position
      if (currentScroll > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      lastScroll = currentScroll;
    }, { passive: true });
  }

  // ==========================================================================
  // Form Validation (Basic)
  // ==========================================================================
  window.validateForm = function(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(function(field) {
      if (!field.value.trim()) {
        isValid = false;
        field.classList.add('error');
      } else {
        field.classList.remove('error');
      }
    });

    return isValid;
  };

  // ==========================================================================
  // Utility: Throttle
  // ==========================================================================
  function throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(function() {
          inThrottle = false;
        }, limit);
      }
    };
  }

})();
