<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
	import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';
	// import 'monaco-editor/esm/vs/basic-languages/typescript/typescript.contribution'; // uncomment this line to enable typescript
	// import 'monaco-editor/esm/vs/basic-languages/html/html.contribution'; // uncomment this line to enable html
	import { code } from '$lib/js_code';

	let editorElement: HTMLElement;
	let editor: monaco.editor.IStandaloneCodeEditor;

	const dispatch = createEventDispatcher();

	onMount(() => {
		editor = monaco.editor.create(editorElement, {
			value: code,
			language: 'javascript',
			theme: 'vs-dark',
			automaticLayout: true
		});

		editor.onDidChangeModelContent(() => {
			dispatch('input', editor.getValue());
		});
	});
</script>

<div bind:this={editorElement} class="h-screen w-full" />
