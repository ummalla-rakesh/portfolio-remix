import { useState, useEffect } from 'react';
import { Link, useLocation } from '@remix-run/react';
import { cn } from '~/lib/utils';
import { ModeToggle } from './mode-toggle';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        scrolled
          ? 'navbar-glass py-4 border-b border-gray-200/50 backdrop-blur-md bg-primary/10'
          : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
        <Link to="/" className="group flex items-center">
          <img
            alt="Logo"
            className="h-8 w-auto opacity-90 group-hover:opacity-100 transition-opacity duration-300"
            src="https://cdn3d.iconscout.com/3d/premium/thumb/cube-6013626-4958573.png?f=webp"
          />
        </Link>

        <nav className="flex items-center space-x-8">
          {/* <NavLink to="/design" active={isActive('/design')}>
            Design
          </NavLink>
          <NavLink to="/art" active={isActive('/art')}>
            Art
          </NavLink>
          <NavLink to="/about" active={isActive('/about')}>
            About
          </NavLink> */}
          <NavLink to="/contact" active={isActive('/contact')}>
            Get in Touch
          </NavLink>
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  active: boolean;
  children: React.ReactNode;
}

const NavLink = ({ to, active, children }: NavLinkProps) => {
  return (
    <Link
      to={to}
      className={cn(
        'text-sm font-medium tracking-wide transition-all duration-300 hover:opacity-100',
        active ? 'opacity-100' : 'opacity-60',
        'hover:link-underline'
      )}  
    >
      {children}
    </Link>
  );
};

export default Navbar;
