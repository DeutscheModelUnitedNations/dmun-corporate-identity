<script lang="ts">
	// Theme preview for the generated daisyUI themes. Everything on this page is
	// driven by the theme tokens from `dist/dmun-daisyUI-*.css`, so it shows what
	// consumers of the package actually get — not hand-picked colours.
	let theme = $state<'light' | 'dark'>('light');

	// Die übergreifende Farbwelt: fixe Markenfarben, unabhängig vom Theme.
	const farbwelt = [
		{ hex: '#01548F', token: '--blue-700', name: 'DMUN-Blau', on: '#FFFFFF' },
		{ hex: '#1B1837', token: '--navy-900', name: 'Hintergrund dunkel', on: '#FFFFFF' },
		{ hex: '#F0EFF5', token: '--paper-tint', name: 'Hintergrund hell', on: '#1B1837' },
		{ hex: '#6D9392', token: '--accent', name: 'Akzent Türkis', on: '#FFFFFF' }
	];

	// Die DMUN-Designfarben — Abstufungen der Akzentfarbe für Grafiken.
	const designfarben = ['#9CB6B5', '#84A4A4', '#6D9392', '#557372', '#3D5352'];

	// Class strings are spelled out in full rather than interpolated: Tailwind
	// scans this file as plain text, so `bg-{name}` would never be generated.
	const semantic = [
		{ name: 'primary', cls: 'bg-primary text-primary-content' },
		{ name: 'secondary', cls: 'bg-secondary text-secondary-content' },
		{ name: 'accent', cls: 'bg-accent text-accent-content' },
		{ name: 'neutral', cls: 'bg-neutral text-neutral-content' },
		{ name: 'info', cls: 'bg-info text-info-content' },
		{ name: 'success', cls: 'bg-success text-success-content' },
		{ name: 'warning', cls: 'bg-warning text-warning-content' },
		{ name: 'error', cls: 'bg-error text-error-content' }
	];
	const surfaces = [
		{ name: 'base-100', cls: 'bg-base-100' },
		{ name: 'base-200', cls: 'bg-base-200' },
		{ name: 'base-300', cls: 'bg-base-300' }
	];
</script>

