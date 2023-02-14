import { useState, useEffect, useRef } from 'react'
import { Stack, Flex, Box, Text, IconButton, Button,
Modal,
ModalOverlay,
ModalContent,
ModalHeader,
ModalFooter,
ModalBody,
ModalCloseButton,
} from "@chakra-ui/react"
import { MdDragIndicator } from 'react-icons/md'

function FaqModal({modalFunctions, ...props}) {


    return (
        <Modal isOpen={modalFunctions.isOpen} onClose={modalFunctions.onClose} size={['full', 'full', '3xl']} >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Frequently Asked Questions (F.A.Q)</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' variant='solid' onClick={modalFunctions.onClose} >
                        Ok
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default FaqModal;