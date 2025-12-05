import React from 'react';
import Navbar from '@/components/customers/Navbar';
import Footer from '@/components/customers/Footer';
import { auth } from '@/lib/auth';

const PrivacyPage = async () => {
  const session = await auth();

  return (
    <>
      <Navbar session={session} />

      <main className="bg-white min-h-screen py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-brand mb-8">Privacy Policy</h1>

          <div className="prose prose-neutral max-w-none">
            <p className="text-neutral-500 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-brand mb-4">1. Information We Collect</h2>
              <p className="text-neutral-600 mb-4">
                We collect information you provide directly to us, such as when you create an account, make a purchase, sign up for our newsletter, or contact us for support.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-brand mb-4">2. How We Use Your Information</h2>
              <p className="text-neutral-600 mb-4">
                We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, and communicate with you about products, services, offers, and events.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-brand mb-4">3. Information Sharing</h2>
              <p className="text-neutral-600 mb-4">
                We do not share your personal information with third parties except as described in this privacy policy or with your consent. We may share information with vendors, consultants, and other service providers who need access to such information to carry out work on our behalf.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-brand mb-4">4. Security</h2>
              <p className="text-neutral-600 mb-4">
                We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default PrivacyPage;
