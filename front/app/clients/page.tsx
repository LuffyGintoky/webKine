import { HeroSection } from '../../components/ui/HeroSection';
import Image from 'next/image';

export default function Clients() {
  const experiences = [
    { src: 'https://cdn.sanity.io/images/ev9rlegz/production/19051283b5fb0a599803d79f6ad0ef413282cd98-2252x1641.jpg', text: '"Gran vocación y excelente trato profesional..."', author: 'Paciente Dinamik Sport' },
    { src: 'https://cdn.sanity.io/images/ev9rlegz/production/e0fbc4fc76746788ac0be6748d7920c6c63030c6-1762x2529.jpg', text: '"Logré volver al deporte de alto rendimiento en tiempo récord."', author: 'Deportista Local' },
    { src: 'https://cdn.sanity.io/images/ev9rlegz/production/7fcea41abd02334966cb1e40d13f63139ca6695d-1817x2573.jpg', text: '"El acompañamiento humano fue clave para mi recuperación."', author: 'Paciente Dinamik Sport' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection 
        title="Nuestros Clientes"
        description="Conoce las experiencias de nuestros pacientes y deportistas en su paso por Dinamik Sport."
        backgroundImage="/images/sections2.webp"
      />
      
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {experiences.map((exp, idx) => (
              <div key={idx} className="bg-card border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
                <div className="relative h-64 w-full flex-shrink-0">
                  <Image 
                    src={exp.src} 
                    alt={exp.author} 
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-between flex-1">
                  <p className="italic text-muted-foreground text-lg mb-6">{exp.text}</p>
                  <div>
                    <h4 className="font-semibold">{exp.author}</h4>
                    <p className="text-sm text-primary">Testimonio real</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
