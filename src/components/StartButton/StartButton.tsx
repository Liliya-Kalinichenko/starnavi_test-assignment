import { Mode } from '../../types/Mode';
import './StartButton.scss';

type Props = {
  onStart: () => void,
  selectedMode: Mode | null,
  isGameStarted: boolean
}

export const StartButton: React.FC<Props> = ({ onStart, selectedMode, isGameStarted }) => {
  return (
    <button 
      type="button"
      className="StartButton"
      onClick={onStart}
      disabled={!selectedMode}
    >
      {isGameStarted ? 'Restart': 'Start'}
    </button>
  );
};
