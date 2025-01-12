# CutmeApp

CutmeApp is an Angular-based web application that includes authentication features and a dashboard interface.

## Features

- User Authentication System
- Dashboard Interface
- Responsive Navigation Bar
- Auto-logout functionality for expired sessions

## Prerequisites

- Node.js (Latest LTS version recommended)
- Angular CLI version 19.0.7
- A modern web browser

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd cutme-app
```

2. Install dependencies:
```bash
npm install
```

## Development

To start the development server:

```bash
ng serve
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Project Structure

The main components of the application include:

- `AppComponent`: Root component with authentication token validation
- `LoginComponent`: Handles user authentication
- `DashboardComponent`: Main dashboard interface
- `HomeComponent`: Home page component
- `NavbarComponent`: Navigation bar with authentication status

## Authentication

The application includes an authentication system that:
- Manages user login/logout
- Automatically checks token validity every 5 minutes
- Implements automatic logout when the token expires

## Testing

### Unit Tests

Run unit tests via [Karma](https://karma-runner.github.io):

```bash
ng test
```

### End-to-End Tests

Run end-to-end tests:

```bash
ng e2e
```

Note: You'll need to set up your preferred e2e testing framework as it's not included by default.

## Building for Production

To build the project:

```bash
ng build
```

The build artifacts will be stored in the `dist/` directory.

## Additional Commands

Generate new components:
```bash
ng generate component component-name
```

For more Angular CLI commands:
```bash
ng generate --help
```

## Further Help

For more information on the Angular CLI, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## License

[Add your license information here]