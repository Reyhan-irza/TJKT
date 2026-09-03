import { ArrowRight, Instagram, Play, Youtube } from 'lucide-react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import Lenis from '@/lib/lenis';
import { gsap } from '@/lib/gsap';
import { ScrollTrigger } from '@/lib/gsap';
import { navItems, site } from '@/data/site';
import { media } from '@/data/media';
import { createPortal } from 'react-dom';

gsap.registerPlugin(ScrollTrigger);

export function Seo({ title, description }: { title: string; description: string }) {
  useEffect(() => {
    document.title = title;
    const descriptionTag = document.querySelector('meta[name="description"]') ?? document.createElement('meta');
    descriptionTag.setAttribute('name', 'description');
    descriptionTag.setAttribute('content', description);
    document.head.appendChild(descriptionTag);
    const ogTitle = document.querySelector('meta[property="og:title"]') ?? document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    ogTitle.setAttribute('content', title);
    document.head.appendChild(ogTitle);
    const ogDescription = document.querySelector('meta[property="og:description"]') ?? document.createElement('meta');
    ogDescription.setAttribute('property', 'og:description');
    ogDescription.setAttribute('content', description);
    document.head.appendChild(ogDescription);
    const ogType = document.querySelector('meta[property="og:type"]') ?? document.createElement('meta');
    ogType.setAttribute('property', 'og:type');
    ogType.setAttribute('content', 'website');
    document.head.appendChild(ogType);
    const ogSite = document.querySelector('meta[property="og:site_name"]') ?? document.createElement('meta');
    ogSite.setAttribute('property', 'og:site_name');
    ogSite.setAttribute('content', site.school);
    document.head.appendChild(ogSite);
  }, [description, title]);
  return null;
}

