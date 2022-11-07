import { abirModal ,deletarUsuarioCadastrado, visualizar, modalCriarDepartamento, modalEditarDepartamento, deletarDepartamento, modalEditarUsuario} from "./modal_admin.js"
import { usuarioSemDepartamento, listarDepartamento, listarEmpresas, listarUsuarios} from "./api.js"


const empresas  = await listarEmpresas ()
const departamento = await listarDepartamento ()
const usuariosSemDp =  await usuarioSemDepartamento ()

function eventoLogout () {

    const botaoLogout = document.querySelector(".bt_menu1")
    botaoLogout.addEventListener("click", () => {

        window.location.assign("/index.html")
        localStorage.removeItem("token")
       
    })
}
eventoLogout ()


async function  selecionarEmpresa (arr) {
    
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

        containerSeletor.appendChild(tagOption)
        
    });
}
selecionarEmpresa(empresas)


export async function renderizarDepartamento () {

    const departamento = await listarDepartamento ()
    const usuariosSemDp =  await usuarioSemDepartamento ()


    function listaDepartamento(arr, usuarios) {
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

            imgVetor2.addEventListener("click", async () => {

                let informacaoesModal = visualizar(nomeDepartamento, descricaoDepartamento, nomeEmpresa, usuarios, usuariosSemDp )
                
                abirModal(informacaoesModal)

            })

            imgVetor3.src        = "/src/assets/Vector (3).png"
            imgVetor3.alt        = "lapis"

            imgVetor3.addEventListener("click", () => {
                
                let edDepartamento = modalEditarDepartamento (element)

                abirModal(edDepartamento)
            })

            imgVetor4.src        = "/src/assets/Vector (4).png"
            imgVetor4.alt        = "lixeira"

            imgVetor4.addEventListener("click", async () => {
                const excluirDepartamento = deletarDepartamento (element)
                abirModal(excluirDepartamento)
            })

            li.append(h3, pDescricao, pEmpresa, div)
            div.append(imgVetor2, imgVetor3, imgVetor4)

            ul.appendChild(li)
        });
    }
    listaDepartamento(departamento, usuariosSemDp)

    let containerSeletor = document.querySelector("#selecionar_empresas")
    containerSeletor.addEventListener("click", async(event) => { 
        let departamento = await listarDepartamento ()
        let empresa = event.target.value
       
        let novoArray = departamento.filter((element) => element.companies.name === empresa)
        
        listaDepartamento(novoArray, usuariosSemDp)
        
    })
    
}
 renderizarDepartamento ()

export async function renderizarUsuarios () {

    const cadastroUsuario = await listarUsuarios()

    function listarTodosUsuarios (arr){
        const ul = document.querySelector("#container_usuario")
        ul.innerHTML = ""

        arr.forEach(element => {

            if(element.username  !== "ADMIN"){
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

            imgVetor.addEventListener("click", () => {
               let editar =  modalEditarUsuario (element)
               abirModal(editar)
            })

            imgVetor4.src      = "/src/assets/Vector (4).png"
            imgVetor4.alt      = "lixeira"

            imgVetor4.addEventListener("click", () => {
                const excluirUsuario = deletarUsuarioCadastrado (element) 
                abirModal(excluirUsuario)
            })

            li.append(h3, pNivel, pEmpresa, div)
            div.append(imgVetor, imgVetor4)

            ul.appendChild(li)
        }
    })
    }
    listarTodosUsuarios (cadastroUsuario)
}
renderizarUsuarios ()

function eventoCriarDepartamento () {
    const botao = document.querySelector(".bt_criar")
    botao.addEventListener("click", () => {
        const criar = modalCriarDepartamento ()
        abirModal(criar)

    })
}
eventoCriarDepartamento ()


