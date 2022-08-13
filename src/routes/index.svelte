<script lang="ts">
  import { onMount } from 'svelte';
  import type { EditorLanguageOptions, EditorLanguageType } from 'src/models/editor-language-type';
  import Editor from '../components/editor.svelte';
  import { css, html, javascript, head } from '../matplotlib';

  let isMac: boolean;
  let docText: EditorLanguageOptions = {
    css,
    html,
    javascript,
    head,
  };
  let docTextCache = { ...docText };
  let activeTab: EditorLanguageType = 'html';

  $: srcDoc = `
    <html>
      <head>${docText.head}</head>
      <body>${docText.html}</body>
      <style>${docText.css}<\/style>
      <script>${docText.javascript}<\/script>
    </html>
  `;

  onMount(() => {
    isMac = navigator.userAgent.indexOf('Mac') !== -1;
  });

  function changeActiveTab(lang: EditorLanguageType) {
    activeTab = lang;
  }

  function handleChange(val: string, lang: EditorLanguageType) {
    docTextCache[lang] = val;
  }

  function onSaveAndRun() {
    docText = docTextCache;
  }

  function handleKeydown(e: KeyboardEvent) {
    const metaKey = isMac ? e.metaKey : e.ctrlKey;

    if (metaKey && e.code === 'KeyS') {
      e.preventDefault();
      onSaveAndRun();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="w-full h-screen flex flex-col sm:flex-row">
  <div class="h-1/2 sm:h-auto sm:w-1/2 bg-slate-800">
    <!-- TODO: Separate tabs into own component -->
    <nav class="flex items-center bg-slate-900 overflow-x-auto">
      <button
        class="py-2 px-3 border-b-2 hover:border-b-indigo-400"
        class:bg-slate-800={activeTab === 'html'}
        class:border-b-transparent={activeTab !== 'html'}
        class:border-b-indigo-400={activeTab === 'html'}
        on:click={() => changeActiveTab('html')}>HTML</button
      >
      <button
        class="py-2 px-3 border-b-2 hover:border-b-indigo-400"
        class:bg-slate-800={activeTab === 'head'}
        class:border-b-transparent={activeTab !== 'head'}
        class:border-b-indigo-400={activeTab === 'head'}
        on:click={() => changeActiveTab('head')}>Head</button
      >
      <button
        class="py-2 px-3 border-b-2 hover:border-b-indigo-400"
        class:bg-slate-800={activeTab === 'css'}
        class:border-b-transparent={activeTab !== 'css'}
        class:border-b-indigo-400={activeTab === 'css'}
        on:click={() => changeActiveTab('css')}>CSS</button
      >
      <button
        class="py-2 px-3 border-b-2 hover:border-b-indigo-400"
        class:bg-slate-800={activeTab === 'javascript'}
        class:border-b-transparent={activeTab !== 'javascript'}
        class:border-b-indigo-400={activeTab === 'javascript'}
        on:click={() => changeActiveTab('javascript')}>JS</button
      >

      <span class="hidden sm:block flex-none ml-auto mr-2 text-xs">
        {#if isMac}
          cmd
        {:else}
          ctrl
        {/if}
        + s
      </span>

      <button
        class="flex-none rounded-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-sm px-2 py-0.5 mr-2 ml-auto sm:ml-0"
        on:click={onSaveAndRun}>Save & run</button
      >
    </nav>

    {#if activeTab === 'html'}
      <Editor doc={docText.html} lang={'html'} onChange={handleChange} />
    {/if}

    {#if activeTab === 'head'}
      <Editor doc={docText.head} lang={'head'} onChange={handleChange} />
    {/if}

    {#if activeTab === 'javascript'}
      <Editor doc={docText.javascript} lang={'javascript'} onChange={handleChange} />
    {/if}

    {#if activeTab === 'css'}
      <Editor doc={docText.css} lang={'css'} onChange={handleChange} />
    {/if}
  </div>

  <div class="h-1/2 sm:h-auto sm:w-1/2 bg-white">
    <iframe
      {srcDoc}
      title="output"
      sandbox="allow-scripts"
      frameborder="0"
      width="100%"
      height="100%"
    />
  </div>
</div>
