import {defineType} from 'sanity'

export default defineType({
  name: 'teamMember',
  title: 'Membre de l\'équipe',
  type: 'document',
  fields: [
    { name: 'name', title: 'Nom', type: 'string' },
    { name: 'role', title: 'Rôle', type: 'string' },
    { name: 'photo', title: 'Photo', type: 'image' },
    { name: 'bio', title: 'Bio', type: 'text' },
    { name: 'socials', title: 'Réseaux', type: 'array', of: [{ type: 'string' }] },
  ],
})