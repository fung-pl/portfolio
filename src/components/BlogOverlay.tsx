import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { BlogPost } from '../types';

interface BlogOverlayProps {
  post: BlogPost | null;
  onClose: () => void;
  view: 'scientist' | 'artist' | 'business';
}

export default function BlogOverlay({ post, onClose, view }: BlogOverlayProps) {
  if (!post) return null;

  const bgClass = 
    view === 'scientist' ? 'bg-white text-slate-900' : 
    view === 'business' ? 'bg-amber-50 text-slate-900' :
    'bg-black text-white';

  const accentClass = 
    view === 'scientist' ? 'text-emerald-600' : 
    view === 'business' ? 'text-amber-600' :
    'text-rose-500';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl ${bgClass}`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-black/5 transition-colors z-10"
          >
            <X size={24} />
          </button>

          <div className="p-8 md:p-12">
            <div className="flex items-center gap-4 mb-6">
              <span className={`text-xs font-mono font-bold tracking-widest uppercase ${accentClass}`}>
                {post.category}
              </span>
              <span className="text-xs font-mono opacity-50">{post.date}</span>
            </div>

            <h2 className={`text-4xl md:text-5xl font-sans font-bold tracking-tight mb-8 leading-tight`}>
              {post.title}
            </h2>

            <div className="aspect-[2/1] rounded-2xl overflow-hidden mb-10 shadow-lg">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="prose prose-lg max-w-none opacity-80 leading-relaxed font-light">
              {post.content.split('\n').map((paragraph, i) => (
                <p key={i} className="mb-6">{paragraph}</p>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
