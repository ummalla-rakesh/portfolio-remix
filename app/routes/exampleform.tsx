import { ActionFunction } from '@remix-run/node';
import { Form } from '@remix-run/react';

function NewEvent() {
  return (
    <Form method="post">
      <input name="title" type="text" />
      <input name="description" type="text" />
      <button type="submit">sumit</button>
    </Form>
  );
}

export function meta() {
  return [{ title: '' }];
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  console.log('Form Data:', formData);

  return null;
};

export default function ExampleForm() {
  return (
    <div style={{ height: '100vh' }}>
      <h1>Example Form</h1>
      <NewEvent />
    </div>
  );
}
