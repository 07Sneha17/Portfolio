import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const interactiveSelector = 'a, button, [role="button"], .skill-card, .project-card';
const nativeCursorSelector = 'input, textarea, select, [contenteditable="true"], [role="textbox"]';

function PremiumEffects() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [cursorHost] = useState(() => {
    const host = document.createElement('div');
    host.className = 'custom-cursor-host';
    return host;
  });

  useEffect(() => {
    document.body.appendChild(cursorHost);
    return () => cursorHost.remove();
  }, [cursorHost]);

  useEffect(() => {
    const targets = document.querySelectorAll('[data-reveal]');
    const root = document.documentElement;
    let observer;

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -48px 0px' });

      targets.forEach((target) => {
        const bounds = target.getBoundingClientRect();
        if (bounds.top < window.innerHeight && bounds.bottom > 0) {
          target.classList.add('is-revealed');
        } else {
          observer.observe(target);
        }
      });

      document.documentElement.classList.add('reveal-motion');
    } else {
      targets.forEach((target) => target.classList.add('is-revealed'));
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let scrollFrame = 0;
    const handleSelectionChange = () => {
      const selectingText = window.getSelection()?.type === 'Range';
      root.classList.toggle('native-selection-cursor', selectingText);
      if (selectingText) root.classList.remove('custom-cursor-enabled', 'cursor-hover', 'cursor-pressed');
    };

    const updateParallax = () => {
      scrollFrame = 0;
      if (reducedMotion.matches) return;
      const offset = Math.min(window.scrollY * 0.018, 18);
      document.documentElement.style.setProperty('--ambient-offset', `${offset}px`);
      document.documentElement.style.setProperty('--ambient-offset-reverse', `${-offset * 0.55}px`);
    };

    const handleScroll = () => {
      if (!scrollFrame && !reducedMotion.matches) {
        scrollFrame = window.requestAnimationFrame(updateParallax);
      }
    };

    const handleMotionPreferenceChange = () => {
      if (reducedMotion.matches) {
        if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
        scrollFrame = 0;
        document.documentElement.style.removeProperty('--ambient-offset');
        document.documentElement.style.removeProperty('--ambient-offset-reverse');
      } else {
        updateParallax();
      }
    };

    handleMotionPreferenceChange();
    document.addEventListener('selectionchange', handleSelectionChange);
    window.addEventListener('scroll', handleScroll, { passive: true });
    reducedMotion.addEventListener('change', handleMotionPreferenceChange);

    return () => {
      observer?.disconnect();
      root.classList.remove('reveal-motion', 'native-selection-cursor');
      document.removeEventListener('selectionchange', handleSelectionChange);
      window.removeEventListener('scroll', handleScroll);
      reducedMotion.removeEventListener('change', handleMotionPreferenceChange);
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
      document.documentElement.style.removeProperty('--ambient-offset');
      document.documentElement.style.removeProperty('--ambient-offset-reverse');
    };
  }, []);

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const root = document.documentElement;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return undefined;

    let pointerX = 0;
    let pointerY = 0;
    let ringX = 0;
    let ringY = 0;
    let frame = 0;
    let isInitialized = false;
    let hoveredElement = null;
    let tiltedCard = null;
    let spotlightCard = null;
    let magneticButton = null;
    let rippleButton = null;
    let rippleTimeout = 0;

    const resetTilt = () => {
      if (!tiltedCard) return;
      tiltedCard.style.removeProperty('--tilt-x');
      tiltedCard.style.removeProperty('--tilt-y');
      tiltedCard = null;
    };

    const resetMagnetic = () => {
      if (!magneticButton) return;
      magneticButton.style.removeProperty('--magnetic-x');
      magneticButton.style.removeProperty('--magnetic-y');
      magneticButton = null;
    };

    const resetSpotlight = () => {
      if (!spotlightCard) return;
      spotlightCard.style.removeProperty('--spotlight-x');
      spotlightCard.style.removeProperty('--spotlight-y');
      spotlightCard = null;
    };

    const animate = () => {
      frame = 0;
      dot.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0) translate(-50%, -50%)`;
      ringX += (pointerX - ringX) * 0.2;
      ringY += (pointerY - ringY) * 0.2;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

      if (Math.abs(pointerX - ringX) > 0.2 || Math.abs(pointerY - ringY) > 0.2) {
        frame = window.requestAnimationFrame(animate);
      }
    };

    const scheduleAnimation = () => {
      if (!frame) frame = window.requestAnimationFrame(animate);
    };

    const handlePointerMove = (event) => {
      if (event.pointerType !== 'mouse') return;
      if (reducedMotion.matches || !finePointer.matches) {
        handleMotionPreferenceChange();
        return;
      }

      const target = event.target instanceof Element ? event.target : null;
      if (target?.closest(nativeCursorSelector)) {
        pointerX = event.clientX;
        pointerY = event.clientY;
        if (!isInitialized) {
          ringX = pointerX;
          ringY = pointerY;
          isInitialized = true;
        }
        root.classList.remove('custom-cursor-enabled', 'cursor-hover', 'cursor-pressed');
        root.classList.add('cursor-input-mode');
        scheduleAnimation();
        hoveredElement = null;
        resetTilt();
        resetSpotlight();
        resetMagnetic();
        return;
      }
      if (window.getSelection()?.type === 'Range') {
        root.classList.remove('custom-cursor-enabled', 'cursor-hover', 'cursor-pressed');
        root.classList.remove('cursor-input-mode');
        hoveredElement = null;
        resetTilt();
        resetSpotlight();
        resetMagnetic();
        return;
      }

      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!isInitialized) {
        ringX = pointerX;
        ringY = pointerY;
        isInitialized = true;
      }
      root.classList.remove('cursor-input-mode');
      root.classList.add('custom-cursor-enabled');
      scheduleAnimation();

      const nextHoveredElement = target?.closest(interactiveSelector) ?? null;
      if (nextHoveredElement !== hoveredElement) {
        hoveredElement = nextHoveredElement;
        root.classList.toggle('cursor-hover', Boolean(hoveredElement));
      }

      const nextTiltedCard = target?.closest('[data-tilt]') ?? null;
      if (nextTiltedCard !== tiltedCard) {
        resetTilt();
        tiltedCard = nextTiltedCard;
      }
      if (tiltedCard) {
        const bounds = tiltedCard.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        const maxTilt = Number(tiltedCard.dataset.tilt) || 6;
        tiltedCard.style.setProperty('--tilt-x', `${x * maxTilt}deg`);
        tiltedCard.style.setProperty('--tilt-y', `${y * -maxTilt}deg`);
      }

      const nextSpotlightCard = target?.closest('[data-spotlight]') ?? null;
      if (nextSpotlightCard !== spotlightCard) {
        resetSpotlight();
        spotlightCard = nextSpotlightCard;
      }
      if (spotlightCard) {
        const bounds = spotlightCard.getBoundingClientRect();
        spotlightCard.style.setProperty('--spotlight-x', `${event.clientX - bounds.left}px`);
        spotlightCard.style.setProperty('--spotlight-y', `${event.clientY - bounds.top}px`);
      }

      const nextMagneticButton = target?.closest('[data-magnetic]') ?? null;
      if (nextMagneticButton !== magneticButton) {
        resetMagnetic();
        magneticButton = nextMagneticButton;
      }
      if (magneticButton) {
        const bounds = magneticButton.getBoundingClientRect();
        const x = (event.clientX - bounds.left - bounds.width / 2) * 0.08;
        const y = (event.clientY - bounds.top - bounds.height / 2) * 0.08;
        magneticButton.style.setProperty('--magnetic-x', `${Math.max(-4, Math.min(4, x))}px`);
        magneticButton.style.setProperty('--magnetic-y', `${Math.max(-3, Math.min(3, y))}px`);
      }
    };

    const hideCursor = () => {
      root.classList.remove('custom-cursor-enabled', 'cursor-hover', 'cursor-pressed', 'cursor-input-mode');
      hoveredElement = null;
      isInitialized = false;
      resetTilt();
      resetSpotlight();
      resetMagnetic();
    };
    const handlePointerLeave = () => hideCursor();
    const handlePointerOut = (event) => {
      if (event.relatedTarget === null) hideCursor();
    };

    const handlePointerDown = (event) => {
      if (event.pointerType === 'mouse' && root.classList.contains('custom-cursor-enabled')) {
        root.classList.add('cursor-pressed');
      }

      const target = event.target instanceof Element ? event.target : null;
      const button = !reducedMotion.matches ? target?.closest('.button-primary') : null;
      if (button) {
        if (rippleTimeout) window.clearTimeout(rippleTimeout);
        rippleButton?.classList.remove('ripple-active');
        rippleButton = button;
        const bounds = button.getBoundingClientRect();
        button.style.setProperty('--ripple-x', `${event.clientX - bounds.left}px`);
        button.style.setProperty('--ripple-y', `${event.clientY - bounds.top}px`);
        button.classList.add('ripple-active');
        rippleTimeout = window.setTimeout(() => {
          button.classList.remove('ripple-active');
          rippleButton = null;
          rippleTimeout = 0;
        }, 650);
      }
    };

    const handlePointerUp = () => root.classList.remove('cursor-pressed');
    const handleMotionPreferenceChange = () => {
      if (reducedMotion.matches || !finePointer.matches) {
        root.classList.remove('custom-cursor-enabled', 'cursor-hover', 'cursor-pressed', 'cursor-input-mode');
        root.classList.toggle('native-selection-cursor', window.getSelection()?.type === 'Range');
        resetTilt();
        resetSpotlight();
        resetMagnetic();
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerleave', handlePointerLeave);
    document.addEventListener('pointerout', handlePointerOut);
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);
    finePointer.addEventListener('change', handleMotionPreferenceChange);
    reducedMotion.addEventListener('change', handleMotionPreferenceChange);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      document.removeEventListener('pointerout', handlePointerOut);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
      finePointer.removeEventListener('change', handleMotionPreferenceChange);
      reducedMotion.removeEventListener('change', handleMotionPreferenceChange);
      if (frame) window.cancelAnimationFrame(frame);
      if (rippleTimeout) window.clearTimeout(rippleTimeout);
      rippleButton?.classList.remove('ripple-active');
      resetTilt();
      resetSpotlight();
      resetMagnetic();
      root.classList.remove('custom-cursor-enabled', 'cursor-hover', 'cursor-pressed', 'cursor-input-mode', 'native-selection-cursor');
    };
  }, []);

  return createPortal(
    <>
      <span ref={ringRef} className="custom-cursor-ring" />
      <span ref={dotRef} className="custom-cursor-dot" />
    </>,
    cursorHost
  );
}

export default PremiumEffects;
