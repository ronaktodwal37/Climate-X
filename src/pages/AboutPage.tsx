import { motion } from 'framer-motion';
import {
  Target,
  Lightbulb,
  MapPin,
  Rocket,
  Calendar,
  Users,
  Globe2,
  ShieldCheck,
  TrendingUp,
  Database,
} from 'lucide-react';
import { GlassCard } from '@/components/common/GlassCard';

const objectives = [
  {
    icon: Target,
    title: 'Predictive Analytics',
    description: 'Develop accurate rainfall and temperature prediction models using LSTM and XGBoost.',
  },
  {
    icon: ShieldCheck,
    title: 'Risk Assessment',
    description: 'Quantify heatwave, drought, and flood risks at district level.',
  },
  {
    icon: Globe2,
    title: 'Digital Twin',
    description: 'Create real-time digital representation of climate systems.',
  },
  {
    icon: Lightbulb,
    title: 'Actionable Insights',
    description: 'Generate AI-powered recommendations for climate adaptation.',
  },
];

const timeline = [
  { phase: 'Phase 1', period: 'Jan-Feb 2026', title: 'Data Integration', desc: 'IMD, INSAT, MOSDAC, Bhuvan integration' },
  { phase: 'Phase 2', period: 'Mar-Apr 2026', title: 'ML Model Development', desc: 'Rainfall and temperature prediction models' },
  { phase: 'Phase 3', period: 'May-Jun 2026', title: 'Digital Twin', desc: 'Real-time climate visualization engine' },
  { phase: 'Phase 4', period: 'Jul-Aug 2026', title: 'AI Advisor', desc: 'Gemini integration for recommendations' },
  { phase: 'Phase 5', period: 'Sep-Oct 2026', title: 'Pilot Testing', desc: 'Rajasthan district validation' },
  { phase: 'Phase 6', period: 'Nov-Dec 2026', title: 'Scale & Deploy', desc: 'National rollout and integration' },
];

const futureScope = [
  'Expansion to all Indian states and UTs',
  'Integration with real-time satellite feeds',
  'Mobile application for farmers',
  'APIs for third-party applications',
  'Integration with state disaster management systems',
  'Support for regional language interfaces',
];

export function AboutPage() {
  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            About <span className="text-gradient">BHARAT CLIMATEX</span>
          </h1>
          <p className="max-w-3xl mx-auto text-muted-foreground text-lg">
            An AI-powered Digital Twin platform for India's climate, developed for ISRO Hackathon 2026.
          </p>
        </motion.div>

        {/* Problem Statement */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <GlassCard variant="accent" glow className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-lg bg-climate-danger/20 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-climate-danger" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Problem Statement</h2>
                <p className="text-muted-foreground leading-relaxed">
                  India faces increasing climate extremes - heatwaves, droughts, and floods - causing
                  significant agricultural losses and human suffering. Current forecasting systems lack
                  the granularity and AI capabilities needed for district-level actionable insights.
                </p>
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-cyan-500/10">
              <div className="text-center py-4">
                <div className="text-3xl font-bold text-climate-danger mb-1">500+</div>
                <div className="text-xs text-muted-foreground">Heatwave Deaths/year</div>
              </div>
              <div className="text-center py-4">
                <div className="text-3xl font-bold text-climate-warning mb-1">30%</div>
                <div className="text-xs text-muted-foreground">Crop Losses in Drought</div>
              </div>
              <div className="text-center py-4">
                <div className="text-3xl font-bold text-primary mb-1">$10B+</div>
                <div className="text-xs text-muted-foreground">Annual Economic Impact</div>
              </div>
            </div>
          </GlassCard>
        </motion.section>

        {/* Objectives */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
            Project Objectives
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {objectives.map((obj, index) => (
              <motion.div
                key={obj.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="h-full text-center">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center mx-auto mb-4">
                    <obj.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{obj.title}</h3>
                  <p className="text-sm text-muted-foreground">{obj.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ISRO Alignment */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="grid lg:grid-cols-2 gap-8">
            <GlassCard variant="dark">
              <div className="flex items-center gap-3 mb-4">
                <Rocket className="w-6 h-6 text-accent" />
                <h3 className="text-xl font-bold text-foreground">ISRO Alignment</h3>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">+</span>
                  <span>Leverages ISRO satellite data (INSAT-3D/3DR, Resourcesat)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">+</span>
                  <span>Integrates with MOSDAC and Bhuvan platforms</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">+</span>
                  <span>Supports National Disaster Management goals</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">+</span>
                  <span>Contributes to climate resilience mission</span>
                </li>
              </ul>
            </GlassCard>

            <GlassCard variant="dark">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-6 h-6 text-climate-success" />
                <h3 className="text-xl font-bold text-foreground">National Impact</h3>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-climate-success mt-1">+</span>
                  <span>Enable proactive disaster preparedness</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-climate-success mt-1">+</span>
                  <span>Support farmer decision-making with climate insights</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-climate-success mt-1">+</span>
                  <span>Empower policymakers with data-driven tools</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-climate-success mt-1">+</span>
                  <span>Contribute to UN SDG 13: Climate Action</span>
                </li>
              </ul>
            </GlassCard>
          </div>
        </motion.section>

        {/* Pilot Region */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <GlassCard variant="accent" className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-6 h-6 text-climate-warning" />
              <h3 className="text-xl font-bold text-foreground">Pilot Region: Rajasthan</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Rajasthan was chosen as the pilot region due to its extreme climate conditions,
              spanning arid deserts to semi-arid zones, providing diverse test cases for our models.
            </p>
            <div className="grid sm:grid-cols-4 gap-4">
              {['Jaipur', 'Jodhpur', 'Udaipur', 'Bikaner'].map((city) => (
                <div key={city} className="text-center py-3 px-4 rounded-lg bg-secondary/30">
                  <div className="text-sm font-medium text-foreground">{city}</div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.section>

        {/* Timeline */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <Calendar className="w-6 h-6 text-accent" />
            <h2 className="text-2xl font-bold text-foreground">Development Timeline</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {timeline.map((item, index) => (
              <motion.div
                key={item.phase}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="relative overflow-hidden">
                  <div className="absolute top-0 right-0 px-2 py-1 bg-accent/20 text-accent text-xs rounded-bl-lg">
                    {item.phase}
                  </div>
                  <h4 className="text-sm text-muted-foreground mb-1">{item.period}</h4>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Future Scope */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <GlassCard variant="dark" className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Database className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-bold text-foreground">Future Scope</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {futureScope.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  {item}
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.section>
      </div>
    </div>
  );
}
