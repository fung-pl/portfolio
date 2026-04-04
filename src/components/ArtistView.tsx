import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Artwork, Outreach, BlogPost } from '../types';
import { Sparkles, Video, Globe, GraduationCap, Mail, Instagram, ExternalLink, Download, Calendar, Theater, Newspaper, Plus, X, Linkedin } from 'lucide-react';
import BlogOverlay from './BlogOverlay';
import StatsWidget from './StatsWidget';

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
    date: "2025 - Present",
    description: [
      "Joined the group as an advisor to support the development of bridging art and technology.",
      "Acted as a guest columnist on climate issues for the lab's publication Vancouver On Ink.",
      <span>Link to the organisation: <a href="https://wcculturallab.ca/" target="_blank" rel="noopener noreferrer" className="text-rose-500 hover:underline">West Coast Cultural Lab</a></span>,
      <span>Link to Vancouver On Ink: <a href="https://recherche-collection-search.bac-lac.gc.ca/eng/Home/Preservica?IdNumber=1535654463&pId=4dfeab2b-a0db-4384-a42c-2e6301e2d1f0&app=laccat&resource=listserial" target="_blank" rel="noopener noreferrer" className="text-rose-500 hover:underline">Vancouver On Ink</a></span>
    ]
  },
  {
    title: "One-Day Stand No.4",
    role: "Performer",
    date: "2025",
    thumbnail: "https://assets.zyrosite.com/A8526V7xnpu7WGDB/ods4-credit-aman-askarizad-106-of-112-m7VboqQJj3ILJaR5.jpg",
    description: [
      "Curated and conducted a live art performance 'Inner Complexity' at theotherside, Vantaa, Finland. Performance explored human and non-human interactions involving personal issues and the planetary crisis.",
      <span>Link to the exhibition: <a href="https://www.theothersidepap.com/ods4" target="_blank" rel="noopener noreferrer" className="text-rose-500 hover:underline">theotherside Vantaa</a> | Link to the video: <a href="https://vimeo.com/1170295236" target="_blank" rel="noopener noreferrer" className="text-rose-500 hover:underline">Inner Complexity</a></span>
    ]
  },
  {
    title: "Information is Beautiful Awards",
    role: "Volunteer",
    date: "2025",
    thumbnail: "https://iibawards-prod.s3.amazonaws.com/posts/main_images/000/000/676/page.png?1752210877",
    description: [
      "Assisted submissions pruning process for the Awards with Data Visualization Society.",
      <span>Link to the awards: <a href="https://iibawards.herokuapp.com/news/676-thank-you-to-our-incredible-volunteers" target="_blank" rel="noopener noreferrer" className="text-rose-500 hover:underline">Information is Beautiful Awards</a></span>
    ]
  },
  {
    title: "SideWalk 1st Ed.",
    role: "Participant and Exhibitor",
    date: "2024",
    thumbnail: `${import.meta.env.BASE_URL}images/planetary-boundary.jpg`.replace('//', '/'),
    description: [
      "Curated and exhibited documented art performance 'My Planetary Boundary' through the workshop at theotherside, Vantaa, Finland. Performance explored human and non-human interactions.",
      <span>Link to the workshop: <a href="https://www.theothersidevantaa.com/1st-ed-2024" target="_blank" rel="noopener noreferrer" className="text-rose-500 hover:underline">theotherside Vantaa</a> | Link to the video: <a href="https://vimeo.com/1067876496" target="_blank" rel="noopener noreferrer" className="text-rose-500 hover:underline">My planetary boundary</a></span>
    ]
  },
  {
    title: "Data Art for Climate Action Conference (DACA)",
    role: "Attendee",
    date: "2022",
    description: [
      "Co-authored artwork 'The echo from the Earth: The melting city' accepted to the conference at University of Graz and the City University of Hong Kong. Performance converted sea level data into soundscapes.",
      <span>Link to the proceedings: <a href="https://www.researchgate.net/profile/Permagnus-Lindborg-2/publication/372548787_ProceedingsCatalogue_of_the_2022_Conference_on_Data_Art_for_Climate_Action_DACA/links/64be12c195bbbe0c6e5a4235/ProceedingsCatalogue-of-the-2022-Conference-on-Data-Art-for-Climate-Action-DACA.pdf?origin=publicationDetail&_sg%5B0%5D=4hKHXh0qm7OxWvWCMURIZyo9_LhLrwuGYhVWWmXxyyq-dBjwAlFakQXyxMYtXwPFkUjPss0zJRv1lDDfikXMbA.zbd_LtBtNcyJRpw_hDroXvmi2R7T-HEsABO4rzx1EkuI6NJ6qtWALxeplmY_0Ygwz1nMPsBNxYI5yYdjFDz5Ug&_sg%5B1%5D=3suaarjxjoiR6ps04dXVBSjRDUeDj4iJiJ2jgGBcHgk3AxLiJE8MdSNV-piVx31uLr_d0xtBxMdLaD8hhGxXE5raxnAKi4uG8giJwYZ0Kt_9.zbd_LtBtNcyJRpw_hDroXvmi2R7T-HEsABO4rzx1EkuI6NJ6qtWALxeplmY_0Ygwz1nMPsBNxYI5yYdjFDz5Ug&_sg%5B2%5D=pNSASmFxfVH5gs8uvroE_uBkfOgfioWtA1qH6jG72GOTgR5VFMc1O-YVRJH4wrBb653lzuMyz-nlMMs.FF0DPnMT-nL22owGVCKBQ9ehIyGJD0jAWjrV8HBpcJ2Ag1MI9ToSqptDeXF014sqqFNvS73PmpE9XqeMwfq7Kw&_iepl=&_rtd=eyJjb250ZW50SW50ZW50IjoibWFpbkl0ZW0ifQ%3D%3D&_tp=eyJjb250ZXh0Ijp7ImZpcnN0UGFnZSI6InB1YmxpY2F0aW9uIiwicGFnZSI6InB1YmxpY2F0aW9uIiwicG9zaXRpb24iOiJwYWdlSGVhZGVyIn19" target="_blank" rel="noopener noreferrer" className="text-rose-500 hover:underline">Proceedings | Catalogue of the 2022 Conference on Data Art for Climate Action (DACA)</a></span>
    ]
  },
  {
    title: "You and I, You and Me Workshop",
    role: "Participant",
    date: "2022",
    description: [
      "Investigated electricity as a medium for communication and environmental connections at Institutio Media, Vilnius, Lithuania. Exhibited self-made headwear on the last day of the workshop.",
      <span>Link to the workshop: <a href="https://www.o-o.lt/workshop-you-and-i-you-and-me/" target="_blank" rel="noopener noreferrer" className="text-rose-500 hover:underline">Workshop: You and I, You and Me</a></span>
    ]
  },
  {
    title: "Double Bill One",
    role: "Performer",
    date: "2015",
    description: [
      "Performed in an A capella group with Yat Po Singers, Hong Kong.",
      <span>Link to the performance: <a href="https://www.facebook.com/TAIKOOPLACEHK/posts/10153016401714291/" target="_blank" rel="noopener noreferrer" className="text-rose-500 hover:underline">Taikoo Place - a cappella-la-la : Double Bill One</a></span>
    ]
  },
  {
    title: "Black Box Theatre Performances",
    role: "Performer",
    date: "2011 - 2015",
    description: [
      "Several black box theatre performances in Hong Kong.",
      <span>Link to the performer’s profile in Hong Kong: <a href="https://www.artmate.net/doc/8272"  target="_blank" rel="noopener noreferrer" className="text-rose-500 hover:underline">ArtMate Profile</a></span>
    ]
  }
];

