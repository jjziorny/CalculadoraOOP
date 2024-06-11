//Julia
class Calculator {
    constructor() {
        this.upperValue = document.querySelector('#upper-number');
        this.resultValue = document.querySelector('#result-number');
        this.reset = 0;
    }


    clearValues() {
        this.upperValue.textContent = '0';
        this.resultValue.textContent = '0';
    }

    checkLastDigit(input, upperValue, reg) {

        if((
          !reg.test(input) &&
          !reg.test(upperValue.substr(upperValue.length - 1))
        )) {
          return true;
        } else {
          return false;
        }
    
      }


    sum(n1, n2) {
        return parseFloat(n1) + parseFloat(n2)
    }

    subtraction(n1, n2) {
        return parseFloat(n1) - parseFloat(n2)
    }

    multiplication(n1, n2) {
        return parseFloat(n1) * parseFloat(n2)
    }
    division(n1, n2) {
        return parseFloat(n1) / parseFloat(n2)
    }


    //Atualiza valores do diplay
    refreshValues(total) {
        this.upperValue.textContent = total;
        this.resultValue.textContent = total;
    }

    

    // Evitar que eu digite múltiplos símbolos consecutivos na tela
    
    resolution() {
        //Explode uma string em um array
        let upperValueArray = (this.upperValue.textContent).split(" ");

        let result = 0;

        for (let i = 0; i <= upperValueArray.length; i++) {

            let operation = 0;//Verificar se alguma operação foi feita no nosso if
            let actualItem = upperValueArray[i];
//Começa na mutiplicação
            if(actualItem == "x"){
                result = calc.multiplication(upperValueArray[i - 1], upperValueArray[i + 1]);
                operation = 1;
                //Faz a divisão
            } else if(actualItem == "/") {
                result = calc.division(upperValueArray[i - 1], upperValueArray[i + 1]);
                operation = 1;
                //Checagem para ver se o array ainda tem multiplicação a ser feita
            }else if(!upperValueArray.includes('x') && !upperValueArray.includes('/')){
              if(actualItem == "+"){
                result = calc.sum(upperValueArray[i - 1], upperValueArray[i + 1]);
             operation = 1;
              }else if(actualItem == "-"){
                result = calc.subtraction(upperValueArray[i - 1], upperValueArray[i + 1]);
                 operation = 1;
              }        
            
            } 
            
            
            //Atualização dos valores do array para a próxima iteração

            if (operation) {
                upperValueArray[i - 1] = result;//indice anterior no resultado para operação
                upperValueArray.splice(i, 2);//remove os itens já utilizados na operação
                i = -1; // Vai percorrer em busca de novas operações

            }
            

        }
        if (result) {
            calc.reset = 1;
        }

        this.refreshValues(result);


    }



    btnPress() {
        let input = this.textContent;
        let upperValue = calc.upperValue.textContent;

        var reg = new RegExp('^\\d+$'); // Usa para verificar se é um número ou não 

        if (calc.reset && reg.test(input)) {
            upperValue = '0';
        }

        // limpa a prop de reset
        calc.reset = 0;

        // Verifica se o último caractere é um símbolo e o atual input também é um símbolo
        if (input == 'AC') {
            calc.clearValues();//Método de limpar o display




        } else if (input == "=") {
            
            
            calc.resolution();
        }


        else {

        } if (calc.checkLastDigit(input, upperValue, reg)) {
            return false;// Não adiciona o input se for um símbolo consecutivo
        }

        if (!reg.test(input)) {
            input = ` ${input} `;//adicionando espaços dentro do display, backtips e a quantidade de espaço que você deseja
        }

        if(upperValue == "0"){
            if(reg.test(input)){
                calc.upperValue.textContent = input;

            }

        } else {
            calc.upperValue.textContent += input;
        }



       
    }
}


let calc = new Calculator(); // Iniciando o objeto calculadora

let buttons = document.querySelectorAll('.btn'); // Dando vida a todos os botões da calculadora
// Mapeando os botões
for(let i = 0; buttons.length > i; i++) {
    buttons[i].addEventListener('click', calc.btnPress);
  }
