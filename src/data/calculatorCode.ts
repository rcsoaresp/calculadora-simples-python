export interface CodeSection {
  id: string;
  title: string;
  subtitle: string;
  startLine: number;
  endLine: number;
  concept: 'funcoes' | 'loop' | 'entrada' | 'erros' | 'condicional' | 'execucao';
  summary: string;
  details: string[];
  keyConcept: string;
  codeSnippet: string;
}

export const PYTHON_CALCULATOR_CODE = `# ============================================================
# CALCULADORA SIMPLES EM PYTHON
# Operações básicas: Adição, Subtração, Multiplicação e Divisão
# ============================================================

# 1. FUNÇÕES PARA CADA OPERAÇÃO MATEMÁTICA
def somar(a, b):
    """Retorna a soma de dois números."""
    return a + b

def subtrair(a, b):
    """Retorna a subtração do primeiro número pelo segundo."""
    return a - b

def multiplicar(a, b):
    """Retorna o produto de dois números."""
    return a * b

def dividir(a, b):
    """
    Retorna a divisão do primeiro número pelo segundo.
    Evita o erro clássico de divisão por zero.
    """
    if b == 0:
        return "Erro: Não é possível dividir por zero!"
    return a / b

# 2. FUNÇÃO PRINCIPAL DA CALCULADORA
def calculadora():
    print("=" * 35)
    print("      CALCULADORA EM PYTHON        ")
    print("=" * 35)
    
    while True:
        # Exibe o menu de opções
        print("\\nEscolha uma operação:")
        print("1. Adição (+)")
        print("2. Subtração (-)")
        print("3. Multiplicação (*)")
        print("4. Divisão (/)")
        print("5. Sair")
        
        opcao = input("\\nDigite sua opção (1/2/3/4/5): ").strip()
        
        # Encerra o programa se o usuário digitar 5
        if opcao == '5':
            print("\\nObrigado por usar a calculadora! Bons estudos em Python! 🚀")
            break
            
        # Valida se a opção é válida
        if opcao not in ('1', '2', '3', '4'):
            print("⚠️ Opção inválida! Escolha um número de 1 a 5.")
            continue
            
        # Solicita os números e trata erros de digitação
        try:
            num1 = float(input("Digite o primeiro número: "))
            num2 = float(input("Digite o segundo número: "))
        except ValueError:
            print("⚠️ Entrada inválida! Por favor, digite apenas números.")
            continue
            
        # Executa a operação correspondente
        if opcao == '1':
            resultado = somar(num1, num2)
            print(f"\\n✅ Resultado: {num1} + {num2} = {resultado}")
        elif opcao == '2':
            resultado = subtrair(num1, num2)
            print(f"\\n✅ Resultado: {num1} - {num2} = {resultado}")
        elif opcao == '3':
            resultado = multiplicar(num1, num2)
            print(f"\\n✅ Resultado: {num1} * {num2} = {resultado}")
        elif opcao == '4':
            resultado = dividir(num1, num2)
            if isinstance(resultado, str):
                print(f"\\n⚠️ {resultado}")
            else:
                print(f"\\n✅ Resultado: {num1} / {num2} = {resultado}")

# Inicia a execução do programa
if __name__ == "__main__":
    calculadora()`;