const blogPosts: BlogPost[] = [
  {
    id: '9',
    title: "New Column Published in the Third Edition of Vancouver On Ink",
    date: "March 2026",
    excerpt: "I’m happy to share that the third edition of Vancouver On Ink has now been published, featuring my latest piece on how climate change is affecting pets.",
    content: "I’m happy to share that the third edition of Vancouver On Ink has now been published, and I had the opportunity to contribute another column through the invitation of West Coast Cultural Lab. This issue features my latest piece, “A hotter year ahead: Don’t overlook how climate change is affecting pets,” which explores how rising temperatures are already reshaping the behaviour and wellbeing of animals in Vancouver.\n\nWith extreme heat events becoming more frequent, veterinarians across Canada have reported sharp increases in dehydration and heat‑related illnesses in pets. From dogs refusing midday walks to cats seeking out cooler corners, animals often sense and respond to heat stress long before we do. My column looks at these subtle behavioural cues and why paying attention to them matters—especially as 2026 is expected to be one of the hottest years on record.\n\nIt’s been meaningful to continue contributing science‑based perspectives to the magazine, and I’m grateful for the chance to help readers connect climate change to everyday life, including the wellbeing of the animals we share our homes with.\n\nRead the columns here: https://recherche-collection-search.bac-lac.gc.ca/eng/Home/Preservica?IdNumber=1535654463&pId=4dfeab2b-a0db-4384-a42c-2e6301e2d1f0&app=laccat&resource=listserial",
    category: 'art',
    image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800&h=400"
  },
  {
    id: '8',
    title: "Excited to Continue Writing for Vancouver On Ink",
    date: "November 2025",
    excerpt: "I’m delighted to share that I’ve been invited to continue contributing as a column writer for Vancouver On Ink, focusing on air quality and climate issues.",
    content: "I’m delighted to share that I’ve been invited by West Coast Cultural Lab to continue contributing as a column writer for Vancouver On Ink, focusing on air quality and climate issues relevant to life in Vancouver. Last year, I wrote two pieces for the magazine—one on understanding the Air Quality Health Index (AQHI) during wildfire season, and another on why indoor air quality matters as we move into the colder months. Both articles appear in the issue available through Library and Archives Canada.\n\nVancouver’s air is generally clean, but it’s shaped by a mix of local and regional factors—from traffic along Highway 1 and the Lions Gate Bridge to smoke drifting in from Interior and North Shore wildfires. Tools like the AQHI help translate these conditions into meaningful health guidance, especially when PM2.5 levels rise and the index reaches the 10+ (very high risk) range.\n\nIndoor air quality is equally important during Canadian winters. Tightly sealed homes can trap pollutants such as dust, pet dander, and cooking fumes, and heating systems require proper ventilation to avoid carbon monoxide buildup. Simple habits—changing filters, using exhaust fans, maintaining healthy humidity, or adding an air purifier—can make a real difference in comfort and well‑being.\n\nI’m grateful for the opportunity to continue sharing accessible, science‑based insights with Vancouver readers, and I look forward to contributing more pieces in the months ahead.",
    category: 'art',
    image: "https://images.unsplash.com/photo-1559511260-66a654ae982a?auto=format&fit=crop&q=80&w=800&h=400"
  },
  {
    id: '10',
    title: "Curating Inner Complexity in Vantaa — A Performance About Space, Thought, and Becoming",
    date: "May 2025",
    excerpt: "In May 2025, I had the privilege of presenting my performance piece Inner Complexity in Vantaa, Finland, as part of a programme curated by theotherside.",
    content: "In May 2025, I had the privilege of presenting my performance piece Inner Complexity in Vantaa, Finland, as part of a programme curated by theotherside (@the.other.side.pap). The invitation was an honour, and the experience of performing on the evening of 17 May 2025 remains one of the most meaningful moments in my artistic practice.\n\nInner Complexity is a 20‑minute exploration of how inner space transforms over time—how emptiness gradually becomes structure, and how structure can eventually become constraint. Using threads, strings, and lines, I created a shifting environment around myself. Each time I found a gap to pass through, I added another line, dividing the space further. With every movement, the environment grew denser, more intricate, more restrictive.\n\nWhat began as openness slowly evolved into a web-like architecture—one that I had built myself. Eventually, I reached a point where no passage remained. The space had become too tight, too tangled. To continue, I had to break through the very structure I had created. This moment marked the end of the piece, symbolising how our own thoughts, habits, and internal patterns can accumulate until they hinder our movement, clarity, or growth.\n\nThe audience received the work with warmth and curiosity. Many shared afterwards that they found themselves wondering how the performance would end, and whether it could evolve into a durational piece if time allowed. Their engagement—watching the tension build, sensing the narrowing possibilities—became an integral part of the atmosphere.\n\nI’m grateful to theotherside for the invitation and to everyone who joined us that evening. Inner Complexity continues to shape how I think about space, constraint, and the architectures we build within ourselves. It was a privilege to share this work in Vantaa, and I look forward to developing it further in future contexts.",
    category: 'art',
    image: "https://assets.zyrosite.com/A8526V7xnpu7WGDB/ods4-credit-aman-askarizad-106-of-112-m7VboqQJj3ILJaR5.jpg"
  },
  {
    id: '13',
    title: "My planetary boundary — Now Exhibited in Vantaa",
    date: "October 2024",
    excerpt: "I’m delighted to share that the documented version of my performance piece My planetary boundary is now on view in Vantaa, Finland, as part of a group exhibition organised by theotherside.",
    content: "I’m delighted to share that the documented version of my performance piece My planetary boundary is now on view in Vantaa, Finland, as part of a group exhibition organised by theotherside (@the.other.side.pap). This marks my first time participating in a group exhibition, and I’m deeply grateful to everyone who has supported me on this artistic path. The exhibition, held at Galleria K, showcases recorded works developed through the Sidewalk project—an initiative that brought together local participants for eight performance‑art workshops and culminated in site‑specific performances across Vantaa. \n\nThe exhibition captures the energy of this collective journey: glimpses of the installation, moments from the performances, and the community that gathered around them, all reflecting how performance art can reshape our understanding of public and gallery spaces. It’s an honour to have My planetary boundary included among these works, and I’m excited to continue exploring how performance can speak to the tensions, limits, and possibilities within our shared environments.",
    category: 'art',
    image: "/images/planetary-boundary-2.JPG"
  }
];

