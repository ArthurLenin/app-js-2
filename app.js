class Desejo {
    constructor(nome, tipo, valor, descricao) {
        this.nome = nome
        this.tipo = tipo 
        this.valor = valor
        this.descricao = descricao
    }

    validarDados() {
        for(let i in this){
            if(this[i] == undefined || this[i] == '' || this[i] == null){
                return false
            }
        }
        return true
    }
}

class Bd {
    
    constructor() {
        let id = localStorage.getItem('id') 
    
        if(id === null) {
            localStorage.setItem('id', 0)
        }
    }

    getProximoId() {
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }

    gravar(d) {
        let id = this.getProximoId()

        localStorage.setItem(id, JSON.stringify(d))

        localStorage.setItem('id', id)
        console.log(id)
    }

    recuperarTodosRegistros() {

        let desejos = Array()

        let id = localStorage.getItem('id')

        for(let i = 1; i <= id; i++) {
            
            let desejo = JSON.parse(localStorage.getItem(i))

            if(desejo === null) {
                continue
            }
            desejo.id = i
            desejos.push(desejo)

        }
        return desejos
    }

    pesquisar(desejo) {

        let desejosFiltrados = Array()

        desejosFiltrados = this.recuperarTodosRegistros()

        console.log(desejosFiltrados)
        console.log(desejo)

        if(desejo.nome  != ''){
            desejosFiltrados = desejosFiltrados.filter(d => d.nome == desejo.nome)  
        }
        if(desejo.tipo  != ''){
            desejosFiltrados = desejosFiltrados.filter(d => d.tipo == desejo.tipo)  
        }
        if(desejo.valor  != ''){
            desejosFiltrados = desejosFiltrados.filter(d => d.valor == desejo.valor)  
        }
        if(desejo.descricao  != ''){
            desejosFiltrados = desejosFiltrados.filter(d => d.descricao == desejo.descricao)  
        }
        

        return desejosFiltrados
    }

    remover(id) {
        localStorage.removeItem(id)
    }
}

let bd = new Bd()


function cadastrarDesejo() {

    let nome = document.getElementById('nome')
    let tipo = document.getElementById('tipo')
    let valor = document.getElementById('valor')
    let descricao = document.getElementById('descricao')

    let desejo = new Desejo(nome.value, tipo.value, valor.value, descricao.value)

    if(desejo.validarDados()) {
        bd.gravar(desejo)

        document.getElementById('modal_titulo').innerHTML = 'Registrado com sucesso!'
        document.getElementById('modal_titulo_div').className = 'modal-header text-success'
        document.getElementById('modal_conteudo').innerHTML = 'Desejo cadastrado com sucesso.'
        document.getElementById('modal_btn').innerHTML = 'Voltar'
        document.getElementById('modal_btn').className = 'btn btn-success'

        $('#modalRegistraDesejo').modal('show')

        nome.value = ''
        tipo.value = '' 
        descricao.value = ''
        valor.value = ''

    } else {

        document.getElementById('modal_titulo').innerHTML = 'Erro no Registro!'
        document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
        document.getElementById('modal_conteudo').innerHTML = 'Verifique se todos os campos foram preenchidos!'
        document.getElementById('modal_btn').innerHTML = 'Voltar'
        document.getElementById('modal_btn').className = 'btn btn-danger'

        $('#modalRegistraDesejo').modal('show')
    }

}

function carregaListaDesejos(desejos = Array(), filtro = false) {

    if(desejos.length == 0 && filtro == false) {
        desejos = bd.recuperarTodosRegistros()
    }

    var listaDesejos = document.getElementById('listaDesejos')
    listaDesejos.innerHTML = ''

    desejos.forEach(function(d){

         linha = listaDesejos.insertRow()
        
        linha.insertCell(0).innerHTML = d.nome

        switch(d.tipo) {
            case '1': d.tipo = 'Veiculo'
                break
            case '2': d.tipo = 'Educação'
                break
            case '3': d.tipo = 'Eletrodomestico'
                break
            case '4': d.tipo = 'Lazer'
                break
            case '5': d.tipo = 'Imovel'
                break
        }
        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor

        let btn = document.createElement("button")
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class="fas fa-times"></i>'
        btn.id = d.id
        btn.onclick = function () {
            bd.remover(this.id)

            window.location.reload()
        }
        linha.insertCell(4).append(btn)

        console.log(d)
            
    })


}

function pesquisarDesejo() {
    let nome = document.getElementById('nome').value
    let tipo = document.getElementById('tipo').value
    let valor = document.getElementById('valor').value
    let descricao = document.getElementById('descricao').value


    let desejo = new Desejo(nome, tipo, valor, descricao)

    let desejos = bd.pesquisar(desejo)

    carregaListaDesejos(desejos, true)
}

function esconderCampoPesquisa() {
    this.style.display = 'none';
 }