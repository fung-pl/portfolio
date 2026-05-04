import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Education, WorkExperience, ResearchOutput, BlogPost } from '../types';
import { GraduationCap, Briefcase, FileText, ExternalLink, Mail, Linkedin, Github, Download, Calendar, BookOpen, Newspaper, Plus, X } from 'lucide-react';
import BlogOverlay from './BlogOverlay';
import StatsWidget from './StatsWidget';

const education: Education[] = [
  {
    degree: "Doctor of Philosophy (Atmospheric Science)",
    institution: "University of Helsinki",
    year: "3/2019 − 2/2022",
    description: [
      <span>Doctoral dissertation (Pass with distinction): <a href="http://hdl.handle.net/10138/338035" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">Derivation of Black Carbon Proxies in an Integrated Urban Air Quality Monitoring Network.</a></span>, 
      "Fields: Urban aerosols, air pollutant proxy, air quality."
      ]
  },
  {
    degree: "Master of Business Administration",
    institution: "Lapland University of Applied Science",
    year: "9/2023 − 12/2025",
    description: [
      "Specialised in Managing Sustainability and Systems Change.",
      <span>Master thesis: <a href="https://urn.fi/URN:NBN:fi:amk-2025121034323" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">Challenges and Insights from Pioneer Higher Education Institutions Utilising Carbon Roadmap.</a></span>
    ]
  },
  {
    degree: "Master of Science (Atmospheric Science)",
    institution: "University of Helsinki",
    year: "8/2015 − 8/2018",
    description: [
      <span>Master thesis: <a href="http://hdl.handle.net/10138/273491" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">Ozone deposition over a boreal lake by the eddy covariance method.</a></span>,
      "Exchange Study (Earth and Ecosystem Science) at Lund University (1/2016 − 6/2016) with Satellite Remote Sensing (Pass with distinction)."
    ]
  },
  {
    degree: "Bachelor of Science (Earth Sciences)",
    institution: "University of Hong Kong",
    year: "9/2008 − 6/2011",
    description: "Minor in Geography."
  }
];

const work: WorkExperience[] = [
  {
    role: "Air Quality Expert/Data Analyst",
    company: "MegaSense Oy",
    period: "4/2025 − Present",
    description: [
      "Data analytics of urban traffic and air quality modelling to support the implementation of green navigation application by using multiple sources of geospatial data",
      "Develped novel digital solutions to high spatio-temporal emission model for anthropogenic pollution sources"
    ]
  },
  {
    role: "Post-doctoral researcher",
    company: "University of Helsinki",
    period: "3/2022 − 12/2024",
    description: [
      "Conducted spatial analysis and modelling of urban traffic emission",
      "Investigated impacts of autonomous driving on traffic emission",
      "Two-month work exchange at Technical University of Munich (TUM) for improving emission inventory"
    ]
  },
  {
    role: "Doctoral researcher",
    company: "University of Helsinki",
    period: "3/2019 − 2/2022",
    description: [
      "Developed machine learning solutions to urban air quality problems",
      "Developed an improved Air Quality Index for Helsinki"
    ]
  },
  {
    role: "Research Assistant",
    company: "University of Helsinki",
    period: "5/2018 − 2/2019",
    description: [
      "Carried out low-cost sensor measurements",
      "Performed PM2.5 calibration and data analysis of multilevel measurements"
    ]
  },
  {
    role: "Assistant geologist",
    company: "Jacobs China Limited",
    period: "12/2011 − 1/2015",
    description: [
      "Geological assessment and site investigation",
      "One-year secondment to Gammon Construction Limited for rock logging"
    ]
  }
];

