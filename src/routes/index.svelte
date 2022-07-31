<script lang="ts">
  import type { EditorLanguageOptions, EditorLanguageType } from 'src/models/editor-language-type';
  import Editor from '../components/Editor.svelte';

  const docText: EditorLanguageOptions = {
    css: `#pyscript-loading-label {
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
}

py-script:not([id]) {
  display: none;
}
`,

    html: `Hello world!
<div>
  <p>This is the current date and time, as computed by Python:</p>
  <py-script>
    from datetime import datetime
    now = datetime.now()
    now.strftime("%m/%d/%Y, %H:%M:%S")
  </py-script>
</div>`,

    javascript: `console.log('hello');`,
  };
  let srcDoc = `
    <html>
      <head>
        <script defer src="https://pyscript.net/alpha/pyscript.js"><\/script>
      </head>
      <body>${docText.html}</body>
      <style>${docText.css}<\/style>
      <script>${docText.javascript}<\/script>
    </html>
  `;
  let activeTab: EditorLanguageType = 'html';

  const handleChange = (val: string, lang: EditorLanguageType) => {
    docText[lang] = val;

    srcDoc = `
      <html>
        <head>
          <script defer src="https://pyscript.net/alpha/pyscript.js"><\/script>
        </head>
        <body>${docText.html}</body>
        <style>${docText.css}<\/style>
        <script>${docText.javascript}<\/script>
      </html>
    `;
  };

  function changeActiveTab(lang: EditorLanguageType) {
    activeTab = lang;
  }
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
      <Editor doc={docText.html} lang={'html'} onChange={handleChange} />
    {/if}

    {#if activeTab === 'javascript'}
      <Editor doc={docText.javascript} lang={'javascript'} onChange={handleChange} />
    {/if}

    {#if activeTab === 'css'}
      <Editor doc={docText.css} lang={'css'} onChange={handleChange} />
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
