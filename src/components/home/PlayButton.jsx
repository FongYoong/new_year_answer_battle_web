import { useState } from 'react'
import { Button, Text } from "@chakra-ui/react"

function PlayButton({...props}) {

    return (
        <Button
            size={['lg', '4xl', '6xl']} px={4} py={2}
            bg='#2596be' _hover={{ bg: '#3fb0d9' }}
            boxShadow='inset 0.2em 0.2em 0.2em 0 rgba(255,255,255,0.5), inset -0.2em -0.2em 0.2em 0 rgba(0,0,0,0.5)'
            {...props}
        >
            <Text
                fontSize={['2xl', '4xl', '6xl']} fontWeight='extrabold' color='white' textTransform='uppercase' wordBreak='break-word'
                textShadow="black 1px 1px 2px"
            >
                Play Game
            </Text>
        </Button>
    )
}

export default PlayButton;