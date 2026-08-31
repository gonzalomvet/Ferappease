import React from 'react';
import { CalculationResults, CalculatorInputs } from '../types';
import { formatCurrency, formatWeight } from '../utils/calculations';
import { Scale, TrendingUp, ArrowDownRight, ArrowUpRight, CheckCircle2, AlertTriangle } from 'lucide-react';

interface VisualChartProps {
  inputs: CalculatorInputs;
  results: CalculationResults;
}

export const VisualChart: React.FC<VisualChartProps> = ({ inputs, results }) => {
  const { currency, weightUnit, headCount } = inputs;
  const isCLP = currency === 'CLP';

  const startWeight = inputs.avgWeight;
  const weightWithout = results.finalWeightPerHeadWithout;
  const weightWith = results.finalWeightPerHeadWith;
  const lossWithout = results.shrinkLossPerHeadWithout;
  const lossWith = results.shrinkLossPerHeadWith;
  const savedWeight = results.weightSavedPerHead;

  // Normalized visual height for realistic bar representation
  const maxWeight = startWeight > 0 ? startWeight : 220;
  const minVisualHeight = 65; // base percentage so text fits nicely
  const heightOrigin = 100;
  const heightWithout = Math.max(minVisualHeight, (weightWithout / maxWeight) * 100);
  const heightWith = Math.max(minVisualHeight, (weightWith / maxWeight) * 100);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-5 sm:p-6 space-y-5">
      {/* Title Header */}
      <div className="border-b border-gray-100 pb-3">
        <h2 className="text-xs font-black uppercase text-gray-400 tracking-tighter">
          Calculo Merma por Transporte
        </h2>
        <h3 className="text-sm font-bold text-gray-900 mt-0.5">
          Pérdida de Kilos y Peso en Destino por Ternero ({weightUnit})
        </h3>
      </div>

      {/* Gráfico de Barras Vertical */}
      <div className="bg-[#f8fafc] rounded-2xl p-4 sm:p-6 border border-gray-200/80">
        {/* Y-axis indicator / Chart Container */}
        <div className="h-80 sm:h-96 flex items-end justify-around gap-2 sm:gap-6 pt-10 pb-2 px-1 sm:px-4 relative">
          {/* Reference Grid lines */}
          <div className="absolute inset-x-4 top-8 border-b border-dashed border-gray-300 flex justify-between text-[10px] text-gray-400 font-mono">
            <span>Peso Inicial en Predio (100%)</span>
            <span>{formatWeight(startWeight, weightUnit, 0)}</span>
          </div>
          <div className="absolute inset-x-4 top-1/2 border-b border-dashed border-gray-200"></div>

          {/* Bar 1: Peso en Origen */}
          <div className="flex-1 flex flex-col items-center h-full justify-end max-w-[140px]">
            {/* Top Badge */}
            <div className="mb-2 text-center">
              <span className="text-xs sm:text-sm font-mono font-extrabold text-gray-900 bg-white px-2.5 py-1 rounded-lg border border-gray-300 shadow-2xs block">
                {formatWeight(startWeight, weightUnit, 1)}
              </span>
              <span className="text-[10px] text-gray-400 font-bold block mt-0.5">
                Peso Inicial
              </span>
            </div>

            {/* Vertical Bar */}
            <div className="w-full flex-1 flex items-end">
              <div 
                className="w-full rounded-t-2xl bg-gray-500 border-t-2 border-x-2 border-gray-600 shadow-xs transition-all duration-500 flex flex-col justify-between p-2.5 sm:p-3 relative overflow-hidden"
                style={{ height: `${heightOrigin}%` }}
              >
                <div className="text-center">
                  <span className="inline-block px-2 py-0.5 rounded bg-gray-700/80 text-[10px] font-bold text-gray-100 uppercase tracking-wider">
                    Predio
                  </span>
                </div>

                {/* Info Inside Column */}
                <div className="my-auto py-2 text-center">
                  <div className="bg-gray-700/70 backdrop-blur-xs rounded-xl p-2 border border-gray-400/30 text-white">
                    <span className="text-[10px] uppercase font-bold text-gray-300 block">
                      Sin Pérdida
                    </span>
                    <span className="text-xs sm:text-sm font-bold font-mono text-white block mt-0.5">
                      0 kg
                    </span>
                  </div>
                </div>

                <div className="text-center pt-1 border-t border-gray-400/30">
                  <span className="text-[10px] text-gray-200 block">Pesa</span>
                  <span className="text-xs sm:text-sm font-mono font-bold text-white block">
                    {formatWeight(startWeight, weightUnit, 0)}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Label */}
            <div className="mt-3 text-center">
              <div className="text-xs font-bold text-gray-800">
                Peso Origen
              </div>
              <div className="text-[10px] text-gray-400">
                100% peso vivo
              </div>
            </div>
          </div>

          {/* Bar 2: Sin FerAppease */}
          <div className="flex-1 flex flex-col items-center h-full justify-end max-w-[140px]">
            {/* Top Badge */}
            <div className="mb-2 text-center">
              <span className="text-xs sm:text-sm font-mono font-extrabold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-300 shadow-2xs block">
                {formatWeight(weightWithout, weightUnit, 1)}
              </span>
              <span className="text-[10px] text-rose-600 font-bold block mt-0.5">
                -{inputs.expectedShrinkPercent}% merma
              </span>
            </div>

            {/* Vertical Bar */}
            <div className="w-full flex-1 flex items-end">
              <div 
                className="w-full rounded-t-2xl bg-rose-600 border-t-2 border-x-2 border-rose-700 shadow-xs transition-all duration-500 flex flex-col justify-between p-2.5 sm:p-3 relative overflow-hidden"
                style={{ height: `${heightWithout}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-rose-700 to-rose-500 opacity-90" />
                
                <div className="relative z-10 text-center">
                  <span className="inline-block px-2 py-0.5 rounded bg-rose-900/60 text-[10px] font-bold text-white uppercase tracking-wider">
                    Sin Producto
                  </span>
                </div>

                {/* DESTACADO VISUAL: KILOS QUE SE PIERDEN */}
                <div className="relative z-10 my-auto py-1 text-center">
                  <div className="bg-rose-950/70 backdrop-blur-xs rounded-xl p-2 border border-rose-300/40 text-white shadow-xs">
                    <div className="flex items-center justify-center gap-1 text-rose-200">
                      <ArrowDownRight className="w-3 h-3 text-rose-300" />
                      <span className="text-[10px] uppercase font-black tracking-tight">
                        Pierde
                      </span>
                    </div>
                    <span className="text-sm sm:text-base font-extrabold font-mono text-white block leading-tight mt-0.5">
                      -{formatWeight(lossWithout, weightUnit, 1)}
                    </span>
                    <span className="text-[9px] text-rose-200 font-semibold block">
                      por animal
                    </span>
                  </div>
                </div>

                <div className="relative z-10 text-center pt-1 border-t border-rose-400/30">
                  <span className="text-[10px] text-rose-100 block">Llega con</span>
                  <span className="text-xs sm:text-sm font-mono font-bold text-white block">
                    {formatWeight(weightWithout, weightUnit, 0)}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Label */}
            <div className="mt-3 text-center">
              <div className="text-xs font-bold text-rose-800 flex items-center justify-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600 inline" />
                <span>Sin FerAppease</span>
              </div>
              <div className="text-[10px] text-rose-600 font-semibold">
                Pérdida máxima
              </div>
            </div>
          </div>

          {/* Bar 3: Con FerAppease */}
          <div className="flex-1 flex flex-col items-center h-full justify-end max-w-[140px]">
            {/* Top Badge */}
            <div className="mb-2 text-center">
              <span className="text-xs sm:text-sm font-mono font-extrabold text-emerald-950 bg-emerald-100 px-2.5 py-1 rounded-lg border-2 border-emerald-400 shadow-2xs block">
                {formatWeight(weightWith, weightUnit, 1)}
              </span>
              <span className="text-[10px] text-emerald-800 font-bold block mt-0.5">
                -{results.actualShrinkPercentWith.toFixed(1)}% merma
              </span>
            </div>

            {/* Vertical Bar */}
            <div className="w-full flex-1 flex items-end">
              <div 
                className="w-full rounded-t-2xl bg-emerald-600 border-t-2 border-x-2 border-emerald-700 shadow-md transition-all duration-500 flex flex-col justify-between p-2.5 sm:p-3 relative overflow-hidden"
                style={{ height: `${heightWith}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-800 to-emerald-500 opacity-95" />
                
                <div className="relative z-10 text-center">
                  <span className="inline-block px-2 py-0.5 rounded bg-emerald-950/70 text-[10px] font-bold text-emerald-200 uppercase tracking-wider">
                    Con FerAppease
                  </span>
                </div>

                {/* DESTACADO VISUAL: KILOS QUE SE PIERDEN Y AHORRAN */}
                <div className="relative z-10 my-auto py-1 text-center space-y-1">
                  {/* Kilos perdidos (muy reducidos) */}
                  <div className="bg-emerald-950/75 backdrop-blur-xs rounded-xl p-1.5 border border-emerald-300/40 text-white shadow-xs">
                    <div className="flex items-center justify-center gap-1 text-emerald-200">
                      <span className="text-[9px] uppercase font-bold tracking-tight">
                        Pierde solo:
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm font-bold font-mono text-emerald-100 block leading-tight">
                      -{formatWeight(lossWith, weightUnit, 1)}
                    </span>
                  </div>

                  {/* Kilos rescatados / retenidos */}
                  <div className="bg-amber-400 text-gray-950 rounded-lg px-1.5 py-1 font-bold shadow-xs">
                    <div className="flex items-center justify-center gap-0.5 text-[9px] uppercase tracking-tighter">
                      <ArrowUpRight className="w-3 h-3 text-gray-950 inline" />
                      <span>Retiene</span>
                    </div>
                    <div className="text-xs sm:text-sm font-extrabold font-mono leading-none">
                      +{formatWeight(savedWeight, weightUnit, 1)}
                    </div>
                  </div>
                </div>

                <div className="relative z-10 text-center pt-1 border-t border-emerald-400/30">
                  <span className="text-[10px] text-emerald-100 block">Llega con</span>
                  <span className="text-xs sm:text-sm font-mono font-bold text-white block">
                    {formatWeight(weightWith, weightUnit, 0)}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Label */}
            <div className="mt-3 text-center">
              <div className="text-xs font-bold text-emerald-950 flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline" />
                <span>Con FerAppease</span>
              </div>
              <div className="text-[10px] text-emerald-700 font-semibold">
                80% menos merma
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        <div className="bg-emerald-50/70 rounded-xl p-3.5 border border-emerald-200/80">
          <div className="flex items-center gap-1.5 text-emerald-900 font-bold text-xs mb-1">
            <Scale className="w-4 h-4 text-emerald-600" />
            <span>Rendimiento Lote ({headCount} cabezas)</span>
          </div>
          <div className="text-base font-bold text-emerald-950 font-mono">
            +{formatWeight(results.totalWeightSaved, weightUnit, 0)} carne
          </div>
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
  );
};
