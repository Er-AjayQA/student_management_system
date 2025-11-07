# 🎓 Student Management System (Mini LMS)

A full-stack **Student Management System / Mini Learning Management System (LMS)** that allows administrators to manage students, courses, grades, and attendance, while students can view their course data, upload assignments, and track academic progress.

Built with **React**, **Express.js**, **MySQL**, and secured with **JWT-based authentication**.

---

## 📌 Features

### ▸ Admin Panel (Protected)

- Add/edit/delete **students**, **courses**, **grades**, and **attendance**
- Assign **students** to **courses**
- View all **assignment submissions**
- View student performance and attendance statistics

### ▸ Student Portal

- View enrolled **courses** and **grades**
- Upload and manage **assignment submissions**
- Track personal **attendance** and performance

---

## 🧰 Tech Stack

| Layer        | Technology                 |
| ------------ | -------------------------- |
| Frontend     | React, React Router, Axios |
| Backend      | Node.js, Express.js        |
| Database     | MySQL                      |
| Auth         | JWT (JSON Web Tokens)      |
| Styles       | CSS / Tailwind (optional)  |
| File Uploads | Local / AWS S3 (optional)  |

---

## 🗃️ Database Models

<details>
<summary>Click to expand</summary>

| Table         | Description                         |
| ------------- | ----------------------------------- |
| `users`       | Student and admin user info         |
| `courses`     | Courses offered                     |
| `enrollments` | Students enrolled in courses        |
| `grades`      | Grades given per course per student |
| `attendance`  | Daily attendance tracking           |
| `assignments` | Student assignment uploads          |

</details>

---

## ⚙️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/student-management-system.git
cd student-management-system
```
