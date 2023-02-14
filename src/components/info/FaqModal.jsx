import { useState, useEffect, useRef } from 'react'
import { Stack, Flex, Box, Text, IconButton, Button,
Modal,
ModalOverlay,
ModalContent,
ModalHeader,
ModalFooter,
ModalBody,
ModalCloseButton,
Accordion,
AccordionItem,
AccordionButton,
AccordionPanel,
AccordionIcon,
} from "@chakra-ui/react"
import { faq } from './faq'
import { FaChevronRight, FaChevronDown } from 'react-icons/fa'

function FaqModal({modalFunctions, ...props}) {


    return (
        <Modal isOpen={modalFunctions.isOpen} onClose={modalFunctions.onClose} size={['full', 'full', '3xl']} >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Frequently Asked Questions (F.A.Q)</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Accordion defaultIndex={[]} allowMultiple allowToggle
                    
                    >
                        {faq.map((item, index) => 
                            <AccordionItem key={index} >
                                {({ isExpanded }) => (
                                    <>
                                        <h2>
                                            <AccordionButton>
                                                {/* <AccordionIcon mr={2} /> */}
                                                <Box mr={2} >
                                                    {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
                                                </Box>
                                                <Box as="span" flex='1' textAlign='left' fontWeight={isExpanded ? 'bold' : 'normal'} fontSize={['md', 'lg', 'lg']} >
                                                    {item.question}
                                                </Box>
                                            </AccordionButton>
                                        </h2>
                                        <AccordionPanel pb={4} >
                                            {item.answer}
                                        </AccordionPanel>
                                    </>
                                )}
                            </AccordionItem>
                        )}
                    </Accordion>
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