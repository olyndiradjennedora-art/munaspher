import {defineType} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Réalisation',
  type: 'document',
  fields: [
    { name: 'title', title: 'Titre', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
    { name: 'client', title: 'Client', type: 'string' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'mainImage', title: 'Image principale', type: 'image' },
    { name: 'gallery', title: 'Galerie', type: 'array', of: [{ type: 'image' }] },
    { name: 'publishedAt', title: 'Publié le', type: 'datetime' },
  ],
})