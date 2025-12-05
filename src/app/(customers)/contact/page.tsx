import React from 'react';
import Navbar from '@/components/customers/Navbar';
import Footer from '@/components/customers/Footer';
import { auth } from '@/lib/auth';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import Button from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const ContactPage = async () => {
  const session = await auth();

  return (
    <>
      <Navbar session={session} />

      <main className="bg-neutral-50 min-h-screen py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-display font-bold text-brand mb-4">Get in Touch</h1>
            <p className="text-neutral-500 max-w-xl mx-auto">
              Have a question or feedback? We'd love to hear from you. Fill out the form below or reach us via email.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100">
                <h3 className="font-bold text-xl text-brand mb-6">Contact Information</h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-brand">Email Us</p>
                      <p className="text-sm text-neutral-500">support@alizonstore.com</p>
                      <p className="text-sm text-neutral-500">sales@alizonstore.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-brand">Call Us</p>
                      <p className="text-sm text-neutral-500">+1 (555) 123-4567</p>
                      <p className="text-xs text-neutral-400">Mon-Fri, 9am - 6pm EST</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-brand">Visit Us</p>
                      <p className="text-sm text-neutral-500">
                        123 Commerce Blvd,<br />
                        Suite 100, New York,<br />
                        NY 10001, USA
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100">
                <h3 className="font-bold text-xl text-brand mb-6">Send us a Message</h3>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-neutral-700">Name</label>
                      <Input id="name" placeholder="Your name" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-neutral-700">Email</label>
                      <Input id="email" type="email" placeholder="your@email.com" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-neutral-700">Subject</label>
                    <Input id="subject" placeholder="How can we help?" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-neutral-700">Message</label>
                    <Textarea id="message" placeholder="Type your message here..." className="min-h-[150px]" />
                  </div>

                  <Button className="w-full md:w-auto">
                    <Send className="w-4 h-4 mr-2" /> Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ContactPage;
