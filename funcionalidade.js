const btn_comecar = document.querySelector('#btn_comecar')
const placar_jogador = document.querySelector('#placar_jogador')
const placar_cpu = document.querySelector('#placar_cpu')
const palco = document.querySelector('.palco')

let velha = []
let quem_joga = 1    //1 = Jogador     0 = CPU
let jogadas = 0
let simbolo = ['O', 'X']
let vitorias = [1,1]

const marcarVelha = (el)=>{
    el.addEventListener('click', (evt)=>{
        if(jogadas < 9) {
            if(quem_joga == 1){
                if(evt.target.innerHTML ==''){
                    evt.target.innerHTML = simbolo[1]
                    quem_joga = 0
                    jogadas++
                    controleVencedorLinha(simbolo[1])
                    controleVencedorColuna(simbolo[1])
                    controleVencedorDiagonal(simbolo[1])
                }else{
                    alert('Essa casa já foi selecionada')
                }
            }
        }

        if(jogadas < 9){
            while(quem_joga == 0){
                let cpu = velha[Math.floor(Math.random()*9)]
                do{
                    cpu = velha[Math.floor(Math.random()*9)]
                }while (cpu.innerHTML != '')
                cpu.innerHTML = simbolo[0]
                quem_joga = 1
                jogadas++
                controleVencedorLinha(simbolo[0])
                controleVencedorColuna(simbolo[0])
                controleVencedorDiagonal(simbolo[0])

            }
        }

        if(jogadas == 9){
            setTimeout(() => {
                alert(`FIM DE JOGO: EMPATE`)
            }, 500);
            novoJogo()
        }

    })
}
const alertVit = (s)=>{
    if(s == simbolo[0]){
        placar_cpu.innerHTML = `CPU: ${vitorias[0]}`
        vitorias[0]++
    }else if(s == simbolo[1]){
        placar_jogador.innerHTML = `Jogador: ${vitorias[1]}`
        vitorias[1]++
    }
    setTimeout(() => {
        alert(`Jogador ${s} GANHOU`)
    }, 250); 
}

const controleVencedorLinha = (s)=>{
    if(velha[0].innerHTML == s && velha[1].innerHTML == s  && velha[2].innerHTML == s){
        alertVit(s)
        clearTimeout(controleVencedorLinha)
        novoJogo()
    }

    else if(velha[3].innerHTML == s && velha[4].innerHTML == s  && velha[5].innerHTML == s){
        alertVit(s)
        clearTimeout(controleVencedorLinha)
        novoJogo()
    }

    else if(velha[6].innerHTML == s && velha[7].innerHTML == s  && velha[8].innerHTML == s){
        alertVit(s)
        clearTimeout(controleVencedorLinha)
        novoJogo()
    }
}
const tempoLinha = setTimeout(controleVencedorLinha, 1000)

const controleVencedorColuna = (s)=>{
    if(velha[0].innerHTML == s && velha[3].innerHTML ==s && velha[6].innerHTML == s){
        alertVit(s)
        clearTimeout(tempoColuna)
        novoJogo()
    }

    else if(velha[1].innerHTML == s && velha[4].innerHTML ==s && velha[7].innerHTML == s){
        alertVit(s)
        clearTimeout(tempoColuna)
        novoJogo()
    }

    else if(velha[2].innerHTML == s && velha[5].innerHTML ==s && velha[8].innerHTML == s){
        alertVit(s)
        clearTimeout(tempoColuna)
        novoJogo()
    }
}
const tempoColuna = setTimeout(controleVencedorColuna, 1000)


const controleVencedorDiagonal = (s)=>{
    if(velha[0].innerHTML == s && velha[4].innerHTML == s && velha[8].innerHTML == s){
        alertVit(s)
        clearInterval(tempoDiagonal)
        novoJogo()
    }

    else if(velha[2].innerHTML == s && velha[4].innerHTML == 'X' && velha[6].innerHTML == s){
        alertVit(s)
        clearInterval(tempoDiagonal)
        novoJogo()
    }
}  
const tempoDiagonal = setTimeout(controleVencedorDiagonal, 1000)

const comecarJogo = ()=>{
    let id = 1

    const novoPalco = document.createElement('div')
    novoPalco.setAttribute('style', 'width:300px; height: 300px; display:flex; flex-wrap:wrap')

    while (velha.length < 9){
        const novoElemento = document.createElement('div')
        novoElemento.setAttribute('style', `border: 2px solid black; width: 100px; height: 100px; display:flex; justify-content:center; align-items:center; font-size:2em`)
        novoElemento.setAttribute('class', 'caixa')
        novoElemento.classList.add(`c${id}`)
        novoPalco.appendChild(novoElemento)
        palco.appendChild(novoPalco)
        id++
        velha.push(novoElemento)
    }

    velha.forEach((el)=>{
        marcarVelha(el)
    })
    
    btn_comecar.removeEventListener('click', comecarJogo)
}

btn_comecar.addEventListener('click', comecarJogo)

const novoJogo = ()=>{
    const novaDiv = document.createElement('div')
    novaDiv.setAttribute('style', 'display:flex; justify-content:space-around; width:300px;')

    const botaoNovoJogo = document.createElement('button')
    botaoNovoJogo.setAttribute('style', 'padding:10px; border:padding: 10px;border: 4px solid red;background-color: lightcoral; border-radius: 10px; width: 100px; cursor:pointer')
    botaoNovoJogo.innerHTML = 'Novo Jogo'
    palco.appendChild(botaoNovoJogo)

    botaoNovoJogo.addEventListener('click', (evt)=>{
        velha = []
        jogadas = 0
        quem_joga = 1
        evt.target.parentNode.previousSibling.remove()
        evt.target.parentNode.remove()
        comecarJogo()
    })
    
    const botaoReiniciar = document.createElement('button')
    botaoReiniciar.setAttribute('style', 'padding:10px; border:padding: 10px;border: 4px solid red;background-color: lightcoral; border-radius: 10px; width: 100px; cursor:pointer')
    botaoReiniciar.innerHTML = 'Reiniciar'

    botaoReiniciar.addEventListener('click', (evt)=>{
        velha = []
        jogadas = 0
        quem_joga = 1
        vitorias = [1,1]
        evt.target.parentNode.previousSibling.remove()
        evt.target.parentNode.remove()
        placar_cpu.innerHTML = 'CPU: 0'
        placar_jogador.innerHTML = 'Jogador: 0'
        comecarJogo()
    })

    novaDiv.appendChild(botaoNovoJogo)
    novaDiv.appendChild(botaoReiniciar)
    palco.appendChild(novaDiv)
}

