import React from 'react';

// --- Type Definition for a single testimonial ---
// Menambahkan interface untuk memastikan setiap objek testimoni memiliki struktur yang benar.
interface Testimonial {
  id: number;
  quote: string;
  name: string;
  title: string;
  avatarUrl: string;
}

// --- Placeholder Data (with Type Safety) ---
// Sekarang, array ini dipastikan harus sesuai dengan tipe 'Testimonial[]'.
const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "AuraUI has completely transformed our workflow. The components are not only beautiful but also incredibly intuitive to work with. Our development speed has increased significantly.",
    name: "Elara Vance",
    title: "Lead Designer, Nova Studios",
    avatarUrl: "https://placehold.co/100x100/E2E8F0/4A5568?text=EV",
  },
  {
    id: 2,
    quote: "Simply the best component library I've ever used. It's robust, well-documented, and the support is top-notch. I'd recommend it to any team looking to build stunning UIs.",
    name: "Marcus Thorne",
    title: "Senior Frontend Developer, Apex Digital",
    avatarUrl: "https://placehold.co/100x100/E2E8F0/4A5568?text=MT",
  },
  {
    id: 3,
    quote: "I was amazed at how quickly we could build a professional-looking landing page. The pre-built sections are a lifesaver, and the customization options are limitless. A true game-changer.",
    name: "Seraphina Lin",
    title: "Product Manager, Zenith Corp",
    avatarUrl: "https://placehold.co/100x100/E2E8F0/4A5568?text=SL",
  },
];

// --- Type Definition for TestimonialCard Props ---
interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
  avatarUrl: string;
}

// --- Testimonial Card Component (with Typed Props) ---
// Menggunakan React.FC (Functional Component) dengan props yang sudah didefinisikan tipenya.
const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, name, title, avatarUrl }) => (
  <div className="flex h-full flex-col justify-between rounded-2xl bg-white/5 p-8 backdrop-blur-sm ring-1 ring-white/10">
    <div className="flex-1">
      <blockquote className="text-lg leading-relaxed text-gray-300">
        {/* JSX akan secara otomatis menangani string dengan aman, termasuk tanda kutip di dalamnya */}
        <p>“{quote}”</p>
      </blockquote>
    </div>
    <footer className="mt-8">
      <div className="flex items-center gap-4">
        <img
          alt={name}
          src={avatarUrl}
          className="h-12 w-12 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-white">{name}</p>
          <p className="text-sm text-gray-400">{title}</p>
        </div>
      </div>
    </footer>
  </div>
);


// --- Main App Component ---
export default function App() {
  return (
    <div className="bg-gray-900 font-sans text-white antialiased">
      <section className="relative w-full overflow-hidden py-16 sm:py-20 md:py-24">
         {/* Background Gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-indigo-600/50 to-purple-600/50 blur-3xl filter" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          {/* Header Section */}
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-indigo-400">
              Trusted by Innovators
            </h2>
            <p className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Our clients&apos; success is our success
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              We pride ourselves on building solutions that not only meet but exceed expectations. Here&apos;s what some of our valued partners have to say.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="mx-auto mt-16 grid max-w-md grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                quote={testimonial.quote}
                name={testimonial.name}
                title={testimonial.title}
                avatarUrl={testimonial.avatarUrl}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

