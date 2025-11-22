import { Product, Review } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Urban Bomber Jacket",
    category: "Men",
    price: 129.00,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop",
    rating: 4.8,
    reviews: 124,
    isNew: true,
    colors: ["#111827", "#4B5563"],
    sizes: ["S", "M", "L", "XL"],
    description: "A classic bomber jacket reimagined for the modern city explorer. Water-resistant and stylish."
  },
  {
    id: 2,
    title: "Summer Breeze Dress",
    category: "Women",
    price: 89.50,
    oldPrice: 110.00,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop",
    rating: 4.9,
    reviews: 89,
    colors: ["#FCA5A5", "#FEF3C7"],
    sizes: ["XS", "S", "M", "L"],
    description: "Lightweight, breathable fabric perfect for summer days. Features a flattering A-line cut."
  },
  {
    id: 3,
    title: "Essential White Sneakers",
    category: "Shoes",
    price: 145.00,
    image: "https://images.unsplash.com/photo-1560769629-975e13f0c470?q=80&w=1000&auto=format&fit=crop",
    rating: 4.7,
    reviews: 342,
    colors: ["#FFFFFF"],
    sizes: ["7", "8", "9", "10", "11"],
    description: "Minimalist design meeting maximum comfort. Handcrafted leather upper with durable rubber soles."
  },
  {
    id: 4,
    title: "Leather Crossbody Bag",
    category: "Accessories",
    price: 199.00,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop",
    rating: 5.0,
    reviews: 56,
    isNew: true,
    colors: ["#78350F", "#000000"],
    sizes: ["One Size"],
    description: "Premium full-grain leather bag with adjustable strap and multiple compartments."
  },
  {
    id: 5,
    title: "Denim Trucker Jacket",
    category: "Men",
    price: 95.00,
    image: "https://images.unsplash.com/photo-1617114919297-3c8ddb01f599?q=80&w=1000&auto=format&fit=crop",
    rating: 4.5,
    reviews: 78,
    colors: ["#1E3A8A"],
    sizes: ["S", "M", "L", "XL"],
    description: "Vintage wash denim jacket. A wardrobe staple that gets better with age."
  },
  {
    id: 6,
    title: "Gold Plated Necklace",
    category: "Accessories",
    price: 45.00,
    image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=1000&auto=format&fit=crop",
    rating: 4.6,
    reviews: 210,
    colors: ["#FFD700"],
    sizes: ["One Size"],
    description: "18k gold plated stainless steel. Tarnish resistant and hypoallergenic."
  },
  {
    id: 7,
    title: "Running Performance Shoes",
    category: "Shoes",
    price: 110.00,
    oldPrice: 140.00,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop",
    rating: 4.8,
    reviews: 156,
    colors: ["#000000", "#DC2626"],
    sizes: ["8", "9", "10", "11", "12"],
    description: "Engineered for speed and stability. Breathable mesh upper with responsive cushioning."
  },
  {
    id: 8,
    title: "Oversized Wool Sweater",
    category: "Women",
    price: 75.00,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000&auto=format&fit=crop",
    rating: 4.7,
    reviews: 99,
    colors: ["#E5E7EB", "#9CA3AF"],
    sizes: ["S", "M", "L"],
    description: "Cozy oversized fit made from ethical wool blend. Perfect for layering."
  }
];

export const TESTIMONIALS: Review[] = [
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
