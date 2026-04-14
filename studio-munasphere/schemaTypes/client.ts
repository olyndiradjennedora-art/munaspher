import {defineType} from 'sanity'

export default defineType({
  name: 'client',
  title: 'Client',
  type: 'document',
  fields: [
    { name: 'name', title: 'Nom', type: 'string' },
    { name: 'logo', title: 'Logo', type: 'image' },
    { name: 'sector', title: 'Secteur', type: 'string' },
  ],
})