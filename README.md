# Can't Stop Game

## Overview
"Can't Stop" is a fun and engaging board game designed for one to four players. The objective of the game is to be the first player to reach the finish line by strategically rolling dice and making decisions based on the outcomes.

## Project Structure
The project is structured as follows:

```
cant-stop-game
├── public
│   └── index.html          # Main HTML file for the application
├── src
│   ├── assets              # Directory for static assets (images, fonts, etc.)
│   ├── components          # Contains React components for the game
│   │   ├── Board.tsx
│   │   ├── PlayerPanel.tsx
│   │   ├── Dice.tsx
│   │   └── GameControls.tsx
│   ├── hooks               # Custom hooks for game logic
│   │   └── useGameLogic.ts
│   ├── pages               # Pages of the application
│   │   └── Home.tsx
│   ├── types               # TypeScript types and interfaces
│   │   └── index.ts
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Entry point for the React application
│   └── index.css           # Global CSS styles
├── package.json            # npm configuration file
├── tsconfig.json           # TypeScript configuration file
└── vite.config.ts          # Vite configuration file
```

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm (Node package manager)

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd cant-stop-game
   ```
3. Install the dependencies:
   ```
   npm install
   ```

### Running the Application
To start the development server, run:
```
npm run dev
```
Open your browser and navigate to `http://localhost:3000` to see the application in action.

## Game Rules
1. Players take turns rolling dice.
2. Based on the dice results, players can choose to advance their markers on the board.
3. Players must strategize their moves to maximize their chances of winning.
4. The first player to reach the finish line wins the game.

## Future Enhancements
- Implement AI opponents to allow single-player mode.
- Add more visual elements and animations to enhance the user experience.

## License
This project is licensed under the MIT License.