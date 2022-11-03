
import {editarInformacaoes } from "./api.js"
import {abirModal} from "./modal.js"

function edita() {

    const formulario = document.createElement("form")

    formulario.insertAdjacentHTML("beforeend",
        `
     <h3 class="titulo_modal">Editar Perfil</h3>
     <input name="username" type="text" id="username" placeholder="Seu nome" required>
     <input type="email" name="email" id="email" placeholder="Seu e-mail" >
     <input type="passpassword" name="password" id="password" placeholder="Sua senha">
     <button type="submit" class="bt_editar">Editar perfil</button>
     `
    )

    formulario.addEventListener("submit", async (event) => {
        event.preventDefault()

        const inputs = [...event.target]

        const informacao = {}

        inputs.forEach(({ name, value }) => {

            if (name) {
                informacao[name] = value
            }
        })

        await editarInformacaoes(informacao)

        const modal = document.querySelector(".fundo_modal")
        modal.remove()

    })
    return formulario
}



async function section() {
    let usuario = JSON.parse(localStorage.getItem("usuario"))
    console.log(usuario)

    function dadosUsuario(nome, email, nivel) {
        return `
        
            <h2>${nome}</h2>
            <div class="container_informacoesUsuario">
                <p>Email: ${email}</p>
                <p>${nivel}</p>
                <p>Home Office</p>
            </div>
            <button class="bt_img"></button>
            `
    }

    document.body.insertAdjacentHTML(
        "beforeend",
       `<section>
            ${dadosUsuario(usuario.username
                , usuario.email
                , usuario.professional_level)}
        </section>
        ` 
    )
}
section()

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

let botao = document.querySelector(".bt_img")

botao.addEventListener("click", () => {
    
    let editarInformacao = edita() 
    abirModal(editarInformacao)

})