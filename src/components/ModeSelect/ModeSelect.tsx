import React, { useState } from 'react';
import './ModeSelect.scss';
import { Mode } from '../../types/Mode';
import classNames from 'classnames';

interface Props {
  modes: Mode[],
  onSelect: (option: Mode) => void,
  currentOption: Mode | null,
}

export const ModeSelect: React.FC<Props> = ({modes, onSelect, currentOption}) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const handleBlur = (event: React.FocusEvent<HTMLButtonElement, Element>) => {
    if (event.relatedTarget?.className.includes('select-option')) {
      return;
    }

    setIsSelectOpen(false);
  };

  return (
    <div className="ModeSelect">
      <button
        type="button"
        className="ModeSelect__triger"
        onClick={() => setIsSelectOpen(!isSelectOpen)}
        onBlur={handleBlur}
      >
        {currentOption ? currentOption.name : 'Pick Mode'}

        <div className={classNames('ModeSelect__icon', {
          icon__rotate: isSelectOpen,
        })}
        />
      </button>

      {isSelectOpen && (
        <div className="ModeSelect__select">
          {modes.map((mode) => (
            <button
              type="button"
              onClick={() => {
                onSelect(mode)
                setIsSelectOpen(false)
              }}
              className="ModeSelect__select-option"
              key={mode.id}
            >
              {mode.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
