//O conceito mais básico de uma "tarefa"
interface Tarefa {
    descricao: string
    concluida: boolean
}

interface EstadoAplicacao {
    tarefas: Tarefa[]
    tarefaSelecionada: Tarefa | null
}
//Array dos estados das tarefas. No estado inicial, não há nada selecionado (estado null).
let estadoInicial: EstadoAplicacao = {
    tarefas:[
        {
            descricao: 'Tarefa concluída',
            concluida: true
        },
        {
            descricao: 'Tarefa pendente 1',
            concluida: false
        },
        {
            descricao: 'Tarefa pendente 2',
            concluida: false
        },
    ],
    tarefaSelecionada: null
}

//Ao selecionar um espaço com ou sem tarefa, para não haver nenhuma modificação dos elementos, 
//o estado "EstadoAplicacao" será apenas repetido (...estado) e a tarefa que será exibibida 
//será nula, se já tiver sido selecionada antes, era ser nula, se não, receberá uma
//nova tarefa (pendente 1 ou 2).
//O ": EstadoAplicacao" representa o retorno das funções
const selecionarTarefa = (estado: EstadoAplicacao, tarefa: Tarefa) : EstadoAplicacao => {
    return {
        ...estado,
        tarefaSelecionada: tarefa === estado.tarefaSelecionada ? null : tarefa
    }
}

//Função para alterar o domínio (DOM) e subfunções que irão renderizar uma nova lista
//a cada iteração.
const atualizarUI = () => {
    //Constante que destaca o SVG (Scalable Vectãosor Graphics) que irá ser alterada.
    const taskIconSvg = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24"
            fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF" />
            <path
                d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
                fill="#01080E" />
        </svg>
    `

    //Função que irá procurar no HTML pela classe (seletor) na qual tem a lista não-ordenada (ul) 
    //que contém as tarefas para "limpá-la" e inserir uma nova lista.
    const ulTarefas = document.querySelector('.app__sectio-task-list')
    const formAdicionarTarefa = document.querySelector<HTMLFormElement>('.app__form-add-task')
    const btnAdicionarTarefa = document.querySelector<HTMLButtonElement>('.app__button--add-task')

    if (!btnAdicionarTarefa) {
        throw Error("O elemento btnAdicionarTarefas não foi encontrado.")
    }

    btnAdicionarTarefa.onclick = () => {
        formAdicionarTarefa?.classList.toggle('hidden')
    }

    if (ulTarefas){
        ulTarefas.innerHTML = ''
    }
    
    //Função que irá renderizar uma nova lista, esta parte do código é a "função pura" na qual
    //não há alterações de estado e sim a criação de um novo.
    estadoInicial.tarefas.forEach(tarefa => {
        const li = document.createElement('li')
        li.classList.add('app__section-task-list-item')
        const svgIcon = document.createElement('svg')
        svgIcon.innerHTML = taskIconSvg

        const paragraph = document.createElement('p')
        paragraph.classList.add('app__section-task-list-item-description')
        paragraph.textContent = tarefa.descricao

        const button = document.createElement('button')
        button.classList.add('app_button-edit')
    
        const editIcon = document.createElement('img')
        editIcon.setAttribute('src', 'imagens/edit.png')
    
        button.appendChild(editIcon)

        if (tarefa.concluida) {
            button.setAttribute('disabled', 'true')
            li.classList.add('app__section-task-list-item-complete')
        }

        //Função que reune e renderiza a nova lista com os elementos textuais e gráficos.
        li.appendChild(svgIcon)
        li.appendChild(paragraph)
        li.appendChild(button)

        ulTarefas?.appendChild(li)
    })
}