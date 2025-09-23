declare module 'tailwind-shades' {
	function shadesOf(color: string): Record<string, string>;
	export = shadesOf;
}