import React, { useState, useMemo } from 'react';
import { CalculatorInputs, PresetScenario } from './types';
import { calculateROI } from './utils/calculations';
import { Header } from './components/Header';
import { CalculatorForm } from './components/CalculatorForm';
import { ResultsSummary } from './components/ResultsSummary';
import { ComparisonTable } from './components/ComparisonTable';
import { VisualChart } from './components/VisualChart';
import { PrintReportModal } from './components/PrintReportModal';

export default function App() {
  // Main Calculator State with Chilean Peso ($ CLP / kg) default
  const [inputs, setInputs] = useState<CalculatorInputs>({
    headCount: 100,
    avgWeight: 220,
    weightUnit: 'kg',
    currency: 'CLP',
    salePricePerUnit: 2850, // $2.850 CLP por kilo de carne en pie
    expectedShrinkPercent: 7.0, // 7.0% merma típica
    shrinkReductionPercent: 80, // 80% reducción demostrada con FerAppease
    costPerDose: 3000, // $3.000 CLP por dosis (10 mL)
    extraWeightGain: 0,
  });

  const [activePresetId, setActivePresetId] = useState<string | null>('transporte_medio');
  const [isPrintOpen, setIsPrintOpen] = useState(false);

  // Recalculate results in real-time
  const results = useMemo(() => calculateROI(inputs), [inputs]);

  // Handle updates to inputs
  const handleInputChange = (updates: Partial<CalculatorInputs>) => {
    setInputs((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  // Preset scenario selection handler
  const handleSelectPreset = (preset: PresetScenario) => {
    setActivePresetId(preset.id);
    setInputs((prev) => ({
      ...prev,
      expectedShrinkPercent: preset.shrinkPercent,
      shrinkReductionPercent: preset.reductionPercent,
    }));
  };

  return (
    <div className="min-h-screen bg-[#f4f7f6] text-[#1a1a1a] flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* Header */}
      <Header
        onOpenPrint={() => setIsPrintOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 space-y-5">
        {/* Interactive Layout: Form Inputs on Left, Charts & Detail on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Inputs Column */}
          <div className="lg:col-span-6 space-y-5">
            <CalculatorForm
              inputs={inputs}
              onChange={handleInputChange}
              onSelectPreset={handleSelectPreset}
              activePresetId={activePresetId}
            />
          </div>

          {/* Outputs Column: Comparison Table & Visual Charts */}
          <div className="lg:col-span-6 space-y-5">
            {/* Visual Weight Retention & Sensitivity Matrix */}
            <VisualChart
              inputs={inputs}
              results={results}
            />

            {/* Comprehensive Comparison Table */}
            <ComparisonTable
              inputs={inputs}
              results={results}
            />
          </div>
        </div>

        {/* Results Summary (Resumen de Operación al final) */}
        <ResultsSummary
          results={results}
          currency={inputs.currency}
          weightUnit={inputs.weightUnit}
          headCount={inputs.headCount}
        />
      </main>

      {/* High Density Minimal Footer */}
      <footer className="bg-white border-t border-gray-200 text-gray-500 text-xs py-4 mt-8 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="font-bold text-gray-900">
              Calculador FerAppease
            </span>
            <span className="text-gray-300">|</span>
            <span className="text-gray-500 text-[11px]">
              Valores en Pesos Chilenos ($ CLP) y Kilos (kg)
            </span>
          </div>
          <p className="text-[11px] text-gray-400">
            Proyección referencial para transporte y comercialización de ganado
          </p>
        </div>
      </footer>

      {/* Print / Export Report Modal */}
      <PrintReportModal
        isOpen={isPrintOpen}
        onClose={() => setIsPrintOpen(false)}
        inputs={inputs}
        results={results}
      />
    </div>
  );
}
