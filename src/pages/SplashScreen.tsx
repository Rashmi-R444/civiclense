import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';

export default function SplashScreen() {
  const navigate = useNavigate();
  useEffect(() => {
    const t = setTimeout(() => navigate('/login'), 2500);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="mobile-container min-h-screen flex flex-col items-center justify-center bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="absolute rounded-full bg-primary-foreground" style={{
            width: 200 + i * 100, height: 200 + i * 100,
            top: `${20 + i * 10}%`, left: `${-10 + i * 15}%`, opacity: 0.1 - i * 0.01
          }} />
        ))}
      </div>
      <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6, type: 'spring' }} className="relative z-10 flex flex-col items-center">
        <div className="w-20 h-20 rounded-2xl bg-primary-foreground/20 flex items-center justify-center mb-6 backdrop-blur-sm">
          <Eye className="w-10 h-10 text-primary-foreground" />
        </div>
        <h1 className="text-3xl font-extrabold text-primary-foreground tracking-tight">OpenWorks</h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-primary-foreground/70 text-sm mt-2 font-medium">
          Track Public Projects Transparently
        </motion.p>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="absolute bottom-12 flex gap-1">
        {[0, 1, 2].map(i => (
          <motion.div key={i} className="w-2 h-2 rounded-full bg-primary-foreground/40" animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }} />
        ))}
      </motion.div>
    </div>
  );
}
