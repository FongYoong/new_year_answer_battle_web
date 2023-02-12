import { useState, useEffect, useRef } from 'react'
import { Stack, Flex, Box, Text, IconButton, Button, FormControl, FormLabel, Input, NumberInput, NumberInputField,
Modal,
ModalOverlay,
ModalContent,
ModalHeader,
ModalFooter,
ModalBody,
ModalCloseButton,
} from "@chakra-ui/react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { TiDelete } from 'react-icons/ti'
import { MdDragIndicator } from 'react-icons/md'
import { generateId } from '../../lib/rounds';

function Answer({index, answer, answerFunctions, ...props}) {

    const getItemStyle = (isDragging, isDropAnimating, draggableStyle) => ({
        ...draggableStyle, // styles we need to apply on draggables
        userSelect: "none",      
        background: isDragging ? "#c4c4c4" : "#ffffff",
    });

    return (
        <Draggable key={answer.id} draggableId={answer.id} index={index}>
            {(provided, snapshot) => {
                if (snapshot.isDragging) {
                    const offset = { x: 0, y: 0 }
                    const x = provided.draggableProps.style.left - offset.x;
                    const y = provided.draggableProps.style.top - offset.y;
                    provided.draggableProps.style.left = x;
                    provided.draggableProps.style.top = y;
                }
                return (
                    <Flex pos='relative' w='100%' align='center' justify='flex-start' p={2}
                        borderRadius='0.5em' border='1px solid black'
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        sx={getItemStyle(
                            snapshot.isDragging,
                            snapshot.isDropAnimating,
                            provided.draggableProps.style
                        )}
                    >
                        <Box mr={2} >
                            <MdDragIndicator size='2em' />
                        </Box>
                        <FormControl mr={2} >
                            <FormLabel cursor='grab' >Answer {index + 1}</FormLabel>
                            <Input type='text' defaultValue={answer.answer} placeholder="Type answer here"
                                onChange={(e) => {
                                    answerFunctions.editAnswer(index, {
                                        ...answer,
                                        answer: e.target.value
                                    })
                                }}
                            />
                        </FormControl>
                        <FormControl mr={2}>
                            <FormLabel cursor='grab' >Points</FormLabel>
                            <NumberInput min={0} step={1} precision={0} defaultValue={answer.points} placeholder="Type points here"
                                onChange={(value) => {
                                    const points = parseInt(value);
                                    answerFunctions.editAnswer(index, {
                                        ...answer,
                                        points: isNaN(points) ? 0 : points
                                    })
                                }}
                            >
                                <NumberInputField />
                            </NumberInput>
                        </FormControl>
                        <IconButton aria-label='edit round' icon={<TiDelete size='2em' />} colorScheme='red'
                            onClick={() => answerFunctions.removeAnswer(index)}
                        />
                    </Flex>
            )}}
        </Draggable>
    )
}

function AnswersList({answers, setAnswers, bottomRef, ...props}) {

    const onDragEnd = (result) => {
        if (!result.destination) {
            // dropped outside the list
            return;
        }
        const newData = [...answers];
        const moveData = newData.splice(result.source.index, 1);
        newData.splice(result.destination.index, 0, moveData[0]);
        console.log("drag answer")
        setAnswers(newData);
    }

    const answerFunctions = {
        editAnswer: (index, newAnswerData) => {
            console.log(`edit answer ${index}`)
            const newData = [...answers];
            newData[index] = newAnswerData
            setAnswers(newData);
        },
        removeAnswer: (index) => {
            console.log(`remove answer ${index}`)
            const newData = [...answers];
            newData.splice(index, 1);
            setAnswers(newData);
        }
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable-answers">
                {(provided, snapshot) => (
                    <Stack pos='relative' maxH={'40vh'} w='100%' p={2}
                        bg='#4d4d4d' border='2px solid black'
                        overflowY='auto'
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {answers.map((answer, index) =>
                            <Answer key={index} index={index} answer={answer} answerFunctions={answerFunctions} />
                        )}
                        {answers.length == 0 && <Text color='white' >No answers.</Text>}
                        <div ref={bottomRef} />
                        {provided.placeholder}
                    </Stack>
                )}
            </Droppable>
        </DragDropContext>
    )
}

function NormalRoundModal({index, originalRound, modalFunctions, ...props}) {

    const [round, setRound] = useState(undefined);
    const answersBottomRef = useRef();

    useEffect(() => {
        setRound(originalRound);
    }, [originalRound])

    const onConfirm = () => {
        console.log("confirm edit modal")
        modalFunctions.onConfirm(index, round);
    }

    const setQuestion = (question) =>  {
        console.log("set question of round")
        setRound({
            ...round,
            question
        })
    }
    const setAnswers = (answers) =>  {
        console.log("set answers of round")
        setRound({
            ...round,
            answers
        })
    }

    const addAnswer = () => {
        if (round.answers.length >= 10) {
            // cannot add more answers. max of 10 only
        }
        else {
            setAnswers([
                ...round.answers,
                {
                    id: generateId(),
                    answer: '',
                    points: 0
                }
            ]);
            setTimeout(() => {
                answersBottomRef.current.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
            }, 0);
        }
    }

    return (
        <Modal isOpen={modalFunctions.isOpen} onClose={modalFunctions.onClose} size={['full', 'full', '3xl']} >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit Normal Round</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {round &&
                        <>
                            <FormControl mb={4} >
                                <FormLabel >Question</FormLabel>
                                <Input name="question" type='text' defaultValue={round.question} placeholder="Type question here"
                                    onChange={(e) => {
                                        setQuestion(e.target.value);
                                    }}
                                />
                            </FormControl>
                            <AnswersList answers={round.answers} setAnswers={setAnswers} bottomRef={answersBottomRef} />
                        </>
                    }
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={2} isDisabled={round && (round.answers.length >= 10)}
                        onClick={addAnswer}
                    >
                        Add answer
                    </Button>
                    <Button colorScheme='green' mr={3} onClick={onConfirm}>
                        Confirm
                    </Button>
                    <Button variant='ghost' onClick={modalFunctions.onClose} >
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default NormalRoundModal;