const research: ResearchOutput[] = [
  {
    title: "A robust black carbon prediction model derived from observational datasets in the Yangtze River Delta region, China",
    authors: "Duan, L., Fung, P. L., Fu, Q., Chen, J., Huo, J., Huang, K., Wang, G., Zaidan, M. A., Guo, Z., & Hussein, T.",
    journal: "Environmental Pollution",
    year: "2025",
    thumbnail: "https://ars.els-cdn.com/content/image/1-s2.0-S0269749125X00117-cov200h.gif",
    link: "https://doi.org/10.1016/j.envpol.2025.126361",
    summary: "This study explores the machine learning (ML) models, including IAP, LASSO, RF, and SNN, to develop a robust BC prediction model for the YRD, based on BC behaviour at the Dianshan Lake (DSL) site in Yangtsz River Delta, China."
  },
  {
    title: "A geospatial approach for dynamic on-road emission through open-access floating car data",
    authors: "Fung, P. L., Al-Jaghbeer, O., Chen, J., Ville-Veikko P., Vosough, S., Roncoli, C., & Järvi, L.",
    journal: "Environmental Research Letters",
    year: "2025",
    thumbnail: "https://content.cld.iop.org/journals/1748-9326/20/1/014033/revision4/erlad984df5_hr.jpg",
    link: "https://doi.org/10.1088/1748-9326/ad984d",
    summary: "This study develops a novel framework for estimating dynamic on-road emissions using open-access floating car data. By integrating high-resolution traffic information with emission models, it provides a more accurate representation of urban air quality. The findings highlight the potential of using real-time data for sustainable urban planning."
  },
  {
    title: "Constructing transferable and interpretable machine learning models for black carbon concentrations",
    authors: "Fung, P. L., Savadkoohi, M., Zaidan, M. A., Niemi, J. V., Timonen, H., Pandolfi, M., Alastuey, A, Querol, X., Hussein, T., & Petäjä, T.",
    journal: "Environment International",
    year: "2024",
    thumbnail: "https://ars.els-cdn.com/content/image/X01604120.jpg",
    link: "https://doi.org/10.1016/j.envint.2024.108449",
    summary: "The research explores the development of machine learning models for estimating black carbon concentrations that are both transferable and interpretable. By utilizing multi-pollutant datasets from various urban environments, the study achieves high predictive accuracy. It emphasizes the importance of model transparency in environmental monitoring."
  },
  {
    title: "Ozone Fluxes Over a Boreal Lake Exhibit Higher Deposition at Nights",
    authors: "Fung, P. L., Rannik, Ü., Mammarella, I., & Vesala T.",
    journal: "Geophysical Research Letters",
    year: "2023",
    thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=200&h=150",
    link: "https://doi.org/10.1029/2023GL104354",
    summary: "This paper investigates ozone deposition over a boreal lake, revealing significantly higher deposition rates during the night. The study utilizes eddy covariance measurements to quantify the exchange of ozone between the atmosphere and the water surface. These insights are critical for improving regional air quality models."
  },
  {
    title: "Exploring the discrepancy between top-down and bottom-up approaches of fine spatio-temporal vehicular CO2 emission in an urban road network",
    authors: "Fung, P. L., Al-Jaghbeer, O., Pirjola, L., Aaltonen, H., & Järvi, L.",
    journal: "Science of The Total Environment",
    year: "2023",
    thumbnail: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=200&h=150",
    link: "https://doi.org/10.1016/j.scitotenv.2023.165827",
    summary: "The study compares top-down and bottom-up approaches for estimating vehicular CO2 emissions in an urban road network. It identifies key discrepancies between the two methods and suggests ways to reconcile them for better emission inventories. The results support more effective climate mitigation strategies in cities."
  },
  {
    title: "Improving the current air quality index with new particulate indicators using a robust statistical approach",
    authors: "Fung, P. L., Sillanpää, S., Niemi, J. V., Kousa, A., Timonen, H., Zaidan, M. A., Saukko, E., Kulmala, M., Petäjä, T., & Hussein, T.",
    journal: "Science of The Total Environment",
    year: "2022",
    thumbnail: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&q=80&w=200&h=150",
    link: "https://doi.org/10.1016/j.scitotenv.2022.157099",
    summary: "This research proposes an enhanced air quality index that incorporates new particulate indicators using a robust statistical approach. By including a wider range of pollutants, the new index provides a more comprehensive assessment of health risks. It offers a valuable tool for public health communication."
  },
  {
    title: "Input-adaptive linear mixed-effects model for estimating alveolar lung-deposited surface area (LDSA) using multipollutant datasets",
    authors: "Fung, P. L., Zaidan, M. A., Niemi, J. V., Saukko, E., Timonen, H., Kousa, A., Kuula, J., Rönkkö, T., Karppinen, A., Tarkoma, S., Kulmala, M., Petäjä, T., & Hussein, T.",
    journal: "Atmospheric Chemistry and Physics",
    year: "2022",
    thumbnail: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=200&h=150",
    link: "https://doi.org/10.5194/acp-22-1861-2022",
    summary: "The paper presents an input-adaptive model for estimating lung-deposited surface area (LDSA) of particles using multi-pollutant datasets. The model adapts to different input configurations, making it versatile for various monitoring networks. It contributes to a better understanding of the health impacts of aerosol exposure."
  },
  {
    title: "Data imputation in in situ-measured particle size distributions by means of neural networks",
    authors: "Fung, P. L., Zaidan, M. A., Surakhi, O., Tarkoma, S., Petäjä, T., & Hussein, T.",
    journal: "Atmospheric Measurement Technique",
    year: "2021",
    thumbnail: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=200&h=150",
    link: "https://doi.org/10.5194/amt-14-5535-2021",
    summary: "This study utilizes neural networks for imputing missing data in in-situ measured particle size distributions. The proposed method effectively reconstructs missing values, ensuring the continuity of long-term environmental datasets. It demonstrates the power of deep learning in atmospheric data processing."
  },
  {
    title: "Evaluation of white-box versus black-box machine learning models in estimating ambient black carbon concentration",
    authors: "Fung, P. L., Zaidan, M. A., Timonen, H., Niemi, J. V., Kousa, A., Kuula, J., ... & Hussein, T.",
    journal: "Journal of Aerosol Science",
    year: "2021",
    thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=200&h=150",
    link: "https://doi.org/10.1016/j.jaerosci.2021.105694",
    summary: "The research evaluates the performance of white-box and black-box machine learning models in estimating ambient black carbon concentrations. It compares the accuracy and interpretability of different algorithms, providing guidance for selecting appropriate models. The study highlights the trade-offs between complexity and transparency."
  }
];

