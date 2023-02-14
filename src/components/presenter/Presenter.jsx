

import { useState, useEffect, useContext, useMemo } from 'react'
import { Box, Stack, Flex, Button, Text } from "@chakra-ui/react"
import { ConfigContext } from '../contexts/ConfigContext'
import { PresenterContext } from "../contexts/PresenterContext";
import NewWindow from 'react-new-window'
import NormalRound from './NormalRound';
import LightningRound from './LightningRound';
import { ImArrowLeft, ImArrowRight } from 'react-icons/im'

function Presenter() {

    const [config, configFunctions] = useContext(ConfigContext);
    const [showPresenter, presenterFunctions] = useContext(PresenterContext);
    const currentRound = useMemo(() => {
        return config.currentPage == 'round' ? config.rounds[config.currentRound] : undefined;
    }, [config]);
    const showRound = config.currentPage == 'round';

    // Add PRESENTER VIEW, it'll open in new window and controllable. For admins to see the answers

    if (!showPresenter) {
        return;
    }

    return (
        <NewWindow title='Presenter View' center='parent'
            features={{
                popup: true,
                width: window.innerWidth * 0.7,
                height: window.innerHeight * 0.7
            }}
            onOpen={(windowObject) => {
                presenterFunctions.setWindow(windowObject);
            }}
            onBlock={() => {
                console.log("presenter blocked")
            }}
            onUnload={() => {
                presenterFunctions.close()
            }}
        >
            <Box w='100%' h='100%' p={4} >
                <Stack w='100%'
                    style={{
                        display: showRound ? 'flex' : 'none'
                    }}
                    align='center' justify='center'
                >
                    <Flex mb={4} >
                        <Text fontSize={['2xl']} fontWeight='bold' color='black' textAlign='center' mr={2} >
                            Round {config.currentRound + 1}
                        </Text>
                        <Button mr={2} leftIcon={<ImArrowLeft />}
                            onClick={configFunctions.previousRound}
                        >
                            Previous
                        </Button>
                        <Button rightIcon={<ImArrowRight />}
                            isDisabled={!showRound || config.currentRound >= config.rounds.length - 1}
                            onClick={configFunctions.nextRound}
                        >
                            Next
                        </Button>
                    </Flex>
                    <Text
                        style={{
                            display: showRound ? 'inline-block' : 'none'
                        }}
                        fontSize={['2xl']} fontWeight='bold' color='black' textAlign='center' mr={2} >
                        { showRound ? (currentRound.type == 'normal' ? 'Normal' : 'Lightning') : '' } Round
                    </Text>
                    <NormalRound round={currentRound} />
                    <LightningRound round={currentRound} />
                </Stack>
                <Stack
                    style={{
                        display: showRound ? 'none' : 'flex'
                    }}
                    align='flex-start' justify='center'
                >
                    <Text fontSize={['2xl']} fontWeight='bold' color='black' textAlign='left' >
                        Nothing to see here.
                        <br />
                        Start/resume a game to enter presenter view.
                    </Text>
                </Stack>
            </Box>
        </NewWindow>
    )
}

export default Presenter;