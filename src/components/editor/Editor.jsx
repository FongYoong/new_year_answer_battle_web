import { useState, useEffect, useContext, useRef } from 'react'
import { Text, Stack, Flex, IconButton, Button, useToast, useDisclosure,
AlertDialog,
AlertDialogBody,
AlertDialogFooter,
AlertDialogHeader,
AlertDialogContent,
AlertDialogOverlay,
Popover,
PopoverTrigger,
PopoverContent,
PopoverBody,
PopoverArrow,
} from "@chakra-ui/react"
import { ConfigContext, initial_config } from '../contexts/ConfigContext'
import { MotionBox } from '../MotionComponents'
import DelayedUnmount from '../DelayedUnmount'
import RoundList from './RoundList'
import deepEqual from 'deep-equal'
import { IoReturnUpBackOutline } from 'react-icons/io5'
import { FaSave } from 'react-icons/fa'
import { GrRevert } from 'react-icons/gr'
import { MdOutlineStickyNote2 } from 'react-icons/md'

function Editor({...props}) {

    const toast = useToast();
    const saveAlertFunctions = useDisclosure();
    const saveAlertCancelRef = useRef()

    const [config, configFunctions] = useContext(ConfigContext);
    const [tempConfig, setTempConfig] = useState(undefined);
    const show = config.currentPage == 'editor' && tempConfig !== undefined;

    useEffect(() => {
        setTempConfig(config);
    }, [config, config.currentPage, config.currentRound])

    const setRounds = (newRounds) =>  {
        setTempConfig({
            ...tempConfig,
            rounds: newRounds
        })
    }

    const saveConfig = () => {
        configFunctions.setNewConfig(tempConfig);
        toast({
            title: 'Saved',
            position: 'bottom-right',
            status: 'success',
            duration: 1500,
            isClosable: true,
        });
    }

    const configHasChanged = !deepEqual(tempConfig, config);

    return (
        <MotionBox
            pos='absolute' w='100%' h='100%'
            variants={{
                show: {
                    translateY: 0,
                    display: "inline-block"
                },
                hide: {
                    translateY: "-100vh",
                    transitionEnd: { display: "none" }
                }
            }}
            initial="hide"
            animate={show ? "show" : "hide"}
            transition= {{
                duration: 0.7,
                type: "tween",
                ease: "easeInOut"
            }}
            {...props}
        >
            <DelayedUnmount show={show} delay={1100} >
                {tempConfig &&
                    <Stack spacing={4} w='100%' h='100%' align='center' justify='flex-start' px={2} >
                        <Flex w='100%' align='center' justify='flex-start' >
                            <IconButton mx={4} size='md' borderRadius='full'
                                aria-label='back to home'
                                icon={<IoReturnUpBackOutline size='1.5em' />}
                                onClick={() => {
                                    if (configHasChanged) {
                                        saveAlertFunctions.onOpen();
                                    }
                                    else {
                                        configFunctions.viewHome();
                                    }
                                }}
                            />
                            <AlertDialog
                                isOpen={saveAlertFunctions.isOpen}
                                leastDestructiveRef={saveAlertCancelRef}
                                onClose={saveAlertFunctions.onClose}
                            >
                                <AlertDialogOverlay>
                                    <AlertDialogContent>
                                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                            Save changes?
                                        </AlertDialogHeader>
                                        <AlertDialogBody>
                                            This will overwrite existing data.
                                        </AlertDialogBody>
                                        <AlertDialogFooter>
                                            <Button colorScheme='green' mr={2}
                                                onClick={() => {
                                                    saveConfig();
                                                    saveAlertFunctions.onClose();
                                                    configFunctions.viewHome();
                                                }}
                                            >
                                                Save
                                            </Button>
                                            <Button colorScheme='red' mr={2}
                                                onClick={() => {
                                                    saveAlertFunctions.onClose();
                                                    configFunctions.viewHome();
                                                }}
                                            >
                                                No
                                            </Button>
                                            <Button ref={saveAlertCancelRef}
                                                onClick={() => {
                                                    saveAlertFunctions.onClose();
                                                }}
                                            >
                                                Cancel
                                            </Button>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialogOverlay>
                            </AlertDialog>
                            <Text
                                fontSize={['2xl', '4xl']} fontWeight='extrabold' color='white' textAlign='center'
                            >
                                Editor
                            </Text>
                        </Flex>
                        <RoundList rounds={tempConfig.rounds} setRounds={setRounds}  />
                        <Flex w='100%' align='center' justify='center' >
                            <Button leftIcon={<FaSave size='1.5em' />} mr={2}
                                isDisabled={!configHasChanged}
                                onClick={saveConfig}
                            >
                                Save
                            </Button>
                            <Popover isLazy arrowSize={16} >
                                <PopoverTrigger>
                                    <Button leftIcon={<GrRevert size='1.5em' />} mr={2}
                                        isDisabled={!configHasChanged}
                                    >
                                        Undo All
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent w='auto' borderRadius='1em' border='2px solid black' borderBottom='' >
                                    <PopoverArrow borderTop='2px solid black' />
                                    <PopoverBody>
                                        <Flex>
                                            <Button size='md' colorScheme='red' mr={2}
                                                onClick={(e) => {
                                                    setTempConfig({
                                                        ...config,
                                                        currentPage: 'editor'
                                                    });
                                                    e.target.blur();
                                                }}
                                            >
                                                Undo all changes
                                            </Button>
                                            <Button size='md' colorScheme='gray'
                                                onClick={(e) => e.target.blur()}
                                            >
                                                Cancel
                                            </Button>
                                        </Flex>
                                    </PopoverBody>
                                </PopoverContent>
                            </Popover>
                            <Popover isLazy arrowSize={16} >
                                <PopoverTrigger>
                                    <Button leftIcon={<MdOutlineStickyNote2 size='1.5em' />} >
                                        Example
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent w='auto' borderRadius='1em' border='2px solid black' borderBottom='' >
                                    <PopoverArrow borderTop='2px solid black' />
                                    <PopoverBody>
                                        <Flex>
                                            <Button size='md' colorScheme='red' mr={2}
                                                onClick={(e) => {
                                                    setTempConfig({
                                                        ...initial_config,
                                                        currentPage: 'editor'
                                                    });
                                                    e.target.blur();
                                                }}
                                            >
                                                Use example
                                            </Button>
                                            <Button size='md' colorScheme='gray'
                                                onClick={(e) => e.target.blur()}
                                            >
                                                Cancel
                                            </Button>
                                        </Flex>
                                    </PopoverBody>
                                </PopoverContent>
                            </Popover>
                        </Flex>
                    </Stack>
                }
            </DelayedUnmount>
        </MotionBox>
    )
}

export default Editor;