const blogPosts: BlogPost[] = [
  {
    id: '7',
    title: "Celebrating Dr. Omar Al‑Jaghbeer’s Successful PhD Defence",
    date: "April 2026",
    excerpt: "Warm congratulations to Dr. Omar Al‑Jaghbeer on his doctoral dissertation at the University of Helsinki.",
    content: "Warm congratulations to Dr. Omar Al‑Jaghbeer, who successfully defended his doctoral dissertation at the University of Helsinki. I had the pleasure of co‑supervising Omar over the past 3.5 years, during which he carried out impressive work on CO₂ traffic emission modelling across microscopic, mesoscopic, and macroscopic scales in a northern European city.\n\nOmar’s research brought several methodological advances. He developed a land‑use–based modelling framework using the Local Climate Zone (LCZ) classification to improve traffic emission estimates, and introduced a practical look‑up table concept for emission modelling. His dissertation also clarified why top‑down and bottom‑up estimates diverge at mesoscopic scales, showing the role of meteorological factors, while demonstrating that such factors do not significantly enhance existing microscopic models. It has been inspiring to see his ideas evolve from early concepts into a coherent and impactful body of work.\n\nThe defence, opened by Prof. Leena Järvi at 12:15, featured a thoughtful and engaging discussion between Omar and opponent Prof. Adam Kristensson from Lund University. The session concluded at 13:30, followed by a warm celebration with cakes and drinks.\n\nOmar is now continuing his academic path as a postdoctoral researcher at the University of Helsinki, focusing on aerosol measurement techniques. I’m excited to see where his curiosity and dedication take him next.",
    category: 'science',
    image: "/images/defence2026.JPG"
  },
  {
    id: '12',
    title: "Representing MegaSense at the Riyadh Construction Expo 2025",
    date: "September 2025",
    excerpt: "In September 2025, I had the opportunity to attend a major construction expo in Riyadh, Saudi Arabia, representing MegaSense as an air‑quality expert.",
    content: "In September 2025, I had the opportunity to attend a major construction expo in Riyadh, Saudi Arabia, representing MegaSense as an air‑quality expert. As a startup that has been developing low‑cost air‑quality sensors since 2019, this was an exciting moment to showcase how our technology can support cleaner, safer construction environments.\n\nOver the three‑day event, we introduced our latest sensor solutions designed specifically for real‑time air‑quality monitoring on construction sites. These compact, affordable devices help contractors track pollution levels as work unfolds—an essential step toward protecting workers and improving environmental compliance. We also highlighted our new fixed indoor sensor, developed in partnership with Loopshore, and shared how we are expanding our capabilities to measure a broader range of pollutants.\n\nAlongside the hardware, we demonstrated our growing suite of digital tools, including real‑time air‑quality modelling and excavation‑risk analysis. With laptops and tablets at the booth, visitors could explore our pilot camera‑based detection system, which identifies construction vehicles on site. The response was overwhelmingly positive—many attendees were excited by the potential of integrating sensor data, modelling, and computer vision into a unified monitoring ecosystem.\n\nThe expo was a clear success. We received encouraging feedback, sparked conversations with industry leaders, and opened doors to both business and scientific collaborations. It’s inspiring to see how much interest there is in practical, scalable air‑quality solutions, and we’re looking forward to building on the momentum.\n\nMore updates soon—this is just the beginning.",
    category: 'science',
    image: "https://megasense.com/_astro/assets.08fe3bf4_Z1JUpMt.webp"
  },
  {
    id: '11',
    title: "Attending EGU25 in Vienna as an Independent Researcher",
    date: "April 2025",
    excerpt: "This April, I had the privilege of attending the European Geosciences Union (EGU) General Assembly 2025 in Vienna—an experience that felt especially meaningful as an independent researcher.",
    content: "This April, I had the privilege of attending the European Geosciences Union (EGU) General Assembly 2025 in Vienna—an experience that felt especially meaningful as an independent researcher. Opportunities like this are rare when you’re between positions and without institutional funding, so I’m deeply grateful for the sponsorship that made it possible. The welcoming session set a warm tone for the week ahead, and it was energising to meet researchers from so many different fields, each bringing their own questions, methods, and stories.\n\nOne of the highlights of the week was presenting my poster, “Capturing and translating the dynamics of traffic emissions using a congestion‑based framework.” Working with colleagues from Helsinki, Munich, and Utrecht, we developed a geospatial approach that uses traffic counters, floating‑car data, road classifications, and meteorological information to model dynamic emissions of CO₂, CO, and NOₓ. Applied in Helsinki and Munich, the framework captured traffic density patterns well (R² = 0.78–0.88) and revealed where local emission inventories align—or diverge—from our estimates. We also tested how well calibration parameters transfer between cities, finding that some road classes behave similarly across regions while others differ. These early results point toward the potential, and the challenges, of scaling the framework to larger multi‑city networks.\n\nSharing this work at EGU25 reminded me why gatherings like this matter. They create space for exchange, curiosity, and connection—things that can be hard to access when working independently. I’m looking forward to seeing how the rest of the week unfolds, and I’m carrying a lot of gratitude with me: for the support that made this trip possible, for the conversations that sparked new ideas, and for the chance to stand among a global community of geoscientists once again.\n\nRead the abstract here: http://doi.org/10.5194/egusphere-egu25-1198",
    category: 'science',
    image: "/images/EGU2025.JPG"
  }
];

