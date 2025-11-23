//Abre o modal de transação
const myModal = new bootstrap.Modal("#transaction-modal");
//Busca usuário logado sessionStorage e localStorage
let logged = sessionStorage.getItem("logged")
const session = localStorage.getItem("session")

let data = {
    transactions: []
}

checkLogged();
getCashIn();

//LISTENERS
/**
 * Adiciona listener ao botão logout
 * que executa a função logout quado clicado
 */
document.getElementById("button-logout").addEventListener("click", logout);

/**
 * Adiciona listerer ao botão transactions
 * que ao ser clicado direciona a página transactions.html
 */
document.getElementById("transactions-button").addEventListener("click", function () {
    window.location.href = "transactions.html";
})

/**
 * Adiciona listener ao formulário de transações,
 * interceptando o envio (submit) para tratar os dados
 * manutalmente antes de salvá-los.
 * @param {Event e} - Evento de submissão de formulário
 */
document.getElementById("transaction-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const value = parseFloat(document.getElementById("value-input").value);
    const description = document.getElementById("description-input").value;
    const date = document.getElementById("date-input").value;
    //querySelector trás todos os elementos conforme parâmetro
    const type = document.querySelector('input[name="type-input"]:checked').value;

    data.transactions.unshift({
        value: value,
        type: type,
        description: description,
        date: date
    });

    saveData(data);
    e.target.reset();
    myModal.hide();
    getCashIn();
    getCashOut();
    getTotal();

    
    alert("Lançamento adicionado com Sucesso!")
})

//FUNCOES
/**
 * Salva no localStorage todos os dados do usuário,
 * incluindo a lista de transações atualizada.
 * Cada transação contém valor, tipo, descrição e data.
 * O login do usuário é utilizado como chave de armazenamento.
 *
 * @param {Object} data - Objeto completo de dados do usuário,
 * incluindo o array data.transactions.
 */
function saveData(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}

/**
 * Verifica se o usuário está logado.
 * Caso exista uma sessão persistente (localStorage),
 * ela é restaurada no sessionStorage.
 *
 * Se nenhum usuário estiver logado, o sistema redireciona
 * imediatamente para a página inicial (index.html).
 *
 * Após validar o login, os dados do usuário são carregados
 * e os valores de entradas, saídas e total são atualizados.
 *
 * @returns {void}
 */
function checkLogged() {
    if (session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if (!logged) {
        window.location.href = "index.html";
        return;
    }

    const dataUser = localStorage.getItem(logged);
    if (dataUser) {
        data = JSON.parse(dataUser);
    }

    getCashIn();
    getCashOut();
    getTotal();
}

/**
 * Realiza o logout do usuário removendo:
 * - O estado de login do sessionStorage (sessão atual)
 * - A sessão persistente do localStorage (manter logado)
 *
 * Após limpar os dados, o usuário é redirecionado
 * para a página inicial (index.html).
 *
 * @returns {void}
 */
function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");
    window.location.href = "index.html";
}

/**
 * Gera e exibe a lista de receitas (entradas) filtrando as transações
 * do usuário pelo tipo "1". Limita a exibição aos últimos 5 registros
 * e monta dinamicamente o HTML inserindo-o no elemento "cash-in-list".
 */
function getCashIn() {
    const transactions = data.transactions;

    const cashIn = transactions.filter((item) => item.type === "1");

    if (cashIn.length) {
        let cashInHtml = ``;
        let limit = 0;

        if (cashIn.length > 5) {
            limit = 5;
        } else {
            limit = cashIn.length;
        }

        for (let i = 0; i < limit; i++) {
            cashInHtml += `
            <div class="row  mb-4">
                <div class="col-12">
                    <h3 class="fs-2">
                        R$ ${cashIn[i].value.toFixed(2)}
                    </h3>
                    <div class="container p-0">
                        <div class="row">
                            <div class="col-12 col-md-8">
                                <p>${cashIn[i].description}</p>
                            </div>
                    <div class="col-12 col-md-3 d-flex justify-content-end">
                            ${cashIn[i].date}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
        }
        document.getElementById("cash-in-list").innerHTML = cashInHtml;
    }

}

/**
 * Gera e exibe a lista de despesas (saídas) filtrando as transações
 * do usuário pelo tipo "0". Limita a exibição aos últimos 5 registros
 * e monta dinamicamente o HTML inserindo-o no elemento "cash-out-list".
 */
function getCashOut() {
    const transactions = data.transactions;

    const cashIn = transactions.filter((item) => item.type === "0");

    if (cashIn.length) {
        let cashInHtml = ``;
        let limit = 0;

        if (cashIn.length > 5) {
            limit = 5;
        } else {
            limit = cashIn.length;
        }

        for (let i = 0; i < limit; i++) {
            cashInHtml += `
            <div class="row  mb-4">
                <div class="col-12">
                    <h3 class="fs-2">
                        R$ ${cashIn[i].value.toFixed(2)}
                    </h3>
                    <div class="container p-0">
                        <div class="row">
                            <div class="col-12 col-md-8">
                                <p>${cashIn[i].description}</p>
                            </div>
                    <div class="col-12 col-md-3 d-flex justify-content-end">
                            ${cashIn[i].date}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
        }
        document.getElementById("cash-out-list").innerHTML = cashInHtml;
    }

}
/**
 * Busca o valor total levando em consideração receitas e despesas
 * exibindo dinamicamente o HTML inserindo-o no elemento "total".
 */
function getTotal() {
    const transactions = data.transactions;
    total = 0;

    transactions.forEach((item) => {
        if (item.type === "1") {
            total += item.value;
        } else {
            total -= item.value;
        }
    }) 

    document.getElementById("total").innerHTML = `R$ ${total.toFixed(2)}`;
}