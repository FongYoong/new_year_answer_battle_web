


import { useState, useEffect, useContext } from 'react'
import { Stack, OrderedList, ListItem, Text } from "@chakra-ui/react"
import { ConfigContext } from '../contexts/ConfigContext'
import { ImArrowLeft, ImArrowRight } from 'react-icons/im'

function LightningRound({round, ...props}) {

    const show = round && round.type == 'lightning';

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
                Questions:

            </Text>
            <OrderedList listStylePosition='outside' pl='1em' >
                {show && round.questions.map((question, index) => 
                    <ListItem key={index} >
                        Question: {question.question}
                        <br/>
                        Answer: {question.answer}
                    </ListItem>
                )}
            </OrderedList>
        </Stack>
    )
}

export default LightningRound;