const heroImages = [
  { url: "/images/defence2026.jpg", caption: "Celebrating Dr. Omar Al‑Jaghbeer’s Successful PhD Defence" },
  { url: "https://megasense.com/_astro/assets.08fe3bf4_Z1JUpMt.webp", caption: "Representing MegaSense at the Riyadh Construction Expo 2025" },
  { url: "/images/EGU2025.jpg", caption: "Attending EGU25 in Vienna as an Independent Researcher" },
  { url: "https://megasense.com/_astro/staff.61802cc7_VElfp.webp", caption: "MegaSense Team" }
];

const collaborators = [
  { name: "University of Helsinki", logo: "https://mrvian.com/wp-content/uploads/2023/06/university-of-helsinki-LOGO.png" },
  { name: "Lund University", logo: "https://researchtweet.com/wp-content/uploads/2025/04/Lund-University.png" },
  { name: "University of Hong Kong", logo: "https://logonoid.com/images/university-of-hong-kong-logo.png" },
  { name: "Technical University of Munich", logo: "https://www.jeduka.com/storage/school_image/2/technical-university-of-munich.gif" },
  { name: "MegaSense Oy", logo: "https://megasense.com/_astro/Megasense_logo_lossless_white.1fcc34df.svg" },
  { name: "Jacobs China Limited", logo: "https://commons.erau.edu/assets/md5images/aaa14d0d72e875282b549f0f9510fab2.jpg" },
  { name: "Aalto University", logo: "https://aaltologo.fi/dl.php?type=png&file=logo-86628-1.png" },
  { name: "Finnish Meteorological Institute", logo: "https://www.clipartmax.com/png/middle/141-1412934_finnish-meteorological-institute.png" },
  { name: "Helsinki Environmental Services HSY", logo: "https://cdn.cookielaw.org/logos/d07a63b1-b324-490f-a6d1-c702846003d1/effbf2a3-a002-49ca-be49-799d83d67b94/7b1b496c-1518-465f-bf0a-807fc097261f/hsy-logo_600px.jpg" },
  { name: "Gammons Construction Limited", logo: "https://static.wikia.nocookie.net/logopedia/images/9/96/Gammon.jpg/revision/latest/scale-to-width-down/1200?cb=20191107063654" },
];