export const CODE_SECTIONS: CodeSection[] = [
  {
    id: 'funcoes-operacoes',
    title: '1. Funções Matemáticas Modulares',
    subtitle: 'Criando blocos reutilizáveis com def e return',
    startLine: 7,
    endLine: 26,
    concept: 'funcoes',
    keyConcept: 'def e return',
    summary: 'Cada operação matemática é isolada em sua própria função. Isso torna o código limpo, fácil de testar e reutilizável.',
    details: [
      'A palavra-chave "def" avisa o Python que estamos definindo uma função com nome e parâmetros (a, b).',
      'O comando "return" envia o resultado de volta para quem chamou a função.',
      'As aspas triplas ("""...""") são Docstrings: documentações que explicam o propósito da função.',
      'Na função dividir, verificamos com "if b == 0" para impedir um erro fatal (ZeroDivisionError).'
    ],
    codeSnippet: `def somar(a, b):
    return a + b

def dividir(a, b):
    if b == 0:
        return "Erro: Não é possível dividir por zero!"
    return a / b`
  },
  {
    id: 'loop-while',
    title: '2. Estrutura de Repetição Infinita',
    subtitle: 'Mantendo a calculadora aberta com while True e break',
    startLine: 34,
    endLine: 48,
    concept: 'loop',
    keyConcept: 'while True & break',
    summary: 'Sem um laço de repetição, o programa executaria uma única conta e fecharia imediatamente no terminal.',
    details: [
      '"while True" cria um loop que roda para sempre, até que um comando explícito ordene sua parada.',
      'O método ".strip()" remove espaços em branco acidentais digitados no início ou final do texto.',
      'O comando "break" quebra imediatamente o laço quando o usuário seleciona a opção "5" (Sair).',
      'O comando "continue" pula o resto do loop atual e volta ao menu inicial caso a opção seja inválida.'
    ],
    codeSnippet: `while True:
    opcao = input("Digite sua opção (1/2/3/4/5): ").strip()
    if opcao == '5':
        print("Até logo!")
        break`
  },
  {
    id: 'conversao-e-erros',
    title: '3. Entrada de Dados e Conversão de Tipos',
    subtitle: 'Transformando texto em números com float() e protegendo com try/except',
    startLine: 54,
    endLine: 61,
    concept: 'erros',
    keyConcept: 'float() & try / except',
    summary: 'Por padrão, a função input() do Python lê tudo como texto (string). Precisamos converter para números com casas decimais (float).',
    details: [
      'A função "input()" pausa a execução e espera o usuário digitar algo e pressionar Enter.',
      '"float()" converte o texto para número decimal (ex: "7.5" vira o número 7.5).',
      'Se o usuário digitar "abc" em vez de número, "float()" geraria um erro fatal chamado ValueError.',
      'O bloco "try / except ValueError" intercepta esse erro e avisa o usuário com educação, sem fechar o programa!'
    ],
    codeSnippet: `try:
    num1 = float(input("Digite o primeiro número: "))
    num2 = float(input("Digite o segundo número: "))
except ValueError:
    print("⚠️ Entrada inválida! Digite apenas números.")
    continue`
  },
  {
    id: 'tomada-decisao',
    title: '4. Estrutura Condicional (Tomada de Decisão)',
    subtitle: 'Direcionando para a operação correta com if, elif e f-strings',
    startLine: 63,
    endLine: 78,
    concept: 'condicional',
    keyConcept: 'if, elif & f-strings',
    summary: 'O Python avalia a escolha do usuário e chama a função correspondente, formatando o resultado na tela.',
    details: [
      '"if" verifica a primeira condição (opção 1).',
      '"elif" (abreviação de else if) testa condições alternativas caso a anterior seja falsa (opções 2, 3 e 4).',
      'F-strings (prefixadas com "f" antes das aspas) permitem embutir variáveis diretamente entre chaves {num1} e {resultado}.',
      'Na divisão, "isinstance(resultado, str)" confere se o retorno foi a mensagem de erro ou um número decimal.'
    ],
    codeSnippet: `if opcao == '1':
    resultado = somar(num1, num2)
    print(f"✅ Resultado: {num1} + {num2} = {resultado}")
elif opcao == '4':
    resultado = dividir(num1, num2)`
  },
  {
    id: 'ponto-entrada',
    title: '5. O Padrão if __name__ == "__main__"',
    subtitle: 'Boas práticas profissionais da comunidade Python',
    startLine: 80,
    endLine: 82,
    concept: 'execucao',
    keyConcept: '__name__ == "__main__"',
    summary: 'Garante que o script execute a calculadora apenas quando rodado diretamente, e não quando importado por outro arquivo.',
    details: [
      'Quando você executa um arquivo Python, a variável especial "__name__" recebe o valor "__main__".',
      'Se outro script fizer "import calculadora", as funções somar e subtrair estarão disponíveis sem iniciar o loop do menu automaticamente.',
      'Essa é a regra de ouro número 1 de modularidade em projetos Python profissionais.'
    ],
    codeSnippet: `if __name__ == "__main__":
    calculadora()`
  }
];

export interface Challenge {
  id: string;
  title: string;
  difficulty: 'Fácil' | 'Médio';
  description: string;
  task: string;
  hint: string;
  solutionCode: string;
  explanation: string;
}

