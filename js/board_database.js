'use strict';

/* BOARD DATABASE */


const BASE_URL =
    "https://join-6838e-default-rtdb.europe-west1.firebasedatabase.app/";

let tasks = [];
let subtasks = [];
let contacts = [];


async function fetchTasksData() {
    tasks = [];

    let tasksResponse = await fetch(BASE_URL + "/tasks" + ".json");
    let tasksToJson = await tasksResponse.json();

    if (tasksToJson) {
        const taskKeys = Object.keys(tasksToJson);

        taskKeys.forEach((key) => {
            tasks.push({
                id: key,
                ...tasksToJson[key]
            });
        });
    }

    console.log("tasks nach fetch:", tasks);
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
                ...contactsToJson[key]
            });
        });
    }

    console.log("contacts nach fetch:", contacts);
}


async function updateTaskInFirebase(task) {
    const taskId = task.id;
    const url = `${BASE_URL}/tasks/${taskId}.json`;

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: task.id,
                title: task.title,
                description: task.description,
                category: task.category,
                assignedTo: task.assignedTo,
                dueDate: task.dueDate,
                priority: task.priority,
                subtasks: task.subtasks,
                /* status:task.status */
            })
        });

        if (!response.ok) {
            throw new Error('Fehler beim Aktualisieren der Aufgabe in Firebase');
        }

        console.log('Aufgabe erfolgreich aktualisiert in Firebase:', task);
    } catch (error) {
        console.error('Fehler beim Aktualisieren der Aufgabe:', error);
    }
}