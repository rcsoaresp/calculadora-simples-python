import { Terminal, Laptop, Globe, AlertOctagon, CheckCircle2, FileCode, Lightbulb } from 'lucide-react';

export function ComputerSetupGuide() {
  return (
    <div className="space-y-6">
      {/* Intro */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Laptop className="w-5 h-5 text-indigo-600" />
          Como Executar este Código no seu Computador
        </h2>
        <p className="text-sm text-slate-600 mt-1 leading-relaxed">
          Siga o guia passo a passo para rodar sua calculadora no seu computador usando o VS Code, o Terminal, ou diretamente pela nuvem.
        </p>
      </div>

      {/* Execution methods grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Method 1: VS Code */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-9 h-9 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center font-bold">
              <FileCode className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Método 1: Com VS Code (Recomendado)
            </h3>
            <ol className="space-y-2 text-xs text-slate-600 list-decimal list-inside leading-relaxed">
              <li>Instale o Python em <strong>python.org</strong>.</li>
              <li>Abra o VS Code e instale a extensão <strong>Python</strong> (da Microsoft).</li>
              <li>Crie um arquivo chamado <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800">calculadora.py</code>.</li>
              <li>Cole o código nele e clique no botão de <strong>Play (▶)</strong> no canto superior direito.</li>
            </ol>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
            Perfeito para criar e organizar seus próximos projetos de programação.
          </div>
        </div>

        {/* Method 2: Terminal */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center font-bold">
              <Terminal className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Método 2: Direto pelo Terminal / CMD
            </h3>
            <ol className="space-y-2 text-xs text-slate-600 list-decimal list-inside leading-relaxed">
              <li>Salve o arquivo <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800">calculadora.py</code> em uma pasta (ex: Documentos).</li>
              <li>Abra o Terminal (Mac/Linux) ou Prompt de Comando / PowerShell (Windows).</li>
              <li>Navegue até a pasta usando <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800">cd Documentos</code>.</li>
              <li>Execute o comando: <code className="bg-slate-900 text-emerald-400 px-1.5 py-0.5 rounded font-mono">python calculadora.py</code>.</li>
            </ol>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
            No Mac/Linux, se o comando não for encontrado, tente <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800">python3 calculadora.py</code>.
          </div>
        </div>

        {/* Method 3: Cloud / Online */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Método 3: 100% Online (Sem Instalar Nada)
            </h3>
            <ol className="space-y-2 text-xs text-slate-600 list-decimal list-inside leading-relaxed">
              <li>Acesse o <strong>Google Colab</strong> (colab.research.google.com) ou <strong>Replit</strong> (replit.com).</li>
              <li>Crie um novo arquivo ou caderno Python.</li>
              <li>Cole o código da calculadora.</li>
              <li>Clique em <strong>Run</strong> ou aperte <strong>Shift + Enter</strong> para executar e interagir no navegador!</li>
            </ol>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
            Ideal se estiver no celular, tablet ou em um computador do trabalho/escola.
          </div>
        </div>
      </div>

      {/* Critical Beginner Pitfalls (Os Erros Mais Comuns) */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <AlertOctagon className="w-5 h-5 text-rose-500" />
          Os 4 Erros Mais Comuns de Quem Está Começando em Python
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2 text-xs">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              <span>1. IndentationError (Erro de Indentação)</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Diferente de linguagens como C ou JavaScript que usam chaves <code className="bg-white px-1 py-0.5 rounded border border-slate-200 font-mono">{"{ }"}</code>, o Python usa <strong>espaços à esquerda</strong> (normalmente 4 espaços) para saber o que está dentro de uma função ou laço <code className="bg-white px-1 py-0.5 rounded border border-slate-200 font-mono">while</code>. Nunca misture a tecla Tab com a barra de espaços!
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2 text-xs">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              <span>2. Esquecer de marcar "Add Python to PATH" no Windows</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Ao instalar o Python no Windows, na primeira tela do instalador, existe uma caixinha no rodapé chamada <strong>"Add python.exe to PATH"</strong>. Se você não marcar essa caixa, o terminal não reconhecerá a palavra <code className="bg-white px-1 py-0.5 rounded border border-slate-200 font-mono">python</code>.
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2 text-xs">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              <span>3. TypeError ao fazer contas com input()</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              A função <code className="bg-white px-1 py-0.5 rounded border border-slate-200 font-mono">input()</code> sempre devolve um texto (String). Se você tentar somar <code className="bg-white px-1 py-0.5 rounded border border-slate-200 font-mono">"5" + "5"</code>, o resultado será o texto <code className="bg-white px-1 py-0.5 rounded border border-slate-200 font-mono">"55"</code>! Por isso, sempre envolva com <code className="bg-white px-1 py-0.5 rounded border border-slate-200 font-mono">float()</code> ou <code className="bg-white px-1 py-0.5 rounded border border-slate-200 font-mono">int()</code>.
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2 text-xs">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              <span>4. Diferença entre maiúsculas e minúsculas</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              O Python é <strong>Case-Sensitive</strong>. Escrever <code className="bg-white px-1 py-0.5 rounded border border-slate-200 font-mono">Print()</code> ou <code className="bg-white px-1 py-0.5 rounded border border-slate-200 font-mono">PRINT()</code> gerará um erro <code className="bg-white px-1 py-0.5 rounded border border-slate-200 font-mono">NameError</code>. Os comandos do Python são escritos estritamente em minúsculas (com raras exceções como <code className="bg-white px-1 py-0.5 rounded border border-slate-200 font-mono">True</code> e <code className="bg-white px-1 py-0.5 rounded border border-slate-200 font-mono">False</code>).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
