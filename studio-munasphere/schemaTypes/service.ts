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
    title: 'Description courte',
    type: 'text',
    description: 'Résumé affiché sur la carte du service',
    rows: 3
  },
  {
    name: 'detailedDescription',
    title: 'Description détaillée',
    type: 'text',
    description: 'Texte complet affiché sur la page du service (séparez les paragraphes par une ligne vide)',
    rows: 10
  },
  {
    name: 'features',
    title: 'Prestations',
    type: 'array',
    of: [{type: 'string'}],
    description: 'Liste des prestations incluses dans ce service'
  },
  {
    name: 'image',
    title: 'Image',
    type: 'image',
    options: {
      hotspot: true
    }
  },
  {
    name: 'order',
    title: 'Ordre d\'affichage',
    type: 'number',
    description: 'Numéro pour trier les services'
  }
],
preview: {
  select: {
    title: 'title',
    subtitle: 'category',
    media: 'image'
  }
}
})