'use client';
import { json } from '@remix-run/node';
import { useActionData, Form } from '@remix-run/react';
import Navbar from '~/components/Navbar';
import Footer from '~/components/Footer';
import PageTransition from '~/components/common/PageTransition';
import AnimatedText from '~/components/common/AnimatedText';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { Mail, Send, Linkedin, Github, Loader } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Label } from '~/components/ui/label';
import { useToast } from '~/components/ui/use-toast';
import { ToastAction } from '~/components/ui/toast';
import {
  useField,
  useIsSubmitting,
  ValidatedForm,
  validationError,
} from 'remix-validated-form';
import { withZod } from '@remix-validated-form/with-zod';
import { z } from 'zod';
export const validator = withZod(
  z.object({
    name: z
      .string()
      .nonempty('Name is required')
      .min(3, 'Name must be at least 3 characters long'),
    email: z
      .string()
      .nonempty('Email is required')
      .email('Invalid emaill address'),
    message: z
      .string()
      .nonempty('message is required')
      .min(6, 'message must be at least 6 characters long'),
  })
);

export const action = async ({ request }: { request: Request }) => {
  console.log('Form submitted');

  const result = await validator.validate(await request.formData());

  if (result.error) {
    return validationError(result.error, {
      fieldErrors: result.error.fieldErrors,
    });
  }

  // Simulate form submission (e.g., send email or save to database)
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return json({ success: true });
};

const ContactForm = () => {
  const { toast } = useToast();
  const actionData = useActionData<{
    success?: boolean;
    error?: string;
    fieldErrors?: Record<string, string>;
  }>();
  const isSubmitting = useIsSubmitting('contact-form');

  useEffect(() => {
    document.title = 'Portfolio | Contact';
  }, []);

  useEffect(() => {
    if (actionData?.success) {
      toast({
        title: 'Success',
        description: 'Your message has been sent successfully.',
        variant: 'default',
        // type: 'foreground',
      });
    }
  }, [actionData, toast]);

  return (
    <>
      <ValidatedForm
        validator={validator}
        method="post"
        defaultValues={{}}
        className="space-y-6"
        id="contact-form"
      >
        {['name', 'email', 'message'].map((field) => {
          const { error, getInputProps } = useField(field, {
            formId: 'contact-form',
          });
          const isTextarea = field === 'message';
          return (
            <div key={field}>
              <Label htmlFor={field} className="text-sm opacity-80 mb-2 block">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </Label>
              {isTextarea ? (
                <Textarea {...getInputProps()} id={field} rows={6} />
              ) : (
                <Input {...getInputProps()} id={field} />
              )}
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
          );
        })}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-white text-black hover:bg-white/90 w-full sm:w-auto px-8"
        >
          {isSubmitting ? (
            <Loader className="animate-spin mr-2" size={16} />
          ) : (
            <Send className="mr-2" size={16} />
          )}
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </ValidatedForm>
    </>
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
