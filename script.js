//variaveis globais
const inputCep = document.getElementById("inputCep");
const rua = document.getElementById('rua');
const bairro = document.getElementById('bairro');
const cidade = document.getElementById('cidade');
const uf = document.getElementById('uf');
const ibge = document.getElementById('ibge');
const historico = document.getElementById("historico");
const resultadoCont = document.getElementById("resultadoCont")
const btnHistCont = document.getElementById("btnHistCont")
const historicoContainer = document.getElementById("historicoContainer")
const main = document.getElementById("main")

//Array do histórcio
const historicoArr = []

//Chaves do localStorage
const itens = Object.keys(localStorage)

//Armazena dados do localStorage no array do historico
itens.forEach(item => {
    historicoArr.push(JSON.parse(localStorage.getItem(item)))
})

//Caso tenha historico executa a exibição
if (historicoArr.length > 0){
    Historico()
    btnHistCont.style.display = "block"
}


//Função de exibição do historico
function Historico(){
    historico.innerHTML = ""
    historicoArr.forEach(dados => {
        var container = document.createElement('div')
        container.className = "containerHistorico"
        historico.appendChild(container)
        var cepH = document.createElement('h2');
        container.appendChild(cepH);
        cepH.innerText = "Cep: "+dados.titulo;
        var contHistorico = document.createElement('div')
        contHistorico.className = "contDadosHistorico"
        container.appendChild(contHistorico)
        var ruaH = document.createElement('p');
        var bairroH = document.createElement('p');
        var cidadeH = document.createElement('p');
        var ufH = document.createElement('p');
        var ibgeH = document.createElement('p');
        contHistorico.appendChild(ruaH);
        contHistorico.appendChild(bairroH);
        contHistorico.appendChild(cidadeH);
        contHistorico.appendChild(ufH);
        contHistorico.appendChild(ibgeH);
        ruaH.innerHTML="Rua: "+(dados.rua);
        bairroH.innerHTML="Bairro: "+(dados.bairro);
        cidadeH.innerHTML="Cidade: "+(dados.cidade);
        ufH.innerHTML="Estado: "+(dados.uf);
        ibgeH.innerHTML="IBGE: "+(dados.ibge);
    });
}

//Função que limpa valores do formulário de cep.
function limpa_formulário_cep() {
    rua.innerText=("");
    bairro.innerText=("");
    cidade.innerText=("");
    uf.innerText=("");
    ibge.innerText=("");
}

//Função que recebe os dados, armazena e exibe
function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        var data = {
            titulo: inputCep.value, 
            rua: conteudo.logradouro,
            bairro: conteudo.bairro,
            cidade: conteudo.localidade,
            uf: conteudo.uf,
            ibge: conteudo.ibge,
        }
        localStorage.setItem(inputCep.value, JSON.stringify(data))
        historicoArr.push(JSON.parse(localStorage.getItem(inputCep.value)))
        //Atualiza os campos com os valores.
        rua.innerText=(conteudo.logradouro);
        bairro.innerText=(conteudo.bairro);
        cidade.innerText=(conteudo.localidade);
        uf.innerText=(conteudo.uf);
        ibge.innerText=(conteudo.ibge);
        resultadoCont.style.display = "flex"
    } //end if.
    else {
        //CEP não Encontrado.
        limpa_formulário_cep();
        alert("CEP não encontrado.");
    }
    Historico();
    if (historicoArr.length > 0){
        btnHistCont.style.display = "block"
    }
}

//Função que busca os dados no webservice e chama a função de receber
function pesquisarCep() {
    var cep = inputCep.value.replace(/\D/g, '');

    if (cep != "") {

        var validacep = /^[0-9]{8}$/;

        if(validacep.test(cep)) {

            rua.innerText="...";
            bairro.innerText="...";
            cidade.innerText;
            uf.innerText="...";
            ibge.innerText="...";

            var script = document.createElement('script')
            script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

            document.body.appendChild(script);

        }
        else {
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    }
    else {
        alert("O campo está vazio.");
        limpa_formulário_cep();
    }
};

//Função que altera a exibição para mostrar o historico
function mostrarHistorico(){
    main.style.height = "auto";
    historicoContainer.style.display = "flex"
    btnHistCont.innerText = "Fechar histórico"
    btnHistCont.setAttribute('onclick', 'fecharHistorico()')
}

//Função que altera a exibição para fechar o historico
function fecharHistorico(){
    main.style.height = "75vh";
    historicoContainer.style.display = "none"
    btnHistCont.innerText = "Visualizar histórico"
    btnHistCont.setAttribute('onclick', 'mostrarHistorico()')
}
