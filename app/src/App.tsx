import GitHubHeader from './sections/GitHubHeader'
import RepositoryHeader from './sections/RepositoryHeader'
import RepositoryContent from './sections/RepositoryContent'
import Sidebar from './sections/Sidebar'

function App() {
  return (
    <div className="min-h-screen bg-[#0d1117] text-[#e6edf3]">
      <GitHubHeader />
      <RepositoryHeader />
      <div className="max-w-[1280px] mx-auto px-4 py-6">
        <div className="flex gap-8">
          <main className="flex-1 min-w-0">
            <RepositoryContent />
          </main>
          <aside className="w-[296px] hidden lg:block shrink-0">
            <Sidebar />
          </aside>
        </div>
      </div>
    </div>
  )
}

export default App
