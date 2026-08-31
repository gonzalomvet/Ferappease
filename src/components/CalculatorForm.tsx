import React from 'react';
import { CalculatorInputs, PresetScenario } from '../types';
import { PRESET_SCENARIOS, formatPricePerUnit } from '../utils/calculations';
import { 
  Users, 
  Scale, 
  DollarSign, 
  TrendingDown, 
  Sparkles, 
  Info,
  Layers,
  ArrowRight
} from 'lucide-react';

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

  // Quick price presets for CLP ($/kg) and USD ($/lb or $/kg)
  const quickPrices = isCLP
    ? [
        { label: 'Ternero Lechería/Cruza ($2.400)', value: 2400 },
        { label: 'Ternero Mestizo ($2.750)', value: 2750 },
        { label: 'Ternero Carne ($2.980)', value: 2980 },
        { label: 'Ternero Especial ($3.350)', value: 3350 },
      ]
    : inputs.weightUnit === 'kg'
    ? [
        { label: '$2.50 / kg', value: 2.5 },
        { label: '$3.00 / kg', value: 3.0 },
        { label: '$3.50 / kg', value: 3.5 },
        { label: '$4.00 / kg', value: 4.0 },
      ]
    : [
        { label: '$2.20 / lb', value: 2.2 },
        { label: '$2.60 / lb', value: 2.6 },
        { label: '$3.00 / lb', value: 3.0 },
        { label: '$3.40 / lb', value: 3.4 },
      ];

  const quickHeadCounts = [30, 60, 100, 250, 500];

  return (
    <div className="space-y-4">
      {/* 1. Presets Rápidos de Escenarios Ganaderos */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-xs font-black uppercase text-gray-400 tracking-tighter">
              Escenarios Ganaderos de Referencia
            </h2>
            <h3 className="text-sm font-bold text-gray-900 mt-0.5">
              Condición de Traslado y Manejo de Terneros
            </h3>
          </div>
          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Ajuste Automático
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {PRESET_SCENARIOS.map((preset) => {
            const isSelected = activePresetId === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                id={`preset-${preset.id}`}
                onClick={() => onSelectPreset(preset)}
                className={`text-left p-3 rounded-xl border transition-all relative flex flex-col justify-between ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/80 shadow-xs ring-1 ring-emerald-600'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      {preset.typicalDistance}
                    </span>
                    <span className="text-[11px] font-bold font-mono text-emerald-700 bg-emerald-100/90 px-1.5 py-0.2 rounded">
                      {preset.shrinkPercent}%
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-gray-900 line-clamp-1">
                    {preset.name}
                  </h4>
                  <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-2">
                    {preset.description}
                  </p>
                </div>

                <div className="mt-2.5 pt-1.5 border-t border-gray-100 flex items-center justify-between text-[10px] font-bold text-emerald-700">
                  <span>80% reducción</span>
                  <ArrowRight className="w-3 h-3 text-emerald-600" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Parámetros del Lote y Animales */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
        <div>
          <h2 className="text-xs font-black uppercase text-gray-400 tracking-tighter">
            Parámetros de Entrada
          </h2>
          <h3 className="text-sm font-bold text-gray-900 mt-0.5">
            1. Datos del Lote
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Número de Animales */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="input-head-count" className="block text-xs font-bold text-gray-600 mb-0.5 ml-0.5">
                Número de Terneros (Cabezas)
              </label>
              <span className="text-[11px] font-mono font-bold text-gray-700 bg-gray-100 px-1.5 py-0.5 rounded">
                {inputs.headCount} cabezas
              </span>
            </div>
            <div className="relative">
              <input
                id="input-head-count"
                type="number"
                min="1"
                max="50000"
                value={inputs.headCount || ''}
                onChange={(e) => onChange({ headCount: Number(e.target.value) || 0 })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-base font-mono text-gray-900 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                placeholder="100"
              />
              <span className="absolute right-3.5 top-2.5 text-gray-400 font-bold text-xs uppercase font-mono">
                CABEZAS
              </span>
            </div>

            {/* Quick buttons */}
            <div className="flex items-center gap-1 flex-wrap pt-0.5">
              <span className="text-[10px] text-gray-400 font-bold uppercase mr-1">Rápido:</span>
              {quickHeadCounts.map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => onChange({ headCount: count })}
                  className={`text-xs px-2 py-0.5 rounded font-mono font-bold transition ${
                    inputs.headCount === count
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {count}
                </button>
              ))}
            </div>
          </div>

          {/* Peso Promedio */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="input-avg-weight" className="block text-xs font-bold text-gray-600 mb-0.5 ml-0.5">
                Peso Inicial (Vivo en Origen)
              </label>
              <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                {inputs.avgWeight} {inputs.weightUnit}
              </span>
            </div>
            <div className="relative">
              <input
                id="input-avg-weight"
                type="number"
                min="40"
                max="1000"
                step="1"
                value={inputs.avgWeight || ''}
                onChange={(e) => onChange({ avgWeight: Number(e.target.value) || 0 })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-base font-mono text-gray-900 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                placeholder={inputs.weightUnit === 'kg' ? '220' : '485'}
              />
              <span className="absolute right-3.5 top-2.5 text-gray-400 font-bold text-xs uppercase font-mono">
                {inputs.weightUnit.toUpperCase()}
              </span>
            </div>

            {/* Slider */}
            <div className="pt-1">
              <input
                id="slider-avg-weight"
                type="range"
                min={inputs.weightUnit === 'kg' ? 100 : 220}
                max={inputs.weightUnit === 'kg' ? 450 : 1000}
                step="5"
                value={inputs.avgWeight}
                onChange={(e) => onChange({ avgWeight: Number(e.target.value) })}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900"
              />
              <div className="flex justify-between text-[10px] text-gray-400 font-mono mt-0.5">
                <span>100 {inputs.weightUnit}</span>
                <span>220-250 (destete)</span>
                <span>450 {inputs.weightUnit}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. SECCIÓN PRECIO DE VENTA - ADAPTADO A PESO CHILENO ($ CLP/kg) */}
      <div className="p-5 bg-blue-50/70 rounded-2xl border border-blue-100 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <div>
            <label className="block text-[11px] font-black text-blue-900 uppercase tracking-wider">
              Ajuste Precio de Venta ({isCLP ? 'Mercado Chileno' : inputs.currency})
            </label>
            <p className="text-[11px] text-blue-700">
              {isCLP 
                ? 'Valor por kilo de carne en pie comercializado en pesos chilenos ($ CLP/kg).'
                : `Valor por ${inputs.weightUnit} de peso vivo en dólares.`}
            </p>
          </div>
          <div className="text-xs font-mono font-bold text-blue-900 bg-white px-2.5 py-1 rounded border border-blue-200 self-start sm:self-auto">
            {formatPricePerUnit(inputs.salePricePerUnit, inputs.currency, inputs.weightUnit)}
          </div>
        </div>

        <div className="relative">
          <input
            id="input-sale-price"
            type="number"
            min="0"
            step={isCLP ? '10' : '0.05'}
            value={inputs.salePricePerUnit || ''}
            onChange={(e) => onChange({ salePricePerUnit: Number(e.target.value) || 0 })}
            className="w-full bg-white border-2 border-blue-200 rounded-xl px-4 py-3 text-2xl font-mono text-blue-950 font-bold focus:ring-2 focus:ring-blue-500 outline-none shadow-inner transition-all"
            placeholder={isCLP ? '2850' : '2.75'}
          />
          <span className="absolute right-4 top-4 text-blue-500 font-bold text-xs font-mono uppercase">
            {inputs.currency}/{inputs.weightUnit} CARNE
          </span>
        </div>

        {/* Quick presets for sale price in Chile */}
        <div className="space-y-1.5 pt-1">
          <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wider block">
            Precios Referenciales Feria / Remate:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
            {quickPrices.map((qp, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onChange({ salePricePerUnit: qp.value })}
                className={`text-xs px-2.5 py-1.5 rounded-lg border text-left font-mono font-bold transition truncate ${
                  inputs.salePricePerUnit === qp.value
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-white text-blue-900 border-blue-200 hover:bg-blue-100/60'
                }`}
              >
                {qp.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Parámetros de Merma y Eficacia de FerAppease */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
        <div>
          <h2 className="text-xs font-black uppercase text-gray-400 tracking-tighter">
            Factores de Pérdida
          </h2>
          <h3 className="text-sm font-bold text-gray-900 mt-0.5">
            % Merma de Transporte y Reducción FerAppease
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Merma esperada sin producto */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="slider-shrink-percent" className="block text-xs font-bold text-gray-600 mb-0.5 ml-0.5">
                % Merma Estimada SIN Producto
              </label>
              <span className="text-xs font-mono font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-100">
                {inputs.expectedShrinkPercent}%
              </span>
            </div>

            <div className="flex items-center gap-2">
              <input
                id="slider-shrink-percent"
                type="range"
                min="1.0"
                max="15.0"
                step="0.5"
                value={inputs.expectedShrinkPercent}
                onChange={(e) => onChange({ expectedShrinkPercent: Number(e.target.value) })}
                className="flex-1 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
              />
              <div className="w-16">
                <input
                  type="number"
                  min="1"
                  max="20"
                  step="0.1"
                  value={inputs.expectedShrinkPercent}
                  onChange={(e) => onChange({ expectedShrinkPercent: Number(e.target.value) || 0 })}
                  className="w-full py-1 px-1.5 bg-gray-50 border border-gray-200 rounded-lg text-center font-mono font-bold text-gray-900 text-xs"
                />
              </div>
            </div>

            <div className="flex justify-between text-[10px] text-gray-400 font-mono">
              <span>3% (corta)</span>
              <span>7% (estándar)</span>
              <span>10%+ (larga)</span>
            </div>
          </div>

          {/* Eficacia de reducción FerAppease */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <label htmlFor="slider-reduction-percent" className="block text-xs font-bold text-gray-600 mb-0.5 ml-0.5">
                  Reducción con FerAppease
                </label>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1 rounded">
                  80% Estudios
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                {inputs.shrinkReductionPercent}%
              </span>
            </div>

            <div className="flex items-center gap-2">
              <input
                id="slider-reduction-percent"
                type="range"
                min="30"
                max="95"
                step="5"
                value={inputs.shrinkReductionPercent}
                onChange={(e) => onChange({ shrinkReductionPercent: Number(e.target.value) })}
                className="flex-1 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="w-16">
                <input
                  type="number"
                  min="10"
                  max="100"
                  step="1"
                  value={inputs.shrinkReductionPercent}
                  onChange={(e) => onChange({ shrinkReductionPercent: Number(e.target.value) || 0 })}
                  className="w-full py-1 px-1.5 bg-gray-50 border border-gray-200 rounded-lg text-center font-mono font-bold text-emerald-700 text-xs"
                />
              </div>
            </div>

            <div className="flex justify-between text-[10px] text-gray-400 font-mono">
              <span>50% (mín)</span>
              <span>80% (ensayos)</span>
              <span>95% (máx)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Inversión en Tratamiento FerAppease */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200 shadow-xs space-y-3">
        <div>
          <h2 className="text-xs font-black uppercase text-gray-400 tracking-tighter">
            Costos Operativos de Tratamiento
          </h2>
          <h3 className="text-sm font-bold text-gray-900 mt-0.5">
            Inversión FerAppease® por Ternero
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
          <div className="space-y-1">
            <label htmlFor="input-cost-per-dose" className="block text-xs font-bold text-gray-600 mb-0.5 ml-0.5">
              Costo Estimado Dosis / Cabeza ({inputs.currency})
            </label>
            <div className="relative">
              <input
                id="input-cost-per-dose"
                type="number"
                min="0"
                step={isCLP ? '100' : '0.1'}
                value={inputs.costPerDose || ''}
                onChange={(e) => onChange({ costPerDose: Number(e.target.value) || 0 })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-base font-mono text-gray-900 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                placeholder={isCLP ? '3000' : '3.00'}
              />
              <span className="absolute right-3.5 top-2.5 text-gray-400 font-bold text-xs uppercase font-mono">
                {inputs.currency}/DOSIS
              </span>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
              Inversión Total en el Lote ({inputs.headCount} animales)
            </span>
            <div className="text-lg font-mono font-bold text-gray-900 mt-0.5">
              {isCLP 
                ? `$ ${new Intl.NumberFormat('es-CL').format(Math.round(inputs.headCount * inputs.costPerDose))} CLP`
                : `$ ${(inputs.headCount * inputs.costPerDose).toFixed(2)} USD`}
            </div>
            <p className="text-[10px] text-gray-500 mt-0.5">
              Dosis: 10 mL (&gt;90 kg) / 5 mL (&lt;90 kg)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
