import { abirModal ,visualizar } from "./modal.js"

let departamento = JSON.parse(localStorage.departamento)
let cadastroUsuario = JSON.parse(localStorage.cadastroUsuario)
let empresas  = JSON.parse(localStorage.setor)

function eventoLogout () {

    const botaoLogout = document.querySelector(".bt_menu1")
    botaoLogout.addEventListener("click", () => {

        window.location.assign("/index.html")
        localStorage.removeItem("token")
        localStorage.removeItem("departamento")
    })
}
eventoLogout ()


function selecionarEmpresa (arr) {
    let containerSeletor = document.querySelector("#selecionar_empresas")
    containerSeletor.innerHTML = ""

    let tagOption = document.createElement("option")
    tagOption.innerText = "Selecionar Empresa"
    containerSeletor.appendChild(tagOption)

    arr.forEach(element => {

        let empresa = element.name
        let id    = element.uuid

        let tagOption = document.createElement("option")

        tagOption.id        = id
        tagOption.innerText = empresa

        containerSeletor.addEventListener("click", (event) => {
            let empresa = event.target.value
            let novoArray = departamento.filter((element) => element.companies.name === empresa)
            renderizarDepartamento(novoArray)

        })

        containerSeletor.appendChild(tagOption)
        
    });
}
selecionarEmpresa(empresas)

function renderizarDepartamento (arr) {
    const ul = document.querySelector("#container_departamento")
    ul.innerHTML = ""

    arr.forEach(element => {
        let nomeDepartamento      = element.name
        let descricaoDepartamento = element.description
        let nomeEmpresa           = element.companies.name

        let li         = document.createElement("li")
        let h3         = document.createElement("h3")
        let pDescricao = document.createElement("p")
        let pEmpresa   = document.createElement("p")
        let div        = document.createElement("div")
        let imgVetor2  = document.createElement("img")
        let imgVetor3  = document.createElement("img")
        let imgVetor4  = document.createElement("img")

        li.classList.add("container_li")
        h3.classList.add("departamento")
        pDescricao.classList.add("descricao")
        pEmpresa.classList.add("empresa")
        div.classList.add("imgs")
        imgVetor2.classList.add("img_departamento")
        imgVetor3.classList.add("img_departamento")
        imgVetor4.classList.add("img_departamento")
        
        h3.innerText         = nomeDepartamento
        pDescricao.innerText = descricaoDepartamento
        pEmpresa.innerText   = nomeEmpresa
        imgVetor2.src        = "/src/assets/Vector (2).png"
        imgVetor2.alt        = "olho"

        imgVetor2.addEventListener("click", () => {

            let informacaoesModal = visualizar(nomeDepartamento, descricaoDepartamento, nomeEmpresa )
            abirModal(informacaoesModal)
        })

        imgVetor3.src        = "/src/assets/Vector (3).png"
        imgVetor3.alt        = "lapis"
        imgVetor4.src        = "/src/assets/Vector (4).png"
        imgVetor4.alt        = "lixeira"

        li.append(h3, pDescricao, pEmpresa, div)
        div.append(imgVetor2, imgVetor3, imgVetor4)

        ul.appendChild(li)
    });
}
renderizarDepartamento (departamento)

function renderizarUsuarios (arr) {
    const ul = document.querySelector("#container_usuario")
    ul.innerHTML = ""

    arr.forEach(element => {
        let nome    = element.username
        let nivel   = element.professional_level
        let empresa = element.kind_of_work
        let id      = element.uuid

        let li         = document.createElement("li")
        let h3         = document.createElement("h3")
        let pNivel     = document.createElement("p")
        let pEmpresa   = document.createElement("p")
        let div        = document.createElement("div")
        let imgVetor  = document.createElement("img")
        let imgVetor4  = document.createElement("img")

        li.classList.add("container_li")
        h3.classList.add("nome")
        pEmpresa.classList.add("empresa")
        div.classList.add("imgs")
        imgVetor.classList.add("img_departamento")
        imgVetor4.classList.add("img_departamento")

        h3.innerText       = nome
        pNivel.innerText   = nivel
        pEmpresa.innerText = empresa
        imgVetor.id        = id
        imgVetor.src       = "/src/assets/Vector.png"
        imgVetor.alt       = "lapis"
        imgVetor4.src      = "/src/assets/Vector (4).png"
        imgVetor4.alt      = "lixeira"

        li.append(h3, pNivel, pEmpresa, div)
        div.append(imgVetor, imgVetor4)

        ul.appendChild(li)

    })
}
renderizarUsuarios (cadastroUsuario)
