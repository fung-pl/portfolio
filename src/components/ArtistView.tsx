import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Artwork, Outreach, BlogPost } from '../types';
import { Sparkles, Video, Globe, GraduationCap, Mail, Instagram, Twitter, ExternalLink, Download, Calendar, Theater, Newspaper, Plus, X } from 'lucide-react';
import BlogOverlay from './BlogOverlay';

const artworks: Artwork[] = [
  {
    title: "Inner Complexity",
    year: "2025",
    vimeoId: "1170295236",
    description: "A live art performance exploring human and non-human interactions involving personal issues and the planetary crisis. The performance uses data-driven visuals and physical movement to bridge the gap between individual experience and global environmental change."
  },
  {
    title: "My Planetary Boundary",
    year: "2024",
    vimeoId: "1067876496",
    description: "A documented art performance that investigates the boundaries of human impact on the planet. Through a series of ritualistic movements and data sonification, the work reflects on our interconnectedness with the Earth's systems."
  },
  {
    title: "The Latent Self",
    year: "2023",
    vimeoId: "987654321",
    description: "A series of generative portraits created using custom-trained GANs, reflecting on identity in the age of AI."
  },
  {
    title: "Kinetic Entropy",
    year: "2022",
    vimeoId: "456789123",
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
    content: "Generative Adversarial Networks (GANs) offer a unique window into the 'subconscious' of machine learning models. By navigating the latent space of custom-trained networks, we can uncover visual forms that are both alien and strangely familiar. \n\nThis post delves into the process of using neural networks as a collaborative partner in performance art. We discuss how the unpredictability of AI output can be harnessed to create visceral theatrical experiences that reflect on identity, memory, and the evolving relationship between humans and technology.",
    category: 'art',
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800&h=400"
  },
  {
    id: '5',
    title: "The Sound of Sea Level Rise",
    date: "December 2023",
    excerpt: "Sonifying climate data for immersive theatrical experiences.",
    content: "Data sonification transforms numbers into sound, offering a different sensory path to understanding complex phenomena. In our project 'The echo from the Earth', we converted decades of sea level rise data into a multi-layered soundscape. \n\nBy assigning different frequencies and timbres to various environmental parameters, we created an immersive auditory experience that allows the audience to 'hear' the melting of glaciers and the rising of the oceans. This approach moves beyond visual charts, creating a more visceral and emotional connection to the data of climate change.",
    category: 'art',
    image: "https://images.unsplash.com/photo-1503095396549-807039045349?auto=format&fit=crop&q=80&w=800&h=450"
  }
];

const collaborators = [
  { name: "Tate Modern", logo: "https://picsum.photos/seed/tate/200/100?grayscale" },
  { name: "Ars Electronica", logo: "https://picsum.photos/seed/ars/200/100?grayscale" },
  { name: "Barbican Centre", logo: "https://picsum.photos/seed/barbican/200/100?grayscale" },
  { name: "ZKM Center", logo: "https://picsum.photos/seed/zkm/200/100?grayscale" },
  { name: "V&A Museum", logo: "https://picsum.photos/seed/va/200/100?grayscale" },
  { name: "Centre Pompidou", logo: "https://picsum.photos/seed/pompidou/200/100?grayscale" },
  { name: "MoMA", logo: "https://picsum.photos/seed/moma/200/100?grayscale" },
  { name: "Serpentine Galleries", logo: "https://picsum.photos/seed/serpentine/200/100?grayscale" },
  { name: "Hayward Gallery", logo: "https://picsum.photos/seed/hayward/200/100?grayscale" },
  { name: "Palais de Tokyo", logo: "https://picsum.photos/seed/tokyo/200/100?grayscale" },
];

