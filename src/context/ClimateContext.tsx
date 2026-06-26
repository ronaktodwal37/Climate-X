import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ClimateData, PredictionResult, ClimateRisk, SimulationParams, SimulationResult, District } from '@/types';
import { districts, generateClimateData, generatePrediction, generateRiskAssessment, generateSimulationResult } from '@/data/mockData';

interface ClimateContextType {
  selectedDistrict: District | null;
  setSelectedDistrict: (district: District | null) => void;
  currentClimate: ClimateData | null;
  prediction: PredictionResult | null;
  risk: ClimateRisk | null;
  simulationParams: SimulationParams;
  setSimulationParams: (params: SimulationParams) => void;
  simulationResult: SimulationResult | null;
  runSimulation: () => void;
  isSimulating: boolean;
  allDistricts: District[];
  historicalData: ClimateData[];
}

const ClimateContext = createContext<ClimateContextType | undefined>(undefined);

export function ClimateProvider({ children }: { children: React.ReactNode }) {
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(districts[0]);
  const [currentClimate, setCurrentClimate] = useState<ClimateData | null>(null);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [risk, setRisk] = useState<ClimateRisk | null>(null);
  const [historicalData, setHistoricalData] = useState<ClimateData[]>([]);
  const [simulationParams, setSimulationParams] = useState<SimulationParams>({
    temperatureChange: 0,
    rainfallChange: 0,
    humidity: 50,
    windSpeed: 15,
  });
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    if (selectedDistrict) {
      const climate = generateClimateData(selectedDistrict.id);
      setCurrentClimate(climate);
      setPrediction(generatePrediction(selectedDistrict.id));
      setRisk(generateRiskAssessment(selectedDistrict.id));

      const historical = Array.from({ length: 24 }, (_, i) => {
        const data = generateClimateData(selectedDistrict.id);
        const date = new Date();
        date.setMonth(date.getMonth() - (24 - i));
        return { ...data, timestamp: date };
      });
      setHistoricalData(historical);
    }
  }, [selectedDistrict]);

  const runSimulation = useCallback(() => {
    setIsSimulating(true);
    setTimeout(() => {
      const result = generateSimulationResult({
        tempChange: simulationParams.temperatureChange,
        rainfallChange: simulationParams.rainfallChange,
        humidity: simulationParams.humidity,
        wind: simulationParams.windSpeed,
      });
      setSimulationResult(result);
      setIsSimulating(false);
    }, 1500);
  }, [simulationParams]);

  return (
    <ClimateContext.Provider
      value={{
        selectedDistrict,
        setSelectedDistrict,
        currentClimate,
        prediction,
        risk,
        simulationParams,
        setSimulationParams,
        simulationResult,
        runSimulation,
        isSimulating,
        allDistricts: districts,
        historicalData,
      }}
    >
      {children}
    </ClimateContext.Provider>
  );
}

export function useClimate() {
  const context = useContext(ClimateContext);
  if (!context) {
    throw new Error('useClimate must be used within a ClimateProvider');
  }
  return context;
}
