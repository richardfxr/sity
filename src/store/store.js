import { writable } from 'svelte/store';

export const curPage = writable(null);
export const hasCity = writable(false);
export const defaultCity = writable(null);