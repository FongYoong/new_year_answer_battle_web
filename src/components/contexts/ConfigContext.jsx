import { useState, useEffect, useMemo, createContext, useContext } from 'react';
import { SoundContext } from '../contexts/SoundContext'
import { default_rounds } from '../../lib/rounds'
import { load_config_local_storage, save_config_local_storage, load_config_file, save_config_file } from '../../lib/config';

export const initial_config = {
    currentPage: 'home', // home, round, editor
    currentRound: undefined, // index of rounds
    rounds: default_rounds, // replace with rounds loaded from elsewhere
    points: {
      a: 0, // number
      b: 0 // number
    },
    // history: undefined // []
    // don't care about history first?
}

export const ConfigContext = createContext();

export function generateConfigFunctions (config, setConfig, soundFunctions) {
    return {
        viewHome: () => {
            soundFunctions.play('themeRound')
            setConfig((config) => {
                return  {
                    ...config,
                    currentPage: 'home',
                }
            })
            // only use this (prevState) => {} pattern in viewHome because need to ensure updated data when the Editor invokes viewHome after saving
        },
        viewEditor: () => {
            setConfig({
                ...config,
                currentPage: 'editor',
            })
        },
        // viewSettings: () => {
        //     setConfig({
        //         ...config,
        //         currentPage: 'settings',
        //     })
        // },
        playGame: () => {
            // Reset game state to default
            soundFunctions.play('themeRound')
            setConfig({
                ...config,
                currentPage: 'round',
                currentRound: 0,
                points: {
                  a: 0,
                  b: 0
                },
            })
        },
        resumeGame: () => {
            soundFunctions.play('themeRound')
            setConfig({
                ...config,
                currentPage: 'round',
            })
        },
        nextRound: () => {
            let nextRound;
            if (config.currentRound !== undefined) {
                soundFunctions.play('win')
                nextRound = (config.currentRound < config.rounds.length - 1) ? config.currentRound + 1 : config.currentRound
            }
            else {
                soundFunctions.play('themeRound')
                nextRound = 0;
            }
            setConfig({
                ...config,
                currentPage: 'round',
                currentRound: nextRound
            })
        },
        previousRound: () => {
            soundFunctions.play('themeRound')
            setConfig({
                ...config,
                currentPage: config.currentRound == 0 ? 'home' : 'round',
                currentRound: config.currentRound == 0 ? 0 : config.currentRound - 1
            })
        },
        jumpToRound: (round_index) => {
            soundFunctions.play('themeRound')
            if (round_index == 'home') {
                setConfig({
                    ...config,
                    currentPage: 'home',
                })
            }
            else {
                setConfig({
                    ...config,
                    currentPage: 'round',
                    currentRound: round_index
                })
            }
        },
        changePoints : (team, new_points) => {
            setConfig({
                ...config,
                points: {
                    ...config.points,
                    [team]: new_points >= 0 ? new_points : 0
                }
            })
        },
        setNewConfig: (newConfig) => {
            setConfig(newConfig)
        },
        saveFile: () => {
            return save_config_file(config);
        },
        loadFile: async() => {
            const data = await load_config_file();
            setConfig(data);
        }
    }
}

export const ConfigProvider = ({children}) => {
    const [config, setConfig] = useState(initial_config);
    const [configLoaded, setConfigLoaded] = useState(false);
    const [soundFunctions] = useContext(SoundContext);
    const configFunctions = useMemo(() => generateConfigFunctions(config, setConfig, soundFunctions), [config, setConfig])
    
    useEffect(() => {
        if (configLoaded) {
            // save to local storage if changed
            console.log('config saved')
            console.log(config)
            save_config_local_storage(config)
        }

    }, [configLoaded, config])

    useEffect(() => {
        // load config from local storage if it exists
        const result = load_config_local_storage()
        if (result) {
            console.log("Found config in local storage")
            console.log(result)
            setConfig(result)
        }
        setConfigLoaded(true)
    }, [])

    useEffect(() => {
        function handleKeyDown(e) {
            if (config.currentPage == 'round' && config.currentRound !== undefined) {
                if (e.key == "ArrowLeft") {
                    configFunctions.previousRound();
                }
                else if (e.key == "ArrowRight") {
                    configFunctions.nextRound();
                }
            }
        }
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, [configFunctions])

    return (
        <ConfigContext.Provider value={[config, configFunctions]}>
            {children}
        </ConfigContext.Provider>
    )
}