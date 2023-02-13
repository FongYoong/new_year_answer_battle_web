import { useContext } from 'react'
import { Stack, Flex, Box, Text, IconButton, Button, FormControl, FormLabel, Input, NumberInput, NumberInputField,
Modal,
ModalOverlay,
ModalContent,
ModalHeader,
ModalFooter,
ModalBody,
ModalCloseButton,
} from "@chakra-ui/react"
import { ConfigContext } from '../contexts/ConfigContext'
import { AiFillHome } from 'react-icons/ai'
import { BsQuestionCircleFill, BsLightningFill } from 'react-icons/bs'

function PageRow({index, round=undefined, goToPage, ...props}) {

    return (
        <Flex pos='relative' w='100%' align='center' justify='flex-start' p={2}
            cursor='pointer' bg='#ffeeed' _hover={{ bg: '#d9c8c7' }} borderRadius='0.5em'  border='1px solid black'
            onClick={() => {
                goToPage(index);
            }}
            {...props}
        >
            {round === undefined && <AiFillHome size='2em' color='black' />}
            {round && round.type == 'normal' && <BsQuestionCircleFill size='2em' color='black' />}
            {round && round.type == 'lightning' && <BsLightningFill size='2em' color='black' />}
            <Text w='100%' ml={[2, 4]}
                fontSize={['md', 'lg', 'xl']} fontWeight='extrabold' color='black' align='left' p={1}
                textOverflow='ellipsis' overflow='hidden' whiteSpace='nowrap'
            >
                {round === undefined ? 'Home' : `(${index + 1}) `}
                {round && round.type == 'normal' ? round.question : ''}
                {round && round.type == 'lightning' ? `${round.questions.length} questions in ${round.time} seconds` : ''}
            </Text>
        </Flex>
    )
}

function PagesModal({modalFunctions, ...props}) {

    const [config, configFunctions] = useContext(ConfigContext);

    const goToPage = (index) => {
        if (index === undefined) {
            configFunctions.viewHome();
        }
        else {
            configFunctions.jumpToRound(index);
        }
        modalFunctions.onClose();
    }

    return (
        <Modal isOpen={modalFunctions.isOpen} onClose={modalFunctions.onClose} size={['md']} >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Pages</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack pos='relative' maxH={'60vh'} w='100%' p={2}
                        border='2px solid black'
                        overflowY='auto'
                    >
                        <PageRow goToPage={goToPage} />
                        {config.rounds.map((round, index) =>
                            <PageRow key={index} index={index} round={round} goToPage={goToPage} />
                        )}
                    </Stack>
                </ModalBody>
                <ModalFooter>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default PagesModal;