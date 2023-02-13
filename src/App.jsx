import { useContext } from 'react'
import { Box, Stack, Flex, Button, Image, Text, transition } from "@chakra-ui/react"
import { ConfigContext } from './components/contexts/ConfigContext'
import Toolbar from './components/toolbar/Toolbar'
import Navigator from './components/navigator/Navigator'
import Soundboard from './components/soundboard/Soundboard'
import Home from './components/home/Home'
import Editor from './components/editor/Editor'
import NormalRound from './components/rounds/NormalRound'
import LightningRound from './components/rounds/LightningRound'
import backgroundImage from "./assets/images/background.jpg"
import { MotionBox } from './components/MotionComponents'
import StartupScreen from './components/StartupScreen'
// import RenderInWindow from '../RenderInWindow';
import NewWindow from 'react-new-window'


const App = () => {

  const [config, configFunctions] = useContext(ConfigContext);

  // settings, faq, info are modal/dialogs. They are not pages
  // add function to manually load and save config file
  // user must manually choose whether to pick config file in their browser.
  // Add PRESENTER VIEW, it'll open in new window and controllable. For admins to see the answers

  return (
    <Box
      w='100vw' h='100vh' pos='fixed'
      backgroundImage={backgroundImage} backgroundSize='cover' backgroundRepeat='no-repeat' backgroundPosition='center'
    >
      <StartupScreen />
      <Navigator />
      <Stack w='100%' h='100%' align='center' justifyContent='space-between' >
        <Toolbar />
        <Stack pos='relative' w='100%' h='100%' >
          <Home />
          <Editor />
          {config.rounds.map((round, index) => 
            round.type === 'normal' ?
              <NormalRound key={index} index={index} round={round} />
              :
              <LightningRound key={index} index={index} round={round} />
          )}
        </Stack>
        <Soundboard />
      </Stack>
    </Box>
  )
}

export default App

                // {showPopup && <NewWindow title='Presenter View' >
                // <Button onClick={() => setCount(count+1)}>
                //     Counttt: {count}
                // </Button>
                // </NewWindow>}

                {/* <input type="file" id="file-selector" accept=".jpg, .jpeg, .png" /> */}

                {/* 
                <Button onClick={() => {
                    onClick()
                    setShowPopup(!showPopup)
                }} >
                    bruh
                </Button> */}
                {/* <RenderInWindow show={showPopup} >
                    <Button>Yo</Button>
                </RenderInWindow> */}