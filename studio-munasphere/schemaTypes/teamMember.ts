import {defineType} from 'sanity'

export default defineType({
  name: 'teamMember',
  title: 'Membre de l\'équipe',
  type: 'document',
  fields: [
    { name: 'photo', title: 'Photo', type: 'image' },
    { name: 'name', title: 'Nom', type: 'string' },
    { name: 'role', title: 'Rôle', type: 'string' },
  ],
})