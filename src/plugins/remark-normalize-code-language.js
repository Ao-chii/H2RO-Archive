import { visit } from "unist-util-visit";

export function remarkNormalizeCodeLanguage() {
	return (tree) => {
		visit(tree, "code", (node) => {
			if (typeof node.lang === "string") {
				node.lang = node.lang.trim().toLowerCase();
			}
		});
	};
}
