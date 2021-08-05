const addBtn = document.getElementById("add");

const addNewNote = (notesText = "") => {
  const note = document.createElement("div");
  note.classList.add("notes");

  note.innerHTML = `
    <div class="tools">
      <button class="edit"><i class="fas fa-edit"></i></button>
      <button class="delete"><i class="fas fa-trash"></i></button>
    </div>
    <div class="main ${notesText ? "" : "hidden"}"></div>
    <textarea class="${notesText ? "hidden" : ""}"></textarea>
  `;

  const editBtn = note.querySelector(".edit");
  const deleteBtn = note.querySelector(".delete");
  const main = note.querySelector(".main");
  const textArea = note.querySelector("textarea");
  textArea.value = notesText;
  main.innerHTML = marked(notesText);

  editBtn.addEventListener("click", () => {
    main.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });

  deleteBtn.addEventListener("click", () => {
    note.remove();
    updateLS();
  });

  textArea.addEventListener("input", (e) => {
    const { value } = e.target;

    main.innerHTML = marked(value);
    updateLS();
  });

  document.body.appendChild(note);
};

const updateLS = () => {
  const notesText = document.querySelectorAll("textarea");

  const notes = [];
  notesText.forEach((note) => {
    notes.push(note.value);
  });

  localStorage.setItem("notes", JSON.stringify(notes));
};

const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
  notes.forEach((note) => {
    addNewNote(note);
  });
}

addBtn.addEventListener("click", () => {
  addNewNote();
});
