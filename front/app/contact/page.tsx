import { HeroSection } from '../../components/ui/HeroSection';

export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection 
        title="Contacto"
        description="Estamos listos para acompañarte en tu proceso de rehabilitación o reintegro deportivo. Agenda tu evaluación con nuestro equipo profesional."
        backgroundImage="/images/sections3.jpg"
      />
      
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 bg-card border rounded-3xl p-8 md:p-12 shadow-sm">
            
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-2">Información de Contacto</h3>
                <p className="text-muted-foreground">Encuéntranos en la Perla del Norte. Atendemos de Lunes a Viernes.</p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Dirección</p>
                    <p className="font-medium">Av. Croacia 0416, Antofagasta</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Teléfono</p>
                    <p className="font-medium">+56 9 9822 8263</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Horario</p>
                    <p className="font-medium">Lun a Vie | 08:30 – 20:00</p>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                   <p className="text-sm font-medium text-muted-foreground mb-3">Medios de Pago</p>
                   <p className="font-medium text-sm flex gap-2">
                     <span className="px-3 py-1 bg-secondary rounded-full">Transferencia</span>
                     <span className="px-3 py-1 bg-secondary rounded-full">Tarjetas</span>
                     <span className="px-3 py-1 bg-secondary rounded-full">Efectivo</span>
                   </p>
                </div>
                
                <div className="pt-4 border-t space-y-3">
                   <p className="text-sm font-medium text-muted-foreground">Redes Sociales</p>
                   <div className="flex gap-4">
                     <a href="https://www.instagram.com/dinamiksportafta/" target="_blank" rel="noreferrer" className="text-primary hover:underline font-medium flex items-center gap-1">
                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                        Instagram
                     </a>
                     <a href="https://www.facebook.com/p/Dinamik-Sport-Antofagasta-61557078223481/" target="_blank" rel="noreferrer" className="text-primary hover:underline font-medium flex items-center gap-1">
                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                        Facebook
                     </a>
                   </div>
                </div>
              </div>
            </div>

            <div className="h-full min-h-[400px] w-full bg-muted rounded-xl flex items-center justify-center overflow-hidden border">
                {/* Embed Google Maps */}
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3654.475475306306!2d-70.4070624!3d-23.6588631!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x96afd45e5e05a8b7%3A0xe5a3c9cd02b1f8b8!2sAv.%20Croacia%20416%2C%20Antofagasta!5e0!3m2!1ses-419!2scl!4v1700000000000!5m2!1ses-419!2scl" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade">
                </iframe>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
