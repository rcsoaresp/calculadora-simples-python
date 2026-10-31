export interface QuizQuestion {
  id: string;
  question: string;
  codeSnippet?: string;
  options: {
    id: string;
    text: string;
  }[];
  correctOptionId: string;
  explanation: string;
  conceptTag: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1-def',
    question: 'Qual palavra-chave é utilizada em Python para declarar e definir uma função matemática como "somar" ou "dividir"?',
    codeSnippet: '___ somar(a, b):\n    return a + b',
    options: [
      { id: 'a', text: 'function' },
      { id: 'b', text: 'def' },
      { id: 'c', text: 'fn' },
      { id: 'd', text: 'func' }
    ],
    correctOptionId: 'b',
    explanation: 'Em Python, funções são sempre definidas com a palavra-chave "def" (abreviação de define), seguida do nome da função, parâmetros entre parênteses e dois-pontos (:).',
    conceptTag: 'Funções (def)'
  },
  {
    id: 'q2-elif',
    question: 'Como escrevemos a condição intermediária "senão se" para testar múltiplas opções do menu em Python?',
    codeSnippet: 'if opcao == "1":\n    somar(a, b)\n____ opcao == "2":\n    subtrair(a, b)',
    options: [
      { id: 'a', text: 'else if' },
      { id: 'b', text: 'elsif' },
      { id: 'c', text: 'elif' },
      { id: 'd', text: 'then if' }
    ],
    correctOptionId: 'c',
    explanation: 'O Python utiliza exclusivamente a palavra-chave "elif" (contração de "else if"). A estrutura condicional padrão é if, elif e else.',
    conceptTag: 'Condicionais (if/elif)'
  },
  {
    id: 'q3-float-input',
    question: 'Por que usamos a função float(input(...)) ao ler os números digitados pelo usuário?',
    codeSnippet: 'num1 = float(input("Digite o número: "))',
    options: [
      { id: 'a', text: 'Porque input() sempre retorna texto (str), e precisamos converter para número decimal para fazer contas.' },
      { id: 'b', text: 'Porque o Python não aceita números na memória sem a função float().' },
      { id: 'c', text: 'Para arredondar o número para 2 casas decimais antes de somar.' },
      { id: 'd', text: 'Porque float() é o comando que imprime o valor no terminal.' }
    ],
    correctOptionId: 'a',
    explanation: 'A função input() sempre lê os dados digitados como texto (string). Se fizéssemos "5" + "5", o Python concatenaria o texto resultando em "55" em vez de somar matematicamente!',
    conceptTag: 'Tipos & Conversão'
  },
  {
    id: 'q4-try-except',
    question: 'Qual estrutura é usada no código para evitar que o programa feche abruptamente caso o usuário digite letras em vez de números?',
    codeSnippet: '____:\n    num1 = float(input(...))\n______ ValueError:\n    print("Entrada inválida!")',
    options: [
      { id: 'a', text: 'try / except ValueError' },
      { id: 'b', text: 'try / catch Exception' },
      { id: 'c', text: 'protect / on_error' },
      { id: 'd', text: 'validate / error' }
    ],
    correctOptionId: 'a',
    explanation: 'Em Python, o tratamento de erros é feito com os blocos "try" e "except". O "ValueError" é a exceção lançada quando a função float() recebe caracteres que não podem ser convertidos para números.',
    conceptTag: 'Tratamento de Exceções'
  },
  {
    id: 'q5-break',
    question: 'Dentro do laço "while True:", qual comando é executado quando o usuário escolhe a opção 5 para sair da calculadora?',
    codeSnippet: 'if opcao == "5":\n    print("Até logo!")\n    _____',
    options: [
      { id: 'a', text: 'stop' },
      { id: 'b', text: 'finish' },
      { id: 'c', text: 'break' },
      { id: 'd', text: 'exit_loop' }
    ],
    correctOptionId: 'c',
    explanation: 'O comando "break" interrompe e sai imediatamente de qualquer laço de repetição (while ou for) no Python, finalizando a execução contínua do menu.',
    conceptTag: 'Controle de Fluxo'
  },
  {
    id: 'q6-fstring',
    question: 'Qual é a sintaxe moderna (F-String) usada para exibir variáveis diretamente dentro de um texto formatado?',
    options: [
      { id: 'a', text: 'print(f"Resultado: {num1} + {num2} = {resultado}")' },
      { id: 'b', text: 'print("Resultado: $num1 + $num2 = $resultado")' },
      { id: 'c', text: 'print(f"Resultado: %num1 + %num2 = %resultado")' },
      { id: 'd', text: 'print("Resultado: " + {num1} + " + " + {num2})' }
    ],
    correctOptionId: 'a',
    explanation: 'As F-Strings são declaradas com a letra "f" antes das aspas e utilizam chaves {variavel} para substituir automaticamente o nome da variável pelo seu valor em tempo de execução.',
    conceptTag: 'F-Strings'
  }
];
