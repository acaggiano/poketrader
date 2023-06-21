import React from 'react'

import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

import App from './components/App'
import './App.css'

const queryClient = new QueryClient()

function MainApp() {

  return (
    <main>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </main>
  )

}

export default MainApp
