import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Globe, Github, Linkedin, Mail, ExternalLink, MapPin, Satellite } from 'lucide-react';

const footerLinks = {
  project: [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Digital Twin', path: '/digital-twin' },
    { name: 'Simulator', path: '/simulator' },
    { name: 'Climate Risk', path: '/risk' },
  ],
  resources: [
    { name: 'Data Sources', path: '/data' },
    { name: 'AI Advisor', path: '/advisor' },
    { name: 'Documentation', path: '#', external: true },
    { name: 'API Reference', path: '#', external: true },
  ],
};

export function Footer() {
  return (
    <footer className="bg-climate-dark/80 backdrop-blur-xl border-t border-cyan-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center"
              >
                <Globe className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h3 className="text-lg font-bold text-foreground">
                  BHARAT <span className="text-gradient">CLIMATEX</span>
                </h3>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              AI-Powered Digital Twin of India's Climate using National Data. Built for ISRO Hackathon 2026.
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3" />
              <span>Pilot Region: Rajasthan</span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Satellite className="w-4 h-4 text-accent" />
              Project
            </h4>
            <ul className="space-y-2">
              {footerLinks.project.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  {link.external ? (
                    <a
                      href={link.path}
                      className="text-sm text-muted-foreground hover:text-accent transition-colors flex items-center gap-1"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.name}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <Link
                      to={link.path}
                      className="text-sm text-muted-foreground hover:text-accent transition-colors"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Connect</h4>
            <div className="flex gap-3 mb-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-accent hover:bg-secondary/80 transition-all"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-accent hover:bg-secondary/80 transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:contact@bharat-climatex.in"
                className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-accent hover:bg-secondary/80 transition-all"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
            <p className="text-xs text-muted-foreground">
              An initiative for sustainable climate adaptation in India.
            </p>
          </div>
        </div>

        <div className="py-6 border-t border-cyan-500/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; 2026 BHARAT CLIMATEX. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>ISRO Hackathon 2026</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground" />
            <span>MIT License</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
