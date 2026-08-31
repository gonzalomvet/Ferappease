import React from 'react';
import { CalculationResults, Currency, WeightUnit } from '../types';
import { formatCurrency, formatWeight } from '../utils/calculations';
import { 
  TrendingUp, 
  DollarSign, 
  Scale, 
  Sparkles,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';

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
    <div className="bg-gray-900 text-white p-6 sm:p-8 rounded-2xl shadow-xl relative overflow-hidden border border-gray-800">
      {/* High Density background watermark */}
      <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
        <svg width="140" height="140" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2v20m10-10H2" />
        </svg>
      </div>

      <div className="relative z-10 space-y-6">
        {/* Top bar with title and badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <h2 className="text-xs font-black uppercase text-gray-400 tracking-widest">
              Resumen de Operación y Rendimiento Proyectado
            </h2>
          </div>
          <span className="text-xs font-mono font-bold text-gray-400 bg-gray-800/80 px-2.5 py-1 rounded border border-gray-700 self-start sm:self-auto">
            Lote: {headCount} terneros
          </span>
        </div>

        {/* 2-Column High Density Metric Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-400 text-xs sm:text-sm font-medium mb-1">
              Peso Final Promedio (con Merma Reducida)
            </p>
            <p className="text-3xl sm:text-4xl font-mono font-bold text-white">
              {formatWeight(results.finalWeightPerHeadWith, weightUnit, 1)}{' '}
              <span className="text-lg text-gray-500 font-sans uppercase font-bold">{weightUnit}</span>
            </p>
            <p className="text-[11px] text-emerald-400 mt-1 font-bold flex items-center gap-1">
              <span>+ Retención por FerAppease: {formatWeight(results.weightSavedPerHead, weightUnit, 1)} / ternero</span>
            </p>
          </div>

          <div>
            <p className="text-gray-400 text-xs sm:text-sm font-medium mb-1">
              Inversión Total en Tratamiento ({headCount} dosis)
            </p>
            <p className="text-3xl sm:text-4xl font-mono font-bold text-blue-400">
              {formatCurrency(results.totalTreatmentCost, currency)}
            </p>
            <p className="text-[11px] text-gray-500 mt-1 font-medium">
              Costo: {formatCurrency(results.totalTreatmentCost / (headCount || 1), currency)} / cabeza
            </p>
          </div>
        </div>

        <div className="h-px bg-gray-800 w-full"></div>

        {/* Main highlight area */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <p className="text-gray-400 text-xs sm:text-sm font-medium">
                Ingreso Bruto de Venta Proyectado ({currency})
              </p>
              <p className="text-3xl sm:text-5xl font-mono font-bold text-emerald-400">
                {formatCurrency(results.grossRevenueWith, currency)}
              </p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                RETORNO DE INVERSIÓN
              </p>
              <p className="text-xl sm:text-2xl font-mono font-bold text-white">
                {Math.round(results.roiPercentage)}% ROI
              </p>
            </div>
          </div>

          {/* Green banner for Net Profit */}
          <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 sm:p-5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="text-emerald-400 text-xs font-black uppercase tracking-wider mb-0.5">
                Ganancia Neta Adicional (Utilidad Limpia)
              </p>
              <p className="text-2xl sm:text-4xl font-mono font-bold text-white">
                {formatCurrency(results.netProfit, currency)}{' '}
                <span className="text-sm font-sans font-bold text-emerald-400 sm:ml-2 block sm:inline">
                  +{formatCurrency(results.netProfitPerHead, currency)} / ternero
                </span>
              </p>
            </div>
            <div className="bg-emerald-500 text-gray-950 px-3.5 py-1.5 rounded font-black text-xs tracking-wider uppercase self-start sm:self-center shadow-xs">
              RENTABLE
            </div>
          </div>
        </div>

        {/* Bottom 3-subcard grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
          <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700/80">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
              Punto de Equilibrio
            </p>
            <p className="text-sm font-mono font-bold text-white mt-0.5">
              {formatWeight(results.breakEvenWeightKgOrLb, weightUnit, 2)} / ternero
            </p>
            <p className="text-[10px] text-gray-500 mt-0.5">paga 100% de la dosis</p>
          </div>

          <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700/80">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
              Multiplicador de Inversión
            </p>
            <p className="text-sm font-mono font-bold text-emerald-400 mt-0.5">
              {results.roiRatio.toFixed(1)}x por cada $1
            </p>
            <p className="text-[10px] text-gray-500 mt-0.5">retorno sobre costo</p>
          </div>

          <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700/80">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
              Carne
            </p>
            <p className="text-sm font-mono font-bold text-white mt-0.5">
              +{formatWeight(results.totalWeightSaved, weightUnit, 0)}
            </p>
            <p className="text-[10px] text-gray-500 mt-0.5">preservada del catabolismo</p>
          </div>
        </div>
      </div>
    </div>
  );
};
