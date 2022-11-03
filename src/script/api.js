let baseUrl = "http://localhost:6278"

export async function todosSetores () {
    let selecao = fetch (`${baseUrl}/sectors`, {
        method: "GET"
    })
    .then (res => res.json())
    .then (res =>{
        
        let setor =  localStorage.setItem("setores",JSON.stringify(res))
       
    })
}
todosSetores ()

export async function listarEmpresa () {
    let selecao = fetch (`${baseUrl}/companies`, {
        method: "GET"
    })
    .then (res => res.json())
    .then (res =>{
        
        let setor =  localStorage.setItem("setor",JSON.stringify(res))
       
    })
}
listarEmpresa () 



export async function listarDepartamento () {
    
    let selecao = fetch (`${baseUrl}/departments`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
        }
    })
    .then (res => res.json())
    .then (res =>{
        
         localStorage.setItem("departamento",JSON.stringify(res))
       
    })
}


export async function listarUsuarios() {
    
    let selecao = fetch (`${baseUrl}/users`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
        }
    })
    .then (res => res.json())
    .then (res =>{
        console.log(res)
         localStorage.setItem("cadastroUsuario",JSON.stringify(res))
       
    })
}


export async function criarUsuario (body) {
    
    try {
        const request = await fetch(`${baseUrl}/auth/register`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(body)
            
        })
        
        if(request.ok){
            const response = await request.json()
            const toast = document.querySelector(".container_toast")
            toast.style.display = "flex"
        }else{
            const toast = document.querySelector(".container_toast_invalido")
            toast.style.display = "flex"
        }
    }
    catch(err) {
        const toast = document.querySelector(".container_toast_invalido")
        toast.style.display = "flex"
    }
    
}

export async function login (body) {
    let url = fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(body)
        
    })
    .then (res => res.json())
    .then (res => {
       
        localStorage.setItem("token", JSON.stringify(res.token))
        
        
    }).then (() => {
        verificarUsuario ()
        listarDepartamento ()
        listarUsuarios()
    })
}


export async function verificarUsuario () {
    
    let url = fetch(`${baseUrl}/auth/validate_user`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
        }
    })
    .then(res => res.json()) 
    .then (res =>{
        console.log(res) 
        if(res.is_admin){
            window.location.assign("/src/page/admin/index.html")
        }else {
            window.location.assign("/src/page/user/index.html")
        }

    })
    .catch((err => console.log(err)))
}


export async function informacaoUsuario () {

    let url = fetch(`${baseUrl}/users/profile`, {
        method: "GET",
        headers: { 
            "Authorization": `Bearer ${local.token}`
        }
    })
    .then (res => res.json())
    .then (res =>{
        console.log(res)     

        localStorage.setItem("usuario", JSON.stringify(res))
    })
    .catch((err => console.log(err)))
}
// informacaoUsuario () 

export async function editarInformacaoes (body) {
    let url = fetch(`${baseUrl}/users`, {
        method: "PATCH",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            },
            body: JSON.stringify(body)
    })
}


