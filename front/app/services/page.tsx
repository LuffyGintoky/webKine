import { HeroSection } from '../../components/ui/HeroSection';
import { Card } from '../../components/ui/Card';
import { client, urlFor } from '../../lib/sanity.client';
import { Servicio } from '../../lib/types/sanity.types';
import Image from 'next/image';

export const revalidate = 60;

async function getServices(): Promise<Servicio[]> {
  return await client.fetch(`*[_type == "servicio"] | order(_createdAt asc)`);
}

export default async function Services() {
  const services = await getServices();

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection
        title="Nuestros Servicios"
        description="En Dinamik Sport ofrecemos atención integral, fusionando tecnología de vanguardia y un equipo humano de excelencia."
        backgroundImage="/images/sections1.jpeg"
      />

      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service._id} className="bg-card rounded-2xl p-8 border shadow-sm transition-all hover:shadow-md flex flex-col items-start gap-4 h-full">
                {service.icono ? (
                   <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary relative overflow-hidden">
                      <Image 
                        src={urlFor(service.icono).url()}
                        alt={service.icono.alt || service.titulo}
                        fill
                        className="object-contain p-2"
                      />
                   </div>
                ) : (
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                      <span className="font-bold text-xl">{service.titulo.charAt(0)}</span>
                  </div>
                )}
                
                <h3 className="text-xl font-bold tracking-tight">{service.titulo}</h3>
                
                {service.descripcion && (
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {service.descripcion}
                  </p>
                )}

                <ul className="space-y-2 mt-auto w-full">
                   {service.items?.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <svg className="w-4 h-4 text-primary mt-0.5 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                        <span>{item}</span>
                      </li>
                   ))}
                </ul>
              </div>
            ))}
          </div>
          
          {services.length === 0 && (
              <p className="text-center text-muted-foreground p-8 bg-muted rounded-xl">
                 Los servicios se actualizarán pronto.
              </p>
           )}
        </div>
      </section>

      <section className="py-20 bg-background border-t">
        <div className="container mx-auto px-4 max-w-4xl text-center space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Instalaciones y Equipamiento</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Contamos con espacios aptos y un moderno equipamiento especializado para la rehabilitación y el reintegro deportivo, diseñados para seguir cada proceso con seguridad, comodidad y bajo los más altos estándares profesionales.
          </p>
        </div>
      </section>
    </div>
  );
}
