import { useState, useCallback } from 'react'
import HeroSection from './sections/HeroSection'
import DataUploadSection from './sections/DataUploadSection'
import ModelSelectionSection from './sections/ModelSelectionSection'
import TaskSelectionSection from './sections/TaskSelectionSection'
import ProgressSection from './sections/ProgressSection'
import ResultsSection from './sections/ResultsSection'
import SectionTransition from './components/SectionTransition'
import PasswordGate from './components/PasswordGate'

export type Modality = 'fmri' | 'eeg' | 'visual' | null

/** Map modality → foundation model name */
export function getModelForModality(modality: Modality): string | null {
  switch (modality) {
    case 'fmri': return 'SWIFT'
    case 'eeg': return 'DIVER'
    case 'visual': return 'VLM'
    default: return null
  }
}

export interface PipelineState {
  modality: Modality
  selectedModel: string | null
  selectedTask: string | null
  isProcessing: boolean
  isComplete: boolean
}

function App() {
  const [pipeline, setPipeline] = useState<PipelineState>({
    modality: null,
    selectedModel: null,
    selectedTask: null,
    isProcessing: false,
    isComplete: false,
  })

  const setModality = useCallback((m: Modality) => {
    setPipeline(prev => ({
      ...prev,
      modality: m,
      selectedModel: getModelForModality(m),
      selectedTask: null,
      isProcessing: false,
      isComplete: false,
    }))
  }, [])

  const setTask = useCallback((task: string | null) => {
    setPipeline(prev => ({
      ...prev,
      selectedTask: task,
      isProcessing: false,
      isComplete: false,
    }))
  }, [])

  const startProcessing = useCallback(() => {
    setPipeline(prev => ({ ...prev, isProcessing: true, isComplete: false }))
  }, [])

  const completeProcessing = useCallback(() => {
    setPipeline(prev => ({ ...prev, isProcessing: false, isComplete: true }))
  }, [])

  return (
    <PasswordGate>
    <main className="overflow-x-hidden">
      <HeroSection />
      <SectionTransition from="dark" to="light" />
      <DataUploadSection modality={pipeline.modality} onModalityChange={setModality} />
      <ModelSelectionSection selectedModel={pipeline.selectedModel} />
      <TaskSelectionSection
        enabled={pipeline.selectedModel !== null}
        selectedTask={pipeline.selectedTask}
        onTaskChange={setTask}
      />
      <SectionTransition from="light" to="dark" />
      <ProgressSection
        enabled={pipeline.selectedTask !== null}
        isProcessing={pipeline.isProcessing}
        isComplete={pipeline.isComplete}
        onStart={startProcessing}
        onComplete={completeProcessing}
      />
      <SectionTransition from="dark" to="light" />
      <ResultsSection
        isComplete={pipeline.isComplete}
        selectedTask={pipeline.selectedTask}
      />

      {/* Footer */}
      <footer className="bg-hero-bg py-12 px-6 text-center">
        <p className="text-text-light/40 font-mono text-sm">
          © 2026 Transconnectome · ARPA-H AI Foundation Model Demo
        </p>
      </footer>
    </main>
    </PasswordGate>
  )
}

export default App
