import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ConfigProvider } from './components/contexts/ConfigContext'
import { PresenterProvider } from './components/contexts/PresenterContext'
import { InfoProvider } from './components/contexts/InfoContext'
import { SoundProvider } from './components/contexts/SoundContext'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from './theme'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <ChakraProvider theme={theme} >
      <SoundProvider>
        <ConfigProvider>
          <PresenterProvider>
            <InfoProvider>
              <App />
            </InfoProvider>
          </PresenterProvider>
        </ConfigProvider>
      </SoundProvider>
    </ChakraProvider>
  // </React.StrictMode>
)
