import { useContext } from 'react'
import { Button, Flex, Stack, useToast } from "@chakra-ui/react"
import { ConfigContext } from '../contexts/ConfigContext'
import Globe from './Globe'
import Curtains from './Curtains'
import PlayButton from './PlayButton'
import { MotionBox } from '../MotionComponents'
import DelayedUnmount from '../DelayedUnmount'
import { AiFillEdit } from 'react-icons/ai'
import { RiFileDownloadLine, RiFileUploadLine } from 'react-icons/ri'

function Home({...props}) {

    const toast = useToast();
    const [config, configFunctions] = useContext(ConfigContext);
    const show = config.currentPage == 'home';
    
    return (
        <MotionBox
            pos='absolute' w='100%' h='100%'
            variants={{
                show: {
                    translateX: 0,
                    display: "inline-block"
                },
                hide: {
                    translateX: "-100vw",
                    transitionEnd: { display: "none" }
                }
            }}
            initial="show"
            animate={show ? "show" : "hide"}
            transition= {{
                duration: 0.7,
                type: "tween",
                ease: "easeInOut"
            }}
            {...props}
        >
            <DelayedUnmount show={show} delay={1100} >
                <Stack w='100%' h='100%' align='center' >
                    <Globe />
                    <Curtains />
                    <Flex w='100%' h='100%' align='center' justify='center' >
                        <PlayButton
                            onClick={configFunctions.playGame}
                        />
                        <Stack ml={4}>
                            {config.currentRound != undefined &&
                                <Button colorScheme='green'
                                    onClick={configFunctions.resumeGame}
                                >
                                    Resume Game
                                </Button>
                            }
                            <Button leftIcon={<AiFillEdit size='1.5em' />}
                                onClick={configFunctions.viewEditor}
                            >
                                Editor
                            </Button>
                            <Button leftIcon={<RiFileDownloadLine size='1.5em' />}
                                onClick={() => {
                                    configFunctions.saveFile().then(() => {
                                        toast({
                                            title: 'Saved to file',
                                            position: 'bottom-right',
                                            status: 'success',
                                            duration: 1500,
                                            isClosable: true,
                                        });
                                    })
                                }}
                            >
                                Save File
                            </Button>
                            <Button leftIcon={<RiFileUploadLine size='1.5em' />}
                                onClick={() => {
                                    configFunctions.loadFile().then(() => {
                                        toast({
                                            title: 'Loaded file',
                                            position: 'bottom-right',
                                            status: 'success',
                                            duration: 1500,
                                            isClosable: true,
                                        });
                                    })
                                }}
                            >
                                Load File
                            </Button>
                        </Stack>
                    </Flex>
                </Stack>
            </DelayedUnmount>
        </MotionBox>
    )
}

export default Home;