import { HeroSection } from '../../components/ui/HeroSection';
import Image from 'next/image';
import { client, urlFor } from '../../lib/sanity.client';
import { Instalacion } from '../../lib/types/sanity.types';

export const revalidate = 60;

async function getFacilities(): Promise<Instalacion[]> {
  return await client.fetch(`*[_type == "instalacion"] | order(_createdAt asc)`);
}

export default async function Facilities() {
  const images = await getFacilities();

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection 
        title="Instalaciones y Equipamiento"
        description="Espacios aptos y equipamiento moderno especializado para la rehabilitación y el reintegro deportivo, diseñados para acompañar cada proceso con la más alta seguridad y tecnología."
        backgroundImage="/images/sections4.webp"
      />
      
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((img) => (
              <div key={img._id} className="group relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all">
                {img.foto ? (
                   <Image 
                     src={urlFor(img.foto).url()} 
                     alt={img.foto.alt || img.titulo} 
                     fill
                     className="object-cover transition-transform duration-500 group-hover:scale-105"
                   />
                ) : (
                   <div className="w-full h-full bg-muted flex items-center justify-center">
                     <span className="text-muted-foreground">Sin foto</span>
                   </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                   <h3 className="text-white font-bold text-xl mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{img.titulo}</h3>
                   {img.descripcion && (
                     <p className="text-white/80 text-sm line-clamp-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{img.descripcion}</p>
                   )}
                </div>
              </div>
            ))}
          </div>

          {images.length === 0 && (
              <p className="text-center text-muted-foreground p-8 bg-muted rounded-xl mt-8">
                 Las instalaciones se actualizarán pronto.
              </p>
           )}
        </div>
      </section>
    </div>
  );
}
