let data = [
  {
    id: 1,
    title: "Learn JavaScript",
    description: "Study the basics of JavaScript",
    creationDate: "2025-07-01",
    dueDate: "2025-08-01",
    person: "Kalle Anka",
    attachments: [],
  },
  {
    id: 2,
    title: "Build a web app",
    description: "Create a simple web application using JavaScript",
    creationDate: "2025-07-02",
    dueDate: "2025-09-01",
    person: "Kalle Anka",
    attachments: [],
  },
  {
    id: 3,
    title: "Deploy to production",
    description: "Deploy the web app to a live server",
    creationDate: "2025-07-03",
    dueDate: "2025-10-01",
    person: "Joakim von Anka",
    attachments: [],
  },
  {
    id: 4,
    title: "Learn Bootstrap",
    description: "Study the basics of Bootstrap",
    creationDate: "2025-07-04",
    dueDate: "2025-08-15",
    person: "Musse Pigg",
    attachments: [],
  },
  {
    id: 5,
    title: "Create a responsive layout",
    description: "Build a responsive layout using Bootstrap",
    creationDate: "2025-07-05",
    dueDate: "2025-09-15",
    person: "Unassigned",
    attachments: [],
  },
];

function clearFile() {
  document.getElementById("attachment").value = "";
}

function sequencer() {
  let n = 0;
  for (let i = 0; i < data.length; i++) {
    n = data[i].id > n ? data[i].id : n;
  }
  return n + 1;
}

document.addEventListener("DOMContentLoaded", () => {
  displayTodos(data);
});

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("todoForm").addEventListener("submit", (event) => {
    event.preventDefault();
    validateAndSubmit();
  });
});

document.addEventListener("click", (event) => {
  const deleteButton = event.target.closest("button[id^='button-delete-']"); //function closest finds the closest ancestor element that matches the selector including the element itself
  if (deleteButton) {
    console.log("Delete button clicked:", deleteButton.id);
    deleteTodo(event);
  }
  const editButton = event.target.closest("button[id^='button-edit-']");
  if (editButton) {
    console.log("Edit button clicked:", editButton.id);
    editTodo(event);
  }
});

function editTodo(event) {
  console.log("Starting editTodo function");
  const button = event.target.closest("button"); // Find the closest button element, works for both icon and button clicks
  const todoId = button.id.split("-")[2];
  console.log("Todo ID to edit:", parseInt(todoId));
  const todo = data.find((todo) => todo.id === parseInt(todoId)); //Find method returns the first element in the array that satisfies the provided testing function. If no values satisfy the testing function, undefined is returned.
  if (todo) {
    console.log("Todo found for editing:", todo);
    if (document.getElementById("title").value.trim() !== "") { // Check if title is not empty
      todo.title = document.getElementById("title").value.trim();
    }
    if (document.getElementById("description").value.trim() !== "") { // Check if description is not empty
      todo.description = document.getElementById("description").value.trim();
      console.log("Updated description:", todo.description);
    }
    if (document.getElementById("dueDate").value !== "") { // Check if due date is not empty
      todo.dueDate = document.getElementById("dueDate").value;
    }
    // Check if a person is selected and not the default options
    if (
      document.getElementById("selectPerson").value.trim() !== "" &&
      document.getElementById("selectPerson").value.trim() !== "Unassigned" &&
      document.getElementById("selectPerson").value.trim() !==
        "-- Select Person (Optional) --"
    ) {
      todo.person = 
        document.getElementById("selectPerson").value.trim() || "Unassigned"; // Get the selected person or default to "Unassigned"
    }
    // Handle attachments if needed
    if (document.getElementById("attachment").files.length > 0) {
      const attachments = document.getElementById("attachment").files;
      todo.attachments = Array.from(attachments).map((file) => file.name);
    }
    displayTodos(data); // Refresh the todo list to reflect changes
    document.getElementById("todoForm").reset(); // Reset the form
    clearFile(); // Clear the file input
  } else {
    console.error("Todo not found for editing:", todoId);
  }
}

function deleteTodo(event) {
  console.log("Starting deleteTodo function");
  const button = event.target.closest("button");
  const todoId = button.id.split("-")[2];
  console.log("Todo ID to delete:", parseInt(todoId));
  data = data.filter((todo) => todo.id !== parseInt(todoId));
  console.log("Updated data after deletion:", data);
  displayTodos(data);
}

