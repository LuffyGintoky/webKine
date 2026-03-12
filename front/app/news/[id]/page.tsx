import { client, urlFor } from '../../../lib/sanity.client';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

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
                <p className="lead text-xl text-muted-foreground mb-8 font-medium">
                  {article.resumen}
                </p>
              )}
              
              {article.contenido && (
                <div className="mt-8 text-foreground/80 leading-relaxed space-y-4">
                  {/* Nota: Si "contenido" está en formato PortableText (block), 
                      necesitarás instalar y usar '@portabletext/react' para renderizarlo correctamente.
                      Aquí asumimos que es texto o lo mostramos como placeholder. */}
                  {typeof article.contenido === 'string' ? (
                     <p>{article.contenido}</p>
                  ) : (
                     <p>El contenido detallado de la noticia está disponible aquí.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
