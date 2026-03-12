import React from 'react';

interface CardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  image?: string;
  onClick?: () => void;
}

export function Card({ title, description, icon, image, onClick }: CardProps) {
  return (
    <div 
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md hover:-translate-y-1 ${onClick ? 'cursor-pointer' : ''}`}
    >
      {image && (
        <div className="aspect-video w-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-6">
        {icon && (
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
        )}
        <h3 className="text-xl font-semibold leading-none tracking-tight mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
