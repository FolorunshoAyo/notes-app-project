(function () {
    const createNoteBtn = document.querySelector(".create-note-btn");
    const createNoteModal = document.querySelector(".create-note-modal");
    const closeModalBtn = document.querySelector(".create-close-btn");
    const createNoteFrm = document.querySelector("#createNotefrm");
    const noteContainer = document.querySelector(".main-container");

    createNoteBtn.addEventListener("click", () => {
        createNoteModal.classList.add("popup");
    }, false);


    function addCreateNoteEventListeners() {

        closeModalBtn.addEventListener("click", () => {
            createNoteModal.classList.remove("popup");
        }, false);

        createNoteFrm.addEventListener("submit", (e) => {
            e.preventDefault();
            let counter = 0;
            const noteTitle = document.getElementById("note-title");
            const noteContent = document.getElementById("note-content");

            let validate = validateCreateNoteForm(noteTitle.value.trim().toLowerCase(), noteContent.value.trim().toLowerCase());

            if (validate) {
                counter++;
                noteContainer.insertAdjacentHTML("afterbegin", `
               <div class="note note${counter}">
                 <h2 class="note-title">${noteTitle.value}</h2>
                 <p class="time-period">
                 </p>
               </div>
               `);
                startTimeCount("note" + counter);
                createNoteModal.classList.remove("popup");
                noteTitle.value = "";
                noteContent.value = "";
            }
        });

    }

    function startTimeCount(contentIndex) {
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

        setInterval(() => {
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
    }

    function validateCreateNoteForm(noteTitleEntry, noteContentEntry) {
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
            isValid = true;
        }
        return isValid;
    }


    addCreateNoteEventListeners();
}());