export interface ClimateData {
  temperature: number;
  maxTemperature: number;
  minTemperature: number;
  rainfall: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  timestamp: Date;
  district: string;
  state: string;
}

export interface District {
  id: string;
  name: string;
  state: string;
  coordinates: [number, number];
  population: number;
  area: number;
}

export interface PredictionResult {
  temperature1Day: { max: number; min: number };
  temperature3Day: { max: number; min: number };
  temperature7Day: { max: number; min: number };
  rainfall1Day: number;
  rainfall3Day: number;
  rainfall7Day: number;
  confidence: number;
  timestamp: Date;
}

export interface ClimateRisk {
  heatRisk: number;
  droughtRisk: number;
  floodRisk: number;
  cycloneRisk: number;
  overallRisk: number;
  trend: 'increasing' | 'stable' | 'decreasing';
}

export type RiskLevel = 'low' | 'moderate' | 'high' | 'extreme';

export interface RiskAssessment {
  type: 'heat' | 'drought' | 'flood' | 'cyclone';
  level: RiskLevel;
  probability: number;
  impact: string;
  recommendation: string;
}

export interface SimulationParams {
  temperatureChange: number;
  rainfallChange: number;
  humidity: number;
  windSpeed: number;
}

export interface SimulationResult {
  heatwaveRisk: number;
  floodRisk: number;
  waterStress: number;
  agricultureImpact: number;
  reservoirStatus: number;
  climateStabilityScore: number;
}

export interface DigitalTwinState {
  current: ClimateData;
  historical: ClimateData[];
  forecast: PredictionResult;
  risk: ClimateRisk;
}

export interface DataSource {
  id: string;
  name: string;
  description: string;
  resolution: string;
  updateFrequency: string;
  purpose: string;
  url?: string;
}

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ClimateAdvisorResponse {
  summary: string;
  recommendations: string[];
  actions: string[];
  confidence: number;
}

export interface ChartDataPoint {
  date: string;
  value: number;
  predicted?: boolean;
}

export interface MapLayer {
  id: string;
  name: string;
  type: 'temperature' | 'rainfall' | 'humidity' | 'risk';
  visible: boolean;
  opacity: number;
}
