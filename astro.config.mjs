// @ts-check
import { defineConfig } from 'astro/config';
import basicSsl from '@vitejs/plugin-basic-ssl'

import tailwind from '@astrojs/tailwind';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [basicSsl({
      /** name of certification */
      name: 'localhost',
      /** custom trust domains */
      domains: ['*.localhost'],
      /** custom certification directory */
      certDir: './certificates'
    })],
    server: {
      https: true,
    },
  },
  integrations: [tailwind(), react()]
});