const heroImages = [
  { url: "https://assets.zyrosite.com/A8526V7xnpu7WGDB/ods4-credit-aman-askarizad-106-of-112-m7VboqQJj3ILJaR5.jpg", caption: "One-Day Stand No.4 - Inner Complexity Performance" },
  { url: "https://iibawards-prod.s3.amazonaws.com/posts/main_images/000/000/676/page.png?1752210877", caption: "Information is Beautiful Awards - Volunteer Work" },
  { url: "/images/planetary-boundary.jpg", caption: "SideWalk 1st Ed. - My Planetary Boundary" },
  { url: "/images/inner-complexity.jpg", caption: "Inner Complexity Visuals" },
  { url: "/images/planetary-boundary-2.JPG", caption: "My Planetary Boundary Exhibition" }
];

const collaborators = [
  { name: "Vantaa Art Museum Artsi", logo: "https://images.squarespace-cdn.com/content/v1/56a0a95c25981d9326cb7e40/904d6b70-45b7-49b6-a0e6-5b01eb6583a3/ARTSI-logo-fi-RGB.png?format=500w" },
  { name: "Institutio Media", logo: "https://picsum.photos/seed/va/200/100?grayscale" },
  { name: "FM THEATRE POWER", logo: "https://cdn.art-mate.net/uploads/artmate/201609/thumbnail/20160910_130142_9mHJYdXGXV_p_300_0.jpg" },
  { name: "Yat Po Singers", logo: "https://tse1.mm.bing.net/th/id/OIP.ne0-eNrhE21VTicOtURQewHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" },
  { name: "Data Visualisation Society", logo: "https://images.squarespace-cdn.com/content/v1/5c6055b5fb18206d45d6b27e/1562601203642-ZHLHUGGYNWOIZHZK46U9/Data+Visualization+Society+logo+2019-05-transparent.png?format=1500w" },
  { name: "West Coast Cultural Lab", logo: "https://wcculturallab.ca/wp-content/uploads/2025/07/1-a86299.svg" },
  { name: "theotherside", logo: "https://assets.zyrosite.com/A8526V7xnpu7WGDB/b-w-red-background-A8548oE97yc4Zp1n.png" },
];

