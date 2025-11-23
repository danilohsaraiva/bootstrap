// Inicializa o modal de cadastro
const myModal = new bootstrap.Modal("#register-modal");

// Recupera informações de sessão
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

// Verifica se o usuário já está logado
checkLogged();

/**
 * Listener: Criação de nova conta
 * Valida senha, cria o objeto da conta e salva no localStorage.
 */
document.getElementById("create-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email-create-input").value;
    const password = document.getElementById("password-create-input").value;
    const validatePassword = document.getElementById("password-validate-input").value;

    if (password !== validatePassword) {
        alert("Senhas não combinam!");
        return;
    }

    saveAcount({
        login: email,
        password,
        transactions: []
    });

    alert("Conta Criada com Sucesso!");
    myModal.hide();
});

/**
 * Listener: Login no sistema
 * Valida credenciais e redireciona o usuário caso o login seja bem-sucedido.
 */
document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const checkSession = document.getElementById("session-check").checked;

    const account = getAccount(email);

    if (!account) {
        alert("Ops! Usuário/Senha inválido");
        return;
    }

    if (account.password !== password) {
        alert("Ops! Usuário/Senha inválido");
        return;
    }

    saveSession(email, checkSession);
    window.location.href = "home.html";
});

/**
 * Busca e retorna uma conta salva no localStorage.
 * 
 * @param {string} key - Email usado como chave no localStorage.
 * @returns {Object|string} Objeto da conta ou string vazia se não existir.
 */
function getAccount(key) {
    const account = localStorage.getItem(key);

    if (account) {
        return JSON.parse(account);
    }

    return "";
}

/**
 * Verifica se existe sessão ativa.
 * Caso exista, restaura o login e redireciona para home.html.
 * 
 * @returns {void}
 */
function checkLogged() {
    if (session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if (logged) {
        saveSession(logged, session);
        window.location.href = "home.html";
    }
}

/**
 * Salva os dados da conta no localStorage.
 *
 * @param {Object} data - Objeto contendo login, senha e transações.
 * @returns {void}
 */
function saveAcount(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}

/**
 * Salva o estado da sessão do usuário.
 * 
 * @param {string} data - Email do usuário logado.
 * @param {boolean} saveSession - Define se a sessão deve persistir após fechar o navegador.
 * @returns {void}
 */
function saveSession(data, saveSession) {
    if (saveSession) {
        // Mantém o login mesmo após fechar o navegador
        localStorage.setItem("session", data);
    }

    // Sessão válida apenas enquanto o navegador permanece aberto
    sessionStorage.setItem("logged", data);
}