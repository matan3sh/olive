import { defineType, defineField } from 'sanity'

export const review = defineType({
  name: 'review',
  title: 'Review',
  type: 'document',
  preview: {
    select: { title: 'author', subtitle: 'product' },
  },
  fields: [
    defineField({ name: 'product', title: 'Product ID', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'author', title: 'Author', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'rating',
      title: 'Rating (1–5)',
      type: 'number',
      validation: (r) => r.required().min(1).max(5).integer(),
    }),
    defineField({ name: 'quote', title: 'Review Text', type: 'text' }),
    defineField({ name: 'date', title: 'Date', type: 'date', validation: (r) => r.required() }),
    defineField({ name: 'approved', title: 'Approved', type: 'boolean', initialValue: false }),
  ],
})
