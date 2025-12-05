import React from 'react';
import Navbar from '@/components/customers/Navbar';
import Footer from '@/components/customers/Footer';
import { auth } from '@/lib/auth';

const TermsPage = async () => {
  const session = await auth();

  return (
    <>
      <Navbar session={session} />

      <main className="bg-white min-h-screen py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-brand mb-8">Terms and Conditions</h1>

          <div className="prose prose-neutral max-w-none">
            <p className="text-neutral-500 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-brand mb-4">1. Introduction</h2>
              <p className="text-neutral-600 mb-4">
                Welcome to AlizonStore. By accessing our website, you agree to be bound by these Terms and Conditions, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-brand mb-4">2. Use License</h2>
              <p className="text-neutral-600 mb-4">
                Permission is granted to temporarily download one copy of the materials (information or software) on AlizonStore's website for personal, non-commercial transitory viewing only.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-brand mb-4">3. Disclaimer</h2>
              <p className="text-neutral-600 mb-4">
                The materials on AlizonStore's website are provided on an 'as is' basis. AlizonStore makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-brand mb-4">4. Limitations</h2>
              <p className="text-neutral-600 mb-4">
                In no event shall AlizonStore or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on AlizonStore's website.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default TermsPage;
