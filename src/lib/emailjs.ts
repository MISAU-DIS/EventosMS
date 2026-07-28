import emailjs from "@emailjs/browser";

const serviceId =
  process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "service_ucltqqy";
const templateId =
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "template_q9f18ji";
const publicKey =
  process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "BiomUSw2GrN1Rk-q9";

export async function sendContactEmail(
  form: HTMLFormElement,
): Promise<void> {
  await emailjs.sendForm(serviceId, templateId, form, publicKey);
}
