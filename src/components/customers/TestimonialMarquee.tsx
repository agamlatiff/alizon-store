import React from 'react';
import { Star, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    user: "Sarah Jenkins",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
    rating: 5,
    comment: "The quality of the leather bag is outstanding. Shipping was incredibly fast too!",
    date: "2 days ago"
  },
  {
    id: 2,
    user: "Michael Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
    rating: 5,
    comment: "Best shopping experience I've had in a while. Returns are hassle-free.",
    date: "1 week ago"
  },
  {
    id: 3,
    user: "Emma Wilson",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop",
    rating: 4,
    comment: "Love the style of the clothes. Fit is true to size.",
    date: "2 weeks ago"
  }
];

const TestimonialMarquee = () => {
  // Create a doubled array for infinite marquee - 5x to ensure smooth loop on wide screens
  const marqueeTestimonials = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="py-24 bg-neutral-50 border-t border-neutral-100 overflow-hidden">
       <div className="text-center mb-12">
         <h2 className="text-3xl font-display font-bold text-brand">What Our Customers Say</h2>
       </div>
       
       {/* Marquee Container */}
       <div className="relative w-full">
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-neutral-50 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-neutral-50 to-transparent z-10"></div>
          
          <div className="flex w-max animate-marquee hover:pause-on-hover">
             {marqueeTestimonials.map((review, idx) => (
                <div key={`${review.id}-${idx}`} className="w-[350px] md:w-[450px] px-4">
                   <div className="bg-white p-8 rounded-2xl shadow-card h-full border border-neutral-100">
                      <div className="flex gap-1 mb-4">
                         {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-primary text-primary' : 'fill-neutral-200 text-neutral-200'}`} />
                         ))}
                      </div>
                      <p className="text-brand font-medium italic mb-6 leading-relaxed">"{review.comment}"</p>
                      <div className="flex items-center gap-4">
                         <img src={review.avatar} alt={review.user} className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-md" />
                         <div>
                            <h4 className="font-bold text-brand text-sm">{review.user}</h4>
                            <span className="text-xs text-neutral-400">{review.date}</span>
                         </div>
                         <Quote className="w-8 h-8 text-primary/20 ml-auto" />
                      </div>
                   </div>
                </div>
             ))}
          </div>
       </div>
    </section>
  );
};

export default TestimonialMarquee;
