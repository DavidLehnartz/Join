'use strict';

/* DRAG AND DROP */


let draggedTaskId;


function startDragging(taskId) {
    draggedTaskId = taskId;
    console.log("startDragging: Task ID gesetzt zum Ziehen:", draggedTaskId);

    let taskElement = document.getElementById(taskId);
    if (taskElement) {
        taskElement.classList.add("dragged");
    }
}

function endDragging(taskId) {
    let taskElement = document.getElementById(taskId);
    if (taskElement) {
        taskElement.classList.remove("dragged");
    }
}


function allowDrop(event) {
    event.preventDefault();
    console.log("allowDrop: Event erlaubt");
}


async function drop(event, targetColumn) {
    event.preventDefault();
    console.log("drop: funktion ausgelöst");

    console.log("drop: inhalt von tasks:", tasks);
    console.log("drop: draggedTaskId:", draggedTaskId);

    let task = tasks.find(task => task.id === draggedTaskId);
    console.log("task gefunden:", task);
    if (task) {
        console.log("drop: task gefunden und spalte geändert:", task);
        task.status = targetColumn;

        await updateTaskInDatabase(task);
        await fetchTasksData();
    } else {
        console.error("drop: aufgabe mit ID nicht gefunden:", draggedTaskId);
    }
}


async function updateTaskInDatabase(task) {
    console.log("updateTaskInDatabase: in datenbank gespeichert:", task);

    try {
        const response = await fetch(`${BASE_URL}/tasks/${task.id}.json`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        });

        if (!response.ok) {
            throw new Error(`fehler beim speichern des task in der datenbank. status: ${response.status}`);
        }

        console.log("task erfolgreich in der datenbank gespeichert:", task);
    } catch (error) {
        console.error("fehler beim speichern des task:", error);
    }
}


function emptyColumnMessage() {
    const columns = [
        { tasksWrapper: document.getElementById('to_do'), message: document.getElementById('to_do_message') },
        { tasksWrapper: document.getElementById('in_progress'), message: document.getElementById('in_progress_message') },
        { tasksWrapper: document.getElementById('await_feedback'), message: document.getElementById('await_feedback_message') },
        { tasksWrapper: document.getElementById('done'), message: document.getElementById('done_message') },
    ];

    columns.forEach(column => {
        if (column.tasksWrapper.children.length === 0) {
            column.message.classList.remove('d_none');
            column.tasksWrapper.classList.add('d_none');
            /* column.tasksWrapper.style.display = 'none'; */
        } else {
            column.message.classList.add('d_none');
            column.tasksWrapper.classList.remove('d_none');
            /* column.tasksWrapper.style.display = ''; */
        }
    });
}