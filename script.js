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

    const sortAlphabetically = function (array){
        let controlArray = [];

        for(let i = 0; i < array.length; i++){
            controlArray.push({noteInfo: array[i], id: 0});
        }

        let numbering = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26];

        array.forEach((note, index) => {
            let initial = note.title.slice(0, 1).toLowerCase();
            if(initial == "a"){
                controlArray[index].id = numbering[0];
            }else if(initial == "b"){
                controlArray[index].id = numbering[1];
            }else if(initial == "c"){
                controlArray[index].id = numbering[2];
            }else if(initial == "d"){
                controlArray[index].id = numbering[3];
            }else if(initial == "e"){
                controlArray[index].id = numbering[4];
            }else if(initial == "f"){
                controlArray[index].id = numbering[5];
            }else if(initial == "g"){
                controlArray[index].id = numbering[6];
            }else if(initial == "h"){
                controlArray[index].id = numbering[7];
            }else if(initial == "i"){
                controlArray[index].id = numbering[8];
            }else if(initial == "j"){
                controlArray[index].id = numbering[9];
            }else if(initial == "k"){
                controlArray[index].id = numbering[10];
            }else if(initial == "l"){
                controlArray[index].id = numbering[11];
            }else if(initial == "m"){
                controlArray[index].id = numbering[12];
            }else if(initial == "n"){
                controlArray[index].id = numbering[13];
            }else if(initial == "o"){
                controlArray[index].id = numbering[14];
            }else if(initial =="p"){
                controlArray[index].id = numbering[15];
            }else if(initial == "q"){
                controlArray[index].id = numbering[16];
            }else if(initial == "r"){
                controlArray[index].id = numbering[17];
            }else if(initial == "s"){
                controlArray[index].id = numbering[18];
            }else if(initial == "t"){
                controlArray[index].id = numbering[19];
            }else if(initial == "u"){
                controlArray[index].id = numbering[20];
            }else if(initial == "v"){
                controlArray[index].id = numbering[21];
            }else if(initial == "w"){
                controlArray[index].id = numbering[22];
            }else if(initial == "x"){
                controlArray[index].id = numbering[23];
            }else if(initial == "y"){
                controlArray[index].id = numbering[24];
            }else if(initial == "z"){
                controlArray[index].id = numbering[25];
            }
        });

        controlArray.sort((a, b) => a.id - b.id);

        controlArray.forEach((object, index) => {
            array[index] = object.noteInfo;
        });

        return array;
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
        let arrangedNotes = [];

        for(let i = 0; i < notes.length; i++){
            arrangedNotes.push(notes[i]);
        }

        if(notes.length === 0){
            alert("Please create a note");
            inputEl.value = "";
        }else if(selectedOption === "last-edit"){
            if(notes.length == 1){

            }
            else{
                arrangedNotes.sort((a, b) => {
                    return a.timeDuration - b.timeDuration;
                });
                filteredNotes = arrangedNotes;
                allNotes.forEach((note, index) => {
                    note.classList.remove("hide");
                    note.firstElementChild.textContent = filteredNotes[index].title;
                    note.lastElementChild.textContent = filteredNotes[index].timePeriod;
                });
            }
        }else if(selectedOption === ""){
            filteredNotes = notes;
            allNotes.forEach((note, index) => {
                note.classList.remove("hide");
                note.firstElementChild.textContent = notes[index].title;
                note.lastElementChild.textContent = notes[index].timePeriod;
            });
        }else if(selectedOption === "ascending"){
            let contentAscending = sortAlphabetically(arrangedNotes);
            filteredNotes = contentAscending;

            allNotes.forEach((note, index) => {
                note.classList.remove("hide");
                note.firstElementChild.textContent = contentAscending[index].title;
                note.lastElementChild.textContent = contentAscending[index].timePeriod;
            });
        }else if(selectedOption === "most-viewed"){
            let mostViewedNotesListDesc = arrangedNotes.sort((a, b) => {
                return b.views - a.views
            });
            filteredNotes = mostViewedNotesListDesc;

            allNotes.forEach((note, index) => {
                note.classList.remove("hide");
                note.firstElementChild.textContent = mostViewedNotesListDesc[index].title;
                note.lastElementChild.textContent = mostViewedNotesListDesc[index].timePeriod;
            });
        }else if(selectedOption == "edits-only"){
            allNotes.forEach((note) => {
                if(!note.classList.contains("edited")){
                note.classList.add("hide");
                }else{
                    note.classList.remove("hide");  
                }
            });
        }
    }

    selectEl.addEventListener("change", (e) => {
        selectInput(e.target.value, e.target);
    });

    const addEventsToCreatedNotes = function (identifier, noteIndex) {
        const createdNote = document.querySelector(identifier);

        createdNote.addEventListener("click", () => {

            if (createdNote.classList.contains("edited")) {
                notes[noteIndex].views = 0;
            }

            notes[noteIndex].views++;

            viewNoteContentEl.textContent = filteredNotes[noteIndex].content;
            viewNoteTitleEl.textContent = filteredNotes[noteIndex].title;
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
                addNoteContainer.insertAdjacentHTML("beforeend",`
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
                filteredNotes = notes;
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
                filteredNotes = notes;
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

    