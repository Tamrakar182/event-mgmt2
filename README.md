### Event Management Task

This is the task of Young Innovations Internship for Backend development. I have decided to do the project in Nextjs to tightly integrate both the frontend and backend in a single repository.

## Features

- CRUD for an event management web app
- Filtering API (TODO)
- Login System (TODO)
- Frontend and Backend data validation

## Requirements

In order to run the project, you need to have node installed on your machine.

## Steps to run

1. Clone the repository
```shell
git clone
```

2. Install all the dependencies
```shell
npm install
```

3. Run the development server
```shell
npm run dev
```

## Folder structure

The project structure is of a simple Next 14 project. 

- All the frontend and api routes are in the app directory.
- Components hold resuable components
- Context holds all the context providers
- Hooks holds all the client side reusuable hooks
- Sections hold all the page layouts
- Types hold all the necessary data types and backend schemas
- Utils hold some utilary functions

## Tests

I have written some tests for testing the backend using Jest. Individual tests are put in their respective api route folder.
To run the tests simply run

```shell
npm run test
```