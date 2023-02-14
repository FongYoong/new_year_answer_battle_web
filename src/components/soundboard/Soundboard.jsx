import { Flex } from "@chakra-ui/react"
import SoundButton from './SoundButton'

import buttonWinImage from "../../assets/images/button_win.png"
import buttonLoseImage from "../../assets/images/button_lose.png"
import buttonCheerImage from "../../assets/images/button_cheer.png"
import buttonBooImage from "../../assets/images/button_boo.png"
import buttonSilenceImage from "../../assets/images/button_silence.png"

function Soundboard({...props}) {

    return (
        <Flex w='100%' justify='flex-end' p={4} {...props} >
          <Flex id='soundboard' >
            <SoundButton label='Theme' icon={buttonWinImage} sound='win' />
            <SoundButton label='Lose' icon={buttonLoseImage} sound='lose' />
            <SoundButton label='Cheer' icon={buttonCheerImage} sound='cheer' />
            <SoundButton label='Boo' icon={buttonBooImage} sound='boo' />
            <SoundButton label='Silence' icon={buttonSilenceImage} sound='silence' />
          </Flex>
        </Flex>
    )
}

export default Soundboard;