export default function ArtistView() {
  const [showAllOutreach, setShowAllOutreach] = useState(false);
  const [showAllArtworks, setShowAllArtworks] = useState(false);
  const [showAllBlogPosts, setShowAllBlogPosts] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Sync selectedPost with URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const postId = params.get('post');
    if (postId) {
      const post = blogPosts.find(p => p.id === postId);
      if (post) {
        setSelectedPost(post);
      }
    }

    const handlePopState = () => {
      const currentParams = new URLSearchParams(window.location.search);
      const currentPostId = currentParams.get('post');
      if (currentPostId) {
        const post = blogPosts.find(p => p.id === currentPostId);
        setSelectedPost(post || null);
      } else {
        setSelectedPost(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSelectPost = (post: BlogPost | null) => {
    const url = new URL(window.location.href);
    if (post) {
      url.searchParams.set('post', post.id);
      window.history.pushState({ ...window.history.state, post: post.id }, '', url.toString());
    } else {
      url.searchParams.delete('post');
      window.history.pushState({ ...window.history.state, post: null }, '', url.toString());
    }
    setSelectedPost(post);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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

  return (
    <div className="bg-black min-h-screen text-white artistic-gradient pb-20 px-[10%]">
      {/* Hero Section */}
      <section id="about" className="max-w-7xl mx-auto pt-24 pb-16 scroll-mt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="text-rose-500 font-sans text-sm tracking-[0.4em] uppercase mb-6 block">Data Art & Performance</span>
            <h1 className="text-5xl md:text-6xl font-serif italic mb-8 leading-tight">
              Where <span className="text-rose-500">Data</span> Meets the Stage.
            </h1>
            <p className="text-xl text-zinc-400 font-light leading-relaxed mb-10">
              Specialising in performance art, science editorial, and data art. 
              My work bridges the gap between complex environmental data and visceral 
              theatrical experiences.
            </p>
            <div className="mt-12 space-y-8">
              <div className="flex flex-wrap items-center gap-4">
                <a 
                  href="/cv-artist-fung.pdf" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-mono font-bold text-white bg-rose-500 hover:bg-rose-600 transition-all px-6 py-3 rounded-full shadow-lg shadow-rose-500/20"
                >
                  <Download size={14} /> VIEW CV
                </a>
                <a href="mailto:drfungpaklun@gmail.com" className="flex items-center gap-2 text-xs font-mono font-bold text-white bg-rose-500 hover:bg-rose-600 transition-all px-6 py-3 rounded-full shadow-lg shadow-rose-500/20">
                  <Mail size={14} /> SEND EMAIL
                </a>
              </div>
              
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-4 border-t border-zinc-800">
                <a href="https://www.art-mate.net/doc/8272" target="_blank" className="flex items-center gap-2 text-xs font-mono font-bold text-rose-500 hover:text-rose-400 transition-colors">
                  <ExternalLink size={14} /> ART MATE
                </a>
                <a href="https://www.instagram.com/fpl.hki/" target="_blank" className="flex items-center gap-2 text-xs font-mono font-bold text-rose-500 hover:text-rose-400 transition-colors">
                  <Instagram size={14} /> INSTAGRAM
                </a>
                <a href="https://www.linkedin.com/in/alan-pak-lun-fung/" target="_blank" className="flex items-center gap-2 text-xs font-mono font-bold text-rose-500 hover:text-rose-400 transition-colors">
                  <Linkedin size={14} /> LINKEDIN
                </a>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-1 space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-[5/3] rounded-3xl overflow-hidden shadow-2xl w-2/3 mx-auto lg:w-full"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={heroImages[currentImageIndex].url}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </motion.div>
            <motion.p 
              key={`caption-${currentImageIndex}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] font-mono text-zinc-500 text-center uppercase tracking-widest"
            >
              {heroImages[currentImageIndex].caption}
            </motion.p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto space-y-24">
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
                      src={`https://player.vimeo.com/video/${art.vimeoId}?autoplay=0&loop=0&byline=0&title=0&portrait=0`}
                      className="w-full h-full"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                    />
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
                  <div className="flex flex-col md:flex-row gap-8">
                    {item.thumbnail && (
                      <div className="w-full md:w-48 h-32 flex-shrink-0 rounded-2xl overflow-hidden border border-zinc-800">
                        <img 
                          src={item.thumbnail} 
                          alt={item.title} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex justify-between items-baseline mb-2">
                        <h3 className="text-xl font-medium text-white">{item.title}</h3>
                        <span className="text-xs font-mono text-zinc-500">{item.date}</span>
                      </div>
                      <p className="text-rose-500 text-sm mb-4 font-medium">{item.role}</p>
                      {Array.isArray(item.description) ? (
                        <div className="space-y-2">
                          {item.description.map((line, i) => (
                            <p key={i} className="text-zinc-400 font-light text-sm leading-relaxed">{line}</p>
                          ))}
                        </div>
                      ) : (
                        <p className="text-zinc-400 font-light text-sm leading-relaxed">{item.description}</p>
                      )}
                    </div>
                  </div>
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
        <section id="blog" className="py-12 border-t border-zinc-800 mt-12 scroll-mt-32">
          <div className="flex items-center gap-4 mb-12">
            <Newspaper className="text-rose-500" size={32} />
            <h2 className="text-4xl font-serif italic">Art Blog</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {displayedBlogPosts.map((post) => (
                <motion.div 
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-rose-500 transition-all group"
                >
                  <div className="aspect-[5/3] overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                  </div>
                  <div className="p-8">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[10px] font-mono text-rose-500 uppercase tracking-[0.2em]">{post.category}</span>
                      <span className="text-[10px] font-mono text-zinc-500">{post.date}</span>
                    </div>
                    <h3 className="text-2xl font-serif italic mb-4 group-hover:text-rose-500 transition-colors text-white">{post.title}</h3>
                    <p className="text-zinc-400 font-light text-sm leading-relaxed mb-6">{post.excerpt}</p>
                    <button 
                      onClick={() => handleSelectPost(post)}
                      className="text-xs font-mono font-bold text-white hover:text-rose-500 transition-colors flex items-center gap-2"
                    >
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
              className="w-full mt-12 py-4 border border-dashed border-zinc-800 rounded-2xl text-xs font-mono font-bold text-zinc-500 hover:text-rose-500 hover:border-rose-500 hover:bg-rose-500/5 transition-all flex items-center justify-center gap-2"
            >
              <Plus size={14} /> SEE MORE POSTS
            </button>
          )}
        </section>

      {/* Collaborators Section */}
        <section id="collaborators" className="py-12 border-t border-zinc-800 mt-12 scroll-mt-32 overflow-hidden">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif italic mb-4 text-white">Collaborators</h2>
            <p className="text-zinc-500 font-mono text-xs tracking-widest uppercase">Institutions & Partners</p>
          </div>
          
          <div className="relative flex overflow-x-hidden">
            <motion.div 
              className="flex gap-12 items-center whitespace-nowrap"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ 
                duration: 30, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            >
              {[...collaborators, ...collaborators].map((collab, idx) => (
                <div key={idx} className="flex flex-col items-center gap-4 w-40 shrink-0 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
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
        <section id="contact" className="py-12 bg-zinc-900/50 rounded-[3rem] border border-zinc-800 px-12 mt-12 scroll-mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-5xl font-serif italic mb-8 text-white">Get in Touch.</h2>
              <p className="text-xl text-zinc-400 font-light leading-relaxed mb-12">
                For exhibition inquiries, theater commissions, or creative collaborations, 
                please reach out via the form or my social channels.
              </p>
              <div className="space-y-6">
                <a href="mailto:drfungpaklun@gmail.com" className="flex items-center gap-4 text-white hover:text-rose-500 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
                    <Mail size={20} />
                  </div>
                  <span className="font-mono text-sm tracking-widest uppercase text-white">drfungpaklun@gmail.com</span>
                </a>
                <a href="https://calendar.app.google/wvWJo3iS6SNkDjJt9" target="_blank" className="flex items-center gap-4 text-white hover:text-rose-500 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
                    <Calendar size={20} />
                  </div>
                  <span className="font-mono text-sm tracking-widest text-white">BOOK A TIME</span>
                </a>
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
      <BlogOverlay 
        post={selectedPost} 
        onClose={() => handleSelectPost(null)} 
        view="artist"
      />
      {!selectedPost && <StatsWidget view="artist" />}
    </div>
  );
}
