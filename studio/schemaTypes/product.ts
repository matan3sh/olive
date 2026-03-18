import { defineType, defineField } from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({ name: 'id', title: 'ID (slug)', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'active', title: 'Active', type: 'boolean' }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean' }),
    defineField({ name: 'price', title: 'Price', type: 'string' }),
    defineField({ name: 'acidity', title: 'Acidity', type: 'string' }),
    defineField({ name: 'fit', title: 'Image Fit', type: 'string' }),
    defineField({ name: 'sizes', title: 'Sizes', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'image', title: 'Product Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'title', title: 'Title', type: 'localizedString' }),
    defineField({ name: 'subtitle', title: 'Subtitle', type: 'localizedString' }),
    defineField({ name: 'description', title: 'Description', type: 'localizedString' }),
    defineField({ name: 'origin', title: 'Origin', type: 'localizedString' }),
    defineField({ name: 'harvest', title: 'Harvest', type: 'localizedString' }),
  ],
})
