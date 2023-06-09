import { todosSetores, listarEmpresas} from "./api.js";

let setores =  await todosSetores ()

let empresas  = await listarEmpresas ()


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

const botao = document.querySelector(".bt_img")
botao.addEventListener("click", () => {
    let containerBts = document.querySelector(".container_bt_menu_mobile")
    containerBts.style.display = "flex"
})

const botaoX = document.querySelector(".bt_x")
botaoX.addEventListener("click", () => {
    let containerBts = document.querySelector(".container_bt_menu_mobile")
    containerBts.style.display = "none"
})

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



