import { defineType, defineField } from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  preview: {
    select: { title: 'title.en', media: 'image' },
  },
  fields: [
    defineField({ name: 'id', title: 'ID (slug)', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'active', title: 'Active', type: 'boolean' }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean' }),
    defineField({ name: 'acidity', title: 'Acidity', type: 'string' }),
    defineField({ name: 'fit', title: 'Image Fit', type: 'string' }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Extra Virgin', value: 'Extra Virgin' },
          { title: 'Infused', value: 'Infused' },
          { title: 'Gift Sets', value: 'Gift Sets' },
        ],
      },
    }),
    defineField({
      name: 'variants',
      title: 'Variants',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Size Label', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'price', title: 'Price', type: 'string', validation: (r) => r.required() }),
            defineField({
              name: 'stock',
              title: 'Stock Status',
              type: 'string',
              options: {
                list: [
                  { title: 'In Stock', value: 'in_stock' },
                  { title: 'Few Left', value: 'few_left' },
                  { title: 'Out of Stock', value: 'out_of_stock' },
                ],
              },
              validation: (r) => r.required(),
            }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'price' },
          },
        },
      ],
    }),
    defineField({ name: 'image', title: 'Product Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'title', title: 'Title', type: 'localizedString' }),
    defineField({ name: 'subtitle', title: 'Subtitle', type: 'localizedString' }),
    defineField({ name: 'description', title: 'Description', type: 'localizedString' }),
    defineField({ name: 'origin', title: 'Origin', type: 'localizedString' }),
    defineField({ name: 'harvest', title: 'Harvest', type: 'localizedString' }),
  ],
})
