import { useState, useContext, useEffect } from 'react'
import { Box, Stack, Flex, IconButton, Button, Text,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverArrow,
} from "@chakra-ui/react"
import { MotionBox } from '../MotionComponents'
import { ConfigContext } from '../contexts/ConfigContext'
import { SoundContext } from '../contexts/SoundContext';
import { AiOutlinePlus } from 'react-icons/ai'
import { ImCross } from 'react-icons/im'

function LightningQuestion({index, question, ...props}) {
    const [showQuestion, setShowQuestion] = useState(false);
    const [questionStatus, setQuestionStatus] = useState(undefined); // undefined, correct, wrong
    const [config, configFunctions] = useContext(ConfigContext);
    const [soundFunctions] = useContext(SoundContext);

    useEffect(() => {
        setShowQuestion(false)
        setQuestionStatus(undefined)
    }, [config.currentPage, config.currentRound])

    // const [correctSoundObject, setCorrectSoundObject] = useState(new Howl({
    //     src: [correctSound],
    //     autoplay: false,
    //     loop: false,
    //     volume: 1,
    // }))
    // const [wrongSoundObject, setWrongSoundObject] = useState(new Howl({
    //     src: [wrongSound],
    //     autoplay: false,
    //     loop: false,
    //     volume: 1,
    // }))
    
    return (
        <Flex pos='relative' w='100%' h='20%'
            bg="#adadad"
            borderRadius='0.5em'
            {...props}
        >
            {/* Hidden */}
            {question && <>
                <MotionBox pos='absolute' w='100%' h='100%' cursor='pointer'
                    bg='#fc851c' _hover={{ background: '#fadd4d' }} borderRadius='1em'
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
                    animate={showQuestion ? 'hide' : 'show'}
                    transition= {{
                        duration: 0.5,
                        ease: "easeInOut"
                    }}
                    onClick={() => {
                        setShowQuestion(true);
                    }}
                >
                    <Stack h='100%' w='100%' align='center' justify='center' >
                        <Button borderRadius='full'
                            color='white' bg='#6b6a6a' _hover={{ bg: '#969696' }}
                            fontSize={['lg', 'xl', '3xl']} fontWeight='extrabold'
                        >
                            Question {index + 1}
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
                            animate={showQuestion ? 'show' : 'hide'}
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
                                    {`${index + 1}. ${question.question}`}
                                </Text>
                                <IconButton w='10%' h='100% !important' size={['xs', 'sm', 'md']} colorScheme='green' borderRadius='0em'
                                    bg={questionStatus == 'correct' ? '#03ff0a' : '#12a617' } _hover={{ bg: '#03ff0a' }}
                                    aria-label='correct' icon={<AiOutlinePlus />}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setQuestionStatus('correct');
                                        soundFunctions.play('correct');
                                    }}
                                />
                                <IconButton w='10%' h='100% !important' size={['xs', 'sm', 'md']} colorScheme='red' borderRadius='0em'
                                    bg={questionStatus == 'wrong' ? '#ff0000' : '#a30202' } _hover={{ bg: '#ff0000' }}
                                    aria-label='wrong' icon={<ImCross />}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setQuestionStatus('wrong');
                                        soundFunctions.play('wrong');
                                    }}
                                />
                            </Flex>
                        </MotionBox>
                    </PopoverTrigger>
                    <PopoverContent minWidth='40vw' maxWidth='80vw' borderRadius='2em' border='2px solid black' >
                        <PopoverArrow borderTop='2px solid black' />
                        <PopoverHeader fontSize={['3xl', '3xl', '5xl']} fontWeight='extrabold' textAlign='center' borderBottomWidth={0} >
                            {question.question}
                        </PopoverHeader>
                    </PopoverContent>
                </Popover>
            </>}

        </Flex>
    )
}

export default LightningQuestion;