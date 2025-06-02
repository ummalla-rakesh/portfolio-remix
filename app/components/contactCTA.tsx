import AnimatedText from './common/AnimatedText';
import { Linkedin, Mail } from 'lucide-react';

const ContactCTA = () => {
  return (
    <div>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium mb-8">
        <AnimatedText
          text="Let's create something together"
          element="span"
          delay={0.2}
        />
      </h1>

      <p className="text-lg opacity-80 mb-12">
        <AnimatedText
          text="I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision."
          delay={0.4}
        />
      </p>

      <div className="space-y-8">
        <div>
          <h2 className="text-sm uppercase tracking-wider opacity-60 mb-4">
            Connect
          </h2>
          <div className="flex space-x-6">
            <a
              href="www.linkedin.com/in/rakeshummalla"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-300"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:hello@example.com"
              className="hover:text-white transition-colors duration-300"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-sm uppercase tracking-wider opacity-60 mb-4">
            Location
          </h2>
          <p className="opacity-80">Based in Hyderabad, India</p>
          <p className="opacity-80">Available for remote work worldwide</p>
        </div>
      </div>
    </div>
  );
};

export default ContactCTA;
