/**
 * Inicializa o modal responsável por cadastrar novas transações.
 */
const myModal = new bootstrap.Modal("#transaction-modal");

/**
 * Recupera informações de sessão do usuário.
 */
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

/**
 * Estrutura base dos dados carregados para o usuário logado.
 */
let data = {
    transactions: []
};

/**
 * Listener: Botão de logout
 * Após clicar, remove sessão e redireciona o usuário para index.html.
 */
document.getElementById("button-logout").addEventListener("click", logout);

/**
 * Listener: Cadastro de nova transação
 * Captura os valores do formulário, adiciona ao array de transações,
 * salva no localStorage e atualiza a tabela de transações.
 */
document.getElementById("transaction-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const value = parseFloat(document.getElementById("value-input").value);
    const description = document.getElementById("description-input").value;
    const date = document.getElementById("date-input").value;
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

    getAllTransactions();

    alert("Lançamento adicionado com Sucesso!");
});

/**
 * Executa a verificação inicial da sessão do usuário.
 * Caso não esteja logado, redireciona para index.html.
 */
checkLogged();

/**
 * Realiza logout removendo dados do sessionStorage e localStorage
 * e redireciona para a página inicial.
 *
 * @returns {void}
 */
function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");
    window.location.href = "index.html";
}

/**
 * Valida se o usuário está logado.
 * Se houver sessão persistida, restaura.
 * Carrega dados do usuário logado e exibe suas transações.
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

    getAllTransactions();
}

/**
 * Salva no localStorage todas as informações do usuário logado,
 * incluindo seu array de transações.
 *
 * @param {Object} data - Objeto contendo login e transações.
 * @returns {void}
 */
function saveData(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}

/**
 * Carrega todas as transações e monta dinamicamente as linhas da tabela,
 * exibindo data, valor, tipo (Entrada/Saída) e descrição.
 *
 * @returns {void}
 */
function getAllTransactions() {
    const transactions = data.transactions;
    let transactionsHtml = ``;

    if (transactions.length) {
        transactions.forEach((item) => {
            let type = item.type === "0" ? "Saída" : "Entrada";

            transactionsHtml += `
                <tr>
                    <th scope="row">${item.date}</th>
                    <td>${item.value.toFixed(2)}</td>
                    <td>${type}</td>
                    <td>${item.description}</td>
                </tr>
            `;
        });

        document.getElementById("transactions-list").innerHTML = transactionsHtml;
    }
}