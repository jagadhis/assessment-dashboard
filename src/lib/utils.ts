import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * tailwind-merge has to know the custom theme tokens in src/styles/index.css. Otherwise it
 * reads `text-card-title` as a text colour and drops it when a colour class follows.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ['page-title', 'card-title', 'card-subtitle', 'label', 'caption', 'stat', 'kpi'],
      spacing: ['gutter', 'section', 'card'],
      radius: ['control', 'card', 'pill'],
      shadow: ['card', 'selected', 'score'],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
