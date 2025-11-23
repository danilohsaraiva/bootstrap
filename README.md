# CODAI 2.0 – Aplicação Web | GrowDev

Este repositório contém o projeto desenvolvido como requisito para o processo seletivo CODAI 2.0, disponibilizado pela GrowDev. O objetivo é demonstrar habilidades práticas em HTML, Bootstrap e JavaScript, incluindo manipulação de dados no navegador e controle de fluxo entre telas.

## 🚀 Tecnologias Utilizadas

- **HTML5**
- **CSS3** (com estilização via Bootstrap 5)
- **JavaScript (ES6)**
- **localStorage** e **sessionStorage** para armazenamento
- Controle de interface e navegação entre páginas

## 📌 Sobre o Projeto

O sistema desenvolvido é uma aplicação web simples, intuitiva e totalmente funcional, que simula uma área de login e uma área interna para visualização e cadastro de transações.

### Funcionalidades Principais

#### Tela de Login
- Validação de email e senha
- Armazenamento de sessão via sessionStorage
- Opção de "manter logado" usando localStorage

#### Fluxo de Navegação
- `index.html` → Tela de Login
- `home.html` → Dashboard inicial
- `transactions.html` → Gerenciamento de lançamentos

#### Gerenciamento de Transações
- Adicionar novas entradas e saídas financeiras
- Formulário em modal utilizando Bootstrap
- Armazenamento dos dados no localStorage
- Controle de categoria (Entrada/Saída)
- Listagem dinâmica a partir do array armazenado

## 🗂️ Estrutura do Projeto


```
/bootstrap
│
├── index.html
├── home.html
├── transactions.html
│
├── /css
│   └── styles.css
│
├── /js
│   ├── index.js
│   ├── home.js
│   └── transactions.js
│
└── README.md
```

## ▶️ Como Executar o Projeto

1. Baixe ou clone o repositório
2. Abra o arquivo **index.html** no navegador
3. Realize login para navegar entre as telas

---

## 📚 Aprendizados

Durante o desenvolvimento deste projeto, foram reforçados os seguintes conceitos:

- Manipulação de DOM com JavaScript
- Utilização do **Bootstrap** para estilização ágil
- Armazenamento local com localStorage e sessionStorage
- Boas práticas na organização de código e estrutura de arquivos
- Lógica para filtragem, inclusão e leitura de dados

---

## 🧑‍💻 Desenvolvido por  
**Danilo Saraiva**

