import {defineType} from 'sanity'

export default defineType({
  name: 'client',
  title: 'Compagnie/Client',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nom de la Compagnie',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'sector',
      title: 'Secteur d\'Activité',
      type: 'reference',
      to: [{type: 'sector'}],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'order',
      title: 'Ordre d\'affichage',
      type: 'number',
      description: 'Numéro pour trier les compagnies dans le secteur',
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      subtitle: 'sector.name',
    },
  },
})
