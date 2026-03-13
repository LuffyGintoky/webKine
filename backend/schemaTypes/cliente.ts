import { defineField, defineType } from 'sanity';

export const clienteType = defineType({
  name: 'cliente',
  title: 'Clientes y Testimonios',
  type: 'document',
  fields: [
    defineField({
      name: 'nombre',
      title: 'Nombre del Paciente/Deportista',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'testimonio',
      title: 'Testimonio',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'foto',
      title: 'Foto del Paciente en el Centro',
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
