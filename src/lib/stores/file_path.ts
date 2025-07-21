import { writable } from 'svelte/store';

export const selectedPath = writable<string | null>(null);
