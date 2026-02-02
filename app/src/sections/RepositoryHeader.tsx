import { 
  Book, 
  GitPullRequest, 
  Shield, 
  Play, 
  BarChart3, 
  Settings,
  GitFork,
  Star,
  Eye,
  Code
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function RepositoryHeader() {
  const tabs = [
    { icon: Code, label: 'Code', count: null, active: true },
    { icon: Book, label: 'Issues', count: 919, active: false },
    { icon: GitPullRequest, label: 'Pull requests', count: 865, active: false },
    { icon: Book, label: 'Discussions', count: null, active: false },
    { icon: Play, label: 'Actions', count: null, active: false },
    { icon: Shield, label: 'Security', count: 3, active: false },
    { icon: BarChart3, label: 'Insights', count: null, active: false },
    { icon: Settings, label: 'Settings', count: null, active: false },
  ]

  return (
    <div className="border-b border-[#30363d]">
      <div className="max-w-[1280px] mx-auto px-4 py-4">
        {/* Repository Title Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <Book className="h-5 w-5 text-[#7d8590]" />
            <a href="#" className="text-[#2f81f7] hover:underline text-lg font-semibold">
              openclaw
            </a>
            <span className="text-[#7d8590]">/</span>
            <a href="#" className="text-[#2f81f7] hover:underline text-lg font-semibold">
              openclaw
            </a>
            <Badge 
              variant="outline" 
              className="border-[#30363d] text-[#7d8590] text-xs font-normal"
            >
              Public
            </Badge>
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              className="bg-[#21262d] border-[#30363d] text-[#e6edf3] hover:bg-[#30363d] gap-2"
            >
              <Eye className="h-4 w-4 text-[#7d8590]" />
              Notifications
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="bg-[#21262d] border-[#30363d] text-[#e6edf3] hover:bg-[#30363d] gap-2"
            >
              <GitFork className="h-4 w-4 text-[#7d8590]" />
              Fork
              <span className="text-[#7d8590]">22k</span>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="bg-[#21262d] border-[#30363d] text-[#e6edf3] hover:bg-[#30363d] gap-2"
            >
              <Star className="h-4 w-4 text-[#7d8590]" />
              Star
              <span className="text-[#7d8590]">147k</span>
            </Button>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <a
              key={tab.label}
              href="#"
              className={`flex items-center gap-2 px-3 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                tab.active
                  ? 'border-[#fd8c73] text-[#e6edf3]'
                  : 'border-transparent text-[#7d8590] hover:text-[#e6edf3] hover:border-[#30363d]'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
              {tab.count !== null && (
                <span className="bg-[#30363d] text-[#e6edf3] text-xs px-2 py-0.5 rounded-full">
                  {tab.count}
                </span>
              )}
            </a>
          ))}
        </nav>
      </div>
    </div>
  )
}
