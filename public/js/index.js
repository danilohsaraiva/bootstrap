const myModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged")
const session = localStorage.getItem("session")

checkLogged();
//CRIAR CONTA
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
    alert("Conta Criada com Sucesso!")
    myModal.hide();
})

//LOGAR NO SISTEMA
document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const checkSession = document.getElementById("session-check").checked;

    const account = getAccount(email);

    if (!account) {
        alert("Ops! Usuário/Senha inválido");
        return;
    } else {
        if (account.password !== password) {
            alert("Ops! Usuário/Senha inválido");
            return;
        }

        saveSession(email, checkSession);

        window.location.href = "home.html";
    }



});
//FUNÇÕES

// BUSCA CONTA
function getAccount(key) {
    const account = localStorage.getItem(key);
    console.log(account.email)

    if (account) {
        return JSON.parse(localStorage.getItem(key));
    }

    return "";
}

//CHECAR LOG
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

// SALVAR CONTA
function saveAcount(data) {
    //Salvar no LocalStorage
    localStorage.setItem(data.login, JSON.stringify(data));
}

//SALVAR SESSÃO
function saveSession(data, saveSession) {
    if (saveSession) {
        //Salva mesmo ápos fechar a página.
        localStorage.setItem("session", data);
    }
    //Perde a informação quando fecha a página.
    sessionStorage.setItem("logged", data)
}