import { motion } from 'framer-motion';
import { Database, ExternalLink, MapPin, Satellite, Activity, RefreshCw, Target, Globe } from 'lucide-react';
import { GlassCard } from '@/components/common/GlassCard';
import { dataSources } from '@/data/mockData';

const dataSourceIcons = {
  imd: Activity,
  insat: Satellite,
  mosdac: Globe,
  bhuvan: MapPin,
};

const dataSourceColors = {
  imd: '#1F6FEB',
  insat: '#00C2FF',
  mosdac: '#00C853',
  bhuvan: '#FFB300',
};

export function DataSourcesPage() {
  return (
    <div className="py-6 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Database className="w-6 h-6 text-accent" />
          Data Sources
        </h1>
        <p className="text-sm text-muted-foreground">
          National climate and satellite data from IMD, INSAT, MOSDAC, and Bhuvan
        </p>
      </motion.div>

      {/* Data Sources Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {dataSources.map((source, index) => {
          const Icon = dataSourceIcons[source.id as keyof typeof dataSourceIcons] || Database;
          const color = dataSourceColors[source.id as keyof typeof dataSourceColors] || '#00C2FF';

          return (
            <motion.div
              key={source.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard variant="accent" className="h-full">
                <div className="flex items-start gap-4">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${color}20` }}
                  >
                    <Icon className="w-7 h-7" style={{ color }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-foreground">{source.name}</h3>
                      {source.url && (
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-accent"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{source.description}</p>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-secondary/30 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Target className="w-3 h-3 text-accent" />
                          <span className="text-xs text-muted-foreground">Resolution</span>
                        </div>
                        <p className="text-sm font-semibold text-foreground">{source.resolution}</p>
                      </div>
                      <div className="bg-secondary/30 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <RefreshCw className="w-3 h-3 text-climate-success" />
                          <span className="text-xs text-muted-foreground">Update</span>
                        </div>
                        <p className="text-sm font-semibold text-foreground">{source.updateFrequency}</p>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-cyan-500/10">
                      <p className="text-xs text-muted-foreground">
                        <strong className="text-foreground">Purpose:</strong> {source.purpose}
                      </p>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      {/* Data Integration Flow */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <GlassCard variant="dark" className="mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">Data Integration Pipeline</h3>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center">
            {[
              { label: 'IMD Ground Stations', desc: 'Temperature, Rainfall' },
              { label: 'INSAT Satellite', desc: 'Cloud, SST, Radiation' },
              { label: 'MOSDAC Archive', desc: 'Processed Products' },
              { label: 'Bhuvan Geoportal', desc: 'Land Use, Terrain' },
            ].map((step, index) => (
              <div key={index} className="flex items-center gap-4 md:gap-8">
                <div className="flex-1">
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mx-auto mb-2">
                    <span className="text-lg font-bold text-accent">{index + 1}</span>
                  </div>
                  <p className="text-sm font-semibold text-foreground">{step.label}</p>
                  <p className="text-xs text-muted-foreground">{step.desc}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block text-accent/30 text-2xl font-light">→</div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-cyan-500/10 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent/10 border border-accent/30">
              <Database className="w-4 h-4 text-accent" />
              <span className="text-sm font-semibold text-accent">Unified Climate Data Layer</span>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { value: '100+', label: 'Years of IMD Data' },
          { value: '30min', label: 'INSAT Update Cycle' },
          { value: '25km', label: 'Grid Resolution' },
          { value: '8', label: 'Pilot Districts' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            <GlassCard className="text-center py-6">
              <div className="text-3xl font-bold text-accent mb-1">{stat.value}</div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Technical Details */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <GlassCard>
          <h3 className="text-lg font-semibold text-foreground mb-4">Technical Specifications</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">Data Formats Supported</h4>
              <div className="flex flex-wrap gap-2">
                {['NetCDF', 'GeoTIFF', 'GRIB2', 'HDF5', 'CSV', 'JSON'].map((format) => (
                  <span
                    key={format}
                    className="px-3 py-1 rounded-full text-xs bg-secondary text-muted-foreground"
                  >
                    {format}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">APIs Available</h4>
              <div className="flex flex-wrap gap-2">
                {['REST', 'OpenDAP', 'WMS', 'WCS', 'OGC'].map((api) => (
                  <span
                    key={api}
                    className="px-3 py-1 rounded-full text-xs bg-accent/20 text-accent"
                  >
                    {api}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
