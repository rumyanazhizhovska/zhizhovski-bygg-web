"use client";

import { useEffect, type RefObject } from "react";

type Callback = () => void;

const callbacks = new Set<Callback>();
let rafId = 0;
let listenerAttached = false;

function runAll() {
  rafId = 0;
  callbacks.forEach((cb) => cb());
}

function schedule() {
  if (rafId) return;

  rafId = requestAnimationFrame(runAll);
}

function ensureListener() {
  if (listenerAttached) return;

  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);

  listenerAttached = true;
}

export function useBorderProgress(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    ensureListener();

    const update = () => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();

      // Find the center of the element and viewport
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;

      // Distance between element center and viewport center
      const distance = Math.abs(elementCenter - viewportCenter);

      // Maximum distance where animation is visible
      const maxDistance = window.innerHeight / 2;

      // Convert distance into 0-1 progress
      const progress = 1 - distance / maxDistance;

      const clamped = Math.min(Math.max(progress, 0), 1);

      el.style.setProperty("--progress", clamped.toString());
    };

    callbacks.add(update);

    // Run once immediately
    update();

    return () => {
      callbacks.delete(update);
    };
  }, [ref]);
}