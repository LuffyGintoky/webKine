import { HeroSection } from '../../components/ui/HeroSection';
import { client, urlFor } from '../../lib/sanity.client';
import Image from 'next/image';
import Link from 'next/link';

// Consulta para traer las noticias ordenadas por fecha reciente
const QUERY_NOTICIAS = `*[_type == "noticia"] | order(fechaPublicacion desc) {
  _id,
  titulo,
  slug,
  fechaPublicacion,
  resumen,
  imagenPortada
}`;

export default async function News() {
  const news = await client.fetch(QUERY_NOTICIAS);

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection
        title="Noticias y Actividades"
        description="En este espacio encontrarás las principales noticias, actividades, talleres y experiencias comunitarias de Dinamik Sport."
        backgroundImage="/images/sections9.webp"
      />

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="space-y-8">
            {news.map((item: any) => (
              <div key={item._id} className="group relative overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md p-6 sm:p-8 flex flex-col md:flex-row gap-6 md:items-center">

                {/* Opcional: Mostrar imagen de portada si existe */}
                {item.imagenPortada && (
                  <div className="relative w-full md:w-48 h-48 md:h-full flex-shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={urlFor(item.imagenPortada).url()}
                      alt={item.titulo}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                )}

                <div className="flex-1 space-y-4">
                  <div className="text-sm font-medium text-primary">
                    {item.fechaPublicacion ? new Date(item.fechaPublicacion).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
                  </div>
                  <h3 className="text-2xl font-semibold tracking-tight">{item.titulo}</h3>
                  <p className="text-muted-foreground leading-relaxed line-clamp-3">
                    {item.resumen}
                  </p>
                </div>

                <div className="md:w-auto mt-4 md:mt-0">
                  {/* Si tienes ruta dinámica sería /news/${item.slug.current} */}
                  <Link href={`/news/${item.slug?.current}`} className="text-sm font-medium text-primary hover:underline underline-offset-4 inline-flex items-center cursor-pointer">
                    Leer más
                    <svg className="ml-1 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                  </Link>
                </div>
              </div>
            ))}

            {news.length === 0 && (
              <div className="text-center text-muted-foreground py-12">
                Aún no hay noticias publicadas.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
