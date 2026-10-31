import { useState } from 'react';
import { Lightbulb, CheckCircle2, Copy, Check, ChevronDown, ChevronUp, Trophy, ArrowRight } from 'lucide-react';
import { BEGINNER_CHALLENGES, Challenge } from '../data/calculatorCode';

export function BeginnerChallenges() {
  const [revealedHints, setRevealedHints] = useState<Record<string, boolean>>({});
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleHint = (id: string) => {
    setRevealedHints(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSolution = (id: string) => {
    setRevealedSolutions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopySolution = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Trophy className="w-5 h-5 text-indigo-600" />
              Desafios Práticos para Iniciantes
            </h2>
            <p className="text-sm text-slate-600 mt-1 leading-relaxed">
              A melhor maneira de aprender a programar é colocando a mão na massa! Tente resolver esses 4 desafios para expandir sua calculadora.
            </p>
          </div>
          <div className="text-xs font-semibold px-3 py-1.5 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-lg shrink-0 self-start sm:self-auto">
            4 Exercícios Progressivos
          </div>
        </div>
      </div>

      {/* Challenges List */}
      <div className="grid grid-cols-1 gap-6">
        {BEGINNER_CHALLENGES.map((challenge, idx) => {
          const isHintOpen = !!revealedHints[challenge.id];
          const isSolutionOpen = !!revealedSolutions[challenge.id];
          const isCopied = copiedId === challenge.id;

          return (
            <div key={challenge.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 font-bold text-sm flex items-center justify-center">
                    0{idx + 1}
                  </span>
                  <h3 className="text-base font-bold text-slate-900">
                    {challenge.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                    challenge.difficulty === 'Fácil'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    Dificuldade: {challenge.difficulty}
                  </span>
                </div>
              </div>

              {/* Context description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {challenge.description}
              </p>

              {/* Task Goal Box */}
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 font-medium flex items-start gap-2.5">
                <ArrowRight className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900">Sua missão: </span>
                  {challenge.task}
                </div>
              </div>

              {/* Action Buttons: Hint & Solution */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={() => toggleHint(challenge.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200/80 rounded-lg transition-colors"
                >
                  <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                  <span>{isHintOpen ? 'Ocultar Dica' : 'Ver Dica de Código'}</span>
                </button>

                <button
                  onClick={() => toggleSolution(challenge.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{isSolutionOpen ? 'Esconder Solução' : 'Revelar Solução'}</span>
                  {isSolutionOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Hint Box (Collapsible) */}
              {isHintOpen && (
                <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-lg text-xs text-amber-900 space-y-1">
                  <div className="font-bold flex items-center gap-1 text-amber-950">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                    <span>Dica:</span>
                  </div>
                  <p className="leading-relaxed">{challenge.hint}</p>
                </div>
              )}

              {/* Solution Box (Collapsible) */}
              {isSolutionOpen && (
                <div className="mt-3 p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                  <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
                    <span className="text-emerald-400 font-semibold font-mono">Solução Completa em Python</span>
                    <button
                      onClick={() => handleCopySolution(challenge.id, challenge.solutionCode)}
                      className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span className="text-[11px]">{isCopied ? 'Copiado!' : 'Copiar Solução'}</span>
                    </button>
                  </div>

                  <pre className="text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed">
                    {challenge.solutionCode}
                  </pre>

                  <div className="pt-2 border-t border-slate-800 text-xs text-slate-400 leading-relaxed">
                    <span className="text-indigo-400 font-semibold">Por que funciona: </span>
                    {challenge.explanation}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
