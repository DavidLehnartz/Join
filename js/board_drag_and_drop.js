'use strict';

/* DRAG AND DROP */


let draggedTaskId;

/* let columns = {
    todo: {
        container: document.getElementById("to_do"),
        message: document.getElementById("to_do_message"),
    },
    in_progress: {
        container: document.getElementById("in_progress"),
        message: document.getElementById("in_progress_message"),
    },
    await_feedback: {
        container: document.getElementById("await_feedback"),
        message: document.getElementById("await_feedback_message"),
    },
    done: {
        container: document.getElementById("done"),
        message: document.getElementById("done_message"),
    },
}; */


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

       /*  renderTasks(); */
        /* updateColumnEmptyMessage(); */
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


/* function updateColumnEmptyMessage() {
    for (let column in columns) {
        let { container, message } = columns[column];
        if (container.innerHTML.trim() === "") {
            message.classList.remove("d_done");
        } else {
            message.classList.add("d_none");
        }
    }
} */

      