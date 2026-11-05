// Etapa 2: objetos
// Seus parâmetros: exatamente 4 servidores
// Faixas: ok abaixo de 70 | alerta de 70 a 89 | crítico a partir de 90

const servidores = [
    { nome: "srv-174-1", ip: "10.0.0.1", cpu: 35, online: true },
    { nome: "srv-174-2", ip: "10.0.0.2", cpu: 42, online: false },
    { nome: "srv-174-3", ip: "10.0.0.3", cpu: 78, online: true },
    { nome: "srv-174-4", ip: "10.0.0.4", cpu: 91, online: true }
    // complete com srv-174-2 até srv-174-4
];

console.table(servidores);
console.log(servidores[0].nome);     // notação de ponto
console.log(servidores[0]["cpu"]);   // notação de colchetes

// Etapa 3: função com if / else if / else
const LIMITE_ALERTA = 70;
const LIMITE_CRITICO = 90;

function classificar(cpu) { 
    if (cpu < 0 || cpu > 100) { 
        return "invalido"; } 
    
    if (cpu < LIMITE_ALERTA) { 
        return "ok"; 
    } else if (cpu < LIMITE_CRITICO) { 
        return "alerta"; 
    } else { 
        return "critico"; 
    } 
  // complete: retorne "critico", "alerta" ou "ok"
  // use else if e else, comparando com LIMITE_CRITICO e LIMITE_ALERTA
}

console.log(classificar(69));   // esperado: ok
console.log(classificar(70));   // esperado: alerta
console.log(classificar(90));   // esperado: critico
console.log(classificar(101));  // esperado: invalido

// Etapa 4: laço for criando os cards
const painel = document.getElementById("painel");
const log = document.getElementById("log");

function renderizar() {
    painel.innerHTML = "";
    let criticos = 0;

    for (let i = 0; i < servidores.length; i++) {
        const s = servidores[i];
        const card = document.createElement("div");
        card.classList.add("card");
        
        // complete: adicione ao card a classe retornada por classificar(s.cpu)
        // complete: se s.online for false, adicione também a classe "offline"
        // complete: se a classificação for "critico", some 1 em criticos

        const classificacao = classificar(s.cpu);
        card.classList.add(classificacao);
        
        if (!s.online) { 
            card.classList.add("offline"); 
        } if (classificacao === "critico") { 
            criticos++; 
        }

        card.innerHTML = "<strong>" + s.nome + "</strong><br>" + s.ip + "<br>CPU: " + s.cpu + "%";
        painel.appendChild(card);
    }

    log.textContent = "Servidores críticos: " + criticos;
}

renderizar();

// Etapa 5: mudando classes CSS pelo JavaScript
const btnAtualizar = document.getElementById("btn-atualizar");
const btnManutencao = document.getElementById("btn-manutencao");

btnAtualizar.addEventListener("click", function () {
    for (let i = 0; i < servidores.length; i++) {
        // complete: sorteie uma nova cpu entre 0 e 100 para servidores[i]
        // dica: Math.floor(Math.random() * 101)
        servidores[i].cpu = Math.floor(Math.random() * 101);
    }
    renderizar();
});

btnManutencao.addEventListener("click", function () {
    document.body.classList.toggle("manutencao");
    // complete: use classList.contains("manutencao") em um if
    // para trocar o texto entre "Ativar manutenção" e "Desativar manutenção"
    if (document.body.classList.contains("manutencao")) { 
        btnManutencao.textContent = "Desativar manutenção"; 
    } else { 
        btnManutencao.textContent = "Ativar manutenção"; 
    }
});

// Etapa 6: laço while estabilizando servidores críticos
const REDUCAO = 20; 
const MAX_TENTATIVAS = 5; 
const btnReiniciar = document.getElementById("btn-reiniciar"); 
function reiniciarCriticos() { 
    const mensagens = []; 
    for (let i = 0; i < servidores.length; i++) { 
        const s = servidores[i]; 
        if (!s.online) {
            continue; 
        } 
        let tentativas = 0; while (s.cpu >= 90 && tentativas < MAX_TENTATIVAS) { 
            s.cpu = s.cpu - REDUCAO; tentativas++; 
        } if (tentativas > 0) { 
            mensagens.push( s.nome + ": estabilizado após " + tentativas + " tentativa(s), cpu " + s.cpu + "%" ); 
        } 
    } 
    renderizar(); 
    log.textContent = mensagens.length > 0 ? mensagens.join("\n") : "Nenhum servidor crítico."; 
} 

btnReiniciar.addEventListener("click", reiniciarCriticos);