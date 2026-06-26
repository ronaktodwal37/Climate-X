import type { District, ClimateData, PredictionResult, ClimateRisk, DataSource, ChartDataPoint } from '@/types';

export const districts: District[] = [
  { id: 'jaipur', name: 'Jaipur', state: 'Rajasthan', coordinates: [75.7873, 26.9124], population: 6670000, area: 2324 },
  { id: 'jodhpur', name: 'Jodhpur', state: 'Rajasthan', coordinates: [73.0219, 26.2806], population: 3650000, area: 22858 },
  { id: 'udaipur', name: 'Udaipur', state: 'Rajasthan', coordinates: [73.6886, 24.5854], population: 3100000, area: 13037 },
  { id: 'ajmer', name: 'Ajmer', state: 'Rajasthan', coordinates: [74.6391, 26.4263], population: 2580000, area: 8481 },
  { id: 'bikaner', name: 'Bikaner', state: 'Rajasthan', coordinates: [73.3119, 28.0229], population: 2370000, area: 27267 },
  { id: 'jaisalmer', name: 'Jaisalmer', state: 'Rajasthan', coordinates: [70.9023, 26.9157], population: 670000, area: 38401 },
  { id: 'alwar', name: 'Alwar', state: 'Rajasthan', coordinates: [76.6349, 27.5530], population: 3670000, area: 8380 },
  { id: 'kota', name: 'Kota', state: 'Rajasthan', coordinates: [75.8265, 25.2138], population: 1950000, area: 221 },
];

export const generateClimateData = (district: string): ClimateData => {
  const baseTemp = district === 'jaisalmer' || district === 'bikaner' ? 44 : district === 'udaipur' ? 38 : 42;
  return {
    temperature: baseTemp + Math.random() * 3 - 1,
    maxTemperature: baseTemp + 4 + Math.random() * 2,
    minTemperature: baseTemp - 12 + Math.random() * 3,
    rainfall: district === 'jaisalmer' ? 1 + Math.random() * 2 : 4 + Math.random() * 8,
    humidity: 30 + Math.random() * 20,
    pressure: 1008 + Math.random() * 10,
    windSpeed: 12 + Math.random() * 15,
    timestamp: new Date(),
    district,
    state: 'Rajasthan',
  };
};

export const generateWeeklyData = (days: number = 7): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];
  const now = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const baseTemp = 40 + Math.sin(i * 0.5) * 5 + Math.random() * 3;

    data.push({
      date: date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
      value: Math.round(baseTemp * 10) / 10,
    });
  }

  return data;
};

export const generateForecastData = (days: number = 7): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];
  const now = new Date();

  for (let i = 0; i < days; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() + i);
    const baseTemp = 40 + Math.sin(i * 0.3) * 4 + Math.random() * 2;

    data.push({
      date: date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
      value: Math.round(baseTemp * 10) / 10,
      predicted: i > 0,
    });
  }

  return data;
};

export const generateRainfallData = (months: number = 12): ChartDataPoint[] => {
  const monthsList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const rainfallPattern = [5, 8, 10, 12, 25, 80, 180, 160, 90, 30, 15, 8];

  return monthsList.slice(0, months).map((month, i) => ({
    date: month,
    value: rainfallPattern[i] + Math.random() * 20 - 10,
  }));
};

export const generatePrediction = (district: string): PredictionResult => {
  const baseTemp = district === 'jaisalmer' ? 42 : 38;
  return {
    temperature1Day: { max: baseTemp + 4, min: baseTemp - 10 },
    temperature3Day: { max: baseTemp + 5, min: baseTemp - 11 },
    temperature7Day: { max: baseTemp + 3, min: baseTemp - 9 },
    rainfall1Day: 2 + Math.random() * 5,
    rainfall3Day: 8 + Math.random() * 12,
    rainfall7Day: 15 + Math.random() * 25,
    confidence: 85 + Math.random() * 10,
    timestamp: new Date(),
  };
};

