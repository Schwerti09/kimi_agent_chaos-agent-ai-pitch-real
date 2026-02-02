import { 
  GitBranch, 
  Tag, 
  Search,
  ChevronDown,
  Code,
  Folder,
  FileText,
  History
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FileItem {
  name: string
  type: 'folder' | 'file'
  commit: string
  date: string
  isNested?: boolean
  nestedName?: string
}

const files: FileItem[] = [
  { name: '.agent/workflows', type: 'folder', commit: 'chore: Run pnpm format:fix.', date: '2 days ago', isNested: true, nestedName: 'workflows' },
  { name: '.github', type: 'folder', commit: 'ci(formal): compute drift for generated/ before model checking', date: '31 minutes ago' },
  { name: '.pi', type: 'folder', commit: 'chore: fix Pi prompt template argument syntax (#6543)', date: '13 hours ago' },
  { name: 'Swabble', type: 'folder', commit: 'refactor: rename to openclaw', date: '3 days ago' },
  { name: 'apps', type: 'folder', commit: 'chore: bump to 2026.2.1', date: '22 minutes ago' },
  { name: 'assets', type: 'folder', commit: 'refactor: rename to openclaw', date: '3 days ago' },
  { name: 'docs', type: 'folder', commit: 'chore: bump to 2026.2.1', date: '22 minutes ago' },
  { name: 'extensions', type: 'folder', commit: 'chore: bump to 2026.2.1', date: '22 minutes ago' },
  { name: 'git-hooks', type: 'folder', commit: 'fix: add git hook setup and stable config hash sorting', date: '2 weeks ago' },
  { name: 'packages', type: 'folder', commit: 'chore: Run pnpm format:fix.', date: '2 days ago' },
  { name: 'patches', type: 'folder', commit: 'fix: bundle mac model catalog', date: '2 weeks ago' },
  { name: 'scripts', type: 'folder', commit: 'chore: Enable typescript/no-explicit-any rule.', date: '2 hours ago' },
  { name: 'skills', type: 'folder', commit: 'chore: oxfmt fixes', date: '12 hours ago' },
  { name: 'src', type: 'folder', commit: 'chore: bump to 2026.2.1', date: '22 minutes ago' },
  { name: 'test', type: 'folder', commit: 'chore: Enable "experimentalSortImports" in Oxfmt and reformat all imports', date: 'yesterday' },
  { name: 'ui', type: 'folder', commit: 'chore: Re-enable no-redundant-type-constituents rule.', date: '2 hours ago' },
  { name: 'vendor/a2ui', type: 'folder', commit: 'refactor(vendor): align a2ui renderer typings', date: '3 weeks ago', isNested: true, nestedName: 'a2ui' },
  { name: '.detect-secrets.cfg', type: 'file', commit: 'chore: stabilize prek hooks runner selection (#1720) (thanks @dguido)', date: 'last week' },
  { name: '.dockerignore', type: 'file', commit: 'Docker: add root-level setup', date: 'last month' },
  { name: '.env.example', type: 'file', commit: 'Add warelay CLI with Twilio webhook support', date: '2 weeks ago' },
  { name: '.gitattributes', type: 'file', commit: 'ci: enforce lf line endings', date: '3 weeks ago' },
  { name: '.gitignore', type: 'file', commit: 'fix: update remaining ClawdbotKit path references to MoltbotKit', date: '2 weeks ago' },
  { name: '.npmrc', type: 'file', commit: 'build: allow matrix crypto build scripts', date: '1 month ago' },
  { name: '.oxfmtrc.jsonc', type: 'file', commit: 'chore: Enable "experimentalSortImports" in Oxfmt and reformat all imports', date: 'yesterday' },
  { name: '.oxlintrc.json', type: 'file', commit: 'chore: Enable typescript/no-explicit-any rule.', date: '2 hours ago' },
  { name: '.pre-commit-config.yaml', type: 'file', commit: 'chore: Run pnpm format:fix.', date: '2 days ago' },
  { name: '.secrets.baseline', type: 'file', commit: 'chore: stabilize prek hooks runner selection (#1720) (thanks @dguido)', date: 'last week' },
  { name: '.shellcheckrc', type: 'file', commit: 'feat: add prek pre-commit hooks and dependabot (#1720)', date: '2 weeks ago' },
  { name: '.swiftformat', type: 'file', commit: 'fix: update remaining ClawdbotKit path references to MoltbotKit', date: '2 weeks ago' },
  { name: '.swiftlint.yml', type: 'file', commit: 'fix: update remaining ClawdbotKit path references to MoltbotKit', date: '2 weeks ago' },
  { name: 'AGENTS.md', type: 'file', commit: 'chore: Add pnpm check for fast repo checks.', date: '3 days ago' },
]

export default function RepositoryContent() {
  return (
    <div>
      {/* Branch & File Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="bg-[#21262d] border-[#30363d] text-[#e6edf3] hover:bg-[#30363d] gap-2"
          >
            <GitBranch className="h-4 w-4" />
            main
            <ChevronDown className="h-3 w-3" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="bg-transparent border-[#30363d] text-[#7d8590] hover:text-[#e6edf3] hover:bg-[#30363d] gap-2"
          >
            <GitBranch className="h-4 w-4" />
            273
            <span className="hidden sm:inline">Branches</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="bg-transparent border-[#30363d] text-[#7d8590] hover:text-[#e6edf3] hover:bg-[#30363d] gap-2"
          >
            <Tag className="h-4 w-4" />
            40
            <span className="hidden sm:inline">Tags</span>
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7d8590]" />
            <input
              type="text"
              placeholder="Go to file"
              className="w-full sm:w-[200px] bg-[#0d1117] border border-[#30363d] rounded-md py-1.5 pl-9 pr-3 text-sm text-[#e6edf3] placeholder:text-[#7d8590] focus:outline-none focus:border-[#2f81f7] focus:ring-1 focus:ring-[#2f81f7]"
            />
          </div>
          
          <Button
            className="bg-[#238636] hover:bg-[#2ea043] text-white gap-2"
          >
            <Code className="h-4 w-4" />
            Code
            <ChevronDown className="h-3 w-3" />
          </Button>
        </div>
      </div>
      
      {/* File List Header */}
      <div className="border border-[#30363d] rounded-t-md overflow-hidden">
        <div className="bg-[#161b22] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://avatars.githubusercontent.com/u/58493?v=4"
              alt="steipete"
              className="w-6 h-6 rounded-full"
            />
            <a href="#" className="text-[#2f81f7] hover:underline font-medium text-sm">
              steipete
            </a>
            <span className="text-[#7d8590] text-sm">
              chore: bump to 2026.2.1
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <a href="#" className="text-[#7d8590] hover:text-[#2f81f7] font-mono">
              85cd55e
            </a>
            <span className="text-[#7d8590]">·</span>
            <a href="#" className="text-[#7d8590] hover:text-[#2f81f7] flex items-center gap-1">
              <History className="h-4 w-4" />
              <span className="hidden sm:inline">8,631 Commits</span>
            </a>
          </div>
        </div>
        
        {/* File List */}
        <div className="bg-[#0d1117]">
          {/* Column Headers */}
          <div className="grid grid-cols-12 gap-4 px-4 py-2 text-xs text-[#7d8590] border-b border-[#21262d]">
            <div className="col-span-6 sm:col-span-4">Name</div>
            <div className="col-span-6 sm:col-span-5">Latest commit</div>
            <div className="hidden sm:block sm:col-span-3 text-right">Date</div>
          </div>
          
          {/* File Items */}
          {files.map((file, index) => (
            <div
              key={file.name}
              className={`grid grid-cols-12 gap-4 px-4 py-2 text-sm hover:bg-[#161b22] transition-colors ${
                index !== files.length - 1 ? 'border-b border-[#21262d]' : ''
              }`}
            >
              <div className="col-span-6 sm:col-span-4 flex items-center gap-2 min-w-0">
                {file.type === 'folder' ? (
                  <Folder className="h-4 w-4 text-[#7d8590] shrink-0" />
                ) : (
                  <FileText className="h-4 w-4 text-[#7d8590] shrink-0" />
                )}
                <a 
                  href="#" 
                  className="text-[#2f81f7] hover:underline truncate"
                >
                  {file.isNested ? (
                    <span>
                      <span className="text-[#7d8590]">{file.name.split('/')[0]}/</span>
                      {file.nestedName}
                    </span>
                  ) : (
                    file.name
                  )}
                </a>
              </div>
              <div className="col-span-6 sm:col-span-5 flex items-center min-w-0">
                <a 
                  href="#" 
                  className="text-[#7d8590] hover:text-[#2f81f7] hover:underline truncate"
                >
                  {file.commit}
                </a>
              </div>
              <div className="hidden sm:flex sm:col-span-3 items-center justify-end text-[#7d8590]">
                {file.date}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* README Preview */}
      <div className="mt-6 border border-[#30363d] rounded-md overflow-hidden">
        <div className="bg-[#161b22] px-4 py-3 border-b border-[#30363d]">
          <div className="flex items-center gap-2">
            <Book className="h-4 w-4 text-[#7d8590]" />
            <span className="text-[#e6edf3] font-semibold">README.md</span>
          </div>
        </div>
        <div className="bg-[#0d1117] p-8">
          <div className="max-w-[800px]">
            <h1 className="text-3xl font-bold text-[#e6edf3] mb-4 pb-4 border-b border-[#30363d]">
              OpenClaw
            </h1>
            <p className="text-[#e6edf3] text-lg mb-6">
              Your own personal AI assistant. Any OS. Any Platform. The lobster way. 🦞
            </p>
            <div className="prose prose-invert max-w-none">
              <p className="text-[#7d8590]">
                OpenClaw is an open-source AI assistant that runs locally on your device.
                Built with privacy in mind, it ensures your data stays yours.
              </p>
              <h2 className="text-xl font-semibold text-[#e6edf3] mt-6 mb-3">
                Features
              </h2>
              <ul className="list-disc list-inside text-[#7d8590] space-y-1">
                <li>Local AI processing - your data never leaves your device</li>
                <li>Cross-platform support for macOS, Windows, and Linux</li>
                <li>Extensible plugin system</li>
                <li>Beautiful, native UI</li>
                <li>Open source and community driven</li>
              </ul>
              <h2 className="text-xl font-semibold text-[#e6edf3] mt-6 mb-3">
                Getting Started
              </h2>
              <pre className="bg-[#161b22] border border-[#30363d] rounded-md p-4 overflow-x-auto">
                <code className="text-sm text-[#e6edf3]">
                  git clone https://github.com/openclaw/openclaw.git
                  <br />
                  cd openclaw
                  <br />
                  pnpm install
                  <br />
                  pnpm dev
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { Book } from 'lucide-react'
