import cn from 'classnames';
import { Cell } from '../../types/Cell';
import './Grid.scss';

type Props = {
  grid: Cell[][],
  setGrid: (newGrid: Cell[][])=> void,
}

export const Grid: React.FC<Props> = ({ grid, setGrid }) => {
  const handleCellHover = (id: string) => {
    const newGrid = grid.map((rows) =>
      rows.map((cell) =>
        cell.id === id
          ? { ...cell, isHovered: !cell.isHovered }
          : cell
      )
    );

    setGrid(newGrid);
  };

  return (
    <div className="Grid">
      <div className="Grid__container">
        <div
          className="Grid__content"
          style={{ gridTemplateColumns: `repeat(${grid.length}, 35px)`}}
        >
          {grid.map((rows) =>
            rows.map((cell) => (
              <div className={cn('Grid__cell', {
                  hovered: cell.isHovered,
                })}
                key={cell.id}
                onMouseEnter={() => handleCellHover(cell.id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
