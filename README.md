# Budget Tracker App


BudgetBuddy is a simple CRUD application created to help users manage their finances efficiently.


**Table of Contents:**

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
- [Demo Video](#demo-video)

## Features

- User-friendly interface for easy interaction.
- Create, view, update, and delete transactions.
- Categorize transactions as income or expense.
- Create categories and assign them to your transactions.
- View total income, total expenses, and net income.
- Search and filter transactions by date, category, or keyword.

## Technologies Used

- **Frontend**: Angular 17, PrimeNG (UI component library)
- **Backend**: Spring Boot 3 (Java)
- **Database**: MySQL

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine
- [Angular CLI](https://angular.io/cli) installed globally
- [Java Development Kit (JDK)](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html) installed
- [Spring Boot](https://spring.io/projects/spring-boot) installed
- [MySQL](https://www.mysql.com/) installed locally

### Setup

1. Clone the repository.
2. Navigate to the client directory and run the following commands:

   ```bash
   cd budget-tracker-app/client
   npm i
   ng serve

3. Install MySQL and create a new database named budgetbuddy.
4. Configure the application to connect to the MySQL database by updating the `application.yml` file with your own credentials:

   ```yaml
   spring:
     datasource:
       url: jdbc:mysql://localhost:8889/budgetbuddy
       username: <your_mysql_username>
       password: <your_mysql_password>

5. Navigate to the server directory and and run the server

   ```bash
   ./mvnw spring-boot:run

## Demo Video
