import React from 'react';

interface CharacterProps {
  characterType?: 'boy' | 'girl';
}

export const Character = ({ characterType = 'boy' }: CharacterProps) => {
  const boySprite = "https://i.imgur.com/3l8WHkY.png";
  const girlSprite = "https://i.imgur.com/JAs4P2x.png"; 

  return (
    <div className="flex justify-center mt-4">
      <img
        src={characterType === 'boy' ? boySprite : girlSprite}
        alt="Pixel art character"
        className="pixelated-image w-24 h-24"
      />
    </div>
  );
};