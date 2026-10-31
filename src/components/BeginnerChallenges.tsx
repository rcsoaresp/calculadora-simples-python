import { useState } from 'react';
import { Lightbulb, CheckCircle2, Copy, Check, ChevronDown, ChevronUp, Trophy, ArrowRight, HelpCircle, XCircle, RotateCcw, Sparkles } from 'lucide-react';
import { BEGINNER_CHALLENGES } from '../data/calculatorCode';
import { QUIZ_QUESTIONS, QuizQuestion } from '../data/quizQuestions';

export function BeginnerChallenges() {
  // Navigation between Quiz and Practical Coding Challenges
  const [activeSection, setActiveSection] = useState<'quiz' | 'challenges'>('quiz');

  // Challenge states
  const [revealedHints, setRevealedHints] = useState<Record<string, boolean>>({});
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Quiz states: stores selected option id per question id
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});

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

  const handleSelectOption = (questionId: string, optionId: string) => {
    // If already answered, allow reselecting or keep answer
    setUserAnswers(prev => ({ ...prev, [questionId]: optionId }));
  };

  const resetQuiz = () => {
    setUserAnswers({});
  };

  // Quiz statistics
  const totalQuestions = QUIZ_QUESTIONS.length;
  const answeredCount = Object.keys(userAnswers).length;
  const correctCount = QUIZ_QUESTIONS.reduce((acc, q) => {
    return userAnswers[q.id] === q.correctOptionId ? acc + 1 : acc;
  }, 0);

  return (
    <div className="space-y-6">
      {/* Header and Section Switcher */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Trophy className="w-5 h-5 text-indigo-600" />
              Prática e Fixação em Python
            </h2>
            <p className="text-sm text-slate-600 mt-1 leading-relaxed">
              Teste seus conhecimentos com o <strong>Quiz Rápido de Sintaxe</strong> ou pratique com os <strong>Desafios de Código</strong> para expandir a calculadora.
            </p>
          </div>

          {/* Segmented Control Buttons */}
          <div className="flex items-center p-1 bg-slate-100 rounded-lg text-xs font-semibold shrink-0 self-start sm:self-auto">
            <button
              onClick={() => setActiveSection('quiz')}
              className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
                activeSection === 'quiz'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
              <span>Quiz Rápido ({totalQuestions} perguntas)</span>
            </button>
            <button
              onClick={() => setActiveSection('challenges')}
              className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
                activeSection === 'challenges'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Desafios de Código (4)</span>
            </button>
          </div>
        </div>
      </div>

      {/* QUIZ SECTION */}
      {activeSection === 'quiz' && (
        <div className="space-y-6">
          {/* Quiz Scoreboard Banner */}
          <div className="bg-slate-950 text-white rounded-xl p-5 border border-slate-800 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="text-xs text-indigo-400 font-semibold tracking-wide uppercase">
                  Progresso do Quiz de Sintaxe
                </div>
                <div className="text-sm text-slate-300">
                  Respondidas: <strong className="text-white">{answeredCount}</strong> de {totalQuestions} · 
                  Acertos: <strong className="text-emerald-400">{correctCount}</strong>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {answeredCount > 0 && (
                  <button
                    onClick={resetQuiz}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Recomeçar Quiz</span>
                  </button>
                )}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-4">
              <div
                className="bg-indigo-500 h-full transition-all duration-300 rounded-full"
                style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
              />
            </div>
          </div>

          {/* Questions List */}
          <div className="grid grid-cols-1 gap-6">
            {QUIZ_QUESTIONS.map((q, idx) => {
              const selectedOptionId = userAnswers[q.id];
              const isAnswered = !!selectedOptionId;
              const isCorrect = selectedOptionId === q.correctOptionId;

              return (
                <div
                  key={q.id}
                  className={`bg-white border rounded-xl p-5 sm:p-6 shadow-xs transition-all ${
                    isAnswered
                      ? isCorrect
                        ? 'border-emerald-200'
                        : 'border-rose-200'
                      : 'border-slate-200'
                  }`}
                >
                  {/* Question header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-md bg-indigo-50 text-indigo-700 font-bold text-xs flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        {q.conceptTag}
                      </span>
                    </div>

                    {isAnswered && (
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded ${
                          isCorrect
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {isCorrect ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Correto!</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5 text-rose-600" />
                            <span>Incorreto</span>
                          </>
                        )}
                      </span>
                    )}
                  </div>

                  {/* Question text */}
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {q.question}
                  </h3>

                  {/* Optional code snippet */}
                  {q.codeSnippet && (
                    <pre className="mt-3 p-3 bg-slate-950 text-emerald-300 font-mono text-xs sm:text-[13px] rounded-lg border border-slate-800 leading-relaxed overflow-x-auto">
                      {q.codeSnippet}
                    </pre>
                  )}

                  {/* Options List */}
                  <div className="mt-4 space-y-2">
                    {q.options.map(opt => {
                      const isThisSelected = selectedOptionId === opt.id;
                      const isThisCorrect = q.correctOptionId === opt.id;

                      let buttonStyle = 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200';

                      if (isAnswered) {
                        if (isThisCorrect) {
                          buttonStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold ring-1 ring-emerald-500/30';
                        } else if (isThisSelected && !isThisCorrect) {
                          buttonStyle = 'bg-rose-50 border-rose-400 text-rose-950 line-through ring-1 ring-rose-400/30';
                        } else {
                          buttonStyle = 'bg-slate-50 opacity-60 text-slate-600 border-slate-200';
                        }
                      }

                      return (
                        <button
                          key={opt.id}
                          onClick={() => handleSelectOption(q.id, opt.id)}
                          className={`w-full text-left p-3 rounded-lg text-xs sm:text-sm border transition-all flex items-center justify-between gap-3 ${buttonStyle}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-5 h-5 rounded-full bg-white border border-slate-300 text-slate-700 text-xs font-bold flex items-center justify-center shrink-0 uppercase">
                              {opt.id}
                            </span>
                            <span className="font-mono">{opt.text}</span>
                          </div>

                          {isAnswered && isThisCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          )}
                          {isAnswered && isThisSelected && !isThisCorrect && (
                            <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Immediate Feedback Explanation Box */}
                  {isAnswered && (
                    <div
                      className={`mt-4 p-3.5 rounded-lg text-xs leading-relaxed border space-y-1 ${
                        isCorrect
                          ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                          : 'bg-amber-50/70 border-amber-200 text-amber-950'
                      }`}
                    >
                      <div className="font-bold flex items-center gap-1.5">
                        <Lightbulb className={`w-3.5 h-3.5 ${isCorrect ? 'text-emerald-700' : 'text-amber-700'}`} />
                        <span>Explicação pedagógica:</span>
                      </div>
                      <p className={isCorrect ? 'text-emerald-900' : 'text-amber-900'}>
                        {q.explanation}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* PRACTICAL CODING CHALLENGES SECTION */}
      {activeSection === 'challenges' && (
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
      )}
    </div>
  );
}
