import { defineType, defineField } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'id', title: 'ID', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'quote', title: 'Quote', type: 'localizedString' }),
    defineField({ name: 'author', title: 'Author', type: 'localizedString' }),
  ],
})
