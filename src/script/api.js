let baseUrl = "http://localhost:6278"

export async function todosSetores () {
    try{
        let url = fetch (`${baseUrl}/sectors`, {
            method: "GET",
            headers: { 
                "Content-Type": "application/json"
            }
        })
        const response = await (await url).json()
        return response
    }catch(err) {
        console.log(err)
    }
}

export async function listarEmpresas () {
    
    try {
        let url = fetch (`${baseUrl}/companies`, {
            method: "GET",
            headers: { 
                "Content-Type": "application/json"
            }
        })

        const response = await (await url).json()

        return response
    }catch(err) {
        console.log(err)
    }
}


export async function listarDepartamento () {
    
    try {
        let url = await fetch (`${baseUrl}/departments`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        })
        const response = await url.json()
        return response
    }catch (err) {
        console.log(err)
    }
   
}


export async function listarUsuarios() {
    try {
        let url = fetch (`${baseUrl}/users`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        })
        const response = await (await url).json()
        return response
    }catch (err) {
        console.log(err)
    }
    
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

            setTimeout(() =>{
                window.location.replace("/src/page/login/index.html")
            }, 4000)
            
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
        if(res.error === "required password!"){

            const toast = document.querySelector(".container_toast_invalido")
            toast.style.display = "flex"
        }
        else if(res.error === "email invalid!"){

            const toast = document.querySelector(".container_toast_invalido_email")
            toast.style.display = "flex"
        }if(res.error === "password invalid!"){
            
            const toast = document.querySelector(".container_toast_invalido_senha")
            toast.style.display = "flex"
        }
        
        
    }).then (() => {
        verificarUsuario ()
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

        if(res.is_admin){
            window.location.assign("/src/page/admin/index.html")
        }else {
            window.location.assign("/src/page/user/index.html")
        }

    })
    .catch((err => console.log(err)))
}

export async function getUsuario ()  {

    try{
        let url = fetch(`${baseUrl}/users/profile`, {
            method: "GET",
            headers: { 
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        })
        const response = await (await url).json()
        return response
    }catch(err) {
        console.log(err)
    }
}

export async function editarInformacaoes (body) {
    try {
        let url = fetch(`${baseUrl}/users`, {
            method: "PATCH",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
                },
                body: JSON.stringify(body)
        })
        const response = await (await url).json()
        return response
    }catch(err) {
        console.log(err)
    }
     
}


export async function usuarioSemDepartamento () {

    try {
        let url = await fetch(`${baseUrl}/admin/out_of_work`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        })
        const response = await url.json()
        return response
    }catch(err) {
        console.log(err)
    }
   
    
}


export async function deletarUsuario (id) {
        try {
            const request = await fetch(`${baseUrl}/admin/delete_user/${id}`, {
                method: "DELETE",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
                },
            })
    
            const response = await request.json()
            return response
        }catch(err) {
            console.log(err)
        }
}

export async function editarUsuario (body, uuid) {
    try {
        const url = await fetch(`${baseUrl}/admin/update_user/${uuid}`, {
            method: "PATCH",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
            },
            body: JSON.stringify(body)
        })

        const response = await url.json()
        console.log(response)
        return response
    }catch(err) {
        console.log(err)
    }

}

export async function criarDepartamento (body) {

    try {
        const url = await fetch(`${baseUrl}/departments`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
            },
            body: JSON.stringify(body)
        })

        const response = await url.json()
        return response
    }catch(err) {
        console.log(err)
    }
}

export async function editarDepartamento (body, id) {
   
    try {
        const url = await fetch(`${baseUrl}/departments/${id}`, {
            method: "PATCH",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
            },
            body: JSON.stringify(body)
        })

        const response = await url.json()
        return response
    }catch(err) {
        console.log(err)
    }
    
}

export async function excluirDepartamento (id) {
   
    try {
        const url = await fetch(`${baseUrl}/departments/${id}`, {
            method: "DELETE",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
            },
        })

        const response = await url.json()
        return response
    }catch(err) {
        console.log(err)
    }
    
}

export async function contratarFuncionario (body) {
    try {
        const url = await fetch(`${baseUrl}/departments/hire/`, {
            method: "PATCH",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
            },
            body: JSON.stringify(body)
        })

        const response = await url.json()
        return response
    }catch(err) {
        console.log(err)
    }
}