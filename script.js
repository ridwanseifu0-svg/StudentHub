const assignmentForm = document.getElementById("assignmentForm");
const assignmentInput = document.getElementById("assignmentInput");
const assignmentList = document.getElementById("assignmentList");

// 1. Load saved assignments when the page opens.
let assignments = JSON.parse(
  localStorage.getItem("studentHubAssignments") || "[]",
);

// 2. Display assignments on the page.
function renderAssignments() {
  assignmentList.innerHTML = "";

  assignments.forEach(function (assignment) {
    const listItem = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = assignment.completed;
    checkbox.setAttribute("aria-label", "Mark assignment as completed");

    const taskName = document.createElement("span");
    taskName.className = "task-name";
    taskName.textContent = assignment.name;

    if (assignment.completed) {
      taskName.classList.add("completed");
    }

    checkbox.addEventListener("change", function () {
      assignment.completed = checkbox.checked;
      saveAssignments();
      renderAssignments();
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-button";

    deleteButton.addEventListener("click", function () {
      assignments = assignments.filter(function (item) {
        return item.id !== assignment.id;
      });

      saveAssignments();
      renderAssignments();
    });

    listItem.append(checkbox, taskName, deleteButton);
    assignmentList.appendChild(listItem);
  });
}

// 3. Save the current assignments in the browser.
function saveAssignments() {
  localStorage.setItem("studentHubAssignments", JSON.stringify(assignments));
}

// 4. Add a new assignment.
assignmentForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const assignmentName = assignmentInput.value.trim();

  if (assignmentName === "") {
    return;
  }

  const newAssignment = {
    id: crypto.randomUUID(),
    name: assignmentName,
    completed: false,
  };

  assignments.push(newAssignment);

  saveAssignments();
  renderAssignments();

  assignmentInput.value = "";
  assignmentInput.focus();
});

// 5. Show previously saved assignments immediately.
renderAssignments();
