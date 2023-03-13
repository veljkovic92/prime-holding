PRIME HOLDING

1. Introduction

The project is purposely built for the company "Prime Holding" and it's theme is an App which allows the user to manipulate with employees and tasks data.

2. Structure of the App

The App contains following pages:

- New Employee,
- Employees,
- Tasks,
- Update Employee,
- Update Task,
- Statistics

The Project’s hierarchy is as follows:

- public folder
- src (source folder) that contains:

1. “components” folder with: EmployeeItem, layout, TaskForm, TaskItem, TaskList, ui, UpdateEmployeeForm, UpdateTaskForm, UserForm folders. Each folder contains branching folder contains a .tsx and .module.scss file. Separation of logic and readability achieved by separation of concerns.
2. “firebase” folder with fireabase initialization logic
3. “pages” folder with every App page: Employees, Home, Statistics, Tasks, UpdateEmployee, UpdateTask. Each folder contains branching folder contains a .tsx and .module.scss file.
4. “types” folder containing shared App types
5. App.tsx
6. index.css
7. index.tsx

3) Content of the App as of 13/03/2023:

- “New Employee” page allows the user to create a new employee by adding its full name, email, phone, birth date, salary. First two are mandatory.
- “Employees” page that renders the list of employees with each containing three buttons. One main “tasks” which routes the user to the “Tasks Page” for more informations and two additional buttons “update” and “delete .
- “Tasks” page meets the user with header of the current employee’s name. Below it is the “New Task” button that opens the form for new task creation. Lastly, there is the list of tasks where each task can be separately checked as completed, edited and deleted.
- “Update Employee” page contains employee’s name and form for updating each individual employee information.
- “Update Task” page contains user’s name and chosen task as well as a form for updating task
- “Statistics” page contains variety of employees and tasks data such as: total employees count, total tasks count, tasks completed count, busiest employee name and top five employees with completed and not completed tasks data.

4. Additional Functionalities:

- NavLink using react-router-dom improves the accessibility and adds visual highlight to the current content
- Verification on select form input fields with different logic based on used scenario and dynamic allowance for submit button
- Prepopulation of forms with already available data for ease of use
- Postpupulation of select employee and task item values based on availability of needed data (provides user feedback)
- URL params routing
- Dynamic additional buttons offering (to put visual accent on content)
- Two options for marking task as completed, either on button click (short) or complete task edit (long) – for easier accesss to most used feature of task manipulation
- New Task button shows/hides the task form (allows for automatic form handling)
- Rerouting on select buttons (ease of use/faster navigation)
- Statistics offer more diverse informations (key app data pulled in one place)
- Each “Top Five Employees” item has “drop-down” style element (for easier user focus and navigation)
- Header, Body, Footer as part of Layout “container” element (standard, familiar layout with nav links, body of content and footer

5. Technologies/Libraries/Frameworks/Packages:

- JavaScript,
- HTML,
- CSS (SASS),
- ReactJS,
- React Bootstrap
- React Router,
- React Icons
- Typescript
- Firebase
- React Hook Form
- React Icons
- UUID

6. Requirements to run the App:

1) Git Clone or download App,
2) Open the App in your preferred Code Reader (Project was built in Visual Studio Code),
3) Run "npm install" in your terminal,
4) Run "npm start"