export const generateRiskAssessment = (district: string): ClimateRisk => {
  const isDessert = district === 'jaisalmer' || district === 'bikaner';
  return {
    heatRisk: isDessert ? 85 + Math.random() * 10 : 60 + Math.random() * 20,
    droughtRisk: isDessert ? 70 + Math.random() * 15 : 40 + Math.random() * 30,
    floodRisk: isDessert ? 10 + Math.random() * 10 : 30 + Math.random() * 25,
    cycloneRisk: 5 + Math.random() * 10,
    overallRisk: isDessert ? 75 : 55 + Math.random() * 20,
    trend: Math.random() > 0.5 ? 'increasing' : Math.random() > 0.5 ? 'stable' : 'decreasing',
  };
};

export const dataSources: DataSource[] = [
  {
    id: 'imd',
    name: 'IMD Weather Data',
    description: 'India Meteorological Department gridded rainfall and temperature datasets with historical records since 1901.',
    resolution: '0.25° x 0.25° (~25 km)',
    updateFrequency: 'Daily',
    purpose: 'Historical climate analysis, trend detection, model training',
    url: 'https://imdpune.gov.in/',
  },
  {
    id: 'insat',
    name: 'INSAT Satellite',
    description: 'INSAT-3D/3DR geostationary satellite providing real-time weather monitoring, cloud imagery, and sea surface temperature data.',
    resolution: '4 km (IR), 1 km (Visible)',
    updateFrequency: 'Every 15-30 minutes',
    purpose: 'Real-time weather monitoring, cloud motion vectors, SST analysis',
    url: 'https://mosdac.gov.in/',
  },
  {
    id: 'mosdac',
    name: 'MOSDAC',
    description: 'Meteorological and Oceanographic Satellite Data Archival Centre providing processed satellite products.',
    resolution: 'Various (1 km - 25 km)',
    updateFrequency: 'Hourly to Daily',
    purpose: 'Satellite-derived products, temperature profiles, humidity distribution',
    url: 'https://mosdac.gov.in/',
  },
  {
    id: 'bhuvan',
    name: 'Bhuvan Portal',
    description: 'ISRO\'s Geo-platform providing thematic maps, land use data, and terrain information.',
    resolution: 'Up to 2.5 m',
    updateFrequency: 'Varies by product',
    purpose: 'Topography, land use/land cover, watershed boundaries, vegetation indices',
    url: 'https://bhuvan.nrsc.gov.in/',
  },
];

export const riskDistribution = [
  { name: 'Heat Risk', value: 35, fill: '#F44336' },
  { name: 'Drought Risk', value: 25, fill: '#FFB300' },
  { name: 'Flood Risk', value: 20, fill: '#1F6FEB' },
  { name: 'Cyclone Risk', value: 20, fill: '#9C27B0' },
];

export const districtRiskRanking = [
  { district: 'Jaisalmer', heatRisk: 92, droughtRisk: 88, floodRisk: 12, overall: 85, trend: 'increasing' },
  { district: 'Bikaner', heatRisk: 88, droughtRisk: 82, floodRisk: 15, overall: 80, trend: 'increasing' },
  { district: 'Jaipur', heatRisk: 75, droughtRisk: 45, floodRisk: 35, overall: 62, trend: 'stable' },
  { district: 'Jodhpur', heatRisk: 82, droughtRisk: 65, floodRisk: 22, overall: 68, trend: 'stable' },
  { district: 'Kota', heatRisk: 55, droughtRisk: 35, floodRisk: 55, overall: 48, trend: 'decreasing' },
  { district: 'Ajmer', heatRisk: 62, droughtRisk: 52, floodRisk: 42, overall: 55, trend: 'stable' },
  { district: 'Udaipur', heatRisk: 48, droughtRisk: 38, floodRisk: 48, overall: 45, trend: 'decreasing' },
  { district: 'Alwar', heatRisk: 58, droughtRisk: 42, floodRisk: 45, overall: 52, trend: 'stable' },
];

