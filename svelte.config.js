import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

const isProd = process.env.NODE_ENV === 'production';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    preprocess({
      postcss: true,
    }),
  ],

  kit: {
    prerender: {
      default: true,
    },
    adapter: adapter({
      pages: 'docs',
      assets: 'docs',
    }),
    paths: {
      base: isProd ? '/svelte-code-editor' : '',
    },
  },
};

export default config;
