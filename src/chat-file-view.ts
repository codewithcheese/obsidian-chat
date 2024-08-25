import {
	App,
	Plugin,
	PluginSettingTab,
	Setting,
	TFile,
	TextFileView,
	WorkspaceLeaf,
} from "obsidian";

interface ChatFileData {
	title: string;
	content: string;
	// Add more fields as needed
}

export const CHAT_FILE_VIEW_TYPE = "chat-file";
export const CHAT_FILE_VIEW_EXTENSION = "chat";

export class ChatFileView extends TextFileView {
	chatData: ChatFileData = ChatFileView.newChatData();

	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
	}

	getViewType(): string {
		return CHAT_FILE_VIEW_TYPE;
	}

	getDisplayText(): string {
		return this.chatData.title || "New chat";
	}

	getIcon(): string {
		return "document";
	}

	async onOpen() {
		this.contentEl.empty();
		if (this.data) {
			this.contentEl.createEl("h1", { text: this.chatData.title });
			this.contentEl.createEl("div", { text: this.chatData.content });
		}
	}

	async onClose() {
		// We don't need to do anything here
	}

	async setViewData(data: string, clear: boolean) {
		this.chatData = JSON.parse(data);
		await this.onOpen();
	}

	getViewData(): string {
		return JSON.stringify(this.data);
	}

	clear(): void {
		this.chatData = { title: "Untitled", content: "" };
		this.onOpen();
	}

	static newChatData(): ChatFileData {
		return {
			title: "Untitled",
			content: "",
		};
	}
}
