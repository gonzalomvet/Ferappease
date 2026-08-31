import React, { useState, useMemo } from 'react';
import { CalculatorInputs, Currency, WeightUnit, PresetScenario } from './types';
import { calculateROI, PRESET_SCENARIOS } from './utils/calculations';
import { Header } from './components/Header';
import { CurrencyAndUnitSwitch } from './components/CurrencyAndUnitSwitch';
import { CalculatorForm } from './components/CalculatorForm';
import { ResultsSummary } from './components/ResultsSummary';
import { ComparisonTable } from './components/ComparisonTable';
import { VisualChart } from './components/VisualChart';
import { TechnicalGuideModal } from './components/TechnicalGuideModal';
import { VeterquimicaModal } from './components/VeterquimicaModal';
import { PrintReportModal } from './components/PrintReportModal';
import { ShieldCheck, HelpCircle, Building2, CheckCircle2, Sparkles, Activity } from 'lucide-react';

export default function App() {
  // Main Calculator State with Chilean Peso ($ CLP / kg) default as requested
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

  // Modals state
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isVeterquimicaOpen, setIsVeterquimicaOpen] = useState(false);
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

  // Currency switch handler with smooth default value adjustments
  const handleCurrencyChange = (newCurrency: Currency) => {
    if (newCurrency === inputs.currency) return;

    if (newCurrency === 'CLP') {
      // Switch to CLP
      setInputs((prev) => ({
        ...prev,
        currency: 'CLP',
        weightUnit: 'kg',
        avgWeight: prev.weightUnit === 'lbs' ? Math.round(prev.avgWeight * 0.453592) : prev.avgWeight,
        salePricePerUnit: 2850, // $2.850 CLP/kg
        costPerDose: 3000, // $3.000 CLP
      }));
    } else {
      // Switch to USD
      setInputs((prev) => ({
        ...prev,
        currency: 'USD',
        salePricePerUnit: prev.weightUnit === 'kg' ? 3.00 : 2.65,
        costPerDose: 3.00, // $3.00 USD
      }));
    }
  };

  // Weight Unit switch handler
  const handleWeightUnitChange = (newUnit: WeightUnit) => {
    if (newUnit === inputs.weightUnit) return;

    if (newUnit === 'lbs') {
      // kg to lbs
      setInputs((prev) => ({
        ...prev,
        weightUnit: 'lbs',
        avgWeight: Math.round(prev.avgWeight * 2.20462),
        salePricePerUnit: prev.currency === 'CLP' 
          ? Math.round(prev.salePricePerUnit / 2.20462) 
          : Number((prev.salePricePerUnit / 2.20462).toFixed(2)),
      }));
    } else {
      // lbs to kg
      setInputs((prev) => ({
        ...prev,
        weightUnit: 'kg',
        avgWeight: Math.round(prev.avgWeight * 0.453592),
        salePricePerUnit: prev.currency === 'CLP' 
          ? Math.round(prev.salePricePerUnit * 2.20462) 
          : Number((prev.salePricePerUnit * 2.20462).toFixed(2)),
      }));
    }
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
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenPrint={() => setIsPrintOpen(true)}
        onOpenVeterquimica={() => setIsVeterquimicaOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 space-y-5">
        {/* Currency and Weight Unit Selector */}
        <CurrencyAndUnitSwitch
          currency={inputs.currency}
          weightUnit={inputs.weightUnit}
          onCurrencyChange={handleCurrencyChange}
          onWeightUnitChange={handleWeightUnitChange}
        />

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

        {/* Quick Scientific Trust Card */}
        <div className="bg-gray-900 text-white rounded-2xl p-5 border border-gray-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 border border-emerald-400/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-xs sm:text-sm">
                Eficacia Comprobada de FerAppease® (MBAS)
              </h4>
              <p className="text-xs text-gray-400 mt-0.5">
                Modula el eje neuroendocrino del estrés en el ternero, preservando tejido muscular y condición corporal durante viajes y destete.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsGuideOpen(true)}
            className="px-3.5 py-2 text-xs font-bold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-gray-950 transition whitespace-nowrap self-stretch sm:self-auto text-center shadow-xs"
          >
            Ficha Técnica
          </button>
        </div>
      </main>

      {/* High Density Footer */}
      <footer className="bg-white border-t border-gray-200 text-gray-500 text-xs py-5 mt-10 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="font-bold text-gray-900">
              Calculador FerAppease
            </span>
            <span className="text-gray-300">|</span>
            <span className="text-gray-500 text-[11px]">
              Formulación $ CLP / Kilo Vivo de Carne en Pie
            </span>
          </div>

          <div className="flex items-center gap-4 text-gray-600 font-semibold text-[11px]">
            <button
              type="button"
              onClick={() => setIsVeterquimicaOpen(true)}
              className="hover:text-gray-900 transition underline underline-offset-2"
            >
              Veterquímica Chile
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => setIsGuideOpen(true)}
              className="hover:text-gray-900 transition underline underline-offset-2"
            >
              Protocolo de Aplicación
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <TechnicalGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      <VeterquimicaModal
        isOpen={isVeterquimicaOpen}
        onClose={() => setIsVeterquimicaOpen(false)}
      />

      <PrintReportModal
        isOpen={isPrintOpen}
        onClose={() => setIsPrintOpen(false)}
        inputs={inputs}
        results={results}
      />
    </div>
  );
}
