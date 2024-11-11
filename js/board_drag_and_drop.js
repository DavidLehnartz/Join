'use strict';

/* DRAG AND DROP */


let draggedTaskId;


function startDragging(taskId) {
    draggedTaskId = taskId;
    console.log("startDragging: Task ID gesetzt zum Ziehen:", draggedTaskId);
}


function allowDrop(event) {
    event.preventDefault();
    console.log("allowDrop: Event erlaubt");
}





async function drop(event, targetColumn) {
    event.preventDefault();
    console.log("drop: Funktion ausgelöst");

    console.log("drop: Inhalt von tasks:", tasks);
    console.log("drop: draggedTaskId:", draggedTaskId);

    let task = tasks.find(task => task.id === draggedTaskId);
    console.log("Aufgabe gefunden:", task);
    if (task) {
        console.log("drop: Aufgabe gefunden und Spalte geändert:", task);
        task.status = targetColumn;

        await updateTaskInDatabase(task);

        renderTasks(); 
         /* updateEmptyMessages();  */
    } else{
        console.error("drop: Aufgabe mit ID nicht gefunden:", draggedTaskId);
    }
    
}


async function updateTaskInDatabase(task) {
    console.log("updateTaskInDatabase: Speichere in Datenbank:", task);

    try {
        const response = await fetch(`${BASE_URL}/tasks/${task.id}.json`, {
            method: "PUT",  
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        });

        if (!response.ok) {
            throw new Error(`Fehler beim Speichern der Aufgabe in der Datenbank. Status: ${response.status}`);
        }

        console.log("Aufgabe erfolgreich in der Datenbank gespeichert:", task);
    } catch (error) {
        console.error("Fehler beim Speichern der Aufgabe:", error);
    }
}
