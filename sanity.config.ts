import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './studio/schemaTypes'

export default defineConfig({
  name: 'valley-olive-oil',
  title: 'Valley Olive Oil',
  projectId: '0lduqtjx',
  dataset: 'production',
  basePath: '/studio',
  plugins: [structureTool()],
  schema: { types: schemaTypes },
})
