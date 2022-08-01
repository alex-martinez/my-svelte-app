<script lang="ts">
  import type { EditorLanguageOptions, EditorLanguageType } from 'src/models/editor-language-type';
  import Editor from '../components/Editor.svelte';
  import { css, html, javascript } from '../matplotlib';

  let docText: EditorLanguageOptions = {
    css,
    html,
    javascript
  };

  $: srcDoc = `
    <html>
      <head>
        <script defer src="https://pyscript.net/alpha/pyscript.js"><\/script>
        <style>
          #pyscript-loading-label {
            position: fixed;
            top: 0;
            right: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,.5);
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: sans-serif;
            text-align: center;
          }

          py-script:not([id]) {
            display: none;
          }
        </style>

        <py-env>
          - matplotlib
        </py-env>
      </head>

      <body>${docText.html}</body>
      <style>${docText.css}<\/style>
      <script>${docText.javascript}<\/script>
    </html>
  `;
  let activeTab: EditorLanguageType = 'html';

  function changeActiveTab(lang: EditorLanguageType) {
    activeTab = lang;
  }

  const debounce = (func: any, delay: number) => {
    let timerId: NodeJS.Timeout;
    return () => {
      clearTimeout(timerId);
      timerId = setTimeout(func, delay);
    };
  };

  const handleChange = (val: string, lang: EditorLanguageType) => {
    docText = {
      ...docText,
      [lang]: val
    };
    console.log('DOCTEXT:', docText);
  };
</script>

<div class="w-full h-screen flex">
  <div class="w-1/2 bg-slate-800">
    <nav class="bg-slate-900">
      <button
        class="py-1 px-3 border-b-2"
        class:bg-slate-800={activeTab === 'html'}
        class:border-b-transparent={activeTab !== 'html'}
        class:border-b-indigo-400={activeTab === 'html'}
        on:click={() => changeActiveTab('html')}>HTML</button
      >
      <button
        class="py-1 px-3 border-b-2"
        class:bg-slate-800={activeTab === 'css'}
        class:border-b-transparent={activeTab !== 'css'}
        class:border-b-indigo-400={activeTab === 'css'}
        on:click={() => changeActiveTab('css')}>CSS</button
      >
      <button
        class="py-1 px-3 border-b-2"
        class:bg-slate-800={activeTab === 'javascript'}
        class:border-b-transparent={activeTab !== 'javascript'}
        class:border-b-indigo-400={activeTab === 'javascript'}
        on:click={() => changeActiveTab('javascript')}>JavaScript</button
      >
    </nav>

    {#if activeTab === 'html'}
      <Editor doc={docText.html} lang={'html'} onChange={(val) => debounce(handleChange(val, 'html'), 250)} />
    {/if}

    {#if activeTab === 'javascript'}
      <Editor doc={docText.javascript} lang={'javascript'} onChange={(val) => debounce(handleChange(val, 'javascript'), 250)} />
    {/if}

    {#if activeTab === 'css'}
      <Editor doc={docText.css} lang={'css'} onChange={(val) => debounce(handleChange(val, 'css'), 250)} />
    {/if}
  </div>

  <div class="w-1/2 bg-white">
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
