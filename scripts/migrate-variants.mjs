/**
 * Migration: sizes + price → variants
 *
 * For every product document that has a `sizes` array and/or `price` string
 * but no `variants` array, this script creates a variants array from the
 * existing data and patches the document.
 *
 * Run: node scripts/migrate-variants.mjs
 */

import { createClient } from '@sanity/client'
import { randomUUID } from 'crypto'

const client = createClient({
  projectId: '0lduqtjx',
  dataset: 'production',
  apiVersion: '2025-03-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const query = `*[_type == "product" && defined(sizes) && count(sizes) > 0] {
  _id, price, sizes, variants
}`

const docs = await client.fetch(query)

if (docs.length === 0) {
  console.log('No products need migration.')
  process.exit(0)
}

console.log(`Found ${docs.length} product(s) to migrate:\n`)

for (const doc of docs) {
  const alreadyHasVariants = Array.isArray(doc.variants) && doc.variants.length > 0

  if (alreadyHasVariants) {
    console.log(`  [SKIP] ${doc._id} — already has ${doc.variants.length} variant(s)`)
    continue
  }

  const price = doc.price ?? ''
  const sizes = doc.sizes ?? []

  const variants = sizes.map((label) => ({
    _type: 'object',
    _key: randomUUID().slice(0, 8),
    label,
    price,
    stock: 'in_stock',
  }))

  console.log(`  [PATCH] ${doc._id}`)
  console.log(`    sizes: ${JSON.stringify(sizes)}`)
  console.log(`    price: ${price}`)
  console.log(`    → ${variants.length} variant(s) created`)

  await client.patch(doc._id).set({ variants }).commit()
}

console.log('\nMigration complete.')