export function MotionRoot({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 980px)').matches;
    const root = document.documentElement;
    const header = document.querySelector<HTMLElement>('.site-header');
    let lenis: Lenis | null = null;
    let refreshFrame = 0;
    let refreshTimer = 0;
    let setMarqueeSkew: (value: number) => void = () => undefined;
    let setMarqueeSpeed: (value: number) => void = () => undefined;
    const marqueeSpeed = { value: 1 };
    let marqueeDirection = 1;
    const marqueeAnimations: gsap.core.Tween[] = [];
    const onTick = (time: number) => {
      lenis?.raf(time * 1000);
      marqueeAnimations.forEach((animation) => animation.timeScale(marqueeDirection * marqueeSpeed.value));
    };
    const onLenisScroll = (instance: Lenis) => {
      ScrollTrigger.update();
      const velocity = Math.max(-2.2, Math.min(2.2, instance.velocity / 28));
      setMarqueeSkew(velocity);
      setMarqueeSpeed(1 + Math.min(1.35, Math.abs(velocity) * .45));
    };
    document.documentElement.classList.add('is-ready');
    const media = gsap.matchMedia();
    const images = Array.from(document.images).filter((image) => !image.complete);
    const refresh = () => {
      if (refreshTimer) window.clearTimeout(refreshTimer);
      refreshTimer = window.setTimeout(() => {
        refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
      }, 80);
    };
    const updateMarqueeDirection = (self: { direction: number }) => {
      const direction = self.direction === -1 ? 'up' : 'down';
      root.dataset.scrollDirection = direction;
      marqueeDirection = self.direction === -1 ? -1 : 1;
      runningBands.forEach((band) => {
        band.dataset.direction = self.direction === -1 ? 'reverse' : 'forward';
      });
      marqueeAnimations.forEach((animation) => animation.timeScale(marqueeDirection * marqueeSpeed.value));
    };
    const runningBands = gsap.utils.toArray<HTMLElement>('.running-band');
    const context = gsap.context(() => {
      const runningTracks = gsap.utils.toArray<HTMLElement>('.running-track');
      const updateSkew = runningTracks.map((track) => gsap.quickTo(track, 'skewX', {
        duration: 0.28,
        ease: 'power2.out',
      }));
      setMarqueeSkew = (value) => updateSkew.forEach((update) => update(value));
      if (!reduceMotion) {
        runningTracks.forEach((track, index) => {
          gsap.set(track, { clearProps: 'animation', xPercent: 0 });
          track.classList.add('is-gsap');
          const animation = gsap.to(track, {
            xPercent: -50,
            duration: isMobile ? 30 + index * 4 : 22 + index * 2,
            ease: 'none',
            repeat: -1,
          });
          marqueeAnimations.push(animation);
        });
        const tweenMarqueeSpeed = gsap.quickTo(marqueeSpeed, 'value', {
          duration: .42,
          ease: 'power3.out',
        });
        setMarqueeSpeed = (value) => tweenMarqueeSpeed(value);
      }
      ScrollTrigger.create({ trigger: document.documentElement, start: 0, end: 'max', onUpdate: updateMarqueeDirection });
      if (header && !reduceMotion) {
        ScrollTrigger.create({
          trigger: document.documentElement,
          start: 0,
          end: 'max',
          onUpdate: (self) => {
            if (self.scroll() < 80 || self.direction === -1) header.classList.remove('header-hidden');
            else if (!header.classList.contains('menu-active')) header.classList.add('header-hidden');
          },
        });
      }
      ScrollTrigger.create({
        trigger: document.documentElement,
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          root.style.setProperty('--scroll-progress', String(self.progress));
        },
      });
      const routePage = document.querySelector<HTMLElement>('.page-transition');
      if (routePage) {
        if (reduceMotion) {
          gsap.set(routePage, { clearProps: 'opacity,clipPath,transform' });
        } else {
          gsap.fromTo(routePage,
            { opacity: .62, y: 14, clipPath: 'inset(0 0 8% 0)' },
            { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0%)', duration: .72, ease: 'expo.out', clearProps: 'transform' },
          );
        }
      }
      const hero = document.querySelector<HTMLElement>('.hero');
      if (hero && reduceMotion) {
        gsap.set(hero.querySelectorAll<HTMLElement>('.hero-kicker, .hero-line, .hero-sub, .hero-actions > *, .hero-visual, .scroll-cue'), { opacity: 1, clipPath: 'none', clearProps: 'transform' });
      } else if (hero) {
        const heroTimeline = gsap.timeline({ defaults: { ease: 'power4.out' } });
        heroTimeline
          .fromTo('.site-header .brand, .site-header .nav, .site-header .header-cta, .site-header .menu-toggle', { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.035 }, 0)
          .fromTo('.hero-kicker', { opacity: 0, clipPath: 'inset(0 100% 0 0)' }, { opacity: 1, clipPath: 'inset(0 0% 0 0)', duration: 0.42 }, 0.08)
          .fromTo('.hero-line', { yPercent: 28, opacity: .35, rotate: 1 }, { yPercent: 0, opacity: 1, rotate: 0, duration: 0.5, stagger: 0.045 }, 0.18)
          .fromTo('.hero h1 em', { x: -16, opacity: .35 }, { x: 0, opacity: 1, duration: 0.42 }, 0.34)
          .fromTo('.hero-sub', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.38 }, 0.56)
          .fromTo('.hero-actions > *', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.34, stagger: 0.055 }, 0.68)
          .fromTo('.hero-visual', { opacity: 0, clipPath: 'inset(0 0 100% 0)' }, { opacity: 1, clipPath: 'inset(0 0 0% 0)', duration: 0.62 }, 0.18)
          .fromTo('.hero-image-frame img', { scale: 1.08, xPercent: 1.5 }, { scale: 1, xPercent: 0, duration: 0.9, ease: 'power3.out' }, 0.18)
          .fromTo('.scroll-cue', { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.35 }, 0.86);
        if (!isMobile) {
          gsap.timeline({
            scrollTrigger: {
              trigger: hero,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.9,
              invalidateOnRefresh: true,
            },
          })
            .to(hero.querySelector<HTMLElement>('.hero-copy'), { yPercent: -13, opacity: .5, ease: 'none' }, 0)
            .to(hero.querySelector<HTMLElement>('.hero-visual'), { yPercent: 14, opacity: .25, ease: 'none' }, 0)
            .to(hero.querySelector<HTMLElement>('.scroll-cue'), { y: 18, opacity: 0, ease: 'none' }, 0);
          gsap.to(hero, {
            backgroundPosition: '50% 76%',
            ease: 'none',
            scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 1.2, invalidateOnRefresh: true },
          });
          gsap.to(hero.querySelector<HTMLElement>('.hero-lines'), {
            xPercent: -13,
            opacity: .42,
            ease: 'none',
            scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 1, invalidateOnRefresh: true },
          });
        }
      }
      const pageHero = document.querySelector<HTMLElement>('.page-hero');
      if (pageHero) {
        if (reduceMotion) {
          gsap.set(pageHero.querySelectorAll<HTMLElement>('.eyebrow, h1, .page-hero-side'), { opacity: 1, clearProps: 'transform' });
        } else if (isMobile) {
          const pageHeroElements = Array.from(pageHero.querySelectorAll<HTMLElement>('.eyebrow, h1, .page-hero-side'));
          if (pageHeroElements.length) {
            gsap.fromTo(pageHeroElements, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.55, stagger: 0.07, ease: 'power3.out', scrollTrigger: { trigger: pageHero, start: 'top 88%', toggleActions: 'play none none none' } });
          }
        } else {
          gsap.timeline({
            scrollTrigger: { trigger: pageHero, start: 'top 80%', end: 'bottom 25%', scrub: 0.75, invalidateOnRefresh: true },
          })
            .fromTo(pageHero.querySelector<HTMLElement>('.eyebrow'), { opacity: 0, x: -28 }, { opacity: 1, x: 0, ease: 'power2.out' }, 0)
            .fromTo(pageHero.querySelector<HTMLElement>('h1'), { y: 42, opacity: 0 }, { y: -13, opacity: 1, ease: 'none' }, 0)
            .fromTo(pageHero.querySelector<HTMLElement>('.page-hero-side'), { opacity: 0, x: 28 }, { opacity: 1, x: 0, ease: 'power2.out' }, 0.12);
        }
      }
      const staggerGroups = [
        ['.competency-grid', '.competency'],
        ['.timeline', '.timeline-item'],
        ['.lab-grid', '.lab-slot'],
        ['.principles', '.principle'],
        ['.career-list', '.career-item'],
        ['.prospect-grid', '.prospect-card'],
        ['.ecosystem-rail', '.ecosystem-group'],
      ] as const;
      const staggerChildren = new Set<HTMLElement>();
      staggerGroups.forEach(([containerSelector, childSelector]) => {
        document.querySelectorAll<HTMLElement>(containerSelector).forEach((container) => {
          const children = Array.from(container.querySelectorAll<HTMLElement>(childSelector));
          if (!children.length) return;
          children.forEach((child) => staggerChildren.add(child));
          gsap.fromTo(children,
            { opacity: 0, x: isMobile ? 0 : -18, y: isMobile ? 18 : 28, rotate: isMobile ? 0 : -0.8, clipPath: isMobile ? 'inset(0)' : 'inset(0 0 100% 0)' },
            {
              opacity: 1, x: 0, y: 0, rotate: 0, clipPath: 'inset(0)', duration: .9,
              stagger: isMobile ? .055 : .11, ease: 'power3.out',
              scrollTrigger: {
                trigger: container,
                start: 'top 91%',
                end: 'top 55%',
                scrub: isMobile ? .28 : .7,
                invalidateOnRefresh: true,
              },
            },
          );
        });
      });
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element, index) => {
        if (element.closest('.hero') || staggerChildren.has(element)) return;
        if (reduceMotion) gsap.set(element, { opacity: 1, clipPath: 'none', clearProps: 'transform' });
        else {
          const sideReveal = index % 3 === 1;
          const fromX = sideReveal ? (index % 2 === 0 ? -26 : 26) : 0;
          const fromClip = sideReveal
            ? (fromX < 0 ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)')
            : 'inset(0 0 100% 0)';
          gsap.fromTo(element, { opacity: 0, x: fromX, y: sideReveal ? 14 : 34, rotate: sideReveal ? (fromX < 0 ? -1.2 : 1.2) : 0, clipPath: isMobile ? 'inset(0)' : fromClip }, {
            opacity: 1, x: 0, y: 0, rotate: 0, clipPath: 'inset(0)', duration: 1.1, ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 92%',
              end: 'top 63%',
               scrub: isMobile ? 0.28 : 0.8,
              invalidateOnRefresh: true,
            },
          });
        }
      });
      if (!reduceMotion) {
        const parallaxScrub = isMobile ? 0.32 : 1.15;
        const parallaxY = isMobile ? -4 : -9;
        const parallaxScale = isMobile ? 1.025 : 1.06;
        gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((element) => {
          gsap.to(element, { yPercent: parallaxY, xPercent: isMobile ? .6 : 1.5, scale: parallaxScale, ease: 'none', scrollTrigger: { trigger: element, start: 'top bottom', end: 'bottom top', scrub: parallaxScrub, invalidateOnRefresh: true } });
        });
        gsap.utils.toArray<HTMLElement>('.slot-image').forEach((image) => {
          gsap.fromTo(image, { scale: isMobile ? 1.09 : 1.14, yPercent: isMobile ? -2 : -4 }, { scale: 1, yPercent: isMobile ? 2 : 4, ease: 'none', scrollTrigger: { trigger: image.closest('.lab-slot') ?? image, start: 'top bottom', end: 'bottom top', scrub: isMobile ? .32 : 1.2, invalidateOnRefresh: true } });
        });
        gsap.utils.toArray<HTMLElement>('.blueprint').forEach((blueprint) => {
          const mark = blueprint.querySelector<HTMLElement>('.blueprint-mark');
          if (mark) gsap.to(mark, { rotation: isMobile ? 180 : 360, scale: isMobile ? 1.04 : 1.08, ease: 'none', scrollTrigger: { trigger: blueprint, start: 'top 95%', end: 'bottom 10%', scrub: isMobile ? .32 : 1.1, invalidateOnRefresh: true } });
          gsap.to(blueprint, { yPercent: isMobile ? -2 : -3, ease: 'none', scrollTrigger: { trigger: blueprint, start: 'top bottom', end: 'bottom top', scrub: isMobile ? .32 : 1, invalidateOnRefresh: true } });
        });
        gsap.utils.toArray<HTMLElement>('.number').forEach((number) => {
          const target = Number(number.textContent?.trim());
          if (!Number.isFinite(target)) return;
          const counter = { value: 0 };
          gsap.to(counter, {
            value: target,
            ease: 'none',
            scrollTrigger: { trigger: number, start: 'top 92%', end: 'top 58%', scrub: isMobile ? .28 : .85, invalidateOnRefresh: true },
            onUpdate: () => { number.textContent = String(Math.round(counter.value)).padStart(2, '0'); },
          });
        });
        gsap.utils.toArray<HTMLElement>('.cta-panel').forEach((panel) => {
          const title = panel.querySelector<HTMLElement>('h2');
          const button = panel.querySelector<HTMLElement>('.button-primary');
          if (title) gsap.fromTo(title, { y: isMobile ? 12 : 22 }, { y: isMobile ? -4 : -8, ease: 'none', scrollTrigger: { trigger: panel, start: 'top 92%', end: 'bottom 28%', scrub: isMobile ? .28 : .9, invalidateOnRefresh: true } });
          if (button) gsap.fromTo(button, { y: isMobile ? 9 : 16 }, { y: isMobile ? -3 : -5, ease: 'none', scrollTrigger: { trigger: panel, start: 'top 86%', end: 'bottom 24%', scrub: isMobile ? .28 : .9, invalidateOnRefresh: true } });
        });
        gsap.utils.toArray<HTMLElement>('.video-frame').forEach((frame) => {
          const play = frame.querySelector<HTMLElement>('.play-button');
          if (play) gsap.to(play, { yPercent: isMobile ? -10 : -22, rotation: isMobile ? 9 : 18, scale: isMobile ? 1.04 : 1.08, ease: 'none', scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: isMobile ? .32 : 1.1, invalidateOnRefresh: true } });
        });
        gsap.utils.toArray<HTMLElement>('.site-footer').forEach((footer) => {
          gsap.fromTo(footer.querySelectorAll<HTMLElement>('.footer-brand, .footer-heading, .footer-links, .footer-bottom'), { opacity: 0, y: isMobile ? 14 : 24 }, { opacity: 1, y: 0, duration: 0.85, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: footer, start: 'top 92%', end: 'top 65%', scrub: isMobile ? .28 : false, toggleActions: isMobile ? undefined : 'play none none none', invalidateOnRefresh: true } });
        });
        const story = document.querySelector<HTMLElement>('.story-section');
        if (story) {
          const words = gsap.utils.toArray<HTMLElement>('.story-word');
          const storyProgress = story.querySelector<HTMLElement>('.story-progress-line span');
          const storyNumber = story.querySelector<HTMLElement>('.story-progress-number');
          if (words.length) {
            let activeStoryIndex = -1;
            const storyTimeline = gsap.timeline({
              scrollTrigger: {
                trigger: story,
                start: isMobile ? 'top 88%' : 'top top',
                end: isMobile ? 'bottom 18%' : '+=1900',
                pin: !isMobile,
                scrub: isMobile ? .35 : 1,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                  const progress = self.progress;
                  const index = Math.min(words.length - 1, Math.floor(progress * words.length));
                  if (index !== activeStoryIndex) {
                    words.forEach((word, wordIndex) => {
                      word.classList.toggle('is-current', wordIndex === index);
                    });
                    if (storyNumber) storyNumber.textContent = `0${index + 1}`;
                    activeStoryIndex = index;
                  }
                  if (storyProgress) storyProgress.style.transform = `scaleX(${Math.max(.08, progress)})`;
                },
              },
            });
            storyTimeline
              .fromTo('.story-core', { scale: .78, rotation: -8 }, { scale: 1, rotation: 0, duration: .7, ease: 'power2.out' })
              .fromTo('.story-orbit', { rotation: -28, scale: .84 }, { rotation: 22, scale: 1.08, duration: 1.6, ease: 'none' }, 0)
              .fromTo('.story-word:nth-of-type(1)', { x: -60, y: -18, opacity: .18 }, { x: 0, y: 0, opacity: 1, duration: .5 }, .08)
              .to('.story-word:nth-of-type(1)', { x: -26, y: 18, opacity: .34, duration: .32 }, .74)
              .fromTo('.story-word:nth-of-type(2)', { x: 60, y: -16, opacity: .18 }, { x: 0, y: 0, opacity: 1, duration: .5 }, .52)
              .to('.story-word:nth-of-type(2)', { x: 30, y: 18, opacity: .34, duration: .32 }, 1.18)
              .fromTo('.story-word:nth-of-type(3)', { x: -50, y: 20, opacity: .18 }, { x: 0, y: 0, opacity: 1, duration: .5 }, .96)
              .to('.story-word:nth-of-type(3)', { x: -26, y: -14, opacity: .34, duration: .32 }, 1.62)
              .fromTo('.story-word:nth-of-type(4)', { x: 55, y: 20, opacity: .18 }, { x: 0, y: 0, opacity: 1, duration: .5 }, 1.4)
              .to('.story-core', { scale: .88, rotation: 5, duration: .55, ease: 'power2.inOut' }, 1.72);
          }
        }
      }
      media.add('(min-width: 981px)', () => {
        gsap.utils.toArray<HTMLElement>('.video-frame').forEach((frame) => {
          if (!reduceMotion) gsap.fromTo(frame, { clipPath: 'inset(12% 9% 12% 0)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: { trigger: frame, start: 'top 82%', end: 'top 38%', scrub: true } });
        });
        gsap.utils.toArray<HTMLElement>('.statement-strip, .ecosystem-section').forEach((section) => {
          if (!reduceMotion) gsap.fromTo(section, { backgroundPosition: '0 0' }, {
            backgroundPosition: '18% 12%',
            ease: 'none',
            scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1.1, invalidateOnRefresh: true },
          });
        });
      });
    });
    if (!reduceMotion && !isMobile) {
      lenis = new Lenis({
        autoRaf: false,
        duration: .78,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 0.9,
      });
      lenis.on('scroll', onLenisScroll);
      gsap.ticker.add(onTick);
      gsap.ticker.lagSmoothing(1000, 16);
    }
    window.scrollTo(0, 0);
    images.forEach((image) => image.addEventListener('load', refresh, { once: true }));
    window.addEventListener('load', refresh, { once: true });
    refresh();
    return () => {
      context.revert();
      media.revert();
      marqueeAnimations.forEach((animation) => animation.kill());
      document.querySelectorAll<HTMLElement>('.running-track.is-gsap').forEach((track) => track.classList.remove('is-gsap'));
      if (lenis) {
        lenis.off('scroll', onLenisScroll);
        lenis.destroy();
        gsap.ticker.remove(onTick);
      }
      header?.classList.remove('header-hidden');
      setMarqueeSkew = () => undefined;
      images.forEach((image) => image.removeEventListener('load', refresh));
      window.removeEventListener('load', refresh);
      if (refreshTimer) window.clearTimeout(refreshTimer);
      cancelAnimationFrame(refreshFrame);
      root.style.removeProperty('--scroll-progress');
      delete root.dataset.scrollDirection;
    };
  }, [location]);
  return <>{children}</>;
}

