<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
	import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';
	import 'monaco-editor/esm/vs/basic-languages/typescript/typescript.contribution';
	import { tsCode } from '$lib/ts_code';

	let editorElement: HTMLElement;
	let editor: monaco.editor.IStandaloneCodeEditor;

	const dispatch = createEventDispatcher();

	onMount(() => {
		editor = monaco.editor.create(editorElement, {
			value: tsCode,
			language: 'typescript',
			theme: 'vs-dark'
		});

		editor.onDidChangeModelContent(() => {
			dispatch('input', editor.getValue());
		});

		const handleResize = () => {
			editor.layout();
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	});
</script>

<div bind:this={editorElement} class="h-screen w-full" />
