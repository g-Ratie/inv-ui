import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'

import '@assets/css/bootstrap-grid.css'
import '@assets/css/bootstrap-spacing.css'
import '@assets/css/fonts.scss'
import 'normalize.css'
import './index.scss'

import App from './App'

import { SoundManager, SoundProvider } from '@services/sounds'

const root = document.getElementById('root')

if (!root) {
  throw new Error('Root element #root not found')
}

createRoot(root).render(
  //<React.StrictMode>を外しているので、どこかで付け直す
  //色が薄くなる
  <HelmetProvider>
    <SoundProvider ref={el => SoundManager.setTopLevelInstance(el)}>
      <App />
    </SoundProvider>
  </HelmetProvider>
)
