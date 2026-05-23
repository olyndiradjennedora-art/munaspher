import {defineType} from 'sanity'

export default defineType({
  name: 'sector',
  title: 'Secteur d\'Activité',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nom du Secteur',
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
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Courte description du secteur (optionnel)',
    },
    {
      name: 'order',
      title: 'Ordre d\'affichage',
      type: 'number',
      description: 'Numéro pour trier les secteurs',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
    },
  },
})
