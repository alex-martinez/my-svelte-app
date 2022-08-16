<script lang="ts">
  import { onMount } from 'svelte';
  import { basicSetup, EditorView } from 'codemirror';
  import { oneDark } from '@codemirror/theme-one-dark';
  import { javascript } from '@codemirror/lang-javascript';
  import { xml } from '@codemirror/lang-xml';
  import { css } from '@codemirror/lang-css';
  import { keymap } from '@codemirror/view';
  import { indentWithTab } from '@codemirror/commands';

  import type { ViewUpdate } from '@codemirror/view';
  import type { EditorLanguageType } from '../models/editor-language-type';

  export let lang: EditorLanguageType;
  export let onChange: (docText: string, lang: EditorLanguageType) => void;
  export let doc: string;

  let editorEl: HTMLElement;

  const syntax = {
    css,
    html: xml,
    javascript,
    head: xml,
  };

  onMount(() => {
    new EditorView({
      doc,
      extensions: [
        basicSetup,
        keymap.of([indentWithTab]),
        oneDark,
        syntax[lang](),
        EditorView.lineWrapping,
        EditorView.updateListener.of((v: ViewUpdate) => {
          if (v.docChanged) {
            onChange(v.state.doc.toString(), lang);
          }
        }),
      ],
      parent: editorEl,
    });
  });
</script>

<div class="overflow-y-auto" style="height: calc(100% - 42px)" bind:this={editorEl} />
