var listaNumerosSorteados = [];
let numeroMaximo = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 0;

function exibirTextoTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female",  {rate:1.2});
}

function verificarChute() {
    let chute = document.querySelector('input').value;
    tentativas++;

    if (chute == numeroSecreto) {
        exibirTextoTela("h1", "Acertou!");
        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        let mensagemTentativas = `você descobriu o número secreto em ${tentativas} ${palavraTentativa}!`;
        document.getElementById("reiniciar").removeAttribute("disabled");
        exibirTextoTela("p", mensagemTentativas);
    
    } else {

        if (chute > numeroSecreto) {
            exibirTextoTela("p", "O número secreto é menor!");
        } else {
            exibirTextoTela("p", "O número secreto é maior");
        }
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroAleatorio = parseInt(Math.random()*numeroMaximo + 1);

    if (listaNumerosSorteados.length == numeroMaximo) {
        listaNumerosSorteados = [];
    }

    if (listaNumerosSorteados.includes(numeroAleatorio)) {
        return gerarNumeroAleatorio();
    } else {
        listaNumerosSorteados.push(numeroAleatorio);
        console.log(listaNumerosSorteados);
        return numeroAleatorio;
    }
}

function limparCampo () {
    chute = document.querySelector("input");
    chute.value = "";
}

function reiniciarJogo () {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 0;
    exibirMensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}

function exibirMensagemInicial () {
    let mensagemIntervaloNumerico = `Escolha um número entre 1 e ${numeroMaximo}`;
    exibirTextoTela("h1", "Jogo do número secreto");
    exibirTextoTela("p", mensagemIntervaloNumerico);
}

exibirMensagemInicial();
