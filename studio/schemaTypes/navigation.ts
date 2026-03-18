import { defineType, defineField } from 'sanity'

const navItemFields = [
  defineField({ name: 'id', type: 'string' }),
  defineField({ name: 'href', type: 'string' }),
  defineField({ name: 'label', type: 'localizedString' }),
]

export const navigation = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'header',
      title: 'Header Links',
      type: 'array',
      of: [{ type: 'object', fields: navItemFields }],
    }),
    defineField({
      name: 'footer',
      title: 'Footer Links',
      type: 'array',
      of: [{ type: 'object', fields: navItemFields }],
    }),
  ],
})
