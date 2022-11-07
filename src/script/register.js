import {criarUsuario} from "/src/script/api.js"

function paginaHome () {
    let botaoHome = document.querySelector(".bt_menu1")
    botaoHome.addEventListener("click", () => {
        window.location.assign("/index.html")
    })
}
paginaHome ()

function paginaLogin () {
    let botaoLogin = document.querySelector(".bt_menu2")
    botaoLogin.addEventListener("click", () => {
        window.location.assign("/src/page/login/index.html")
    })
}
paginaLogin ()


function eventoCadastro () {
    const form = document.querySelector("form")

    const elementos = [...form.elements]
    form.addEventListener("submit", async (event) => {
        event.preventDefault()

        const body = {}
        elementos.forEach((element) => {
            if(element.tagName == "INPUT" && element.value !== ""){
                body[element.id] = element.value
            }
        })
        
        await criarUsuario(body)
    })
}
eventoCadastro ()

function eventoRetornar () {
    const botao = document.querySelector(".bt_retorno")

    botao.addEventListener("click", () => {
        window.location.replace("/index.html")
    })
}
eventoRetornar ()