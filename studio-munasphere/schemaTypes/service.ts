import {defineType} from 'sanity'

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
  {
    name: 'title',
    title: 'Titre',
    type: 'string'
  },
  {
    name: 'slug',
    title: 'Slug',
    type: 'slug',
    options: { source: 'title' }
  },
  {
    name: 'category',
    title: 'Catégorie',
    type: 'string'
  },
  {
    name: 'description',
    title: 'Description',
    type: 'text'
  },
  {
    name: 'image',
    title: 'Image',
    type: 'image',
    options: {
      hotspot: true
    }
  }
],
})