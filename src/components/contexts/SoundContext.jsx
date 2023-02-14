import { useState, useEffect, createContext } from 'react';
import { Howl, Howler } from 'howler';
import themeRoundSound from '../../assets/audio/theme_round.mp3'
import winSound from '../../assets/audio/response_win.mp3'
import loseSound from '../../assets/audio/response_lose.mp3'
import cheerSound from '../../assets/audio/response_cheer.mp3'
import booSound from '../../assets/audio/response_boo.mp3'
import correctSound from '../../assets/audio/reveal_answer.mp3'
import wrongSound from '../../assets/audio/response_wrong.mp3'
// import tickSound from '../../assets/audio/tick.mp3'
import timerEndSound from '../../assets/audio/timer_end.mp3'

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
    console.log(soundObjects)

    const soundFunctions = {
        play: (soundName) => {
            Howler.stop();
            console.log(soundObjects[soundName])
            soundObjects[soundName].play();
        },
    }

    return (
        <SoundContext.Provider value={[soundFunctions]}>
            {children}
        </SoundContext.Provider>
    )
}