# Pokémon App

## Overview
This is a Pokémon catalog application built with **Angular 17**. The project utilizes **NgRx** for state management, **lazy loading** for optimizing performance, and **signals** for efficient reactivity. The UI is styled with **Angular Material**, and testing is done using **Jest**.

## Features
- **Pokémon List**: Displays a paginated list of Pokémon with their images and types.
- **Pokémon Details**: View detailed stats, abilities, and types of a selected Pokémon.
- **Filtering**: Search Pokémon by **name** and **type**.
- **State Management**: Uses **NgRx** to manage the application state.
- **Lazy Loading**: Routes and modules are lazily loaded for performance optimization.
- **Signals**: Uses Angular's **signal API** for reactive UI updates.
- **Theming**: Background gradients are dynamically assigned based on Pokémon types.
- **Testing**: Unit tests implemented with **Jest**.

## Technologies Used
- **Angular 17** - Framework
- **NgRx** - State Management
- **Angular Material** - UI Components
- **Jest** - Unit Testing
- **RxJS** - Reactive programming
- **Lazy Loading** - Performance optimization
- **Signals API** - Efficient reactivity

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/pokemon-app.git
   cd pokemon-app
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Run the development server:
   ```sh
   npm start
   ```

4. Run tests:
   ```sh
   npm test
   ```

## Folder Structure
```
src/
 ├── app/
 │   ├── pages/
 │   │   ├── pokemon-list/    # Pokémon list component
 │   │   ├── pokemon-detail/  # Pokémon detail component
 │   ├── store/               # NgRx store (actions, reducers, selectors, effects)
 │   ├── services/            # API services
 │   ├── models/              # TypeScript interfaces and models
 │   ├── utils/               # Utility functions (e.g., gradients)
 ├── assets/                  # Static assets
 ├── environments/            # Environment configurations
```

## API
This app fetches Pokémon data from the [PokéAPI](https://pokeapi.co/).

- Get Pokémon list:
  ```
GET https://pokeapi.co/api/v2/pokemon?limit=18&offset=0
  ```
- Get Pokémon details:
  ```
GET https://pokeapi.co/api/v2/pokemon/{id}
  ```

## Contribution
Feel free to contribute! Fork the repository, create a new branch, make your changes, and submit a pull request.

## License
MIT License

