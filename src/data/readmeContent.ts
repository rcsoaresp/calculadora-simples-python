export const README_MD_CONTENT = `# 🧮 Calculadora Simples em Python

Uma calculadora de linha de comando (CLI) desenvolvida em **Python 3**, ideal para iniciantes em programação. O projeto realiza as quatro operações matemáticas fundamentais de forma interativa, modular e com tratamento robusto de erros.

---

## 🚀 Funcionalidades

- ➕ **Adição**: Soma dois números decimais ou inteiros.
- ➖ **Subtração**: Subtrai o segundo número do primeiro.
- ✖️ **Multiplicação**: Multiplica dois valores.
- ➗ **Divisão Segura**: Realiza a divisão e previne o encerramento do programa por divisão por zero (\`ZeroDivisionError\`).
- 🔁 **Execução Contínua**: Permite realizar múltiplas operações sem precisar reiniciar o script (laço \`while True\`).
- 🛡️ **Tratamento de Exceções**: Protege o programa caso o usuário digite letras ou caracteres inválidos (\`try / except ValueError\`).

---

## 📂 Estrutura do Código

\`\`\`
calculadora-python/
│
├── calculadora.py    # Script principal da aplicação
└── README.md         # Documentação do projeto
\`\`\`

### Principais Componentes:
1. **Funções Modulares (\`def\`)**: Cada operação aritmética (\`somar\`, \`subtrair\`, \`multiplicar\`, \`dividir\`) é isolada em uma função própria, facilitando a reutilização e testes.
2. **Entrada e Conversão (\`float(input())\`)**: Recebe a digitação do usuário e converte o texto para ponto flutuante.
3. **Menu Interativo**: Um menu numérico amigável para navegação.
4. **Ponto de Entrada (\`if __name__ == "__main__":\`)**: Garante que o programa só execute a função principal se for executado diretamente.

---

## 🛠️ Pré-requisitos: Como Instalar o Python

Antes de executar, você precisa ter o **Python 3** instalado em sua máquina.

### 🪟 No Windows:
1. Acesse o site oficial: [python.org/downloads](https://www.python.org/downloads/).
2. Baixe o instalador mais recente.
3. ⚠️ **MUITO IMPORTANTE**: Na primeira tela de instalação, marque a caixinha **"Add python.exe to PATH"** antes de clicar em *Install Now*.
4. Abra o Prompt de Comando (CMD) ou PowerShell e digite para testar:
   \`\`\`bash
   python --version
   \`\`\`

### 🍎 No macOS:
O macOS normalmente já vem com uma versão do sistema, mas recomendamos instalar a mais recente via Homebrew ou pelo instalador oficial:
\`\`\`bash
brew install python
\`\`\`
Para verificar a versão:
\`\`\`bash
python3 --version
\`\`\`

### 🐧 No Linux (Ubuntu/Debian):
Abra o terminal e execute:
\`\`\`bash
sudo apt update
sudo apt install python3 python3-pip
\`\`\`
Para verificar a versão:
\`\`\`bash
python3 --version
\`\`\`

---

## ▶️ Como Executar a Calculadora

### Opção 1: Pelo Terminal / Prompt de Comando

1. Baixe ou clone este repositório:
   \`\`\`bash
   git clone https://github.com/SEU-USUARIO/calculadora-python.git
   \`\`\`
2. Entre na pasta do projeto:
   \`\`\`bash
   cd calculadora-python
   \`\`\`
3. Execute o script com o Python:
   - No Windows:
     \`\`\`bash
     python calculadora.py
     \`\`\`
   - No Linux ou macOS:
     \`\`\`bash
     python3 calculadora.py
     \`\`\`

---

### Opção 2: Pelo Visual Studio Code (VS Code)

1. Baixe o [VS Code](https://code.visualstudio.com/).
2. Abra o VS Code e instale a extensão oficial **Python** (da Microsoft).
3. Abra a pasta do projeto no VS Code (\`Arquivo\` > \`Abrir Pasta...\`).
4. Abra o arquivo \`calculadora.py\`.
5. Clique no botão de **Play (▶)** no canto superior direito do editor ou pressione \`F5\`.
6. A calculadora será executada no terminal integrado na parte inferior!

---

## 💡 Exemplo de Uso no Terminal

\`\`\`text
===================================
      CALCULADORA EM PYTHON        
===================================

Escolha uma operação:
1. Adição (+)
2. Subtração (-)
3. Multiplicação (*)
4. Divisão (/)
5. Sair

Digite sua opção (1/2/3/4/5): 4
Digite o primeiro número: 10
Digite o segundo número: 2

✅ Resultado: 10.0 / 2.0 = 5.0

Escolha uma operação:
1. Adição (+)
2. Subtração (-)
3. Multiplicação (*)
4. Divisão (/)
5. Sair

Digite sua opção (1/2/3/4/5): 5

Obrigado por usar a calculadora! Bons estudos em Python! 🚀
\`\`\`

---

## 🎓 Conceitos Aprendidos Neste Projeto

- Declaração de funções com parâmetros e retorno (\`def\` e \`return\`)
- Controle de fluxo e laços de repetição (\`while\`, \`break\`, \`continue\`)
- Estruturas de condição (\`if\`, \`elif\`, \`else\`)
- Manipulação de tipos primitivos (\`string\`, \`float\`, \`int\`)
- Interpolação de texto com F-strings (\`f"Resultado: {resultado}"\`)
- Tratamento de exceções e erros de execução (\`try\` e \`except\`)

---

## 📄 Licença

Este projeto é de código aberto sob a licença [MIT](https://opensource.org/licenses/MIT). Sinta-se livre para usar, modificar e compartilhar!
`;
