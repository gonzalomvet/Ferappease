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

  // Quick price presets
  const quickPrices = isCLP
    ? [
        { label: '$2.400', value: 2400 },
        { label: '$2.750', value: 2750 },
        { label: '$2.980', value: 2980 },
        { label: '$3.350', value: 3350 },
      ]
    : inputs.weightUnit === 'kg'
    ? [
        { label: '$2.50', value: 2.5 },
        { label: '$3.00', value: 3.0 },
        { label: '$3.50', value: 3.5 },
        { label: '$4.00', value: 4.0 },
      ]
    : [
        { label: '$2.20', value: 2.2 },
        { label: '$2.60', value: 2.6 },
        { label: '$3.00', value: 3.0 },
        { label: '$3.40', value: 3.4 },
      ];

  const quickHeadCounts = [30, 60, 100, 250, 500];

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
      {/* 1. Escenarios de Referencia (Selector Minimalista) */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-black uppercase text-gray-400 tracking-tighter">
            Escenario de Referencia
          </span>
          <span className="text-[10px] font-bold text-gray-500 font-mono">
            {activePresetId ? 'Personalizado / Preset' : 'Manual'}
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
                className={`text-center py-2 px-2.5 rounded-xl border transition-all ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold ring-1 ring-emerald-600'
                    : 'border-gray-200 bg-gray-50/50 hover:bg-gray-100 text-gray-700 font-medium'
                }`}
              >
                <div className="text-xs truncate">
                  {preset.name.split('(')[0].trim()}
                </div>
                <div className="text-[11px] font-mono text-emerald-700 font-bold mt-0.5">
                  {preset.shrinkPercent}% merma
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Parámetros del Lote y Mercado */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-xs space-y-4">
        <span className="text-[11px] font-black uppercase text-gray-400 tracking-tighter block">
          Datos del Lote y Precio de Venta
        </span>

        <div className="space-y-4">
          {/* Número de Terneros */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="input-head-count" className="text-xs font-bold text-gray-700">
                Tamaño del Lote
              </label>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-gray-900 bg-gray-100 px-2 py-0.5 rounded">
                  {inputs.headCount} cabezas
                </span>
                <input
                  id="input-head-count"
                  type="number"
                  min="1"
                  max="5000"
                  value={inputs.headCount || ''}
                  onChange={(e) => onChange({ headCount: Number(e.target.value) || 0 })}
                  className="w-20 py-1 px-2 bg-gray-50 border border-gray-200 rounded-lg text-right font-mono font-bold text-gray-900 text-xs focus:outline-hidden focus:border-emerald-500"
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
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900"
            />
            <div className="flex items-center gap-1 pt-0.5">
              {quickHeadCounts.map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => onChange({ headCount: count })}
                  className={`text-[11px] px-2 py-0.5 rounded font-mono font-bold transition ${
                    inputs.headCount === count
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {count}
                </button>
              ))}
            </div>
          </div>

          {/* Peso Inicial */}
          <div className="space-y-1.5 pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <label htmlFor="input-avg-weight" className="text-xs font-bold text-gray-700">
                Peso Inicial ({inputs.weightUnit})
              </label>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {inputs.avgWeight} {inputs.weightUnit}
                </span>
                <input
                  id="input-avg-weight"
                  type="number"
                  min={weightMin}
                  max={weightMax}
                  step={weightStep}
                  value={inputs.avgWeight || ''}
                  onChange={(e) => onChange({ avgWeight: Number(e.target.value) || 0 })}
                  className="w-20 py-1 px-2 bg-gray-50 border border-gray-200 rounded-lg text-right font-mono font-bold text-gray-900 text-xs focus:outline-hidden focus:border-emerald-500"
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
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900"
            />
            <div className="flex justify-between text-[10px] text-gray-400 font-mono">
              <span>{weightMin} {inputs.weightUnit}</span>
              <span>220-250 (destete)</span>
              <span>{weightMax} {inputs.weightUnit}</span>
            </div>
          </div>

          {/* Precio de Venta */}
          <div className="space-y-1.5 pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <label htmlFor="input-sale-price" className="text-xs font-bold text-gray-700">
                Precio de Venta ({inputs.currency}/{inputs.weightUnit})
              </label>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {formatPricePerUnit(inputs.salePricePerUnit, inputs.currency, inputs.weightUnit)}
                </span>
                <input
                  id="input-sale-price"
                  type="number"
                  min={priceMin}
                  max={priceMax}
                  step={priceStep}
                  value={inputs.salePricePerUnit || ''}
                  onChange={(e) => onChange({ salePricePerUnit: Number(e.target.value) || 0 })}
                  className="w-24 py-1 px-2 bg-gray-50 border border-gray-200 rounded-lg text-right font-mono font-bold text-gray-900 text-xs focus:outline-hidden focus:border-emerald-500"
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
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex items-center gap-1 pt-0.5">
              {quickPrices.map((qp, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onChange({ salePricePerUnit: qp.value })}
                  className={`text-[11px] px-2 py-0.5 rounded font-mono font-bold transition ${
                    inputs.salePricePerUnit === qp.value
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {qp.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Factores de Merma y Eficacia */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-xs space-y-4">
        <span className="text-[11px] font-black uppercase text-gray-400 tracking-tighter block">
          Factores de Merma y Tratamiento
        </span>

        <div className="space-y-4">
          {/* % Merma Estimada sin Producto */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="slider-shrink-percent" className="text-xs font-bold text-gray-700">
                Merma sin Producto
              </label>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-100">
                  {inputs.expectedShrinkPercent}%
                </span>
                <input
                  type="number"
                  min="1"
                  max="20"
                  step="0.1"
                  value={inputs.expectedShrinkPercent}
                  onChange={(e) => onChange({ expectedShrinkPercent: Number(e.target.value) || 0 })}
                  className="w-16 py-1 px-1.5 bg-gray-50 border border-gray-200 rounded-lg text-center font-mono font-bold text-gray-900 text-xs focus:outline-hidden focus:border-red-400"
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
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
            />
            <div className="flex justify-between text-[10px] text-gray-400 font-mono">
              <span>3% (corta)</span>
              <span>7% (estándar)</span>
              <span>10%+ (larga)</span>
            </div>
          </div>

          {/* % Reducción FerAppease */}
          <div className="space-y-1.5 pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <label htmlFor="slider-reduction-percent" className="text-xs font-bold text-gray-700">
                Reducción con FerAppease
              </label>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                  {inputs.shrinkReductionPercent}%
                </span>
                <input
                  type="number"
                  min="10"
                  max="100"
                  step="1"
                  value={inputs.shrinkReductionPercent}
                  onChange={(e) => onChange({ shrinkReductionPercent: Number(e.target.value) || 0 })}
                  className="w-16 py-1 px-1.5 bg-gray-50 border border-gray-200 rounded-lg text-center font-mono font-bold text-emerald-700 text-xs focus:outline-hidden focus:border-emerald-500"
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
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-[10px] text-gray-400 font-mono">
              <span>50% (mínimo)</span>
              <span>80% (ensayos científicos)</span>
              <span>95% (máximo)</span>
            </div>
          </div>

          {/* Costo por Dosis */}
          <div className="space-y-1.5 pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <label htmlFor="slider-cost-per-dose" className="text-xs font-bold text-gray-700">
                Costo por Dosis
              </label>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-gray-700 bg-gray-100 px-2 py-0.5 rounded">
                  {formatCurrency(inputs.costPerDose, inputs.currency)} / dosis
                </span>
                <input
                  id="input-cost-per-dose"
                  type="number"
                  min={costMin}
                  max={costMax}
                  step={costStep}
                  value={inputs.costPerDose || ''}
                  onChange={(e) => onChange({ costPerDose: Number(e.target.value) || 0 })}
                  className="w-24 py-1 px-2 bg-gray-50 border border-gray-200 rounded-lg text-right font-mono font-bold text-gray-900 text-xs focus:outline-hidden focus:border-emerald-500"
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
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900"
            />
            <div className="flex justify-between items-center text-[10px] text-gray-400 font-mono">
              <span>Total Lote: <strong className="text-gray-700">{formatCurrency(inputs.headCount * inputs.costPerDose, inputs.currency)}</strong></span>
              <span>10 mL / ternero</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

