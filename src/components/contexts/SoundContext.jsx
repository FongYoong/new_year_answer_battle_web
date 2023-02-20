import { useState, useEffect, createContext } from 'react';
import { Howl, Howler } from 'howler';
import themeRoundSound from '@asset_themeRoundSound'
import winSound from '@asset_winSound'
import loseSound from '@asset_loseSound'
import cheerSound from '@asset_cheerSound'
import booSound from '@asset_booSound'
import correctSound from '@asset_correctSound'
import wrongSound from '@asset_wrongSound'
// import tickSound from '../../assets/audio/tick.mp3'
import timerEndSound from '@asset_timerEndSound'

export const SoundContext = createContext();

const sound_paths = {
    // Soundboard
    silence: undefined,
    win: winSound,
    lose: loseSound,
    cheer: cheerSound,
    boo: booSound,

    //Other sounds
    themeRound: themeRoundSound,
    correct: correctSound, // same as reveal sound
    wrong: wrongSound,
    timerEnd: timerEndSound,
    // tick: tickSound
}

const generateSoundObjects = (all_sounds) => {
    const objects = { }
    Object.keys(all_sounds).forEach((key) => {
        objects[key] = new Howl({
            src: [all_sounds[key]],
            autoplay: false,
            loop: false,
            volume: 1,
        })
    })
    return objects;
}

export const SoundProvider = ({children}) => {
    
    const [soundObjects, setSoundObjects] = useState(generateSoundObjects(sound_paths));

    const soundFunctions = {
        play: (soundName) => {
            Howler.stop();
            soundObjects[soundName].play();
        },
    }

    return (
        <SoundContext.Provider value={[soundFunctions]}>
            {children}
        </SoundContext.Provider>
    )
}