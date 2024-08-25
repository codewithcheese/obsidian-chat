import * as fs from "node:fs";
import * as path from "node:path";
import * as process from "node:process";
import esbuild from "esbuild";
import builtins from "builtin-modules";
import esbuildSvelte from "esbuild-svelte";
import { sveltePreprocess } from "svelte-preprocess";

const banner = `/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/
`;

const prod = process.argv[2] === "production";

const context = await esbuild.context({
	banner: {
		js: banner,
	},
	entryPoints: ["src/main.ts", "src/styles.css"],
	bundle: true,
	external: [
		"obsidian",
		"electron",
		"@codemirror/autocomplete",
		"@codemirror/collab",
		"@codemirror/commands",
		"@codemirror/language",
		"@codemirror/lint",
		"@codemirror/search",
		"@codemirror/state",
		"@codemirror/view",
		"@lezer/common",
		"@lezer/highlight",
		"@lezer/lr",
		...builtins,
	],
	format: "cjs",
	target: "es2018",
	logLevel: "info",
	sourcemap: prod ? false : "inline",
	treeShaking: true,
	outdir: "./build",
	minify: prod,
	plugins: [
		esbuildSvelte({
			compilerOptions: { css: true },
			preprocess: sveltePreprocess(),
		}),
	],
});

async function copyManifest() {
	await fs.promises.copyFile(
		"./manifest.json",
		path.join("./build", "manifest.json")
	);
}

if (prod) {
	await context.rebuild();
	await copyManifest();
	process.exit(0);
} else {
	await context.watch();
	await copyManifest();
}
