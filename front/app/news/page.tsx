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
              <div key={item._id} className="group relative overflow-hidden rounded-3xl border border-primary/5 bg-card/50 backdrop-blur-sm text-card-foreground shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 flex flex-col md:flex-row gap-0">
                
                {/* Imagen de portada con ratio fijo */}
                <div className="relative w-full md:w-80 h-64 md:h-auto overflow-hidden">
                  {item.imagenPortada ? (
                    <Image
                      src={urlFor(item.imagenPortada).url()}
                      alt={item.titulo}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                      <svg className="w-12 h-12 text-primary/20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                    </div>
                  )}
                  {/* Overlay gradiente sobre la imagen en mobile */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent md:hidden" />
                </div>

                <div className="flex-1 p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                      {item.fechaPublicacion ? new Date(item.fechaPublicacion).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }) : 'Reciente'}
                    </span>
                    <span className="text-muted-foreground text-xs font-medium">
                      • {item.fechaPublicacion ? new Date(item.fechaPublicacion).getFullYear() : ''}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 group-hover:text-primary transition-colors">
                    {item.titulo}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed line-clamp-2 md:line-clamp-3 mb-6 text-lg">
                    {item.resumen}
                  </p>

                  <div className="mt-auto">
                    <Link href={`/news/${item.slug?.current}`} className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all group/link">
                      <span>Continuar leyendo</span>
                      <svg className="w-5 h-5 transition-transform group-hover/link:translate-x-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                    </Link>
                  </div>
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
