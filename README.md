# TaskFlow – Kanban Board Layout

Week 1 project for the Full Stack Engineer Virtual Internship at SkillMe.

A static Kanban board built with HTML and CSS. It has three columns (To Do, In Progress, Done) with sample task cards. JavaScript will be added in Week 2.

## Screenshots

Kanban Board (board.png)

## Features

- Header with app name and an "Add task" form (text input, priority select, button). The form does nothing yet.
- Three columns laid out side by side with CSS Grid
- Task counts shown in each column heading
- Reusable task card styles shared by every card
- Colour-coded priority labels (Low, Medium, High) using CSS variables
- Responsive layout: columns stack vertically on screens narrower than 700px

## Tech Used

- HTML5 (semantic elements)
- CSS3 (Grid, custom properties, media queries)

## Project Structure

```
.
├── index.html
├── style.css
├── script.js      (empty, used in Week 2)
└── README.md
```

## How to Run

1. Clone the repository:
   ```
   git clone https://github.com/snehat1806-png/TaskFlow-Kanban-Board.git
   ```
2. Open `index.html` in your browser.

## What I Learned

- Structuring a page with semantic HTML and simple class names
- Using CSS Grid for side-by-side columns
- Styling reusable components with one set of CSS rules
- Using CSS variables for priority colours

## Next Steps

- Add tasks with JavaScript
- Move cards between columns
- Save tasks in the browser

## Author

Sneha Tiwari