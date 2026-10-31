import { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, RotateCcw, ArrowRight, Layers, Cpu, Database, CheckCircle2, AlertCircle } from 'lucide-react';

interface DebugStep {
  stepNumber: number;
  activeLine: number;
  codeSnippet: string;
  title: string;
  description: string;
  callStack: string[];
  variables: { name: string; type: string; value: string }[];
  consoleOutput: string[];
  status: 'info' | 'decision' | 'math' | 'return' | 'error';
}

const SCENARIOS: { id: string; name: string; opName: string; steps: DebugStep[] }[] = [
  {
    id: 'soma',
    name: 'Cenário 1: Soma (12 + 8 = 20)',
    opName: 'Adição',
    steps: [
      {
        stepNumber: 1,
        activeLine: 34,
        codeSnippet: 'while True:',
        title: 'Entrando no laço principal',
        description: 'O programa inicia o loop infinito "while True". Ele continuará ativo exibindo o menu e calculando até o usuário pedir para sair.',
        callStack: ['calculadora()'],
        variables: [],
        consoleOutput: [
          '===================================',
          '      CALCULADORA EM PYTHON        ',
          '===================================',
          'Escolha uma operação:'
        ],
        status: 'info'
      },
      {
        stepNumber: 2,
        activeLine: 44,
        codeSnippet: 'opcao = input("Digite sua opção...").strip()',
        title: 'Recebendo a opção do usuário',
        description: 'O usuário digitou "1" no terminal. O Python armazena a string "1" na variável local "opcao".',
        callStack: ['calculadora()'],
        variables: [{ name: 'opcao', type: 'str (texto)', value: '"1"' }],
        consoleOutput: ['Digite sua opção: 1'],
        status: 'info'
      },
      {
        stepNumber: 3,
        activeLine: 56,
        codeSnippet: 'num1 = float(input("Digite o primeiro número: "))',
        title: 'Lendo e convertendo o primeiro número',
        description: 'O usuário digitou "12". A função float("12") transforma o texto em um número decimal 12.0 na memória RAM.',
        callStack: ['calculadora()'],
        variables: [
          { name: 'opcao', type: 'str', value: '"1"' },
          { name: 'num1', type: 'float (número)', value: '12.0' }
        ],
        consoleOutput: ['Digite o primeiro número: 12'],
        status: 'info'
      },
      {
        stepNumber: 4,
        activeLine: 57,
        codeSnippet: 'num2 = float(input("Digite o segundo número: "))',
        title: 'Lendo e convertendo o segundo número',
        description: 'O usuário digitou "8". A função float("8") cria a variável num2 com o valor 8.0.',
        callStack: ['calculadora()'],
        variables: [
          { name: 'opcao', type: 'str', value: '"1"' },
          { name: 'num1', type: 'float', value: '12.0' },
          { name: 'num2', type: 'float', value: '8.0' }
        ],
        consoleOutput: ['Digite o segundo número: 8'],
        status: 'info'
      },
      {
        stepNumber: 5,
        activeLine: 64,
        codeSnippet: 'if opcao == \'1\':',
        title: 'Testando a condição IF',
        description: 'O Python compara: opcao (\'1\') é igual a \'1\'? Sim, é Verdadeiro (True)! O bloco correspondente à adição será executado.',
        callStack: ['calculadora()'],
        variables: [
          { name: 'opcao', type: 'str', value: '"1"' },
          { name: 'num1', type: 'float', value: '12.0' },
          { name: 'num2', type: 'float', value: '8.0' }
        ],
        consoleOutput: [],
        status: 'decision'
      },
      {
        stepNumber: 6,
        activeLine: 8,
        codeSnippet: 'def somar(a, b):\n    return a + b',
        title: 'Chamando a função somar(12.0, 8.0)',
        description: 'A função somar é chamada! O parâmetro "a" recebe 12.0 e "b" recebe 8.0. A CPU calcula 12.0 + 8.0 = 20.0 e retorna o resultado.',
        callStack: ['calculadora()', 'somar(a=12.0, b=8.0)'],
        variables: [
          { name: 'a (parâmetro)', type: 'float', value: '12.0' },
          { name: 'b (parâmetro)', type: 'float', value: '8.0' }
        ],
        consoleOutput: [],
        status: 'math'
      },
      {
        stepNumber: 7,
        activeLine: 66,
        codeSnippet: 'print(f"\\n✅ Resultado: {num1} + {num2} = {resultado}")',
        title: 'Formatando e exibindo a F-String',
        description: 'A variável "resultado" recebeu 20.0. A f-string substitui {num1}, {num2} e {resultado} pelos seus respectivos valores e imprime no console.',
        callStack: ['calculadora()'],
        variables: [
          { name: 'num1', type: 'float', value: '12.0' },
          { name: 'num2', type: 'float', value: '8.0' },
          { name: 'resultado', type: 'float', value: '20.0' }
        ],
        consoleOutput: ['✅ Resultado: 12.0 + 8.0 = 20.0'],
        status: 'return'
      }
    ]
  },
  {
    id: 'divisao-zero',
    name: 'Cenário 2: Tratamento de Divisão por Zero (15 / 0)',
    opName: 'Proteção ZeroDivisionError',
    steps: [
      {
        stepNumber: 1,
        activeLine: 44,
        codeSnippet: 'opcao = input("Digite sua opção: ")',
        title: 'Usuário escolhe opção 4 (Divisão)',
        description: 'O usuário seleciona a opção "4" para realizar uma divisão.',
        callStack: ['calculadora()'],
        variables: [{ name: 'opcao', type: 'str', value: '"4"' }],
        consoleOutput: ['Digite sua opção: 4'],
        status: 'info'
      },
      {
        stepNumber: 2,
        activeLine: 56,
        codeSnippet: 'num1 = float(input(...))\nnum2 = float(input(...))',
        title: 'Lendo números 15 e 0',
        description: 'O primeiro número é 15.0 e o segundo é 0.0. Na matemática, dividir qualquer número por 0 é indefinido.',
        callStack: ['calculadora()'],
        variables: [
          { name: 'num1', type: 'float', value: '15.0' },
          { name: 'num2', type: 'float', value: '0.0' }
        ],
        consoleOutput: ['Primeiro número: 15', 'Segundo número: 0'],
        status: 'info'
      },
      {
        stepNumber: 3,
        activeLine: 20,
        codeSnippet: 'def dividir(a, b):\n    if b == 0:',
        title: 'Verificação de segurança dentro da função',
        description: 'A função dividir é chamada com a=15.0 e b=0.0. A linha "if b == 0" verifica se o divisor é zero. Como b é 0.0, a condição é VERDADEIRA!',
        callStack: ['calculadora()', 'dividir(a=15.0, b=0.0)'],
        variables: [
          { name: 'a', type: 'float', value: '15.0' },
          { name: 'b', type: 'float', value: '0.0' }
        ],
        consoleOutput: [],
        status: 'decision'
      },
      {
        stepNumber: 4,
        activeLine: 25,
        codeSnippet: 'return "Erro: Não é possível dividir por zero!"',
        title: 'Retornando mensagem amigável de erro',
        description: 'Em vez de tentar fazer 15.0 / 0.0 (o que causaria ZeroDivisionError e derrubaria o programa), o Python retorna uma string explicativa.',
        callStack: ['calculadora()', 'dividir(a=15.0, b=0.0)'],
        variables: [{ name: 'retorno', type: 'str', value: '"Erro: Não é possível dividir por zero!"' }],
        consoleOutput: [],
        status: 'error'
      },
      {
        stepNumber: 5,
        activeLine: 76,
        codeSnippet: 'if isinstance(resultado, str):\n    print(f"\\n⚠️ {resultado}")',
        title: 'Exibindo aviso no terminal',
        description: 'O programa verifica se o resultado é uma string com "isinstance(resultado, str)". Como é um texto de erro, avisa o usuário e continua o programa.',
        callStack: ['calculadora()'],
        variables: [{ name: 'resultado', type: 'str', value: '"Erro: Não é possível dividir por zero!"' }],
        consoleOutput: ['⚠️ Erro: Não é possível dividir por zero!'],
        status: 'return'
      }
    ]
  }
];

