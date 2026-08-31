import React from 'react';
import { X, Building2, Phone, Mail, Globe, CheckCircle, Award } from 'lucide-react';

interface VeterquimicaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VeterquimicaModal: React.FC<VeterquimicaModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 no-print">
      <div 
        className="relative bg-white rounded-2xl max-w-2xl w-full shadow-xl border border-gray-200 overflow-hidden transform transition-all flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gray-900 text-white p-5 flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold">
                Veterquímica Chile
              </h2>
              <p className="text-xs text-gray-400">
                Soluciones Integrales para la Salud y Bienestar de la Ganadería Bovina
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

        {/* Body */}
        <div className="p-5 sm:p-6 space-y-4 text-xs sm:text-sm text-gray-700">
          <div className="space-y-1">
            <h3 className="text-xs font-black uppercase text-gray-400 tracking-tighter">
              Distribuidor Oficial en Chile
            </h3>
            <h4 className="font-bold text-gray-900 text-sm">
              Líderes en Bioseguridad, Nutrición y Salud Animal
            </h4>
            <p className="text-gray-600 leading-relaxed text-xs">
              Con más de 50 años acompañando a los productores pecuarios de Chile, Veterquímica pone a disposición del sector ganadero bovino tecnologías de vanguardia como <strong>FerAppease®</strong>, respaldadas por asesoría técnica en terreno y protocolos adaptados a las condiciones productivas del país.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-3.5 border border-gray-200 space-y-2.5">
            <h4 className="font-bold text-gray-900 text-xs flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>Beneficios del Respaldo Técnico en Chile:</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="flex items-start gap-2 bg-white p-2 rounded-lg border border-gray-200">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="text-[11px]">Asesoría directa en diseño de protocolos de manga y transporte.</span>
              </div>
              <div className="flex items-start gap-2 bg-white p-2 rounded-lg border border-gray-200">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="text-[11px]">Disponibilidad y distribución nacional a lo largo de todo Chile.</span>
              </div>
              <div className="flex items-start gap-2 bg-white p-2 rounded-lg border border-gray-200">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="text-[11px]">Monitoreo de pesajes y cálculo de retorno de inversión por predio.</span>
              </div>
              <div className="flex items-start gap-2 bg-white p-2 rounded-lg border border-gray-200">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="text-[11px]">Capacitación práctica a personal de campo y operarios de manga.</span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-gray-600">
            <div className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <a href="https://veterquimica.cl" target="_blank" rel="noreferrer" className="text-blue-600 font-bold hover:underline">
                veterquimica.cl
              </a>
            </div>
            <div className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-emerald-600" />
              <span className="font-semibold text-gray-800">contacto@veterquimica.cl</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-900 hover:bg-gray-800 text-white font-bold text-xs transition"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
