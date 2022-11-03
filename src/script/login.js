import {login} from "/src/script/api.js"

function paginaHome () {
    let botaoHome = document.querySelector(".bt_menu1")
    botaoHome.addEventListener("click", () => {
        window.location.assign("/index.html")
    })
}
paginaHome ()

function paginaCadastro () {
    let botaoCadastro = document.querySelector(".bt_menu2")
    botaoCadastro.addEventListener("click", () => {
        window.location.assign("/src/page/register/index.html")
    })
}
paginaCadastro ()

function eventoLogin () {
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

        let token = await login(body)
        
    })
    
}
eventoLogin ()