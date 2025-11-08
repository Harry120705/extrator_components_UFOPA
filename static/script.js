// Obtém referências aos elementos
const messagesTextArea = document.getElementById('messages');
const extractButton = document.getElementById('extractButton');
const pdfFilesInput = document.getElementById('pdfFiles');
const excelFileInput = document.getElementById('excelFile');
const resultsArea = document.getElementById('resultsArea');
const downloadLinksDiv = document.getElementById('downloadLinks');

function updateMessages(message) {
    messagesTextArea.value += message + '\n';
    messagesTextArea.scrollTop = messagesTextArea.scrollHeight; // Scroll automático
}

function setProcessingState(isProcessing) {
    if (isProcessing) {
        extractButton.disabled = true;
        extractButton.textContent = 'Processando...';
        // Limpa resultados anteriores
        resultsArea.style.display = 'none';
        downloadLinksDiv.innerHTML = '';
    } else {
        extractButton.disabled = false;
        extractButton.textContent = 'Iniciar Extração';
    }
}

async function startExtraction() {
    const pdfFiles = pdfFilesInput.files;
    const excelFile = excelFileInput.files[0];

    // Validação de entrada
    if (pdfFiles.length === 0) {
        updateMessages("ERRO: Por favor, selecione os arquivos PDF.");
        return;
    }
    if (!excelFile) {
        updateMessages("ERRO: Por favor, selecione o arquivo Excel de percentuais.");
        return;
    }

    setProcessingState(true);
    updateMessages("Iniciando upload e extração...");

    const formData = new FormData();
    for (let i = 0; i < pdfFiles.length; i++) {
        formData.append('pdf_files', pdfFiles[i]);
    }
    formData.append('excel_file', excelFile);

    try {
        // Envia os arquivos para o endpoint /upload_and_extract no backend Flask
        const response = await fetch('/upload_and_extract', {
            method: 'POST',
            body: formData 
        });

        const result = await response.json();

        if (!response.ok) {
            // Se o servidor retornar um erro (ex: 400, 500)
            throw new Error(result.message || `Erro do servidor: ${response.status}`);
        }

        // Se o backend processar com sucesso (status "success")
        updateMessages("Extração concluída com sucesso!");
        updateMessages(result.message);

        // Mostra a área de resultados e cria os links de download
        if (result.download_links) {
            resultsArea.style.display = 'block';
            
            if (result.download_links.excel_report) {
                const link = document.createElement('a');
                link.href = result.download_links.excel_report;
                link.textContent = 'Baixar Relatório Excel (.xlsx)';
                link.target = '_blank'; // Abre em nova aba
                downloadLinksDiv.appendChild(link);
            }
            if (result.download_links.csv_report) {
                const link = document.createElement('a');
                link.href = result.download_links.csv_report;
                link.textContent = 'Baixar Relatório CSV (.csv)';
                link.target = '_blank';
                downloadLinksDiv.appendChild(link);
            }
        }

    } catch (error) {
        // Pega erros de rede ou erros retornados pelo backend
        updateMessages(`FALHA NA OPERAÇÃO: ${error.message}`);
        console.error("Erro completo:", error);
    } finally {
        // Reabilita o botão, independentemente do resultado
        setProcessingState(false);
    }
}

// Inicializa a área de mensagens
document.addEventListener('DOMContentLoaded', () => {
    updateMessages("Pronto para começar. Selecione os arquivos e clique em 'Iniciar Extração'.");
});