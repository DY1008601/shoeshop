<script lang="ts">
	import { page } from '$app/stores';
	import { t, loadTranslations } from '$lib/i18n';

	let lang = $derived($page.params.lang || 'en');
	let translations = $derived(loadTranslations(lang));

	const rows = [
		{ us: '6', uk: '5.5', eu: '39', cm: '24.5' },
		{ us: '7', uk: '6.5', eu: '40', cm: '25.0' },
		{ us: '8', uk: '7.5', eu: '41', cm: '26.0' },
		{ us: '9', uk: '8.5', eu: '42.5', cm: '27.0' },
		{ us: '10', uk: '9.5', eu: '44', cm: '28.0' },
		{ us: '11', uk: '10.5', eu: '45', cm: '29.0' },
		{ us: '12', uk: '11.5', eu: '46', cm: '30.0' },
		{ us: '13', uk: '12.5', eu: '47.5', cm: '31.0' },
	];

	let open = $state(false);
</script>

<div class="mt-6 border-t border-gray-200 pt-6">
	<button
		onclick={() => (open = !open)}
		class="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900"
	>
		<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7l5 5-5 5" />
		</svg>
		{t(translations, 'product.sizeGuide')}
	</button>

	{#if open}
		<div class="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
			<h4 class="mb-2 text-sm font-semibold text-gray-900">
				{t(translations, 'product.sizeGuideTitle')}
			</h4>
			<p class="mb-4 text-xs text-gray-500">
				{t(translations, 'product.sizeGuideDesc')}
			</p>
			<div class="overflow-x-auto">
				<table class="w-full text-left text-sm">
					<thead>
						<tr class="border-b border-gray-200">
							<th class="px-3 py-2 font-medium text-gray-900">{t(translations, 'product.usSize')}</th>
							<th class="px-3 py-2 font-medium text-gray-900">{t(translations, 'product.ukSize')}</th>
							<th class="px-3 py-2 font-medium text-gray-900">{t(translations, 'product.euSize')}</th>
							<th class="px-3 py-2 font-medium text-gray-900">{t(translations, 'product.cmSize')}</th>
						</tr>
					</thead>
					<tbody>
						{#each rows as row}
							<tr class="border-b border-gray-100">
								<td class="px-3 py-2 text-gray-700">{row.us}</td>
								<td class="px-3 py-2 text-gray-700">{row.uk}</td>
								<td class="px-3 py-2 text-gray-700">{row.eu}</td>
								<td class="px-3 py-2 text-gray-700">{row.cm}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
			<p class="mt-3 text-xs text-gray-500">
				{t(translations, 'product.sizeTip')}
			</p>
		</div>
	{/if}
</div>
