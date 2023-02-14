import { useContext } from "react";
import { Flex, Button,
Popover,
PopoverTrigger,
PopoverContent,
PopoverBody,
PopoverArrow,
} from "@chakra-ui/react"
import { ConfigContext } from "../contexts/ConfigContext";
import { PresenterContext } from "../contexts/PresenterContext";
import { InfoContext } from "../contexts/InfoContext";
import { MdInfoOutline } from 'react-icons/md'
import { HiPlay } from 'react-icons/hi'

function Toolbar({...props}) {

    // const [config, configFunctions] = useContext(ConfigContext);
    const [showPresenter, presenterFunctions] = useContext(PresenterContext);
    const [infoFunctions, tour] = useContext(InfoContext);

    return (
        <Flex w='100%' justify='flex-end' pt={2} pr={2} {...props} >
          <Popover isLazy arrowSize={16} >
            <PopoverTrigger>
              <Button leftIcon={<MdInfoOutline size='1.5em' />} size={['sm', 'md']} mr={2} >
                Info
              </Button >
            </PopoverTrigger>
            <PopoverContent w='auto' borderRadius='1em' border='2px solid black' borderBottom='' >
                <PopoverArrow borderTop='2px solid black' />
                <PopoverBody>
                    <Flex>
                        <Button size='md' colorScheme='teal' mr={2}
                            onClick={(e) => {
                              infoFunctions.startTour();
                              e.target.blur();
                            }}
                        >
                            Tour
                        </Button>
                        <Button size='md' colorScheme='blue'
                            onClick={(e) => {
                              infoFunctions.showFaq();
                              e.target.blur();
                            }}
                        >
                            FAQ
                        </Button>
                    </Flex>
                </PopoverBody>
            </PopoverContent>
          </Popover>
          <Button id="toolbar_presenter_button" colorScheme='yellow' leftIcon={<HiPlay size='1.5em' />} size={['sm', 'md']}
            onClick={() => presenterFunctions.show()}
          >
            Presenter
          </Button>
        </Flex>
    )
}


export default Toolbar;