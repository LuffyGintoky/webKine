'use client';

import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  title: React.ReactNode;
  description: string;
  primaryAction?: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
  showLogo?: boolean;
  backgroundImage?: string;
}

export function HeroSection({ title, description, primaryAction, secondaryAction, showLogo, backgroundImage = "/images/landin1.avif" }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden w-full min-h-[90vh] flex items-center justify-center border-b-0">
      {/* Full-bleed background image merging into black */}
      <div className="absolute inset-0 z-0">
        <Image 
          src={backgroundImage} 
          alt="Hero Background" 
          fill 
          className="object-cover object-center" 
          priority 
        />
        {/* Radial vignette gradient merging into black edges */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#000000]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
        <div className="flex flex-col items-center text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 flex flex-col items-center"
          >
            {showLogo ? (
              <div className="mb-4">
                <Image
                  src="/images/logo.png"
                  alt="Dinamik Sport Logo"
                  width={600}
                  height={200}
                  className="w-auto h-24 md:h-32 object-contain drop-shadow-lg"
                  priority
                />
              </div>
            ) : (
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight text-white mb-4">
                {title}
              </h1>
            )}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              {description}
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            {primaryAction && (
              <Link
                href={primaryAction.href}
                className="inline-flex h-12 items-center justify-center rounded-md bg-white text-black px-8 text-sm font-bold shadow transition-all hover:bg-gray-200 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                {primaryAction.label}
              </Link>
            )}
            {secondaryAction && (
              <Link
                href={secondaryAction.href}
                className="inline-flex h-12 items-center justify-center rounded-md border border-input bg-background/50 backdrop-blur-md px-8 text-sm font-medium shadow-sm transition-all hover:bg-white/10 hover:text-white hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                {secondaryAction.label}
              </Link>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
