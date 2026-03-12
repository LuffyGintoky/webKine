import { HeroSection } from '../../components/ui/HeroSection';
import Image from 'next/image';

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection 
        title="Quiénes Somos"
        description="Conoce la historia, el equipo y los valores que hacen de Dinamik Sport un lugar único para tu recuperación."
        backgroundImage="/images/sections1.jpg"
      />
      
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Nuestra Historia</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Dinamik Sport nace en 2024 de la visión del kinesiólogo Aldo Paz, con el sueño de transformar la rehabilitación en Antofagasta. 
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Inspirado por modelos de bienestar internacional que integran comunidad y relajación, creamos un espacio que se aleja de la frialdad médica tradicional para ofrecer un entorno moderno, humano y dinámico.
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg font-medium">
                Comenzamos como una idea innovadora y hoy somos un centro integral comprometido con tu recuperación y desarrollo.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
                <Image src="https://cdn.sanity.io/images/ev9rlegz/production/58aeabe05a7f850d7171e82629b6f1ea9df20deb-1080x1350.jpg" alt="Aldo Paz" fill className="object-cover" />
              </div>
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg mt-8">
                <Image src="https://cdn.sanity.io/images/ev9rlegz/production/8751374837acc0f5b969dc5735d446b217895e18-1080x1350.jpg" alt="Miguel Paz" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
         <div className="container mx-auto px-4 max-w-4xl text-center space-y-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Nuestro Equipo</h2>
              <p className="text-muted-foreground leading-relaxed text-lg max-w-2xl mx-auto">
                La calidad y efectividad de nuestra atención corresponde a un equipo de profesionales altamente capacitados y alineados con nuestros valores, quienes trabajan de manera coordinada para alcanzar el éxito en cada proceso de rehabilitación y entrenamiento de nuestros usuarios.
              </p>
            </div>
         </div>
      </section>
    </div>
  );
}
