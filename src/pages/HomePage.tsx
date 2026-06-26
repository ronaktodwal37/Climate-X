import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Globe,
  LineChart,
  Shield,
  Sparkles,
  ThermometerSun,
  CloudRain,
  Zap,
  Layers,
  Bot,
  Satellite,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedCounter } from '@/components/common/AnimatedCounter';
import { GlassCard } from '@/components/common/GlassCard';

const features = [
  {
    icon: ThermometerSun,
    title: 'Rainfall Prediction',
    description: 'LSTM Neural Network for 1-day, 3-day, and 7-day rainfall forecasts using historical IMD data.',
    color: '#00C2FF',
  },
  {
    icon: LineChart,
    title: 'Temperature Forecasting',
    description: 'XGBoost Regressor predicting max/min temperatures with trend analysis.',
    color: '#1F6FEB',
  },
  {
    icon: Shield,
    title: 'Climate Risk Assessment',
    description: 'Random Forest model for heatwave, drought, flood risk and overall climate risk scoring.',
    color: '#00C853',
  },
  {
    icon: Layers,
    title: 'Digital Twin Engine',
    description: 'Real-time climate state visualization with historical and forecast dimensions.',
    color: '#FFB300',
  },
  {
    icon: Zap,
    title: 'Scenario Simulation',
    description: 'Physics-informed simulations to test "what-if" climate scenarios.',
    color: '#F44336',
  },
  {
    icon: Bot,
    title: 'AI Climate Advisor',
    description: 'Gemini-powered recommendations for climate adaptation strategies.',
    color: '#9C27B0',
  },
];

const stats = [
  { value: 8, suffix: '+', label: 'Districts Monitored' },
  { value: 100, suffix: '+', label: 'Years of Data' },
  { value: 95, suffix: '%', label: 'Prediction Accuracy' },
  { value: 25, suffix: 'km', label: 'Data Resolution' },
];

const impacts = [
  'Improved agricultural planning and crop selection',
  'Early warning systems for extreme weather events',
  'Water resource management optimization',
  'Urban heat mitigation strategies',
  'Drought preparedness and response planning',
  'Flood risk mapping and evacuation planning',
];

const techStack = [
  { name: 'React 18', desc: 'Modern UI Framework' },
  { name: 'TensorFlow', desc: 'ML Model Training' },
  { name: 'FastAPI', desc: 'Backend Services' },
  { name: 'PostgreSQL', desc: 'Data Persistence' },
  { name: 'Leaflet', desc: 'GIS Mapping' },
  { name: 'Gemini', desc: 'AI Recommendations' },
];

function FloatingOrb({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ y: 0, x: 0 }}
      animate={{
        y: [0, -20, 0],
        x: [0, 10, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
      className={className}
    />
  );
}

export function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 py-20">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <FloatingOrb
            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-3xl"
            delay={0}
          />
          <FloatingOrb
            className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-br from-accent/15 to-transparent blur-3xl"
            delay={1}
          />
          <FloatingOrb
            className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full bg-gradient-to-br from-climate-success/10 to-transparent blur-2xl"
            delay={2}
          />

          {/* Satellite Animation */}
          <motion.div
            className="absolute top-20 right-1/4 opacity-60"
            animate={{
              y: [0, -30, 0],
              rotate: [0, 5, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Satellite className="w-12 h-12 text-accent/50" />
          </motion.div>

          {/* Grid lines */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,194,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,194,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-cyan-500/20 text-sm text-accent mb-6">
              <Sparkles className="w-4 h-4" />
              <span>ISRO Hackathon 2026</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-4">
              <span className="text-foreground">BHARAT </span>
              <span className="text-gradient">CLIMATEX</span>
            </h1>

            <p className="text-xl sm:text-2xl text-muted-foreground mb-2">
              AI-Powered Digital Twin of India's Climate
            </p>

            <p className="text-sm text-accent tracking-[0.3em] uppercase mb-8">
              Predict | Simulate | Adapt
            </p>

            <p className="max-w-2xl mx-auto text-muted-foreground mb-10 leading-relaxed">
              Integrating satellite observations, IMD datasets, and AI-based climate prediction models
              to provide forecasting, digital twin visualization, and AI-generated adaptation recommendations.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/dashboard">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-white shadow-xl shadow-primary/20 px-8"
                >
                  <Globe className="w-5 h-5 mr-2" />
                  Launch Dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-cyan-500/30 text-foreground hover:bg-primary/10 px-8"
                >
                  Explore Features
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {stats.map((stat, index) => (
              <GlassCard key={index} variant="dark" className="py-6" hover={false}>
                <div className="text-3xl font-bold text-accent mb-1">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </GlassCard>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              AI/ML <span className="text-gradient">Pipeline</span>
            </h2>
            <p className="max-w-2xl mx-auto text-muted-foreground">
              Advanced machine learning models trained on decades of climate data
              to predict, simulate, and advise on climate adaptation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard variant="default" className="h-full">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${feature.color}20` }}
                  >
                    <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              How It <span className="text-gradient">Works</span>
            </h2>
            <p className="max-w-2xl mx-auto text-muted-foreground">
              From satellite data to actionable insights in four seamless steps.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Data Collection', desc: 'IMD, INSAT, MOSDAC, Bhuvan integration' },
              { step: '02', title: 'AI Processing', desc: 'LSTM, XGBoost, Random Forest models' },
              { step: '03', title: 'Digital Twin', desc: 'Real-time climate state visualization' },
              { step: '04', title: 'AI Advisor', desc: 'Gemini-powered recommendations' },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                <GlassCard variant="accent" className="text-center py-8">
                  <div className="text-4xl font-bold text-accent/30 mb-2">{item.step}</div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </GlassCard>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-accent/30">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                National <span className="text-gradient">Impact</span>
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                BHARAT CLIMATEX supports India's commitment to climate resilience and
                sustainable development goals. Our platform enables data-driven decision
                making for policymakers, farmers, and disaster management authorities.
              </p>
              <ul className="space-y-3">
                {impacts.map((impact, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 text-sm text-muted-foreground"
                  >
                    <CheckCircle2 className="w-5 h-5 text-climate-success flex-shrink-0 mt-0.5" />
                    {impact}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {techStack.map((tech) => (
                <GlassCard key={tech.name} variant="dark" className="text-center">
                  <div className="text-lg font-semibold text-accent mb-1">{tech.name}</div>
                  <div className="text-xs text-muted-foreground">{tech.desc}</div>
                </GlassCard>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <GlassCard variant="accent" glow className="text-center py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <CloudRain className="w-12 h-12 text-accent mx-auto mb-6" />
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Ready to Explore Climate Intelligence?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Dive into our interactive dashboard and discover how AI can help
                predict, simulate, and adapt to India's changing climate.
              </p>
              <Link to="/dashboard">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-white shadow-xl shadow-primary/20"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Launch Dashboard
                </Button>
              </Link>
            </motion.div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
