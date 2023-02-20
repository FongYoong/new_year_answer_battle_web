import { useEffect } from 'react'
import { Image } from "@chakra-ui/react"
import { useAnimationControls } from "framer-motion"
import { MotionBox } from '../MotionComponents'
import globeImage from "@asset_globeImage"

function Globe({...props}) {

    const controls = useAnimationControls()
    const sequence = async () => {
        await controls.start(i => ({
            scale: [0, 1],
            transition: {
                duration: 1.5,
                ease: "easeInOut"
            },
        }))
        return await controls.start(i => ({
            scale: [1, 0.9, 1],
            transition: {
                duration: 4,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: 'loop'
            },
        }))
    }

    useEffect(() => {
        sequence();
    }, [])

    return (
        <MotionBox zIndex={1} animate={controls} >
            <Image
                boxSize={['50vh', '50vh']}
                m={0} p={0}
                objectFit='contain'
                src={globeImage}
            />
        </MotionBox>

    )
}

export default Globe;