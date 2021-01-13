const form = document.getElementById("form");
const input = document.getElementById("input");
const tarefasUL = document.getElementById("tarefas");

const afazeres = JSON.parse(localStorage.getItem("tarefas"));

if (afazeres) {
    afazeres.forEach((fazer) => {
        addicionarTarefa(fazer);
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    addicionarTarefa();
});

function addicionarTarefa(fazer) {
    let fazerTexto = input.value;

    if (fazer) {
        fazerTexto = fazer.text;
    }

    if (fazerTexto) {
        const fazerEl = document.createElement("li");
        if (fazer && fazer.completed) {
            fazerEl.classList.add("completed");
        }

        fazerEl.innerText = fazerTexto;

        fazerEl.addEventListener("click", () => {
            fazerEl.classList.toggle("completed");

            atulizarLS();
        });

        fazerEl.addEventListener("contextmenu", (e) => {
            e.preventDefault();

            fazerEl.remove();

            atulizarLS();
        });

        tarefasUL.appendChild(fazerEl);

        input.value = "";

        atulizarLS();
    }
}

function atulizarLS() {
    const tarefasEl = document.querySelectorAll("li");

    const tarefas = [];

    tarefasEl.forEach((tarefasEl) => {
        tarefas.push({
            text: tarefasEl.innerText,
            completed: tarefasEl.classList.contains("completed"),
        });
    });

    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}