'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full  backdrop-blur supports-[backdrop-filter]:bg-background/80"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/images/logo.png"
                alt="Dinamik Sport"
                width={300}
                height={100}
                className="w-auto h-12 object-contain"
                priority
              />
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="transition-colors hover:text-white text-foreground/80">Inicio</Link>
            <Link href="/about" className="transition-colors hover:text-white text-foreground/80">Nosotros</Link>
            <Link href="/services" className="transition-colors hover:text-white text-foreground/80">Servicios</Link>
            <Link href="/facilities" className="transition-colors hover:text-white text-foreground/80">Instalaciones</Link>
            <Link href="/clients" className="transition-colors hover:text-white text-foreground/80">Clientes</Link>
            <Link href="/reintegro" className="transition-colors hover:text-white text-foreground/80">Reintegro</Link>
            <Link href="/news" className="transition-colors hover:text-white text-foreground/80">Noticias</Link>
            <Link href="/contact" className="transition-colors hover:text-white text-foreground/80">Contacto</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/contact" className="hidden md:inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-white/90 hover:text-black h-10 px-6 py-2">
              Agendar Cita
            </Link>
            <button className="md:hidden inline-flex items-center justify-center rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground h-9 w-9">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
