import { defineField, defineType } from 'sanity';

export const instalacionType = defineType({
  name: 'instalacion',
  title: 'Instalaciones y Equipamiento',
  type: 'document',
  fields: [
    defineField({
      name: 'titulo',
      title: 'Título/Nombre del Espacio',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'descripcion',
      title: 'Descripción del Espacio',
      type: 'text',
    }),
    defineField({
      name: 'foto',
      title: 'Fotografía de la Instalación',
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
