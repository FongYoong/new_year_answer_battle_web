import { MotionBox } from './MotionComponents'

function StartupScreen() {

    return (
        <MotionBox zIndex={2} bg="black" pos='fixed' w='100vw' h='100vh' left={0} top={0}
            animate={{
                opacity: [1, 0],
                transitionEnd: { display: 'none' }
            }}
            transition= {{
                delay: 0.5,
                duration: 0.5,
            }}
        />
    )

}

export default StartupScreen;