import { useState, useRef, useContext, useMemo, useEffect } from 'react'
import { Flex, Stack, Image, Text, IconButton, Button,
Popover,
PopoverTrigger,
PopoverContent,
PopoverHeader,
PopoverBody,
PopoverArrow,
PopoverCloseButton,
} from "@chakra-ui/react"
import { ConfigContext } from '../contexts/ConfigContext'
import { SoundContext } from '../contexts/SoundContext'
import TypeIt from "typeit-react";
import { MotionBox } from '../MotionComponents'
import QuestionButton from './QuestionButton'
import NormalAnswer from './NormalAnswer'
import PartialScoreboard from './PartialScoreboard';
import Strikes from './Strikes';
import globeImage from "../../assets/images/globe.png"
import roundBacklights from "../../assets/images/round_backlights.gif"
import UnassignedPoints from './UnassignedPoints';
import DelayedUnmount from '../DelayedUnmount';

function NormalRound({index, round, ...props}) {
    const [config, configFunctions] = useContext(ConfigContext);
    const [soundFunctions] = useContext(SoundContext);
    const [currentPhase, setCurrentPhase] = useState('initial'); // initial, show_question, hide_question
    const [unassignedPoints, setUnassignedPoints] = useState(0);
    const [strikes, setStrikes] = useState(0);
    const questionTypingInstanceRef = useRef()

    const animate = useMemo(() => {
        if (config.currentPage != 'round' || config.currentRound === undefined || config.currentRound < index) {
            return 'right'
        }
        else if (config.currentRound > index) {
            return'left'
        }
        else {
            soundFunctions.play('themeRound')
            return 'show'
        }
    }, [config.currentPage, config.currentRound, index])

    useEffect(() => {
        setCurrentPhase('initial')
        setUnassignedPoints(0)
        setStrikes(0)
    }, [config.currentPage, config.currentRound])

    const onClickAnswer = (points) => {
        setUnassignedPoints(unassignedPoints + points);
    }

    const onClickStrike = () => {
        if (strikes < 3) {
            setStrikes(strikes + 1)
        }
        else {
            setStrikes(0)
        }
    }

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
                        <UnassignedPoints show={show} unassignedPoints={unassignedPoints} setUnassignedPoints={setUnassignedPoints} />
                        <PartialScoreboard show={show} roundIndex={index} ml={4} />
                    </Flex>
                    
                    {/* Initial globe and also the question */}
                    <Stack id={show?'normal_round_main':''} pos='relative' w='100%' h='100%' align='center' justify='center'
                        backgroundImage={roundBacklights} backgroundSize='contain' backgroundRepeat='no-repeat' backgroundPosition='center'
                    >
                        {/* Answer list */}
                        <MotionBox
                            pos='absolute' w='100%' h='110%'
                            variants={{
                                show: {
                                    opacity: 1,
                                    pointerEvents: 'all'
                                },
                                hide: {
                                    opacity: 0,
                                    pointerEvents: 'none'
                                }
                            }}
                            initial="hide"
                            animate={currentPhase == 'hide_question' ? 'show' : 'hide'}
                            transition= {{
                                duration: 0.5,
                                ease: "easeInOut"
                            }}
                        >
                            <Stack pos='relative' h='100%' w='100%' align='center' justify='center' >
                                <Flex pos='relative' h='80%' w='80%' align='center' justify='center'
                                    bg='rgba(0, 0, 0, 0.5)' borderRadius='0.5em'
                                >
                                    <Stack h='100%' w='100%' align='center' justify='center' p={1} >
                                        {[...round.answers.slice(0, 5), ...[...Array(5 - round.answers.slice(0, 5).length)].map(() => undefined)]
                                        .map((answer, index) => 
                                            <NormalAnswer key={index} index={index} answer={answer} onClick={onClickAnswer} />
                                        )}
                                    </Stack>
                                    <Stack h='100%' w='100%' align='center' justify='center' p={1} >
                                        {[...round.answers.slice(5), ...[...Array(5 - round.answers.slice(5).length)].map(() => undefined)]
                                        .map((answer, index) => 
                                            <NormalAnswer key={index} index={index + 5} answer={answer} onClick={onClickAnswer} />
                                        )}
                                    </Stack>
                                </Flex>
                            </Stack>
                        </MotionBox>

                        {/* Show Question section */}
                        <MotionBox
                            pos='absolute' w='100%' h='100%'
                            variants={{
                                show: {
                                    opacity: 1,
                                    pointerEvents: 'all'
                                },
                                hide: {
                                    opacity: 0,
                                    pointerEvents: 'none'
                                }
                            }}
                            initial="hide"
                            animate={currentPhase == 'hide_question' ? 'hide' : 'show'}
                            transition= {{
                                duration: 0.5,
                                ease: "easeInOut"
                            }}
                        >
                            <Stack pos='relative' h='100%' w='100%' align='center' justify='center' >
                                <Image
                                    pos='absolute'
                                    boxSize={['30vh', '40vh']}
                                    objectFit='contain'
                                    src={globeImage}
                                />
                                <MotionBox zIndex={1} pos='absolute' w='80%' h='80%' p={4}
                                    bg='white'
                                    variants={{
                                        show: {
                                            opacity: 0.9
                                        },
                                        hide: {
                                            opacity: 0,
                                        }
                                    }}
                                    initial="hide"
                                    animate={currentPhase == 'show_question' ? 'show' : 'hide'}
                                    transition= {{
                                        duration: 0.5,
                                        ease: "easeInOut"
                                    }}
                                >
                                    <Text
                                        fontSize={['2xl', '4xl', '5xl']} fontWeight='extrabold' color='black' wordBreak='break-word' textAlign='left'
                                        textShadow="black 1px 1px 2px"
                                    >
                                        <TypeIt
                                            options={{
                                                speed: 30,
                                                cursor: false
                                            }}
                                            getAfterInit={(instance) => {
                                                questionTypingInstanceRef.current = instance;
                                                return instance;
                                            }}
                                        />
                                    </Text>
                                </MotionBox>
                            </Stack>
                        </MotionBox>
                    </Stack>

                    {/* Question buttons and strikes*/}
                    <Flex pos='relative' align='center' justify='center' >
                        <QuestionButton id={show?'normal_round_show_question_button':''}
                            onClick={() => {
                                const typer = questionTypingInstanceRef.current
                                const text = round.question
                                if (typer.getQueue().getQueue().size <= 1) {
                                    [...text, ' '].forEach((c, index) => {
                                        typer.empty().type(
                                            text.slice(0, index) + `<span style="color: #ffd324;">${c}</span>` + text.slice(index + 1),
                                            { instant: true, delay: 30 }
                                        );
                                    });
                                    typer.flush();
                                }
                                setCurrentPhase('show_question');
                            }}
                        >
                            Show<br/>Question
                        </QuestionButton>
                        <QuestionButton id={show?'normal_round_hide_question_button':''}
                            onClick={() => {
                                setCurrentPhase('hide_question')
                            }}
                        >
                            Hide<br/>Question
                        </QuestionButton>
                        <Strikes show={show} ml={8} strikes={strikes} onClick={onClickStrike} />
                    </Flex>
                </Stack>
            </DelayedUnmount>
        </MotionBox>
    )
}

export default NormalRound;