import HeroSection from './sections/HeroSection'
import DataUploadSection from './sections/DataUploadSection'
import ModelSelectionSection from './sections/ModelSelectionSection'
import TaskSelectionSection from './sections/TaskSelectionSection'
import ProgressSection from './sections/ProgressSection'
import ResultsSection from './sections/ResultsSection'
import SectionTransition from './components/SectionTransition'

function App() {
  return (
    <main className="overflow-x-hidden">
      <HeroSection />
      <SectionTransition from="dark" to="light" />
      <DataUploadSection />
      <ModelSelectionSection />
      <TaskSelectionSection />
      <SectionTransition from="light" to="dark" />
      <ProgressSection />
      <SectionTransition from="dark" to="light" />
      <ResultsSection />

      {/* Footer */}
      <footer className="bg-hero-bg py-12 px-6 text-center">
        <p className="text-text-light/40 font-mono text-sm">
          © 2026 Transconnectome · ARPA-H AI Foundation Model Demo
        </p>
      </footer>
    </main>
  )
}

export default App
