export type Product = {
  id: string
  title: string
  subtitle: string
  price: string
  sizes: string[]
  image: string
  fit: 'cover' | 'contain'
  description: string
  origin: string
  harvest: string
  acidity: string
}

export const PRODUCTS: Product[] = [
  {
    id: 'robust',
    title: 'ROBUST 100% CALIFORNIA EXTRA VIRGIN OLIVE OIL',
    subtitle: 'Robust',
    price: '$9.99',
    sizes: ['250ml', '500ml', '750ml'],
    image: '/figma/product-bottle.jpg',
    fit: 'cover',
    description:
      'Our Robust blend is cold-pressed from hand-picked California olives at peak ripeness. Intensely flavored with a peppery finish — perfect for drizzling over grilled meats, hearty salads, and crusty bread.',
    origin: 'California, USA',
    harvest: 'November – December',
    acidity: '< 0.3%',
  },
  {
    id: 'classic',
    title: 'CLASSIC 100% CALIFORNIA EXTRA VIRGIN OLIVE OIL',
    subtitle: 'Classic',
    price: '$9.99',
    sizes: ['250ml', '500ml', '750ml'],
    image: '/figma/product-bottle-2.jpg',
    fit: 'contain',
    description:
      'A beautifully balanced extra virgin olive oil with a smooth, buttery character and mild fruitiness. Versatile enough for everyday cooking, baking, and dipping.',
    origin: 'California, USA',
    harvest: 'October – November',
    acidity: '< 0.3%',
  },
  {
    id: 'mild',
    title: 'MILD 100% CALIFORNIA EXTRA VIRGIN OLIVE OIL',
    subtitle: 'Mild',
    price: '$9.99',
    sizes: ['250ml', '500ml', '750ml'],
    image: '/figma/product-bottle.jpg',
    fit: 'cover',
    description:
      'Delicate and light with a gentle fruity aroma. Our Mild blend is ideal for dressings, marinades, and any dish where you want the olive oil to complement rather than dominate.',
    origin: 'California, USA',
    harvest: 'October – November',
    acidity: '< 0.2%',
  },
  {
    id: 'tin',
    title: '100% CALIFORNIA EXTRA VIRGIN OLIVE OIL TIN',
    subtitle: 'Classic Tin',
    price: '$9.99',
    sizes: ['1L', '3L', '5L'],
    image: '/figma/product-tin.jpg',
    fit: 'contain',
    description:
      'The same award-winning California extra virgin olive oil, packaged in a traditional tin that protects against light and preserves freshness longer. A beautiful addition to any kitchen.',
    origin: 'California, USA',
    harvest: 'October – December',
    acidity: '< 0.3%',
  },
]
