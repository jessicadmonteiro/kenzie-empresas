import { deletarUsuario, criarDepartamento, listarEmpresas, editarDepartamento, excluirDepartamento, editarUsuario} from "./api.js"
import {renderizarDepartamento, renderizarUsuarios} from "./admin.js"

let empresas  = await listarEmpresas ()


export function abirModal (children) {
    const body = document.querySelector("body")

    const fundoConteiner     = document.createElement("section")
    const containerPrincipal = document.createElement("div")
    const botaoFecharModal   = document.createElement("button")

    fundoConteiner.classList.add("fundo_modal")
    containerPrincipal.classList.add("container_modal")
    botaoFecharModal.classList.add("bt_fechar_modal")

    botaoFecharModal.innerText = "X"

    fundoConteiner.addEventListener("click", (event) => {
        const {className} = event.target
        if(className === "fundo_modal" || className === "bt_fechar_modal") {
            fundoConteiner.remove()
        }
    })

    containerPrincipal.appendChild(botaoFecharModal)
    containerPrincipal.append(children)
    fundoConteiner.appendChild(containerPrincipal)
    body.appendChild(fundoConteiner)

}



export function visualizar (nomeDepartamento, descricaoDepartamento, nomeEmpresa, usuarios, usuariosSemDp) {
    const container = document.createElement("section")

        let h2           = document.createElement("h2")
        let divContainer = document.createElement("div")
        let div          = document.createElement("div")
        let h3Descricao  = document.createElement("h3")
        let p            = document.createElement("p")
        let select       = document.createElement("select")
        let option       = document.createElement("option")
        let button       = document.createElement("button")
        let section      = document.createElement("section")
        let ul = document.createElement("ul")

        divContainer.classList.add("container_descricao_departamento_select")
        button.classList.add("bt_cantratar")
        section.classList.add("container_desligamento")
        ul.classList.add("ul_desligamento")

        select.id = "selecionar_usuario"
        h2.innerText          = nomeDepartamento
        h3Descricao.innerText = descricaoDepartamento
        p.innerText           = nomeEmpresa
        option.innerText      = "Selecionar Usuario"
        select.append(option)

        usuariosSemDp.forEach(element => {
            
            let nome = element.username
            let id    = element.uuid
            console.log(nome)

            let option       = document.createElement("option")
            option.innerText = nome
            option.id        = id

            select.append(option)
        })

        button.innerText = "Contratar"

        usuarios.forEach( element =>{
            let nome = element.username
            let nivel = element.professional_level
            let empresa = element.kind_of_work

            let li = document.createElement("li")
            let h3 = document.createElement("h3")
            let pNivel = document.createElement("p")
            let pEmpresa = document.createElement("p")
            let bt = document.createElement("button")

            li.classList.add("container_desligamento_li")
            h3.classList.add("nome")
            pNivel.classList.add("nivel")
            pEmpresa.classList.add("empresa")
            bt.classList.add("bt_desligar")

            h3.innerText = nome
            pNivel.innerText = nivel
            pEmpresa.innerText = empresa
            bt.innerText = "Desligar"

            li.append(h3, pNivel, pEmpresa, bt)
            ul.appendChild(li)
        })

        divContainer.append(div)
        div.append(h3Descricao, p)
        section.append(ul)
        container.append(h2, divContainer, select, button, section)
        
        return container
}


export function deletarUsuarioCadastrado ({uuid, username}) {
    let div = document.createElement("div")
    let h3 = document.createElement("h3")
    let bt = document.createElement("button")

    h3.classList.add("h3_deletar_usuario")
    bt.classList.add("bt_deleta", "bt_verde")
    

    h3.innerText = `Realmente deseja remover o usuário ${username}?`
    bt.innerText = "Deletar"

    bt.addEventListener("click", async () =>{

        await deletarUsuario(uuid, username)
        await renderizarUsuarios ()
        
        const modal = document.querySelector(".fundo_modal")
        modal.remove()
    })

    div.append(h3,bt)
    return div
}

export function modalCriarDepartamento () {

    const formulario = document.createElement("form")

    let h3 = document.createElement("h3")
    let inputDepartamento = document.createElement("input")
    let inputDescricao = document.createElement("input")
    let select = document.createElement("select")
    let button = document.createElement("button")

    h3.classList.add("titulo_modal")
    select.classList.add("selecionar_usuario")

    h3.innerText = "Criar Departamento"
    inputDepartamento.type = "text"
    inputDepartamento.name = "name"
    inputDepartamento.id = "departamento"
    inputDepartamento.placeholder = "Nome do departamento"
    inputDescricao.type = "text"
    inputDescricao.name = "description"
    inputDescricao.id = "descricao"
    inputDescricao.placeholder = "Descrição"
    select.name = "company_uuid"
    select.id   = "selecionarEmpresa"

    let option = document.createElement("option")
    option.innerText = "Selecionar Empresa"

    select.append(option)

    empresas.forEach(element => {
        let nome = element.name
        let id = element.uuid

        let option = document.createElement("option")

        option.innerText = nome
        option.value = id
        select.append(option)
    })
    
    button.type = "submit"
    button.innerText = "Criar o departamento"
    
    formulario.append(h3, inputDepartamento, inputDescricao, select, button)
    
  
    formulario.addEventListener("submit", async (event) => {
       event.preventDefault()

       const inputs = [...event.target]

       const novoDepartamento = {}

       inputs.forEach(({name, value}) => {

           if(name){
             novoDepartamento [name] = value
           }
       })
       
       await criarDepartamento (novoDepartamento )
       await renderizarDepartamento ()

       const modal = document.querySelector(".fundo_modal")
       modal.remove()
      
    })

    return formulario

}

