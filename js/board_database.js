"use strict";

/* BOARD DATABASE */

//const BASE_URL = "https://join-6838e-default-rtdb.europe-west1.firebasedatabase.app/";

async function fetchTasksData() {
  tasks = [];
  subtasks = [];

  let tasksResponse = await fetch(BASE_URL + "/tasks" + ".json");
  let tasksToJson = await tasksResponse.json();

  if (tasksToJson) {
    const taskKeys = Object.keys(tasksToJson);

    taskKeys.forEach((key) => {
      const task = {
        id: key,
        ...tasksToJson[key],
      };

      tasks.push(task);

      /* if (task.assignedTo && !assignees.includes(task.assignedTo)) {
                assignees.push(task.assignedTo);
            } */

      if (task.assignedTo) {
        assignees.push(...task.assignedTo);
      }
    });
    renderTasks();
  }

  console.log("Tasks nach Fetch:", tasks);
  console.log("Assigned Users:", assignees);
  console.log("Subtasks:", subtasks);
}

async function fetchContactsData() {
  contacts = [];

  let contactsResponse = await fetch(BASE_URL + "/contacts" + ".json");
  let contactsToJson = await contactsResponse.json();

  if (contactsToJson) {
    const contactKeys = Object.keys(contactsToJson);

    contactKeys.forEach((key) => {
      contacts.push({
        id: key,
        ...contactsToJson[key],
      });
    });
  }

  console.log("contacts nach fetch:", contacts);

  renderTasks();
}

async function deleteTaskData(taskId) {
  try {
    let taskResponse = await fetch(BASE_URL + "/tasks/" + taskId + ".json", {
      method: "DELETE",
    });
    let deletedTask = await taskResponse.json();

    console.log("Task erfolgreich gelöscht:", taskId);
    await fetchTasksData();
    closePopUps();
    return deletedTask;
  } catch (error) {
    console.error("Fehler beim Löschen des Tasks:", error);
  }
  renderTasks();
}

async function updateTaskInFirebase(task) {
  const taskId = task.id;
  const url = `${BASE_URL}/tasks/${taskId}.json`;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: task.id,
        title: task.title,
        description: task.description,
        category: task.category,
        assignedTo: task.assignedTo,
        dueDate: task.dueDate,
        priority: task.priority,
        status: task.status,
        name: task.name,
        initials: task.initials,
        subtasks: task.subtasks,
      }),
    });

    if (!response.ok) {
      throw new Error("Fehler beim Aktualisieren der Aufgabe in Firebase");
    }

    console.log("Aufgabe erfolgreich aktualisiert in Firebase:", task);
  } catch (error) {
    console.error("Fehler beim Aktualisieren der Aufgabe:", error);
  }
  /* await fetchTasksData(); */
}

/* async function updateTaskInFirebase(task) {
    const taskId = task.id;
    const url = `${BASE_URL}/tasks/${taskId}.json`;
 
    try {
        // Übergebe das gesamte Task-Objekt, damit alle Eigenschaften, einschließlich subtasks, erhalten bleiben
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)  // Übergibt das gesamte `task` Objekt
        });
 
        if (!response.ok) {
            throw new Error('Fehler beim Aktualisieren der Aufgabe in Firebase');
        }
 
        console.log('Aufgabe erfolgreich aktualisiert in Firebase:', task);
    } catch (error) {
        console.error('Fehler beim Aktualisieren der Aufgabe:', error);
    }
} */

// GPT
/*   async function fetchTasksData() {
      tasks = [];
      subtasks = [];
  
      let tasksResponse = await fetch(BASE_URL + "/tasks.json");
      let tasksToJson = await tasksResponse.json();
  
      if (tasksToJson) {
          const taskKeys = Object.keys(tasksToJson);
  
          taskKeys.forEach((key) => {
              const task = {
                  id: key,
                  ...tasksToJson[key]
              };
  
              // Sicherstellen, dass `subtasks` ein Array ist
              if (!Array.isArray(task.subtasks)) {
                  task.subtasks = Object.values(task.subtasks || {});
              }
  
              tasks.push(task);
  
              if (task.assignedTo && !assignees.includes(task.assignedTo)) {
                  assignees.push(task.assignedTo);
              }
          });
          renderTasks();
      }
  
      console.log("Tasks nach Fetch:", tasks);
      console.log("Assigned Users:", assignees);
      console.log("Subtasks:", subtasks);
  } */
