import { useState } from 'react';
import { FileText, Copy, Check, Download, GitBranch, Terminal, ExternalLink, Code } from 'lucide-react';
import { README_MD_CONTENT } from '../data/readmeContent';

export function ReadmeViewer() {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'preview' | 'raw'>('preview');

  const handleCopy = () => {
    navigator.clipboard.writeText(README_MD_CONTENT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([README_MD_CONTENT], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'README.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Action Header Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-600" />
              Documentação README.md para o GitHub
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Arquivo formatado em Markdown com instruções de instalação do Python, execução e explicação do projeto.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* View Mode Toggle */}
            <div className="flex items-center p-1 bg-slate-100 rounded-lg text-xs font-semibold mr-1">
              <button
                onClick={() => setViewMode('preview')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  viewMode === 'preview'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Visualização
              </button>
              <button
                onClick={() => setViewMode('raw')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  viewMode === 'raw'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Código Markdown
              </button>
            </div>

            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copiado!' : 'Copiar'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>Baixar README.md</span>
            </button>
          </div>
        </div>
      </div>

      {/* GitHub Git Push Tutorial Box */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 shadow-xs text-slate-200">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 mb-2">
          <GitBranch className="w-4 h-4" />
          <span>Passo a Passo: Como publicar no GitHub pelo Terminal</span>
        </div>
        <p className="text-xs text-slate-400 mb-3 leading-relaxed">
          Crie um novo repositório vazio no GitHub chamado <strong className="text-slate-200">calculadora-python</strong>. Em seguida, na pasta onde salvou o <code className="text-emerald-400">calculadora.py</code> e o <code className="text-emerald-400">README.md</code>, execute estes comandos em ordem:
        </p>
        <pre className="p-3 bg-slate-900 rounded-lg text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed border border-slate-800">
          git init{'\n'}
          git add .{'\n'}
          git commit -m "feat: calculadora simples em python com 4 operacoes"{'\n'}
          git branch -M main{'\n'}
          git remote add origin https://github.com/SEU-USUARIO/calculadora-python.git{'\n'}
          git push -u origin main
        </pre>
      </div>

      {/* Explanatory FAQ for the user's question */}
      <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-5 shadow-xs space-y-3 text-slate-800">
        <h3 className="text-sm font-bold text-amber-950 flex items-center gap-2">
          <span>💡 Por que o GitHub indicou 95,7% TypeScript e apenas 2,6% Python?</span>
        </h3>
        <p className="text-xs text-amber-900 leading-relaxed">
          O GitHub calcula as linguagens somando a <strong>quantidade de bytes (tamanho dos arquivos)</strong> de todo o repositório. Como você enviou o projeto inteiro com o laboratório interativo (escrito em React e TypeScript no diretório <code className="bg-white/80 px-1 py-0.5 rounded font-mono text-slate-800">src/</code>), o TypeScript tem muito mais linhas de código do que o arquivo <code className="bg-white/80 px-1 py-0.5 rounded font-mono text-slate-800">calculadora.py</code>.
        </p>
        
        <div className="pt-2 border-t border-amber-200/80 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="bg-white/80 p-3 rounded-lg border border-amber-100 space-y-1">
            <span className="font-bold text-slate-900">Para que serve o index.html e os outros arquivos?</span>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Eles são o código da <strong>Aplicação Web Interativa (AI Studio)</strong> que você está usando agora (com o terminal virtual, quiz e depurador). O <code className="font-mono">index.html</code> é a página web que o navegador abre para carregar a interface.
            </p>
          </div>

          <div className="bg-white/80 p-3 rounded-lg border border-amber-100 space-y-1">
            <span className="font-bold text-slate-900">Como deixar seu GitHub 100% Python?</span>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Já criamos o arquivo <code className="font-mono text-indigo-700">.gitattributes</code> no projeto! Basta fazer um novo commit para que o GitHub oculte os arquivos web das estatísticas e exiba <strong>100% Python</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Content Area */}
      {viewMode === 'raw' ? (
        <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-xs">
          <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono text-slate-300">README.md (Raw Markdown)</span>
            <span>UTF-8</span>
          </div>
          <pre className="p-5 font-mono text-xs sm:text-[13px] text-slate-200 overflow-x-auto leading-relaxed max-h-[700px] overflow-y-auto">
            {README_MD_CONTENT}
          </pre>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-10 shadow-xs space-y-6 text-slate-800 leading-relaxed max-w-4xl mx-auto">
          {/* GitHub-like rendered preview */}
          <div className="border-b border-slate-200 pb-5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight flex items-center gap-3">
              <span>🧮 Calculadora Simples em Python</span>
            </h1>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Uma calculadora de linha de comando (CLI) desenvolvida em <strong>Python 3</strong>, ideal para iniciantes em programação. O projeto realiza as quatro operações matemáticas fundamentais de forma interativa, modular e com tratamento robusto de erros.
            </p>
          </div>

          {/* Section: Funcionalidades */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-slate-950 border-b border-slate-100 pb-2">
              🚀 Funcionalidades
            </h2>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span>➕</span>
                <div><strong>Adição:</strong> Soma dois números decimais ou inteiros.</div>
              </li>
              <li className="flex items-start gap-2">
                <span>➖</span>
                <div><strong>Subtração:</strong> Subtrai o segundo número do primeiro.</div>
              </li>
              <li className="flex items-start gap-2">
                <span>✖️</span>
                <div><strong>Multiplicação:</strong> Multiplica dois valores.</div>
              </li>
              <li className="flex items-start gap-2">
                <span>➗</span>
                <div><strong>Divisão Segura:</strong> Previne encerramento do programa por divisão por zero (<code className="bg-slate-100 px-1 py-0.5 rounded text-xs font-mono text-slate-800">ZeroDivisionError</code>).</div>
              </li>
              <li className="flex items-start gap-2">
                <span>🔁</span>
                <div><strong>Execução Contínua:</strong> Permite realizar múltiplos cálculos sem reiniciar (<code className="bg-slate-100 px-1 py-0.5 rounded text-xs font-mono text-slate-800">while True</code>).</div>
              </li>
              <li className="flex items-start gap-2">
                <span>🛡️</span>
                <div><strong>Tratamento de Exceções:</strong> Protege o programa caso o usuário digite texto ou letras (<code className="bg-slate-100 px-1 py-0.5 rounded text-xs font-mono text-slate-800">try / except ValueError</code>).</div>
              </li>
            </ul>
          </div>

          {/* Section: Estrutura do Código */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-slate-950 border-b border-slate-100 pb-2">
              📂 Estrutura do Código
            </h2>
            <pre className="p-3 bg-slate-100 rounded-lg text-xs font-mono text-slate-800">
              calculadora-python/{'\n'}
              │{'\n'}
              ├── calculadora.py    # Script principal da aplicação{'\n'}
              └── README.md         # Documentação do projeto
            </pre>
            <div className="text-sm text-slate-700 space-y-2">
              <p><strong>1. Funções Modulares (def):</strong> Cada cálculo possui sua própria função.</p>
              <p><strong>2. Conversão float(input()):</strong> Transforma texto lido em número decimal.</p>
              <p><strong>3. Menu Interativo:</strong> Escolha amigável de 1 a 5.</p>
              <p><strong>4. if __name__ == '__main__':</strong> Padrão profissional da comunidade Python.</p>
            </div>
          </div>

          {/* Section: Pré-requisitos */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-950 border-b border-slate-100 pb-2">
              🛠️ Pré-requisitos: Como Instalar o Python
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1.5">
                <div className="font-bold text-slate-900">🪟 Windows</div>
                <p className="text-slate-600">Baixe no site oficial <strong className="text-slate-800">python.org</strong>. Marque a caixa <em>"Add python.exe to PATH"</em>.</p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1.5">
                <div className="font-bold text-slate-900">🍎 macOS</div>
                <p className="text-slate-600">Instale via Homebrew com <code className="bg-white px-1 py-0.5 rounded font-mono">brew install python</code>.</p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1.5">
                <div className="font-bold text-slate-900">🐧 Linux</div>
                <p className="text-slate-600">Instale via apt com <code className="bg-white px-1 py-0.5 rounded font-mono">sudo apt install python3</code>.</p>
              </div>
            </div>
          </div>

          {/* Section: Como Executar */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-slate-950 border-b border-slate-100 pb-2">
              ▶️ Como Executar a Calculadora
            </h2>
            <div className="space-y-2 text-sm text-slate-700">
              <p>No terminal dentro da pasta do projeto, execute:</p>
              <pre className="p-3 bg-slate-900 text-emerald-300 rounded-lg font-mono text-xs">
                python calculadora.py
              </pre>
              <p className="text-xs text-slate-500">No macOS ou Linux, use <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">python3 calculadora.py</code> se necessário.</p>
            </div>
          </div>

          {/* Footer note */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <span>Licença: MIT Open Source</span>
            <span>Documentação pronta para o GitHub</span>
          </div>
        </div>
      )}
    </div>
  );
}
