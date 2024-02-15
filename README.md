# Simple CRUD App

This is a basic CRUD (Create, Read, Update, Delete) application built with TypeScript. It provides a simple API for managing data.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/dmitrymitrakhovich/simple-crud-api.git
```

2. Navigate to the project directory:

```bash
cd simple-crud-app
```

3. Install dependencies:

```bash
npm install
```

4. Switch to the develop branch:

```bash
git checkout develop
```

## Usage

### Production

To run the application in production mode:

```bash
npm run start:prod
```

This command will transpile TypeScript to JavaScript using tsc and then start the application with node dist/index.js.

### Development

For development mode, you can use the following command:

```bash
npm run start:dev
```

This command uses nodemon to watch for file changes and automatically restarts the server during development.

### Linting

To lint the code and check for code style violations, use:

```bash
npm run lint
```

To automatically fix linting issues, you can run:

```bash
npm run lint:fix
```
