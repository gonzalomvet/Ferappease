export type WeightUnit = 'kg' | 'lbs';
export type Currency = 'CLP' | 'USD';

export interface CalculatorInputs {
  headCount: number;
  avgWeight: number;
  weightUnit: WeightUnit;
  currency: Currency;
  salePricePerUnit: number; // CLP/kg o USD/lb o USD/kg
  expectedShrinkPercent: number; // e.g. 7.0 (%)
  shrinkReductionPercent: number; // e.g. 80 (%)
  costPerDose: number; // e.g. 3000 CLP o 3.0 USD
  extraWeightGain: number; // Optional additional weight gain (kg or lbs) e.g., 0
}

export interface CalculationResults {
  // Pesos
  initialTotalWeight: number;
  
  // Sin FerAppease
  shrinkLossPerHeadWithout: number;
  totalShrinkLossWithout: number;
  finalWeightPerHeadWithout: number;
  totalFinalWeightWithout: number;
  grossRevenueWithout: number;
  
  // Con FerAppease
  actualShrinkPercentWith: number;
  shrinkLossPerHeadWith: number;
  totalShrinkLossWith: number;
  finalWeightPerHeadWith: number;
  totalFinalWeightWith: number;
  grossRevenueWith: number;
  
  // Ahorros y ROI
  weightSavedPerHead: number;
  totalWeightSaved: number;
  grossExtraRevenue: number;
  totalTreatmentCost: number;
  netProfit: number;
  netProfitPerHead: number;
  roiPercentage: number;
  roiRatio: number; // e.g. 8.2 (retorna $8.2 por cada $1 invertido)
  breakEvenWeightKgOrLb: number; // Kilos necesarios de recuperar por animal para pagar el tratamiento
}

export interface PresetScenario {
  id: string;
  name: string;
  description: string;
  iconName: string;
  shrinkPercent: number;
  reductionPercent: number;
  typicalDistance: string;
}
