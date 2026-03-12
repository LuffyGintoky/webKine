import { HeroSection } from '../../components/ui/HeroSection';
import Image from 'next/image';

export default function Facilities() {
  const images = [
    { src: 'https://cdn.sanity.io/images/ev9rlegz/production/8531a10a650836e3946b08afb3e35f0697765ad0-1600x1200.jpg', alt: 'Máquinas' },
    { src: 'https://cdn.sanity.io/images/ev9rlegz/production/f7db5935fe2dcabc3ed3f08417dd78a2be6a80a0-1600x1200.jpg', alt: 'Equipamiento 1' },
    { src: 'https://cdn.sanity.io/images/ev9rlegz/production/ddde7d96c71b8dd7806b1191a68973ba1198e5ef-1600x1200.jpg', alt: 'Patio Equipamiento' },
    { src: 'https://cdn.sanity.io/images/ev9rlegz/production/8497f35817f00d7dc98e180590f3ff8240ed52af-1600x1200.jpg', alt: 'Equipamiento 3' },
    { src: 'https://cdn.sanity.io/images/ev9rlegz/production/c9a7f46e4c5f00e96088cfe9116889f9b162447d-1600x1200.jpg', alt: 'Equipamiento 4' },
    { src: 'https://cdn.sanity.io/images/ev9rlegz/production/9b6aebbb4c2710067abbed09c90a3c68bf50f45f-1755x2754.jpg', alt: 'Terapia Instalaciones' },
  ];

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
            {images.map((img, idx) => (
              <div key={idx} className="relative aspect-auto h-64 md:h-80 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group">
                <Image 
                  src={img.src} 
                  alt={img.alt} 
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
