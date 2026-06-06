import { defineConfig } from 'astro/config'
import react from '@astrojs/react'

// Static output. The React integration lets us author Cobalt's React
// components inside .astro pages; without a `client:*` directive Astro
// server-renders them to HTML and ships no component JS to the browser.
export default defineConfig({
  output: 'static',
  integrations: [react()],
})
