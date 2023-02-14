import { useState, useRef } from 'react'
import { Stack, Flex, Button, Text, useDisclosure } from "@chakra-ui/react"
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Round from './Round';
import NormalRoundModal from './NormalRoundModal';
import LightningRoundModal from './LightningRoundModal';
import { createNewRound } from '../../lib/rounds';
import { IoIosAddCircle } from 'react-icons/io'

function RoundList({rounds, setRounds, ...props}) {

    // Refer to this sample for the drag n drop: https://codesandbox.io/s/k260nyxq9v?file=/index.js

    const [selectedEditRound, setSelectedEditRound] = useState(undefined) // contains 2 fields: index and round
    const modalBasicFunctions = useDisclosure(); // { isOpen, onOpen, onClose }
    const roundsBottomRef = useRef();

    const roundFunctions = {
        addRound: (roundType) => {
            console.log(`add ${roundType} round`)
            setRounds([...rounds, createNewRound(roundType)]);
            setTimeout(() => {
                roundsBottomRef.current.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
            }, 0);
        },
        removeRound: (index) => {
            console.log(`remove round ${index}`)
            const newData = [...rounds];
            newData.splice(index, 1);
            setRounds(newData);
        },
        startEditRound: (index, round) => {
            console.log(`start edit round: ${index}`)
            setSelectedEditRound({
                index, round
            });
            modalBasicFunctions.onOpen();
        },
        editRound: (index, newRoundData) => {
            console.log(`finalize edit round: ${index}`)
            const newData = [...rounds];
            newData[index] = newRoundData;
            setRounds(newData);
        },
    }

    const modalFunctions = {
        ...modalBasicFunctions,
        onClose: () => {
            console.log("close edit round modal")
            setSelectedEditRound(undefined);
            modalBasicFunctions.onClose();
        },
        onConfirm: (index, newRoundData) => {
            console.log(`confirm edit round modal: ${index}`)
            roundFunctions.editRound(index, newRoundData);
            modalFunctions.onClose();
        }
    }

    const onDragEnd = (result) => {
        if (!result.destination) {
            // dropped outside the list
            return;
        }
        const newData = [...rounds];
        const moveData = newData.splice(result.source.index, 1);
        newData.splice(result.destination.index, 0, moveData[0]);
        setRounds(newData);
    }

    return (
        <Stack h='100%' w='100%' >
            {selectedEditRound && selectedEditRound.round.type == 'normal' && 
                <NormalRoundModal index={selectedEditRound.index} originalRound={selectedEditRound.round} modalFunctions={modalFunctions} />
            }
            {selectedEditRound && selectedEditRound.round.type == 'lightning' && 
                <LightningRoundModal index={selectedEditRound.index} originalRound={selectedEditRound.round} modalFunctions={modalFunctions} />
            }
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable-rounds">
                    {(provided, snapshot) => (
                        <Stack id='editor_rounds_list' pos='relative' maxH='50vh' h='100%' w='100%' p={2}
                            bg='rgba(0, 0, 0, 0.5)'
                            overflowY='auto'
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {rounds.map((round, index) =>
                                <Round key={index} index={index} round={round} roundFunctions={roundFunctions} />
                            )}
                            <div ref={roundsBottomRef} />
                            {provided.placeholder}
                        </Stack>
                    )}
                </Droppable>
            </DragDropContext>
            <Text color='white' bg='rgba(0,0,0,0.7)' borderRadius='0.25em' p={1} >(Click and drag an item to reorder it in the list)</Text>
            <Flex id='editor_add_round_buttons' pt={4} w='100%' align='center' justify='center' >
                <Button colorScheme='linkedin' leftIcon={<IoIosAddCircle size='1.5em' />} mr={2}
                    onClick={() => {
                        roundFunctions.addRound('normal')
                    }}
                >
                    Normal round
                </Button>
                <Button colorScheme='orange' leftIcon={<IoIosAddCircle size='1.5em' />}
                    onClick={() => {
                        roundFunctions.addRound('lightning')
                    }}
                >
                    Lightning round
                </Button>
            </Flex>
        </Stack>
    )
}

export default RoundList;