export const BEGINNER_CHALLENGES: Challenge[] = [
  {
    id: 'potenciacao',
    title: 'Desafio 1: Adicionar Exponenciação (Potência)',
    difficulty: 'Fácil',
    description: 'Em matemática e na programação, frequentemente precisamos calcular potências, como 2³ = 8 ou 5² = 25.',
    task: 'Adicione uma 5ª operação de potência usando o operador ** do Python e atualize o menu da calculadora.',
    hint: 'Em Python, o operador de potência é dois asteriscos (**). Exemplo: a ** b.',
    solutionCode: `# 1. Crie a nova função no topo:
def potencia(a, b):
    """Retorna a elevado à potência b."""
    return a ** b

# 2. No menu, adicione:
print("5. Potenciação (^)")
print("6. Sair")  # Atualize a opção de saída!

# 3. No elif correspondente:
elif opcao == '5':
    resultado = potencia(num1, num2)
    print(f"\\n✅ Resultado: {num1} ^ {num2} = {resultado}")`,
    explanation: 'Em Python, não usamos o símbolo circunflexo (^) para potência, pois o circunflexo é um operador bitwise XOR! O operador correto para potência é sempre "**".'
  },
  {
    id: 'resto-divisao',
    title: 'Desafio 2: Resto da Divisão (Operador Módulo %)',
    difficulty: 'Fácil',
    description: 'O operador módulo (%) descobre o que sobra de uma divisão inteira. É o segredo para saber se um número é par ou ímpar (num % 2 == 0)!',
    task: 'Crie uma função resto_divisao(a, b) que retorna o resto de a dividido por b, tratando também a divisão por zero.',
    hint: 'Use a % b. Se b for 0, retorne a mesma mensagem de erro que fizemos na divisão comum.',
    solutionCode: `def resto_divisao(a, b):
    """Retorna o resto da divisão entre a e b."""
    if b == 0:
        return "Erro: Não é possível calcular módulo por zero!"
    return a % b`,
    explanation: 'Por exemplo, 10 % 3 resulta em 1 (porque 3 * 3 = 9 e sobra 1). Muito útil em relógios, paginação e paridade de números!'
  },
  {
    id: 'arredondamento',
    title: 'Desafio 3: Arredondar Resultados com round()',
    difficulty: 'Médio',
    description: 'Quando dividimos 10 por 3, o Python exibe 3.3333333333333335. Isso acontece devido à representação binária de números de ponto flutuante.',
    task: 'Formate o resultado para exibir apenas 2 casas decimais usando a função embutida round() ou a formatação :.2f nas f-strings.',
    hint: 'Você pode usar round(resultado, 2) ou escrever na f-string: {resultado:.2f}.',
    solutionCode: `# Opção A: Usando a função round():
resultado_arredondado = round(resultado, 2)
print(f"✅ Resultado: {resultado_arredondado}")

# Opção B: Direto na f-string (mais elegante):
print(f"✅ Resultado: {num1} / {num2} = {resultado:.2f}")`,
    explanation: 'A diretiva :.2f dentro das chaves da f-string diz: "exiba este número como float com exatamente 2 casas após o ponto". Se o número for 5, ele exibirá 5.00.'
  },
  {
    id: 'historico-lista',
    title: 'Desafio 4: Guardar Histórico das Contas em uma Lista',
    difficulty: 'Médio',
    description: 'E se o usuário quiser ver as últimas 5 contas que ele realizou durante a sessão?',
    task: 'Crie uma lista vazia historico = [] antes do loop while e adicione cada conta realizada usando historico.append().',
    hint: 'Antes do while True, declare historico = []. Após cada cálculo, faça historico.append(f"{num1} + {num2} = {resultado}"). Adicione uma opção de menu para ver o histórico!',
    solutionCode: `def calculadora():
    historico = []  # Lista vazia para guardar os cálculos
    
    while True:
        # ... menu com opção 5 para ver histórico e 6 para sair ...
        if opcao == '5':
            if not historico:
                print("\\nNenhum cálculo realizado ainda.")
            else:
                print("\\n--- HISTÓRICO DE CÁLCULOS ---")
                for i, conta in enumerate(historico, start=1):
                    print(f"{i}. {conta}")
            continue
            
        # Após calcular:
        registro = f"{num1} op {num2} = {resultado}"
        historico.append(registro)`,
    explanation: 'As Listas em Python são sequências mutáveis. O método .append() insere um novo item no final da lista. Usamos enumerate() para numerar cada item automaticamente!'
  }
];
