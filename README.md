<p align="center">
    <picture>
       <source media="(prefers-color-scheme: dark)" srcset="utils/logo/DarkLogoRounded.png">
        <img alt="Logo da EcoCharge" src="uils/logo/LogoRounded.png" width="300">
    </picture>
</p>

# ⚡ EcoCharge

<details open>
    <summary><h3><strong>📑 Sumário</strong></h3>
        <ol>
            <li><a href="#sobre-o-projeto">Sobre o Projeto</a></li>
            <li><a href="#links">Links Úteis</a></li>
            <li><a href="#equipe">Equipe</a></li>
            <li><a href="#instalacao">Instalação</a></li>
            <li><a href="#requisitos">Requisitos do Projeto de Mobile</a></li>
            <li><a href="#entrega">Entrega</a></li>
        </ol>
    </summary>
</details>

<h2 id="sobre-o-projeto"> 📱 Sobre o Projeto </h2>

**EcoCharge** é um projeto de aplicativo de transporte sustentável desenvolvido por estudantes da **FIAP** como parte da Global Solution. Este aplicativo é voltado para promover o uso de veículos elétricos (VEs) ao facilitar o acesso a pontos de carregamento e otimizar o planejamento de viagens. Nossa equipe de cinco integrantes está comprometida em criar uma experiência prática e intuitiva para motoristas de VEs, contribuindo com um futuro mais sustentável.

<h2 id="links">🔗 Links Úteis</h2>

- [Organização no GitHub](https://github.com/GSEcoCharge)
- [Repositório no GitHub](https://github.com/leonardo-bragatti/2024-tdsa-global-solution-ecocharge)
- [Vídeo no YouTube](https://youtu.be/SwBHRGw0KFw)

<h2 id="equipe"> 📜 Equipe </h2>

| Integrante                       | RM     | Turma |
| -------------------------------- | ------ | ----- |
| Augusto Barcelos Barros          | 98078  | 2TDSS |
| Izabelly De Oliveira Menezes     | 551423 | 2TDSA |
| Lucas Pinheiro de Melo           | 97707  | 2TDSS |
| Marcos Henrique Garrido da Silva | 99578  | 2TDSA |
| Mel Maia Rodrigues               | 98266  | 2TDSA |

<h2 id="tecnologias">🛠️ Tecnologias Utilizadas</h2>

- Mobile: [React Native](https://reactnative.dev/) e [Expo](https://docs.expo.dev/)
- Backend: [Firebase Authentication](https://firebase.google.com/docs/auth?hl=pt-br) e [Cloud Firestore](https://firebase.google.com/docs/firestore)
- API de Integração: [Google Places API (New)](https://developers.google.com/maps/documentation/places/web-service/op-overview)

<h2 id="instalacao">🚀 Instalação</h2>

1. Clone o repositório:

   ```sh
   git clone https://github.com/seu-usuario/eco-charge.git
   cd eco-charge
   ```

2. Instale as dependências:

   ```sh
   npm install
   ```

3. Configure as variáveis de ambiente no arquivo .env chamando de EXPO_PUBLIC_GOOGLE_PLACES_API_KEY a chave de API do Google Places. Para obter a chave de API, siga as instruções em https://developers.google.com/maps/gmp-get-started#enable-api-sdk

4. Inicie o aplicativo:
   ```sh
   npm start
   ```

<h2 id="requisitos">📋 Requisitos do Projeto de Mobile</h2>

### Funcionalidades do Aplicativo

- [x] **Tela principal com menu ou navegação** (10 Pontos)
- [x] **Tela para inserção de dados** (10 Pontos)
- [x] **Tela para listagem dos dados acima** (10 Pontos)
- [x] **Tela para edição da informação acima** (10 Pontos)
- [x] **Opção de exclusão dos dados (lógica ou física)** (10 Pontos)
- [x] **Armazenamento de dados:**
  - Pode ser usado o Firebase **ou** uma API desenvolvida no backend das disciplinas de JAVA/.NET (10 Pontos)
- [x] **Integração de dados:**
  - Caso opte pelo Firebase, desenvolva uma integração com uma API no backend (JAVA/.NET).
  - Caso opte por uma API para CRUD, realize a integração com o Firebase.  
    _(A integração deve fazer sentido com o projeto)_ (10 Pontos)
- [x] **Tela de login integrada ao Firebase** (10 Pontos)

### Entregáveis Adicionais

- [x] **Gravação de vídeo demonstrando todas as funcionalidades do aplicativo** (20 Pontos)
- [x] **Entrega do código compactado, link para o repositório GitHub e link do vídeo**

---

<h2 id="entrega">📦 Entrega</h2>

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/JCD84hr8)
