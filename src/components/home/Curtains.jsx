import { useEffect } from 'react'
import { Image, Box } from "@chakra-ui/react"
import { useAnimationControls } from "framer-motion"
import { MotionBox } from '../MotionComponents'
import curtainImage from "../../assets/images/background_curtain.png"

function Curtain({initialY, finalY, delay, ...props}) {

    const controls = useAnimationControls()
    const sequence = async () => {
        return await controls.start(i => ({
            translateY: [initialY, finalY],
            transition: {
                duration: 1,
                ease: "easeInOut",
                delay: delay
            },
        }))
    }

    useEffect(() => {
        sequence();
    }, [])

    return (
        <MotionBox animate={controls}
            pos='absolute'
            {...props}
        >
            <Image
                width={['40vw', '40vw']}
                height={['70vh', '70vh']}
                objectFit='fill'
                src={curtainImage}
            />
        </MotionBox>
    )
}

function Curtains({...props}) {

    return (
        <Box>
            <Curtain initialY='-100vh' finalY='0vh' delay={1} top={['10%', '0%']} left='10%' />
            <Curtain initialY='100vh' finalY='0vh' delay={1} top={['10%', '0%']} right='10%' />
        </Box>
    )
}

export default Curtains;