function validateAndSubmit() {
  // Get references to input elements
  const titleInput = document.getElementById("title");
  const descriptionInput = document.getElementById("description");
  const dueDateInput = document.getElementById("dueDate");
  const personSelect = document.getElementById("selectPerson");
  const attachments = document.getElementById("attachment").files;

  // Get trimmed values from inputs
  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();
  const dueDate = dueDateInput.value;
  let person = personSelect.value.trim();

  // Get the form element
  const form = document.getElementById("todoForm");

  // Clear any previous custom validation messages
  titleInput.setCustomValidity("");
  descriptionInput.setCustomValidity("");
  dueDateInput.setCustomValidity("");

  // Custom validation for Title field
  if (!title) {
    titleInput.setCustomValidity("Title is required.");
    titleInput.classList.add("is-invalid"); // Add Bootstrap invalid class for styling
  } else {
    titleInput.classList.remove("is-invalid");
  }

  // Custom validation for Description field
  if (!description) {
    descriptionInput.setCustomValidity("Description is required.");
    descriptionInput.classList.add("is-invalid");
  } else {
    descriptionInput.classList.remove("is-invalid");
  }

  // Custom validation for Due Date field
  if (!dueDate) {
    dueDateInput.classList.add("is-invalid");
    dueDateInput.setCustomValidity("Due date is required.");
  } else if (new Date(dueDate + "T00:00:00") < new Date()) {
    dueDate
    dueDateInput.setCustomValidity("Due date cannot be in the past.");
  }else {
    dueDateInput.classList.remove("is-invalid");
  }

  // Check the overall form validity AFTER setting custom validity messages
  if (!form.checkValidity()) {
    form.reportValidity(); // Show validation messages and set focus on first invalid field
    return; // Stop the submission process since validation failed
  }

  // If no person selected, default to 'Unassigned'
  if (person === "-- Select Person (Optional) --") {
    person = "Unassigned";
  }

  // Create the new todo object and add it to the data array
  const newTodo = {
  id: sequencer(),
  title,
  description,
  creationDate: new Date().toISOString().split("T")[0],
  dueDate,
  person,
  attachments,
};

data.push(newTodo);

console.log("New todo item added:", newTodo);

  // Refresh the displayed todo list
  displayTodos(data);

  // Reset the form and clear file inputs
  document.getElementById("todoForm").reset();
  clearFile();
}

function createTodoCard(todo) {
  const card = document.createElement("div");
  card.id = `todo-${todo.id}`;
  card.className = "border rounded p-3 mb-3";
  card.innerHTML = `
    <div class="d-flex justify-content-between align-items-center">
      <div>
        <h6 id="card-title-${todo.id}" class="mb-1">${todo.title}</h6>
        <small id="card-description-${todo.id}" class="text-muted">${todo.description}</small>
      </div>
      <div class="d-flex justify-content-end">
        <small id="card-creationDate-${todo.id}" class="text-muted mx-3">Created: ${todo.creationDate}</small>
        <button id="button-done-${todo.id}" class="btn btn-sm btn-outline-success" title="Mark as Done">
          <i class="bi bi-check-lg"></i>
        </button>
        <button id="button-edit-${todo.id}" class="btn btn-sm btn-outline-primary" title="Edit">
          <i class="bi bi-pencil"></i>
        </button>
        <button id="button-delete-${todo.id}" class="btn btn-sm btn-outline-danger" title="Delete">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    </div>
    <div class="mt-2 d-flex flex-wrap gap-2">
      <span class="bg-white text-secondary">
        <i class="bi bi-calendar2-day me-1"></i> Due: ${todo.dueDate}
      </span>
      <span class="badge bg-info">
        <i class="bi bi-person-fill me-1"></i> ${todo.person}
      </span>
      <span class="badge bg-secondary">
        <i class="bi bi-paperclip me-1"></i> ${todo.attachments.length} attachment(s)
      </span>
    </div>
  `;
  return card;
}

function displayTodos(data) {
  console.log("Displaying todos:", data);

  let listItem = document.getElementById("list-item");

  if (!listItem) {
    console.log("Creating new todo list");
    listItem = document.createElement("div");
    listItem.id = "list-item";
    listItem.className = "list-item";
  } else {
    console.log("Updating existing todo list");
    listItem.innerHTML = "";
  }

  for (const todo of data) {
    const card = createTodoCard(todo);
    listItem.appendChild(card);
  }

  const todoList = document.getElementById("todo-list");
  todoList.innerHTML = ""; // Clear existing content
  todoList.appendChild(listItem);
}