export const generateSimulationResult = (params: { tempChange: number; rainfallChange: number; humidity: number; wind: number }) => {
  const heatFactor = params.tempChange > 0 ? 1 + params.tempChange * 0.08 : 1 - Math.abs(params.tempChange) * 0.05;
  const rainfallFactor = params.rainfallChange > 0 ? 1 - params.rainfallChange * 0.01 : 1 + Math.abs(params.rainfallChange) * 0.008;

  return {
    heatwaveRisk: Math.min(100, Math.max(0, 65 * heatFactor + (params.humidity - 50) * 0.5)),
    floodRisk: Math.min(100, Math.max(0, 25 * (1 - rainfallFactor) + params.humidity * 0.3)),
    waterStress: Math.min(100, Math.max(0, 55 * rainfallFactor + params.tempChange * 2)),
    agricultureImpact: Math.min(100, Math.max(0, 40 + params.tempChange * 3 - params.rainfallChange * 0.5)),
    reservoirStatus: Math.max(0, Math.min(100, 75 - params.tempChange * 5 + params.rainfallChange * 0.8)),
    climateStabilityScore: Math.max(0, Math.min(100, 100 - Math.abs(params.tempChange) * 8 - Math.abs(params.rainfallChange) * 0.5)),
  };
};

export const aiAdvisorResponses: Record<string, string[]> = {
  rainfall_decrease: [
    'Based on the simulated 20% rainfall decrease, here\'s my analysis:',
    'Key Impacts Identified:',
    '- Water stress index projected to increase by 15-20% in arid regions',
    '- Groundwater recharge rates expected to decline by approximately 12%',
    '- Agricultural yield, particularly for rain-fed crops, may reduce by 18-25%',
    '\nRecommended Adaptation Strategies:',
    '1. Implement rainwater harvesting systems at community level',
    '2. Shift to drought-resistant crop varieties like pearl millet and sorghum',
    '3. Expand drip irrigation infrastructure - prioritize Bikaner and Jaisalmer districts',
    '4. Establish early warning systems for agricultural drought',
    '\nImmediate Actions:',
    '- Review reservoir management protocols and optimize water release schedules',
    '- Coordinate with State Disaster Management Authority for contingency planning',
    '- Activate farmer awareness programs on water-efficient practices',
  ],
  temperature_increase: [
    'Temperature increase scenario analysis complete.',
    '\nProjected Climate Impacts:',
    '- Heat stress days (>45°C) likely to increase by 30-40% annually',
    '- Urban heat island effect intensification in Jaipur metropolitan area',
    '- Peak power demand expected to rise by 25% due to cooling requirements',
    '\nSector-Specific Recommendations:',
    '1. Health: Establish cooling centers in vulnerable zones',
    '2. Infrastructure: Audit power grid capacity and transmission lines',
    '3. Water: Prepare for increased evapotranspiration losses',
    '\nPriority Implementation:',
    '- Deploy early heat wave warning system (3-7 day lead time)',
    '- Review occupational safety protocols for outdoor workers',
    '- Implement cool roof programs in urban areas',
  ],
  default: [
    'I\'m the AI Climate Advisor for BHARAT CLIMATEX. I can provide insights on:',
    '\n1. Rainfall pattern changes and water management',
    '2. Temperature trends and heat wave preparedness',
    '3. Climate risk assessments and adaptation strategies',
    '4. Agricultural planning and crop recommendations',
    '5. Reservoir management and water resource optimization',
    '\nAsk me questions like:',
    '- "What happens if rainfall decreases by 20%?"',
    '- "Show impact of 3°C temperature rise"',
    '- "Recommend actions for high heat risk areas"',
    '\nI provide location-specific advice for Rajasthan pilot districts.',
  ],
};

export const rajasthanGeoJSON = {
  type: 'FeatureCollection',
  features: districts.map(d => ({
    type: 'Feature',
    properties: { name: d.name, state: d.state, id: d.id },
    geometry: {
      type: 'Point',
      coordinates: d.coordinates,
    },
  })),
};
