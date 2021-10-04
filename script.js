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
    let currentEditedNoteId;
    let timeCounts = [];
    let noteCounter = 0;
    let allViewedNotes = [];

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
        }, 1000);

        if (!timeCounts[parseInt(noteNumber) - 1]) {
            timeCounts.push(startCount);
        } else {
            timeCounts[parseInt(noteNumber) - 1] = startCount;
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

    const addEventsToCreatedNotes = function (identifier, noteContent, noteNumber) {
        const createdNote = document.querySelector(identifier);
        const viewNoteEl = document.querySelector(".view-note");
        const viewNoteTitleEl = document.querySelector(".view-note-title");
        const viewNoteContentEl = document.querySelector(".view-note-content");
        const editBtn = document.querySelector(".edit-note-btn");
        const editNoteModal = document.querySelector(".edit-note");

        createdNote.addEventListener("click", () => {
            if (!allViewedNotes[noteNumber]) {
                allViewedNotes.push(1);
            }

            if (createdNote.classList.contains("edited")) {
                allViewedNotes[noteNumber] = 0;
            }

            allViewedNotes[Number(noteNumber)] += 1;

            viewNoteContentEl.textContent = noteContent;
            viewNoteTitleEl.textContent = createdNote.firstElementChild.textContent;
            viewNoteEl.classList.add("spread");
            createdNote.classList.remove("edited");
        }, false);

        editBtn.addEventListener("click", () => {
            let updatedNoteTitle = viewNoteTitleEl.textContent;
            let updatedNoteContent = viewNoteContentEl.textContent;

            const editFormTitleEl = document.getElementById("new-note-title");
            const editFormContentEl = document.getElementById("new-note-content");

            editFormTitleEl.value = updatedNoteTitle;
            editFormContentEl.textContent = updatedNoteContent;

            viewNoteEl.classList.remove("spread");
            editNoteModal.classList.add("popup");

            currentEditedNoteId = identifier;
        }, false);
    }

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
                addEventsToCreatedNotes(".note" + noteCounter, noteContent.value, noteCounter - 1);
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
                let currentEditedNote = document.querySelector(currentEditedNoteId);
                let noteNumber = Number(currentEditedNoteId.slice(-1));


                currentEditedNote.firstElementChild.textContent = newNoteTitle.value;
                currentEditedNote.classList.add("edited");
                startTimeCount(currentEditedNoteId.substr(1));
                editNoteModal.classList.remove("popup");
                addEventsToCreatedNotes(currentEditedNoteId, newNoteContent.value, noteNumber - 1);
                newNoteTitle.value = "";
                newNoteContent.value = "";
            }
        })

    }

    addNoteEventListeners();
}());