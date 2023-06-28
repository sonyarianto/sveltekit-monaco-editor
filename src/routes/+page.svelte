<script lang="ts">
	import loader from '@monaco-editor/loader';
	import { onDestroy, onMount } from 'svelte';
	import type * as Monaco from 'monaco-editor/esm/vs/editor/editor.api';
	import { code as jsCode } from '$lib/js_code';
	import { code as tsCode } from '$lib/ts_code';
	import { code as phpCode } from '$lib/php_code';
	import { code as pyCode } from '$lib/py_code';
	import { code as htmlCode } from '$lib/html_code';

	let editor: Monaco.editor.IStandaloneCodeEditor;
	let monaco: typeof Monaco;
	let editorContainer: HTMLElement;
	let model: Monaco.editor.ITextModel;

	function loadCode(code: string, language: string) {
		model = monaco.editor.createModel(code, language);

		editor.setModel(model);
	}

	onMount(async () => {
		// Remove the next two lines to load the monaco editor from a CDN
		// see https://www.npmjs.com/package/@monaco-editor/loader#config

		const monacoEditor = await import('monaco-editor');
		loader.config({ monaco: monacoEditor.default });

		monaco = await loader.init(); // monaco is now available

		editor = monaco.editor.create(editorContainer, {
			theme: 'vs-dark',
			automaticLayout: true
		});

		loadCode(jsCode, 'javascript');
	});

	onDestroy(() => {
		monaco?.editor.getModels().forEach((model) => model.dispose());
	});
</script>

<div class="h-screen flex flex-col w-full">
	<div class="flex gap-x-1 p-1">
		<button class="w-fit border-2 p-1" on:click={() => loadCode(jsCode, 'javascript')}
			>JavaScript</button
		>
		<button class="w-fit border-2 p-1" on:click={() => loadCode(tsCode, 'typescript')}
			>TypeScript</button
		>
		<button class="w-fit border-2 p-1" on:click={() => loadCode(phpCode, 'php')}>PHP</button>
		<button class="w-fit border-2 p-1" on:click={() => loadCode(pyCode, 'python')}>Python</button>
		<button class="w-fit border-2 p-1" on:click={() => loadCode(htmlCode, 'html')}>HTML</button>
	</div>
	<div class="flex-grow" bind:this={editorContainer} />
</div>
