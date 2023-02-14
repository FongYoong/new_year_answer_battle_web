import { useContext } from 'react'
import { Flex, Stack, Text, Button,
Popover,
PopoverTrigger,
PopoverContent,
PopoverBody,
PopoverArrow,
} from "@chakra-ui/react"
import { ConfigContext } from '../contexts/ConfigContext'

function UnassignedPoints({show, unassignedPoints, setUnassignedPoints, ...props}) {

    const [config, configFunctions] = useContext(ConfigContext);

    const onClickRoundWinner = (team, event) => {
        configFunctions.changePoints(team, config.points[team] + unassignedPoints);
        setUnassignedPoints(0);
        event.target.blur()
    }

    return (
        <Stack id={show?'normal_round_unassigned_points':''} spacing={2} align='center' justify='center' >
            <Text bg='rgba(0, 161, 62, 1)' color='white' borderRadius='0.5em' p={2}
                fontSize={['lg', '2xl']} fontWeight='bold' textAlign='center'
            >
                Unassigned points: {unassignedPoints}
            </Text>
            <Flex w='100%' align='center' justify='flex-end' >
                <Button id={show?'normal_round_unassigned_points_reset_button':''}
                    size='md' colorScheme='pink' mr={1} 
                    onClick={() => setUnassignedPoints(0)}
                >
                    Reset
                </Button>
                <Popover isLazy arrowSize={16} >
                    <PopoverTrigger>
                        <Button className={show?'normal-round-unassigned-points-winner-button':''} size='md' colorScheme='linkedin' >
                            Winner
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent w='auto' borderRadius='1em' border='2px solid black' borderBottom='' >
                        <PopoverArrow borderTop='2px solid black' />
                        <PopoverBody>
                            <Flex>
                                <Button size='md' colorScheme='red' mr={2}
                                    onClick={(e) => onClickRoundWinner('a', e)}
                                >
                                    A
                                </Button>
                                <Button size='md' color='white' bg='#02ad80' _hover={{ opacity: 0.8 }}
                                    onClick={(e) => onClickRoundWinner('b', e)}
                                >
                                    B
                                </Button>
                            </Flex>
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
            </Flex>
        </Stack>
    )

}

export default UnassignedPoints