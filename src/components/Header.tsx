import React from 'react';
import { ShieldCheck, FileText } from 'lucide-react';

interface HeaderProps {
  onOpenPrint: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenPrint,
}) => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-xs text-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Logo and Titles */}
          <div className="flex items-start sm:items-center space-x-3.5">
            <div className="relative flex-shrink-0">
              <div className="w-11 h-11 rounded-xl bg-gray-900 flex items-center justify-center shadow-sm border border-gray-800">
                <ShieldCheck className="w-6 h-6 text-green-400 stroke-[2.2]" />
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
              </span>
            </div>

            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-gray-900">
                Calculador FerAppease
              </h1>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mt-0.5">
                Proyección de Margen, Retorno y Reducción de Merma de Transporte
              </p>
            </div>
          </div>

          {/* Quick Action Navigation */}
          <div className="flex items-center gap-2 self-start md:self-auto flex-wrap no-print">
            <button
              id="btn-open-print"
              onClick={onOpenPrint}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-xl bg-gray-900 hover:bg-gray-800 text-white transition shadow-sm"
            >
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Generar Informe</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
