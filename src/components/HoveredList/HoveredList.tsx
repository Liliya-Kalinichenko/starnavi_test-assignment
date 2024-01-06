import { Cell } from '../../types/Cell';
import './HoveredList.scss';

type Props = {
  grid: Cell[][],
  isCellHovered: boolean,
}

export const HoveredList: React.FC<Props> = ({ grid, isCellHovered }) => {
  return (
    <div className="HoveredList">
      <h2 className="HoveredList__title">Hovered Cells:</h2>
      
      {!isCellHovered ? (
        <p className="HoveredList__info">Lets hover some cells!</p>
      ) : (
        <ul className="HoveredList__content">
          {grid.map((rows) =>
            rows.map((cell) => {
              if (cell.isHovered) {
                const row = cell.id.split('-')[0];
                const col = cell.id.split('-')[1];

                return (
                  <li key={cell.id} className="HoveredList__content-item">
                    {`Row: ${row} Col: ${col}`}
                  </li>
                )
              }
            })
          )}
        </ul>
      )}
    </div>
  );
};
