import React, { useState } from 'react';
import { CalculationResults, CalculatorInputs } from '../types';
import { formatCurrency, formatWeight, formatPricePerUnit } from '../utils/calculations';
import { X, Printer, Copy, Check, FileCheck, ShieldCheck, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PrintReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  inputs: CalculatorInputs;
  results: CalculationResults;
}

export const PrintReportModal: React.FC<PrintReportModalProps> = ({
  isOpen,
  onClose,
  inputs,
  results,
}) => {
  const [producerName, setProducerName] = useState('');
  const [farmName, setFarmName] = useState('');
  const [destination, setDestination] = useState('Feria Ganadera / Remate');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const today = new Date().toLocaleDateString('es-CL', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const handlePrint = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch {
      // ignore
    }
    window.print();
  };

  const handleCopyText = () => {
    const summaryText = `
INFORME DE EVALUACIÓN ECONÓMICA: REDUCCIÓN DE MERMA EN TERNEROS (FerAppease®)
Fecha: ${today}
Propietario / Predio: ${producerName || 'Productor'} ${farmName ? `- ${farmName}` : ''}
Destino: ${destination}
Moneda: ${inputs.currency} | Unidad: ${inputs.weightUnit}

DATOS DEL LOTE:
- Cantidad de animales: ${inputs.headCount} terneros
- Peso promedio inicial: ${inputs.avgWeight} ${inputs.weightUnit}
- Precio de venta: ${formatPricePerUnit(inputs.salePricePerUnit, inputs.currency, inputs.weightUnit)}
- Merma esperada sin tratamiento: ${inputs.expectedShrinkPercent}%
- Reducción con FerAppease: ${inputs.shrinkReductionPercent}% (Merma resultante: ${results.actualShrinkPercentWith.toFixed(2)}%)
- Costo estimado por dosis: ${formatCurrency(inputs.costPerDose, inputs.currency)}

RESULTADOS DEL IMPACTO ECONÓMICO:
- Carne total recuperada/retenida: +${formatWeight(results.totalWeightSaved, inputs.weightUnit, 0)} (+${formatWeight(results.weightSavedPerHead, inputs.weightUnit, 1)} / ternero)
- Ingreso bruto adicional: ${formatCurrency(results.grossExtraRevenue, inputs.currency)}
- Inversión total en FerAppease: ${formatCurrency(results.totalTreatmentCost, inputs.currency)}
- GANANCIA NETA ADICIONAL: ${formatCurrency(results.netProfit, inputs.currency)}
- Ganancia neta por ternero: +${formatCurrency(results.netProfitPerHead, inputs.currency)} / cabeza
- Retorno de Inversión (ROI): ${Math.round(results.roiPercentage)}% (${results.roiRatio.toFixed(1)} a 1)
- Punto de Equilibrio: Con recuperar ${formatWeight(results.breakEvenWeightKgOrLb, inputs.weightUnit, 2)} por ternero se paga el 100% de la dosis.

Generado con Calculadora de ROI de Merma en Terneros (FerAppease® / Veterquímica Chile).
    `.trim();

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div 
        className="relative bg-white rounded-2xl max-w-3xl w-full shadow-xl border border-gray-200 overflow-hidden transform transition-all max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gray-900 text-white p-5 flex items-center justify-between border-b border-gray-800 no-print">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold">
                Informe Ejecutivo de Retorno Económico
              </h2>
              <p className="text-xs text-gray-400">
                Resumen listo para presentar a administradores o compradores
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Form / Fields */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-gray-800 text-xs sm:text-sm">
          {/* Custom Info Inputs */}
          <div className="bg-gray-50 rounded-xl p-3.5 border border-gray-200 space-y-2.5 no-print">
            <span className="text-[11px] font-black uppercase text-gray-400 tracking-tighter block">
              Datos del Encabezado (Opcional)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-bold text-gray-600 block mb-1">
                  Nombre del Productor:
                </label>
                <input
                  type="text"
                  placeholder="Ej: Ganadera del Sur"
                  value={producerName}
                  onChange={(e) => setProducerName(e.target.value)}
                  className="w-full text-xs px-2.5 py-1.5 bg-white border border-gray-300 rounded-lg focus:outline-hidden focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-gray-600 block mb-1">
                  Predio / Región:
                </label>
                <input
                  type="text"
                  placeholder="Ej: Fundo Los Robles"
                  value={farmName}
                  onChange={(e) => setFarmName(e.target.value)}
                  className="w-full text-xs px-2.5 py-1.5 bg-white border border-gray-300 rounded-lg focus:outline-hidden focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-gray-600 block mb-1">
                  Destino / Feria:
                </label>
                <input
                  type="text"
                  placeholder="Ej: Remate Feria Osorno"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full text-xs px-2.5 py-1.5 bg-white border border-gray-300 rounded-lg focus:outline-hidden focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Actual Printable Report Sheet */}
          <div className="border border-gray-200 rounded-xl p-5 sm:p-6 bg-white space-y-4 shadow-xs">
            {/* Header branding */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 pb-3 gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-700" />
                  <h1 className="text-base sm:text-lg font-bold text-gray-900">
                    Evaluación de Retorno por Reducción de Merma (Shrink ROI)
                  </h1>
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  Tecnología FerAppease® (MBAS) | Veterquímica Chile
                </div>
              </div>
              <div className="text-left sm:text-right text-xs text-gray-500 font-mono">
                <div>Fecha: <strong className="text-gray-800">{today}</strong></div>
                {producerName && <div>Productor: <strong className="text-gray-800">{producerName}</strong></div>}
                {farmName && <div>Predio: <strong className="text-gray-800">{farmName}</strong></div>}
              </div>
            </div>

            {/* Parameter Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs bg-gray-50 p-3 rounded-lg border border-gray-200">
              <div>
                <span className="text-gray-500 block text-[11px]">Tamaño del Lote:</span>
                <strong className="text-gray-900 text-xs font-mono">{inputs.headCount} terneros</strong>
              </div>
              <div>
                <span className="text-gray-500 block text-[11px]">Peso Inicial:</span>
                <strong className="text-gray-900 text-xs font-mono">{inputs.avgWeight} {inputs.weightUnit}</strong>
              </div>
              <div>
                <span className="text-gray-500 block text-[11px]">Precio de Venta:</span>
                <strong className="text-emerald-700 text-xs font-mono">
                  {formatPricePerUnit(inputs.salePricePerUnit, inputs.currency, inputs.weightUnit)}
                </strong>
              </div>
              <div>
                <span className="text-gray-500 block text-[11px]">Merma (Sin / Con):</span>
                <strong className="text-gray-900 text-xs font-mono">
                  {inputs.expectedShrinkPercent}% ➔ {results.actualShrinkPercentWith.toFixed(1)}%
                </strong>
              </div>
            </div>

            {/* Highlighted Results Box */}
            <div className="bg-gray-900 text-white p-4 sm:p-5 rounded-xl space-y-2 border border-gray-800">
              <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                <span className="text-[11px] font-black uppercase tracking-tighter text-emerald-400">
                  Ganancia Neta Adicional del Lote
                </span>
                <span className="text-[11px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono font-bold border border-emerald-400/30">
                  {Math.round(results.roiPercentage)}% ROI
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400">
                  {formatCurrency(results.netProfit, inputs.currency)}
                </div>
                <div className="text-xs font-bold text-white bg-gray-800 px-2.5 py-1 rounded border border-gray-700 font-mono">
                  +{formatCurrency(results.netProfitPerHead, inputs.currency)} / ternero
                </div>
              </div>
            </div>

            {/* Detailed metrics table */}
            <div className="space-y-1.5 text-xs">
              <h4 className="font-bold text-gray-800 uppercase tracking-wider text-[11px]">
                Desglose Económico y de Pesaje:
              </h4>
              <div className="divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden font-mono">
                <div className="flex justify-between p-2 bg-gray-50">
                  <span className="text-gray-600 font-sans text-xs">Pérdida por merma evitada por cabeza:</span>
                  <strong className="text-emerald-700">+{formatWeight(results.weightSavedPerHead, inputs.weightUnit, 1)}</strong>
                </div>
                <div className="flex justify-between p-2">
                  <span className="text-gray-600 font-sans text-xs">Kilos totales de carne retenidos en el lote:</span>
                  <strong className="text-emerald-700">+{formatWeight(results.totalWeightSaved, inputs.weightUnit, 0)}</strong>
                </div>
                <div className="flex justify-between p-2 bg-gray-50">
                  <span className="text-gray-600 font-sans text-xs">Ingreso bruto adicional generado por venta:</span>
                  <strong className="text-gray-900">+{formatCurrency(results.grossExtraRevenue, inputs.currency)}</strong>
                </div>
                <div className="flex justify-between p-2">
                  <span className="text-gray-600 font-sans text-xs">Inversión total en tratamiento ({inputs.headCount} dosis):</span>
                  <strong className="text-gray-700">{formatCurrency(results.totalTreatmentCost, inputs.currency)}</strong>
                </div>
                <div className="flex justify-between p-2 bg-emerald-50 font-bold">
                  <span className="text-emerald-950 font-sans text-xs">Multiplicador de inversión:</span>
                  <strong className="text-emerald-800">{results.roiRatio.toFixed(1)}x por cada $1 invertido</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer with Actions */}
        <div className="bg-gray-50 p-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3 no-print">
          <div className="text-[11px] text-gray-500">
            Impresión y exportación en formato limpio.
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-bold text-xs transition shadow-xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? '¡Copiado!' : 'Copiar Resumen'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
