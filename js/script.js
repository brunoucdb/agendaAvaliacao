document.addEventListener('DOMContentLoaded', function () {
    const addMateriaBtn = document.getElementById('add-materia-btn');
    const newMateriaFormContainer = document.getElementById('new-materia-form-container');
    const newMateriaForm = document.getElementById('new-materia-form');
    const materiasContainer = document.getElementById('materias-container');

    // Alternar exibição do formulário de nova matéria
    addMateriaBtn.addEventListener('click', function () {
        newMateriaFormContainer.style.display = newMateriaFormContainer.style.display === 'none' ? 'block' : 'none';
    });

    // Adicionar nova matéria
    newMateriaForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const materiaNome = document.getElementById('materia-nome').value;

        if (materiaNome.trim() !== '') {
            const materiaContainer = document.createElement('div');
            materiaContainer.className = 'materia-container';

            // Adicionar cabeçalho da matéria
            const materiaHeader = document.createElement('div');
            materiaHeader.className = 'materia-header';
            materiaHeader.innerHTML = `
                <span>Matéria: ${materiaNome}</span>
                <button class="toggle-form-btn">Criar Data de Avaliação</button>
                <button class="toggle-list-btn">Listar Avaliações</button>
            `;
            materiaContainer.appendChild(materiaHeader);

            // Adicionar container para avaliações
            const avaliacoesContainer = document.createElement('div');
            avaliacoesContainer.className = 'avaliacoes';
            materiaContainer.appendChild(avaliacoesContainer);

            // Adicionar formulário para avaliações
            const formContainer = document.createElement('div');
            formContainer.className = 'form-container';
            formContainer.innerHTML = `
                <form class="avaliacao-form">
                    <label for="nome-avaliacao">Nome da Avaliação:</label>
                    <input type="text" class="nome-avaliacao" name="nome-avaliacao" placeholder="Nome da avaliação">

                    <label for="data">Data:</label>
                    <input type="date" class="data" name="data">

                    <label for="descricao">Descrição:</label>
                    <textarea class="descricao" name="descricao" rows="4" cols="50" placeholder="Descrição do conteúdo da avaliação"></textarea>

                    <button type="submit">Salvar</button>
                </form>
            `;
            materiaContainer.appendChild(formContainer);

            // Adicionar a nova matéria ao container
            materiasContainer.appendChild(materiaContainer);

            // Ocultar o formulário de nova matéria
            newMateriaFormContainer.style.display = 'none';
            newMateriaForm.reset();

            // Lógica para alternar o formulário de avaliação e listagem
            const toggleFormBtn = materiaContainer.querySelector('.toggle-form-btn');
            const toggleListBtn = materiaContainer.querySelector('.toggle-list-btn');

            // Inicialmente, o formulário de avaliação está oculto
            formContainer.style.display = 'none';
            avaliacoesContainer.style.display = 'flex';

            toggleFormBtn.addEventListener('click', function () {
                formContainer.style.display = formContainer.style.display === 'none' ? 'block' : 'none';
                avaliacoesContainer.style.display = 'none'; // Oculta as avaliações quando o formulário é exibido
            });

            toggleListBtn.addEventListener('click', function () {
                avaliacoesContainer.style.display = avaliacoesContainer.style.display === 'none' ? 'flex' : 'none';
                formContainer.style.display = 'none'; // Oculta o formulário quando a lista é exibida
            });

            // Lógica para salvar e exibir a avaliação
            formContainer.querySelector('form').addEventListener('submit', function (event) {
                event.preventDefault();
                const nomeAvaliacao = formContainer.querySelector('.nome-avaliacao').value;
                const data = formContainer.querySelector('.data').value;
                const descricao = formContainer.querySelector('.descricao').value;

                if (nomeAvaliacao && data && descricao) {
                    const avaliacaoDiv = document.createElement('div');
                    avaliacaoDiv.className = 'calendario-dia';
                    avaliacaoDiv.innerHTML = `
                        Avaliação: ${nomeAvaliacao} - Data: ${new Date(data).toLocaleDateString('pt-BR')} - ${descricao}
                        <button class="delete-avaliacao-btn">Excluir</button>
                    `;
                    avaliacoesContainer.appendChild(avaliacaoDiv);

                    // Limpar o formulário após salvar
                    formContainer.querySelector('form').reset();
                    formContainer.style.display = 'none';
                    avaliacoesContainer.style.display = 'flex'; // Exibir avaliações após adicionar uma

                    // Adicionar evento de clique para excluir a avaliação
                    avaliacaoDiv.querySelector('.delete-avaliacao-btn').addEventListener('click', function () {
                        avaliacoesContainer.removeChild(avaliacaoDiv);
                    });
                }
            });
        }
    });
});

// mudar tema do navegador
function toggleTheme() {
    const body = document.body;
    const themeButton = document.querySelector('.toggle-theme-btn');

    if (body.classList.contains('light-mode')) {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        themeButton.textContent = 'Modo Claro';
    } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        themeButton.textContent = 'Modo Escuro';
    }
}
