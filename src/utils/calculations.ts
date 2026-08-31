import { CalculatorInputs, CalculationResults, Currency, PresetScenario } from '../types';

export const PRESET_SCENARIOS: PresetScenario[] = [
  {
    id: 'feria_corta',
    name: 'Feria Ganadera Cercana (Corta distancia)',
    description: 'Transporte de 1 a 4 horas hacia recinto ferial o predio vecino.',
    iconName: 'Truck',
    shrinkPercent: 4.5,
    reductionPercent: 80,
    typicalDistance: '< 150 km (1 - 4 hrs)',
  },
  {
    id: 'transporte_medio',
    name: 'Transporte Interregional (Media distancia)',
    description: 'Viaje estándar de venta o traslado entre regiones ganaderas.',
    iconName: 'MapPin',
    shrinkPercent: 7.0,
    reductionPercent: 80,
    typicalDistance: '150 - 450 km (5 - 9 hrs)',
  },
  {
    id: 'larga_distancia',
    name: 'Larga Distancia / Alta Exigencia (Patagonia / Norte)',
    description: 'Traslados prolongados, barcazas, esperas en ramplas y pesajes.',
    iconName: 'Navigation',
    shrinkPercent: 9.5,
    reductionPercent: 75,
    typicalDistance: '> 500 km (10+ hrs)',
  },
  {
    id: 'destete_feedlot',
    name: 'Destete & Ingreso a Feedlot / Engorda',
    description: 'Manejo de destete, encierre, pesaje y adaptación a corrales.',
    iconName: 'Layers',
    shrinkPercent: 6.0,
    reductionPercent: 80,
    typicalDistance: 'Manejo en predio / Ingreso',
  },
];

export function calculateROI(inputs: CalculatorInputs): CalculationResults {
  const {
    headCount,
    avgWeight,
    salePricePerUnit,
    expectedShrinkPercent,
    shrinkReductionPercent,
    costPerDose,
    extraWeightGain = 0,
  } = inputs;

  const validHeadCount = Math.max(1, headCount || 1);
  const validAvgWeight = Math.max(1, avgWeight || 1);
  const validPrice = Math.max(0, salePricePerUnit || 0);
  const shrinkP = Math.max(0, Math.min(100, expectedShrinkPercent || 0));
  const reductionP = Math.max(0, Math.min(100, shrinkReductionPercent || 0));
  const validCostPerDose = Math.max(0, costPerDose || 0);

  // 1. Initial Total Weight
  const initialTotalWeight = validHeadCount * validAvgWeight;

  // 2. Without FerAppease
  const shrinkLossPerHeadWithout = validAvgWeight * (shrinkP / 100);
  const totalShrinkLossWithout = shrinkLossPerHeadWithout * validHeadCount;
  const finalWeightPerHeadWithout = Math.max(0, validAvgWeight - shrinkLossPerHeadWithout);
  const totalFinalWeightWithout = finalWeightPerHeadWithout * validHeadCount;
  const grossRevenueWithout = totalFinalWeightWithout * validPrice;

  // 3. With FerAppease
  // Shrink % is reduced by the reduction % (e.g. 7% * (1 - 0.8) = 1.4%)
  const actualShrinkPercentWith = shrinkP * (1 - reductionP / 100);
  const shrinkLossPerHeadWith = validAvgWeight * (actualShrinkPercentWith / 100);
  const totalShrinkLossWith = shrinkLossPerHeadWith * validHeadCount;
  const finalWeightPerHeadWith = Math.max(0, validAvgWeight - shrinkLossPerHeadWith + extraWeightGain);
  const totalFinalWeightWith = finalWeightPerHeadWith * validHeadCount;
  const grossRevenueWith = totalFinalWeightWith * validPrice;

  // 4. Savings & Economic ROI
  const weightSavedPerHead = Math.max(0, finalWeightPerHeadWith - finalWeightPerHeadWithout);
  const totalWeightSaved = weightSavedPerHead * validHeadCount;
  const grossExtraRevenue = totalWeightSaved * validPrice;
  const totalTreatmentCost = validHeadCount * validCostPerDose;
  const netProfit = grossExtraRevenue - totalTreatmentCost;
  const netProfitPerHead = netProfit / validHeadCount;

  const roiPercentage = totalTreatmentCost > 0 
    ? (netProfit / totalTreatmentCost) * 100 
    : 0;

  const roiRatio = totalTreatmentCost > 0 
    ? (grossExtraRevenue / totalTreatmentCost) 
    : 0;

  const breakEvenWeightKgOrLb = validPrice > 0 
    ? (validCostPerDose / validPrice) 
    : 0;

  return {
    initialTotalWeight,
    shrinkLossPerHeadWithout,
    totalShrinkLossWithout,
    finalWeightPerHeadWithout,
    totalFinalWeightWithout,
    grossRevenueWithout,
    actualShrinkPercentWith,
    shrinkLossPerHeadWith,
    totalShrinkLossWith,
    finalWeightPerHeadWith,
    totalFinalWeightWith,
    grossRevenueWith,
    weightSavedPerHead,
    totalWeightSaved,
    grossExtraRevenue,
    totalTreatmentCost,
    netProfit,
    netProfitPerHead,
    roiPercentage,
    roiRatio,
    breakEvenWeightKgOrLb,
  };
}

export function formatCurrency(amount: number, currency: Currency): string {
  if (currency === 'CLP') {
    // Chilean Pesos: $ 1.250.000 (sin decimales para montos totales)
    const rounded = Math.round(amount);
    return `$ ${new Intl.NumberFormat('es-CL', {
      maximumFractionDigits: 0,
      useGrouping: true,
    }).format(rounded)}`;
  } else {
    // USD: $ 1,250.00
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 2,
    }).format(amount);
  }
}

export function formatPricePerUnit(price: number, currency: Currency, unit: 'kg' | 'lbs'): string {
  if (currency === 'CLP') {
    return `$ ${new Intl.NumberFormat('es-CL', {
      maximumFractionDigits: 0,
    }).format(Math.round(price))} CLP/${unit}`;
  } else {
    return `$ ${price.toFixed(2)} USD/${unit}`;
  }
}

export function formatWeight(weight: number, unit: 'kg' | 'lbs', decimals: number = 1): string {
  return `${new Intl.NumberFormat('es-CL', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  }).format(weight)} ${unit}`;
}
