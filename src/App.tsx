import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu as MenuIcon, 
  X, 
  ChevronRight, 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Instagram, 
  Facebook, 
  Twitter,
  MessageCircle,
  Calendar,
  Users,
  Utensils
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { cn } from './lib/utils';
import { MENU_CATEGORIES, MENU_ITEMS, TESTIMONIALS, GALLERY_IMAGES } from './constants';

// --- Types & Schemas ---

const reservationSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  guests: z.string().min(1, 'Number of guests is required'),
  message: z.string().optional(),
});

type ReservationFormValues = z.infer<typeof reservationSchema>;

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Menu', href: '#menu' },
    { name: 'About', href: '#about' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reservations', href: '#reservations' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 py-4",
      isScrolled ? "bg-dark/90 backdrop-blur-md py-3 shadow-lg" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a href="#" className="text-2xl font-serif font-bold tracking-widest text-gold">
          CASA BRAVA
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-sm uppercase tracking-widest hover:text-gold transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#reservations" 
            className="px-6 py-2 border border-gold text-gold hover:bg-gold hover:text-dark transition-all duration-300 text-xs uppercase tracking-widest"
          >
            Reserve
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-dark border-t border-white/10 p-6 md:hidden"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="text-lg font-serif hover:text-gold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#reservations" 
                className="w-full py-3 bg-gold text-dark text-center font-bold uppercase tracking-widest"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Reserve Table
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1920" 
          alt="Fine Dining" 
          className="w-full h-full object-cover scale-105 animate-slow-zoom"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/40 to-dark"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-gold uppercase tracking-[0.3em] text-sm mb-4 block">Exquisite Gastronomy</span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif mb-6 leading-tight">
            Auténtica cocina que <br />
            <span className="italic text-gold-light">despierta tus sentidos</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto font-light tracking-wide">
            Sabores tradicionales con un toque moderno en el corazón de la ciudad.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#menu" 
              className="w-full sm:w-auto px-10 py-4 bg-gold text-dark font-bold uppercase tracking-widest hover:bg-gold-light transition-all duration-300"
            >
              View Menu
            </a>
            <a 
              href="#reservations" 
              className="w-full sm:w-auto px-10 py-4 border border-white/30 text-white font-bold uppercase tracking-widest hover:bg-white hover:text-dark transition-all duration-300"
            >
              Reserve Table
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-gold to-transparent mx-auto"></div>
      </motion.div>
    </section>
  );
};

