import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Education, WorkExperience, ResearchOutput, BlogPost } from '../types';
import { GraduationCap, Briefcase, FileText, ExternalLink, Mail, Linkedin, Twitter, Github, Download, Calendar, BookOpen, Newspaper, Plus, X } from 'lucide-react';
import BlogOverlay from './BlogOverlay';

const education: Education[] = [
  {
    degree: "Doctoral of Science (Atmospheric Science)",
    institution: "University of Helsinki",
    year: "3/2019 − 2/2022",
    description: "Doctoral dissertation (Pass with distinction): Derivation of Black Carbon Proxies in an Integrated Urban Air Quality Monitoring Network. Fields: Urban aerosols, air pollutant proxy, air quality."
  },
  {
    degree: "Master of Business Administration",
    institution: "Lapland University of Applied Science",
    year: "9/2023 − 12/2025",
    description: "Specialized in Managing Sustainability and Systems Change. Master thesis: Challenges and Insights from Pioneer Higher Education Institutions Utilising Carbon Roadmap."
  },
  {
    degree: "Master of Science (Atmospheric Science)",
    institution: "University of Helsinki",
    year: "8/2015 − 8/2018",
    description: "Master thesis: Ozone deposition over a boreal lake by the eddy covariance method. Including Exchange Study (Earth and Ecosystem Science) at Lund University (1/2016 − 6/2016) with Satellite Remote Sensing (Pass with distinction)."
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
    period: "1/2023 − Present",
    description: [
      "Data analytics of urban traffic and air quality modeling to support the implementation of green navigation application by using multiple sources of geospatial data"
    ]
  },
  {
    role: "Post-doctoral researcher",
    company: "University of Helsinki",
    period: "3/2022 − 12/2024",
    description: [
      "Conducted spatial analysis and modelling of urban traffic emission",
      "2-month work exchange at Technical University of Munich (TUM) during the post-doctoral period"
    ]
  },
  {
    role: "Doctoral researcher",
    company: "University of Helsinki",
    period: "3/2019 − 2/2022",
    description: [
      "Developed machine learning solutions to urban air quality problems"
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
      "Geological assessment and site investigation (one year secondment in 2013 to Gammon Construction Limited)"
    ]
  }
];

const research: ResearchOutput[] = [
  {
    title: "A geospatial approach for dynamic on-road emission through open-access floating car data",
    authors: "Fung, P. L., Al-Jaghbeer, O., Chen, J., Ville-Veikko P., Vosough, S., Roncoli, C., & Järvi, L.",
    journal: "Environmental Research Letters",
    year: "2025",
    thumbnail: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=200&h=150",
    link: "https://doi.org/10.1088/1748-9326/ad9f1a",
    summary: "This study develops a novel framework for estimating dynamic on-road emissions using open-access floating car data. By integrating high-resolution traffic information with emission models, it provides a more accurate representation of urban air quality. The findings highlight the potential of using real-time data for sustainable urban planning."
  },
  {
    title: "Constructing transferable and interpretable machine learning models for black carbon concentrations",
    authors: "Fung, P. L., Savadkoohi, M., Zaidan, M. A., Niemi, J. V., Timonen, H., Pandolfi, M., Alastuey, A, Querol, X., Hussein, T., & Petäjä, T.",
    journal: "Environment International",
    year: "2024",
    thumbnail: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=200&h=150",
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
    id: '1',
    title: "The Intersection of Data and Aesthetics",
    date: "March 2024",
    excerpt: "How visualizing air quality data can change public perception of climate change.",
    content: "In the realm of environmental science, data is often perceived as cold, hard, and purely objective. However, when we translate these complex datasets into visual narratives, we bridge the gap between scientific understanding and public engagement. \n\nAir quality data, specifically, carries a weight that numbers alone cannot convey. By using aesthetics to represent pollutant concentrations, we can create an emotional resonance that motivates action. This blog post explores the techniques used to transform nitrogen dioxide and black carbon measurements into compelling visual art that speaks to the urgency of our planetary boundaries.",
    category: 'both',
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800&h=400"
  },
  {
    id: '2',
    title: "Modelling Traffic in the Post-Pandemic Era",
    date: "January 2024",
    excerpt: "New trends in urban mobility and their impact on nitrogen dioxide levels.",
    content: "The COVID-19 pandemic served as a global experiment in urban mobility. As cities ground to a halt, we witnessed unprecedented drops in air pollution. However, as we transition into a post-pandemic world, traffic patterns have shifted in unexpected ways. \n\nOur recent modelling work in Helsinki reveals that while overall volume may have stabilized, the temporal distribution of traffic has changed. This has significant implications for nitrogen dioxide (NO2) hotspots. By utilizing open-access floating car data, we can now model these emissions with higher spatio-temporal resolution than ever before, allowing for more targeted urban planning and public health interventions.",
    category: 'science',
    image: "https://images.unsplash.com/photo-1545143333-11ad2b04f147?auto=format&fit=crop&q=80&w=800&h=400"
  },
  {
    id: '4',
    title: "Machine Learning for Urban Air Quality",
    date: "November 2023",
    excerpt: "Developing interpretable models for black carbon concentration estimation.",
    content: "Machine learning has revolutionized how we approach environmental monitoring. However, the 'black box' nature of many algorithms can be a hurdle for policy-making. Our research focuses on developing 'white-box' or interpretable models that not only predict concentrations but also explain the underlying drivers. \n\nBy integrating multi-pollutant datasets from integrated monitoring networks, we've developed proxies for black carbon that are both accurate and transferable across different urban environments. This transparency is crucial for building trust in data-driven environmental solutions.",
    category: 'science',
    image: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&q=80&w=800&h=400"
  }
];

