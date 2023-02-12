import { useState, useEffect, useContext, useMemo } from 'react'
import { Stack, Flex, Text, IconButton, Button } from "@chakra-ui/react"
import { ConfigContext } from '../contexts/ConfigContext'
import { Howl, Howler } from 'howler';
import createCountdown from 'create-countdown'
// import tickSound from '../../assets/audio/tick.mp3'
import timerEndSound from '../../assets/audio/timer_end.mp3'

function Timer({timerSeconds, ...props}) {
    const [config, configFunctions] = useContext(ConfigContext);
    const [timerState, setTimerState] = useState('initial') // initial, run, end
    const [timerPause, setTimerPause] = useState(false)
    const [timerOutput, setTimerOutput] = useState(`${timerSeconds} s`)
    const timer = useMemo(() => {
        return createCountdown(
            {
                h: 0,
                m: 0,
                s: timerSeconds
            },
            {
                listen: ({hh, mm, ss}) => {
                    setTimerOutput(`${mm}:${ss}`);
                    // Howler.stop();
                    // tickSoundObject.play();
                },
                done: () => {
                    endTimer(true)
            }
        });
    }, [timerSeconds])

    // const [tickSoundObject, setTickSoundObject] = useState(new Howl({
    //     src: [tickSound],
    //     autoplay: false,
    //     loop: false,
    //     volume: 1,
    // }))
    const [timerEndSoundObject, setTimerEndSoundObject] = useState(new Howl({
        src: [timerEndSound],
        autoplay: false,
        loop: false,
        volume: 1,
    }))

    useEffect(() => {
        endTimer(false)
    }, [config.currentPage, config.currentRound])

    const startTimer = () => {
        timer.start()
        setTimerState('run')
    }

    const pauseResumeTimer = () => {
        if (timerPause) {
            timer.start()
        }
        else {
            timer.stop()
        }
        setTimerPause(!timerPause)
    }

    const endTimer = (playSound) => {
        timer.reset()
        setTimerState('initial')
        setTimerPause(false)
        if (playSound) {
            Howler.stop();
            timerEndSoundObject.play();
        }
    }

    return (
        <Stack spacing={1} align='center' justify='center' {...props}
            bg="rgba(0,0,0,0.7)" p={4} borderRadius='0.5em'
        >
            <Text color='white' fontWeight='extrabold' fontSize='2xl' >
                {timerOutput}
            </Text>
            {timerState === 'initial' &&
                <Button
                    onClick={startTimer}
                >
                    Start
                </Button>
            }
            {timerState === 'run' &&
                <Button
                    onClick={pauseResumeTimer}
                >
                    {timerPause ? 'Resume' : 'Pause'}
                </Button>
            }
            {timerState !== 'initial' &&
                <Button
                    onClick={() => endTimer(false)}
                >
                    Reset
                </Button>
            }
        </Stack>
    )
}

export default Timer;