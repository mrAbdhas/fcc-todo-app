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

//Function to add or update the input values to taskData array.
const addOrUpdateTask = () => {
    //set button text to Add task.
    addOrUpdateTaskBtn.innerText = "Add Task";
    //Determine whether the task exist in taskData array
    /* findIndex array method call on taskData finds and returns the index of the first
    element that meets the criteria specified by a provied testing funtion, if not, 
    it returns -1 */
    const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id)
    //Retrive values from input fields and store them in a taskObj object, give each task a unique id.
    const taskObj = {
        id: `${titleInput.value.toLowerCase().split(" ").join('-')}-${Date.now()}`, //unique id to each task, titleInput.value in lowerCase hyphenated, with DateNow = number of milisecounds since 01/01/1970.
        title: titleInput.value,
        date: dateInput.value,
        description: descriptionInput.value,
        
    };
    //Add obtained input values in taskObj to taskData, if the, if condition is met.
    if(dataArrIndex === -1) { // the condition, check if dataArrIndex is stricly equals to -1, meaning no matching id.
        //Add taskObj object to the begining of taskData array.
        taskData.unshift(taskObj);
    } else {
        taskData[dataArrIndex] = taskObj; // else set a task with the index [dataArrIndex] to taskObj.
    }

    //Save to localStorage when user add or updates a task.
    localStorage.setItem("data", JSON.stringify(taskData));

    //call updateTaskContainer to add task to the DOM. 
    updateTaskContainer(); 
    // And afterwards clear inputs and close form modal
    reset(); 
}

//Fucntion to add the task to the DOM
const updateTaskContainer = () => {
    
    /*Fix duplication issue of previous task, when adding tasks,
    clear out existing content of taskContainer, by setting innerHTML back to an empty string*/ 
    tasksContainer.innerHTML = "";
    //Display the task by looping throught it
    // Use forEach method on taskData, then destructure id, title, date, description as the parameters 
    taskData.forEach(({id, title, date, description}) => {
        /*use addition assigment += operator to append HTML content in template literals
        to taskContainer element*/ 
        /*To allow for task management, 
        include both a delete and an edit button for each task.*/
        (tasksContainer.innerHTML += `
        <div class="task" id="${id}">
            <p><strong>Title:</strong>${title}</p>
            <p><strong>Date:</strong>${date}</p>
            <p><strong>Description:</strong>${description}</p>

            <button type="button" class="btn" onclick="editTask(this)">Edit</button>
            <button type="button" class="btn" onclick="deleteTask(this)">Delete</button>
        </div>
        
        `)
    }
    )
}

//deleteTask function, that will handle deleting tasks.
const deleteTask = (buttonEl) => {
    // find the index of the tasks to be deleted.
    const dataArrIndex = taskData.findIndex((item) => item.id === buttonEl.parentElement.id);
    //remove parrentElement of buttonEl from the DOM.
    buttonEl.parentElement.remove();
     /*splice is array method, takes up to 3 arguments,
    1 manadtory arg. specifies which index to start,
    2nd arg. is number of items to remove
    3rd is optional replacement element*/
    //Remove 1 tasks from taskData array.
    taskData.splice(dataArrIndex, 1);
}

//editTask function, that will handle editing tasks.
const editTask = (buttonEl) => {
    // find the index of the tasks to be edited.
    const dataArrIndex = taskData.findIndex((item) => item.id === buttonEl.parentElement.id);
    // Retrive the task to be edited and assign it to currentTask object, to keep track of it.
    currentTask = taskData[dataArrIndex];
    /*The task to be edited is now in the currentTask object
    Stage it, for editing inside input fields.*/
    titleInput.value = currentTask.title;
    dateInput.value = currentTask.date;
    descriptionInput.value = currentTask.description;
    // Set the Text of addOrUpdateTaskBtn button to "Update Task".
    addOrUpdateTaskBtn.innerText = "Update Task";
    //Display form modal with the values of the input fields to be updated.
    taskForm.classList.toggle("hidden");
    /*Lastly to make the editing functional, so it reflect when you submit the task
    create and else block in the if statement inside addOrUpdateTask function
    and set taskData[dataArrIndex] to taskObj */
}

//function to clear input fields, after creating a task.
const reset = () => {
    //first step, set the values for all 3 inputs fields to an empty string. 
    titleInput.value = "";
    dateInput.value = "";
    descriptionInput.value = "";

    //Next, toggle the hidden class on taksform.
    taskForm.classList.toggle("hidden"); 
    
    /*and, Set currentTask object to empty object, 
    so it can be filled with the task the user might have added.*/  
    currentTask = {

    };

}

// Event listener for the "Add new Task" button to toggle the visibility of the form modal.
openTaskFormBtn.addEventListener("click", () => {
    // Toggles the "hidden" class on the taskForm element to show the form modal.
    /* syntax: element.classlist.toggle("class-to-toggle") */
    taskForm.classList.toggle("hidden"); 
})

// Event listener for the "Close" X button to display the dialog box on UI.
closeTaskFormBtn.addEventListener("click", () => {
    const formInputsContainValues = titleInput.value || dateInput.value || descriptionInput.value;
    //if the the values in the input fields are not equal to/exist in currentTask object, meaning no changes to tasks, return false and save in variable.
    const formInputValuesUpdated = titleInput.value !== currentTask.title || dateInput.value !== currentTask.date || descriptionInput.value !== currentTask.description;
    if (formInputsContainValues && formInputValuesUpdated) {  // check if formInputsContainValues or formInputValuesUpdated is equal to true.
        //Display modal dialog box element (confirmCloseDialog) on the UI
        confirmCloseDialog.showModal(); // This dialog contains options to cancel or discard.
    } else { // if the if statement is not true, meaning no changes in input field.
        reset(); // call reset fucntion to clear input field, and close hide form modal.
    }
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
    /*call reset fucntion to clear input fields
    and hide form modal*/
    reset();
})

//Event listener for submit button "Add Task", submit inputs to taskData array and display to UI.
taskForm.addEventListener("submit", (e) => {
    e.preventDefault(); //Prevent from refresing the page after submitting the form.
    //call addOrUpdateTask function.
    addOrUpdateTask();
});
