import React, { useState } from 'react';
import { CalculationResults, CalculatorInputs } from '../types';
import { formatCurrency, formatWeight, formatPricePerUnit, calculateROI } from '../utils/calculations';
import { BarChart3, Scale, TrendingUp, DollarSign } from 'lucide-react';

interface VisualChartProps {
  inputs: CalculatorInputs;
  results: CalculationResults;
}

export const VisualChart: React.FC<VisualChartProps> = ({ inputs, results }) => {
  const [activeTab, setActiveTab] = useState<'visual' | 'sensitivity'>('visual');

  const { currency, weightUnit, headCount, salePricePerUnit } = inputs;
  const isCLP = currency === 'CLP';

  // Sensitivity Matrix Calculations
  const priceVariations = [
    { label: '-15%', factor: 0.85 },
    { label: '-10%', factor: 0.90 },
    { label: 'Precio Actual', factor: 1.00 },
    { label: '+10%', factor: 1.10 },
    { label: '+15%', factor: 1.15 },
  ];

  const shrinkVariations = [
    { label: '4.5% (Corta)', shrink: 4.5 },
    { label: '7.0% (Media)', shrink: 7.0 },
    { label: '9.5% (Larga)', shrink: 9.5 },
  ];

  // Visual weight percentages for horizontal bar
  const startWeight = inputs.avgWeight;
  const weightWithout = results.finalWeightPerHeadWithout;
  const weightWith = results.finalWeightPerHeadWith;
  const lossWithout = results.shrinkLossPerHeadWithout;
  const lossWith = results.shrinkLossPerHeadWith;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-5 sm:p-6 space-y-5">
      {/* Header with tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3.5">
        <div>
          <h2 className="text-xs font-black uppercase text-gray-400 tracking-tighter">
            Análisis y Proyección
          </h2>
          <h3 className="text-sm font-bold text-gray-900 mt-0.5">
            Retención de Peso &amp; Matriz de Sensibilidad
          </h3>
        </div>

        <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('visual')}
            className={`px-3 py-1 rounded-md text-xs font-bold transition ${
              activeTab === 'visual'
                ? 'bg-white text-gray-900 shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Retención Visual
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('sensitivity')}
            className={`px-3 py-1 rounded-md text-xs font-bold transition ${
              activeTab === 'sensitivity'
                ? 'bg-white text-gray-900 shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Matriz de Precios
          </button>
        </div>
      </div>

      {activeTab === 'visual' ? (
        <div className="space-y-5">
          {/* Weight comparison bars */}
          <div className="space-y-3.5">
            <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
              Comparación de Peso Promedio al Llegar al Pesaje / Remate
            </h4>

            {/* Baseline initial weight */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-gray-600">
                <span>Peso Inicial en Origen</span>
                <span className="font-mono text-gray-900 font-bold">
                  {formatWeight(startWeight, weightUnit, 1)} (100%)
                </span>
              </div>
              <div className="w-full h-6 bg-gray-100 rounded-lg overflow-hidden relative flex items-center px-3 border border-gray-200">
                <div className="h-full bg-gray-300 absolute left-0 top-0 w-full" />
                <span className="relative z-10 text-[11px] font-bold text-gray-800">
                  Peso de Origen
                </span>
              </div>
            </div>

            {/* Without FerAppease */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-rose-700">
                <span>Sin FerAppease (Merma -{formatWeight(lossWithout, weightUnit, 1)})</span>
                <span className="font-mono font-bold text-rose-700">
                  {formatWeight(weightWithout, weightUnit, 1)} ({(100 - inputs.expectedShrinkPercent).toFixed(1)}%)
                </span>
              </div>
              <div className="w-full h-7 bg-gray-100 rounded-lg overflow-hidden relative flex items-center px-3 border border-rose-200">
                <div 
                  className="h-full bg-rose-500 absolute left-0 top-0 transition-all duration-500 rounded-l-lg"
                  style={{ width: `${100 - inputs.expectedShrinkPercent}%` }}
                />
                <div 
                  className="h-full bg-rose-100 absolute top-0 right-0 flex items-center justify-center text-[10px] font-bold text-rose-900 transition-all duration-500"
                  style={{ width: `${inputs.expectedShrinkPercent}%` }}
                >
                  <span className="truncate px-1">-{inputs.expectedShrinkPercent}%</span>
                </div>
                <span className="relative z-10 text-[11px] font-bold text-white">
                  {formatWeight(weightWithout, weightUnit, 1)}
                </span>
              </div>
            </div>

            {/* With FerAppease */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-emerald-800">
                <span>Con FerAppease (Merma reducida a -{formatWeight(lossWith, weightUnit, 1)})</span>
                <span className="font-mono font-bold text-emerald-700">
                  {formatWeight(weightWith, weightUnit, 1)} ({(100 - results.actualShrinkPercentWith).toFixed(1)}%)
                </span>
              </div>
              <div className="w-full h-7 bg-gray-100 rounded-lg overflow-hidden relative flex items-center px-3 border border-emerald-300">
                <div 
                  className="h-full bg-emerald-600 absolute left-0 top-0 transition-all duration-500 rounded-l-lg"
                  style={{ width: `${100 - results.actualShrinkPercentWith}%` }}
                />
                <div 
                  className="h-full bg-emerald-100 absolute top-0 right-0 flex items-center justify-center text-[10px] font-bold text-emerald-900 transition-all duration-500"
                  style={{ width: `${results.actualShrinkPercentWith}%` }}
                >
                  <span className="truncate px-1">-{results.actualShrinkPercentWith.toFixed(1)}%</span>
                </div>
                <span className="relative z-10 text-[11px] font-bold text-white flex items-center gap-1">
                  <span>{formatWeight(weightWith, weightUnit, 1)} comercializado</span>
                  <span className="bg-emerald-800 text-white text-[9px] px-1.5 py-0.2 rounded font-mono font-bold ml-1.5">
                    +{formatWeight(results.weightSavedPerHead, weightUnit, 1)}
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Quick summary metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="bg-emerald-50/60 rounded-xl p-3.5 border border-emerald-200/80">
              <div className="flex items-center gap-1.5 text-emerald-900 font-bold text-xs mb-1">
                <Scale className="w-4 h-4 text-emerald-600" />
                <span>Rendimiento Lote ({headCount} cabezas)</span>
              </div>
              <div className="text-base font-bold text-emerald-950 font-mono">
                +{formatWeight(results.totalWeightSaved, weightUnit, 0)} carne
              </div>
              <p className="text-[11px] text-emerald-700 mt-0.5">
                Equivalente a {(results.totalWeightSaved / inputs.avgWeight).toFixed(1)} terneros completos adicionales.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-3.5 border border-gray-200">
              <div className="flex items-center gap-1.5 text-gray-800 font-bold text-xs mb-1">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span>Multiplicador Económico</span>
              </div>
              <div className="text-base font-bold text-gray-900 font-mono">
                {results.roiRatio.toFixed(1)} a 1 ({formatCurrency((results.roiRatio || 0) * (isCLP ? 10000 : 10), currency)} por cada {isCLP ? '$10.000 CLP' : '$10 USD'})
              </div>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Retorno directo en la liquidación de venta.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Sensitivity Matrix Table */
        <div className="space-y-3">
          <div>
            <h4 className="text-xs font-bold text-gray-900">
              Matriz de Sensibilidad: Ganancia Neta Total según Precio y Merma
            </h4>
            <p className="text-[11px] text-gray-500">
              Utilidad neta para el lote completo ({headCount} terneros):
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100 text-gray-700 font-bold uppercase text-[10px]">
                <tr>
                  <th className="py-2 px-3 border-b border-gray-200">Precio / Kilo</th>
                  {shrinkVariations.map((sv, idx) => (
                    <th key={idx} className="py-2 px-3 border-b border-gray-200 text-center">
                      {sv.label} ({sv.shrink}%)
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-mono">
                {priceVariations.map((pv, pIdx) => {
                  const testPrice = salePricePerUnit * pv.factor;
                  const isCurrent = pv.factor === 1;

                  return (
                    <tr 
                      key={pIdx}
                      className={isCurrent ? 'bg-emerald-50 font-bold text-emerald-950' : 'hover:bg-gray-50'}
                    >
                      <td className="py-2 px-3 font-semibold text-gray-800">
                        <div className="flex items-center gap-1">
                          <span className="font-sans text-xs">{pv.label}:</span>
                          <span className="text-emerald-800">
                            {formatPricePerUnit(testPrice, currency, weightUnit)}
                          </span>
                        </div>
                      </td>
                      {shrinkVariations.map((sv, sIdx) => {
                        const testSim = calculateROI({
                          ...inputs,
                          salePricePerUnit: testPrice,
                          expectedShrinkPercent: sv.shrink,
                        });

                        return (
                          <td key={sIdx} className="py-2 px-3 text-center">
                            <span className="font-bold text-emerald-700">
                              {formatCurrency(testSim.netProfit, currency)}
                            </span>
                            <div className="text-[10px] text-gray-500 font-sans">
                              +{formatCurrency(testSim.netProfitPerHead, currency)}/cab
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
