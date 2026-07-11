<script lang="ts">
import QueryPagination from "@components/control/QueryPagination.svelte";

interface Entry {
	title: string;
	url: string;
	date: string;
	isPdf: boolean;
	tags: Array<{
		name: string;
		url: string;
	}>;
}

interface Props {
	entries: Entry[];
	pageSize?: number;
}

let { entries, pageSize = 12 }: Props = $props();

function parsePage(value: string | null): number {
	const page = Number.parseInt(value ?? "1", 10);
	return Number.isFinite(page) && page > 0 ? page : 1;
}

const params = new URLSearchParams(window.location.search);
const totalPages = Math.max(1, Math.ceil(entries.length / pageSize));
const currentPage = Math.min(parsePage(params.get("page")), totalPages);
const pageStart = (currentPage - 1) * pageSize;
const visibleEntries = entries.slice(pageStart, pageStart + pageSize);

const target = new URL(window.location.href);
if (parsePage(target.searchParams.get("page")) !== currentPage) {
	if (currentPage === 1) {
		target.searchParams.delete("page");
	} else {
		target.searchParams.set("page", String(currentPage));
	}
	window.history.replaceState({}, "", target);
}
</script>

<ul class="entry-list">
	{#each visibleEntries as entry (entry.url)}
		<li class="entry">
			<a class="entry-title" href={entry.url}>{entry.title}</a>
			<div class="entry-meta">
				<time>{entry.date}</time>
				{#if entry.isPdf}<span class="pdf-badge">PDF</span>{/if}
				{#each entry.tags as tag (tag.url)}
					<a
						class="tag"
						href={tag.url}
						aria-label={`查看带有 ${tag.name} 标签的文章`}
					>
						{tag.name}
					</a>
				{/each}
			</div>
		</li>
	{/each}
</ul>

<QueryPagination {currentPage} {totalPages} />

<style>
.entry-list {
	list-style: none;
	margin: 0;
	padding: 0;
}

.entry {
	padding: 0.9rem 0;
	border-bottom: 1px solid var(--line-divider);
}

.entry:last-child {
	border-bottom: none;
}

.entry-title {
	font-family: var(--font-reading);
	font-size: 1.2rem;
	color: var(--ink);
	text-decoration: none;
	transition: color 150ms ease;
}

.entry-title:hover {
	color: var(--primary);
}

.entry-meta {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 0.5rem;
	margin-top: 0.35rem;
	font-family: var(--font-code);
	font-size: 12px;
	color: var(--muted);
}

.tag {
	display: inline-flex;
	align-items: center;
	min-height: 1.65rem;
	padding: 0.15rem 0.58rem;
	border: 1px solid var(--line-divider);
	border-radius: 8px;
	background: var(--btn-regular-bg);
	color: var(--btn-content);
	line-height: 1;
	text-decoration: none;
	transition:
		background-color 150ms ease,
		border-color 150ms ease,
		color 150ms ease,
		transform 150ms ease;
}

.tag:hover {
	border-color: var(--primary);
	background: var(--btn-plain-bg-hover);
	color: var(--primary);
	transform: translateY(-1px);
}

.tag:active {
	background: var(--btn-plain-bg-active);
	transform: translateY(0);
}

.pdf-badge {
	padding: 1px 8px;
	border-radius: 999px;
	background: var(--tool-bg);
	color: var(--blue-ink);
	letter-spacing: 0.04em;
}
</style>
