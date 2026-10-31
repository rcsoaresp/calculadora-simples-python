import { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Play, RotateCcw, Trash2, ArrowRight, CornerDownLeft, Sparkles, CheckCircle2, AlertTriangle } from 'lucide-react';

interface TerminalLine {
  id: string;
  type: 'output' | 'input' | 'prompt' | 'system' | 'error' | 'success';
  text: string;
}

export function PythonTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [executionState, setExecutionState] = useState<'waiting_option' | 'waiting_num1' | 'waiting_num2' | 'terminated'>('waiting_option');
  const [selectedOp, setSelectedOp] = useState<string>('1');
  const [firstNum, setFirstNum] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Initialize script
  const startSession = () => {
    const initialLines: TerminalLine[] = [
      { id: '1', type: 'system', text: 'Python 3.12.2 (main) [GCC 11.4.0] on linux' },
      { id: '2', type: 'system', text: '$ python calculadora.py' },
      { id: '3', type: 'output', text: '===================================' },
      { id: '4', type: 'output', text: '      CALCULADORA EM PYTHON        ' },
      { id: '5', type: 'output', text: '===================================' },
      { id: '6', type: 'output', text: 'Escolha uma operação:' },
      { id: '7', type: 'output', text: '1. Adição (+)' },
      { id: '8', type: 'output', text: '2. Subtração (-)' },
      { id: '9', type: 'output', text: '3. Multiplicação (*)' },
      { id: '10', type: 'output', text: '4. Divisão (/)' },
      { id: '11', type: 'output', text: '5. Sair' },
      { id: '12', type: 'prompt', text: 'Digite sua opção (1/2/3/4/5): ' }
    ];
    setLines(initialLines);
    setExecutionState('waiting_option');
    setSelectedOp('1');
    setFirstNum(null);
    setCurrentInput('');
  };

  useEffect(() => {
    startSession();
  }, []);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const printMenu = (currentLines: TerminalLine[]): TerminalLine[] => {
    return [
      ...currentLines,
      { id: String(Date.now() + 1), type: 'output', text: '' },
      { id: String(Date.now() + 2), type: 'output', text: 'Escolha uma operação:' },
      { id: String(Date.now() + 3), type: 'output', text: '1. Adição (+)' },
      { id: String(Date.now() + 4), type: 'output', text: '2. Subtração (-)' },
      { id: String(Date.now() + 5), type: 'output', text: '3. Multiplicação (*)' },
      { id: String(Date.now() + 6), type: 'output', text: '4. Divisão (/)' },
      { id: String(Date.now() + 7), type: 'output', text: '5. Sair' },
      { id: String(Date.now() + 8), type: 'prompt', text: 'Digite sua opção (1/2/3/4/5): ' }
    ];
  };

  const handleUserInput = (inputValue: string) => {
    const val = inputValue.trim();
    if (!val && executionState !== 'terminated') return;

    let newLines = [...lines, { id: String(Date.now()), type: 'input' as const, text: val }];

    if (executionState === 'waiting_option') {
      if (val === '5') {
        newLines.push({
          id: String(Date.now() + 1),
          type: 'success',
          text: 'Obrigado por usar a calculadora! Bons estudos em Python! 🚀'
        });
        newLines.push({
          id: String(Date.now() + 2),
          type: 'system',
          text: '[Processo finalizado com código 0]'
        });
        setExecutionState('terminated');
      } else if (!['1', '2', '3', '4'].includes(val)) {
        newLines.push({
          id: String(Date.now() + 1),
          type: 'error',
          text: '⚠️ Opção inválida! Escolha um número de 1 a 5.'
        });
        newLines = printMenu(newLines);
        setExecutionState('waiting_option');
      } else {
        setSelectedOp(val);
        newLines.push({
          id: String(Date.now() + 1),
          type: 'prompt',
          text: 'Digite o primeiro número: '
        });
        setExecutionState('waiting_num1');
      }
    } else if (executionState === 'waiting_num1') {
      const num = parseFloat(val.replace(',', '.'));
      if (isNaN(num)) {
        newLines.push({
          id: String(Date.now() + 1),
          type: 'error',
          text: '⚠️ Entrada inválida! Por favor, digite apenas números.'
        });
        newLines = printMenu(newLines);
        setExecutionState('waiting_option');
      } else {
        setFirstNum(num);
        newLines.push({
          id: String(Date.now() + 1),
          type: 'prompt',
          text: 'Digite o segundo número: '
        });
        setExecutionState('waiting_num2');
      }
    } else if (executionState === 'waiting_num2') {
      const num2 = parseFloat(val.replace(',', '.'));
      if (isNaN(num2)) {
        newLines.push({
          id: String(Date.now() + 1),
          type: 'error',
          text: '⚠️ Entrada inválida! Por favor, digite apenas números.'
        });
        newLines = printMenu(newLines);
        setExecutionState('waiting_option');
      } else {
        const num1 = firstNum ?? 0;
        // Execute math
        if (selectedOp === '1') {
          const res = num1 + num2;
          newLines.push({
            id: String(Date.now() + 1),
            type: 'success',
            text: `✅ Resultado: ${num1} + ${num2} = ${res}`
          });
        } else if (selectedOp === '2') {
          const res = num1 - num2;
          newLines.push({
            id: String(Date.now() + 1),
            type: 'success',
            text: `✅ Resultado: ${num1} - ${num2} = ${res}`
          });
        } else if (selectedOp === '3') {
          const res = num1 * num2;
          newLines.push({
            id: String(Date.now() + 1),
            type: 'success',
            text: `✅ Resultado: ${num1} * ${num2} = ${res}`
          });
        } else if (selectedOp === '4') {
          if (num2 === 0) {
            newLines.push({
              id: String(Date.now() + 1),
              type: 'error',
              text: '⚠️ Erro: Não é possível dividir por zero!'
            });
          } else {
            const res = num1 / num2;
            newLines.push({
              id: String(Date.now() + 1),
              type: 'success',
              text: `✅ Resultado: ${num1} / ${num2} = ${res}`
            });
          }
        }
        newLines = printMenu(newLines);
        setExecutionState('waiting_option');
        setFirstNum(null);
      }
    }

    setLines(newLines);
    setCurrentInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleUserInput(currentInput);
    }
  };

  // Preset tests
  const runPreset = (op: string, n1: string, n2: string) => {
    startSession();
    setTimeout(() => {
      // Simulate typing sequence
      setLines(prev => [
        ...prev,
        { id: String(Date.now() + 10), type: 'input', text: op },
        { id: String(Date.now() + 11), type: 'prompt', text: 'Digite o primeiro número: ' },
        { id: String(Date.now() + 12), type: 'input', text: n1 },
        { id: String(Date.now() + 13), type: 'prompt', text: 'Digite o segundo número: ' },
        { id: String(Date.now() + 14), type: 'input', text: n2 }
      ]);

      const val1 = parseFloat(n1);
      const val2 = parseFloat(n2);

      let resultText = '';
      let isErr = false;

      if (op === '1') resultText = `✅ Resultado: ${val1} + ${val2} = ${val1 + val2}`;
      if (op === '2') resultText = `✅ Resultado: ${val1} - ${val2} = ${val1 - val2}`;
      if (op === '3') resultText = `✅ Resultado: ${val1} * ${val2} = ${val1 * val2}`;
      if (op === '4') {
        if (val2 === 0) {
          resultText = '⚠️ Erro: Não é possível dividir por zero!';
          isErr = true;
        } else {
          resultText = `✅ Resultado: ${val1} / ${val2} = ${val1 / val2}`;
        }
      }

      setTimeout(() => {
        setLines(prev => {
          const next = [
            ...prev,
            { id: String(Date.now() + 20), type: isErr ? ('error' as const) : ('success' as const), text: resultText }
          ];
          return printMenu(next);
        });
        setExecutionState('waiting_option');
      }, 200);
    }, 150);
  };

  const currentPromptText = () => {
    if (executionState === 'waiting_option') return 'Opção (1-5): ';
    if (executionState === 'waiting_num1') return 'Número 1: ';
    if (executionState === 'waiting_num2') return 'Número 2: ';
    return '';
  };

  return (
    <div className="space-y-6">
      {/* Top action cards & Presets */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <TerminalIcon className="w-5 h-5 text-indigo-600" />
              Terminal Interativo em Tempo Real
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Experimente a calculadora como se estivesse rodando no seu computador. Digite no console ou use os atalhos abaixo.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setLines([])}
              className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Limpar</span>
            </button>
            <button
              onClick={startSession}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reiniciar Script</span>
            </button>
          </div>
        </div>

        {/* Quick Test Presets */}
        <div className="mt-4 pt-4 border-t border-slate-100">
          <div className="text-xs font-semibold text-slate-600 mb-2">Casos de teste rápidos:</div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => runPreset('1', '25', '17')}
              className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-colors"
            >
              Adição: 25 + 17
            </button>
            <button
              onClick={() => runPreset('2', '100', '42.5')}
              className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-colors"
            >
              Subtração: 100 - 42.5
            </button>
            <button
              onClick={() => runPreset('3', '7', '8')}
              className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-colors"
            >
              Multiplicação: 7 * 8
            </button>
            <button
              onClick={() => runPreset('4', '50', '4')}
              className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-colors"
            >
              Divisão normal: 50 / 4
            </button>
            <button
              onClick={() => runPreset('4', '15', '0')}
              className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-xs font-medium transition-colors"
            >
              Divisão por Zero (15 / 0)
            </button>
            <button
              onClick={() => {
                startSession();
                setTimeout(() => handleUserInput('99'), 200);
              }}
              className="px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-lg text-xs font-medium transition-colors"
            >
              Testar Opção Inválida
            </button>
          </div>
        </div>
      </div>

      {/* Terminal Display */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl shadow-lg overflow-hidden flex flex-col min-h-[460px]">
        {/* Terminal Header */}
        <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
            <span className="ml-2 font-mono text-slate-300">bash — python3 calculadora.py</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Ativo</span>
          </div>
        </div>

        {/* Terminal output area */}
        <div
          onClick={() => inputRef.current?.focus()}
          className="flex-1 p-4 font-mono text-xs sm:text-sm leading-relaxed overflow-y-auto max-h-[500px] space-y-1 cursor-text"
        >
          {lines.map(line => {
            if (line.type === 'system') {
              return <div key={line.id} className="text-slate-500">{line.text}</div>;
            }
            if (line.type === 'prompt') {
              return <div key={line.id} className="text-sky-300 font-medium">{line.text}</div>;
            }
            if (line.type === 'input') {
              return (
                <div key={line.id} className="text-white flex items-center gap-1.5">
                  <span className="text-indigo-400 select-none">&gt;</span>
                  <span className="font-semibold underline decoration-indigo-500/50">{line.text}</span>
                </div>
              );
            }
            if (line.type === 'error') {
              return <div key={line.id} className="text-rose-400 font-medium py-0.5">{line.text}</div>;
            }
            if (line.type === 'success') {
              return <div key={line.id} className="text-emerald-300 font-bold py-0.5">{line.text}</div>;
            }
            return <div key={line.id} className="text-slate-300 whitespace-pre-wrap">{line.text}</div>;
          })}

          {/* Interactive input row */}
          {executionState !== 'terminated' ? (
            <div className="flex items-center gap-2 pt-2 text-white">
              <span className="text-indigo-400 font-bold select-none">&gt;</span>
              <span className="text-sky-400 text-xs font-semibold select-none">{currentPromptText()}</span>
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={e => setCurrentInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="digite o valor e aperte Enter..."
                className="flex-1 bg-transparent border-none outline-hidden text-emerald-300 font-mono text-xs sm:text-sm placeholder:text-slate-600"
                autoFocus
              />
              <button
                onClick={() => handleUserInput(currentInput)}
                className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[11px] font-sans flex items-center gap-1 transition-colors"
                title="Pressione Enter ou clique para enviar"
              >
                <span>Enter</span>
                <CornerDownLeft className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div className="pt-3 border-t border-slate-800/80 mt-2 flex items-center justify-between">
              <span className="text-slate-500 text-xs">O programa foi encerrado.</span>
              <button
                onClick={startSession}
                className="text-xs text-indigo-400 hover:text-indigo-300 underline font-sans"
              >
                Clique aqui para rodar novamente
              </button>
            </div>
          )}
          <div ref={terminalEndRef} />
        </div>
      </div>
    </div>
  );
}