{#snippet Stripe(width = 96, thickness = 8)}
	<!-- Der Akzentstreifen: die einzige gerundete Form im System. -->
	<span
		class="bg-accent block rounded-full"
		style="width:{width}px;height:{thickness}px"
		aria-hidden="true"
	></span>
{/snippet}

{#snippet Section(title: string)}
	<div class="mt-12 mb-5 flex items-center gap-4">
		{@render Stripe(48, 8)}
		<h2 class="text-primary text-[20px] leading-none font-light">{title}</h2>
	</div>
{/snippet}

<div data-theme={theme} class="bg-base-100 text-base-content min-h-screen font-sans antialiased">
	<div class="mx-auto max-w-5xl px-8 py-10">
		<header class="flex items-start justify-between gap-6">
			<div>
				{@render Stripe(96, 14)}
				<h1 class="mt-4 text-[48px] leading-none font-extralight">Corporate Identity</h1>
				<p class="mt-2 text-[20px] font-bold">Theme-Vorschau · daisyUI</p>
			</div>
			<div class="flex shrink-0 flex-col items-end gap-2">
				<button
					class="btn btn-sm btn-primary"
					onclick={() => (theme = theme === 'light' ? 'dark' : 'light')}
				>
					{theme === 'light' ? 'Dunkles Theme' : 'Helles Theme'}
				</button>
				<a class="link text-[12px]" href="/">Farbabstufungen →</a>
			</div>
		</header>

		<!-- ── Farbwelt ──────────────────────────────────────────────────────── -->
		{@render Section('Übergreifende Farbwelt')}
		<div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
			{#each farbwelt as c}
				<!-- Hairline border so `Hintergrund dunkel` still reads on the dark theme,
				     where the swatch and the page ground are the same colour. -->
				<div
					class="border-base-300 flex h-28 flex-col justify-end border p-3"
					style="background:{c.hex};color:{c.on}"
				>
					<span class="text-[12px] font-bold">{c.name}</span>
					<span class="text-[11px] tabular-nums opacity-80">{c.hex}</span>
					<span class="text-[10px] opacity-70">{c.token}</span>
				</div>
			{/each}
		</div>
		<p class="text-base-content/70 mt-3 max-w-[66ch] text-[12px] leading-[1.35]">
			DMUN-Blau nie großflächig und nie auf dunklem Grund · höchstens zwei Hintergrundfarben pro
			Artefakt · Fließtext immer Schwarz auf Weiß · Akzentfarbe sparsam.
		</p>

		<div class="mt-5">
			<div class="mb-2 text-[10px] tracking-[0.08em] uppercase opacity-60">DMUN-Designfarben</div>
			<div class="flex">
				{#each designfarben as hex}
					<div
						class="flex h-14 flex-1 items-end p-2 text-[10px] tabular-nums text-white"
						style="background:{hex}"
					>
						{hex}
					</div>
				{/each}
			</div>
		</div>

		<!-- ── Theme-Tokens ──────────────────────────────────────────────────── -->
		{@render Section('daisyUI-Tokens')}
		<div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
			{#each semantic as s}
				<div class="{s.cls} flex h-24 flex-col justify-between p-3">
					<span class="text-[12px] font-bold capitalize">{s.name}</span>
					<span class="text-[10px] opacity-80">{s.name}-content</span>
				</div>
			{/each}
		</div>
		<div class="mt-3 grid grid-cols-3 gap-3">
			{#each surfaces as s}
				<div class="{s.cls} border-base-300 flex h-20 items-end border p-3">
					<span class="text-[12px] font-bold">{s.name}</span>
				</div>
			{/each}
		</div>

		<!-- ── Typografie ────────────────────────────────────────────────────── -->
		{@render Section('Die sechs Typo-Rollen')}
		<div class="border-base-300 border-l pl-5">
			<div class="text-[67px] leading-none font-extralight">Titel</div>
			<div class="text-base-content/50 mt-1 mb-6 text-[10px]">
				Outfit ExtraLight 200 · 50pt / 67px · LH 1
			</div>

			<div class="text-[20px] leading-none font-bold">Unterzeile</div>
			<div class="text-base-content/50 mt-1 mb-6 text-[10px]">
				Outfit Bold 700 · 15pt / 20px · LH 1
			</div>

			<div class="text-primary text-[27px] leading-none font-bold">Überschrift 1</div>
			<div class="text-base-content/50 mt-1 mb-6 text-[10px]">
				Outfit Bold 700 · 20pt / 27px · LH 1 · DMUN-Blau
			</div>

			<div class="text-primary text-[20px] leading-none font-light">Überschrift 2</div>
			<div class="text-base-content/50 mt-1 mb-6 text-[10px]">
				Outfit Light 300 · 15pt / 20px · LH 1 · DMUN-Blau
			</div>

			<div class="text-[16px] leading-none font-bold">Überschrift 3</div>
			<div class="text-base-content/50 mt-1 mb-6 text-[10px]">
				Outfit Bold 700 · 12pt / 16px · LH 1 · Schwarz
			</div>

			<p class="max-w-[66ch] text-[15px] leading-[1.3]">
				Fließtext in Outfit Regular. Als Hausschrift setzen wir auf Outfit, weil eine einzige
				Familie die gesamte Hierarchie trägt — klar und strukturiert, aber ohne steife Förmlichkeit.
			</p>
			<p class="mt-[14.3px] max-w-[66ch] text-[15px] leading-[1.3]">
				Absätze werden durch eine Leerzeile getrennt, nicht durch einen Absatzabstand. Die
				Zeilenbreite liegt bei etwa 66 Zeichen.
			</p>
			<div class="text-base-content/50 mt-1 text-[10px]">
				Outfit Regular 400 · 11pt / 15px · LH 1,3
			</div>
		</div>

		<!-- ── Komponenten ───────────────────────────────────────────────────── -->
		{@render Section('Komponenten')}
		<div class="mb-3 text-[10px] tracking-[0.08em] uppercase opacity-60">Buttons</div>
		<div class="flex flex-wrap items-center gap-2">
			<button class="btn btn-primary">Jetzt bewerben</button>
			<button class="btn btn-secondary">Sekundär</button>
			<button class="btn btn-accent">Akzent</button>
			<button class="btn btn-neutral">Neutral</button>
			<button class="btn">Standard</button>
			<button class="btn btn-outline btn-primary">Outline</button>
			<button class="btn btn-ghost">Ghost</button>
			<button class="btn btn-primary btn-sm">Klein</button>
			<button class="btn btn-primary" disabled>Deaktiviert</button>
		</div>

		<div class="mt-8 mb-3 text-[10px] tracking-[0.08em] uppercase opacity-60">Badges</div>
		<div class="flex flex-wrap items-center gap-2">
			<span class="badge badge-primary">Primary</span>
			<span class="badge badge-secondary">Sekundär</span>
			<span class="badge badge-accent">Akzent</span>
			<span class="badge badge-neutral">Neutral</span>
			<span class="badge badge-info">Info</span>
			<span class="badge badge-success">Success</span>
			<span class="badge badge-warning">Warning</span>
			<span class="badge badge-error">Error</span>
			<span class="badge badge-outline tracking-[0.08em]">ANMELDUNG OFFEN</span>
		</div>

		<div class="mt-8 mb-3 text-[10px] tracking-[0.08em] uppercase opacity-60">Formulare</div>
		<div class="grid gap-4 sm:grid-cols-2">
			<fieldset class="fieldset">
				<legend class="fieldset-legend">Name</legend>
				<input class="input w-full" placeholder="Vorname Nachname" />
			</fieldset>
			<fieldset class="fieldset">
				<legend class="fieldset-legend">Konferenz</legend>
				<select class="select w-full">
					<option>Konferenz wählen</option>
					<option>MUN-SH</option>
					<option>MUNBW</option>
				</select>
			</fieldset>
			<fieldset class="fieldset">
				<legend class="fieldset-legend">E-Mail</legend>
				<input class="input input-error w-full" value="keine-mail" aria-invalid="true" />
				<p class="label text-error">Bitte eine gültige Adresse angeben.</p>
			</fieldset>
			<div class="flex items-center gap-5">
				<label class="flex items-center gap-2 text-[15px]">
					<input type="checkbox" class="checkbox checkbox-primary" checked /> Checkbox
				</label>
				<label class="flex items-center gap-2 text-[15px]">
					<input type="radio" name="demo" class="radio radio-primary" checked /> Radio
				</label>
				<input type="checkbox" class="toggle toggle-primary" checked />
			</div>
		</div>

		<div class="mt-8 mb-3 text-[10px] tracking-[0.08em] uppercase opacity-60">
			Flächen und Hinweise
		</div>
		<div class="grid gap-4 sm:grid-cols-3">
			<div class="card bg-base-200 p-5">
				{@render Stripe(64, 8)}
				<div class="mt-3 text-[16px] font-bold">Textkasten</div>
				<p class="mt-1 text-[15px] leading-[1.3]">
					Der helle Hintergrund arbeitet im Kleinen — Kästen und Trennflächen.
				</p>
			</div>
			<div class="card bg-neutral text-neutral-content p-5">
				<div class="text-[16px] font-bold">Umkehrfläche</div>
				<p class="mt-1 text-[15px] leading-[1.3]">
					<code>bg-neutral</code> — im hellen Theme der dunkle Grund, im dunklen Theme Weiß. Nie DMUN-Blau.
				</p>
			</div>
			<div class="card border-base-300 border p-5">
				<div class="text-[16px] font-bold">Karte</div>
				<p class="mt-1 text-[15px] leading-[1.3]">
					Kanten bleiben hart — Radius nur auf interaktivem Chrome.
				</p>
			</div>
		</div>

		<div class="mt-4 grid gap-3 sm:grid-cols-2">
			<div class="alert alert-info">Die Anmeldung ist bis zum 31. Januar geöffnet.</div>
			<div class="alert alert-error">Bitte geben Sie eine gültige E-Mail-Adresse an.</div>
			<div class="alert alert-success">Ihre Anmeldung wurde gespeichert.</div>
			<div class="alert alert-warning">Diese Sitzung läuft in fünf Minuten ab.</div>
		</div>

		<div class="border-base-300 mt-12 border-t pt-4 text-[12px] opacity-60">
			Theme <code>{theme}</code> · erzeugt aus <code>src-pkg/colors.yml</code>
		</div>
	</div>
</div>
