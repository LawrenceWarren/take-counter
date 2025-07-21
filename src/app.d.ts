// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}

	interface Window {
		api: {
			main: () => void;
			preload: () => void;
			set_always_on_top: (alwaysOnTop: boolean) => void;
			select_directory: () => Promise<string | null>;
			watch_directory: (dirPath: string, filter_text: string) => Promise<void>;
			on_directory_count: (callback: (count: number) => void) => void;
		};
	}
}

export {};
