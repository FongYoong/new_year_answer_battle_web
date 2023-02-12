import { useState, useEffect } from 'react'
import { Text, Button, Stack } from "@chakra-ui/react"

function QuestionButton({children, ...props}) {

    return (
        <Button
            size={['sm', 'md']} mx={2} px={4} py={2}
            bg='#888888' _hover={{ bg: '#adadad' }}
            // boxShadow='inset 0.2em 0.2em 0.2em 0 rgba(255,255,255,0.5), inset -0.2em -0.2em 0.2em 0 rgba(0,0,0,0.5)'
            {...props}
        >
            <Text
                fontSize={['xs', 'sm']} fontWeight='extrabold' color='white' textTransform='uppercase'
                textShadow="black 1px 1px 2px"
            >
                {children}
            </Text>
        </Button>
    )
}

export default QuestionButton;