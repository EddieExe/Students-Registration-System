const studentForm = document.getElementById('studentForm');
const studentTable = document.querySelector('#studentTable tbody');
const submitBtn = document.getElementById('submitBtn');
let currentRow = null;

// Load existing students from local storage on page load
document.addEventListener('DOMContentLoaded', loadStudents);

studentForm.addEventListener('submit', function(event) {
    event.preventDefault(); //prevents from reloading the page

    const studentName = document.getElementById('studentName').value;
    const studentClass = document.getElementById('class').value;
    const studentID = document.getElementById('studentID').value;
    const phoneNo = document.getElementById('phoneNo').value;
    const emailId = document.getElementById('emailId').value;

    if (currentRow) {
        // to update existing data
        const studentIndex = currentRow.dataset.Index;
        updateStudent(studentIndex, {studentName, studentClass, studentID, phoneNo, emailId});
        currentRow.innerHTML = createRowContent(studentName, studentClass, studentID, phoneNo, emailId);
        currentRow = null;
        submitBtn.textContent = "Add Student";
    }
    else {
        // if we dont want to update the existing data, we can just add new data
        const newRow = document.createElement('tr');
        const studentData = {studentName, studentClass, studentID, phoneNo, emailId};
        addStudent(studentData);
        newRow.innerHTML = createRowContent(studentName, studentClass, studentID, phoneNo, emailId);
        studentTable.appendChild(newRow);
    }

    studentForm.reset();
});

studentTable.addEventListener('click', function (event) {
    const target = event.target.closest('button');

    if (target && target.classList.contains('delete-btn')) {
        const row = target.closest('tr');
        const studentIndex = row.dataset.index;
        removeStudent(studentIndex); //It will delete the row
        row.remove();
    }

    else if (target && target.classList.contains('edit-btn')) {
        currentRow = target.closest('tr'); //It will edit the row

        document.getElementById('studentName').value = currentRow.cells[0].textContent;
        document.getElementById('class').value = currentRow.cells[1].textContent;
        document.getElementById('studentID').value = currentRow.cells[2].textContent;
        document.getElementById('phoneNo').value = currentRow.cells[3].textContent;
        document.getElementById('emailId').value = currentRow.cells[4].textContent;

        submitBtn.textContent = "Update Student"; //It will change button text to Update Student
    }
});

//Table Contents
function createRowContent(name, className, studentID, phoneNo, emailId) {
    return `
        <td>${name}</td>
        <td>${className}</td>
        <td>${studentID}</td>
        <td>${phoneNo}</td>
        <td>${emailId}</td>
        <td>
            <button class = "edit-btn" title="Edit">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="icon">
                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.199Z"/>
                </svg>
            </button>
            
            <button class = "delete-btn" title="Delete">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="icon">
                <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                </svg>
            </button>
        </td>
    `;
}

// Add, Update and Remove Students from Local Storage

//Adding a New Student
function addStudent(studentData) {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    students.push(studentData);
    localStorage.setItem('students', JSON.stringify(students));
}

//Updating an Existing Student
function updateStudent(index, studentData) {
    const students = JSON.parse(localStorage.getItem('students'));
    students[index] = studentData;
    localStorage.setItem('students', JSON.stringify(students));
}

//Removing a Student
function removeStudent(index) {
    const students = JSON.parse(localStorage.getItem('students'));
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
}

// Load students from local storage and populate the table
function loadStudents() {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    students.forEach((student, index) => {
        const newRow = document.createElement('tr');
        newRow.dataset.index = index;
        newRow.innerHTML = createRowContent(student.studentName, student.studentClass, student.studentID, student.phoneNo, student.emailId);
        studentTable.appendChild(newRow);
    });
}