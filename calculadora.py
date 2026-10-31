# ============================================================
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
        print("\nEscolha uma operação:")
        print("1. Adição (+)")
        print("2. Subtração (-)")
        print("3. Multiplicação (*)")
        print("4. Divisão (/)")
        print("5. Sair")
        
        opcao = input("\nDigite sua opção (1/2/3/4/5): ").strip()
        
        # Encerra o programa se o usuário digitar 5
        if opcao == '5':
            print("\nObrigado por usar a calculadora! Bons estudos em Python! 🚀")
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
            print(f"\n✅ Resultado: {num1} + {num2} = {resultado}")
        elif opcao == '2':
            resultado = subtrair(num1, num2)
            print(f"\n✅ Resultado: {num1} - {num2} = {resultado}")
        elif opcao == '3':
            resultado = multiplicar(num1, num2)
            print(f"\n✅ Resultado: {num1} * {num2} = {resultado}")
        elif opcao == '4':
            resultado = dividir(num1, num2)
            if isinstance(resultado, str):
                print(f"\n⚠️ {resultado}")
            else:
                print(f"\n✅ Resultado: {num1} / {num2} = {resultado}")

# Inicia a execução do programa quando o arquivo for rodado diretamente
if __name__ == "__main__":
    calculadora()
