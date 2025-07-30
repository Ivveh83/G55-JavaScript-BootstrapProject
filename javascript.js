const data = [
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

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("todoForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      validateAndSubmit();
    });
});

function validateAndSubmit() {
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const dueDate = document.getElementById("dueDate").value;
  const person = document.getElementById("selectPerson").value.trim();
  const attachments = document.getElementById("attachment").value.trim();

  if (
    !title ||
    !description ||
    !dueDate ||
    new Date(dueDate + "T00:00:00") < new Date()
  ) {
    if (!title) {
      document.getElementById("title").classList.add("is-invalid");
    } else {
      document.getElementById("title").classList.remove("is-invalid");
    }
    if (!description) {
      document.getElementById("description").classList.add("is-invalid");
    } else {
      document.getElementById("description").classList.remove("is-invalid");
    }
    if (!dueDate || new Date(dueDate + "T00:00:00") < new Date()) {
      if (!dueDate) {
        const dueDateInput = document.getElementById("dueDate");
        dueDateInput.setCustomValidity("Due date is required.");
        dueDateInput.reportValidity(); // Triggar visning av felmeddelande direkt
      } else {
        const dueDateInput = document.getElementById("dueDate");
        dueDateInput.setCustomValidity("Due date cannot be in the past.");
        dueDateInput.reportValidity();
      }
    } else {
      const dueDateInput = document.getElementById("dueDate");
      dueDateInput.setCustomValidity(""); // Nollställ tidigare felmeddelande
      dueDateInput.classList.remove("is-invalid");
    }
    return;
  }
  console.log("Registration successful");
  console.log(
    `Title: ${title}, Description: ${description}, Due Date: ${dueDate}, Assigned Person: ${person}, Attachments: ${attachments}`
  );

  let object = data.push({
    id: sequencer(), // Simple ID generation
    title: title,
    description: description,
    creationDate: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD format
    dueDate: dueDate,
    person: person || "Unassigned", // Default to 'Unassigned' if no person is selected
    attachments: attachments, // Empty array for attachments
  });

  console.log("New todo item added:", object);
  displayTodos(data);
  document.getElementById("todoForm").reset(); // Reset the form
  clearFile(); // Clear the file input
}

function displayTodos(data) {
  console.log("Displaying todos:", data);
  if (!document.getElementById("list-item")) {
    //Create todo list list item if it doesn't exist
    console.log("Creating new todo list");
    const listItem = document.createElement("div");
    listItem.id = "list-item";
    listItem.className = "list-item";
    for (const todo of data) {
      //Create a new card to hold the todo items
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
                    <i class="bi bi-paperclip me-1"></i> ${todo.attachments.length} attachments
                </span>
            </div>
        `;
      listItem.appendChild(card);
    }
    // Append the list item to the todo list container
    document.getElementById("todo-list").innerHTML = ""; // Clear existing content
    document.getElementById("todo-list").appendChild(listItem);
  } else {
    // If the list-item already exists, just update its content
    console.log("Updating existing todo list");
    const listItem = document.getElementById("list-item");
    listItem.innerHTML = ""; // Clear existing content
    for (const todo of data) {
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
                        <i class="bi bi-paperclip me-1"></i> ${todo.attachments.length} attachments
                    </span>
                </div>
            `;
      listItem.appendChild(card);
    }
    // Append the list item to the todo list container
    document.getElementById("todo-list").innerHTML = ""; // Clear existing content
    document.getElementById("todo-list").appendChild(listItem);
  }
}

/*
<!-- Todo list body -->
    <div id="card-body" class="card-body">
      <!-- Single Todo item -->
      <div class="border rounded p-3 mb-3">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <h6 id="card-title" class="mb-1">Example Todo</h6>
            <small id="card-description" class="text-muted">Description goes here</small>
          </div>
          

          <!-- Action buttons -->
          <div class="d-flex justify-content-end">
            <small id="card-creationDate" class="text-muted mx-3">Created: 2025-07-01</small>
          <button id="button-done" class="btn btn-sm btn-outline-success" title="Mark as Done">
            <i class="bi bi-check-lg"></i>
          </button>
          <button id="button-edit" class="btn btn-sm btn-outline-primary" title="Edit">
            <i class="bi bi-pencil"></i>
          </button>
          <button id="button-delete" class="btn btn-sm btn-outline-danger" title="Delete">
            <i class="bi bi-trash"></i>
          </button>
        </div>
        </div>

        <!-- Meta tags -->
        <div class="mt-2 d-flex flex-wrap gap-2">
          <span class="bg-white text-secondary">
            <i class="bi bi-calendar2-day me-1"></i> Due: 2025-07-10
          </span>
          <span class="badge bg-info ">
            <i class="bi bi-person-fill me-1"></i> John Doe
          </span>
          <span class="badge bg-secondary">
            <i class="bi bi-paperclip me-1"></i> 2 attachments
          </span>
        </div>
      </div>
    </div>
  </div>
  */
