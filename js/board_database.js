"use strict";

/* BOARD DATABASE */

/**
 * Fetches task data from the Firebase database, parses it, and populates the global `tasks` and `assignees` arrays. Then it calls `renderTasks()` to update the UI.
 * @async
 */
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
      if (task.assignedTo) {
        assignees.push(...task.assignedTo);
      }
    });

    renderTasks();
  }

  /* console.log("Tasks nach Fetch:", tasks);
  console.log("Assigned Users:", assignees);
  console.log("Subtasks:", subtasks); */
}

/**
 * Fetches contact data from the Firebase database, parses it, and populates the global `contacts` array. Then it calls `renderTasks()` to update the UI.
 * @async
 */
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
  /* console.log("contacts nach fetch:", contacts); */

  renderTasks();
}

/**
 * Deletes a task from the Firebase database by its `taskId`, then refreshes the task list and closes any open pop-ups.
 * @param {string} taskId - The ID of the task to be deleted.
 * @async
 * @returns {Object} - The response from the Firebase API after deleting the task.
 */
async function deleteTaskData(taskId) {
  try {
    let taskResponse = await fetch(BASE_URL + "/tasks/" + taskId + ".json", {
      method: "DELETE",
    });
    let deletedTask = await taskResponse.json();

    /* console.log("Task erfolgreich gelöscht:", taskId); */
    await fetchTasksData();
    closePopUps();
    return deletedTask;
  } catch (error) {
    console.error("Fehler beim Löschen des Tasks:", error);
  }
  renderTasks();
}

/**
 * Updates a task's data in Firebase, including its title, description, category, assignees, due date, priority, status, and subtasks.
 * @param {Object} task - The task object to be updated.
 * @param {string} task.id - The unique ID of the task.
 * @param {string} task.title - The title of the task.
 * @param {string} task.description - The description of the task.
 * @param {string} task.category - The category of the task.
 * @param {Array} task.assignedTo - An array of users assigned to the task.
 * @param {string} task.dueDate - The due date of the task.
 * @param {string} task.priority - The priority of the task.
 * @param {string} task.status - The current status of the task.
 * @param {string} task.name - The name of the task.
 * @param {string} task.initials - The initials of the task owner.
 * @param {Array} task.subtasks - An array of subtasks related to the main task.
 * @async
 */
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
    /* console.log("Aufgabe erfolgreich aktualisiert in Firebase:", task); */
  } catch (error) {
    console.error("Fehler beim Aktualisieren des Tasks:", error);
  }
}