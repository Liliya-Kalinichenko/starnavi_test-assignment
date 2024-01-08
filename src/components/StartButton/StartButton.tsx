import { Mode } from '../../types/Mode';
import './StartButton.scss';

interface Props {
  onStart: () => void,
  selectedField: Mode | null,
  isGameStarted: boolean
}

export const StartButton: React.FC<Props> = ({ onStart, selectedField, isGameStarted }) => {
  return (
    <button 
      type="button"
      className="StartButton"
      onClick={onStart}
      disabled={!selectedField}
    >
      {isGameStarted ? 'Restart': 'Start'}
    </button>
  );
};
