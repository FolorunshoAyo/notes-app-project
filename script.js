(function () {
    const createNoteBtn = document.querySelector(".create-note-btn");
    const createNoteModal = document.querySelector(".create-note-modal");
    const closeModalBtn = document.querySelector(".create-close-btn");
    const createNoteFrm = document.querySelector("#createNoteFrm");
    const editNoteFrm = document.querySelector("#editNoteFrm")
    const addNoteContainer = document.querySelector(".main-container");
    const closeViewedNoteBtn = document.querySelector(".view-close-btn");
    const editNoteModal = document.querySelector(".edit-note");
    const editCloseBtn = document.querySelector(".edit-close-btn");
    const editBtn = document.querySelector(".edit-note-btn");
    const viewNoteTitleEl = document.querySelector(".view-note-title");
    const viewNoteContentEl = document.querySelector(".view-note-content");
    const viewNoteEl = document.querySelector(".view-note");
    const selectEl = document.querySelector("#sort-by");

    let selectedNote;
    let filteredNotes = [];
    let timeCounts = [];
    let notes = [];
    let noteCounter = 0;

    createNoteBtn.addEventListener("click", () => {
        createNoteModal.classList.add("popup");
    }, false);

    closeViewedNoteBtn.addEventListener("click", () => {
        document.querySelector(".view-note").classList.remove("spread");
    }, false);

    editCloseBtn.addEventListener("click", () => {
        document.querySelector(".edit-note").classList.remove("popup");
    }, false);

    const startTimeCount = function (contentIndex) {
        let noteNumber = contentIndex.slice(-1);

        let pCount;
        if (timeCounts.length > 0) {
            pCount = timeCounts[parseInt(noteNumber) - 1];
            clearInterval(pCount);
        }

        let control = 0
        let cntseconds = 0;
        let seconds = 0;
        let minutes = 0
        let hours = 0;
        let days = 0;
        let months = 0;
        let years = 0;
        let noOfMinutes = 0;
        let noOfHours = 0;
        let noOfDays = 0;
        let noOfMonths = 0;
        let text;
        const noteEl = document.querySelector("." + contentIndex);

        let startCount = setInterval(() => {
            seconds++;
            cntseconds++;
            control = cntseconds / 60;

            if (control == 1) {
                noOfMinutes++;
                minutes++;
            }
            if (noOfMinutes == 60) {
                noOfHours++;
                hours++;
            }
            if (noOfHours == 24) {
                noOfDays++;
                days++;
            }
            if (noOfDays == 30) {
                noOfMonths++;
                months++;
            }
            if (noOfMonths == 12) {
                years++;
            }
            if (cntseconds == 60) {
                cntseconds = 0;
            }
            if (noOfMinutes == 60) {
                noOfMinutes = 0;
            }
            if (noOfHours == 24) {
                noOfHours = 0;
            }
            if (noOfDays == 30) {
                noOfDays = 0;
            }
            if (noOfMonths == 30) {
                noOfMonths = 0;
            }

            if (seconds >= 0 && seconds <= 20) {
                text = "few seconds";
            }
            if (minutes >= 1 && minutes < 2) {
                text = "one minute";
            }

            if (minutes >= 2 && minutes <= 30) {
                text = "some minutes";
            }

            if (hours >= 1 && hours < 2) {
                text = "an hour";
            }

            if (hours >= 2 && hours >= 18) {
                text = "few hours"
            }

            if (days >= 1 && days < 2) {
                text = "a day";
            }

            if (days >= 2 && days <= 20) {
                text = "some days";
            }

            if (months >= 1 && months < 2) {
                text = "a month"
            }

            if (months >= 2 && months >= 7) {
                text = "few months";
            }

            if (years >= 1 && year < 2) {
                text = "a year";
            }

            if (years >= 1 && years <= 3) {
                text = "some years";
            }

            if (years > 3) {
                text = "many years"
            }

            noteEl.lastElementChild.textContent = `Last Edited ${text} ago`;
            notes[parseInt(noteNumber) - 1].timeDuration++;
            notes[parseInt(noteNumber) - 1].timePeriod = `Last Edited ${text} ago`;
        }, 1000);

        if (!timeCounts[parseInt(noteNumber) - 1]) {
            timeCounts.push(startCount);
        } else {
            timeCounts[parseInt(noteNumber) - 1] = startCount;
            notes[parseInt(noteNumber) - 1].timeDuration = seconds; 
        }
    }

    const validateCreateNoteForm = function (noteTitleEntry, noteContentEntry) {
        const noteTitle = document.getElementById("note-title");
        const noteContent = document.getElementById("note-content");
        let isValid = true;
        if (noteTitleEntry == "" && noteContentEntry == "") {
            noteTitle.style.border = "0.2em solid red";
            noteContent.style.border = "0.2em solid red";
            isValid = false
        } else if (noteTitleEntry == "") {
            noteTitle.style.border = "0.2em solid red";
            noteContent.style.border = "0.2em solid rgb(66, 99, 161)";
            isValid = false;
        } else if (noteContentEntry == "") {
            noteTitle.style.border = "0.2em solid rgb(66, 99, 161)";
            noteContent.style.border = "0.2em solid red";
            isValid = false;
        } else {
            noteTitle.style.border = "0.2em solid rgb(66, 99, 161)";
            noteContent.style.border = "0.2em solid rgb(66, 99, 161)";
            isValid = true;
        }
        return isValid;
    }

    const selectInput = function(selectedOption, inputEl){
        if(typeof selectedOption !== "string") return;
        const allNotes = document.querySelectorAll(".note");
        const sortedNotes = notes.sort((a, b) => {
            return a.timeDuration - b.timeDuration;
        });

        if(notes.length === 0){
            alert("Please create a note");
            inputEl.value = "";
        }else if(selectedOption === "last-edit"){
            if(notes.length == 1){

            }
            else{
                allNotes.forEach((note, index) => {
                    filteredNotes = sortedNotes;
                    note.firstElementChild.textContent = filteredNotes[index].title;
                    note.lastElementChild.textContent = filteredNotes[index].timePeriod;
                });
            }
        }else if(selectedOption === ""){
            filteredNotes = notes;
            allNotes.forEach((note, index) => {
                note.firstElementChild.textContent = filteredNotes[index].title;
                note.lastElementChild.textContent = filteredNotes[index].timePeriod;
            });
        }
    }

    selectEl.addEventListener("change", (e) => {
        selectInput(e.target.value, e.target);
    });

    const addEventsToCreatedNotes = function (identifier, noteNumber) {
        const createdNote = document.querySelector(identifier);

        createdNote.addEventListener("click", () => {

            if (createdNote.classList.contains("edited")) {
                notes[noteNumber].views = 0;
            }

            notes[noteNumber].views++;

            viewNoteContentEl.textContent = filteredNotes[noteNumber].content;
            viewNoteTitleEl.textContent = filteredNotes.firstElementChild.textContent;
            viewNoteEl.classList.add("spread");

            selectedNote = identifier;
        }, false);
    }

    const displayEditModal = () => {
        let updatedNoteTitle = viewNoteTitleEl.textContent;
        let updatedNoteContent = viewNoteContentEl.textContent;

        const editFormTitleEl = document.getElementById("new-note-title");
        const editFormContentEl = document.getElementById("new-note-content");

        editFormTitleEl.value = updatedNoteTitle;
        editFormContentEl.textContent = updatedNoteContent;

        viewNoteEl.classList.remove("spread");
        editNoteModal.classList.add("popup");
    }

    editBtn.addEventListener("click", displayEditModal, false);

    function addNoteEventListeners() {

        closeModalBtn.addEventListener("click", () => {
            createNoteModal.classList.remove("popup");
        }, false);

        createNoteFrm.addEventListener("submit", (e) => {
            e.preventDefault();
            const noteTitle = document.getElementById("note-title");
            const noteContent = document.getElementById("note-content");

            let validate = validateCreateNoteForm(noteTitle.value.trim().toLowerCase(), noteContent.value.trim().toLowerCase());

            if (validate) {
                noteCounter++;
                addNoteContainer.insertAdjacentHTML("afterbegin", `
               <div class="note note${noteCounter}">
                 <h2 class="note-title">${noteTitle.value}</h2>
                 <p class="time-period">
                 </p>
               </div>
               `);

                startTimeCount("note" + noteCounter);
                createNoteModal.classList.remove("popup");
                addEventsToCreatedNotes(".note" + noteCounter, noteCounter - 1);
                notes.push({noteId: noteCounter, title: noteTitle.value.trim(),content: noteContent.value.trim(), timePeriod:  "", views: 0, timeDuration: 0});
                noteTitle.value = "";
                noteContent.value = "";
            }
        });

        editNoteFrm.addEventListener("submit", (e) => {
            e.preventDefault();

            const newNoteTitle = document.getElementById("new-note-title");
            const newNoteContent = document.getElementById("new-note-content");

            let validate = validateCreateNoteForm(newNoteTitle.value.trim().toLowerCase(), newNoteContent.value.trim().toLowerCase());

            if (validate) {
                let currentEditedNote = document.querySelector(selectedNote);
                let noteNumber = Number(selectedNote.slice(-1));


                currentEditedNote.firstElementChild.textContent = newNoteTitle.value;
                notes[noteNumber - 1].title = newNoteTitle.value;
                notes[noteNumber - 1].content = newNoteContent.value;
                currentEditedNote.classList.add("edited");
                startTimeCount(selectedNote.substr(1));
                editNoteModal.classList.remove("popup");
                newNoteTitle.value = "";
                newNoteContent.value = "";
            }
        })

    }

    addNoteEventListeners();
}());