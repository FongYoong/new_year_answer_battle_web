import { useContext } from 'react'
import { Stack, Button, Text, Image } from "@chakra-ui/react"
import { SoundContext } from '../contexts/SoundContext';

function SoundButton({label, icon, sound, ...props}) {

    const [soundFunctions] = useContext(SoundContext);

    return (
        <Stack spacing={0} align='center'>
            <Text
                fontSize={['sm', 'md']} fontWeight='bold' color='white'
            >
                {label}
            </Text>
            <Button
                onClick={() => {
                    soundFunctions.play(sound)
                }}
                variant='ghost'
                {...props}
            >
                <Image
                    boxSize={['1.7em', '2em']}
                    objectFit='contain'
                    src={icon}
                />
            </Button>
        </Stack>

    )
}

export default SoundButton;