export default function ArtistView() {
  const [showAllOutreach, setShowAllOutreach] = useState(false);
  const [showAllArtworks, setShowAllArtworks] = useState(false);
  const [showAllBlogPosts, setShowAllBlogPosts] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
      view: 'Artist'
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      let result;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        result = await response.json();
      } else {
        const text = await response.text();
        console.error("Non-JSON response received:", text);
        throw new Error("The server returned an unexpected response. This usually happens if the backend API is not correctly configured or available in this environment.");
      }

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
      }

      setIsSubmitted(true);
      (e.target as HTMLFormElement).reset();
    } catch (error: any) {
      console.error('Contact error:', error);
      alert(error.message || 'Sorry, there was an error sending your message. Please try again later.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };

  const displayedOutreach = showAllOutreach ? outreach : outreach.slice(0, 4);
  const displayedArtworks = showAllArtworks ? artworks : artworks.slice(0, 2);
  const displayedBlogPosts = showAllBlogPosts ? blogPosts : blogPosts.slice(0, 2);

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
            <h1 className="text-5xl md:text-6xl font-serif italic mb-8 leading-tight">
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
            className="space-y-8"
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
            <div className="bg-zinc-900/90 backdrop-blur-md p-8 rounded-2xl border border-rose-500/30 shadow-xl">
              <p className="text-[10px] font-mono tracking-widest text-rose-500 uppercase mb-3">Current Projects</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-serif italic text-white">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  Atmospheric Data Play
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  Inner Complexity Performance
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  My Planetary Boundary
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  Generative Latent Portraits
                </li>
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
          <div className="max-w-3xl mx-auto space-y-16">
            <AnimatePresence mode="popLayout">
              {displayedArtworks.map((art, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <div className="aspect-video rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl group relative">
                    <iframe 
                      src={`https://player.vimeo.com/video/${art.vimeoId}?background=1&autoplay=0&loop=1&byline=0&title=0`}
                      className="w-full h-full"
                      allow="autoplay; fullscreen; picture-in-picture"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <a 
                        href={`https://vimeo.com/${art.vimeoId}`}
                        target="_blank"
                        className="p-4 bg-white rounded-full text-black hover:scale-110 transition-transform"
                      >
                        <ExternalLink size={24} />
                      </a>
                    </div>
                  </div>
                  <div className="px-8">
                    <div className="flex justify-between items-baseline mb-2">
                      <h3 className="text-2xl font-serif italic text-white">{art.title}</h3>
                      <span className="text-sm font-mono text-zinc-500">{art.year}</span>
                    </div>
                    <p className="text-zinc-400 font-light leading-relaxed mb-4">{art.description}</p>
                    <a 
                      href={`https://vimeo.com/${art.vimeoId}`}
                      target="_blank"
                      className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-rose-500 hover:text-white transition-colors"
                    >
                      WATCH ON VIMEO <ExternalLink size={12} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {!showAllArtworks && artworks.length > 2 && (
            <button 
              onClick={() => setShowAllArtworks(true)}
              className="w-full mt-12 py-4 border border-dashed border-zinc-800 rounded-3xl text-xs font-mono font-bold text-zinc-500 hover:text-rose-500 hover:border-rose-500 hover:bg-rose-500/5 transition-all flex items-center justify-center gap-2"
            >
              <Plus size={14} /> SEE MORE WORKS
            </button>
          )}
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
            <AnimatePresence mode="popLayout">
              {displayedBlogPosts.map((post) => (
                <motion.div 
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
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
            </AnimatePresence>
          </div>
          
          {!showAllBlogPosts && blogPosts.length > 2 && (
            <button 
              onClick={() => setShowAllBlogPosts(true)}
              className="w-full mt-12 py-4 border border-dashed border-zinc-800 rounded-3xl text-xs font-mono font-bold text-zinc-500 hover:text-rose-500 hover:border-rose-500 hover:bg-rose-500/5 transition-all flex items-center justify-center gap-2"
            >
              <Plus size={14} /> SEE MORE POSTS
            </button>
          )}
        </section>

        {/* Blog Overlay */}
      <BlogOverlay 
        post={selectedPost} 
        onClose={() => setSelectedPost(null)} 
        view="artist"
      />

      {/* Collaborators Section */}
        <section id="collaborators" className="py-32 border-t border-zinc-800 scroll-mt-32 overflow-hidden">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif italic mb-4 text-white">Collaborators</h2>
            <p className="text-zinc-500 font-mono text-xs tracking-widest uppercase">Institutions & Partners</p>
          </div>
          
          <div className="relative flex overflow-x-hidden">
            <motion.div 
              className="flex gap-24 items-center whitespace-nowrap"
              animate={{ x: [0, -1920] }}
              transition={{ 
                duration: 40, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            >
              {[...collaborators, ...collaborators].map((collab, idx) => (
                <div key={idx} className="flex flex-col items-center gap-4 w-48 shrink-0 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
                  <img 
                    src={collab.logo} 
                    alt={collab.name} 
                    className="h-12 w-auto object-contain invert"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-[10px] font-mono text-zinc-500 text-center">{collab.name}</span>
                </div>
              ))}
            </motion.div>
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
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input required name="name" type="text" placeholder="NAME" className="w-full bg-black border border-zinc-800 rounded-2xl px-6 py-4 font-mono text-xs tracking-widest focus:outline-none focus:border-rose-500 transition-colors" />
                <input required name="email" type="email" placeholder="EMAIL" className="w-full bg-black border border-zinc-800 rounded-2xl px-6 py-4 font-mono text-xs tracking-widest focus:outline-none focus:border-rose-500 transition-colors" />
              </div>
              <textarea required name="message" placeholder="MESSAGE" rows={5} className="w-full bg-black border border-zinc-800 rounded-2xl px-6 py-4 font-mono text-xs tracking-widest focus:outline-none focus:border-rose-500 transition-colors" />
              <button 
                disabled={isSubmitting || isSubmitted}
                className="w-full bg-rose-500 text-white py-4 rounded-2xl font-mono text-xs font-bold tracking-[0.2em] hover:bg-rose-600 transition-all shadow-lg shadow-rose-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'SENDING...' : isSubmitted ? 'MESSAGE SENT!' : 'SEND MESSAGE'}
              </button>
              {isSubmitted && (
                <p className="text-rose-500 font-mono text-[10px] text-center uppercase tracking-widest mt-2">
                  Thank you! I'll get back to you soon.
                </p>
              )}
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
