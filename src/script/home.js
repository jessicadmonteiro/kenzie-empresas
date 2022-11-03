import { todosSetores, listarEmpresa} from "./api.js";

let setores = JSON.parse(localStorage.setores)

let empresas  = JSON.parse(localStorage.setor)

function paginaLogin () {
    let botaoLogin = document.querySelector(".bt_menu1")
    botaoLogin.addEventListener("click", () => {
        window.location.assign("/src/page/login/index.html")
    })
}
paginaLogin ()

function paginaCadastro() {
    let botaoCadastro= document.querySelector(".bt_menu2")
    botaoCadastro.addEventListener("click", () => {
        window.location.assign("/src/page/register/index.html")
    })
}
paginaCadastro()

function seletoresHome (arr) {
    let containerSeletor = document.querySelector("#selecionarSetor")
    containerSeletor.innerHTML = ""

    let tagOption = document.createElement("option")
    tagOption.innerText = "Selecionar Setor"
    containerSeletor.appendChild(tagOption)

    arr.forEach(element => {

        let setor = element.description
        let id    = element.uuid

        let tagOption = document.createElement("option")

        tagOption.id        = id
        tagOption.innerText = setor

        containerSeletor.addEventListener("click", (event) => {
            let setor = event.target.value
        
            let novoArray = empresas.filter((element) => element.sectors.description === setor)
            renderizarEmpresa (novoArray)

        })

        containerSeletor.appendChild(tagOption)
        
    });
}
seletoresHome (setores)

function renderizarEmpresa (arr) {
    let ul = document.querySelector("ul")
    ul.innerHTML = ""

    
    arr.forEach(element => {
        let nome   = element.name
        let horas  = element.opening_hours[0,1]
        
        let setor  = element.sectors.description

        let tagLi  = document.createElement("li")
        let tagh4  = document.createElement("h4")
        let tagP   = document.createElement("p")
        let tagBt  = document.createElement("button")

        tagBt.classList.add("bt_setor")

        tagh4.innerText = nome
        tagP.innerText  = `${horas} horas`
        tagBt.innerText = setor

        tagLi.append(tagh4, tagP, tagBt)
        ul.appendChild(tagLi)

    })
}
renderizarEmpresa (empresas)



