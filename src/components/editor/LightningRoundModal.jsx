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

function Question({index, question, questionFunctions, ...props}) {

    const getItemStyle = (isDragging, isDropAnimating, draggableStyle) => ({
        ...draggableStyle, // styles we need to apply on draggables
        userSelect: "none",      
        background: isDragging ? "#c4c4c4" : "#ffffff",
    });

    return (
        <Draggable key={question.id} draggableId={question.id} index={index}>
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
                            <FormLabel cursor='grab' >Question {index + 1}</FormLabel>
                            <Input type='text' defaultValue={question.question} placeholder="Type question here"
                                onChange={(e) => {
                                    questionFunctions.editQuestion(index, {
                                        ...question,
                                        question: e.target.value
                                    })
                                }}
                            />
                        </FormControl>
                        <FormControl mr={2} >
                            <FormLabel cursor='grab' >Answer {index + 1}</FormLabel>
                            <Input type='text' defaultValue={question.answer} placeholder="Type answer here"
                                onChange={(e) => {
                                    questionFunctions.editQuestion(index, {
                                        ...question,
                                        answer: e.target.value
                                    })
                                }}
                            />
                        </FormControl>
                        <IconButton aria-label='edit round' icon={<TiDelete size='2em' />} colorScheme='red'
                            onClick={() => questionFunctions.removeQuestion(index)}
                        />
                    </Flex>
            )}}
        </Draggable>
    )
}

function QuestionsList({questions, setQuestions, bottomRef, ...props}) {

    const onDragEnd = (result) => {
        if (!result.destination) {
            // dropped outside the list
            return;
        }
        const newData = [...questions];
        const moveData = newData.splice(result.source.index, 1);
        newData.splice(result.destination.index, 0, moveData[0]);
        console.log("drag question")
        setQuestions(newData);
    }

    const questionFunctions = {
        editQuestion: (index, newQuestionData) => {
            console.log(`edit question ${index}`)
            const newData = [...questions];
            newData[index] = newQuestionData
            setQuestions(newData);
        },
        removeQuestion: (index) => {
            console.log(`remove question ${index}`)
            const newData = [...questions];
            newData.splice(index, 1);
            setQuestions(newData);
        }
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable-questions">
                {(provided, snapshot) => (
                    <Stack pos='relative' maxH={['55vh', '55vh', '40vh']} w='100%' p={2}
                        bg='#4d4d4d' border='2px solid black'
                        overflowY='auto'
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {questions.map((question, index) =>
                            <Question key={index} index={index} question={question} questionFunctions={questionFunctions} />
                        )}
                        {questions.length == 0 && <Text color='white' >No questions.</Text>}
                        <div ref={bottomRef} />
                        {provided.placeholder}
                    </Stack>
                )}
            </Droppable>
        </DragDropContext>
    )
}

function LightningRoundModal({index, originalRound, modalFunctions, ...props}) {

    const [round, setRound] = useState(undefined);
    const questionsBottomRef = useRef();

    useEffect(() => {
        setRound(originalRound);
    }, [originalRound])

    const onConfirm = () => {
        console.log("confirm edit modal")
        modalFunctions.onConfirm(index, round);
    }

    const setTimerDuration = (time) =>  {
        console.log("set timer duration of round")
        setRound({
            ...round,
            time
        })
    }
    const setQuestions = (questions) =>  {
        console.log("set questions of round")
        setRound({
            ...round,
            questions
        })
    }

    const addQuestion = () => {
        if (round.questions.length >= 10) {
            // cannot add more questions. max of 10 only
        }
        else {
            setQuestions([
                ...round.questions,
                {
                    id: generateId(),
                    question: '',
                    answer: '',
                }
            ]);
            setTimeout(() => {
                questionsBottomRef.current.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
            }, 0);
        }
    }

    return (
        <Modal isOpen={modalFunctions.isOpen} onClose={modalFunctions.onClose} size={['full', 'full', '3xl']} >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit Lightning Round</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {round &&
                        <>
                            <FormControl mb={4} >
                                <FormLabel >Timer duration (seconds)</FormLabel>
                                <NumberInput min={1} step={1} precision={0} defaultValue={round.time} placeholder="Type timer value here"
                                    onChange={(value) => {
                                        const duration = parseInt(value);
                                        setTimerDuration(isNaN(duration) ? 0 : duration)
                                    }}
                                >
                                    <NumberInputField />
                                </NumberInput>
                            </FormControl>
                            <QuestionsList questions={round.questions} setQuestions={setQuestions} bottomRef={questionsBottomRef} />
                            <Text mt={2} >(Click and drag an item to reorder it in the list)</Text>
                        </>
                    }
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={2} isDisabled={round && (round.questions.length >= 10)}
                        onClick={addQuestion}
                    >
                        Add question
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

export default LightningRoundModal;