import React from 'react';
import { Currency, WeightUnit } from '../types';
import { Coins, Scale, Check } from 'lucide-react';

interface CurrencyAndUnitSwitchProps {
  currency: Currency;
  weightUnit: WeightUnit;
  onCurrencyChange: (newCurrency: Currency) => void;
  onWeightUnitChange: (newUnit: WeightUnit) => void;
}

export const CurrencyAndUnitSwitch: React.FC<CurrencyAndUnitSwitchProps> = ({
  currency,
  weightUnit,
  onCurrencyChange,
  onWeightUnitChange,
}) => {
  return (
    <div className="bg-white rounded-xl p-3 sm:p-4 border border-gray-200 shadow-xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left message with Chilean adaptation indicator */}
        <div className="flex items-center gap-3">
          <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-200 text-gray-700">
            <Coins className="w-5 h-5 text-gray-800" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider block">
                Moneda &amp; Unidades de Medida
              </span>
              <span className="text-xs font-bold flex items-center gap-1.5 px-2 py-0.5 rounded bg-gray-100 text-gray-800 border border-gray-200">
                <span className={`w-2 h-2 rounded-full ${currency === 'CLP' ? 'bg-red-600' : 'bg-blue-600'}`}></span>
                {currency === 'CLP' ? 'Peso Chileno (CLP)' : 'Dólar Estadounidense (USD)'}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              {currency === 'CLP' 
                ? 'Cálculo formulado en $ CLP por kilo vivo de carne en pie' 
                : 'Cálculo en Dólares USD'}
            </p>
          </div>
        </div>

        {/* Right selector buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Currency Toggle */}
          <div className="flex items-center bg-gray-100 p-1 rounded-lg border border-gray-200">
            <button
              type="button"
              id="currency-btn-clp"
              onClick={() => onCurrencyChange('CLP')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                currency === 'CLP'
                  ? 'bg-white text-gray-900 shadow-xs border border-gray-200/80'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/60'
              }`}
            >
              <span>🇨🇱 CLP ($)</span>
              {currency === 'CLP' && <Check className="w-3 h-3 text-emerald-600" />}
            </button>
            <button
              type="button"
              id="currency-btn-usd"
              onClick={() => onCurrencyChange('USD')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                currency === 'USD'
                  ? 'bg-white text-gray-900 shadow-xs border border-gray-200/80'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/60'
              }`}
            >
              <span>🇺🇸 USD ($)</span>
              {currency === 'USD' && <Check className="w-3 h-3 text-emerald-600" />}
            </button>
          </div>

          {/* Unit Toggle */}
          <div className="flex items-center bg-gray-100 p-1 rounded-lg border border-gray-200">
            <div className="flex items-center px-1.5 text-gray-400">
              <Scale className="w-3.5 h-3.5" />
            </div>
            <button
              type="button"
              id="unit-btn-kg"
              onClick={() => onWeightUnitChange('kg')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                weightUnit === 'kg'
                  ? 'bg-gray-900 text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/60'
              }`}
            >
              Kilos (kg)
            </button>
            <button
              type="button"
              id="unit-btn-lbs"
              onClick={() => onWeightUnitChange('lbs')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                weightUnit === 'lbs'
                  ? 'bg-gray-900 text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/60'
              }`}
            >
              Libras (lbs)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
