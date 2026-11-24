import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import DataFromApi from './examples/DataFromApi'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <DataFromApi loading={true} />
  </StrictMode>,
)
