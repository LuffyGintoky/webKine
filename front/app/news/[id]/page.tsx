import { client, urlFor } from '../../../lib/sanity.client';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { PortableText } from '@portabletext/react';

// Componentes personalizados para el renderizado del PortableText
const ptComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null;
      return (
        <div className="relative w-full aspect-video my-8 rounded-lg overflow-hidden">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || 'Imagen de contenido'}
            fill
            className="object-cover"
          />
        </div>
      );
    },
  },
  block: {
    h1: ({ children }: any) => <h1 className="text-3xl font-bold mt-8 mb-4 text-primary">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-2xl font-bold mt-8 mb-4 text-primary">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-xl font-bold mt-6 mb-3 text-primary">{children}</h3>,
    h4: ({ children }: any) => <h4 className="text-lg font-bold mt-6 mb-2 text-primary">{children}</h4>,
    normal: ({ children }: any) => <p className="mb-4 text-foreground/80 leading-relaxed">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-primary pl-4 italic my-6 text-foreground/70">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>,
  },
};

export async function generateStaticParams() {
  const query = `*[_type == "noticia" && defined(slug.current)] { slug }`;
  const news = await client.fetch(query);
  return news.map((item: any) => ({
    id: item.slug.current,
  }));
}

export default async function NewsArticle({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Consulta para obtener la noticia específica por su slug
  const QUERY = `*[_type == "noticia" && slug.current == $id][0] {
    _id,
    titulo,
    fechaPublicacion,
    resumen,
    imagenPortada,
    contenido
  }`;

  const article = await client.fetch(QUERY, { id });

  if (!article) {
    return notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-12 md:py-20">
        <article className="container mx-auto px-4 max-w-3xl">
          <Link href="/news" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors">
            <svg className="mr-2 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Volver a noticias
          </Link>
          
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
              {article.titulo}
            </h1>
            
            {article.fechaPublicacion && (
              <div className="text-muted-foreground">
                {new Date(article.fechaPublicacion).toLocaleDateString('es-ES', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric'
                })}
              </div>
            )}

            {article.imagenPortada && (
              <div className="relative w-full aspect-[21/9] rounded-xl overflow-hidden mt-8 mb-12 shadow-sm">
                <Image 
                  src={urlFor(article.imagenPortada).url()} 
                  alt={article.titulo}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            <div className="prose prose-lg dark:prose-invert max-w-none">
              {article.resumen && (
                <p className="lead text-xl text-muted-foreground mb-8 font-medium italic border-l-4 border-primary/20 pl-6">
                  {article.resumen}
                </p>
              )}
              
              {article.contenido && (
                <div className="mt-8">
                  <PortableText value={article.contenido} components={ptComponents} />
                </div>
              )}
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
