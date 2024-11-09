let howToUseArray = [
  {
    number: "1.",
    headline: "Exploring the board",
    content: `When you log in to <span class="text-secondary">Join</span>, you'll find a default board. This board represents your project and contains four default lists: "To Do", "In Progress", “Await feedback” and "Done".`,
  },
  {
    number: "2.",
    headline: "Creating Contacts",
    content: `In <span class="text-secondary">Join</span>, you can add contacts to collaborate on your projects. Go to the "Contacts" section, click on "New contact", and fill in the required information. Once added, these contacts can be assigned tasks and they can interact with the tasks on the board.`,
  },
  {
    number: "3.",
    headline: "Adding Cards",
    content: `Now that you've added your contacts, you can start adding cards. Cards represent individual tasks. Click the "+" button under the appropriate list to create a new card. Fill in the task details in the card, like task name, description, due date, assignees, etc.`,
  },
  {
    number: "4.",
    headline: "Moving Cards",
    content: `As the task moves from one stage to another, you can reflect that on the board by dragging and dropping the card from one list to another.`,
  },
  {
    number: "5.",
    headline: "Deleting Cards",
    content: `Once a task is completed, you can either move it to the "Done" list or delete it. Deleting a card will permanently remove it from the board. Please exercise caution when deleting cards, as this action is irreversible.
    <br><br>
    Remember that using <span class="text-secondary">Join</span> effectively requires consistent updates from you and your team to ensure the board reflects the current state of your project.
    <br><br>
    Have more questions about <span class="text-secondary">Join</span>? Feel free to contact us at help@join.com. We're here to help you!`,
  },
];

function initHelp(profileId) {
  getInitialOfUser(profileId);
  showHowToUseSteps();
}

document.addEventListener("DOMContentLoaded", function () {
  highlightJoinText();
});

function highlightJoinText() {
  const paragraph = document.querySelector("p");
  if (!paragraph || !paragraph.innerHTML) return;
  paragraph.innerHTML = paragraph.innerHTML.replace(
    /\b(Join)\b/g,
    '<span class="text-secondary">$1</span>'
  );
}

function renderHowToUseTemplate(number, headline, content) {
  return `<div class="help-how-to-step">
              <h3>${number}</h3>
              <div class="how-to-content">
                <p class="how-to-hl">${headline}</p>
                <p class="copy-text">${content}</p>
              </div>
            </div>`;
}

function showHowToUseSteps() {
  let howToContainer = document.getElementById("help-how-to-use");
  for (let i = 0; i < howToUseArray.length; i++) {
    const step = howToUseArray[i];
    howToContainer.innerHTML += renderHowToUseTemplate(
      step.number,
      step.headline,
      step.content
    );
  }
}
