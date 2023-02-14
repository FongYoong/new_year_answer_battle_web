import { useState, useEffect } from 'react'
import { Stack, Flex, Text, IconButton } from "@chakra-ui/react"
import { ImCross } from 'react-icons/im'
import { BsArrowRepeat } from 'react-icons/bs'
import { MotionBox } from '../MotionComponents'
import { Howl, Howler } from 'howler';
import responseWrongSound from '../../assets/audio/response_wrong.mp3'

function BigX({strikes, ...props}) {

    const [animate, setAnimate] = useState('hide')

    useEffect(() => {
        setAnimate('show')
        const timeout = setTimeout(() => {
            setAnimate('hide')
        }, 1500)
        return () => clearTimeout(timeout)
    }, [strikes])

    return (
        <MotionBox
            pos='fixed' left='0vw' top='20vh'
            variants={{
                show: {
                    opacity: 1
                },
                hide: {
                    opacity: 0
                },
            }}
            initial='hide'
            animate={animate}
            transition= {{
                duration: 1,
                ease: "easeInOut"
            }}
            {...props}
        >
            <Stack w='100vw' align='center' justify='center' >
                <Flex align='center' justify='center' >
                    {[...Array(strikes)].map((_, index) => 
                            <Text key={index} fontSize={['8xl']} fontWeight='extrabold' color='red' textAlign='center'
                                borderRadius='0.25em' border='8px solid red' px={1} py={0} mx={1}
                                textShadow="black 1px 1px 2px"
                            >
                                X
                            </Text>
                    )}
                </Flex>
            </Stack>

        </MotionBox>
    )
}

function Strikes({show, strikes, onClick, ...props}) {
    
    const [wrongSoundObject, setWrongSoundObject] = useState(new Howl({
        src: [responseWrongSound],
        autoplay: false,
        loop: false,
        volume: 1,
    }))

    return (
        <Stack spacing={0} align='center' justify='center' {...props} >
            <BigX strikes={strikes} />
            <Text color='red' fontWeight='extrabold' fontSize='2xl' >{"X".repeat(strikes)}</Text>
            <IconButton id={show?'round_strike_button':''}
                label='wrong__button' size={['md', 'lg']} colorScheme='red'
                icon={strikes < 3 ? <ImCross color='white' size='1.2em' /> : <BsArrowRepeat color='white' size='1.2em' />}
                onClick={() => {
                    if (strikes < 3) {
                        Howler.stop();
                        wrongSoundObject.play();
                    }
                    onClick();
                }}
            />
        </Stack>
    )
}

export default Strikes;