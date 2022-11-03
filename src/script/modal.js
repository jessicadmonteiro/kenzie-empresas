const body = document.querySelector("body")

export function abirModal (children) {
    const fundoConteiner     = document.createElement("section")
    const containerPrincipal = document.createElement("div")
    const botaoFecharModal   = document.createElement("button")

    fundoConteiner.classList.add("fundo_modal")
    containerPrincipal.classList.add("container_modal")
    botaoFecharModal.classList.add("bt_fechar_modal")

    botaoFecharModal.innerText = "X"

    fundoConteiner.addEventListener("click", (event) => {
        const {className} = event.target
        if(className === "fundo_modal" || className === "bt_fechar_modal" || className === "bt_cancelar") {
            fundoConteiner.remove()
        }
    })

    containerPrincipal.appendChild(botaoFecharModal)
    containerPrincipal.append(children)
    fundoConteiner.appendChild(containerPrincipal)
    body.appendChild(fundoConteiner)

}



export function visualizar (nomeDepartamento, descricaoDepartamento, nomeEmpresa ) {
    const containerReceberInformacoesModal = document.querySelector(".container_receberModal")

    containerReceberInformacoesModal.insertAdjacentHTML("beforeend",
    `
    <h2>${nomeDepartamento}</h2>
        <div class="container_descricao_departamento_select">
            <div>
                <h3>${descricaoDepartamento}</h3>
                <p class="texto_empresa_pertencente">${nomeEmpresa }</p>
            </div>
            <select class="selecionar_usuario" name="" id="">
                <option value="">Selecionar usuário</option>
            </select>
        </div>
        <button class="bt_cantratar">Contratar</button>
        <section class="container_desligamento">
            <ul class="ul_desligamento">
                <li class="container_desligamento_li">
                    <h3 class="nome">Nome</h3>
                    <p class="nivel">nivel</p>
                    <p class="empresa">nome da empresa</p>
                   <button class="bt_desligar">Desligar</button>
                </li>
            </ul>
        </section>`)
        return containerReceberInformacoesModal 
}

