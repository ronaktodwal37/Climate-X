import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  Menu,
  X,
  LayoutDashboard,
  Layers,
  FlaskConical,
  AlertTriangle,
  Bot,
  Database,
  Info,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Digital Twin', path: '/digital-twin', icon: Layers },
  { name: 'Simulator', path: '/simulator', icon: FlaskConical },
  { name: 'Climate Risk', path: '/risk', icon: AlertTriangle },
  { name: 'AI Advisor', path: '/advisor', icon: Bot },
  { name: 'Data Sources', path: '/data', icon: Database },
  { name: 'About', path: '/about', icon: Info },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-climate-dark/95 backdrop-blur-xl border-b border-cyan-500/10 shadow-lg'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center"
            >
              <Globe className="w-6 h-6 text-white" />
            </motion.div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold tracking-tight text-foreground">
                BHARAT <span className="text-gradient">CLIMATEX</span>
              </h1>
              <p className="text-[10px] text-muted-foreground -mt-1 tracking-widest">
                PREDICT | SIMULATE | ADAPT
              </p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-sm font-bold text-gradient">CLIMATEX</h1>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navItems.slice(1).map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant="ghost"
                  className={cn(
                    'px-3 py-2 text-sm font-medium transition-all duration-200',
                    location.pathname === item.path
                      ? 'text-accent bg-accent/10 hover:bg-accent/20'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                  )}
                >
                  {item.icon && <item.icon className="w-4 h-4 mr-1.5" />}
                  {item.name}
                </Button>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link to="/dashboard" className="hidden sm:block">
              <Button
                size="sm"
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-white shadow-lg shadow-primary/20"
              >
                Launch Dashboard
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-foreground hover:bg-white/5"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-climate-dark/98 backdrop-blur-xl border-t border-cyan-500/10"
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant="ghost"
                    className={cn(
                      'w-full justify-start text-left px-4 py-3',
                      location.pathname === item.path
                        ? 'text-accent bg-accent/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                    )}
                  >
                    {item.icon && <item.icon className="w-4 h-4 mr-3" />}
                    {item.name}
                  </Button>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
