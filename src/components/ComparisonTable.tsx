import React from 'react';
import { CalculationResults, CalculatorInputs } from '../types';
import { formatCurrency, formatWeight, formatPricePerUnit } from '../utils/calculations';
import { ArrowRight, CheckCircle, XCircle, Sparkles } from 'lucide-react';

interface ComparisonTableProps {
  inputs: CalculatorInputs;
  results: CalculationResults;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({
  inputs,
  results,
}) => {
  const { currency, weightUnit, headCount, salePricePerUnit } = inputs;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
      <div className="p-4 sm:p-5 border-b border-gray-100 bg-gray-50/70">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xs font-black uppercase text-gray-400 tracking-tighter">
              Desglose Comparativo
            </h2>
            <h3 className="text-sm font-bold text-gray-900 mt-0.5">
              Sin Tratamiento vs. Con FerAppease®
            </h3>
          </div>
          <span className="inline-flex items-center text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 self-start sm:self-auto">
            <Sparkles className="w-3 h-3 mr-1 text-emerald-600" />
            +80% Retención
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-100/80 text-gray-700 text-[11px] font-bold uppercase tracking-wider">
              <th className="py-2.5 px-4 sm:px-5">Concepto / Métrica</th>
              <th className="py-2.5 px-3 sm:px-4 text-rose-800 bg-rose-50/60">
                <div className="flex items-center gap-1">
                  <XCircle className="w-3.5 h-3.5 text-rose-600" />
                  <span>Sin FerAppease</span>
                </div>
              </th>
              <th className="py-2.5 px-3 sm:px-4 text-emerald-900 bg-emerald-50/70">
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Con FerAppease</span>
                </div>
              </th>
              <th className="py-2.5 px-4 sm:px-5 text-gray-900 bg-gray-100">
                Diferencia Neta
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 font-medium">
            {/* Merma % */}
            <tr className="hover:bg-gray-50/60 transition">
              <td className="py-2.5 px-4 sm:px-5 text-gray-700 font-medium">
                Merma de Transporte (%)
              </td>
              <td className="py-2.5 px-3 sm:px-4 text-rose-700 font-mono bg-rose-50/20">
                {inputs.expectedShrinkPercent.toFixed(1)}%
              </td>
              <td className="py-2.5 px-3 sm:px-4 text-emerald-700 font-bold font-mono bg-emerald-50/30">
                {results.actualShrinkPercentWith.toFixed(2)}%
              </td>
              <td className="py-2.5 px-4 sm:px-5 text-emerald-700 font-bold font-mono bg-gray-50/50">
                -{(inputs.expectedShrinkPercent - results.actualShrinkPercentWith).toFixed(2)}% merma
              </td>
            </tr>

            {/* Pérdida de Peso por Ternero */}
            <tr className="hover:bg-gray-50/60 transition">
              <td className="py-2.5 px-4 sm:px-5 text-gray-700 font-medium">
                Pérdida de Peso / Ternero
              </td>
              <td className="py-2.5 px-3 sm:px-4 text-rose-700 font-mono bg-rose-50/20">
                -{formatWeight(results.shrinkLossPerHeadWithout, weightUnit, 1)}
              </td>
              <td className="py-2.5 px-3 sm:px-4 text-emerald-700 font-mono bg-emerald-50/30">
                -{formatWeight(results.shrinkLossPerHeadWith, weightUnit, 1)}
              </td>
              <td className="py-2.5 px-4 sm:px-5 text-emerald-700 font-bold font-mono bg-gray-50/50">
                +{formatWeight(results.weightSavedPerHead, weightUnit, 1)} retenidos
              </td>
            </tr>

            {/* Peso Final al Pesaje */}
            <tr className="hover:bg-gray-50/60 transition">
              <td className="py-2.5 px-4 sm:px-5 text-gray-700 font-medium">
                Peso Final Promedio al Pesaje
              </td>
              <td className="py-2.5 px-3 sm:px-4 text-gray-700 font-mono bg-rose-50/20">
                {formatWeight(results.finalWeightPerHeadWithout, weightUnit, 1)}
              </td>
              <td className="py-2.5 px-3 sm:px-4 text-emerald-900 font-bold font-mono bg-emerald-50/30">
                {formatWeight(results.finalWeightPerHeadWith, weightUnit, 1)}
              </td>
              <td className="py-2.5 px-4 sm:px-5 text-emerald-700 font-bold font-mono bg-gray-50/50">
                +{formatWeight(results.weightSavedPerHead, weightUnit, 1)} / ternero
              </td>
            </tr>

            {/* Kilos Totales Comercializados del Lote */}
            <tr className="hover:bg-gray-50/60 transition">
              <td className="py-2.5 px-4 sm:px-5 text-gray-700 font-medium">
                Kilos Totales Comercializados ({headCount} cabezas)
              </td>
              <td className="py-2.5 px-3 sm:px-4 text-gray-700 font-mono bg-rose-50/20">
                {formatWeight(results.totalFinalWeightWithout, weightUnit, 0)}
              </td>
              <td className="py-2.5 px-3 sm:px-4 text-emerald-900 font-bold font-mono bg-emerald-50/30">
                {formatWeight(results.totalFinalWeightWith, weightUnit, 0)}
              </td>
              <td className="py-2.5 px-4 sm:px-5 text-emerald-700 font-bold font-mono bg-gray-50/50">
                +{formatWeight(results.totalWeightSaved, weightUnit, 0)} de carne
              </td>
            </tr>

            {/* Ingreso Bruto por Venta */}
            <tr className="hover:bg-gray-50/60 transition">
              <td className="py-2.5 px-4 sm:px-5 text-gray-700 font-medium">
                Ingreso Bruto de Venta
              </td>
              <td className="py-2.5 px-3 sm:px-4 text-gray-700 font-mono bg-rose-50/20">
                {formatCurrency(results.grossRevenueWithout, currency)}
              </td>
              <td className="py-2.5 px-3 sm:px-4 text-emerald-900 font-bold font-mono bg-emerald-50/30">
                {formatCurrency(results.grossRevenueWith, currency)}
              </td>
              <td className="py-2.5 px-4 sm:px-5 text-emerald-700 font-bold font-mono bg-gray-50/50">
                +{formatCurrency(results.grossExtraRevenue, currency)}
              </td>
            </tr>

            {/* Costo del Tratamiento */}
            <tr className="hover:bg-gray-50/60 transition">
              <td className="py-2.5 px-4 sm:px-5 text-gray-700 font-medium">
                Costo Tratamiento FerAppease
              </td>
              <td className="py-2.5 px-3 sm:px-4 text-gray-400 font-mono bg-rose-50/20">
                $0
              </td>
              <td className="py-2.5 px-3 sm:px-4 text-gray-600 font-mono bg-emerald-50/30">
                -{formatCurrency(results.totalTreatmentCost, currency)}
              </td>
              <td className="py-2.5 px-4 sm:px-5 text-gray-600 font-mono bg-gray-50/50">
                {formatCurrency(inputs.costPerDose, currency)} / dosis
              </td>
            </tr>

            {/* Ingreso Neto Final */}
            <tr className="bg-emerald-50/90 font-bold text-gray-900 border-t border-emerald-300">
              <td className="py-3 px-4 sm:px-5 text-emerald-950 font-bold">
                Ingreso Neto Final (descontando tratamiento)
              </td>
              <td className="py-3 px-3 sm:px-4 text-gray-800 font-mono">
                {formatCurrency(results.grossRevenueWithout, currency)}
              </td>
              <td className="py-3 px-3 sm:px-4 text-emerald-900 font-bold font-mono bg-emerald-100/50">
                {formatCurrency(results.grossRevenueWith - results.totalTreatmentCost, currency)}
              </td>
              <td className="py-3 px-4 sm:px-5 text-emerald-800 font-bold font-mono bg-emerald-200/40">
                +{formatCurrency(results.netProfit, currency)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
