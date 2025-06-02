import { Link } from '@remix-run/react';

const Footer = () => {
  return (
    <footer className="py-10 border-t border-white/[0.03]">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="mb-6 md:mb-0">
            <Link to="/">
              {/* <img 
                src="/lovable-uploads/f07c33e1-fbee-4fbf-a62b-20db809c76ca.png" 
                alt="Logo" 
                className="h-8 w-auto opacity-80 hover:opacity-100 transition-opacity duration-300"
              /> */}
            </Link>
          </div>

          <nav className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:space-x-8">
            <FooterLink to="/design">Design</FooterLink>
            <FooterLink to="/art">Art</FooterLink>
            <FooterLink to="/about">About</FooterLink>
            <FooterLink to="/contact">Hello</FooterLink>
          </nav>
        </div>
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  to: string;
  children: React.ReactNode;
}

const FooterLink = ({ to, children }: FooterLinkProps) => {
  return (
    <Link
      to={to}
      className="text-sm opacity-60 hover:opacity-100 transition-opacity duration-300"
    >
      {children}
    </Link>
  );
};

export default Footer;
