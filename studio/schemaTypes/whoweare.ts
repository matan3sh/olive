import { defineType, defineField } from 'sanity'

export const whoweare = defineType({
  name: 'whoweare',
  title: 'Who We Are',
  type: 'document',
  fields: [
    defineField({ name: 'heroQuote',    title: 'Hero Quote',    type: 'localizedString' }),
    defineField({ name: 'heroSubtitle', title: 'Hero Subtitle', type: 'localizedString' }),
    defineField({
      name: 'chapters', title: 'Chapters', type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'label',   title: 'Label',   type: 'localizedString' }),
          defineField({ name: 'heading', title: 'Heading', type: 'localizedString' }),
          defineField({ name: 'body',    title: 'Body',    type: 'localizedString' }),
          defineField({ name: 'image',   title: 'Image',   type: 'image', options: { hotspot: true } }),
          defineField({ name: 'side',    title: 'Image side (left | right)', type: 'string' }),
        ],
      }],
    }),
    defineField({
      name: 'stats', title: 'Stats', type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'id',   type: 'string' }),
          defineField({ name: 'num',  type: 'string' }),
          defineField({ name: 'label', type: 'localizedString' }),
          defineField({ name: 'dark', type: 'boolean' }),
        ],
      }],
    }),
    defineField({ name: 'ctaEyebrow', title: 'CTA Eyebrow', type: 'localizedString' }),
    defineField({ name: 'ctaHeading', title: 'CTA Heading', type: 'localizedString' }),
    defineField({ name: 'ctaLabel',   title: 'CTA Label',   type: 'localizedString' }),
  ],
})
