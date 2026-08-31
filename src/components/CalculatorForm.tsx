import React from 'react';
import { CalculatorInputs, PresetScenario } from '../types';
import { PRESET_SCENARIOS, formatPricePerUnit, formatCurrency } from '../utils/calculations';

interface CalculatorFormProps {
  inputs: CalculatorInputs;
  onChange: (updates: Partial<CalculatorInputs>) => void;
  onSelectPreset: (preset: PresetScenario) => void;
  activePresetId: string | null;
}

export const CalculatorForm: React.FC<CalculatorFormProps> = ({
  inputs,
  onChange,
  onSelectPreset,
  activePresetId,
}) => {
  const isCLP = inputs.currency === 'CLP';

  const priceMin = isCLP ? 1500 : 1.5;
  const priceMax = isCLP ? 4500 : 5.0;
  const priceStep = isCLP ? 50 : 0.05;

  const costMin = isCLP ? 1000 : 1.0;
  const costMax = isCLP ? 6000 : 6.0;
  const costStep = isCLP ? 100 : 0.1;

  const weightMin = inputs.weightUnit === 'kg' ? 100 : 220;
  const weightMax = inputs.weightUnit === 'kg' ? 500 : 1100;
  const weightStep = 5;

  return (
    <div className="space-y-4">
      {/* 1. Escenarios de Referencia */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-black uppercase text-gray-400 tracking-tighter">
            Escenario de Referencia
          </span>
          <span className="text-[11px] font-bold text-gray-500 font-mono">
            {activePresetId ? 'Preset Aplicado' : 'Ajuste Manual'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {PRESET_SCENARIOS.map((preset) => {
            const isSelected = activePresetId === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                id={`preset-${preset.id}`}
                onClick={() => onSelectPreset(preset)}
                className={`text-center py-2.5 px-2 rounded-xl border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-600/50 shadow-xs'
                    : 'border-gray-200 bg-gray-50/60 hover:bg-gray-100 text-gray-800 font-medium'
                }`}
              >
                <div className="text-xs font-bold truncate">
                  {preset.name.split('(')[0].trim()}
                </div>
                <div className="text-xs font-mono font-bold text-emerald-700 mt-1">
                  {preset.shrinkPercent}% merma
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Parámetros del Lote y Precio de Venta */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-xs space-y-5">
        <span className="text-[11px] font-black uppercase text-gray-400 tracking-tighter block">
          Datos del Lote y Precio de Venta
        </span>

        <div className="space-y-5">
          {/* Tamaño del Lote */}
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <label htmlFor="slider-head-count" className="text-xs font-bold text-gray-800">
                Tamaño del Lote (Cabezas)
              </label>
              <div className="flex items-center gap-2">
                <div className="px-3.5 py-1.5 rounded-xl border-2 border-gray-900 bg-gray-900 text-white font-mono font-extrabold text-sm sm:text-base shadow-xs min-w-[110px] text-center">
                  {inputs.headCount} cabezas
                </div>
                <input
                  id="input-head-count"
                  type="number"
                  min="1"
                  max="5000"
                  value={inputs.headCount || ''}
                  onChange={(e) => onChange({ headCount: Number(e.target.value) || 0 })}
                  className="w-16 py-1.5 px-2 bg-gray-50 border border-gray-300 rounded-lg text-right font-mono font-bold text-gray-900 text-xs focus:outline-hidden focus:border-emerald-500"
                />
              </div>
            </div>
            <input
              id="slider-head-count"
              type="range"
              min="10"
              max="500"
              step="5"
              value={inputs.headCount}
              onChange={(e) => onChange({ headCount: Number(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900"
            />
          </div>

          {/* Peso Inicial */}
          <div className="space-y-2 pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between gap-3">
              <label htmlFor="slider-avg-weight" className="text-xs font-bold text-gray-800">
                Peso Inicial Promedio
              </label>
              <div className="flex items-center gap-2">
                <div className="px-3.5 py-1.5 rounded-xl border-2 border-emerald-600 bg-emerald-50 text-emerald-950 font-mono font-extrabold text-sm sm:text-base shadow-xs min-w-[110px] text-center">
                  {inputs.avgWeight} {inputs.weightUnit}
                </div>
                <input
                  id="input-avg-weight"
                  type="number"
                  min={weightMin}
                  max={weightMax}
                  step={weightStep}
                  value={inputs.avgWeight || ''}
                  onChange={(e) => onChange({ avgWeight: Number(e.target.value) || 0 })}
                  className="w-16 py-1.5 px-2 bg-gray-50 border border-gray-300 rounded-lg text-right font-mono font-bold text-gray-900 text-xs focus:outline-hidden focus:border-emerald-500"
                />
              </div>
            </div>
            <input
              id="slider-avg-weight"
              type="range"
              min={weightMin}
              max={weightMax}
              step={weightStep}
              value={inputs.avgWeight}
              onChange={(e) => onChange({ avgWeight: Number(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900"
            />
          </div>

          {/* Precio de Venta */}
          <div className="space-y-2 pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between gap-3">
              <label htmlFor="slider-sale-price" className="text-xs font-bold text-gray-800">
                Precio de Venta en Pie ({inputs.currency}/{inputs.weightUnit})
              </label>
              <div className="flex items-center gap-2">
                <div className="px-3.5 py-1.5 rounded-xl border-2 border-blue-600 bg-blue-50 text-blue-950 font-mono font-extrabold text-sm sm:text-base shadow-xs min-w-[130px] text-center">
                  {formatPricePerUnit(inputs.salePricePerUnit, inputs.currency, inputs.weightUnit)}
                </div>
                <input
                  id="input-sale-price"
                  type="number"
                  min={priceMin}
                  max={priceMax}
                  step={priceStep}
                  value={inputs.salePricePerUnit || ''}
                  onChange={(e) => onChange({ salePricePerUnit: Number(e.target.value) || 0 })}
                  className="w-20 py-1.5 px-2 bg-gray-50 border border-gray-300 rounded-lg text-right font-mono font-bold text-gray-900 text-xs focus:outline-hidden focus:border-emerald-500"
                />
              </div>
            </div>
            <input
              id="slider-sale-price"
              type="range"
              min={priceMin}
              max={priceMax}
              step={priceStep}
              value={inputs.salePricePerUnit}
              onChange={(e) => onChange({ salePricePerUnit: Number(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
        </div>
      </div>

      {/* 3. Factores de Merma y Tratamiento */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-xs space-y-5">
        <span className="text-[11px] font-black uppercase text-gray-400 tracking-tighter block">
          Factores de Merma y Tratamiento
        </span>

        <div className="space-y-5">
          {/* Merma Estimada sin Producto */}
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <label htmlFor="slider-shrink-percent" className="text-xs font-bold text-gray-800">
                Merma Estimada sin FerAppease
              </label>
              <div className="flex items-center gap-2">
                <div className="px-3.5 py-1.5 rounded-xl border-2 border-red-500 bg-red-50 text-red-700 font-mono font-extrabold text-sm sm:text-base shadow-xs min-w-[90px] text-center">
                  {inputs.expectedShrinkPercent}%
                </div>
                <input
                  type="number"
                  min="1"
                  max="20"
                  step="0.1"
                  value={inputs.expectedShrinkPercent}
                  onChange={(e) => onChange({ expectedShrinkPercent: Number(e.target.value) || 0 })}
                  className="w-16 py-1.5 px-2 bg-gray-50 border border-gray-300 rounded-lg text-right font-mono font-bold text-gray-900 text-xs focus:outline-hidden focus:border-red-500"
                />
              </div>
            </div>
            <input
              id="slider-shrink-percent"
              type="range"
              min="1.0"
              max="15.0"
              step="0.5"
              value={inputs.expectedShrinkPercent}
              onChange={(e) => onChange({ expectedShrinkPercent: Number(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
            />
          </div>

          {/* Reducción con FerAppease */}
          <div className="space-y-2 pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between gap-3">
              <label htmlFor="slider-reduction-percent" className="text-xs font-bold text-gray-800">
                Eficacia de Reducción FerAppease
              </label>
              <div className="flex items-center gap-2">
                <div className="px-3.5 py-1.5 rounded-xl border-2 border-emerald-600 bg-emerald-50 text-emerald-900 font-mono font-extrabold text-sm sm:text-base shadow-xs min-w-[90px] text-center">
                  {inputs.shrinkReductionPercent}%
                </div>
                <input
                  type="number"
                  min="10"
                  max="100"
                  step="1"
                  value={inputs.shrinkReductionPercent}
                  onChange={(e) => onChange({ shrinkReductionPercent: Number(e.target.value) || 0 })}
                  className="w-16 py-1.5 px-2 bg-gray-50 border border-gray-300 rounded-lg text-right font-mono font-bold text-emerald-800 text-xs focus:outline-hidden focus:border-emerald-500"
                />
              </div>
            </div>
            <input
              id="slider-reduction-percent"
              type="range"
              min="30"
              max="95"
              step="5"
              value={inputs.shrinkReductionPercent}
              onChange={(e) => onChange({ shrinkReductionPercent: Number(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
          </div>

          {/* Costo por Dosis */}
          <div className="space-y-2 pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between gap-3">
              <label htmlFor="slider-cost-per-dose" className="text-xs font-bold text-gray-800">
                Inversión Dosis / Cabeza
              </label>
              <div className="flex items-center gap-2">
                <div className="px-3.5 py-1.5 rounded-xl border-2 border-gray-800 bg-gray-50 text-gray-900 font-mono font-extrabold text-sm sm:text-base shadow-xs min-w-[120px] text-center">
                  {formatCurrency(inputs.costPerDose, inputs.currency)}
                </div>
                <input
                  id="input-cost-per-dose"
                  type="number"
                  min={costMin}
                  max={costMax}
                  step={costStep}
                  value={inputs.costPerDose || ''}
                  onChange={(e) => onChange({ costPerDose: Number(e.target.value) || 0 })}
                  className="w-20 py-1.5 px-2 bg-gray-50 border border-gray-300 rounded-lg text-right font-mono font-bold text-gray-900 text-xs focus:outline-hidden focus:border-emerald-500"
                />
              </div>
            </div>
            <input
              id="slider-cost-per-dose"
              type="range"
              min={costMin}
              max={costMax}
              step={costStep}
              value={inputs.costPerDose}
              onChange={(e) => onChange({ costPerDose: Number(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
