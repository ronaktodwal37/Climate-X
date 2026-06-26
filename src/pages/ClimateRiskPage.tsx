import { motion } from 'framer-motion';
import {
  AlertTriangle,
  Flame,
  Droplet,
  Tornado,
  TrendingUp,
  TrendingDown,
  Minus,
  Shield,
} from 'lucide-react';
import { GlassCard } from '@/components/common/GlassCard';
import { RiskPieChart, ClimateBarChart } from '@/components/charts/ClimateChart';
import { riskDistribution, districtRiskRanking } from '@/data/mockData';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const riskCategories = [
  {
    type: 'heat',
    title: 'Heat Risk',
    icon: Flame,
    color: '#F44336',
    description: 'Probability of extreme heat events and heatwaves',
    metrics: ['Heat Index', 'Wet Bulb Temperature', 'Surface Temperature'],
  },
  {
    type: 'flood',
    title: 'Flood Risk',
    icon: Droplet,
    color: '#1F6FEB',
    description: 'Risk of flash floods and river flooding',
    metrics: ['Rainfall Intensity', 'River Level', 'Ground Saturation'],
  },
  {
    type: 'drought',
    title: 'Drought Risk',
    icon: Shield,
    color: '#FFB300',
    description: 'Probability of extended dry periods and water scarcity',
    metrics: ['Soil Moisture', 'Groundwater Level', 'Reservoir Status'],
  },
  {
    type: 'cyclone',
    title: 'Cyclone Risk',
    icon: Tornado,
    color: '#9C27B0',
    description: 'Risk of cyclonic storms and severe weather',
    metrics: ['Wind Speed', 'Atmospheric Pressure', 'Storm Track'],
  },
];

const getRiskLevel = (value: number): { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline'; className: string } => {
  if (value >= 70) return { label: 'Extreme', variant: 'destructive', className: 'bg-climate-danger text-white' };
  if (value >= 50) return { label: 'High', variant: 'default', className: 'bg-climate-warning text-climate-dark' };
  if (value >= 30) return { label: 'Moderate', variant: 'secondary', className: 'bg-primary text-white' };
  return { label: 'Low', variant: 'outline', className: 'bg-climate-success text-white' };
};

export function ClimateRiskPage() {
  return (
    <div className="py-6 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-accent" />
          Climate Risk Assessment
        </h1>
        <p className="text-sm text-muted-foreground">
          Random Forest-based risk evaluation for heat, drought, flood, and cyclone hazards
        </p>
      </motion.div>

      {/* Risk Category Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {riskCategories.map((category, index) => (
          <motion.div
            key={category.type}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard variant="accent" className="h-full">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${category.color}20` }}
                >
                  <category.icon className="w-5 h-5" style={{ color: category.color }} />
                </div>
                <h3 className="text-sm font-semibold text-foreground">{category.title}</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-3">{category.description}</p>
              <div className="border-t border-cyan-500/10 pt-3">
                <p className="text-xs text-muted-foreground mb-1">Key Metrics:</p>
                <div className="flex flex-wrap gap-1">
                  {category.metrics.map((metric) => (
                    <span key={metric} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                      {metric}
                    </span>
                  ))}
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <GlassCard>
            <h3 className="text-sm font-semibold text-foreground mb-4">Risk Distribution</h3>
            <RiskPieChart data={riskDistribution} height={280} />
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <GlassCard>
            <h3 className="text-sm font-semibold text-foreground mb-4">Risk Score by Category</h3>
            <ClimateBarChart
              data={riskDistribution.map((r) => ({ name: r.name.replace(' Risk', ''), value: r.value }))}
              title=""
              height={280}
            />
          </GlassCard>
        </motion.div>
      </div>

      {/* District Ranking Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <GlassCard>
          <h3 className="text-lg font-semibold text-foreground mb-4">District Risk Ranking</h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-cyan-500/10 hover:bg-transparent">
                  <TableHead className="text-muted-foreground">District</TableHead>
                  <TableHead className="text-muted-foreground text-right">Heat Risk</TableHead>
                  <TableHead className="text-muted-foreground text-right">Drought Risk</TableHead>
                  <TableHead className="text-muted-foreground text-right">Flood Risk</TableHead>
                  <TableHead className="text-muted-foreground text-right">Overall</TableHead>
                  <TableHead className="text-muted-foreground text-right">Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {districtRiskRanking.map((district) => {
                  const heatLevel = getRiskLevel(district.heatRisk);
                  const droughtLevel = getRiskLevel(district.droughtRisk);
                  const floodLevel = getRiskLevel(district.floodRisk);
                  const overallLevel = getRiskLevel(district.overall);

                  return (
                    <TableRow
                      key={district.district}
                      className="border-cyan-500/10 hover:bg-secondary/20 transition-colors"
                    >
                      <TableCell className="font-medium text-foreground">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${overallLevel.className}`} />
                          {district.district}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${heatLevel.className}`}>
                          {district.heatRisk}%
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${droughtLevel.className}`}>
                          {district.droughtRisk}%
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${floodLevel.className}`}>
                          {district.floodRisk}%
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${overallLevel.className}`}>
                          {district.overall}%
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          {district.trend === 'increasing' && (
                            <TrendingUp className="w-4 h-4 text-climate-danger" />
                          )}
                          {district.trend === 'decreasing' && (
                            <TrendingDown className="w-4 h-4 text-climate-success" />
                          )}
                          {district.trend === 'stable' && (
                            <Minus className="w-4 h-4 text-muted-foreground" />
                          )}
                          <span className="text-xs capitalize text-muted-foreground">{district.trend}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </GlassCard>
      </motion.div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6"
      >
        <GlassCard variant="dark">
          <h4 className="text-sm font-semibold text-foreground mb-3">Risk Level Legend</h4>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-climate-success" />
              <span className="text-xs text-muted-foreground">Low (0-29%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-xs text-muted-foreground">Moderate (30-49%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-climate-warning" />
              <span className="text-xs text-muted-foreground">High (50-69%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-climate-danger" />
              <span className="text-xs text-muted-foreground">Extreme (70%+)</span>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <GlassCard variant="dark">
          <h4 className="text-sm font-semibold text-foreground mb-2">Model: Random Forest</h4>
          <p className="text-xs text-muted-foreground">
            Ensemble learning method trained on 50+ years of climate data for risk classification.
          </p>
        </GlassCard>
        <GlassCard variant="dark">
          <h4 className="text-sm font-semibold text-foreground mb-2">Update Frequency</h4>
          <p className="text-xs text-muted-foreground">
            Risk scores recalculated daily based on latest satellite and ground observations.
          </p>
        </GlassCard>
        <GlassCard variant="dark">
          <h4 className="text-sm font-semibold text-foreground mb-2">Accuracy Rate</h4>
          <p className="text-xs text-muted-foreground">
            92% accuracy in predicting extreme climate events 72 hours in advance.
          </p>
        </GlassCard>
      </div>
    </div>
  );
}
