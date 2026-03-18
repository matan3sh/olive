import { defineType, defineField } from 'sanity'

export const about = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    defineField({ name: 'tag', title: 'Tag', type: 'localizedString' }),
    defineField({ name: 'heading', title: 'Heading', type: 'localizedString' }),
    defineField({ name: 'body', title: 'Body', type: 'localizedString' }),
    defineField({ name: 'image1', title: 'Image 1', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'image2', title: 'Image 2', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'id', type: 'string' }),
          defineField({ name: 'num', type: 'string' }),
          defineField({ name: 'label', type: 'localizedString' }),
          defineField({ name: 'dark', type: 'boolean' }),
        ],
      }],
    }),
  ],
})
