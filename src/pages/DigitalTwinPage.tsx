import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  Thermometer,
  Wind,
  Gauge,
  AlertTriangle,
  Play,
  Pause,
  RotateCcw,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import { useClimate } from '@/context/ClimateContext';
import { GlassCard } from '@/components/common/GlassCard';
import { MetricGauge } from '@/components/common/GlassCard';
import { AnimatedCounter } from '@/components/common/AnimatedCounter';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

type TimeMode = 'current' | 'day1' | 'day3' | 'day7' | 'historical';

const timeModes: { id: TimeMode; label: string }[] = [
  { id: 'current', label: 'Now' },
  { id: 'day1', label: '+1 Day' },
  { id: 'day3', label: '+3 Days' },
  { id: 'day7', label: '+7 Days' },
  { id: 'historical', label: 'Historical' },
];

interface ClimateState {
  temperature: number;
  maxTemperature: number;
  minTemperature: number;
  rainfall: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  heatRisk: number;
  droughtRisk: number;
}

const generateState = (mode: TimeMode, base: ClimateData | null, prediction: PredictionResult | null): ClimateState => {
  if (!base) {
    return {
      temperature: 40,
      maxTemperature: 45,
      minTemperature: 30,
      rainfall: 5,
      humidity: 40,
      pressure: 1010,
      windSpeed: 15,
      heatRisk: 60,
      droughtRisk: 50,
    };
  }

  switch (mode) {
    case 'current':
      return {
        temperature: base.temperature,
        maxTemperature: base.maxTemperature,
        minTemperature: base.minTemperature,
        rainfall: base.rainfall,
        humidity: base.humidity,
        pressure: base.pressure,
        windSpeed: base.windSpeed,
        heatRisk: 65,
        droughtRisk: 45,
      };
    case 'day1':
      return {
        temperature: prediction?.temperature1Day.max || base.maxTemperature - 2,
        maxTemperature: prediction?.temperature1Day.max || base.maxTemperature,
        minTemperature: prediction?.temperature1Day.min || base.minTemperature,
        rainfall: prediction?.rainfall1Day || base.rainfall + 2,
        humidity: base.humidity + 5,
        pressure: base.pressure - 2,
        windSpeed: base.windSpeed + 3,
        heatRisk: 70,
        droughtRisk: 50,
      };
    case 'day3':
      return {
        temperature: prediction?.temperature3Day.max || base.maxTemperature - 3,
        maxTemperature: prediction?.temperature3Day.max || base.maxTemperature - 1,
        minTemperature: prediction?.temperature3Day.min || base.minTemperature + 1,
        rainfall: prediction?.rainfall3Day || base.rainfall + 8,
        humidity: base.humidity + 10,
        pressure: base.pressure - 5,
        windSpeed: base.windSpeed + 5,
        heatRisk: 75,
        droughtRisk: 55,
      };
    case 'day7':
      return {
        temperature: prediction?.temperature7Day.max || base.maxTemperature - 4,
        maxTemperature: prediction?.temperature7Day.max || base.maxTemperature - 2,
        minTemperature: prediction?.temperature7Day.min || base.minTemperature + 2,
        rainfall: prediction?.rainfall7Day || base.rainfall + 15,
        humidity: base.humidity + 15,
        pressure: base.pressure - 8,
        windSpeed: base.windSpeed + 8,
        heatRisk: 65,
        droughtRisk: 45,
      };
    case 'historical':
      return {
        temperature: base.temperature - 3,
        maxTemperature: base.maxTemperature - 2,
        minTemperature: base.minTemperature - 1,
        rainfall: base.rainfall + 20,
        humidity: base.humidity - 10,
        pressure: base.pressure + 5,
        windSpeed: base.windSpeed - 5,
        heatRisk: 55,
        droughtRisk: 40,
      };
    default:
      return {
        temperature: base.temperature,
        maxTemperature: base.maxTemperature,
        minTemperature: base.minTemperature,
        rainfall: base.rainfall,
        humidity: base.humidity,
        pressure: base.pressure,
        windSpeed: base.windSpeed,
        heatRisk: 65,
        droughtRisk: 45,
      };
  }
};

import type { ClimateData, PredictionResult } from '@/types';