export function Header() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const backdropRef = useRef<HTMLButtonElement>(null);
  const menuItemsRef = useRef<HTMLAnchorElement[]>([]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    if (open) setOpen(false);
  }, [location]);

  useEffect(() => {
    if (!menuMounted) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const panel = panelRef.current;
    const backdrop = backdropRef.current;
    const items = menuItemsRef.current.filter(Boolean);
    if (!panel || !backdrop) return;
    document.body.classList.add('menu-open');
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: reduceMotion ? 'none' : 'power3.out' },
        onComplete: () => {
          if (!open) {
            setMenuMounted(false);
            menuButtonRef.current?.focus();
          }
        },
      });
      if (open) {
        timeline
          .fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: reduceMotion ? 0 : 0.35 })
          .fromTo(panel, { xPercent: 100 }, { xPercent: 0, duration: reduceMotion ? 0 : 0.65 }, '<')
          .fromTo(items, { opacity: 0, x: reduceMotion ? 0 : 22 }, { opacity: 1, x: 0, duration: reduceMotion ? 0 : 0.42, stagger: reduceMotion ? 0 : 0.06 }, '-=.3');
        requestAnimationFrame(() => items[0]?.focus());
      } else {
        timeline
          .to(items, { opacity: 0, x: reduceMotion ? 0 : 12, duration: reduceMotion ? 0 : 0.2, stagger: reduceMotion ? 0 : 0.025 })
          .to(panel, { xPercent: 100, duration: reduceMotion ? 0 : 0.45 }, '-=.08')
          .to(backdrop, { opacity: 0, duration: reduceMotion ? 0 : 0.25 }, '<');
      }
    });
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
      if (event.key === 'Tab' && items.length > 0) {
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      context.revert();
      document.body.classList.remove('menu-open');
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [menuMounted, open]);

  const toggleMenu = () => {
    if (open) setOpen(false);
    else {
      menuItemsRef.current = [];
      setMenuMounted(true);
      setOpen(true);
    }
  };

  return <>
    <header className={`site-header ${scrolled ? 'scrolled' : ''} ${open ? 'menu-active' : ''}`}>
      <span className="scroll-progress" aria-hidden="true" />
      <div className="container header-inner">
        <Link href="/" className="brand" data-testid="link-brand">
          <img className="brand-logo" src="/images/tjkt-logo.png" alt="Logo TJKT SMKN 2 Lubuk Basung" />
          <span className="brand-copy"><span>SMKN 2 LUBUK BASUNG</span><small>TEKNIK JARINGAN & TELEKOMUNIKASI</small></span>
        </Link>
        <nav className="nav" aria-label="Navigasi utama">
           {navItems.map((item) => <Link key={item.href} href={item.href} className={`nav-link ${location === item.href ? 'active' : ''}`} aria-current={location === item.href ? 'page' : undefined} data-testid={`link-nav-${item.href.slice(1) || 'beranda'}`}>{item.label}</Link>)}
        </nav>
        <Link href="/kontak" className="header-cta" data-testid="link-header-contact">Hubungi Kami <ArrowRight size={14} /></Link>
        <button ref={menuButtonRef} className="menu-toggle" aria-label={open ? 'Tutup menu' : 'Buka menu'} aria-expanded={open} aria-controls="mobile-nav-panel" onClick={toggleMenu} data-testid="button-mobile-menu">
          <span className={`menu-icon ${open ? 'is-open' : ''}`} aria-hidden="true"><i /><i /></span>
        </button>
      </div>
    </header>
    {menuMounted && typeof document !== 'undefined' && createPortal(
      <div className="mobile-nav-layer">
         <button ref={backdropRef} className="mobile-backdrop" aria-label="Tutup navigasi" onClick={() => setOpen(false)} data-testid="button-close-mobile-menu" />
        <aside ref={panelRef} id="mobile-nav-panel" className="mobile-nav" role="dialog" aria-modal="true" aria-labelledby="mobile-menu-title">
          <div className="mobile-nav-heading"><span id="mobile-menu-title">SMKN 2 LUBUK BASUNG</span><small>TJKT / MENU</small></div>
          <nav>
             {navItems.map((item, index) => <Link ref={(element) => { if (element) menuItemsRef.current[index] = element; }} key={item.href} href={item.href} className={location === item.href ? 'active' : ''} aria-current={location === item.href ? 'page' : undefined} onClick={() => setOpen(false)} data-testid={`link-mobile-${item.href.slice(1) || 'beranda'}`}>
              <span className="mobile-nav-number">0{index + 1}</span><span className="mobile-nav-label">{item.label}</span><ArrowRight size={17} />
            </Link>)}
          </nav>
          <div className="mobile-nav-footer"><span className="mono">TEKNIK JARINGAN & TELEKOMUNIKASI</span><span className="mobile-nav-rule" /></div>
        </aside>
      </div>,
      document.body,
    )}
  </>;
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" className="brand" data-testid="link-footer-brand"><img className="brand-logo" src="/images/tjkt-logo.png" alt="Logo TJKT SMKN 2 Lubuk Basung" /><span className="brand-copy"><span>SMKN 2 LUBUK BASUNG</span><small>PROGRAM KEAHLIAN</small></span></Link>
            <p className="footer-intro">Ruang informasi untuk mengenal bidang Teknik Jaringan Komputer dan Telekomunikasi di SMKN 2 Lubuk Basung.</p>
          </div>
          <div><div className="footer-heading">Jelajahi</div><div className="footer-links">{navItems.map((item) => <Link key={item.href} href={item.href} data-testid={`link-footer-${item.href.slice(1) || 'beranda'}`}>{item.label}</Link>)}</div></div>
          <div><div className="footer-heading">Terhubung</div><div className="footer-links"><a href={`mailto:${site.email}`} data-testid="link-footer-email">{site.email}</a><a href={`tel:${site.phone.replaceAll('-', '')}`} data-testid="link-footer-phone">{site.phone}</a><a href={site.instagramUrl} target="_blank" rel="noreferrer" data-testid="link-footer-instagram"><Instagram size={13} />{site.instagram}</a><a href={site.youtubeUrl} target="_blank" rel="noreferrer" data-testid="link-footer-youtube"><Youtube size={13} />YouTube TJKT</a></div></div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} {site.school}</span><span className="mono">TJKT / INFORMASI DEPARTEMEN</span></div>
      </div>
    </footer>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <MotionRoot><div className="site-shell"><Header /><main key={location} className="page-transition">{children}</main><Footer /></div></MotionRoot>;
}

export function SectionLabel({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return <div className={`eyebrow ${dark ? 'dark-label' : ''}`}>{children}</div>;
}

export function ArrowLink({ href, children, external = false }: { href: string; children: ReactNode; external?: boolean }) {
  const content = <>{children}<ArrowRight size={15} /></>;
  return external ? <a className="text-link" href={href} target="_blank" rel="noreferrer" data-testid={`link-external-${children?.toString().replaceAll(' ', '-').toLowerCase()}`}>{content}</a> : <Link className="text-link" href={href} data-testid={`link-${href.slice(1).replaceAll('/', '-') || 'home'}-arrow`}>{content}</Link>;
}

export function VideoPreview() {
  return <a className="video-frame" href={site.youtubeUrl} target="_blank" rel="noreferrer" aria-label="Buka video TJKT di YouTube" data-testid="link-video-youtube"><img className="video-still" src={media.videoThumbnail} alt="Thumbnail dokumentasi video profil TJKT SMKN 2 Lubuk Basung" width="1280" height="720" loading="lazy" decoding="async" /><span className="video-badge">VIDEO / YOUTUBE</span><span className="play-button"><Play size={24} fill="currentColor" /></span></a>;
}