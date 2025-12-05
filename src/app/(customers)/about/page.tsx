import React from 'react';
import Navbar from '@/components/customers/Navbar';
import Footer from '@/components/customers/Footer';
import { auth } from '@/lib/auth';
import Image from 'next/image';
import { CheckCircle2, Users, Globe2, Award } from 'lucide-react';

const AboutPage = async () => {
  const session = await auth();

  return (
    <>
      <Navbar session={session} />

      <main className="bg-white">
        {/* Hero Section */}
        <section className="relative py-20 bg-neutral-900 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <Image
              src="/assets/hero.jpg"
              alt="About Background"
              fill
              className="object-cover"
            />
          </div>
          <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">Our Story</h1>
            <p className="text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto">
              Redefining the digital shopping experience with premium quality and unmatched service since 2020.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1000&auto=format&fit=crop"
                alt="Our Team"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <span className="text-primary font-bold tracking-widest uppercase text-sm">Who We Are</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-brand">Driven by Passion, <br />Defined by Quality.</h2>
              <p className="text-neutral-600 leading-relaxed">
                At AlizonStore, we believe that shopping should be more than just a transaction; it should be an experience.
                Founded with a vision to bring premium products to discerning customers worldwide, we curate our collections
                with meticulous attention to detail.
              </p>
              <p className="text-neutral-600 leading-relaxed">
                Our mission is simple: to provide an accessible platform for high-quality fashion and lifestyle products
                while maintaining the highest standards of customer service and sustainability.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="flex flex-col gap-2">
                  <h3 className="text-3xl font-bold text-brand">50k+</h3>
                  <p className="text-sm text-neutral-500">Happy Customers</p>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-3xl font-bold text-brand">100+</h3>
                  <p className="text-sm text-neutral-500">Brands Partnered</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-neutral-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-brand mb-4">Why Choose Us</h2>
              <p className="text-neutral-500 max-w-2xl mx-auto">We are committed to excellence in every aspect of our business.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: CheckCircle2, title: "Quality Assurance", desc: "Every product is verified for authenticity and quality." },
                { icon: Users, title: "Customer First", desc: "24/7 support to ensure your satisfaction." },
                { icon: Globe2, title: "Global Shipping", desc: "Fast and secure delivery to over 50 countries." },
                { icon: Award, title: "Best in Class", desc: "Award-winning e-commerce experience." }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-brand mb-2">{item.title}</h3>
                  <p className="text-sm text-neutral-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default AboutPage;
