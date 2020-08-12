// Create Courses Class

class Course {
    constructor(title, instructor, price, description) {
        this.title = title;
        this.instructor = instructor;
        this.price = price;
        this.description = description;
    }
}

class CourseUi {
    static showCourses() {
        const storedCourses = [
            {
                title: "Html5 Course",
                instructor: "John",
                price: "500",
                description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, labore."
            },
            {
                title: "Css3 Course",
                instructor: "Jack",
                price: "600",
                description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, labore."
            },
            {
                title: "Javascript Course",
                instructor: "Mark",
                price: "2000",
                description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, labore."
            }
    ];
        //const courses = storedCourses;
        /*
        courses.forEach((course) => {
          CourseUi.addCourseToView(course);
        });*/
        for (const course of storedCourses) {
            CourseUi.addCourseToView(course);
        }
    }
    static addCourseToView(course) {
        const list = document.getElementById("course-list");
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${course.title}</td>
        <td>${course.instructor}</td>
        <td>${course.price}</td>
        <td>${course.description}</td>
        <td>
          <a href="#" class="btn btn-danger delete-course"><i class="fas fa-trash-alt"></i></a>
        </td>
    `;
        list.appendChild(row);
    }
    // Add Method To Delete Course
    static deleteCourse(item) {
        if (item.classList.contains('delete-course')) {
            item.parentElement.parentElement.remove();
        }
    }

    // Method To Show Message
    static showMessage(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const formSection = document.querySelector('.form-section');
        const form = document.querySelector('#courses-form');
        formSection.insertBefore(div, form);
        // Remove Alert After 5 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 5000);
    }
    // Method To Clear Inputs After Submit Data
    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#instructor').value = '';
        document.querySelector('#price').value = '';
        document.querySelector('#description').value = '';
    }
}
// Display All Courses
document.addEventListener('DOMContentLoaded', CourseUi.showCourses);

// Add New Course
document.getElementById("courses-form").addEventListener('submit', (val) => {
    // Prevent Default submit
    val.preventDefault();
    //Get Form Values
    const title = document.getElementById("title").value;
    const instructor = document.getElementById("instructor").value;
    const price = document.getElementById("price").value;
    const description = document.getElementById("description").value;
    // Form Validation
    if (title === '' || instructor === '' || price === '' || description === '') {
        CourseUi.showMessage("Cann't submit null fields ", "danger");
    } else if (price < 500) {
        CourseUi.showMessage("Price Is Very low , You Cannot Sell Any of Courses Less Than 500", "danger");
    } else {
        // Take Instance From Course Class
        const course = new Course(title, instructor, price, description);
        //console.log(course);
        // Add Course To table
        CourseUi.addCourseToView(course);
        // show Success Message 
        CourseUi.showMessage("Course Added Successfully", "success");
        // Clear Input Fields
        CourseUi.clearFields();
    }
});

// Delete Course
document.getElementById("course-list").addEventListener('click', (val) => {
    //console.log(val.target);
    CourseUi.deleteCourse(val.target);
    //  Add Success Message
    CourseUi.showMessage("Course Deleted Successfully", 'warning');
});