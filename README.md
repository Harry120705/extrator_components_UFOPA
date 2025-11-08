# 🚀 Extrator de Históricos Acadêmicos - UFOPA

> Uma aplicação web simples para automatizar a extração de dados de Componentes Pendentes e Carga Horária de Históricos Escolares (PDF) da UFOPA.

Este projeto transforma um processo manual de análise de PDFs em uma aplicação web rápida e intuitiva. Usuários podem fazer o upload de múltiplos históricos em PDF, junto com um arquivo de controle (XLS), e receber relatórios consolidados em segundos.

---

## ✨ Funcionalidades

* **Interface Web:** Uma UI limpa e amigável, eliminando a necessidade de rodar scripts manualmente.
* **Upload Múltiplo:** Envie dezenas de arquivos PDF de uma só vez.
* **Upload de Controle:** Envie o arquivo `.xls` que contém os dados de percentual cumprido.
* **Extração Inteligente:** O backend lê os PDFs, identifica tabelas e textos, e extrai:
    * Componentes Curriculares Obrigatórios Pendentes (ignorando ENADE).
    * Disciplinas em que o aluno está "Matriculado".
    * Resumo de Carga Horária (Optativos, Complementares, Total Pendente).
* **Geração de Relatórios:** Cria e disponibiliza para download três arquivos:
    1.  `relatorio_componentes.xlsx` (Relatório completo formatado).
    2.  `relatorio_final.csv` (Relatório compacto em CSV).
    3.  `relatorio_historicos.txt` (Relatório simples em TXT).

---

## 🛠️ Tecnologias Utilizadas

Este projeto é dividido em duas partes principais:

* **Backend (API)**:
    * **Python 3**
    * **Flask** (Para o servidor web e API)
    * **pdfplumber** (Para extração de dados dos PDFs)
    * **xlrd** (Para leitura do arquivo `.xls` de percentuais)
    * **openpyxl** (Para a geração do relatório `.xlsx` final)

* **Frontend (UI)**:
    * **HTML5**
    * **CSS3**
    * **JavaScript (Fetch API)**

---

## ⚙️ Instalação e Configuração

Siga estes passos para rodar o projeto localmente:

1.  **Clone o repositório:**
    ```bash
    git clone [URL_DO_SEU_REPOSITÓRIO_GITHUB_AQUI]
    cd [NOME_DA_SUA_PASTA]
    ```

2.  **Crie e Ative um Ambiente Virtual** (Recomendado):
    ```bash
    # Criar
    python -m venv venv
    
    # Ativar (Windows)
    .\venv\Scripts\activate
    
    # Ativar (macOS/Linux)
    source venv/bin/activate
    ```

3.  **Crie o arquivo `requirements.txt`:**
    Crie um arquivo chamado `requirements.txt` na raiz do projeto e cole o seguinte conteúdo nele:
    ```
    Flask
    Flask-CORS
    pdfplumber
    xlrd
    openpyxl
    ```

4.  **Instale as dependências:**
    ```bash
    pip install -r requirements.txt
    ```

---

## 🏃 Como Rodar

Com tudo instalado, basta iniciar o servidor Flask:

1.  **Inicie o servidor:**
    ```bash
    python app.py
    ```

2.  **Acesse no Navegador:**
    Abra seu navegador e acesse:
    [**http://127.0.0.1:5000**](http://127.0.0.1:5000)

### Como Usar a Ferramenta

1.  **Passo 1:** Clique em "Escolher arquivos" e selecione todos os PDFs dos históricos que deseja processar.
2.  **Passo 2:** Clique em "Escolher arquivo" e selecione o arquivo `.xls` que contém os dados de percentual cumprido.
3.  **Passo 3:** Clique no botão verde "Iniciar Extração".
4.  **Passo 4:** Aguarde as mensagens de status. Quando a extração terminar, os links para download dos relatórios aparecerão abaixo.

---

## 👨‍💻 Autores

* **Backend (Lógica de Extração e API):** [Harry120705](https://github.com/Harry120705)
* **Frontend (Interface Web):** [Omatheus31](https://github.com/Omatheus31)