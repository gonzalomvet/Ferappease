import React from 'react';
import { CalculationResults, Currency, WeightUnit } from '../types';
import { formatCurrency, formatWeight } from '../utils/calculations';

interface ResultsSummaryProps {
  results: CalculationResults;
  currency: Currency;
  weightUnit: WeightUnit;
  headCount: number;
}

export const ResultsSummary: React.FC<ResultsSummaryProps> = ({
  results,
  currency,
  weightUnit,
  headCount,
}) => {
  return (
    <div className="bg-gray-100 text-gray-900 p-6 sm:p-8 rounded-2xl shadow-xs relative overflow-hidden border border-gray-300">
      {/* High Density background watermark */}
      <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
        <svg width="140" height="140" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2v20m10-10H2" />
        </svg>
      </div>

      <div className="relative z-10 space-y-6">
        {/* Top bar with title and badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-300/80 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
            <h2 className="text-xs font-black uppercase text-gray-600 tracking-widest">
              Resumen de Operación y Rendimiento Proyectado
            </h2>
          </div>
          <span className="text-xs font-mono font-bold text-gray-700 bg-white px-3 py-1 rounded-lg border border-gray-300 shadow-2xs self-start sm:self-auto">
            Lote: {headCount} animales
          </span>
        </div>

        {/* 2-Column Metric Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white/80 p-4 rounded-xl border border-gray-200 shadow-2xs">
            <p className="text-gray-600 text-xs sm:text-sm font-bold mb-1">
              Peso Final Promedio (con Merma Reducida)
            </p>
            <p className="text-3xl sm:text-4xl font-mono font-extrabold text-gray-950">
              {formatWeight(results.finalWeightPerHeadWith, weightUnit, 1)}{' '}
              <span className="text-base text-gray-500 font-sans uppercase font-bold">{weightUnit}</span>
            </p>
            <p className="text-xs text-emerald-800 mt-1.5 font-bold flex items-center gap-1">
              <span>+ Retención por FerAppease: {formatWeight(results.weightSavedPerHead, weightUnit, 1)} / animal</span>
            </p>
          </div>

          <div className="bg-white/80 p-4 rounded-xl border border-gray-200 shadow-2xs">
            <p className="text-gray-600 text-xs sm:text-sm font-bold mb-1">
              Inversión Total en Tratamiento ({headCount} dosis)
            </p>
            <p className="text-3xl sm:text-4xl font-mono font-extrabold text-blue-900">
              {formatCurrency(results.totalTreatmentCost, currency)}
            </p>
            <p className="text-xs text-gray-600 mt-1.5 font-medium">
              Costo: {formatCurrency(results.totalTreatmentCost / (headCount || 1), currency)} / cabeza
            </p>
          </div>
        </div>

        {/* Main highlight area */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 px-1">
            <div>
              <p className="text-gray-600 text-xs sm:text-sm font-bold">
                Ingreso Bruto de Venta Proyectado ({currency})
              </p>
              <p className="text-3xl sm:text-5xl font-mono font-black text-gray-950">
                {formatCurrency(results.grossRevenueWith, currency)}
              </p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-xs text-gray-500 font-black uppercase tracking-wider">
                RETORNO DE INVERSIÓN
              </p>
              <p className="text-xl sm:text-2xl font-mono font-black text-emerald-800">
                {Math.round(results.roiPercentage)}% ROI
              </p>
            </div>
          </div>

          {/* Green banner for Net Profit */}
          <div className="bg-emerald-50 border-2 border-emerald-300 p-4 sm:p-5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
            <div>
              <p className="text-emerald-900 text-xs font-black uppercase tracking-wider mb-0.5">
                Ganancia Neta Adicional (Utilidad Limpia)
              </p>
              <p className="text-2xl sm:text-4xl font-mono font-black text-emerald-950">
                {formatCurrency(results.netProfit, currency)}{' '}
                <span className="text-sm font-sans font-extrabold text-emerald-800 sm:ml-2 block sm:inline">
                  +{formatCurrency(results.netProfitPerHead, currency)} / animal
                </span>
              </p>
            </div>
            <div className="bg-emerald-700 text-white px-4 py-2 rounded-lg font-black text-xs tracking-wider uppercase self-start sm:self-center shadow-xs">
              RENTABLE
            </div>
          </div>
        </div>

        {/* Bottom 3-subcard grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-2xs">
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-wider">
              Punto de Equilibrio
            </p>
            <p className="text-sm sm:text-base font-mono font-extrabold text-gray-900 mt-0.5">
              {formatWeight(results.breakEvenWeightKgOrLb, weightUnit, 2)} / animal
            </p>
            <p className="text-[11px] text-gray-500 mt-0.5">paga 100% de la dosis</p>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-2xs">
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-wider">
              Multiplicador de Inversión
            </p>
            <p className="text-sm sm:text-base font-mono font-extrabold text-emerald-800 mt-0.5">
              {results.roiRatio.toFixed(1)}x por cada $1
            </p>
            <p className="text-[11px] text-gray-500 mt-0.5">retorno sobre costo</p>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-2xs">
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-wider">
              Carne Preservada
            </p>
            <p className="text-sm sm:text-base font-mono font-extrabold text-gray-900 mt-0.5">
              +{formatWeight(results.totalWeightSaved, weightUnit, 0)}
            </p>
            <p className="text-[11px] text-gray-500 mt-0.5">retenida del transporte</p>
          </div>
        </div>
      </div>
    </div>
  );
};
