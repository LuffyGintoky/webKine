import { defineField, defineType } from 'sanity';

export const equipoType = defineType({
  name: 'equipo',
  title: 'Equipo',
  type: 'document',
  fields: [
    defineField({
      name: 'nombre',
      title: 'Nombre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cargo',
      title: 'Cargo/Especialidad',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'biografia',
      title: 'Biografía',
      type: 'text',
    }),
    defineField({
      name: 'foto',
      title: 'Fotografía',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto Alternativo',
          type: 'string',
        })
      ]
    }),
  ],
});
