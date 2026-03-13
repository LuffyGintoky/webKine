import { PortableTextBlock } from '@portabletext/types';

export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
}

export interface Equipo {
  _id: string;
  _type: 'equipo';
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  nombre: string;
  cargo: string;
  biografia?: string;
  foto: SanityImage;
}

export interface Servicio {
  _id: string;
  _type: 'servicio';
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  titulo: string;
  descripcion?: string;
  items: string[];
  icono?: SanityImage;
}

export interface Cliente {
  _id: string;
  _type: 'cliente';
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  nombre: string;
  testimonio: string;
  foto: SanityImage;
}

export interface Instalacion {
  _id: string;
  _type: 'instalacion';
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  titulo: string;
  descripcion?: string;
  foto: SanityImage;
}

export interface Noticia {
  _id: string;
  _type: 'noticia';
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title: string;
  slug: {
    current: string;
  };
  publishedAt: string;
  author?: string;
  mainImage?: SanityImage;
  body: PortableTextBlock[];
  excerpt?: string;
}
