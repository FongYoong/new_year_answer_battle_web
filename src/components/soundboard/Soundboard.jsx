import { Flex } from "@chakra-ui/react"
import SoundButton from './SoundButton'

import buttonWinImage from "../../assets/images/button_win.png"
import buttonLoseImage from "../../assets/images/button_lose.png"
import buttonCheerImage from "../../assets/images/button_cheer.png"
import buttonBooImage from "../../assets/images/button_boo.png"
import buttonSilenceImage from "../../assets/images/button_silence.png"

import winSound from '../../assets/audio/response_win.mp3'
import loseSound from '../../assets/audio/response_lose.mp3'
import cheerSound from '../../assets/audio/response_cheer.mp3'
import booSound from '../../assets/audio/response_boo.mp3'

function Soundboard({...props}) {

    return (
        <Flex w='100%' justify='flex-end' p={4} {...props} >
          <SoundButton label='Theme' icon={buttonWinImage} sound={winSound} />
          <SoundButton label='Lose' icon={buttonLoseImage} sound={loseSound} />
          <SoundButton label='Cheer' icon={buttonCheerImage} sound={cheerSound} />
          <SoundButton label='Boo' icon={buttonBooImage} sound={booSound} />
          <SoundButton label='Silence' icon={buttonSilenceImage} />
        </Flex>
    )
}

export default Soundboard;