import { useContext } from 'react'
import { Box, Stack } from "@chakra-ui/react"
import { ConfigContext } from './components/contexts/ConfigContext'
import StartupScreen from './components/StartupScreen'
import Presenter from './components/presenter/Presenter'
import Navigator from './components/navigator/Navigator'
import Toolbar from './components/toolbar/Toolbar'
import Soundboard from './components/soundboard/Soundboard'
import Home from './components/home/Home'
import Editor from './components/editor/Editor'
import NormalRound from './components/rounds/NormalRound'
import LightningRound from './components/rounds/LightningRound'
import backgroundImage from "./assets/images/background.jpg"

const App = () => {

  const [config, configFunctions] = useContext(ConfigContext);

  return (
    <Box
      w='100vw' h='100vh' pos='fixed'
      backgroundImage={backgroundImage} backgroundSize='cover' backgroundRepeat='no-repeat' backgroundPosition='center'
    >
      <StartupScreen />
      <Presenter />
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

export default App;