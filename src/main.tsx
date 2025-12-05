import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { MIDIProvider } from '@react-midi/hooks'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <MIDIProvider>
            <App />
        </MIDIProvider>
    </StrictMode>,
)
