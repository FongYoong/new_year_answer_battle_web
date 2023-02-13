import { useState, useEffect, useMemo, createContext } from 'react';
import { default_rounds } from '../../lib/rounds'
import { load_config_local_storage, save_config_local_storage } from '../../lib/config';

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

export function generateConfigFunctions (config, setConfig) {
    return {
        viewHome: () => {
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
        viewSettings: () => {
            setConfig({
                ...config,
                currentPage: 'settings',
            })
        },
        playGame: () => {
            // Reset game state to default
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
            setConfig({
                ...config,
                currentPage: 'round',
            })
        },
        nextRound: () => {
            let nextRound;
            if (config.currentRound !== undefined) {
                nextRound = config.currentRound + 1
            }
            else {
                nextRound = 0;
            }
            setConfig({
                ...config,
                currentPage: 'round',
                currentRound: nextRound
            })
        },
        previousRound: () => {
            setConfig({
                ...config,
                currentPage: config.currentRound == 0 ? 'home' : 'round',
                currentRound: config.currentRound == 0 ? 0 : config.currentRound - 1
            })
        },
        jumpToRound: (round_index) => {
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
        // jumpToPage : (nextPage) => {
        //     setConfig({
        //         ...config,
        //         currentPage: nextPage
        //     })
        // },
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
        }
    }
}

export const ConfigProvider = ({children}) => {
    const [config, setConfig] = useState({
        ...initial_config,
        rounds: []
    });
    const [configLoaded, setConfigLoaded] = useState(false);
    const configFunctions = useMemo(() => generateConfigFunctions(config, setConfig), [config, setConfig])
  
    // const [showPresenter, setShowPresenter] = useState(false);
  
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
  

    return (
        <ConfigContext.Provider value={[config, configFunctions]}>
            {children}
        </ConfigContext.Provider>
    )
}