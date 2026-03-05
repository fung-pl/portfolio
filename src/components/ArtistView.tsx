import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Artwork, Outreach, BlogPost } from '../types';
import { Sparkles, Video, Globe, GraduationCap, Mail, Instagram, Twitter, ExternalLink, Download, Calendar, Theater, Newspaper, Plus } from 'lucide-react';

const artworks: Artwork[] = [
  {
    title: "Atmospheric Data Play",
    year: "2024",
    vimeoId: "123456789", // Placeholder
    description: "A theater performance where the stage lighting and soundscape are driven by real-time air quality data."
  },
  {
    title: "The Latent Self",
    year: "2023",
    vimeoId: "987654321", // Placeholder
    description: "A series of generative portraits created using custom-trained GANs, reflecting on identity in the age of AI."
  },
  {
    title: "Kinetic Entropy",
    year: "2022",
    vimeoId: "456789123", // Placeholder
    description: "A physical kinetic sculpture that responds to real-time environmental data, creating a dance of controlled chaos."
  }
];

const outreach: Outreach[] = [
  {
    title: "Advisor for West Coast Cultural Lab",
    role: "Advisor",
    date: "August 2025 - Present",
    description: "Joined the group as an advisor to support the development of bridging art and technology. Link to the organisation: West Coast Cultural Lab"
  },
  {
    title: "One-Day Stand No.4",
    role: "Exhibitor",
    date: "2025",
    description: "Curated and conducted a live art performance 'Inner Complexity' at theotherside, Vantaa, Finland. Performance explored human and non-human interactions involving personal issues and the planetary crisis. Link to the workshop: https://www.theothersidevantaa.com/1st-ed-2024 | Link to the video: Inner Complexity"
  },
  {
    title: "Information is Beautiful Awards Volunteer Program",
    role: "Volunteer",
    date: "2025",
    description: "Assisted submissions pruning process for the Awards with Data Visualization Society. Link to the awards: https://iibawards.herokuapp.com/news/676-thank-you-to-our-incredible-volunteers"
  },
  {
    title: "SideWalk 1st Ed.",
    role: "Participant and Exhibitor",
    date: "2024",
    description: "Curated and exhibited documented art performance 'My Planetary Boundary' through the workshop at theotherside, Vantaa, Finland. Performance explored human and non-human interactions. Link to the workshop: https://www.theothersidevantaa.com/1st-ed-2024 | Link to the video: My planetary boundary"
  },
  {
    title: "Data Art for Climate Action Conference (DACA)",
    role: "Attendee",
    date: "2022",
    description: "Co-authored artwork 'The echo from the Earth: The melting city' accepted to the conference at University of Graz and the City University of Hong Kong. Performance converted sea level data into soundscapes. Link to the proceedings: Proceedings|Catalogue of the 2022 Conference on Data Art for Climate Action (DACA)"
  },
  {
    title: "You and I, You and Me Workshop",
    role: "Participant",
    date: "2022",
    description: "Investigated electricity as a medium for communication and environmental connections at Institutio Media, Vilnius, Lithuania. Exhibited self-made headwear on the last day of the workshop. Link to the workshop: Workshop: You and I, You and Me"
  },
  {
    title: "Double Bill One",
    role: "Performer",
    date: "2015",
    description: "Performed in an A capella group with Yat Po Singers, Hong Kong. Link to the performance: Taikoo Place - a cappella-la-la : Double Bill One"
  },
  {
    title: "Black Box Theatre Performances",
    role: "Performer",
    date: "2011 - 2015",
    description: "Several black box theatre performances in Hong Kong."
  }
];

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: "The Intersection of Data and Aesthetics",
    date: "March 2024",
    excerpt: "How visualizing air quality data can change public perception of climate change.",
    content: "...",
    category: 'both',
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800&h=400"
  },
  {
    id: '3',
    title: "Neural Networks as a Creative Medium",
    date: "February 2024",
    excerpt: "Exploring the aesthetic potential of latent spaces in generative performance art.",
    content: "...",
    category: 'art',
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800&h=400"
  }
];

const collaborators = [
  { name: "Tate Modern", logo: "https://picsum.photos/seed/tate/200/100?grayscale" },
  { name: "Ars Electronica", logo: "https://picsum.photos/seed/ars/200/100?grayscale" },
  { name: "Barbican Centre", logo: "https://picsum.photos/seed/barbican/200/100?grayscale" },
  { name: "ZKM Center", logo: "https://picsum.photos/seed/zkm/200/100?grayscale" },
  { name: "V&A Museum", logo: "https://picsum.photos/seed/va/200/100?grayscale" },
];

