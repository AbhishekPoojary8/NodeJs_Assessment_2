**Node Js Assessment 2**

Node Js with express server with mongodb database.

**Dependency**

Nodemon for server side scripting.

dotenv to handle env file in the application.

body-parser to parse the json body.

moment-timezone for date and time handling.

**Steps to start server.**

npm install

npm start 

**Api's**

http://localhost:3000/schedule

To schedule message

body:

{

  "message": "Reminder: Meeting at 10 AM",
  
  "day": "2024-08-15",
  
  "time": "10:00"  
  
}

**Task 1**

Constantly monitor cpu performance if it execed's 70 percent automatically re-starts the application.

**Task 2**

Takes the the date and time for a message and upload the same to the database.
