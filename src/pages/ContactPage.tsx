import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Github,
  Linkedin,
  Send,
  MapPin,
  Globe,
  MessageSquare,
  User,
  AtSign,
  CheckCircle2,
} from 'lucide-react';
import { GlassCard } from '@/components/common/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const teamMembers = [
  { name: 'Dr. Priya Sharma', role: 'Project Lead', focus: 'Climate Modeling', avatar: 'PS' },
  { name: 'Rajesh Kumar', role: 'AI/ML Engineer', focus: 'Prediction Models', avatar: 'RK' },
  { name: 'Ananya Singh', role: 'Full Stack Developer', focus: 'Digital Twin', avatar: 'AS' },
  { name: 'Vikram Patel', role: 'GIS Specialist', focus: 'Spatial Analysis', avatar: 'VP' },
];

export function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    toast({
      title: 'Message Sent',
      description: 'Thank you for contacting us. We will respond shortly.',
    });

    setFormData({ name: '', email: '', subject: '', message: '' });

    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="py-6 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Mail className="w-6 h-6 text-accent" />
          Contact Us
        </h1>
        <p className="text-sm text-muted-foreground">
          Get in touch with the BHARAT CLIMATEX team for collaboration, feedback, or inquiries.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2"
        >
          <GlassCard variant="accent" glow>
            <h2 className="text-lg font-semibold text-foreground mb-6">Send a Message</h2>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 rounded-full bg-climate-success/20 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-climate-success" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Message Sent!</h3>
                <p className="text-sm text-muted-foreground">
                  Thank you for reaching out. We'll get back to you soon.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground flex items-center gap-2">
                      <User className="w-3 h-3" />
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="bg-secondary border-cyan-500/20 focus:border-accent"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground flex items-center gap-2">
                      <AtSign className="w-3 h-3" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      className="bg-secondary border-cyan-500/20 focus:border-accent"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-foreground">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is this about?"
                    required
                    className="bg-secondary border-cyan-500/20 focus:border-accent"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-foreground flex items-center gap-2">
                    <MessageSquare className="w-3 h-3" />
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message..."
                    rows={5}
                    required
                    className="bg-secondary border-cyan-500/20 focus:border-accent resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-white"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            )}
          </GlassCard>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {/* Contact Info */}
          <GlassCard variant="dark">
            <h3 className="text-sm font-semibold text-foreground mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-accent mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a href="mailto:contact@bharat-climatex.in" className="text-sm text-foreground hover:text-accent">
                    contact@bharat-climatex.in
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-accent mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Pilot Region</p>
                  <p className="text-sm text-foreground">Rajasthan, India</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Globe className="w-4 h-4 text-accent mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Project</p>
                  <p className="text-sm text-foreground">ISRO Hackathon 2026</p>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Social Links */}
          <GlassCard variant="dark">
            <h3 className="text-sm font-semibold text-foreground mb-4">Connect</h3>
            <div className="flex gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-accent hover:bg-secondary/80 transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-accent hover:bg-secondary/80 transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@bharat-climatex.in"
                className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-accent hover:bg-secondary/80 transition-all"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </GlassCard>

          {/* Team */}
          <GlassCard>
            <h3 className="text-sm font-semibold text-foreground mb-4">Team</h3>
            <div className="space-y-3">
              {teamMembers.map((member) => (
                <div key={member.name} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-bold text-white">
                    {member.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
