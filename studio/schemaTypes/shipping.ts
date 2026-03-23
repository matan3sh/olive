import { defineType, defineField } from 'sanity'

export const shippingSettings = defineType({
  name: 'shippingSettings',
  title: 'Shipping Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'zones',
      title: 'Shipping Zones',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Zone Name', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'price', title: 'Price', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'estimatedDays', title: 'Estimated Delivery', type: 'string' }),
            defineField({ name: 'freeThreshold', title: 'Free Shipping Above', type: 'string' }),
          ],
          preview: { select: { title: 'label', subtitle: 'price' } },
        },
      ],
    }),
    defineField({ name: 'notes', title: 'Notes', type: 'localizedString' }),
  ],
})
