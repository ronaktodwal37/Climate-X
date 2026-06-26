import { motion } from 'framer-motion';
import {
  FlaskConical,
  Thermometer,
  CloudRain,
  Droplets,
  Wind,
  Play,
  RotateCcw,
  AlertTriangle,
  Droplet,
  Wheat,
  Building2,
  Gauge,
} from 'lucide-react';
import { useClimate } from '@/context/ClimateContext';
import { GlassCard } from '@/components/common/GlassCard';
import { AnimatedCounter } from '@/components/common/AnimatedCounter';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

export function ScenarioSimulatorPage() {
  const {
    simulationParams,
    setSimulationParams,
    simulationResult,
    runSimulation,
    isSimulating,
    selectedDistrict,
  } = useClimate();

  const handleParamChange = (key: keyof typeof simulationParams, value: number[]) => {
    setSimulationParams({ ...simulationParams, [key]: value[0] });
  };

  const resetParams = () => {
    setSimulationParams({
      temperatureChange: 0,
      rainfallChange: 0,
      humidity: 50,
      windSpeed: 15,
    });
  };

  const resultMetrics = simulationResult
    ? [
        {
          label: 'Heatwave Risk',
          value: simulationResult.heatwaveRisk,
          icon: Thermometer,
          color: '#F44336',
          unit: '%',
        },
        {
          label: 'Flood Risk',
          value: simulationResult.floodRisk,
          icon: CloudRain,
          color: '#1F6FEB',
          unit: '%',
        },
        {
          label: 'Water Stress',
          value: simulationResult.waterStress,
          icon: Droplet,
          color: '#FFB300',
          unit: '%',
        },
        {
          label: 'Agriculture Impact',
          value: simulationResult.agricultureImpact,
          icon: Wheat,
          color: '#00C853',
          unit: '%',
        },
        {
          label: 'Reservoir Status',
          value: simulationResult.reservoirStatus,
          icon: Building2,
          color: '#00C2FF',
          unit: '%',
        },
        {
          label: 'Stability Score',
          value: simulationResult.climateStabilityScore,
          icon: Gauge,
          color: '#9C27B0',
          unit: '%',
        },
      ]
    : [];

  return (
    <div className="py-6 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <FlaskConical className="w-6 h-6 text-accent" />
          Scenario Simulator
        </h1>
        <p className="text-sm text-muted-foreground">
          Physics-informed climate simulation engine for "what-if" analysis
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Control Panel */}
        <GlassCard variant="accent" glow>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground">Simulation Parameters</h2>
            <Button variant="ghost" size="sm" onClick={resetParams} className="text-muted-foreground">
              <RotateCcw className="w-4 h-4 mr-1" />
              Reset
            </Button>
          </div>

          <div className="space-y-8">
            {/* Temperature Change */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm text-foreground flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-climate-danger" />
                  Temperature Change
                </Label>
                <span className={`text-sm font-semibold ${simulationParams.temperatureChange >= 0 ? 'text-climate-danger' : 'text-primary'}`}>
                  {simulationParams.temperatureChange >= 0 ? '+' : ''}
                  {simulationParams.temperatureChange}°C
                </span>
              </div>
              <Slider
                value={[simulationParams.temperatureChange]}
                onValueChange={(value) => handleParamChange('temperatureChange', value)}
                min={-5}
                max={5}
                step={0.5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>-5°C Cooler</span>
                <span>+5°C Warmer</span>
              </div>
            </div>

            {/* Rainfall Change */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm text-foreground flex items-center gap-2">
                  <CloudRain className="w-4 h-4 text-primary" />
                  Rainfall Change
                </Label>
                <span className={`text-sm font-semibold ${simulationParams.rainfallChange >= 0 ? 'text-primary' : 'text-climate-warning'}`}>
                  {simulationParams.rainfallChange >= 0 ? '+' : ''}
                  {simulationParams.rainfallChange}%
                </span>
              </div>
              <Slider
                value={[simulationParams.rainfallChange]}
                onValueChange={(value) => handleParamChange('rainfallChange', value)}
                min={-50}
                max={50}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>-50% Drier</span>
                <span>+50% Wetter</span>
              </div>
            </div>

            {/* Humidity */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm text-foreground flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-accent" />
                  Humidity Level
                </Label>
                <span className="text-sm font-semibold text-accent">
                  {simulationParams.humidity}%
                </span>
              </div>
              <Slider
                value={[simulationParams.humidity]}
                onValueChange={(value) => handleParamChange('humidity', value)}
                min={20}
                max={90}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>20% Arid</span>
                <span>90% Humid</span>
              </div>
            </div>

            {/* Wind Speed */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm text-foreground flex items-center gap-2">
                  <Wind className="w-4 h-4 text-climate-success" />
                  Wind Speed
                </Label>
                <span className="text-sm font-semibold text-climate-success">
                  {simulationParams.windSpeed} km/h
                </span>
              </div>
              <Slider
                value={[simulationParams.windSpeed]}
                onValueChange={(value) => handleParamChange('windSpeed', value)}
                min={5}
                max={50}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>5 km/h Calm</span>
                <span>50 km/h Strong</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-cyan-500/10">
            <Button
              onClick={runSimulation}
              disabled={isSimulating}
              className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-white"
            >
              {isSimulating ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full"
                  />
                  Running Simulation...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Run Simulation
                </>
              )}
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-3">
              District: {selectedDistrict?.name || 'Select a district'}
            </p>
          </div>
        </GlassCard>

        {/* Results Panel */}
        <div className="space-y-4">
          <GlassCard variant="dark" className="min-h-[300px]">
            <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-climate-warning" />
              Simulation Results
            </h2>

            {simulationResult ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-2 gap-4"
              >
                {resultMetrics.map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <GlassCard className="text-center py-4">
                      <metric.icon className="w-6 h-6 mx-auto mb-2" style={{ color: metric.color }} />
                      <div className="text-2xl font-bold" style={{ color: metric.color }}>
                        <AnimatedCounter value={metric.value} decimals={1} />
                        <span className="text-xs ml-0.5">{metric.unit}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{metric.label}</p>
                    </GlassCard>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <FlaskConical className="w-12 h-12 text-muted-foreground/30 mb-4" />
                <p className="text-sm text-muted-foreground">
                  Adjust parameters and click "Run Simulation"
                  <br />
                  to see projected climate impacts
                </p>
              </div>
            )}
          </GlassCard>

          {/* Summary Card */}
          {simulationResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <GlassCard variant="accent">
                <h3 className="text-sm font-semibold text-foreground mb-3">Impact Summary</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    With {simulationParams.temperatureChange >= 0 ? 'warmer' : 'cooler'} temperatures
                    ({simulationParams.temperatureChange >= 0 ? '+' : ''}{simulationParams.temperatureChange}°C)
                    and {simulationParams.rainfallChange >= 0 ? 'increased' : 'decreased'} rainfall
                    ({simulationParams.rainfallChange >= 0 ? '+' : ''}{simulationParams.rainfallChange}%):
                  </p>
                  <ul className="space-y-1 pl-4">
                    <li>
                      {simulationResult.heatwaveRisk > 70 ? 'High' : simulationResult.heatwaveRisk > 40 ? 'Moderate' : 'Low'}{' '}
                      heatwave risk expected
                    </li>
                    <li>
                      Water stress index: {simulationResult.waterStress > 60 ? 'Critical' : simulationResult.waterStress > 40 ? 'Elevated' : 'Normal'}
                    </li>
                    <li>
                      Agricultural sector: {simulationResult.agricultureImpact > 50 ? 'Significant' : 'Moderate'} impact projected
                    </li>
                  </ul>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <GlassCard variant="dark">
          <h4 className="text-sm font-semibold text-foreground mb-2">Heat Stress Model</h4>
          <p className="text-xs text-muted-foreground">
            Calculates heat stress index based on temperature, humidity, and wind conditions.
          </p>
        </GlassCard>
        <GlassCard variant="dark">
          <h4 className="text-sm font-semibold text-foreground mb-2">Water Availability</h4>
          <p className="text-xs text-muted-foreground">
            Estimates water stress considering rainfall changes and evapotranspiration.
          </p>
        </GlassCard>
        <GlassCard variant="dark">
          <h4 className="text-sm font-semibold text-foreground mb-2">Flood Probability</h4>
          <p className="text-xs text-muted-foreground">
            Models flood risk based on rainfall intensity, humidity, and catchment characteristics.
          </p>
        </GlassCard>
      </div>
    </div>
  );
}
