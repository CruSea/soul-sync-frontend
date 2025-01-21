'use client';

import { Form } from '@/components/ui/form';

import React from 'react';
import { CreateOrgFormProps } from '@/types/create-org';
import FormOne from './FormOne';
import FormTwo from './FormTwo';

const CreateOrgForm = ({
  currentPage,
  formOne,
  formTwo,
}: CreateOrgFormProps) => {
  return (
    <div className="w-full h-full rounded-xl bg-white p-6">
      {currentPage == 'first' ? (
        <Form {...formOne}>
          <form>
            <FormOne formOne={formOne} />
          </form>
        </Form>
      ) : currentPage == 'second' ? (
        <Form {...formOne}>
          <form>
            <FormTwo formTwo={formTwo} />
          </form>
        </Form>
      ) : (
        <h1>Form Page Not Found</h1>
      )}
    </div>
  );
};

export default CreateOrgForm;
