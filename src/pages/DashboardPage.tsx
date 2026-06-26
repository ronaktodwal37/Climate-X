import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import {
  Thermometer,
  CloudRain,
  Droplets,
  AlertTriangle,
  TrendingUp,
  Wind,
  MapPin,
  Layers,
  Calendar,
  Eye,
} from 'lucide-react';
import { useClimate } from '@/context/ClimateContext';
import { GlassCard, StatCard } from '@/components/common/GlassCard';
import { ClimateLineChart, ClimateAreaChart } from '@/components/charts/ClimateChart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { generateWeeklyData, generateForecastData, generateRainfallData } from '@/data/mockData';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const createCustomIcon = (risk: number) => {
  const color = risk > 70 ? '#F44336' : risk > 50 ? '#FFB300' : '#00C853';
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: 24px;
        height: 24px;
        background: ${color};
        border: 2px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      "></div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

function MapEvents({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 8, { duration: 1 });
  }, [center, map]);
  return null;
}

export function DashboardPage() {
  const {
    selectedDistrict,
    setSelectedDistrict,
    currentClimate,
    prediction,
    risk,
    allDistricts,
  } = useClimate();

  const tempData = generateWeeklyData(7);
  const forecastData = generateForecastData(7);
  const rainfallData = generateRainfallData(12);

  const center: [number, number] = selectedDistrict
    ? [selectedDistrict.coordinates[1], selectedDistrict.coordinates[0]]
    : [26.9124, 75.7873];

  return (
    <div className="py-6 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <MapPin className="w-6 h-6 text-accent" />
            Climate Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Real-time monitoring and predictions for Rajasthan
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select
            value={selectedDistrict?.id || ''}
            onValueChange={(value) => {
              const district = allDistricts.find((d) => d.id === value);
              setSelectedDistrict(district || null);
            }}
          >
            <SelectTrigger className="w-[180px] bg-secondary border-cyan-500/20">
              <SelectValue placeholder="Select District" />
            </SelectTrigger>
            <SelectContent className="bg-climate-dark border-cyan-500/20">
              {allDistricts.map((district) => (
                <SelectItem key={district.id} value={district.id}>
                  {district.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" className="border-cyan-500/20">
            <Calendar className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {currentClimate && (
          <>
            <StatCard
              title="Temperature"
              value={currentClimate.temperature}
              unit="°C"
              icon={<Thermometer className="w-5 h-5" />}
              trend="up"
              trendValue="+2.3°"
              color="danger"
            />
            <StatCard
              title="Rainfall"
              value={currentClimate.rainfall}
              unit="mm"
              icon={<CloudRain className="w-5 h-5" />}
              trend="down"
              trendValue="-15%"
              color="primary"
            />
            <StatCard
              title="Humidity"
              value={currentClimate.humidity}
              unit="%"
              icon={<Droplets className="w-5 h-5" />}
              color="accent"
            />
            <StatCard
              title="Wind Speed"
              value={currentClimate.windSpeed}
              unit="km/h"
              icon={<Wind className="w-5 h-5" />}
              color="primary"
            />
            <StatCard
              title="Heat Risk"
              value={risk?.heatRisk || 0}
              unit="%"
              icon={<AlertTriangle className="w-5 h-5" />}
              color={risk?.heatRisk && risk.heatRisk > 70 ? 'danger' : 'warning'}
            />
            <StatCard
              title="Accuracy"
              value={prediction?.confidence || 0}
              unit="%"
              icon={<TrendingUp className="w-5 h-5" />}
              color="success"
            />
          </>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2"
        >
          <GlassCard className="h-[400px] overflow-hidden p-0">
            <div className="flex items-center gap-2 p-4 border-b border-cyan-500/10">
              <Layers className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">Rajasthan Climate Map</span>
              <div className="flex-1" />
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-climate-danger" /> High
                <span className="w-2 h-2 rounded-full bg-climate-warning ml-2" /> Moderate
                <span className="w-2 h-2 rounded-full bg-climate-success ml-2" /> Low
              </div>
            </div>
            <MapContainer
              center={center}
              zoom={8}
              style={{ height: '340px', width: '100%' }}
              className="z-0"
            >
              <MapEvents center={center} />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {allDistricts.map((district) => (
                <Marker
                  key={district.id}
                  position={[district.coordinates[1], district.coordinates[0]]}
                  icon={createCustomIcon(50 + Math.random() * 40)}
                >
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-bold text-foreground">{district.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        Population: {(district.population / 1000000).toFixed(2)}M
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Area: {(district.area / 1000).toFixed(1)}K km²
                      </p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </GlassCard>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <GlassCard variant="accent">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Eye className="w-4 h-4 text-accent" />
              Climate Layers
            </h3>
            <div className="space-y-2">
              {['Temperature', 'Rainfall', 'Heat Risk', 'Drought Risk'].map((layer) => (
                <Button
                  key={layer}
                  variant="ghost"
                  className="w-full justify-start text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                >
                  <div className="w-2 h-2 rounded-full bg-accent mr-2" />
                  {layer}
                </Button>
              ))}
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="text-sm font-semibold text-foreground mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Max Temp Today</span>
                <span className="text-sm font-semibold text-climate-danger">
                  {currentClimate?.maxTemperature.toFixed(1)}°C
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Min Temp Today</span>
                <span className="text-sm font-semibold text-primary">
                  {currentClimate?.minTemperature.toFixed(1)}°C
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Pressure</span>
                <span className="text-sm font-semibold text-foreground">
                  {currentClimate?.pressure.toFixed(0)} hPa
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Drought Risk</span>
                <span className="text-sm font-semibold text-climate-warning">
                  {risk?.droughtRisk?.toFixed(0)}%
                </span>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Charts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6"
      >
        <GlassCard>
          <Tabs defaultValue="temperature" className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-md mb-6 bg-secondary/30">
              <TabsTrigger value="temperature">Temperature</TabsTrigger>
              <TabsTrigger value="rainfall">Rainfall</TabsTrigger>
              <TabsTrigger value="forecast">7-Day Forecast</TabsTrigger>
            </TabsList>
            <TabsContent value="temperature">
              <ClimateLineChart
                data={tempData}
                title="Weekly Temperature Trend"
                color="#F44336"
                height={300}
              />
            </TabsContent>
            <TabsContent value="rainfall">
              <ClimateAreaChart
                data={rainfallData}
                title="Monthly Rainfall Distribution (mm)"
                color="#1F6FEB"
                height={300}
              />
            </TabsContent>
            <TabsContent value="forecast">
              <ClimateLineChart
                data={forecastData}
                title="7-Day Temperature Forecast"
                color="#00C2FF"
                height={300}
                showPredicted
              />
            </TabsContent>
          </Tabs>
        </GlassCard>
      </motion.div>

      {/* Prediction Cards */}
      {prediction && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid sm:grid-cols-3 gap-4 mt-6"
        >
          <GlassCard variant="accent">
            <h4 className="text-xs text-muted-foreground mb-2">1-Day Forecast</h4>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="text-lg font-bold text-climate-danger">
                  {prediction.temperature1Day.max}°
                </div>
                <div className="text-xs text-muted-foreground">Max</div>
              </div>
              <div>
                <div className="text-lg font-bold text-primary">
                  {prediction.temperature1Day.min}°
                </div>
                <div className="text-xs text-muted-foreground">Min</div>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-cyan-500/10">
              <span className="text-xs text-muted-foreground">Rain:</span>
              <span className="text-sm font-semibold text-accent ml-1">
                {prediction.rainfall1Day.toFixed(1)} mm
              </span>
            </div>
          </GlassCard>

          <GlassCard variant="accent">
            <h4 className="text-xs text-muted-foreground mb-2">3-Day Forecast</h4>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="text-lg font-bold text-climate-danger">
                  {prediction.temperature3Day.max}°
                </div>
                <div className="text-xs text-muted-foreground">Max</div>
              </div>
              <div>
                <div className="text-lg font-bold text-primary">
                  {prediction.temperature3Day.min}°
                </div>
                <div className="text-xs text-muted-foreground">Min</div>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-cyan-500/10">
              <span className="text-xs text-muted-foreground">Rain:</span>
              <span className="text-sm font-semibold text-accent ml-1">
                {prediction.rainfall3Day.toFixed(1)} mm
              </span>
            </div>
          </GlassCard>

          <GlassCard variant="accent">
            <h4 className="text-xs text-muted-foreground mb-2">7-Day Forecast</h4>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="text-lg font-bold text-climate-danger">
                  {prediction.temperature7Day.max}°
                </div>
                <div className="text-xs text-muted-foreground">Max</div>
              </div>
              <div>
                <div className="text-lg font-bold text-primary">
                  {prediction.temperature7Day.min}°
                </div>
                <div className="text-xs text-muted-foreground">Min</div>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-cyan-500/10">
              <span className="text-xs text-muted-foreground">Rain:</span>
              <span className="text-sm font-semibold text-accent ml-1">
                {prediction.rainfall7Day.toFixed(1)} mm
              </span>
            </div>
          </GlassCard>
        </motion.div>
      )}
    </div>
  );
}
