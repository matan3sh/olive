import { defineType, defineField } from 'sanity'

export const hero = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'document',
  fields: [
    defineField({ name: 'tag', title: 'Tag', type: 'localizedString' }),
    defineField({ name: 'title', title: 'Title', type: 'localizedString' }),
    defineField({ name: 'subtitle', title: 'Subtitle', type: 'localizedString' }),
    defineField({ name: 'cta', title: 'CTA', type: 'localizedString' }),
    defineField({ name: 'sideLabel', title: 'Side Label', type: 'localizedString' }),
    defineField({ name: 'backgroundImage', title: 'Background Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'video', title: 'Video Path', type: 'string' }),
  ],
})