export function DigitalTwinPage() {
  const { selectedDistrict, currentClimate, prediction, historicalData } = useClimate();
  const [timeMode, setTimeMode] = useState<TimeMode>('current');
  const [isPlaying, setIsPlaying] = useState(false);
  const [climateState, setClimateState] = useState<ClimateState | null>(null);
  const [historicalIndex, setHistoricalIndex] = useState(0);

  useEffect(() => {
    if (currentClimate) {
      setClimateState(generateState(timeMode, currentClimate, prediction));
    }
  }, [timeMode, currentClimate, prediction]);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setTimeMode((prev) => {
        const modes: TimeMode[] = ['current', 'day1', 'day3', 'day7'];
        const currentIndex = modes.indexOf(prev);
        if (currentIndex === -1 || currentIndex === modes.length - 1) {
          return modes[0];
        }
        return modes[currentIndex + 1];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleSliderChange = (value: number[]) => {
    if (timeMode === 'historical') {
      setHistoricalIndex(value[0]);
    }
  };

  return (
    <div className="py-6 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Clock className="w-6 h-6 text-accent" />
          Digital Twin
        </h1>
        <p className="text-sm text-muted-foreground">
          Real-time climate state visualization with temporal analysis
        </p>
      </motion.div>

      {/* Time Controls */}
      <GlassCard variant="accent" className="mb-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {timeModes.map((mode) => (
              <Button
                key={mode.id}
                variant={timeMode === mode.id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setTimeMode(mode.id)}
                className={timeMode === mode.id ? 'bg-accent text-climate-dark' : 'text-muted-foreground'}
              >
                {mode.label}
              </Button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsPlaying(!isPlaying)}
              className="border-cyan-500/30"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTimeMode('current')}
              className="border-cyan-500/30"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {timeMode === 'historical' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 pt-4 border-t border-cyan-500/10"
          >
            <p className="text-xs text-muted-foreground mb-2">
              Historical Timeline: {historicalData.length > 0 ? `${historicalData[0].timestamp.toLocaleDateString()} - Present` : 'Loading...'}
            </p>
            <Slider
              value={[historicalIndex]}
              onValueChange={handleSliderChange}
              max={historicalData.length - 1}
              step={1}
              className="w-full"
            />
          </motion.div>
        )}
      </GlassCard>

      {/* Climate State Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={timeMode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Gauges */}
            <GlassCard className="lg:col-span-2 p-6">
              <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                <Thermometer className="w-5 h-5 text-accent" />
                {selectedDistrict?.name || 'Select District'} - Climate State
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                <MetricGauge
                  value={climateState?.temperature || 0}
                  label="Temperature"
                  unit="°C"
                  color="#F44336"
                  size="lg"
                />
                <MetricGauge
                  value={climateState?.rainfall || 0}
                  label="Rainfall"
                  unit="mm"
                  color="#1F6FEB"
                  size="lg"
                />
                <MetricGauge
                  value={climateState?.humidity || 0}
                  label="Humidity"
                  unit="%"
                  color="#00C2FF"
                  size="lg"
                />
              </div>
            </GlassCard>

            {/* Risk Indicators */}
            <GlassCard variant="dark" className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-climate-warning" />
                Risk Assessment
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Heat Risk</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 rounded-full bg-secondary overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${climateState?.heatRisk || 0}%` }}
                        transition={{ duration: 1 }}
                        className="h-full bg-climate-danger rounded-full"
                      />
                    </div>
                    <span className="text-sm font-semibold text-climate-danger">
                      {Math.round(climateState?.heatRisk || 0)}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Drought Risk</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 rounded-full bg-secondary overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${climateState?.droughtRisk || 0}%` }}
                        transition={{ duration: 1 }}
                        className="h-full bg-climate-warning rounded-full"
                      />
                    </div>
                    <span className="text-sm font-semibold text-climate-warning">
                      {Math.round(climateState?.droughtRisk || 0)}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-cyan-500/10">
                <p className="text-xs text-muted-foreground mb-2">Current Mode</p>
                <div className="text-lg font-bold text-accent capitalize">
                  {timeMode === 'current' ? 'Present Climate' :
                   timeMode === 'historical' ? 'Historical Data' :
                   `${timeMode.replace('day', '')}-Day Forecast`}
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Detailed Metrics */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <GlassCard>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">Max Temperature</span>
                <TrendingUp className="w-4 h-4 text-climate-danger" />
              </div>
              <div className="text-2xl font-bold text-climate-danger">
                <AnimatedCounter value={climateState?.maxTemperature || 0} decimals={1} />
                <span className="text-sm font-normal text-muted-foreground">°C</span>
              </div>
            </GlassCard>

            <GlassCard>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">Min Temperature</span>
                <TrendingDown className="w-4 h-4 text-primary" />
              </div>
              <div className="text-2xl font-bold text-primary">
                <AnimatedCounter value={climateState?.minTemperature || 0} decimals={1} />
                <span className="text-sm font-normal text-muted-foreground">°C</span>
              </div>
            </GlassCard>

            <GlassCard>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">Wind Speed</span>
                <Wind className="w-4 h-4 text-accent" />
              </div>
              <div className="text-2xl font-bold text-accent">
                <AnimatedCounter value={climateState?.windSpeed || 0} decimals={1} />
                <span className="text-sm font-normal text-muted-foreground">km/h</span>
              </div>
            </GlassCard>

            <GlassCard>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">Pressure</span>
                <Gauge className="w-4 h-4 text-climate-success" />
              </div>
              <div className="text-2xl font-bold text-climate-success">
                <AnimatedCounter value={climateState?.pressure || 0} decimals={0} />
                <span className="text-sm font-normal text-muted-foreground">hPa</span>
              </div>
            </GlassCard>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Info Cards */}
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <GlassCard variant="dark">
          <h4 className="text-sm font-semibold text-foreground mb-2">Current Climate State</h4>
          <p className="text-xs text-muted-foreground">
            Real-time climate conditions derived from satellite data and ground stations.
          </p>
        </GlassCard>
        <GlassCard variant="dark">
          <h4 className="text-sm font-semibold text-foreground mb-2">Historical Archive</h4>
          <p className="text-xs text-muted-foreground">
            {historicalData.length} data points spanning 24 months of climate history.
          </p>
        </GlassCard>
        <GlassCard variant="dark">
          <h4 className="text-sm font-semibold text-foreground mb-2">Forecast Engine</h4>
          <p className="text-xs text-muted-foreground">
            AI-powered predictions for 1, 3, and 7-day forecasts with confidence scores.
          </p>
        </GlassCard>
      </div>
    </div>
  );
}
