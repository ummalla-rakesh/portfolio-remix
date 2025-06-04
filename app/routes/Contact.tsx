import { ActionFunctionArgs, json, MetaFunction } from '@remix-run/node';
import { useActionData, Form } from '@remix-run/react';
import { useEffect, useCallback } from 'react';
import { z } from 'zod';
import { Label } from '~/components/ui/label';
import { ToastAction } from '~/components/ui/toast';
import { toast } from '~/hooks/use-toast';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { Textarea } from '~/components/ui/textarea';
import ContactCTA from '~/components/contactCTA';
import { sendEmail } from '~/utils/email.server';

export const meta: MetaFunction = () => {
  return [
    {
      title: 'ummalla rakesh | Contact',
    },
  ];
};

const ContactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const values = Object.fromEntries(formData.entries());

  const result = ContactSchema.safeParse(values);

  if (!result.success) {
    return json(
      {
        success: false,
        errors: result.error.flatten().fieldErrors,
        values,
      },
      { status: 400 }
    );
  }

  const emailResult = await sendEmail(values as any);
  if (emailResult.error) {
    console.error('Email sending failed:', emailResult.error);
    return json(
      {
        success: false,
        error: emailResult.error,
        values,
      },
      { status: 500 }
    );
  }

  return json({ success: true });
}

const Contact = () => {
  const actionData = useActionData<any>();

  const showToast = useCallback(() => {
    toast({
      title: 'Your message has been sent!',
      description:
        'Thank you for reaching out to me. I will get back to you shortly.',
      action: <ToastAction altText="Okay">Okay</ToastAction>,
    });
  }, []);

  useEffect(() => {
    if (actionData?.success) {
      showToast();
      // Reset form values in remix
      (document.querySelector('.contact-from') as HTMLFormElement).reset();
    }

    if (actionData?.error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: actionData.error,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  }, [actionData, showToast]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 py-12">
            <ContactCTA />
            <div className="p-6 space-y-6">
              <h1 className="text-2xl font-bold">Contact me</h1>

              <Form method="post" className="space-y-4 contact-from">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={actionData?.values?.name ?? ''}
                  />
                  {actionData?.errors?.name && (
                    <p className="text-sm text-red-600">
                      {actionData.errors.name[0]}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={actionData?.values?.email ?? ''}
                  />
                  {actionData?.errors?.email && (
                    <p className="text-sm text-red-600">
                      {actionData.errors.email[0]}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    defaultValue={actionData?.values?.message ?? ''}
                  />
                  {actionData?.errors?.message && (
                    <p className="text-sm text-red-600">
                      {actionData.errors.message[0]}
                    </p>
                  )}
                </div>

                <Button type="submit">Send Message</Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
