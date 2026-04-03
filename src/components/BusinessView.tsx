import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Briefcase, Mail, Calendar, Linkedin, GraduationCap, Award, Newspaper, ExternalLink } from 'lucide-react';
import StatsWidget from './StatsWidget';
import BlogOverlay from './BlogOverlay';
import { BlogPost } from '../types';

const education = [
  {
    degree: "Master of Business Administration",
    institution: "Lapland University of Applied Science",
    year: "9/2023 − 12/2025",
    description: [
      "Specialized in Managing Sustainability and Systems Change.",
      <span>Master thesis: <a href="https://urn.fi/URN:NBN:fi:amk-2025121034323" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">Challenges and Insights from Pioneer Higher Education Institutions Utilising Carbon Roadmap.</a></span>
    ]
  }
];

const certifications = [
  {
    name: "Double Materiality Assessment Method",
    issuer: "Sustainability Standards Board",
    year: "2024",
    description: "Advanced certification in ESRS-aligned materiality analysis."
  },
  {
    name: "Corporate Sustainability Reporting Directive (CSRD)",
    issuer: "EU Compliance Institute",
    year: "2023",
    description: "Proficiency in ESRS disclosure requirements and reporting styles."
  }
];

const blogPosts: BlogPost[] = [];

export default function BusinessView() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Coming soon view
  return (
    <div className="bg-amber-50 min-h-screen flex items-center justify-center px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-5xl md:text-7xl font-sans font-bold text-slate-900 mb-6 tracking-tighter">
          Coming <span className="text-amber-600 italic">soon.</span>
        </h1>
        <p className="text-slate-500 font-mono text-sm tracking-widest uppercase">
          Business Portfolio Under Construction
        </p>
      </motion.div>
    </div>
  );
}

