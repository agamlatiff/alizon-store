import React from 'react';
import Navbar from '@/components/customers/Navbar';
import Footer from '@/components/customers/Footer';
import { auth } from '@/lib/auth';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQPage = async () => {
  const session = await auth();

  const faqs = [
    {
      question: "How long does shipping take?",
      answer: "Standard shipping typically takes 3-5 business days within the US. International shipping can take 7-14 business days depending on the destination."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for all unused items in their original packaging. Simply contact our support team to initiate a return."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by location."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you will receive a confirmation email with a tracking number. You can also track your order status in your account dashboard."
    },
    {
      question: "Are your products authentic?",
      answer: "Absolutely. We guarantee 100% authenticity on all products sold on AlizonStore. We source directly from authorized distributors and manufacturers."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, Amex), PayPal, and Apple Pay."
    }
  ];

  return (
    <>
      <Navbar session={session} />

      <main className="bg-neutral-50 min-h-screen py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="text-center mb-12">
            <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2 block">Help Center</span>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-brand mb-4">Frequently Asked Questions</h1>
            <p className="text-neutral-500">
              Find answers to common questions about our products, shipping, and returns.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6 md:p-8">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-semibold text-brand hover:text-primary transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-neutral-600 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default FAQPage;