const collaborators = [
  { name: "University of Helsinki", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/University_of_Helsinki_logo.svg/1200px-University_of_Helsinki_logo.svg.png" },
  { name: "Lund University", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/43/Lund_University_logo.svg/1200px-Lund_University_logo.svg.png" },
  { name: "University of Hong Kong", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/3/34/University_of_Hong_Kong_logo.svg/1200px-University_of_Hong_Kong_logo.svg.png" },
  { name: "Technical University of Munich", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/TU_M%C3%BCnchen_Logo.svg/1200px-TU_M%C3%BCnchen_Logo.svg.png" },
  { name: "MegaSense Oy", logo: "https://megasense.fi/wp-content/uploads/2020/06/megasense_logo_web.png" },
  { name: "Jacobs", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Jacobs_Engineering_Group_logo.svg/1200px-Jacobs_Engineering_Group_logo.svg.png" },
  { name: "Aalto University", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Aalto_University_logo.svg/1200px-Aalto_University_logo.svg.png" },
  { name: "Finnish Meteorological Institute", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Ilmatieteen_laitos_logo.svg/1200px-Ilmatieteen_laitos_logo.svg.png" },
  { name: "City of Helsinki", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Helsingin_kaupunki_logo.svg/1200px-Helsingin_kaupunki_logo.svg.png" },
  { name: "Vaisala", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Vaisala_logo.svg/1200px-Vaisala_logo.svg.png" },
];

export default function ScientistView() {
  const [showAllPublications, setShowAllPublications] = useState(false);
  const [showAllEducation, setShowAllEducation] = useState(false);
  const [showAllExperience, setShowAllExperience] = useState(false);
  const [showAllBlogPosts, setShowAllBlogPosts] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    
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
        throw new Error("The server returned an unexpected response. This usually happens if the backend is not available (e.g., on static hosting like GitHub Pages).");
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

  const heroImages = [
    "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800&h=400",
    "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800&h=400",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800&h=400",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800&h=400",
    "https://images.unsplash.com/photo-1545143333-11ad2b04f147?auto=format&fit=crop&q=80&w=800&h=400"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen scientific-grid pb-20 px-[10%]">
      {/* Hero Section */}
      <section id="about" className="max-w-7xl mx-auto pt-24 pb-16 scroll-mt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-emerald-600 font-mono text-sm tracking-widest uppercase mb-4 block">Air Quality & Climate Research</span>
            <h1 className="text-6xl font-sans font-light tracking-tighter text-slate-900 mb-8 leading-tight">
              Modelling a <span className="font-medium text-emerald-600">Sustainable</span> Future.
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              Specializing in air quality modelling, climate change, sustainability, and traffic emissions. 
              My work focuses on developing machine learning solutions and spatial analysis to quantify 
              environmental impacts in urban road networks.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#contact" className="bg-slate-900 text-white px-8 py-3 rounded-full font-mono text-xs font-bold tracking-widest hover:bg-emerald-600 transition-colors flex items-center gap-2">
                <Calendar size={14} /> BOOK A MEETING
              </a>
              <a href="/cv-scientist-fung.pdf" download className="border border-slate-200 text-slate-900 px-8 py-3 rounded-full font-mono text-xs font-bold tracking-widest hover:bg-slate-100 transition-colors flex items-center gap-2">
                <Download size={14} /> DOWNLOAD CV
              </a>
            </div>
            
            <div className="mt-12 flex items-center gap-6">
              <a href="https://orcid.org/0000-0003-3493-1383" target="_blank" className="flex items-center gap-2 text-xs font-mono font-bold text-slate-400 hover:text-emerald-600 transition-colors">
                <BookOpen size={14} /> ORCID
              </a>
              <a href="#" target="_blank" className="flex items-center gap-2 text-xs font-mono font-bold text-slate-400 hover:text-emerald-600 transition-colors">
                <BookOpen size={14} /> GOOGLE SCHOLAR
              </a>
              <a href="#" target="_blank" className="flex items-center gap-2 text-xs font-mono font-bold text-slate-400 hover:text-emerald-600 transition-colors">
                <Linkedin size={14} /> LINKEDIN
              </a>
              <a href="#" target="_blank" className="flex items-center gap-2 text-xs font-mono font-bold text-slate-400 hover:text-emerald-600 transition-colors">
                <Github size={14} /> GITHUB
              </a>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
            <div className="aspect-[2/1] rounded-2xl overflow-hidden border-8 border-white shadow-2xl relative">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={currentImageIndex}
                  src={heroImages[currentImageIndex]} 
                  alt="Environmental Research" 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="w-full h-full object-cover absolute inset-0"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
              <p className="text-[10px] font-mono tracking-widest text-emerald-600 uppercase mb-3">Research Area</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-bold text-slate-900">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Air Quality & Traffic Emissions
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Machine Learning Solutions
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Sustainability & Systems Change
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Urban Geospatial Analysis
                </li>
              </ul>
            </div>
          </motion.div>
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
                <p className="text-slate-600 text-sm leading-relaxed">{edu.description}</p>
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
      <section id="blog" className="max-w-7xl mx-auto py-32 border-t border-slate-200 mt-20 scroll-mt-32">
        <div className="flex items-center gap-3 mb-12">
          <Newspaper className="text-emerald-600" size={24} />
          <h2 className="text-2xl font-sans font-semibold tracking-tight">Science & Art Blog</h2>
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
              <div className="h-48 overflow-hidden">
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
                  onClick={() => setSelectedPost(post)}
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
        onClose={() => setSelectedPost(null)} 
        view="scientist"
      />

      {/* Collaborators Section */}
      <section id="collaborators" className="max-w-7xl mx-auto py-32 border-t border-slate-200 mt-20 scroll-mt-32 overflow-hidden">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-sans font-bold tracking-tight text-slate-900 mb-4">Collaborators & Partners</h2>
          <p className="text-slate-500 font-mono text-xs tracking-widest uppercase">Institutions I've worked with</p>
        </div>
        
        <div className="relative flex overflow-x-hidden">
          <motion.div 
            className="flex gap-24 items-center whitespace-nowrap"
            animate={{ x: [0, -1920] }}
            transition={{ 
              duration: 30, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            {[...collaborators, ...collaborators].map((collab, idx) => (
              <div key={idx} className="flex flex-col items-center gap-4 w-48 shrink-0 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
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
        <section id="contact" className="py-32 bg-white rounded-3xl border border-slate-200 shadow-sm px-12 scroll-mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-sans font-bold tracking-tight text-slate-900 mb-6">Let's Collaborate.</h2>
              <p className="text-lg text-slate-600 mb-12">
                Interested in my research or looking to discuss potential collaborations in sustainability and climate modelling? 
                I'm always open to new ideas and partnerships.
              </p>
              <div className="space-y-6">
                <a href="mailto:pleakley9@gmail.com" className="flex items-center gap-4 text-slate-900 hover:text-emerald-600 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                    <Mail size={20} />
                  </div>
                  <span className="font-mono text-sm tracking-widest uppercase">pleakley9@gmail.com</span>
                </a>
                <a href="https://calendar.google.com" target="_blank" className="flex items-center gap-4 text-slate-900 hover:text-emerald-600 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                    <Calendar size={20} />
                  </div>
                  <span className="font-mono text-sm tracking-widest">BOOK A TIME (GOOGLE CALENDAR)</span>
                </a>
                <div className="flex gap-4">
                  {[Linkedin, Twitter, Github].map((Icon, i) => (
                    <a key={i} href="#" className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center hover:bg-emerald-100 hover:text-emerald-600 transition-all">
                      <Icon size={20} />
                    </a>
                  ))}
                </div>
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
    </div>
  );
}
