import { useContext, useMemo } from 'react';
import { Flex, IconButton, useDisclosure } from "@chakra-ui/react"
import { ConfigContext } from '../contexts/ConfigContext'
import { MotionBox } from "../MotionComponents";
import PagesModal from './PagesModal';
import { ImArrowLeft, ImArrowRight } from 'react-icons/im'
import { FiMenu } from 'react-icons/fi'

const NavigatorButton = ({label, icon, ...props}) => {

    return (
        <IconButton mh={4} size='md' bg='black' colorScheme='blackAlpha' borderRadius='full'
            aria-label={label}
            icon={icon}
            {...props}
        />
    )
}

function Navigator({...props}) {

    const [config, configFunctions] = useContext(ConfigContext);
    const modalFunctions = useDisclosure(); // { isOpen, onOpen, onClose }

    const animate = useMemo(() => {
        if (config.currentPage == 'round' && config.currentRound !== undefined) {
            return 'show'
        }
        else {
            return 'hide'
        }
    }, [config.currentPage, config.currentRound])

    return (
        <MotionBox pos='absolute' bottom={['initial', '0']} top={['0', 'initial']} left='0'
            variants={{
                show: {
                    translateX: 0,
                },
                hide: {
                    translateX: '-50vw',
                },
            }}
            initial="hide"
            animate={animate}
            transition= {{
                duration: 1,
                type: "spring",
                // type: 'tween',
                // ease: "easeInOut"
            }}
        >
            <PagesModal modalFunctions={modalFunctions} />
            <Flex id='round_navigator' align='center' justify='center' p={2}
                {...props}
            >
                <NavigatorButton
                    label='navigate_menu' icon={<FiMenu color='white' size='1.2em' />}
                    onClick={modalFunctions.onOpen}
                />
                <NavigatorButton
                    label='previous_button' icon={<ImArrowLeft color='white' size='1.2em' />}
                    onClick={configFunctions.previousRound}
                />
                {(config.currentRound !== undefined && config.currentRound < config.rounds.length - 1) &&
                    <NavigatorButton
                        label='next_button' icon={<ImArrowRight color='white' size='1.2em' />}
                        onClick={configFunctions.nextRound}
                    />
                }
            </Flex>
        </MotionBox>
    )
}

export default Navigator;