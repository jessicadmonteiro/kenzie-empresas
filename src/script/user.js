import {editarInformacaoes, getUsuario } from "./api.js"
import {abirModal} from "./modal_user.js"

function eventoLogout () {

    const botaoLogout = document.querySelector(".bt_menu1")
    botaoLogout.addEventListener("click", () => {

        window.location.assign("/index.html")
        localStorage.removeItem("token")
       
    })
}
eventoLogout ()

function editar() {

    const formulario = document.createElement("form")

    formulario.insertAdjacentHTML("beforeend",
        `
     <h3 class="titulo_modal">Editar Perfil</h3>
     <input name="username" type="text" id="username" placeholder="Seu nome">
     <input type="email" name="email" id="email" placeholder="Seu e-mail" >
     <input type="password" name="password" id="password" placeholder="Sua senha">
     <button type="submit" class="bt_editar">Editar perfil</button>
     `
    )

    formulario.addEventListener("submit", async (event) => {
        event.preventDefault()

        const inputs = [...event.target]
        console.log(inputs)

        const informacao = {}

        inputs.forEach(({ name, value }) => {

            if (name) {
                informacao[name] = value
            }
        })
        
        await editarInformacaoes(informacao)
        await informacaoUsuario ()

        const modal = document.querySelector(".fundo_modal")
        modal.remove()

    })
    return formulario
}


async function informacaoUsuario () {
    
    const usuario = await getUsuario ()
    console.log(usuario)

    function renderizarInformacoes (arr) {
        let section = document.querySelector("section")
        section.innerHTML = ""

        let nome  = arr.username
        let email = arr.email
        let nivel = arr.professional_level
        let modalidade = arr.kind_of_work

        let h2 = document.createElement("h2")
        let div = document.createElement("div")
        let pEmail = document.createElement("p")
        let pNivel = document.createElement("p")
        let pModalidade = document.createElement("p")
        let bt = document.createElement("button")

        div.classList.add("container_informacoesUsuario")
        bt.classList.add("bt_img")
        bt.addEventListener("click", () => {

            let editarInformacao = editar() 
            abirModal(editarInformacao)

        })

        h2.innerText     = nome
        pEmail.innerText = `Email: ${email}`
        pNivel.innerText = nivel
        pModalidade.innerText = modalidade

        div.append(pEmail, pNivel, pModalidade)
        section.append(h2, div, bt)
    
    }
    renderizarInformacoes(usuario)
}
informacaoUsuario ()



async function div () {
  function dados() {
        return `
        <h2>Você ainda não foi contratado</h2>
            `
    }

    document.body.insertAdjacentHTML(
        "beforeend",
       `<div class="container">
           ${dados()}
        </div class"container">
        ` 
    )
}
div ()
