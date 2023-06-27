export const tsCode = `// Simple demo of Monaco Editor using SvelteKit
// Best regards,
// Sony AK <sony@sony-ak.com>
// Nice isn't it? I hope you like it and find it useful.

import { onMount, createEventDispatcher } from 'svelte';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';
import 'monaco-editor/esm/vs/basic-languages/typescript/typescript.contribution';

let editorElement: HTMLElement;
let editor: monaco.editor.IStandaloneCodeEditor;

const dispatch = createEventDispatcher();

onMount(() => {
    editor = monaco.editor.create(editorElement, {
        value: 'console.log("I am the Monaco Editor");',
        language: 'javascript',
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
});`;
