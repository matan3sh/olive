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
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      description: 'Reviewer email — stored for admin reference only, never shown publicly.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'emailVerified',
      title: 'Email Verified',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'verificationToken',
      title: 'Verification Token',
      type: 'string',
      description: 'Random UUID — cleared after use. Do not edit manually.',
      readOnly: true,
    }),
    defineField({
      name: 'locale',
      title: 'Locale',
      type: 'string',
      options: { list: ['en', 'he'] },
      description: 'Locale at time of submission — used for redirect after verification.',
    }),
  ],
})
