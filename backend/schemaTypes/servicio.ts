import { defineField, defineType } from 'sanity';

export const servicioType = defineType({
  name: 'servicio',
  title: 'Servicios',
  type: 'document',
  fields: [
    defineField({
      name: 'titulo',
      title: 'Título de la Categoría',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'descripcion',
      title: 'Descripción (Opcional)',
      type: 'text',
    }),
    defineField({
      name: 'items',
      title: 'Lista de Servicios',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icono',
      title: 'Icono o Imagen Representativa',
      type: 'image',
      options: {
        hotspot: true,
      },
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
