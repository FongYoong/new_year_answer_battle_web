import { useState } from 'react'
import { Flex, IconButton, Button, Text,
Popover,
PopoverTrigger,
PopoverContent,
PopoverBody,
PopoverArrow,
} from "@chakra-ui/react"
import { Draggable } from "react-beautiful-dnd";
import { BsQuestionCircleFill, BsLightningFill } from 'react-icons/bs'
import { AiFillEdit } from 'react-icons/ai'
import { TiDelete } from 'react-icons/ti'

function Round({index, round, roundFunctions, ...props}) {

    const getItemStyle = (isDragging, isDropAnimating, draggableStyle) => ({
        ...draggableStyle, // styles we need to apply on draggables
        userSelect: "none",      
        background: isDragging ? "#08cca8" : "#005a70",
    });

    return (
        <Draggable key={round.id} draggableId={round.id} index={index}>
            {(provided, snapshot) => {
                if (snapshot.isDragging) {
                    const offset = { x: 0, y: 65 }
                    const x = provided.draggableProps.style.left - offset.x;
                    const y = provided.draggableProps.style.top - offset.y;
                    provided.draggableProps.style.left = x;
                    provided.draggableProps.style.top = y;
                }
                return (
                    <Flex pos='relative' w='100%' align='center' justify='flex-start' p={2}
                        borderRadius='0.5em'
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        sx={getItemStyle(
                            snapshot.isDragging,
                            snapshot.isDropAnimating,
                            provided.draggableProps.style
                        )}
                    >
                        {round.type == 'normal' ? <BsQuestionCircleFill size='2em' color='white' /> : <BsLightningFill size='2em' color='white' />}
                        <Text w='100%' ml={[2, 4]}
                            fontSize={['md', 'lg', 'xl']} fontWeight='extrabold' color='white' align='left' p={1}
                            textOverflow='ellipsis' overflow='hidden' whiteSpace='nowrap'
                        >
                            {`(${index + 1}) `}{round.type == 'normal' ? round.question : `${round.questions.length} questions in ${round.time} seconds`}
                        </Text>
                        <IconButton aria-label='edit round' icon={<AiFillEdit size='1.5em' />} colorScheme='whiteAlpha' mr={1}
                            onClick={() => roundFunctions.startEditRound(index, round)}
                        />
                        <Popover isLazy arrowSize={16} >
                            <PopoverTrigger>
                                <IconButton aria-label='edit round' icon={<TiDelete size='2em' />} colorScheme='red' />
                            </PopoverTrigger>
                            <PopoverContent w='auto' borderRadius='1em' border='2px solid black' borderBottom='' >
                                <PopoverArrow borderTop='2px solid black' />
                                <PopoverBody>
                                    <Flex>
                                        <Button size='md' colorScheme='red' mr={2}
                                            onClick={(e) => roundFunctions.removeRound(index)}
                                        >
                                            Delete
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
            )}}
        </Draggable>
    )
}

export default Round;