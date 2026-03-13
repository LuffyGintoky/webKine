import { HeroSection } from '../../components/ui/HeroSection';
import Image from 'next/image';
import Link from 'next/link';

export default function Reintegro() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection
        title="Reintegro Deportivo"
        description="En Dinamik Sport reafirmamos nuestro compromiso con el deporte y el talento regional."
        backgroundImage="/images/sections4.webp"
      />

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl text-center space-y-12">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Compromiso con el Deporte
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg max-w-3xl mx-auto">
              Desde el centro estamos comprometidos con los deportistas que representan a nuestro país y a la Perla del Norte.
              Nuestro objetivo es acompañarlos en cada etapa de su preparación y recuperación, asegurando que alcancen su máximo rendimiento de forma segura y efectiva.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8text-left mt-12">
            <div className="bg-muted p-8 rounded-2xl border shadow-sm flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold">Recuperación Acelerada</h3>
              <p className="text-muted-foreground">Utilizamos tecnología de punta y metodologías probadas para acortar los tiempos de recuperación sin comprometer la salud del deportista.</p>
            </div>

            <div className="bg-muted p-8 rounded-2xl border shadow-sm flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold">Alto Rendimiento</h3>
              <p className="text-muted-foreground">Trabajamos en potenciar las capacidades físicas preventivas para que el atleta vuelva a la competencia más fuerte que antes de la lesión.</p>
            </div>
          </div>

          <div className="mt-16 bg-card border rounded-3xl p-8 shadow-sm">
            <h3 className="text-2xl font-bold mb-4">¿Listo para volver a la cancha?</h3>
            <p className="text-muted-foreground mb-8">Nuestro equipo de especialistas te espera para evaluar tu caso.</p>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 h-12 px-8 py-2">
              Agenda tu evaluación
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
