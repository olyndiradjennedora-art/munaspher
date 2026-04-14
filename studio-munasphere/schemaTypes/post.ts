import {defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Publication',
  type: 'document',
  fields: [
    { name: 'title', title: 'Titre', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
    { name: 'publishedAt', title: 'Publié le', type: 'datetime' },
    { name: 'excerpt', title: 'Extrait', type: 'text' },
    { name: 'mainImage', title: 'Image principale', type: 'image' },
    { name: 'content', title: 'Contenu', type: 'array', of: [{ type: 'block' }] },
  ],
})