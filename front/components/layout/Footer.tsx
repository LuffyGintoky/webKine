import Link from 'next/link';

export function Footer() {
  return (
    <footer className=" bg-muted/40 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12 md:py-16 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Dinamik Sport</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Tu centro especializado en rehabilitación integral y reintegro deportivo en la Perla del Norte.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary transition-colors">Nosotros</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">Servicios</Link></li>
              <li><Link href="/facilities" className="hover:text-primary transition-colors">Instalaciones</Link></li>
              <li><Link href="/clients" className="hover:text-primary transition-colors">Clientes</Link></li>
              <li><Link href="/news" className="hover:text-primary transition-colors">Noticias</Link></li>
              <li><Link href="/reintegro" className="hover:text-primary transition-colors">Reintegro Deportivo</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">Privacidad</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Términos de Servicio</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Conecta</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contacto</Link></li>
              <li><a href="https://www.instagram.com/dinamiksportafta/" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">Instagram</a></li>
              <li><a href="https://www.facebook.com/p/Dinamik-Sport-Antofagasta-61557078223481/" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">Facebook</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Dinamik Sport. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