export default function ScientistView() {
  const [showAllPublications, setShowAllPublications] = useState(false);
  const [showAllEducation, setShowAllEducation] = useState(false);
  const [showAllExperience, setShowAllExperience] = useState(false);
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
      view: 'Scientist'
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
  const displayedPublications = showAllPublications ? research : research.slice(0, 3);
  const displayedEducation = showAllEducation ? education : education.slice(0, 3);
  const displayedExperience = showAllExperience ? work : work.slice(0, 3);
  const displayedBlogPosts = showAllBlogPosts ? blogPosts : blogPosts.slice(0, 2);

  return (
    <div className="bg-slate-50 min-h-screen scientific-grid pb-20 px-[10%]">
      {/* Hero Section */}
      <section id="about" className="max-w-7xl mx-auto pt-24 pb-16 scroll-mt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-3xl"
          >
            <span className="text-emerald-600 font-mono text-sm tracking-widest uppercase mb-4 block">Air Quality & Climate Research</span>
            <h1 className="text-6xl font-sans font-light tracking-tighter text-slate-900 mb-8 leading-tight">
              Modelling a <span className="font-medium text-emerald-600">Sustainable</span> Future.
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              Specialising in air quality modelling, climate change, sustainability, and traffic emissions. 
              My work focuses on developing machine learning solutions, low-cost sensing, and spatial analysis to quantify 
              environmental impacts in urban road networks.
            </p>
            <div className="mt-12 space-y-8">
              <div className="flex flex-wrap items-center gap-4">
                <a 
                  href="/cv-scientist-fung.pdf" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-mono font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all px-6 py-3 rounded-full shadow-lg shadow-emerald-500/20"
                >
                  <Download size={14} /> VIEW CV
                </a>
                <a href="mailto:drfungpaklun@gmail.com" className="flex items-center gap-2 text-xs font-mono font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all px-6 py-3 rounded-full shadow-lg shadow-emerald-500/20">
                  <Mail size={14} /> SEND EMAIL
                </a>
              </div>
              
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-4 border-t border-slate-200">
                <a href="https://orcid.org/0000-0003-3493-1383" target="_blank" className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-600 hover:text-emerald-800 transition-colors">
                  <BookOpen size={14} /> ORCID
                </a>
                <a href="https://scholar.google.com/citations?user=AGbCZG4AAAAJ&hl=en" target="_blank" className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-600 hover:text-emerald-800 transition-colors">
                  <BookOpen size={14} /> GOOGLE SCHOLAR
                </a>
                <a href="https://www.linkedin.com/in/alan-pak-lun-fung/" target="_blank" className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-600 hover:text-emerald-800 transition-colors">
                  <Linkedin size={14} /> LINKEDIN
                </a>
                <a href="https://github.com/fung-pl" target="_blank" className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-600 hover:text-emerald-800 transition-colors">
                  <Github size={14} /> GITHUB
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
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
            </motion.div>
            <motion.p 
              key={`caption-${currentImageIndex}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] font-mono text-slate-400 text-center uppercase tracking-widest"
            >
              {heroImages[currentImageIndex].caption}
            </motion.p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto space-y-24">
        {/* Education */}
        <section id="education" className="scroll-mt-32">
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap className="text-emerald-600" size={24} />
            <h2 className="text-2xl font-sans font-semibold tracking-tight">Education</h2>
          </div>
          <div className="space-y-12">
            {displayedEducation.map((edu, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="science-border border-emerald-200"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-slate-900">{edu.degree}</h3>
                  <span className="text-sm font-mono text-slate-400">{edu.year}</span>
                </div>
                <p className="text-emerald-600 font-medium mb-2">{edu.institution}</p>
                {Array.isArray(edu.description) ? (
                  <ul className="space-y-2 mt-2">
                    {edu.description.map((item, i) => (
                      <li key={i} className="text-slate-600 text-sm flex gap-2">
                        <span className="text-emerald-300">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-600 text-sm leading-relaxed">{edu.description}</p>
                )}
              </motion.div>
            ))}
          </div>
          {!showAllEducation && education.length > 3 && (
            <button 
              onClick={() => setShowAllEducation(true)}
              className="w-full mt-8 py-3 border border-dashed border-slate-300 rounded-xl text-xs font-mono font-bold text-slate-400 hover:text-emerald-600 hover:border-emerald-600 hover:bg-emerald-50 transition-all flex items-center justify-center gap-2"
            >
              <Plus size={14} /> SEE MORE EDUCATION
            </button>
          )}
        </section>

        {/* Work Experience */}
        <section id="experience" className="scroll-mt-32">
          <div className="flex items-center gap-3 mb-8">
            <Briefcase className="text-emerald-600" size={24} />
            <h2 className="text-2xl font-sans font-semibold tracking-tight">Professional Experience</h2>
          </div>
          <div className="space-y-12">
            {displayedExperience.map((job, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="science-border border-emerald-200"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-slate-900">{job.role}</h3>
                  <span className="text-sm font-mono text-slate-400">{job.period}</span>
                </div>
                <p className="text-emerald-600 font-medium mb-4">{job.company}</p>
                <ul className="space-y-2">
                  {job.description.map((item, i) => (
                    <li key={i} className="text-slate-600 text-sm flex gap-2">
                      <span className="text-emerald-300">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          {!showAllExperience && work.length > 3 && (
            <button 
              onClick={() => setShowAllExperience(true)}
              className="w-full mt-8 py-3 border border-dashed border-slate-300 rounded-xl text-xs font-mono font-bold text-slate-400 hover:text-emerald-600 hover:border-emerald-600 hover:bg-emerald-50 transition-all flex items-center justify-center gap-2"
            >
              <Plus size={14} /> SEE MORE EXPERIENCE
            </button>
          )}
        </section>

        {/* Research Outputs */}
        <section id="research" className="scroll-mt-32">
          <div className="flex items-center gap-3 mb-8">
            <FileText className="text-emerald-600" size={24} />
            <h2 className="text-2xl font-sans font-semibold tracking-tight">Selected Publications</h2>
          </div>
          <div className="space-y-8">
            <AnimatePresence mode="popLayout">
              {displayedPublications.map((pub, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-emerald-500/5 transition-all flex flex-col md:flex-row gap-6 p-6"
                >
                  <div className="w-full md:w-48 h-32 flex-shrink-0 overflow-hidden rounded-lg">
                    <img 
                      src={pub.thumbnail} 
                      alt={pub.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-mono tracking-widest text-emerald-600 uppercase bg-emerald-50 px-2 py-1 rounded">
                        {pub.journal}
                      </span>
                      <span className="text-xs font-mono text-slate-400">{pub.year}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors leading-tight">
                      {pub.title}
                    </h3>
                    <p className="text-xs text-slate-500 mb-3 italic">{pub.authors}</p>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3">
                      {pub.summary}
                    </p>
                    <a 
                      href={pub.link}
                      target="_blank"
                      className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-slate-400 hover:text-slate-900 transition-colors"
                    >
                      VIEW PUBLICATION <ExternalLink size={12} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {!showAllPublications && research.length > 3 && (
            <button 
              onClick={() => setShowAllPublications(true)}
              className="w-full mt-8 py-3 border border-dashed border-slate-300 rounded-xl text-xs font-mono font-bold text-slate-400 hover:text-emerald-600 hover:border-emerald-600 hover:bg-emerald-50 transition-all flex items-center justify-center gap-2"
            >
              <Plus size={14} /> SEE MORE PUBLICATIONS
            </button>
          )}
        </section>
      </div>

      {/* Blog Section */}
      <section id="blog" className="max-w-7xl mx-auto py-12 border-t border-slate-200 mt-12 scroll-mt-32">
        <div className="flex items-center gap-3 mb-12">
          <Newspaper className="text-emerald-600" size={24} />
          <h2 className="text-2xl font-sans font-semibold tracking-tight">Science Blog</h2>
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
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-lg transition-all group"
              >
                <div className="aspect-[5/3] overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-mono text-emerald-600 uppercase tracking-widest">{post.category}</span>
                    <span className="text-[10px] font-mono text-slate-400">{post.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">{post.title}</h3>
                  <p className="text-sm text-slate-500 mb-4">{post.excerpt}</p>
                  <button 
                    onClick={() => handleSelectPost(post)}
                    className="text-xs font-mono font-bold text-slate-900 hover:text-emerald-600 transition-colors flex items-center gap-2"
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
            className="w-full mt-12 py-4 border border-dashed border-slate-300 rounded-2xl text-xs font-mono font-bold text-slate-400 hover:text-emerald-600 hover:border-emerald-600 hover:bg-emerald-50 transition-all flex items-center justify-center gap-2"
          >
            <Plus size={14} /> SEE MORE POSTS
          </button>
        )}
      </section>

      {/* Blog Overlay */}
      <BlogOverlay 
        post={selectedPost} 
        onClose={() => handleSelectPost(null)} 
        view="scientist"
      />

      {/* Collaborators Section */}
      <section id="collaborators" className="max-w-7xl mx-auto py-12 border-t border-slate-200 mt-12 scroll-mt-32 overflow-hidden">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-sans font-bold tracking-tight text-slate-900 mb-4">Collaborators & Partners</h2>
          <p className="text-slate-500 font-mono text-xs tracking-widest uppercase">Institutions I've worked with</p>
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
              <div key={idx} className="flex flex-col items-center gap-4 w-40 shrink-0 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
                <img 
                  src={collab.logo} 
                  alt={collab.name} 
                  className="h-12 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
                <span className="text-[10px] font-mono text-slate-400 text-center">{collab.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <div className="max-w-7xl mx-auto">
        <section id="contact" className="py-12 bg-white rounded-3xl border border-slate-200 shadow-sm px-12 scroll-mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-sans font-bold tracking-tight text-slate-900 mb-6">Let's Collaborate.</h2>
              <p className="text-lg text-slate-600 mb-12">
                Interested in my research or looking to discuss potential collaborations in sustainability and climate modelling? 
                I'm always open to new ideas and partnerships.
              </p>
              <div className="space-y-6">
                <a href="mailto:drfungpaklun@gmail.com" className="flex items-center gap-4 text-slate-900 hover:text-emerald-600 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                    <Mail size={20} />
                  </div>
                  <span className="font-mono text-sm tracking-widest uppercase">drfungpaklun@gmail.com</span>
                </a>
                <a href="https://calendar.app.google/wvWJo3iS6SNkDjJt9" target="_blank" className="flex items-center gap-4 text-slate-900 hover:text-emerald-600 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                    <Calendar size={20} />
                  </div>
                  <span className="font-mono text-sm tracking-widest">BOOK A TIME</span>
                </a>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input required name="name" type="text" placeholder="NAME" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-6 py-4 font-mono text-xs tracking-widest focus:outline-none focus:border-emerald-600 transition-colors" />
                <input required name="email" type="email" placeholder="EMAIL" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-6 py-4 font-mono text-xs tracking-widest focus:outline-none focus:border-emerald-600 transition-colors" />
              </div>
              <textarea required name="message" placeholder="MESSAGE" rows={5} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-6 py-4 font-mono text-xs tracking-widest focus:outline-none focus:border-emerald-600 transition-colors" />
              <button 
                disabled={isSubmitting || isSubmitted}
                className="w-full bg-slate-900 text-white py-4 rounded-xl font-mono text-xs font-bold tracking-[0.2em] hover:bg-emerald-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'SENDING...' : isSubmitted ? 'MESSAGE SENT!' : 'SEND MESSAGE'}
              </button>
              {isSubmitted && (
                <p className="text-emerald-600 font-mono text-[10px] text-center uppercase tracking-widest mt-2">
                  Thank you! I'll get back to you soon.
                </p>
              )}
            </form>
          </div>
        </section>
      </div>
      {!selectedPost && <StatsWidget view="scientist" />}
    </div>
  );
}