export function VisualDebugger() {
  const [activeScenarioId, setActiveScenarioId] = useState<string>(SCENARIOS[0].id);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const scenario = SCENARIOS.find(s => s.id === activeScenarioId) || SCENARIOS[0];
  const currentStep = scenario.steps[currentStepIndex] || scenario.steps[0];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStepIndex(prev => {
          if (prev >= scenario.steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, scenario.steps.length]);

  const handleNext = () => {
    if (currentStepIndex < scenario.steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  return (
    <div className="space-y-6">
      {/* Scenario switcher and toolbar */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Cpu className="w-5 h-5 text-indigo-600" />
              Depurador Visual: O Python "Por Trás dos Panos"
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Veja passo a passo o que acontece na memória RAM, na pilha de chamadas e no processador durante cada linha de código.
            </p>
          </div>

          {/* Player controls */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleReset}
              className="p-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              title="Reiniciar depuração"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              Voltar
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pausar' : 'Animar'}</span>
            </button>
            <button
              onClick={handleNext}
              disabled={currentStepIndex === scenario.steps.length - 1}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center gap-1"
            >
              <span>Avançar</span>
              <SkipForward className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Scenario selector */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-slate-500 mr-2">Escolha uma demonstração:</span>
          {SCENARIOS.map(sc => (
            <button
              key={sc.id}
              onClick={() => {
                setActiveScenarioId(sc.id);
                setCurrentStepIndex(0);
                setIsPlaying(false);
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeScenarioId === sc.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {sc.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Debugger Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Step Breakdown Card */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
            {/* Step header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-indigo-100 text-indigo-800 font-mono text-xs font-bold rounded-md">
                  Passo {currentStep.stepNumber} de {scenario.steps.length}
                </span>
                <span className="text-xs font-medium text-slate-500">
                  Linha de execução: {currentStep.activeLine}
                </span>
              </div>
              <div className="text-xs font-medium text-slate-400">
                {scenario.opName}
              </div>
            </div>

            {/* Step Title & Explanation */}
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {currentStep.title}
              </h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                {currentStep.description}
              </p>
            </div>

            {/* Active code box */}
            <div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Código executado neste instante:
              </div>
              <pre className="p-3 bg-slate-950 text-emerald-300 font-mono text-xs sm:text-[13px] rounded-lg border border-slate-800 leading-relaxed overflow-x-auto">
                {currentStep.codeSnippet}
              </pre>
            </div>

            {/* Timeline progress bar */}
            <div className="pt-2">
              <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1.5">
                <span>Início do comando</span>
                <span>Finalizado</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-indigo-600 h-full transition-all duration-300 rounded-full"
                  style={{ width: `${((currentStepIndex + 1) / scenario.steps.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Simulated Console Output */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs shadow-xs">
            <div className="text-slate-400 text-[11px] font-sans font-semibold mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Saída no Console até este passo:</span>
            </div>
            <div className="space-y-1 text-slate-300 min-h-[70px]">
              {currentStep.consoleOutput.length > 0 ? (
                currentStep.consoleOutput.map((line, i) => (
                  <div key={i} className="text-emerald-300">{line}</div>
                ))
              ) : (
                <div className="text-slate-600 italic">(Aguardando próxima instrução de saída...)</div>
              )}
            </div>
          </div>
        </div>

        {/* Internal Memory & Call Stack Panels */}
        <div className="lg:col-span-5 space-y-4">
          {/* Call Stack Panel */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-3">
              <Layers className="w-4 h-4 text-indigo-600" />
              <span>Pilha de Funções Ativas (Call Stack)</span>
            </div>
            <div className="space-y-1.5">
              {currentStep.callStack.map((frame, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded-lg font-mono text-xs flex items-center justify-between border ${
                    idx === currentStep.callStack.length - 1
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-950 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  <span>{frame}</span>
                  {idx === currentStep.callStack.length - 1 && (
                    <span className="text-[10px] uppercase font-sans tracking-wide bg-indigo-200 text-indigo-900 px-1.5 py-0.5 rounded">
                      Executando Agora
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Variables in Memory (RAM) */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-3">
              <Database className="w-4 h-4 text-indigo-600" />
              <span>Variáveis na Memória (Tabela de Símbolos)</span>
            </div>
            {currentStep.variables.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-sans text-[11px]">
                      <th className="pb-2 font-medium">Nome</th>
                      <th className="pb-2 font-medium">Tipo</th>
                      <th className="pb-2 font-medium">Valor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {currentStep.variables.map((v, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="py-2 text-indigo-600 font-semibold">{v.name}</td>
                        <td className="py-2 text-slate-500 text-[11px] font-sans">{v.type}</td>
                        <td className="py-2 text-slate-900 font-bold">{v.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-xs text-slate-500 italic p-3 text-center">
                Nenhuma variável local declarada ainda.
              </div>
            )}
          </div>

          {/* Pedagogical Tip */}
          <div className="p-4 bg-amber-50/60 border border-amber-200/80 rounded-xl text-xs text-amber-900 space-y-1">
            <div className="font-bold flex items-center gap-1.5 text-amber-950">
              <CheckCircle2 className="w-4 h-4 text-amber-600" />
              <span>Dica de Aprendizado:</span>
            </div>
            <p className="leading-relaxed text-amber-800">
              Observe que quando uma função é chamada, o Python pausa a função anterior temporariamente e cria uma nova "gaveta" na memória só para as variáveis daquela função!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