export function modalEditarDepartamento ({description, uuid
}) {

    const formulario = document.createElement("form")

    let h3 = document.createElement("h3")
    let input = document.createElement("input")
    let bt = document.createElement("button")

    h3.innerText = "Editar Departamento"
    input.type   = "text"
    input.value  = description
    input.name   = "description"
    bt.innerText = "Salvar alterações"
    bt.type = "submit"
    
    formulario.append(h3, input, bt)

    formulario.addEventListener("submit", async (event) => {
        event.preventDefault()

        const inputs = [...event.target]

        const departamentoEditado = {}

        inputs.forEach(({name, value}) => {

            if(name){
                departamentoEditado[name] = value
            }
        })

        await editarDepartamento (departamentoEditado, uuid)

        await renderizarDepartamento()

        const modal = document.querySelector(".fundo_modal")
        modal.remove()

     })
     return formulario

}

export function deletarDepartamento ({uuid, name
}) {
    const div = document.createElement("div")

    let h3 = document.createElement("h3")
    let bt = document.createElement("button")

    h3.classList.add("h3_deletar_departamento")
    bt.classList.add("bt_verde")

    h3.innerText = `Realmente deseja deletar o Departamento ${name} e demitir seus funcionários?`
    bt.innerText = "Confirmar"
    bt.id = uuid

    div.append(h3, bt)

    bt.addEventListener("click", async () => {

        await excluirDepartamento(uuid)
        await renderizarDepartamento()

        const modal = document.querySelector(".fundo_modal")
         modal.remove()
    })
    return div
}

export function modalEditarUsuario ({ kind_of_work ,professional_level, uuid
}) {

    const formulario = document.createElement("form")

    let h3 = document.createElement("h3")
    let div = document.createElement("div")
    let selectModalidade = document.createElement("select")
    let optionModalidade = document.createElement("option")
    let optionModalidade2 = document.createElement("option")
    let optionModalidade3 = document.createElement("option")
    let optionModalidade4 = document.createElement("option")
    let selectNivel = document.createElement("select")
    let optionNivel = document.createElement("option")
    let optionNivel2 = document.createElement("option")
    let optionNivel3 = document.createElement("option")
    let optionNivel4 = document.createElement("option")
    let optionNivel5 = document.createElement("option")
    let bt = document.createElement("button")

    div.classList.add("div_select")


    h3.innerText = "Editar Usuário"
   
    selectModalidade.name    = "kind_of_work"
    selectNivel.name = "professional_level"

    optionModalidade2.innerText = "Home office"
    optionModalidade2.value = "home office"
    optionModalidade3.innerText = "Presencial"
    optionModalidade3.value = "presencial"
    optionModalidade4.innerText = "Híbrido"
    optionModalidade4.innerText = "hibrido"
    optionNivel.value = "null"
    optionNivel2.innerText = "Estagio"
    optionNivel2.value = "estágio"
    optionNivel3.innerText = "Júnior"
    optionNivel3.value     = "júnior"
    optionNivel3.id = "kind_of_work:"
    optionNivel4.innerText = "Pleno"
    optionNivel4.value     = "pleno"
    optionNivel5.innerText = "Sênior"
    optionNivel5.value     = "sênior"

    bt.innerText = "Editar"
    bt.type = "submit"
    

    formulario.append(h3, div, bt)
    div.append(selectModalidade, selectNivel)
    selectModalidade.append(optionModalidade2, optionModalidade3, optionModalidade4)
    selectNivel.append(optionNivel2, optionNivel3, optionNivel4, optionNivel5)

    formulario.addEventListener("submit", async (event) => {
        event.preventDefault()

        const select = [...event.target]
        console.log(select)

        const dadosUsuario = {}

        select.forEach(({name, value }) => {

            if(name){
                dadosUsuario[name] = value
            }
        })
        console.log(dadosUsuario)

        await editarUsuario(dadosUsuario, uuid)
        await renderizarUsuarios ()

        const modal = document.querySelector(".fundo_modal")
        modal.remove()

     })
     return formulario
    
}