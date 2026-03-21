import { HeroSection } from '../../components/ui/HeroSection';
import Image from 'next/image';
import { client, urlFor } from '../../lib/sanity.client';
import { Equipo } from '../../lib/types/sanity.types';

export const revalidate = 60; // Revalidate at most every minute

async function getTeam(): Promise<Equipo[]> {
  return await client.fetch(`*[_type == "equipo"] | order(_createdAt asc)`);
}

export default async function About() {
  const team = await getTeam();

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection
        title="Quiénes Somos"
        description="Conoce la historia, el equipo y los valores que hacen de Dinamik Sport un lugar único para tu recuperación."
        backgroundImage="/images/sections6.jpg"
      />

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Nuestra Historia</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Inspirado por modelos de bienestar internacional que integran comunidad y relajación, creamos un espacio que se aleja de la frialdad médica tradicional para ofrecer un entorno moderno, humano y dinámico.
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg font-medium">
                Comenzamos como una idea innovadora y hoy somos un centro integral comprometido con tu recuperación y desarrollo.
              </p>
              
              <h3 className="text-2xl font-bold mt-8">Misión</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Brindar atención integral y personalizada en rehabilitación física, fusionando técnicas avanzadas con un enfoque humano. Nuestro fin es ayudar a cada paciente a alcanzar su recuperación, logrando su máximo potencial de bienestar físico, mental y social.
              </p>

              <h3 className="text-2xl font-bold mt-8">Visión</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Ser el referente en la rehabilitación física de alto rendimiento en la Región de Antofagasta. Buscamos ser reconocidos por nuestra excelencia en el tratamiento y el acompañamiento humano, promoviendo la recuperación y el bienestar de cada usuario.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
                <Image src="/images/entrenamiento-9.jpg" alt="Entrenamiento" fill className="object-cover" />
              </div>
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg mt-8">
                <Image src="/images/tratamiento-3.jpeg" alt="Tratamiento" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl text-center space-y-12">
          <div>
              <h2 className="text-3xl font-bold mb-6">Nuestros Valores</h2>
              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div className="bg-background rounded-xl p-6 shadow-sm">
                  <h4 className="font-bold text-xl mb-3">Calidez Humana</h4>
                  <p className="text-muted-foreground">Empatía y cercanía son la base de nuestra atención. Nos comprometemos profundamente en cada caso de los usuarios para llegar a un mejor resultado.</p>
                </div>
                <div className="bg-background rounded-xl p-6 shadow-sm">
                  <h4 className="font-bold text-xl mb-3">Excelencia e Innovación</h4>
                  <p className="text-muted-foreground">Trabajamos con tecnología innovadora y los métodos más actuales en nuestros tratamientos, manteniéndonos en permanente evolución para garantizar un alto estándar de servicio.</p>
                </div>
                <div className="bg-background rounded-xl p-6 shadow-sm">
                  <h4 className="font-bold text-xl mb-3">Compromiso y Trabajo en Equipo</h4>
                  <p className="text-muted-foreground">Contamos con un equipo de profesionales capacitados que se involucran profundamente en cada tratamiento. Buscamos que tu experiencia sea real, cercana y efectiva.</p>
                </div>
                <div className="bg-background rounded-xl p-6 shadow-sm">
                  <h4 className="font-bold text-xl mb-3">Empoderamiento</h4>
                  <p className="text-muted-foreground">Te damos las herramientas necesarias para tu recuperación.</p>
                </div>
              </div>
          </div>
        </div>
      </section>

      <section className="py-20">
         <div className="container mx-auto px-4 max-w-6xl">
           <div className="text-center mb-12">
             <h2 className="text-3xl font-bold mb-4">Nuestro Equipo</h2>
             <p className="text-muted-foreground leading-relaxed text-lg max-w-3xl mx-auto">
               Nuestro equipo de trabajo está comprometido con tu bienestar y recuperación.
             </p>
           </div>
           
           <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
             {team.map((member) => (
               <div key={member._id} className="bg-card rounded-2xl border shadow-sm p-8 flex flex-col items-center text-center transition-transform hover:-translate-y-1 hover:shadow-md">
                 <div className="w-40 h-40 sm:w-48 sm:h-48 relative rounded-full overflow-hidden mb-6 shadow-sm border-4 border-background ring-1 ring-muted/50">
                   {member.foto ? (
                     <Image
                       src={urlFor(member.foto).url()}
                       alt={member.foto.alt || member.nombre}
                       fill
                       className="object-cover object-top"
                     />
                   ) : (
                     <div className="w-full h-full bg-muted flex items-center justify-center">
                       <span className="text-muted-foreground text-sm">Sin foto</span>
                     </div>
                   )}
                 </div>
                 <div className="space-y-3 flex-grow">
                   <h3 className="text-xl font-bold">{member.nombre}</h3>
                   <p className="text-primary font-semibold text-sm tracking-wide uppercase">{member.cargo}</p>
                   {member.biografia && (
                     <p className="text-muted-foreground text-sm mt-4 leading-relaxed">{member.biografia}</p>
                   )}
                 </div>
               </div>
             ))}
           </div>
           
           {team.length === 0 && (
              <p className="text-center text-muted-foreground p-8 bg-muted rounded-xl">
                 El equipo se actualizará pronto.
              </p>
           )}
         </div>
      </section>

    </div>
  );
}
