//Access HTML elements and assign them to variables.
const taskForm = document.getElementById("task-form");
const confirmCloseDialog = document.getElementById("confirm-close-dialog");
const openTaskFormBtn = document.getElementById("open-task-form-btn");
const closeTaskFormBtn = document.getElementById("close-task-form-btn");
const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn");
const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");
const tasksContainer = document.getElementById("tasks-container");
const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input");

/* 
Setup an array to store all tasks and their associated data (title, due date, description).
This storage enables task tracking, display on the UI, and saving to localStorage.
*/
const taskData = [

];

// Setup an object to track the state when editing and discarding tasks.
let currentTask = {

};

// Event listener for the "Add new Task" button to toggle the visibility of the form modal.
openTaskFormBtn.addEventListener("click", () => {
    // Toggles the "hidden" class on the taskForm element to show the form modal.
    /* syntax: element.classlist.toggle("class-to-toggle") */
    taskForm.classList.toggle("hidden"); 
})

// Event listener for the "Close" X button to display the dialog box on UI.
closeTaskFormBtn.addEventListener("click", () => {
    //Display modal dialog box element (confirmCloseDialog) on the UI..
    confirmCloseDialog.showModal(); // This dialog contains options to cancel or discard.
})

//Event listener for cancel option/button on modal dialog box.
cancelBtn.addEventListener("click", () => {
    //Close the modal dialog box element. use close() method. 
    confirmCloseDialog.close();
})

//Event listener for discard option/button on modal dialog box.
discardBtn.addEventListener("click", () => {
    ////Close the modal dialog box element.
    confirmCloseDialog.close();
    // Toggles the "hidden" class on the taskForm element to hide the form modal.
    taskForm.classList.toggle("hidden");
})