function navigateToBoard() {
  window.location.href = "board.html";
}

async function loadData(header, sidebar, link) {
  const response = await fetch(
    "https://join-6838e-default-rtdb.europe-west1.firebasedatabase.app/tasks.json"
  );
  const data = await response.json();
  console.log(data);
  createHeader(header);
  createSidebar(sidebar, link);
  showHowManyTasksUrgent(data);
  taskInProgess(data);
  taskToDo(data);
  taskInBoard(data);
  taskDone(data);
  taskAwaiting(data);
  displayGreeting();
  displayUsername();
  //getUserFromStorage();
}

function showHowManyTasksUrgent(data) {
  const urgentTasks = Object.values(data).filter((task) =>
    task.priority?.includes("Urgent")
  );
  let urgentCount = document.getElementById("urgentCount");
  urgentCount.innerHTML = urgentTasks.length;
  filterWichDateNearest(urgentTasks);
  console.log("Urgent Tasks:", urgentTasks.length);
}

function taskInProgess(data) {
  const progressTasks = Object.values(data).filter((task) =>
    task.status?.includes("inprogress")
  );
  let taskInProg = document.getElementById("taskInProg");
  taskInProg.innerHTML = progressTasks.length;
  console.log("taskInProgess:", progressTasks.length);
}

function filterWichDateNearest(urgentTasks) {
  const sortedTasks = urgentTasks.sort((a, b) => {
    const aDate = new Date(a.dueDate);
    const bDate = new Date(b.dueDate);
    return aDate - bDate;
  });
  date = new Date(sortedTasks[0].dueDate);
  const options = { year: "numeric", month: "long", day: "numeric" };
  console.log(date.toLocaleDateString("en-US", options)); // Output: November 6, 2024
  let nextDate = document.getElementById("nextDate");
  nextDate.innerHTML = date.toLocaleDateString("en-US", options);
}

function taskToDo(data) {
  const tasksToDo = Object.values(data).filter((task) =>
    task.status?.includes("todo")
  );
  let taskToDo = document.getElementById("taskToDo");
  taskToDo.innerHTML = tasksToDo.length;
}

function taskInBoard(data) {
  let taskInBoardCount = document.getElementById("taskInBoardCount");
  let tasksInBoard = Object.values(data).length;
  taskInBoardCount.innerHTML = tasksInBoard;
}

function taskDone(data) {
  const tasksDone = Object.values(data).filter((task) =>
    task.status?.includes("toDo")
  );
  let tasksDoneCount = document.getElementById("tasksDoneCount");
  tasksDoneCount.innerHTML = tasksDone.length;
}

function taskAwaiting(data) {
  const tasksAwaiting = Object.values(data).filter((task) =>
    task.status?.includes("feedback")
  );
  let tasksAwaitingCount = document.getElementById("tasksAwaitingCount");
  tasksAwaitingCount.innerHTML = tasksAwaiting.length;
}

function displayGreeting() {
  const greetingElement = document.getElementById("greeting");
  const currentHour = new Date().getHours();
  let greetingMessage;
  if (currentHour < 12) {
    greetingMessage = "Good Morning";
  } else if (currentHour < 18) {
    greetingMessage = "Good Afternoon";
  } else {
    greetingMessage = "Good Evening";
  }
  greetingElement.innerHTML = greetingMessage;
}

function getUserFromStorage() {
  let userDataAsText = localStorage.getItem("user");
  if (userDataAsText) {
    user = JSON.parse(userDataAsText);
  }
  console.log(user);
  displayUsername(user);
  displayInitial(user);
}

function displayUsername() {
  let userName = document.getElementById("userName");
  let user = getUserFromLocalStorage();
  userName.innerHTML = user.name;
}

function displayInitial(user) {
  let userInitial = document.getElementById("userInitial");
  userInitial.innerHTML = user.initial;
}