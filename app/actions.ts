'use server';

export async function createInvoice(userId: string, formData: FormData) {
  const rawFormData = {
    userId,
    date: formData.get('date'),
    time: formData.get('time'),
    procedure: formData.get('procedure'),
  };
  //request create appointment endpointgit
}
