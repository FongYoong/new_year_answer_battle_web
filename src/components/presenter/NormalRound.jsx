


import { useState, useEffect, useContext } from 'react'
import { Stack, OrderedList, ListItem, Text } from "@chakra-ui/react"
import { ConfigContext } from '../contexts/ConfigContext'
import { ImArrowLeft, ImArrowRight } from 'react-icons/im'

function NormalRound({round, ...props}) {

    const show = round && round.type == 'normal';

    return (
        <Stack 
            style={{
                display: show ? 'flex' : 'none'
            }}
            align='center' justify='center' p={4}
            border='1px solid black' borderRadius='0.5em'
            {...props}
        >
            <Text fontSize={['lg']} fontWeight='bold' color='black' textAlign='left' textDecoration='underline' >
                Question:

            </Text>
            <Text fontSize={['md']} fontWeight='normal' color='black' textAlign='left' >
                {show ? round.question : ''}
            </Text>
            <Text mt={2} fontSize={['lg']} fontWeight='bold' color='black' textAlign='left' textDecoration='underline' >
                Answers:
            </Text>
            <OrderedList listStylePosition='inside' >
                {show && round.answers.map((answer, index) => 
                    <ListItem key={index}>
                        {answer.answer} <b>({answer.points} points) </b>
                    </ListItem>
                )}
            </OrderedList>
        </Stack>
    )
}

export default NormalRound;