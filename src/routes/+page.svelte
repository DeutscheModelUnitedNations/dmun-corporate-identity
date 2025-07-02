<script lang="ts">
	const colors = ['primary', 'secondary', 'accent', 'success', 'info', 'warning', 'error'];
	const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
</script>

{#snippet MainColor(color: string)}
	<div class="bg-{color} capitalize text-{color}-content text-center content-center font-bold">
		{color}
	</div>
{/snippet}

{#snippet ShadeColor(color: string, shade: number)}
	<div class="bg-{color}-{shade} flex justify-center items-center flex-1">
		<div class="bg-white/50 text-black px-1 py-0.5 rounded">
			{shade}
		</div>
	</div>
{/snippet}

<div class="w-full h-screen grid grid-flow-col grid-rows-11 gap-4 p-10 flex-1">
	{#each colors as color}
		{@render MainColor(color)}
		{#each shades as shade}
			{@render ShadeColor(color, shade)}
		{/each}
	{/each}
</div>