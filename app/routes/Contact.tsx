import { json } from '@remix-run/node';
import { useActionData, Form } from '@remix-run/react';
import Navbar from '~/components/Navbar';
import Footer from '~/components/Footer';
import PageTransition from '~/components/common/PageTransition';
import AnimatedText from '~/components/common/AnimatedText';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { Mail, Send, Linkedin, Github } from 'lucide-react';
import { useToast } from '~/hooks/use-toast';

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');

  if (!name || !email || !message) {
    return json({ error: 'All fields are required.' }, { status: 400 });
  }

  // Simulate form submission (e.g., send email or save to database)
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return json({ success: true });
};

const ContactForm = () => {
  const { toast } = useToast();
  const actionData = useActionData<typeof action>();
  console.log('actionData', actionData);

  if (actionData && 'error' in actionData && actionData.error) {
    toast({
      title: 'Error',
      description: actionData.error,
      variant: 'destructive',
    });
  }
  if (actionData && 'success' in actionData && actionData.success) {
    toast({
      title: 'Success',
      description: 'Your message has been sent successfully.',
      variant: 'default',
    });
  }

  return (
    <Form method="post" className="space-y-6">
      <div>
        <label htmlFor="name" className="text-sm opacity-80 mb-2 block">
          Name
        </label>
        <Input id="name" name="name" required />
      </div>

      <div>
        <label htmlFor="email" className="text-sm opacity-80 mb-2 block">
          Email
        </label>
        <Input id="email" name="email" type="email" required />
      </div>

      <div>
        <label htmlFor="message" className="text-sm opacity-80 mb-2 block">
          Message
        </label>
        <Textarea id="message" name="message" required rows={6} />
      </div>

      {actionData && 'error' in actionData && actionData.error && (
        <p className="text-red-500 text-sm">{actionData.error}</p>
      )}

      <Button type="submit">
        <span className="flex items-center">
          <span className="mr-2">Send message</span>
          <Send size={16} />
        </span>
      </Button>
    </Form>
  );
};

const Contact = () => {
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1 pt-32 pb-20">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
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
                    <p className="opacity-80">
                      Available for remote work worldwide
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <ContactForm />
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Contact;
