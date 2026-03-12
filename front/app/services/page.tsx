import { HeroSection } from '../../components/ui/HeroSection';
import { Card } from '../../components/ui/Card';

export default function Services() {
  const services = [
    {
      title: "Kinesiología",
      description: "Rehabilitación músculo-esquelética, neuromodulación ecoguiada, biotrajes de electroestimulación y gimnasia médica para tu pronta recuperación.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
    },
    {
      title: "Entrenamiento Personalizado",
      description: "Evaluación de saltabilidad, fuerza y postural. Entrenamientos personalizados de 2 a 5 veces por semana adaptados a tus objetivos.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="m6.5 6.5 11 11"/><path d="m21 21-1-1"/><path d="m3 3 1 1"/><path d="m18 22 4-4"/><path d="m2 6 4-4"/><path d="m3 10 7-7"/><path d="m14 21 7-7"/></svg>
    },
    {
      title: "Reintegro Deportivo",
      description: "Comprometidos con el orgullo regional y nacional. Acompañamos a deportistas de alto rendimiento de la Perla del Norte en su retorno seguro a la competencia.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"/><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
    },
    {
      title: "Estética",
      description: "Lipolaser ultrafrecuencia, cavitación, radiofrecuencia corporal y facial para complementar tu salud con cuidado estético.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M12 22QA9 18 10 14QA12 10 12 6QA12 10 14 14QA15 18 12 22z"/><path d="M8 12QA7 15 8 18"/></svg>
    },
    {
      title: "Psicología",
      description: "Atención psicológica en ámbitos clínico y deportivo, entendiendo que la salud mental es fundamental para una recuperación integral.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 2.5 2.5 0 0 1-2.28-4.16 2.5 2.5 0 0 1 2.28-4.16 2.5 2.5 0 0 1 2.96-3.08A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 2.5 2.5 0 0 0 2.28-4.16 2.5 2.5 0 0 0-2.28-4.16 2.5 2.5 0 0 0-2.96-3.08A2.5 2.5 0 0 0 14.5 2Z"/></svg>
    },
    {
      title: "Otros Servicios",
      description: "Medicina general, deportiva y atención integral de podología, abordando la salud desde todas sus aristas.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection 
        title="Nuestros Servicios"
        description="En Dinamik Sport ofrecemos atención integral, fusionando tecnología de vanguardia y un equipo humano de excelencia."
        backgroundImage="/images/sections1.jpg"
      />
      
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} {...service} />
            ))}
          </div>
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