export default function ArtistView() {
  const [showAllOutreach, setShowAllOutreach] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const displayedOutreach = showAllOutreach ? outreach : outreach.slice(0, 4);

  const heroImages = [
    "https://images.unsplash.com/photo-1503095396549-807039045349?auto=format&fit=crop&q=80&w=900&h=450",
    "https://images.unsplash.com/photo-1514525253361-bee8718a340b?auto=format&fit=crop&q=80&w=900&h=450",
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=900&h=450",
    "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=900&h=450",
    "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=900&h=450"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-black min-h-screen text-white artistic-gradient pb-20 px-[10%]">
      {/* Hero Section */}
      <section id="about" className="max-w-7xl mx-auto pt-32 pb-24 scroll-mt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-rose-500 font-sans text-sm tracking-[0.4em] uppercase mb-6 block">Data Art & Performance</span>
            <h1 className="text-7xl md:text-8xl font-serif italic mb-8 leading-tight">
              Where <span className="text-rose-500">Data</span> Meets the Stage.
            </h1>
            <p className="max-w-2xl text-xl text-zinc-400 font-light leading-relaxed mb-10">
              Specializing in data art, science editorial, and performance art. 
              My work bridges the gap between complex environmental data and visceral 
              theatrical experiences.
            </p>
            <div className="flex flex-wrap gap-6">
              <a href="https://calendar.google.com" target="_blank" className="bg-rose-500 text-white px-8 py-4 rounded-full font-mono text-xs font-bold tracking-widest hover:bg-rose-600 transition-colors flex items-center gap-2">
                <Calendar size={14} /> BOOK A MEETING
              </a>
              <a href="/cv-artist-fung.pdf" download className="border border-zinc-800 text-white px-8 py-4 rounded-full font-mono text-xs font-bold tracking-widest hover:bg-zinc-900 transition-colors flex items-center gap-2">
                <Download size={14} /> DOWNLOAD CV
              </a>
            </div>
            
            <div className="mt-12 flex items-center gap-6">
              <a href="https://www.art-mate.net/doc/8272" target="_blank" className="flex items-center gap-2 text-xs font-mono font-bold text-zinc-500 hover:text-rose-500 transition-colors">
                <ExternalLink size={14} /> ART MATE
              </a>
              <a href="#" target="_blank" className="flex items-center gap-2 text-xs font-mono font-bold text-zinc-500 hover:text-rose-500 transition-colors">
                <Instagram size={14} /> INSTAGRAM
              </a>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="aspect-[2/1] rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl shadow-rose-500/10 relative">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={currentImageIndex}
                  src={heroImages[currentImageIndex]} 
                  alt="Performance Art" 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="w-full h-full object-cover absolute inset-0"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
            </div>
            {/* Info Bubble ON the picture - matched to scientist layout */}
            <div className="absolute -bottom-6 -right-6 bg-zinc-900/90 backdrop-blur-md p-6 rounded-xl border border-rose-500/30 shadow-xl hidden md:block z-10">
              <p className="text-[10px] font-mono tracking-widest text-rose-500 uppercase mb-1">Current Projects</p>
              <ul className="text-sm font-serif italic text-white space-y-1">
                <li>Atmospheric Data Play</li>
                <li>Inner Complexity Performance</li>
                <li>My Planetary Boundary</li>
                <li>Generative Latent Portraits</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto space-y-32">
        {/* Artwork Section */}
        <section id="works" className="scroll-mt-32">
          <div className="flex items-center gap-4 mb-12">
            <Video className="text-rose-500" size={32} />
            <h2 className="text-4xl font-serif italic">Selected Works</h2>
          </div>
          <div className="grid grid-cols-1 gap-12">
            {artworks.map((art, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="aspect-video bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 group-hover:border-rose-500/50 transition-colors flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                  <img 
                    src={`https://picsum.photos/seed/art${idx}/800/450`} 
                    alt={art.title}
                    className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="z-20 text-center">
                    <div className="w-16 h-16 rounded-full bg-rose-500 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform shadow-lg shadow-rose-500/20">
                      <Video size={24} fill="white" />
                    </div>
                    <p className="text-xs font-mono tracking-widest text-rose-500">WATCH FILM</p>
                  </div>
                </div>
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-2xl font-serif italic group-hover:text-rose-500 transition-colors">{art.title}</h3>
                    <span className="text-sm font-mono text-zinc-500">{art.year}</span>
                  </div>
                  <p className="text-zinc-400 font-light leading-relaxed">{art.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Outreach Section */}
        <section id="outreach" className="scroll-mt-32">
          <div className="flex items-center gap-4 mb-12">
            <Globe className="text-rose-500" size={32} />
            <h2 className="text-4xl font-serif italic">Outreach & Exhibitions</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-8">
            <AnimatePresence mode="popLayout">
              {displayedOutreach.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="art-border border-zinc-800 p-8 bg-zinc-900/50 rounded-3xl"
                >
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-xl font-medium text-white">{item.title}</h3>
                    <span className="text-xs font-mono text-zinc-500">{item.date}</span>
                  </div>
                  <p className="text-rose-500 text-sm mb-4 font-medium">{item.role}</p>
                  <p className="text-zinc-400 font-light text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {!showAllOutreach && outreach.length > 4 && (
            <button 
              onClick={() => setShowAllOutreach(true)}
              className="w-full mt-12 py-4 border border-dashed border-zinc-800 rounded-3xl text-xs font-mono font-bold text-zinc-500 hover:text-rose-500 hover:border-rose-500 hover:bg-rose-500/5 transition-all flex items-center justify-center gap-2"
            >
              <Plus size={14} /> SEE MORE OUTREACH
            </button>
          )}
        </section>

        {/* Blog Section */}
        <section id="blog" className="scroll-mt-32">
          <div className="flex items-center gap-4 mb-12">
            <Newspaper className="text-rose-500" size={32} />
            <h2 className="text-4xl font-serif italic">Science & Art Blog</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {blogPosts.map((post) => (
              <motion.div 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden hover:border-rose-500 transition-all group"
              >
                <div className="h-64 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-mono text-rose-500 uppercase tracking-[0.2em]">{post.category}</span>
                    <span className="text-[10px] font-mono text-zinc-500">{post.date}</span>
                  </div>
                  <h3 className="text-2xl font-serif italic mb-4 group-hover:text-rose-500 transition-colors text-white">{post.title}</h3>
                  <p className="text-zinc-400 font-light text-sm leading-relaxed mb-6">{post.excerpt}</p>
                  <button className="text-xs font-mono font-bold text-white hover:text-rose-500 transition-colors flex items-center gap-2">
                    READ MORE <ExternalLink size={12} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Collaborators Section */}
        <section id="collaborators" className="py-32 border-t border-zinc-800 scroll-mt-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif italic mb-4 text-white">Collaborators</h2>
            <p className="text-zinc-500 font-mono text-xs tracking-widest uppercase">Galleries & Institutions</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all">
            {collaborators.map((collab) => (
              <img 
                key={collab.name} 
                src={collab.logo} 
                alt={collab.name} 
                className="h-8 md:h-12 w-auto invert"
                referrerPolicy="no-referrer"
              />
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 bg-zinc-900/50 rounded-[3rem] border border-zinc-800 px-12 scroll-mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-5xl font-serif italic mb-8 text-white">Get in Touch.</h2>
              <p className="text-xl text-zinc-400 font-light leading-relaxed mb-12">
                For exhibition inquiries, theater commissions, or creative collaborations, 
                please reach out via the form or my social channels.
              </p>
              <div className="space-y-6">
                <a href="mailto:pleakley9@gmail.com" className="flex items-center gap-4 text-white hover:text-rose-500 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
                    <Mail size={20} />
                  </div>
                  <span className="font-mono text-sm tracking-widest uppercase text-white">pleakley9@gmail.com</span>
                </a>
                <a href="https://calendar.google.com" target="_blank" className="flex items-center gap-4 text-white hover:text-rose-500 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
                    <Calendar size={20} />
                  </div>
                  <span className="font-mono text-sm tracking-widest text-white">BOOK A TIME (GOOGLE CALENDAR)</span>
                </a>
                <div className="flex gap-4">
                  {[Instagram, Twitter, ExternalLink].map((Icon, i) => (
                    <a key={i} href="#" className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-rose-500 transition-all">
                      <Icon size={20} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" placeholder="NAME" className="w-full bg-black border border-zinc-800 rounded-2xl px-6 py-4 font-mono text-xs tracking-widest focus:outline-none focus:border-rose-500 transition-colors" />
                <input type="email" placeholder="EMAIL" className="w-full bg-black border border-zinc-800 rounded-2xl px-6 py-4 font-mono text-xs tracking-widest focus:outline-none focus:border-rose-500 transition-colors" />
              </div>
              <textarea placeholder="MESSAGE" rows={5} className="w-full bg-black border border-zinc-800 rounded-2xl px-6 py-4 font-mono text-xs tracking-widest focus:outline-none focus:border-rose-500 transition-colors" />
              <button className="w-full bg-rose-500 text-white py-4 rounded-2xl font-mono text-xs font-bold tracking-[0.2em] hover:bg-rose-600 transition-all shadow-lg shadow-rose-500/20">
                SEND MESSAGE
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
