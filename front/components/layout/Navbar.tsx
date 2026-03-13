'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Prevenir scroll cuando el menú está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/about', label: 'Nosotros' },
    { href: '/services', label: 'Servicios' },
    { href: '/facilities', label: 'Instalaciones' },
    { href: '/clients', label: 'Clientes' },
    { href: '/reintegro', label: 'Reintegro' },
    { href: '/news', label: 'Noticias' },
    { href: '/contact', label: 'Contacto' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 w-full backdrop-blur-md supports-[backdrop-filter]:bg-background/80 border-b border-primary/5"
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

            {/* Navegación Desktop */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition-colors hover:text-primary text-foreground/80 font-semibold"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <Link
                href="/contact"
                className="hidden md:inline-flex items-center justify-center rounded-full text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 hover:scale-105 h-11 px-8"
              >
                Agendar Cita
              </Link>

              {/* Botón Burger Mobile */}
              <button
                onClick={() => setIsOpen(true)}
                className="md:hidden inline-flex items-center justify-center rounded-full text-primary hover:bg-primary/10 h-12 w-12 transition-colors border border-primary/20"
                aria-label="Abrir menú"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Sidebar Mobile */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm md:hidden"
            />

            {/* Panel del Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 z-[70] h-full w-[80%] max-w-xs bg-background shadow-2xl md:hidden flex flex-col"
            >
              <div className="flex h-20 items-center justify-between px-6 border-b border-primary/5">
                <span className="text-xl font-black italic tracking-tighter text-primary">MENU</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-2 text-foreground/60 hover:text-primary transition-colors hover:bg-primary/10"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" x2="6" y1="6" y2="18" />
                    <line x1="6" x2="18" y1="6" y2="18" />
                  </svg>
                </button>
              </div>

              <nav className="flex flex-col gap-2 p-6 overflow-y-auto">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between text-2xl font-bold py-4 border-b border-primary/5 hover:text-primary transition-colors group"
                    >
                      {link.label}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto p-6">
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="flex w-full items-center justify-center rounded-2xl bg-primary py-5 text-lg font-black text-primary-foreground shadow-xl hover:bg-primary/90 active:scale-95 transition-all"
                >
                  AGENDAR AHORA
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
