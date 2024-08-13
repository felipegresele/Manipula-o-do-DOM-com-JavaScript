const html = document.querySelector("html");
const focoBt = document.querySelector(".app__card-button--foco")
const curtoBt = document.querySelector(".app__card-button--curto")
const longoBt = document.querySelector(".app__card-button--longo")
const botoes = document.querySelectorAll(".app__card-button")
const imagem = document.querySelector(".app__image")
const frase = document.querySelector(".app__title")
const timer = document.querySelector("#timer")
const startPausebt = document.querySelector("#start-pause")
const musicaBt = document.querySelector("#alternar-musica")
const iniciarOuPausarBt =document.querySelector("#start-pause span")
const playIco = document.querySelector(".app__card-primary-butto-icon")

const musica = new Audio('/sons/luna-rise-part-one.mp3')
const beep = new Audio('/sons/beep.mp3')
const pausa = new Audio('/sons/pause.mp3')
const iniciar = new Audio('/sons/play.wav')


let tempoEmSegundos = 1500
let intervaloId = null

musica.loop = true;

musicaBt.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
});

focoBt.addEventListener("click", () => {
    tempoEmSegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add("active")
})

curtoBt.addEventListener("click", () => {
    tempoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add("active")
})
longoBt.addEventListener("click", () => {
    tempoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add("active")
})

function alterarContexto(contexto){
    mostrarTempo()
    botoes.forEach(function(contexto){
        contexto.classList.remove("active")
    });
    html.setAttribute("data-contexto", contexto);
    imagem.setAttribute("src", `/imagens/${contexto}.png`);
    switch (contexto) {
        case 'foco':
            frase.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case 'descanso-curto':
            frase.innerHTML = `Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;
        case 'descanso-longo':
            frase.innerHTML = `Hora de voltar à superfíce<br>
                <strong class="app__title-strong">Faça uma pausa longa!</strong>`
        
                default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoEmSegundos <= 0) {
        beep.play()
        alert('Tempo esgotado!')
        zerar()
        return
        
    }
    tempoEmSegundos -=1
    mostrarTempo()
} 

startPausebt.addEventListener("click", iniciarOuPausar )

function iniciarOuPausar()  {
    if (intervaloId) {
        pausa.play()
        zerar()
        return

    }
    iniciar.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = 'Pausar'
    playIco.src = '/imagens/pause.png'
}

function zerar() {
    clearInterval(intervaloId)
    intervaloId = null
        iniciarOuPausarBt.textContent = 'Começar'
        playIco.src = '/imagens/play_arrow.png'
}

function mostrarTempo() {
    const tempo = new Date(tempoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    timer.innerHTML = `${tempoFormatado}`
}


mostrarTempo()