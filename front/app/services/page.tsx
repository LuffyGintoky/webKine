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
              <div key={service._id} className="bg-card rounded-2xl border shadow-sm transition-all hover:shadow-lg flex flex-col h-full overflow-hidden group">
                {service.icono ? (
                   <div className="w-full h-56 relative overflow-hidden bg-primary/5">
                      <Image 
                        src={urlFor(service.icono).url()}
                        alt={service.icono.alt || service.titulo}
                        fill
                        className={`object-cover transition-transform duration-700 group-hover:scale-105 ${
                          service.titulo.toLowerCase().includes('estética') || service.titulo.toLowerCase().includes('estetica')
                            ? 'object-top'
                            : 'object-center'
                        }`}
                      />
                   </div>
                ) : (
                  <div className="w-full h-56 bg-primary/10 flex items-center justify-center text-primary">
                      <span className="font-bold text-5xl">{service.titulo.charAt(0)}</span>
                  </div>
                )}
                
                <div className="p-6 md:p-8 flex flex-col flex-grow items-start gap-4">
                  <h3 className="text-2xl font-bold tracking-tight">{service.titulo}</h3>
                  
                  {service.descripcion && (
                    <p className="text-muted-foreground text-base leading-relaxed mb-2">
                      {service.descripcion}
                    </p>
                  )}

                  <ul className="space-y-3 mt-auto w-full">
                     {service.items?.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <svg className="w-4 h-4 text-primary mt-0.5 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                          <span>{item}</span>
                        </li>
                     ))}
                  </ul>
                </div>
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
          <p className="text-lg text-muted-foreground leading-relaxed">
            Contamos con espacios aptos y un moderno equipamiento especializado para la rehabilitación y el reintegro deportivo, diseñados para seguir cada proceso con seguridad, comodidad y bajo los más altos estándares profesionales.
          </p>
        </div>
      </section>
    </div>
  );
}
