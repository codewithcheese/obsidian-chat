import { ItemView, WorkspaceLeaf } from "obsidian";

import Component from "./Component.svelte";
import { mount, unmount } from "svelte";

export const VIEW_TYPE_EXAMPLE = "example-view";

export class ExampleView extends ItemView {
	// component: Component;

	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
	}

	getViewType() {
		return VIEW_TYPE_EXAMPLE;
	}

	getDisplayText() {
		return "Example view";
	}

	async onOpen() {
		mount(Component, { target: this.contentEl, props: { variable: 2 } });
	}

	async onClose() {
		unmount(this.contentEl);
	}
}
