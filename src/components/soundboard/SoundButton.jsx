import { useState } from 'react'
import { Stack, Button, Text, Image } from "@chakra-ui/react"
import { Howl, Howler } from 'howler';

function SoundButton({label, icon, sound=undefined, ...props}) {

    const [soundObject, setSoundbject] = useState(new Howl({
        src: [sound],
        autoplay: false,
        loop: false,
        volume: 1,
    }))

    return (
        <Stack spacing={0} align='center'>
            <Text
                fontSize={['sm', 'md']} fontWeight='bold' color='white'
            >
                {label}
            </Text>
            <Button
                onClick={() => {
                    Howler.stop();
                    soundObject.play();
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