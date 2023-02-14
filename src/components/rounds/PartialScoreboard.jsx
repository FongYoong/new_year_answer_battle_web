import { useState, useRef, useContext } from 'react'
import { Flex, Stack, Box, Text, IconButton,
Popover,
PopoverTrigger,
PopoverContent,
PopoverBody,
PopoverArrow,
FormControl,
NumberInput,
NumberInputField,
NumberInputStepper,
NumberIncrementStepper,
NumberDecrementStepper,
} from "@chakra-ui/react"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai'
import { ConfigContext } from '../contexts/ConfigContext'

const Score = ({show, teamName, team, borderColor, ...props}) => {
    const pointsInputRef = useRef();
    const [config, configFunctions] = useContext(ConfigContext);
    const pointsDelta = 10;
    const points = config.points[team];

    return (
        <Stack id={show?`scoreboard_${team}`:''} spacing={0} mx={1} bg='rgba(0,0,0, 0.5)' border={`2px solid ${borderColor}`} borderRadius='0.5em' {...props} >
            <Flex id={show?`scoreboard_${team}_minus_add`:''} >
                <IconButton id={show?`scoreboard_${team}_minus`:''}
                    mh={4} size={['sm', 'md']} variant='ghost' colorScheme='whiteAlpha' borderRadius='full'
                    aria-label='decrease points' icon={<AiOutlineMinusCircle color='white' />}
                    onClick={() => configFunctions.changePoints(team, config.points[team] - pointsDelta)}
                />
                <Text color='white' fontSize={['md', 'lg']} fontWeight='bold' textAlign='center' >
                    {teamName} 
                </Text>
                <IconButton id={show?`scoreboard_${team}_add`:''}
                    mh={4} size={['sm', 'md']} variant='ghost' colorScheme='whiteAlpha' borderRadius='full'
                    aria-label='increase points' icon={<AiOutlinePlusCircle color='white' />}
                    onClick={() => configFunctions.changePoints(team, config.points[team] + pointsDelta)}
                />
            </Flex>
            <Popover isLazy arrowSize={16} initialFocusRef={pointsInputRef} >
                <PopoverTrigger>
                    <Text className={show?`scoreboard-${team}-score`:''}
                        color='white' fontSize={['xl', '2xl']} fontWeight='extrabold' textAlign='center'
                        cursor='pointer' _hover={{ bg: 'black' }} borderRadius='0.5em'
                    >
                        {points}
                    </Text>
                </PopoverTrigger>
                <PopoverContent borderRadius='1em' border='2px solid black' borderBottom='' >
                    <PopoverArrow borderTop='2px solid black' />
                    <PopoverBody>
                        <FormControl>
                            <NumberInput min={0} value={points}
                                onChange={(value) => {
                                    const points = parseInt(value);
                                    configFunctions.changePoints(team, isNaN(points) ? 0 : points)
                                }}
                                onKeyDown={(e) => {
                                    if(e.key === 'Enter'){
                                        e.preventDefault()
                                        e.target.blur()
                                    }
                                }}
                            >
                                <NumberInputField ref={pointsInputRef} />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </Stack>
    )
}

function PartialScoreboard({show, roundIndex, ...props}) {

    return (
        <Stack id={show?`round_scoreboard`:''} align='center' justify='center' {...props} >
            <Text bg='rgba(0, 0, 0, 0.7)' color='white' borderRadius='0.5em' p={2}
                fontSize={['lg', '2xl']} fontWeight='bold' textAlign='center'
            >
                Round {roundIndex + 1}
            </Text>
            <Flex align='center' justify='center' {...props} >
                <Score show={show} teamName='A' team='a' borderColor='red' />
                <Score show={show} teamName='B' team='b' borderColor='#0affbe' />
            </Flex>
        </Stack>
    )
}

export default PartialScoreboard;