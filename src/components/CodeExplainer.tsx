import { useState } from 'react';
import { Copy, Check, Download, BookOpen, Sparkles, ChevronRight, Code2 } from 'lucide-react';
import { PYTHON_CALCULATOR_CODE, CODE_SECTIONS, CodeSection } from '../data/calculatorCode';

interface CodeExplainerProps {
  onRunInTerminal?: () => void;
}

export function CodeExplainer({ onRunInTerminal }: CodeExplainerProps) {
  const [selectedSectionId, setSelectedSectionId] = useState<string>(CODE_SECTIONS[0].id);
  const [copied, setCopied] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const selectedSection = CODE_SECTIONS.find(s => s.id === selectedSectionId) || CODE_SECTIONS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(PYTHON_CALCULATOR_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([PYTHON_CALCULATOR_CODE], { type: 'text/x-python;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'calculadora.py';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const lines = PYTHON_CALCULATOR_CODE.split('\n');

  // Syntax highlighting helper for Python
  const formatPythonLine = (line: string) => {
    if (!line.trim()) return <span>&nbsp;</span>;

    // Comments
    if (line.trim().startsWith('#')) {
      return <span className="text-slate-400 italic">{line}</span>;
    }

    // Docstrings
    if (line.includes('"""')) {
      return <span className="text-amber-300 italic">{line}</span>;
    }

    // Token replacement for standard python highlighting
    const parts = line.split(/(\b(?:def|return|while|True|False|break|continue|if|elif|else|try|except|import|from|in|not|is|isinstance|float|input|print|strip)\b|[0-9]+\.?[0-9]*|"[^"]*"|'[^']*'|#[^\n]*)/g);

    return (
      <>
        {parts.map((part, i) => {
          if (!part) return null;
          if (['def', 'return', 'while', 'True', 'False', 'break', 'continue', 'if', 'elif', 'else', 'try', 'except', 'in', 'not'].includes(part)) {
            return <span key={i} className="text-violet-400 font-semibold">{part}</span>;
          }
          if (['float', 'input', 'print', 'isinstance', 'strip'].includes(part)) {
            return <span key={i} className="text-sky-400 font-medium">{part}</span>;
          }
          if ((part.startsWith('"') && part.endsWith('"')) || (part.startsWith("'") && part.endsWith("'"))) {
            return <span key={i} className="text-emerald-300">{part}</span>;
          }
          if (/^[0-9]+\.?[0-9]*$/.test(part)) {
            return <span key={i} className="text-amber-400">{part}</span>;
          }
          if (part.startsWith('#')) {
            return <span key={i} className="text-slate-500 italic">{part}</span>;
          }
          return <span key={i} className="text-slate-200">{part}</span>;
        })}
      </>
    );
  };

  const filteredSections = activeFilter === 'all' 
    ? CODE_SECTIONS 
    : CODE_SECTIONS.filter(s => s.concept === activeFilter);

  return (
    <div className="space-y-6">
      {/* Intro banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Code2 className="w-5 h-5 text-indigo-600" />
              Código Fonte Organizado (calculadora.py)
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Código limpo, seguindo as diretrizes oficiais do Python (PEP 8). Clique em qualquer bloco para entender a lógica detalhada.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              title="Copiar código para a área de transferência"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copiado!' : 'Copiar Código'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors"
              title="Baixar arquivo calculadora.py pronto para rodar"
            >
              <Download className="w-4 h-4" />
              <span>Baixar calculadora.py</span>
            </button>
          </div>
        </div>

        {/* Concept Filter buttons */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-slate-500 mr-1">Filtrar por conceito:</span>
          {[
            { id: 'all', label: 'Todos os Blocos' },
            { id: 'funcoes', label: 'Funções (def)' },
            { id: 'loop', label: 'Repetição (while)' },
            { id: 'erros', label: 'Erros & Conversão' },
            { id: 'condicional', label: 'Condicionais (if/elif)' },
            { id: 'execucao', label: 'Ponto de Entrada' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                activeFilter === f.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main 2-column layout: Code on Left, Explanation on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Code column */}
        <div className="lg:col-span-7 bg-slate-950 rounded-xl border border-slate-800 shadow-md overflow-hidden flex flex-col">
          {/* Editor Header */}
          <div className="bg-slate-900/90 px-4 py-3 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
              <span className="ml-2 font-mono text-slate-300 font-medium">calculadora.py</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-slate-500">Python 3.10+</span>
              <span className="text-slate-500">82 linhas</span>
            </div>
          </div>

          {/* Code Body with line selection */}
          <div className="overflow-x-auto max-h-[640px] overflow-y-auto text-xs sm:text-[13px] font-mono leading-relaxed p-4 select-text">
            {lines.map((line, idx) => {
              const lineNum = idx + 1;
              const isSelected = lineNum >= selectedSection.startLine && lineNum <= selectedSection.endLine;
              
              // Check if this line starts any section
              const matchingSection = CODE_SECTIONS.find(s => s.startLine === lineNum);

              return (
                <div
                  key={lineNum}
                  onClick={() => {
                    const sec = CODE_SECTIONS.find(s => lineNum >= s.startLine && lineNum <= s.endLine);
                    if (sec) setSelectedSectionId(sec.id);
                  }}
                  className={`flex items-start transition-colors duration-150 cursor-pointer rounded-sm ${
                    isSelected ? 'bg-indigo-950/70 text-indigo-100 ring-1 ring-indigo-500/30' : 'hover:bg-slate-900/80'
                  }`}
                >
                  <span className={`w-10 shrink-0 text-right pr-4 select-none tabular-nums text-xs ${
                    isSelected ? 'text-indigo-400 font-bold' : 'text-slate-600'
                  }`}>
                    {lineNum}
                  </span>
                  <div className="flex-1 whitespace-pre pl-1">
                    {formatPythonLine(line)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Explanation Column */}
        <div className="lg:col-span-5 space-y-4">
          {/* Section selector tabs */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-2">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Selecione uma parte do código:
            </div>
            <div className="space-y-1.5">
              {filteredSections.map(sec => {
                const isActive = sec.id === selectedSection.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => setSelectedSectionId(sec.id)}
                    className={`w-full text-left p-2.5 rounded-lg text-xs transition-all flex items-center justify-between ${
                      isActive
                        ? 'bg-indigo-50 border border-indigo-200 text-indigo-950 font-medium shadow-xs'
                        : 'bg-white hover:bg-slate-50 text-slate-700 border border-transparent'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-slate-900">{sec.title}</div>
                      <div className="text-slate-500 text-[11px] mt-0.5">{sec.keyConcept} (Linhas {sec.startLine}-{sec.endLine})</div>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isActive ? 'text-indigo-600 translate-x-0.5' : 'text-slate-400'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active section deep dive */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">
                Explicando Linhas {selectedSection.startLine} a {selectedSection.endLine}
              </div>
              <h3 className="text-lg font-bold text-slate-950 mt-1">
                {selectedSection.title}
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                {selectedSection.subtitle}
              </p>
            </div>

            {/* Summary */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 leading-relaxed">
              <strong className="text-slate-900">Em resumo: </strong>
              {selectedSection.summary}
            </div>

            {/* Key bullet points */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-900">Como funciona por baixo dos panos:</div>
              <ul className="space-y-2 text-xs text-slate-600">
                {selectedSection.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                    <span className="leading-relaxed">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Code Highlight Snippet */}
            <div className="pt-2">
              <div className="text-xs font-semibold text-slate-700 mb-1.5">Trecho em destaque:</div>
              <pre className="bg-slate-950 text-slate-200 p-3 rounded-lg text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800">
                {selectedSection.codeSnippet}
              </pre>
            </div>

            {/* Action to test in terminal */}
            {onRunInTerminal && (
              <button
                onClick={onRunInTerminal}
                className="w-full mt-2 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>Testar este código no Terminal Interativo</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
