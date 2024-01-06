import React, { useState, useEffect } from 'react';
import './App.scss';
import { BASE_URL } from './helpers/constats';
import { Cell } from './types/Cell';
import { Mode } from './types/Mode';
import { ModeSelect } from './components/ModeSelect';
import { Grid } from './components/Grid';
import { HoveredList } from './components/HoveredList/HoveredList';
import { StartButton } from './components/StartButton';
import { ErrorModal } from './components/ErrorModal/ErrorModal';


const App: React.FC = () => {
  const [modes, setModes] = useState<Mode[]>([]);
  const [selectedMode, setSelectedMode] = useState<Mode | null>(null);
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isError, setIsError] = useState(false);

  const isCellHovered = grid.some(rows => 
    rows.some(cell => cell.isHovered));

  useEffect(() => {
    fetch(BASE_URL)
      .then((response) => response.json())
      .then((data: Mode[]) => setModes(data.slice(0, 3)))
      .catch(() => {
        setIsError(true)
      })
  }, []);

  useEffect(() => {
    setIsGameStarted(false);

    if (selectedMode) {
      const newGrid = Array.from({ length: selectedMode.field}, (_, row) =>
        Array.from({ length: selectedMode.field }, (_, col) => ({
          id: `${row + 1}-${col + 1}`,
          isHovered: false,
        }))
      );

      console.log('Generated grid:', newGrid);
      setGrid(newGrid);
    }

  }, [selectedMode]);

  console.log('StateGrid:', grid);

  const handleStartGame = () => {   
    
    setIsGameStarted(true);
    
    if (!isCellHovered) {
      return;
    }

    const clearGrid = grid.map(rows => 
      rows.map(cell => 
        cell.isHovered 
          ? {...cell, isHovered: false}
          : cell
    ))

    setGrid(clearGrid);    
  }

  return (
    <div className="App">
      <main className="App__main container">
        <div className="App__top">
          <div className="App__logo"></div>
          <h1 className="App__title">{`Hover Game`}</h1>          
        </div>        
          {isError && <ErrorModal onClose={setIsError}/>}
        
          <div className="App__game">
            <div className="App__game-control">
              <ModeSelect 
                modes={modes}
                currentOption={selectedMode} 
                onSelect={setSelectedMode} 
              />
              <StartButton 
                onStart={handleStartGame} 
                selectedMode={selectedMode}
                isGameStarted= {isGameStarted} 
              />
            </div>

            {!!selectedMode && isGameStarted && (
              <div className="App__game-content">
                <Grid grid={grid} setGrid={setGrid} />
                <HoveredList grid={grid} isCellHovered={isCellHovered}/>
              </div>
            )}
          </div>
      </main>
    </div>
  );
};

export default App;
