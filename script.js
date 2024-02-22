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
