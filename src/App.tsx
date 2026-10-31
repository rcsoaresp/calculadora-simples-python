import { useState } from 'react';
import { Download, Code2, Terminal, Cpu, Trophy, Laptop, Check, Copy, BookOpen } from 'lucide-react';
import { CodeExplainer } from './components/CodeExplainer';
import { PythonTerminal } from './components/PythonTerminal';
import { VisualDebugger } from './components/VisualDebugger';
import { BeginnerChallenges } from './components/BeginnerChallenges';
import { ComputerSetupGuide } from './components/ComputerSetupGuide';
import { ReadmeViewer } from './components/ReadmeViewer';
import { PYTHON_CALCULATOR_CODE } from './data/calculatorCode';

export default function App() {
  const [activeTab, setActiveTab] = useState<'codigo' | 'terminal' | 'debug' | 'desafios' | 'readme' | 'guia'>('codigo');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

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
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 antialiased selection:bg-indigo-500 selection:text-white">
      {/* Top Bar following the 3-zone contract */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
              Py
            </div>
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('codigo');
              }}
              className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:text-indigo-600 transition-colors"
            >
              Python CalcLab
            </a>
          </div>

          {/* Zone 2: 5 concise single-line nav tabs */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => setActiveTab('codigo')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'codigo'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Código</span>
            </button>
            <button
              onClick={() => setActiveTab('terminal')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'terminal'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Terminal</span>
            </button>
            <button
              onClick={() => setActiveTab('debug')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'debug'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Depurador</span>
            </button>
            <button
              onClick={() => setActiveTab('desafios')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'desafios'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Desafios</span>
            </button>
            <button
              onClick={() => setActiveTab('readme')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'readme'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>README GitHub</span>
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0"
              title="Baixar calculadora.py"
            >
              {downloadSuccess ? <Check className="w-4 h-4 text-emerald-200" /> : <Download className="w-4 h-4" />}
              <span>{downloadSuccess ? 'Download Concluído!' : 'Baixar calculadora.py'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="md:hidden flex items-center gap-1 px-4 py-2 border-t border-slate-200 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('codigo')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md whitespace-nowrap shrink-0 ${
              activeTab === 'codigo' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Código
          </button>
          <button
            onClick={() => setActiveTab('terminal')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md whitespace-nowrap shrink-0 ${
              activeTab === 'terminal' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Terminal
          </button>
          <button
            onClick={() => setActiveTab('debug')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md whitespace-nowrap shrink-0 ${
              activeTab === 'debug' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Depurador
          </button>
          <button
            onClick={() => setActiveTab('desafios')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md whitespace-nowrap shrink-0 ${
              activeTab === 'desafios' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Desafios
          </button>
          <button
            onClick={() => setActiveTab('readme')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md whitespace-nowrap shrink-0 ${
              activeTab === 'readme' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            README
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Banner with pedagogical summary */}
        <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 text-white rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden">
          <div className="max-w-2xl relative z-10 space-y-3">
            <div className="text-xs font-bold tracking-wider text-indigo-400 uppercase">
              Primeiros Passos em Programação · Python 3
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
              Sua Primeira Calculadora em Python: As 4 Operações Básicas
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Aprenda a estruturar um programa profissional com funções modulares, laço de repetição contínuo, leitura de teclado e proteção contra erros comuns como divisão por zero.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setActiveTab('terminal')}
                className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-1.5 shadow-xs"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Testar no Terminal do Navegador</span>
              </button>
              <button
                onClick={() => setActiveTab('debug')}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition-colors inline-flex items-center gap-1.5"
              >
                <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                <span>Ver Execução Passo a Passo</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Tab Content */}
        {activeTab === 'codigo' && (
          <CodeExplainer onRunInTerminal={() => setActiveTab('terminal')} />
        )}

        {activeTab === 'terminal' && (
          <PythonTerminal />
        )}

        {activeTab === 'debug' && (
          <VisualDebugger />
        )}

        {activeTab === 'desafios' && (
          <BeginnerChallenges />
        )}

        {activeTab === 'readme' && (
          <ReadmeViewer />
        )}

        {activeTab === 'guia' && (
          <ComputerSetupGuide />
        )}
      </main>

      {/* Quiet, clean educational footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Python CalcLab</span>
            <span aria-hidden="true">·</span>
            <span>Ambiente Didático para Iniciantes em Programação</span>
          </div>
          <div>
            Pronto para rodar no Windows, macOS, Linux ou Colab.
          </div>
        </div>
      </footer>
    </div>
  );
}
