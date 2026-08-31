import React from 'react';
import { X, ShieldCheck, CheckCircle2, AlertCircle, Droplets, Clock, Target, FileText } from 'lucide-react';

interface TechnicalGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TechnicalGuideModal: React.FC<TechnicalGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 no-print">
      <div 
        className="relative bg-white rounded-2xl max-w-3xl w-full shadow-xl border border-gray-200 overflow-hidden transform transition-all max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gray-900 text-white p-5 flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold">
                Guía Técnica y Científica: FerAppease®
              </h2>
              <p className="text-xs text-gray-400">
                Sustancia Apaciguadora Bovina Materna (MBAS) para Mitigación del Estrés y Merma
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

        {/* Modal Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-gray-700 text-xs sm:text-sm">
          {/* ¿Qué es? */}
          <div className="space-y-1.5">
            <h3 className="text-xs font-black uppercase text-gray-400 tracking-tighter flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-emerald-600" />
              <span>Fundamento Biológico</span>
            </h3>
            <h4 className="text-sm font-bold text-gray-900">
              ¿Qué es la Sustancia Apaciguadora Bovina Materna (MBAS)?
            </h4>
            <p className="text-gray-600 leading-relaxed text-xs">
              FerAppease® contiene un análogo sintético de la feromona maternal bovina secretada naturalmente por la piel de la glándula mamaria de la vaca lactante. Esta molécula es percibida por el <strong>órgano vomeronasal (OVN)</strong> del ternero, enviando señales directas a la amígdala cerebral y al hipotálamo para modular la respuesta neuroendocrina de alarma y reducir drásticamente los niveles de cortisol y citoquinas proinflamatorias.
            </p>
          </div>

          {/* Dosis y sitios de aplicación */}
          <div className="bg-emerald-50/70 rounded-xl p-4 border border-emerald-200 space-y-2.5">
            <h4 className="font-bold text-emerald-950 text-xs sm:text-sm flex items-center gap-1.5">
              <Droplets className="w-4 h-4 text-emerald-600" />
              <span>Dosis y Sitios Anatómicos de Aplicación Tópica</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-white rounded-lg p-3 border border-emerald-200 shadow-xs">
                <div className="font-bold text-gray-900 mb-0.5">
                  1. Terneros &gt; 90 kg (200 lbs)
                </div>
                <div className="text-emerald-700 font-bold font-mono text-sm mb-1">
                  Dosis Total: 10 mL
                </div>
                <ul className="text-gray-600 space-y-0.5 text-[11px] list-disc list-inside">
                  <li><strong>5 mL</strong> en la piel de la nuca / corona</li>
                  <li><strong>5 mL</strong> en la piel sobre el morro / ollares</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-3 border border-emerald-200 shadow-xs">
                <div className="font-bold text-gray-900 mb-0.5">
                  2. Terneros Chicos &lt; 90 kg (200 lbs)
                </div>
                <div className="text-emerald-700 font-bold font-mono text-sm mb-1">
                  Dosis Total: 5 mL
                </div>
                <ul className="text-gray-600 space-y-0.5 text-[11px] list-disc list-inside">
                  <li><strong>2.5 mL</strong> en la piel de la nuca</li>
                  <li><strong>2.5 mL</strong> en la piel sobre el morro</li>
                </ul>
              </div>
            </div>
            <div className="text-[11px] text-emerald-900 font-medium flex items-center gap-1.5 pt-0.5">
              <Clock className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span>
                <strong>Momento de aplicación:</strong> Aplicar al momento del carguío en manga, pesaje o previo al transporte. Duración de efecto: hasta 14 días.
              </span>
            </div>
          </div>

          {/* Por qué ocurre la merma */}
          <div className="space-y-1.5">
            <h3 className="text-xs font-black uppercase text-gray-400 tracking-tighter flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
              <span>Fisiopatología del Transporte</span>
            </h3>
            <h4 className="text-sm font-bold text-gray-900">
              ¿Por qué se produce la Merma (Shrink) en el Ganado?
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-0.5">
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 text-xs">
                <strong className="text-gray-900 block mb-0.5">1. Merma Digestiva (Fill Shrink)</strong>
                Pérdida de agua, orina y contenido ruminal por estrés y privación temporal de alimento durante encierre y traslado.
              </div>
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 text-xs">
                <strong className="text-gray-900 block mb-0.5">2. Merma Tisular o Muscular (Tissue Shrink)</strong>
                Catabolismo de masa muscular y deshidratación celular inducida por cortisol. Esta carne perdida no se recupera fácilmente en remate.
              </div>
            </div>
          </div>

          {/* Beneficios validados en estudios */}
          <div className="space-y-2">
            <h3 className="text-xs font-black uppercase text-gray-400 tracking-tighter flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Evidencia Científica</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
              <div className="bg-emerald-50/70 p-3 rounded-lg border border-emerald-200">
                <div className="text-base font-bold text-emerald-800 font-mono">Hasta -80%</div>
                <div className="text-gray-600 text-[11px] mt-0.5">Reducción en la merma de transporte hacia ferias ganaderas.</div>
              </div>
              <div className="bg-emerald-50/70 p-3 rounded-lg border border-emerald-200">
                <div className="text-base font-bold text-emerald-800 font-mono">+13 a 16 kg</div>
                <div className="text-gray-600 text-[11px] mt-0.5">Ganancia de peso adicional a 45-55 días post-destete.</div>
              </div>
              <div className="bg-emerald-50/70 p-3 rounded-lg border border-emerald-200">
                <div className="text-base font-bold text-emerald-800 font-mono">10:1 a 15:1</div>
                <div className="text-gray-600 text-[11px] mt-0.5">Retorno de inversión promedio sobre el costo del frasco/dosis.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 p-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-900 hover:bg-gray-800 text-white font-bold text-xs transition"
          >
            Cerrar Guía
          </button>
        </div>
      </div>
    </div>
  );
};
