import { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import Navbar from '~/components/Navbar';
import AnimatedText from '~/components/common/AnimatedText';
import PageTransition from '~/components/common/PageTransition';

export const meta: MetaFunction = () => {
  return [
    {
      title: 'Ummalla Rakesh | Software Engineer Portfolio',
      description: 'Explore the portfolio of Ummalla Rakesh',
      keywords:
        'Rakesh Ummalla, Ummalla Rakesh, Portfolio, Contact Rakesh Ummalla, Software Engineer',
      'og:title': 'Ummalla Rakesh  | Software Engineer Portfolio',
      'og:description':
        'Explore the portfolio of Rakesh Ummalla, showcasing over a 5 years experience in development.',
      'og:type': 'website',
      'og:url': 'https://ummallarakesh.com',
      // 'og:image': 'https://your-portfolio-url.com/og-image.jpg',
      // 'twitter:card': 'summary_large_image',
      // 'twitter:title': 'Rakesh Ummalla | Product Growth Manager Portfolio',
      // 'twitter:description': 'Discover the portfolio of Rakesh Ummalla, a Product Growth Manager with extensive experience in launching brands.',
      // 'twitter:image': 'https://your-portfolio-url.com/twitter-image.jpg',
    },
  ];
};

const Index = () => {
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <div className="flex-1">
          <div className="max-w-7xl">
            <section className="py-20 sm:py-28">
              <div className="max-w-3xl">
                <AnimatedText
                  text="Hi! i'm"
                  element="span"
                  className="block text-[20px] mb-4 font-[cursive]"
                  delay={0}
                />
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-medium text-edge mb-12">
                  <AnimatedText
                    text="Ummalla Rakesh"
                    element="span"
                    className="block leading-[1.2]"
                    delay={0.2}
                  />
                  <AnimatedText
                    text="a software engineer"
                    element="span"
                    className="block leading-[1.2]"
                    delay={0.4}
                  />
                  <AnimatedText
                    text="@ Deloitte, Hyderabad"
                    element="span"
                    className="block leading-[1.2]"
                    delay={0.6}
                  />
                </h1>

                <p className="text-xl md:text-2xl font-light leading-relaxed opacity-80 max-w-2xl mb-12">
                  <AnimatedText
                    text="I specialize in building scalable web applications, solving complex problems, and continuously learning new technologies."
                    delay={1.2}
                  />
                </p>

                <div className="flex flex-wrap gap-4 md:gap-6">
                  {/* <Link
                    to="/design"
                    className="px-6 py-3 border border-white/30 rounded-full hover:border-white/50 hover:bg-primary/10 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span>View design work</span>
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </Link> */}

                  <Link
                    to="/contact"
                    className="px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/70 rounded-full transition-colors duration-300"
                  >
                    <span>Get in touch</span>
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* <Footer /> */}
      </div>
    </PageTransition>
  );
};

export default Index;