const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState('appetizers');

  return (
    <section id="menu" className="section-padding bg-warm-gray">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-4">Our Menu</h2>
          <div className="w-24 h-1 bg-gold mx-auto"></div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {MENU_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "px-6 py-2 text-sm uppercase tracking-widest transition-all duration-300 border",
                activeCategory === cat.id 
                  ? "bg-gold text-dark border-gold" 
                  : "border-white/10 text-white/60 hover:border-gold/50"
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
          <AnimatePresence mode="wait">
            {MENU_ITEMS.filter(item => item.category === activeCategory).map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="group p-4 border-b border-white/5 hover:bg-white/5 transition-all"
              >
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-xl font-serif group-hover:text-gold transition-colors">{item.name}</h3>
                  <span className="text-gold font-mono">{item.price}</span>
                </div>
                <p className="text-white/60 text-sm font-light italic">{item.description}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-16 text-center">
          <p className="text-white/40 text-sm italic mb-8">
            * All our ingredients are locally sourced and seasonal.
          </p>
          <button className="px-12 py-4 border border-gold text-gold hover:bg-gold hover:text-dark transition-all uppercase tracking-widest text-sm">
            Download Full Menu (PDF)
          </button>
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="section-padding">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="aspect-[4/5] overflow-hidden rounded-sm">
            <img 
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1000" 
              alt="Chef at work" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-8 -right-8 w-64 h-64 border-8 border-gold/20 -z-10 hidden md:block"></div>
          <div className="absolute -top-8 -left-8 bg-gold p-8 hidden md:block">
            <p className="text-dark font-serif text-4xl italic">Est. 2012</p>
          </div>
        </div>

        <div>
          <span className="text-gold uppercase tracking-[0.3em] text-sm mb-4 block">Our Story</span>
          <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">
            Pasión por la cocina, <br />
            <span className="italic">respeto por el producto.</span>
          </h2>
          <div className="space-y-6 text-white/70 font-light leading-relaxed text-lg">
            <p>
              Casa Brava nació de un sueño compartido: elevar la cocina tradicional a una experiencia de lujo contemporáneo. Lo que comenzó como un pequeño bistro familiar se ha transformado en un referente gastronómico, manteniendo siempre la esencia de nuestros orígenes.
            </p>
            <p>
              Cada plato que sale de nuestra cocina es el resultado de una búsqueda incansable de la perfección. Seleccionamos personalmente a nuestros proveedores, priorizando productos de proximidad y temporada para garantizar una frescura inigualable.
            </p>
            <p>
              En Casa Brava, no solo servimos comida; creamos recuerdos. Nuestra atmósfera íntima y sofisticada es el escenario perfecto para celebraciones inolvidables y encuentros significativos.
            </p>
          </div>
          <div className="mt-10 flex items-center space-x-6">
            <div className="text-center">
              <p className="text-3xl font-serif text-gold">12+</p>
              <p className="text-xs uppercase tracking-widest text-white/40">Years of Excellence</p>
            </div>
            <div className="w-px h-12 bg-white/10"></div>
            <div className="text-center">
              <p className="text-3xl font-serif text-gold">3</p>
              <p className="text-xs uppercase tracking-widest text-white/40">Michelin Stars</p>
            </div>
            <div className="w-px h-12 bg-white/10"></div>
            <div className="text-center">
              <p className="text-3xl font-serif text-gold">100%</p>
              <p className="text-xs uppercase tracking-widest text-white/40">Organic Products</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const GallerySection = () => {
  return (
    <section id="gallery" className="section-padding bg-warm-gray">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-4">Visual Journey</h2>
          <p className="text-white/50 uppercase tracking-widest text-sm">A glimpse into the Casa Brava experience</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {GALLERY_IMAGES.map((img, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ scale: 1.02 }}
              className="aspect-square overflow-hidden group cursor-pointer relative"
            >
              <img 
                src={img} 
                alt={`Gallery ${idx}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Instagram className="text-white" size={32} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  const [active, setActive] = useState(0);

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-serif text-white/[0.02] select-none pointer-events-none">
        Reviews
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <div className="flex justify-center mb-8">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="text-gold fill-gold mx-1" size={20} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-12"
          >
            <p className="text-2xl md:text-3xl font-serif italic mb-8 leading-relaxed">
              "{TESTIMONIALS[active].content}"
            </p>
            <h4 className="text-gold text-xl font-serif">{TESTIMONIALS[active].name}</h4>
            <p className="text-white/40 text-sm uppercase tracking-widest mt-2">{TESTIMONIALS[active].role}</p>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center space-x-4">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActive(idx)}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                active === idx ? "bg-gold w-8" : "bg-white/20"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const ReservationSection = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema)
  });

  const onSubmit = async (data: ReservationFormValues) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Reservation Data:', data);
    alert('Reservation request sent! We will contact you shortly.');
  };

  return (
    <section id="reservations" className="section-padding bg-warm-gray">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-gold uppercase tracking-[0.3em] text-sm mb-4 block">Book a Table</span>
          <h2 className="text-4xl md:text-5xl font-serif mb-8">Join us for an <br /> unforgettable evening</h2>
          <p className="text-white/60 font-light mb-8 text-lg">
            Para garantizar la mejor experiencia, recomendamos realizar su reserva con al menos 48 horas de antelación. Para grupos de más de 8 personas, por favor contáctenos directamente por teléfono.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-white/40">Call Us</p>
                <p className="text-lg">+34 912 345 678</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-white/40">Email Us</p>
                <p className="text-lg">reservas@casabrava.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card p-8 md:p-12 rounded-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/60">Full Name</label>
                <input 
                  {...register('name')}
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 focus:border-gold outline-none transition-all"
                  placeholder="John Doe"
                />
                {errors.name && <p className="text-red-400 text-xs">{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/60">Email Address</label>
                <input 
                  {...register('email')}
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 focus:border-gold outline-none transition-all"
                  placeholder="john@example.com"
                />
                {errors.email && <p className="text-red-400 text-xs">{errors.email.message}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/60">Date</label>
                <div className="relative">
                  <input 
                    type="date"
                    {...register('date')}
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 focus:border-gold outline-none transition-all appearance-none"
                  />
                  <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" size={16} />
                </div>
                {errors.date && <p className="text-red-400 text-xs">{errors.date.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/60">Time</label>
                <div className="relative">
                  <select 
                    {...register('time')}
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 focus:border-gold outline-none transition-all appearance-none"
                  >
                    <option value="" className="bg-dark">Select Time</option>
                    <option value="13:00" className="bg-dark">13:00</option>
                    <option value="14:00" className="bg-dark">14:00</option>
                    <option value="20:00" className="bg-dark">20:00</option>
                    <option value="21:00" className="bg-dark">21:00</option>
                    <option value="22:00" className="bg-dark">22:00</option>
                  </select>
                  <Clock className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" size={16} />
                </div>
                {errors.time && <p className="text-red-400 text-xs">{errors.time.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/60">Guests</label>
                <div className="relative">
                  <select 
                    {...register('guests')}
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 focus:border-gold outline-none transition-all appearance-none"
                  >
                    <option value="" className="bg-dark">Guests</option>
                    <option value="1" className="bg-dark">1 Person</option>
                    <option value="2" className="bg-dark">2 People</option>
                    <option value="3" className="bg-dark">3 People</option>
                    <option value="4" className="bg-dark">4 People</option>
                    <option value="5+" className="bg-dark">5+ People</option>
                  </select>
                  <Users className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" size={16} />
                </div>
                {errors.guests && <p className="text-red-400 text-xs">{errors.guests.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-white/60">Special Requests</label>
              <textarea 
                {...register('message')}
                rows={4}
                className="w-full bg-white/5 border border-white/10 px-4 py-3 focus:border-gold outline-none transition-all resize-none"
                placeholder="Allergies, special occasions, etc."
              ></textarea>
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gold text-dark font-bold uppercase tracking-widest hover:bg-gold-light transition-all disabled:opacity-50"
            >
              {isSubmitting ? 'Processing...' : 'Confirm Reservation'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  return (
    <section id="contact" className="section-padding">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
        <div>
          <h2 className="text-4xl md:text-5xl font-serif mb-12">Visit Us</h2>
          
          <div className="space-y-12">
            <div className="flex items-start space-x-6">
              <MapPin className="text-gold shrink-0" size={24} />
              <div>
                <h4 className="text-xl font-serif mb-2">Location</h4>
                <p className="text-white/60 font-light">Calle de la Gastronomía, 42<br />28001 Madrid, España</p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <Clock className="text-gold shrink-0" size={24} />
              <div>
                <h4 className="text-xl font-serif mb-2">Opening Hours</h4>
                <div className="text-white/60 font-light space-y-1">
                  <p>Tuesday - Saturday: 13:00 - 16:00 | 20:00 - 23:30</p>
                  <p>Sunday: 13:00 - 17:00</p>
                  <p>Monday: Closed</p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10">
              <a 
                href="https://wa.me/34912345678" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-3 px-8 py-4 bg-[#25D366] text-white font-bold uppercase tracking-widest hover:brightness-110 transition-all"
              >
                <MessageCircle size={20} />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </div>

        <div className="h-[500px] w-full grayscale contrast-125 brightness-75 hover:grayscale-0 transition-all duration-700 rounded-sm overflow-hidden border border-white/10">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.274043214561!2d-3.691234567890123!3d40.41678901234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4228870703c467%3A0x9136427520933547!2sPlaza%20de%20Cibeles!5e0!3m2!1sen!2ses!4v1625526200000!5m2!1sen!2ses" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy"
            title="Location Map"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-dark border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <a href="#" className="text-3xl font-serif font-bold tracking-widest text-gold mb-6 block">
              CASA BRAVA
            </a>
            <p className="text-white/40 max-w-sm font-light leading-relaxed">
              Redefiniendo la elegancia culinaria a través de la pasión y el respeto por los ingredientes más nobles.
            </p>
            <div className="flex space-x-6 mt-8">
              <a href="#" className="text-white/60 hover:text-gold transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-white/60 hover:text-gold transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-white/60 hover:text-gold transition-colors"><Twitter size={20} /></a>
            </div>
          </div>

          <div>
            <h5 className="text-gold uppercase tracking-widest text-sm mb-6">Quick Links</h5>
            <ul className="space-y-4 text-white/60 font-light">
              <li><a href="#menu" className="hover:text-gold transition-colors">Menu</a></li>
              <li><a href="#about" className="hover:text-gold transition-colors">About Us</a></li>
              <li><a href="#gallery" className="hover:text-gold transition-colors">Gallery</a></li>
              <li><a href="#reservations" className="hover:text-gold transition-colors">Reservations</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-gold uppercase tracking-widest text-sm mb-6">Newsletter</h5>
            <p className="text-white/40 text-xs mb-4">Subscribe to receive updates on seasonal menus and special events.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Email" 
                className="bg-white/5 border border-white/10 px-4 py-2 w-full focus:border-gold outline-none text-sm"
              />
              <button className="bg-gold text-dark px-4 py-2 hover:bg-gold-light transition-all">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:row justify-between items-center text-white/20 text-xs uppercase tracking-widest gap-4">
          <p>&copy; {new Date().getFullYear()} Casa Brava Restaurant. All rights reserved.</p>
          <div className="flex space-x-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen selection:bg-gold selection:text-dark">
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <MenuSection />
        <GallerySection />
        <TestimonialsSection />
        <ReservationSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
