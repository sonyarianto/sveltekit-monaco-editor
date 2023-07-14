<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import * as monaco from 'monaco-editor';
	import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
	import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
	import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
	import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
	import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

	import { code as jsCode } from '$lib/js_code';
	import { code as tsCode } from '$lib/ts_code';
	import { code as phpCode } from '$lib/php_code';
	import { code as pyCode } from '$lib/py_code';
	import { code as htmlCode } from '$lib/html_code';

	let editorElement: HTMLDivElement;
	let editor: monaco.editor.IStandaloneCodeEditor;
	let model: monaco.editor.ITextModel;

	function loadCode(code: string, language: string) {
		model = monaco.editor.createModel(code, language);

		editor.setModel(model);
	}

	onMount(async () => {
		self.MonacoEnvironment = {
			getWorker: function (_: any, label: string) {
				if (label === 'json') {
					return new jsonWorker();
				}
				if (label === 'css' || label === 'scss' || label === 'less') {
					return new cssWorker();
				}
				if (label === 'html' || label === 'handlebars' || label === 'razor') {
					return new htmlWorker();
				}
				if (label === 'typescript' || label === 'javascript') {
					return new tsWorker();
				}
				return new editorWorker();
			}
		};

		monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);
		
		editor = monaco.editor.create(editorElement, {
			automaticLayout: true,
			theme: 'vs-dark'
		});

		loadCode(jsCode, 'javascript');
	});

	onDestroy(() => {
		monaco?.editor.getModels().forEach((model) => model.dispose());
	});
</script>

<div class="flex h-screen w-full flex-col">
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
	<div class="flex-grow" bind:this={editorElement} />
</div>
