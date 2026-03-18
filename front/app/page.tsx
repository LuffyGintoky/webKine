'use client';

import { HeroSection } from '../components/ui/HeroSection';
import { Card } from '../components/ui/Card';
import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
const fadeIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection
        title={<>Dinamik <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Sport</span></>}
        description="Transformando la rehabilitación en Antofagasta. Más que un centro médico, somos un espacio moderno, humano y dinámico enfocado en tu bienestar integral."
        primaryAction={{ label: "Agenda tu Evaluación", href: "/contact" }}
        secondaryAction={{ label: "Conoce nuestros Servicios", href: "/services" }}
        showLogo={true}
      />

      {/* Quiénes Somos / Historia Corta */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
        className="py-20 bg-black"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">Cambiando el paradigma de la rehabilitación</h2>
              <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
                Nacimos el 2024 bajo la visión del kinesiólogo Aldo Paz. Inspirados en modelos de bienestar internacional, integramos comunidad y relajación, alejándonos de la frialdad médica tradicional.
              </p>
              <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
                Hoy somos un centro médico integral comprometido con tu recuperación, logrando tu máximo potencial físico, mental y social.
              </p>
              <div className="pt-4">
                <Link href="/about" className="text-primary font-bold hover:text-white transition-colors inline-flex items-center text-lg">
                  Conoce más sobre nosotros
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl border border-border">
              <Image
                src="/images/frontis.jpg"
                alt="Frontis Dinamik Sport"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Misión y Visión */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
        className="relative w-full py-32 lg:py-48"
      >
        <div className="absolute inset-0 z-0">
          <Image src="/images/landin3.avif" alt="Propósito" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/85" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 drop-shadow-md">Nuestro Propósito</h2>
            <p className="text-white drop-shadow-md font-medium max-w-3xl mx-auto text-xl">
              Nos mueve la excelencia y el enfoque humano en cada uno de nuestros tratamientos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card
              title="Misión"
              description="Brindar atención integral y personalizada, fusionando técnicas avanzadas con calidez humana para alcanzar tu máximo potencial."
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>}
            />
            <Card
              title="Visión"
              description="Ser el referente en rehabilitación de alto rendimiento en Antofagasta, reconocidos por nuestra excelencia médica y acompañamiento."
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M2 12h4l3-9 5 18 3-9h5" /></svg>}
            />
            <Card
              title="Nuestros Valores"
              description="Calidez humana, excelencia e innovación, trabajo en equipo y empoderamiento de nuestros pacientes."
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>}
            />
          </div>
        </div>
      </motion.section>

      {/* Servicios Preview */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
        className="w-full bg-black"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Image block full bleed */}
          <div className="relative h-[50vh] lg:h-auto min-h-[500px] order-last lg:order-first">
            <Image
              src="/images/landin4.jpg"
              alt="Servicios Dinamik Sport"
              fill
              className="object-cover"
            />
          </div>
          {/* Text block */}
          <div className="flex flex-col justify-center p-12 lg:p-24 space-y-8">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">Tratamientos a tu medida</h2>
            <p className="text-xl text-gray-400 leading-relaxed mb-6">
              Desde kinesiología traumatológica hasta reintegro deportivo y psicología deportiva. Un modelo integral de atención.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-[#111] border border-white/10 p-6 rounded-xl text-center font-bold text-white hover:border-primary transition-colors">Kinesiología</div>
              <div className="bg-[#111] border border-white/10 p-6 rounded-xl text-center font-bold text-white hover:border-primary transition-colors">Entrenamiento</div>
              <div className="bg-[#111] border border-white/10 p-6 rounded-xl text-center font-bold text-white hover:border-primary transition-colors">Reintegro</div>
              <div className="bg-[#111] border border-white/10 p-6 rounded-xl text-center font-bold text-white hover:border-primary transition-colors">Psicología</div>
            </div>
            <div>
              <Link href="/services" className="inline-flex h-14 items-center justify-center rounded-md bg-white text-black px-10 font-bold shadow transition-all hover:bg-gray-200">
                Ver Todos los Servicios
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Clientes Preview */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
        className="py-32 bg-[#050505]"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex flex-col items-center text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6">Confían en Dinamik Sport</h2>
          <p className="text-xl text-gray-400 mb-16 max-w-3xl mx-auto">
            Acompañamos a deportistas de élite y a pacientes en su retorno a las actividades cotidianas. Conoce sus historias de éxito.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mb-12">
            <div className="relative h-[400px] overflow-hidden rounded-2xl group border border-white/10">
              <Image
                src="/images/cliente-1.jpg"
                alt="Paciente de Entrenamiento"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500" />
            </div>
            <div className="relative h-[400px] overflow-hidden rounded-2xl group border border-white/10">
              <Image
                src="/images/cliente-2.jpg"
                alt="Paciente en Kinesiología"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500" />
            </div>
          </div>

          <Link href="/clients" className="inline-flex h-14 items-center justify-center rounded-md border border-white/20 bg-transparent px-10 text-lg font-bold hover:bg-white text-white hover:text-black transition-all">
            Ver Testimonios
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
