<script lang="ts">
import Icon from "@iconify/svelte";

interface Props {
	currentPage: number;
	totalPages: number;
	pageParam?: string;
}

let { currentPage, totalPages, pageParam = "page" }: Props = $props();

const HIDDEN = -1;
const ADJACENT_DISTANCE = 2;
const VISIBLE_COUNT = ADJACENT_DISTANCE * 2 + 1;

function buildPages(current: number, last: number): number[] {
	let count = 1;
	let left = current;
	let right = current;

	while (left - 1 > 0 && right + 1 <= last && count + 2 <= VISIBLE_COUNT) {
		count += 2;
		left--;
		right++;
	}
	while (left - 1 > 0 && count < VISIBLE_COUNT) {
		count++;
		left--;
	}
	while (right + 1 <= last && count < VISIBLE_COUNT) {
		count++;
		right++;
	}

	const result: number[] = [];
	if (left > 1) result.push(1);
	if (left === 3) result.push(2);
	if (left > 3) result.push(HIDDEN);
	for (let page = left; page <= right; page++) result.push(page);
	if (right < last - 2) result.push(HIDDEN);
	if (right === last - 2) result.push(last - 1);
	if (right < last) result.push(last);

	return result;
}

function getPageHref(page: number): string {
	const target = new URL(window.location.href);
	if (page <= 1) {
		target.searchParams.delete(pageParam);
	} else {
		target.searchParams.set(pageParam, String(page));
	}
	return `${target.pathname}${target.search}${target.hash}`;
}

const pages = $derived(buildPages(currentPage, totalPages));
</script>

{#if totalPages > 1}
	<nav class="mt-6 flex flex-row gap-3 justify-center" aria-label="分页导航">
		<a
			href={currentPage > 1 ? getPageHref(currentPage - 1) : undefined}
			aria-label="上一页"
			aria-disabled={currentPage <= 1}
			class:disabled={currentPage <= 1}
			class="btn-card overflow-hidden rounded-lg text-(--primary) w-11 h-11"
		>
			<Icon
				icon="material-symbols:chevron-left-rounded"
				class="text-[1.75rem]"
			/>
		</a>

		<div
			class="bg-(--card-bg) flex flex-row rounded-lg items-center text-neutral-700 dark:text-neutral-300 font-bold"
		>
			{#each pages as page, index (`${page}-${index}`)}
				{#if page === HIDDEN}
					<Icon icon="material-symbols:more-horiz" class="mx-1" />
			{:else if page === currentPage}
					<div
						class="h-11 w-11 rounded-lg bg-(--primary) flex items-center justify-center font-bold text-white dark:text-black/70"
						aria-current="page"
					>
						{page}
					</div>
				{:else}
					<a
						href={getPageHref(page)}
						aria-label={`第 ${page} 页`}
						class="btn-card w-11 h-11 rounded-lg overflow-hidden active:scale-[0.85]"
					>
						{page}
					</a>
				{/if}
			{/each}
		</div>

		<a
			href={currentPage < totalPages
				? getPageHref(currentPage + 1)
				: undefined}
			aria-label="下一页"
			aria-disabled={currentPage >= totalPages}
			class:disabled={currentPage >= totalPages}
			class="btn-card overflow-hidden rounded-lg text-(--primary) w-11 h-11"
		>
			<Icon
				icon="material-symbols:chevron-right-rounded"
				class="text-[1.75rem]"
			/>
		</a>
	</nav>
{/if}
