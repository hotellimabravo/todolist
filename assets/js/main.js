function toDoList() {
	// Variáveis buscando os elementos do HTML
	const inputTarefa = document.querySelector('.input-tarefa');
	const btnTarefa = document.querySelector('.btn-tarefa');
	const tarefas = document.querySelector('.tarefas');

	btnTarefa.setAttribute('title', 'Adiciona a tarefa digitada');

	// Função que cria cada LI com os elementos das Tarefas
	// Para cada tarefa essa função cria um li
	function criaLi() {
		const li = document.createElement('li');
		return li;
	}

	//Função que pega o evento de apertar o botão enter keyCode = 13
	inputTarefa.addEventListener('keypress', function (e) {
		if (e.keyCode === 13) {
			if (!inputTarefa.value) return; // essa linha prevê quando o input não tiver dados não acontece nenhum evento ao clicar em Adicionar Tarefa.
			criaTarefa(inputTarefa.value);
		}
	});

	// Função que limpa o input a cada nova tarefa adicionada
	function limpaInput() {
		inputTarefa.value = '';
		inputTarefa.focus();
	}

	// Função que cria um botão excluir para cada li criado com a tarefa que o usuário quiser
	function criaBoataoApagar(li) {
		li.innerText += ' ';
		const botaoApagar = document.createElement('button');
		botaoApagar.innerText = 'Excluir';
		botaoApagar.setAttribute('class', 'excluir');
		botaoApagar.setAttribute('title', 'excluir tarefa inserida');
		li.appendChild(botaoApagar);
	}

	// Função que pega o texto do input (inputTarefa) e joga a li no html
	function criaTarefa(textoInput) {
		const li = criaLi();
		li.innerText = textoInput;
		tarefas.appendChild(li);
		limpaInput();
		criaBoataoApagar(li);
		salvarTarefas();
	}

	// Função que pega o evento de click no botão adicionar tarefa
	btnTarefa.addEventListener('click', function () {
		if (!inputTarefa.value) return; // essa linha prevê quando o input não tiver dados não acontece nenhum evento ao clicar em Adicionar Tarefa.
		criaTarefa(inputTarefa.value);
	});

	document.addEventListener('click', function (e) {
		const el = e.target;

		if (el.classList.contains('excluir')) {
			el.parentElement.remove();

			// Cria uma funcionalidade que ao excluir a tarefa abra um alert
			// e informe que a tarefa (nome da tarefa) foi excluida com sucesso
			let tarefaExcluida = el.parentElement.innerText;
			tarefaExcluida = tarefaExcluida.replace('Excluir', '').trim();
			// console.log(tarefaExcluida);
			alert(`Tarefa "${tarefaExcluida}" excluida com sucesso!`);
			salvarTarefas();
		}
	});

	function salvarTarefas() {
		const liTarefas = tarefas.querySelectorAll('li');
		const listaDeTarefas = [];

		for (let tarefa of liTarefas) {
			let tarefaTexto = tarefa.innerText;
			tarefaTexto = tarefaTexto.replace('Excluir', '').trim();
			listaDeTarefas.push(tarefaTexto);
		}
		const tarefasJSON = JSON.stringify(listaDeTarefas);
		localStorage.setItem('tarefas', tarefasJSON);
	}

	function adicionaTarefasSalvas() {
		const tarefas = localStorage.getItem('tarefas');
		const listaDeTarefas = JSON.parse(tarefas);
		console.log(tarefas);

		for (let tarefa of listaDeTarefas) {
			criaTarefa(tarefa);
		}
	}
	adicionaTarefasSalvas();
}

// Função da página
// Criei essa função paga pegar o hábito de colocar tudo em escopos diferentes
// Para as variáveis não terem perigo de conflitar valores e nomes.

toDoList();
