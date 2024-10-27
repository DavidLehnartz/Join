'use strict';

/* DRAG AND DROP */


let draggedTaskId;


function startDragging(taskId) {
    draggedTaskId = taskId;
    console.log("Task ID zum Ziehen gesetzt:", draggedTaskId);
}


function allowDrop(event) {
    event.preventDefault();
}


async function updateTaskInDatabase(task) {
    await fetch(`${BASE_URL}/tasks/${task.id}.json`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task)
    });
}


async function drop(event, targetColumn) {
    event.preventDefault();

    let task = tasks.find(task => task.id === draggedTaskId);
    console.log("Aufgabe gefunden:", task);
    if (task) {
        task.status = targetColumn;

        await updateTaskInDatabase(task);

        renderTasks();
    }
    console.error("Aufgabe mit ID nicht gefunden:", draggedTaskId);
}




