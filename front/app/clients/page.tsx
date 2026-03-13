import { HeroSection } from '../../components/ui/HeroSection';
import Image from 'next/image';
import { client, urlFor } from '../../lib/sanity.client';
import { Cliente } from '../../lib/types/sanity.types';

export const revalidate = 60;

async function getClients(): Promise<Cliente[]> {
  return await client.fetch(`*[_type == "cliente"] | order(_createdAt asc)`);
}

export default async function Clients() {
  const experiences = await getClients();

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection
        title="Nuestros Clientes"
        description="Conoce las experiencias de nuestros pacientes y deportistas en su paso por Dinamik Sport."
        backgroundImage="/images/sections7.jpg"
      />

      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {experiences.map((exp) => (
              <div key={exp._id} className="bg-card border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
                <div className="relative h-64 w-full flex-shrink-0">
                  {exp.foto ? (
                    <Image
                      src={urlFor(exp.foto).url()}
                      alt={exp.foto.alt || exp.nombre}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <span className="text-muted-foreground">Sin foto</span>
                    </div>
                  )}
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-between flex-1">
                  <p className="italic text-muted-foreground text-lg mb-6">&quot;{exp.testimonio}&quot;</p>
                  <div>
                    <h4 className="font-semibold">{exp.nombre}</h4>
                    <p className="text-sm text-primary">Testimonio real</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {experiences.length === 0 && (
              <p className="text-center text-muted-foreground p-8 bg-muted rounded-xl">
                 Los testimonios se actualizarán pronto.
              </p>
           )}
        </div>
      </section>
    </div>
  );
}
