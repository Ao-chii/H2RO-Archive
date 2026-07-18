(function () {
	var PAGE_SIZE = 10;
	var PAGINATION_EVENT = "game-pagination";

	function parsePositivePage(value) {
		var page = Number.parseInt(value || "1", 10);
		return Number.isFinite(page) && page > 0 ? page : 1;
	}

	function initGameLibrary() {
		if (window.__gameLibraryCleanup) {
			window.__gameLibraryCleanup();
			window.__gameLibraryCleanup = null;
		}

		var library = document.querySelector(".game-library");
		if (!library) return;

		var filterContainer = library.querySelector(".filter-tabs");
		var tabs = filterContainer
			? Array.from(filterContainer.querySelectorAll(".filter-tabs-item"))
			: [];
		var grid = library.querySelector("#game-grid");
		var noResults = library.querySelector("#no-results");
		if (!filterContainer || !grid || tabs.length === 0) return;

		var items = Array.from(grid.querySelectorAll(".game-entry[data-status]"));
		var validStatuses = new Set(
			tabs.map(function (tab) {
				return tab.dataset.filterValue || "all";
			}),
		);
		var listeners = [];
		var currentStatus = "all";
		var currentPage = 1;
		var currentTotalPages = 1;

		function resetItemAnimation(item) {
			if (item.__gameAnimationFrame) {
				cancelAnimationFrame(item.__gameAnimationFrame);
				item.__gameAnimationFrame = null;
			}
			if (item.__gameAnimationTimer) {
				clearTimeout(item.__gameAnimationTimer);
				item.__gameAnimationTimer = null;
			}
			item.classList.remove("filter-fade-in", "filter-fade-in-active");
			item.style.transitionDelay = "";
		}

		function animateVisibleItems(visibleItems, shouldAnimate) {
			var reduceMotion = window.matchMedia(
				"(prefers-reduced-motion: reduce)",
			).matches;
			if (!shouldAnimate || reduceMotion) return;

			visibleItems.forEach(function (item, index) {
				var delay = index * 25;
				item.classList.add("filter-fade-in");
				item.style.transitionDelay = delay + "ms";
				item.__gameAnimationFrame = requestAnimationFrame(function () {
					item.__gameAnimationFrame = null;
					if (item.classList.contains("filtered-out")) return;
					item.classList.remove("filter-fade-in");
					item.classList.add("filter-fade-in-active");
					item.__gameAnimationTimer = setTimeout(function () {
						item.classList.remove("filter-fade-in-active");
						item.style.transitionDelay = "";
						item.__gameAnimationTimer = null;
					}, 500 + delay);
				});
			});
		}

		function getRequestedStatus() {
			var params = new URLSearchParams(window.location.search);
			var status = params.get("status") || "all";
			return validStatuses.has(status) ? status : "all";
		}

		function getGameUrl(status, page) {
			var target = new URL(window.location.href);
			if (status === "all") {
				target.searchParams.delete("status");
			} else {
				target.searchParams.set("status", status);
			}
			if (page <= 1) {
				target.searchParams.delete("page");
			} else {
				target.searchParams.set("page", String(page));
			}
			return target.pathname + target.search + target.hash;
		}

		function updateBrowserUrl(status, page, mode) {
			if (!mode) return;
			window.history[mode + "State"]({}, "", getGameUrl(status, page));
		}

		function updatePagination() {
			window.dispatchEvent(
				new CustomEvent(PAGINATION_EVENT + ":update", {
					detail: {
						currentPage: currentPage,
						totalPages: currentTotalPages,
					},
				}),
			);
		}

		function applyGameView(status, requestedPage, options) {
			var settings = options || {};
			var filteredItems = items.filter(function (item) {
				return status === "all" || item.dataset.status === status;
			});
			var totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE));
			var page = Math.min(Math.max(1, requestedPage), totalPages);
			var pageStart = (page - 1) * PAGE_SIZE;
			var visibleItems = filteredItems.slice(
				pageStart,
				pageStart + PAGE_SIZE,
			);
			var visibleSet = new Set(visibleItems);

			items.forEach(function (item) {
				resetItemAnimation(item);
				item.classList.toggle("filtered-out", !visibleSet.has(item));
			});
			animateVisibleItems(visibleItems, settings.animate !== false);

			tabs.forEach(function (tab) {
				tab.classList.toggle(
					"active",
					(tab.dataset.filterValue || "all") === status,
				);
			});

			if (noResults) {
				noResults.classList.toggle("hidden", filteredItems.length > 0);
			}

			currentStatus = status;
			currentPage = page;
			currentTotalPages = totalPages;
			updateBrowserUrl(status, page, settings.historyMode);
			updatePagination();

			if (settings.scroll) {
				var top = grid.getBoundingClientRect().top + window.scrollY - 96;
				var reduceMotion = window.matchMedia(
					"(prefers-reduced-motion: reduce)",
				).matches;
				window.scrollTo({
					top: top,
					behavior: reduceMotion ? "auto" : "smooth",
				});
			}
		}

		tabs.forEach(function (tab) {
			var clickHandler = function () {
				applyGameView(tab.dataset.filterValue || "all", 1, {
					historyMode: "push",
				});
			};
			tab.addEventListener("click", clickHandler);
			listeners.push([tab, "click", clickHandler]);
		});

		var paginationNavigateHandler = function (event) {
			var page = parsePositivePage(event.detail && event.detail.page);
			applyGameView(currentStatus, page, {
				historyMode: "push",
				scroll: true,
			});
		};
		window.addEventListener(
			PAGINATION_EVENT + ":navigate",
			paginationNavigateHandler,
		);
		listeners.push([
			window,
			PAGINATION_EVENT + ":navigate",
			paginationNavigateHandler,
		]);

		var paginationReadyHandler = function () {
			updatePagination();
		};
		window.addEventListener(
			PAGINATION_EVENT + ":ready",
			paginationReadyHandler,
		);
		listeners.push([
			window,
			PAGINATION_EVENT + ":ready",
			paginationReadyHandler,
		]);

		var popstateHandler = function () {
			var params = new URLSearchParams(window.location.search);
			applyGameView(
				getRequestedStatus(),
				parsePositivePage(params.get("page")),
				{ animate: true },
			);
		};
		window.addEventListener("popstate", popstateHandler);
		listeners.push([window, "popstate", popstateHandler]);

		var initialParams = new URLSearchParams(window.location.search);
		applyGameView(
			getRequestedStatus(),
			parsePositivePage(initialParams.get("page")),
			{ animate: false, historyMode: "replace" },
		);

		window.__gameLibraryCleanup = function () {
			listeners.forEach(function (listener) {
				listener[0].removeEventListener(listener[1], listener[2]);
			});
			items.forEach(resetItemAnimation);
		};
	}

	function onInit() {
		initGameLibrary();
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", onInit);
	} else {
		onInit();
	}
	document.addEventListener("astro:page-load", onInit);

	function setupSwupListeners() {
		if (!window.swup || window.__gameLibrarySwupBound) return;
		window.__gameLibrarySwupBound = true;
		window.swup.hooks.on("content:replace", function () {
			setTimeout(onInit, 0);
		});
		window.swup.hooks.on("page:view", function () {
			setTimeout(onInit, 0);
		});
	}

	if (window.swup) {
		setupSwupListeners();
	} else {
		document.addEventListener("swup:enable", setupSwupListeners);
	}
})();
