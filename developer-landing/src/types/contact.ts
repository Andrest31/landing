export type ContactFormValues = {
  name: string;
  phone: string;
  email: string;
  comment: string;
};

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

export type ContactApiSuccessResponse = {
  ok: true;
  message: string;
};

export type ContactApiErrorResponse = {
  ok: false;
  message: string;
  errors?: ContactFormErrors;
};

export type ContactApiResponse = ContactApiSuccessResponse | ContactApiErrorResponse;
