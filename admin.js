/*
    Group Member: Aaron Elliston
    ID#: 2409567
    Lab Class: Friday 12-2
    Administrative Interface Developer (Student 3)
*/ 
let editingStudentId = null;

function getStudents(){
    return JSON.parse(localStorage.getItem('portal_students')) || [];
}

function saveStudents(students){
    localStorage.setItem('portal_students', JSON.stringify(students));
}

function loadStudentTable(){
    const tbody = document.querySelector("#student-table tbody");
    tbody.innerHTML = "";
    const students = getStudents();

    students.forEach(student => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${student.id}</td>
            <td>${student.firstname} ${student.lastname}</td>
            <td>${student.cohort}</td>
            <td>${student.status}</td>
            <td>
            <button onclick="editStudent('${student.id}')">Edit</button>
            <button onclick="deleteStudent('${student.id}')">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function editStudent(id){
    const students = getStudents();
    const student = students.find(s => s.id === id);

    if(student){
        document.getElementById("studentID").value = student.id;
        document.getElementById("fname").value = student.firstname;
        document.getElementById("lname").value = student.lastname;
        document.getElementById("cohort").value = student.cohort;
        document.getElementById("studentID").disabled = true;

        editingStudentId = id;
        document.getElementById("submit-btn").textContent = "Update Student";
    }
}

function deleteStudent(id){
    let students = getStudents();

    students = students.filter(student => student.id !== id);

    saveStudents(students);
    loadStudentTable();

    console.log(`Student with ID ${id} deleted.`)
}

function getGrades(){
    return JSON.parse(localStorage.getItem('portal_grades')) || [];
}

function saveGrades(grades){
    localStorage.setItem('portal_grades', JSON.stringify(grades));
}

function calculateLetterGrade(score){
    if(score >= 80) return 'A';
    if(score >= 70) return 'B';
    if(score >= 60) return 'c';
    if(score >= 50) return 'D';
    return 'F';
}

function populateStudentDropdown(){
    const select = document.getElementById('grade-student-select');
    select.innerHTML = '<option value="">-- Choose a Student --</option>';

    const students = getStudents();
    students.forEach(student => {
        const option = document.createElement("option");
        option.value = student.id;
        option.textContent = `${student.firstname} ${student.lastname} (${student.id})`;
        select.appendChild(option);
    });
}

function loadGradesTable(){
    const tbody = document.getElementById("grade-table");
    tbody.innerHTML = "";

    const grades = getGrades();
    const students = getStudents();

    grades.forEach((gradeItem, index) => {
        const student = students.find(s => s.id === gradeItem.studentId);
        const studentName = student ? `${student.firstname} ${student.lastname}` : "Unknown Student";

        const tr = document.createElement("tr");
        tr.innerHTML = `
        <td>${gradeItem.studentId}</td>
        <td>${studentName}</td>
        <td>${gradeItem.subject}</td>
        <td>${gradeItem.score}</td>
        <td>${gradeItem.letterGrade}</td>
        <td><button onclick="deleteGrade(${index})">Delete</button></td>
        `;
        tbody.appendChild(tr);
    });
}
function deleteGrade(index){
    let grades = getGrades();
    grades.splice(index, 1);
    saveGrades(grades);
    loadGradesTable();

    console.log(`Grade record index ${index} deleted`)
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("Admin JS is loaded and ready!");

    loadStudentTable();
    populateStudentDropdown();
    loadGradesTable();

    const studentForm = document.getElementById("student-form");
    studentForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const id = document.getElementById("studentID").value;
        const firstname = document.getElementById("fname").value;
        const lastname = document.getElementById("lname").value;
        const cohort = document.getElementById("cohort").value;

        let students = getStudents();

        if(editingStudentId){
            const index = students.findIndex(s => s.id === editingStudentId);
            if(index !== -1){
                students[index].firstname = firstname;
                students[index].lastname = lastname;
                students[index].cohort = cohort;
            }
            editingStudentId = null;
            document.getElementById("studentID").disabled = false;
            document.getElementById("submit-btn").textContent = "Add Student";
        }else{
            const newStudent = {
            id: id,
            firstname: firstname,
            lastname: lastname,
            cohort: cohort,
            status: "Active"
            };

            students.push(newStudent);
        }

        saveStudents(students);
        loadStudentTable();
        populateStudentDropdown();
        studentForm.reset();
        console.log("Student saved successfully!", students);
    });
    const gradeForm = document.getElementById("grade-form");
    gradeForm .addEventListener("submit", (e) => {
        e.preventDefault();

        const studentId = document.getElementById("grade-student-select").value;
        const subject = document.getElementById("subject-select").value;
        const score = parseInt(document.getElementById("grade-score").value);
        const letterGrade = calculateLetterGrade(score);

        let grades = getGrades();

        const newGradeRecord = {
            studentId,
            subject,
            score,
            letterGrade,
        };
        grades.push(newGradeRecord);
        saveGrades(grades);
        loadGradesTable();
        gradeForm.reset();
        console.log("Grade saved successfully!", grades);
    });
});