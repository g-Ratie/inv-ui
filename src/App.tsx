import { useState, useEffect } from 'react'
import { Portal } from 'react-portal'

import { Home } from '@shared/components/Home'
import { Sidebar } from '@shared/components/Sidebar'
import { Settings } from '@shared/components/Settings'
import { GlobalKeyHandler } from '@shared/components/GlobalKeyHandler'

import { dispatch, useStore } from '@zus/store'
import { setActiveGameAction, loadSettingsAction } from '@zus/actions'

import { GAMES } from '@constants/config'

let appInitPromise: Promise<void> | null = null

const App = () => {
  const activeGame = useStore(state => state.app.activeGame)
  const [isReady, setIsReady] = useState(false)

  //
  // ─── LIFECYCLE ──────────────────────────────────────────────────────────────────
  //

  useEffect(() => {
    let cancelled = false

    // StrictMode in development mounts twice; share bootstrap work and ignore stale completions.
    const init = async () => {
      if (!appInitPromise) {
        appInitPromise = (async () => {
          await dispatch(loadGameFromUrl())
          await dispatch(loadSettingsAction())
        })()
      }

      await appInitPromise

      if (!cancelled) setIsReady(true)
    }

    init()

    return () => {
      cancelled = true
    }
  }, [])

  //
  // ─── METHODS ────────────────────────────────────────────────────────────────────
  //

  const loadGameFromUrl = async () => {
    try {
      const path = window.location.pathname.replace(/\//g, '')

      if (!path) return null

      const game = GAMES.find(game => game.id === path)

      if (game) dispatch(setActiveGameAction(game))
    } catch (error) {
      console.error(error)
    }
  }

  //
  // ─── RENDER ─────────────────────────────────────────────────────────────────────
  //

  const MainContent: any = activeGame?.component || Home

  return (
    <div id="app">
      {isReady ? (
        <>
          <Sidebar />

          <MainContent />

          <GlobalKeyHandler />

          <Portal node={document && document.getElementById('portal')}>
            <Settings />
          </Portal>
        </>
      ) : null}

      <style jsx>{`
        #app {
          display: flex;
          width: 100vw;
          height: 100vh;
          min-height: 100vh;
          flex-flow: row nowrap;
          justify-content: center;
          align-items: stretch;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}

export default App