// Original content preserved below for later use
/*
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
      view: 'Business'
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to send message');

      setIsSubmitted(true);
      (e.target as HTMLFormElement).reset();
    } catch (error: any) {
      console.error('Contact error:', error);
      alert('Sorry, there was an error sending your message.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };

  return (
    <div className="bg-amber-50 min-h-screen pb-20 px-[10%]">
      // Hero / About Section
      <section id="about" className="max-w-7xl mx-auto pt-32 pb-24 scroll-mt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-amber-600 font-mono text-sm tracking-widest uppercase mb-6 block">Business & Sustainability Strategy</span>
          <h1 className="text-5xl md:text-6xl font-sans font-bold text-slate-900 mb-8 leading-tight">
            Driving <span className="text-amber-600">Sustainable Value</span> through ESG Integration.
          </h1>
          <p className="max-w-2xl text-xl text-slate-600 leading-relaxed mb-10">
            Bridging the gap between scientific insight and corporate sustainability. 
            I analyze ESG adjustments to help companies create long-term value aligned with global megatrends, 
            leveraging deep proficiency in ESRS reporting, disclosure style, and double materiality assessments.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-amber-100">
              <h3 className="text-lg font-bold mb-4">ESG Integration & Reporting</h3>
              <p className="text-sm text-slate-500">Expertise in ESRS disclosure and sustainability reporting frameworks to drive transparency.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-amber-100">
              <h3 className="text-lg font-bold mb-4">Double Materiality</h3>
              <p className="text-sm text-slate-500">Conducting rigorous due diligence analysis to identify critical impact and financial materiality.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-amber-100">
              <h3 className="text-lg font-bold mb-4">Megatrend Alignment</h3>
              <p className="text-sm text-slate-500">Strategic ESG adjustments to ensure business models remain resilient against future environmental shifts.</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-6">
            <a href="https://calendar.app.google/wvWJo3iS6SNkDjJt9" target="_blank" className="bg-amber-600 text-white px-8 py-4 rounded-full font-mono text-xs font-bold tracking-widest hover:bg-amber-700 transition-colors flex items-center gap-2">
              <Calendar size={14} /> SCHEDULE CONSULTATION
            </a>
            <a href="https://www.linkedin.com/in/alan-pak-lun-fung/" target="_blank" className="border border-amber-200 text-amber-900 px-8 py-4 rounded-full font-mono text-xs font-bold tracking-widest hover:bg-amber-100 transition-colors flex items-center gap-2">
              <Linkedin size={14} /> CONNECT ON LINKEDIN
            </a>
          </div>
        </motion.div>
      </section>

      // Education Section
      <section id="education" className="max-w-7xl mx-auto py-24 border-t border-amber-200 scroll-mt-32">
        <div className="flex items-center gap-3 mb-12">
          <GraduationCap className="text-amber-600" size={24} />
          <h2 className="text-2xl font-sans font-bold tracking-tight">Education</h2>
        </div>
        <div className="space-y-12">
          {education.map((edu, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 bg-white rounded-2xl border border-amber-100 shadow-sm"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-slate-900">{edu.degree}</h3>
                <span className="text-sm font-mono text-slate-400">{edu.year}</span>
              </div>
              <p className="text-amber-600 font-medium mb-4">{edu.institution}</p>
              <ul className="space-y-2">
                {edu.description.map((item, i) => (
                  <li key={i} className="text-slate-600 text-sm flex gap-2">
                    <span className="text-amber-300">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      // Certification Section
      <section id="certification" className="max-w-7xl mx-auto py-24 border-t border-amber-200 scroll-mt-32">
        <div className="flex items-center gap-3 mb-12">
          <Award className="text-amber-600" size={24} />
          <h2 className="text-2xl font-sans font-bold tracking-tight">Certifications</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certifications.map((cert, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 bg-white rounded-2xl border border-amber-100 shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-slate-900">{cert.name}</h3>
                <span className="text-xs font-mono text-slate-400">{cert.year}</span>
              </div>
              <p className="text-amber-600 text-sm font-medium mb-2">{cert.issuer}</p>
              <p className="text-slate-500 text-sm">{cert.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      // Blog Section
      <section id="blog" className="max-w-7xl mx-auto py-24 border-t border-amber-200 scroll-mt-32">
        <div className="flex items-center gap-3 mb-12">
          <Newspaper className="text-amber-600" size={24} />
          <h2 className="text-2xl font-sans font-bold tracking-tight">Sustainability Insights</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl overflow-hidden border border-amber-100 hover:shadow-lg transition-all group"
            >
              <div className="h-48 overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-mono text-amber-600 uppercase tracking-widest">{post.category}</span>
                  <span className="text-[10px] font-mono text-slate-400">{post.date}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">{post.title}</h3>
                <p className="text-sm text-slate-500 mb-4">{post.excerpt}</p>
                <button 
                  onClick={() => setSelectedPost(post)}
                  className="text-xs font-mono font-bold text-slate-900 hover:text-amber-600 transition-colors flex items-center gap-2"
                >
                  READ MORE <ExternalLink size={12} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      // Blog Overlay
      <BlogOverlay 
        post={selectedPost} 
        onClose={() => setSelectedPost(null)} 
        view="business"
      />

      // Contact Section
      <section id="contact" className="max-w-7xl mx-auto py-24 border-t border-amber-200 scroll-mt-32">
        <div className="bg-white rounded-[2rem] border border-amber-100 shadow-xl p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-sans font-bold tracking-tight text-slate-900 mb-6">Let's Connect.</h2>
              <p className="text-lg text-slate-600 mb-12">
                Looking for strategic guidance on ESG integration or sustainability reporting? 
                I'm available for consulting and collaborative projects.
              </p>
              <div className="space-y-6">
                <a href="mailto:drfungpaklun@gmail.com" className="flex items-center gap-4 text-slate-900 hover:text-amber-600 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center">
                    <Mail size={20} className="text-amber-600" />
                  </div>
                  <span className="font-mono text-sm tracking-widest uppercase">drfungpaklun@gmail.com</span>
                </a>
                <a href="https://calendar.app.google/wvWJo3iS6SNkDjJt9" target="_blank" className="flex items-center gap-4 text-slate-900 hover:text-amber-600 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center">
                    <Calendar size={20} className="text-amber-600" />
                  </div>
                  <span className="font-mono text-sm tracking-widest">BOOK A CONSULTATION</span>
                </a>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input required name="name" type="text" placeholder="NAME" className="w-full bg-amber-50/50 border border-amber-100 rounded-xl px-6 py-4 font-mono text-xs tracking-widest focus:outline-none focus:border-amber-600 transition-colors" />
                <input required name="email" type="email" placeholder="EMAIL" className="w-full bg-amber-50/50 border border-amber-100 rounded-xl px-6 py-4 font-mono text-xs tracking-widest focus:outline-none focus:border-amber-600 transition-colors" />
              </div>
              <textarea required name="message" placeholder="MESSAGE" rows={5} className="w-full bg-amber-50/50 border border-amber-100 rounded-xl px-6 py-4 font-mono text-xs tracking-widest focus:outline-none focus:border-amber-600 transition-colors" />
              <button 
                disabled={isSubmitting || isSubmitted}
                className="w-full bg-amber-600 text-white py-4 rounded-xl font-mono text-xs font-bold tracking-[0.2em] hover:bg-amber-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'SENDING...' : isSubmitted ? 'MESSAGE SENT!' : 'SEND MESSAGE'}
              </button>
            </form>
          </div>
        </div>
      </section>

      <StatsWidget view="business" />
    </div>
  );
}
*/
