import { useState, useRef, useContext, useMemo, useEffect } from 'react'
import { Flex, Stack, Image, Text, IconButton, Button } from "@chakra-ui/react"
import { ConfigContext } from '../contexts/ConfigContext'
import { MotionBox } from '../MotionComponents'
import PartialScoreboard from './PartialScoreboard';
import Timer from './Timer';
import LightningQuestion from './LightningQuestion';
import roundBacklights from "../../assets/images/round_backlights.gif"
// import UnassignedPoints from './UnassignedPoints';
import DelayedUnmount from '../DelayedUnmount';


function LightningRound({index, round, ...props}) {
    const [config, configFunctions] = useContext(ConfigContext);
    const [currentPhase, setCurrentPhase] = useState('initial'); // initial

    const animate = useMemo(() => {
        if (config.currentPage != 'round' || config.currentRound === undefined || config.currentRound < index) {
            return 'right'
        }
        else if (config.currentRound > index) {
            return'left'
        }
        else {
            return 'show'
        }
    }, [config.currentPage, config.currentRound, index])

    useEffect(() => {
        setCurrentPhase('initial')
    }, [config.currentPage, config.currentRound])

    const show = animate == 'show';

    return (
        <MotionBox
            pos='absolute' w='100%' h='100%'
            variants={{
                show: {
                    translateX: 0,
                    display: "inline-block"
                },
                left: {
                    translateX: '-100vw',
                    transitionEnd: { display: "none" }
                },
                right: {
                    translateX: '100vw',
                    transitionEnd: { display: "none" }
                }
            }}
            initial={false}
            animate={animate}
            transition= {{
                duration: 0.7,
                type: "tween",
                ease: "easeInOut"
            }}
            {...props}
        >
            <DelayedUnmount show={show} delay={1100} >
                <Stack spacing={0} w='100%' h='100%' align='center' justify='center'>
                    <Flex pos='relative' align='center' >
                        {/* <UnassignedPoints unassignedPoints={unassignedPoints} setUnassignedPoints={setUnassignedPoints} /> */}
                        <PartialScoreboard show={show} roundIndex={index} />
                        <Timer show={show} timerSeconds={round.time} ml={4} />
                    </Flex>
                    
                    <Stack pos='relative' w='80%' h='100%' py={1} align='center' justify='center'
                        backgroundImage={roundBacklights} backgroundSize='contain' backgroundRepeat='no-repeat' backgroundPosition='center'
                    >
                        {/* Answer list */}
                        <Text bg='yellow' p={[1, 2]} borderRadius='0.5em'
                            fontSize={['xl', '2xl', '3xl']} fontWeight='bold' color='black' textAlign='center'
                        >
                            How many can you get right in 1 minute?
                        </Text>
                        <Flex id='lightning_round_main' pos='relative' h='100%' w='100%' align='center' justify='center'
                            bg='rgba(0, 0, 0, 0.5)' borderRadius='0.5em'
                        >
                            <Stack h='100%' w='100%' align='center' justify='center' p={1} >
                                {[...round.questions.slice(0, 5), ...[...Array(5 - round.questions.slice(0, 5).length)].map(() => undefined)]
                                .map((question, index) => 
                                    <LightningQuestion key={index} index={index} question={question} />
                                )}
                            </Stack>
                            <Stack h='100%' w='100%' align='center' justify='center' p={1} >
                                {[...round.questions.slice(5), ...[...Array(5 - round.questions.slice(5).length)].map(() => undefined)]
                                .map((question, index) => 
                                    <LightningQuestion key={index} index={index + 5} question={question} />
                                )}
                            </Stack>
                        </Flex>
                    </Stack>
                </Stack>
            </DelayedUnmount>
        </MotionBox>
    )
}

export default LightningRound;