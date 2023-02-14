import { useState, useContext, useEffect } from 'react'
import { Box, Stack, Flex, Button, Text,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverArrow,
} from "@chakra-ui/react"
import { MotionBox } from '../MotionComponents'
import { ConfigContext } from '../contexts/ConfigContext'
import { SoundContext } from '../contexts/SoundContext';

function NormalAnswer({index, answer, onClick, ...props}) {
    const [showAnswer, setShowAnswer] = useState(false);
    const [config, configFunctions] = useContext(ConfigContext);
    const [soundFunctions] = useContext(SoundContext);

    useEffect(() => {
        setShowAnswer(false)
    }, [config.currentPage, config.currentRound])

    // const [revealSoundObject, setRevealSoundObject] = useState(new Howl({
    //     src: [revealSound],
    //     autoplay: false,
    //     loop: false,
    //     volume: 1,
    // }))
    
    return (
        <Box pos='relative' w='100%' h='20%'
            bg="#adadad"
            borderRadius='1em'
            {...props}
        >
            {/* Hidden */}
            {answer && <>
                <MotionBox pos='absolute' w='100%' h='100%' cursor='pointer'
                    bg='#fcd71c' _hover={{ background: '#fadd4d' }} borderRadius='1em'
                    boxShadow='inset 0em 0.4em 0.2em 0 rgba(255,255,255,0.5), inset 0em -0.4em 0.2em 0 rgba(0,0,0,0.5)'
                    variants={{
                        show: {
                            opacity: 1
                        },
                        hide: {
                            opacity: 0,
                        }
                    }}
                    initial="show"
                    animate={showAnswer ? 'hide' : 'show'}
                    transition= {{
                        duration: 0.5,
                        ease: "easeInOut"
                    }}
                    onClick={() => {
                        setShowAnswer(true);
                        soundFunctions.play('correct')
                        onClick(answer.points);
                    }}
                >
                    <Stack h='100%' w='100%' align='center' justify='center' >
                        <Button borderRadius='full'
                            color='white' bg='#6b6a6a' _hover={{ bg: '#969696' }}
                            fontSize={['lg', 'xl', '3xl']} fontWeight='extrabold'
                        >
                            {index + 1}
                        </Button>
                    </Stack>
                </MotionBox>

                {/* Answer */}
                <Popover isLazy arrowSize={24} arrowShadowColor='black' offset={[0, -0]} >
                    <PopoverTrigger>
                        <MotionBox pos='absolute' w='100%' h='100%' cursor='pointer'
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
                            animate={showAnswer ? 'show' : 'hide'}
                            transition= {{
                                duration: 0.5,
                                ease: "easeInOut"
                            }}
                        >
                            <Flex w='100%' h='100%' align='center' justify='center' >
                                <Text w='80%' h='100%' borderLeftRadius='0.8em' borderRightRadius='0'
                                    fontSize={['sm', 'xl', '2xl', '2xl', '3xl']} fontWeight='extrabold' color='white' wordBreak='break-word' align='center' p={1}
                                    textOverflow='ellipsis' overflow='hidden' whiteSpace='nowrap'
                                    bg="linear-gradient(to top, rgba(0,0,0,1) 0%, #333333 65%, #828282 100%)" _hover={{ opacity: 0.8 }}
                                >
                                    {answer.answer}
                                </Text>
                                <Text w='30%' h='100%' borderRightRadius='0.6em' overflow='visible' whiteSpace='nowrap'
                                    fontSize={['sm', '2xl', '2xl', '2xl', '3xl']} fontWeight='extrabold' color='white' wordBreak='break-word' align='center' p={1}
                                    bg="#e61c1c"
                                >
                                    {answer.points}
                                </Text>
                            </Flex>
                        </MotionBox>
                    </PopoverTrigger>
                    <PopoverContent minWidth='40vw' maxWidth='80vw' borderRadius='2em' border='2px solid black' >
                        <PopoverArrow borderTop='2px solid black' />
                        <PopoverHeader fontSize={['3xl', '3xl', '5xl']} fontWeight='extrabold' textAlign='center' borderBottomWidth={0} >
                            {answer.answer}
                        </PopoverHeader>
                    </PopoverContent>
                </Popover>
            </>}

        </Box>
    )
}

export default NormalAnswer;