import { useContext } from "react";
import { Flex, Button } from "@chakra-ui/react"
import { IoSettingsOutline } from 'react-icons/io5'
import { HiPlay } from 'react-icons/hi'
import { ConfigContext } from "../contexts/ConfigContext";
import { PresenterContext } from "../contexts/PresenterContext";

function Toolbar({...props}) {

    const [config, configFunctions] = useContext(ConfigContext);
    const [showPresenter, presenterFunctions] = useContext(PresenterContext);

    return (
        <Flex w='100%' justify='flex-end' pt={2} pr={2} {...props} >
          <Button leftIcon={<IoSettingsOutline size='1.5em' />} size={['sm', 'md']} mr={2}
            onClick={configFunctions.viewSettings}
          >
            Settings
          </Button >
          <Button colorScheme='yellow' leftIcon={<HiPlay size='1.5em' />} size={['sm', 'md']}
            onClick={() => presenterFunctions.show()}
          >
            Presenter
          </Button>
        </Flex>
    )
}


export default Toolbar;