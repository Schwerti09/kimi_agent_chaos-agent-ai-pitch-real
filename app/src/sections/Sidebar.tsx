import { 
  Link2, 
  BookOpen, 
  Scale, 
  Users, 
  Shield, 
  Activity,
  Settings,
  Star,
  Eye,
  GitFork,
  Tag
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const topics = [
  'ai',
  'personal',
  'assistant',
  'own-your-data',
  'crustacean',
  'molty',
  'openclaw',
]

const contributors = [
  { name: 'steipete', avatar: 'https://avatars.githubusercontent.com/u/58493?v=4' },
  { name: 'thewilloftheshadow', avatar: 'https://avatars.githubusercontent.com/u/38344313?v=4' },
  { name: 'claude', avatar: 'https://avatars.githubusercontent.com/u/136792301?v=4' },
  { name: 'vignesh07', avatar: 'https://avatars.githubusercontent.com/u/123456?v=4' },
  { name: 'tyler6204', avatar: 'https://avatars.githubusercontent.com/u/234567?v=4' },
  { name: 'cpojer', avatar: 'https://avatars.githubusercontent.com/u/13352?v=4' },
  { name: 'obviyus', avatar: 'https://avatars.githubusercontent.com/u/345678?v=4' },
  { name: 'gumadeiras', avatar: 'https://avatars.githubusercontent.com/u/456789?v=4' },
  { name: 'onutc', avatar: 'https://avatars.githubusercontent.com/u/567890?v=4' },
  { name: 'joshp123', avatar: 'https://avatars.githubusercontent.com/u/678901?v=4' },
  { name: 'mukhtharcm', avatar: 'https://avatars.githubusercontent.com/u/789012?v=4' },
  { name: 'shakkernerd', avatar: 'https://avatars.githubusercontent.com/u/890123?v=4' },
  { name: 'sebslight', avatar: 'https://avatars.githubusercontent.com/u/901234?v=4' },
  { name: 'lc0rp', avatar: 'https://avatars.githubusercontent.com/u/12345?v=4' },
]

const languages = [
  { name: 'TypeScript', percentage: 82.9, color: '#3178c6' },
  { name: 'Swift', percentage: 13.1, color: '#f05138' },
  { name: 'Kotlin', percentage: 1.8, color: '#a97bff' },
  { name: 'Shell', percentage: 0.8, color: '#89e051' },
  { name: 'CSS', percentage: 0.5, color: '#563d7c' },
  { name: 'JavaScript', percentage: 0.4, color: '#f1e05a' },
  { name: 'Other', percentage: 0.5, color: '#ededed' },
]

export default function Sidebar() {
  return (
    <div className="space-y-6">
      {/* About Section */}
      <div>
        <h3 className="text-[#e6edf3] font-semibold mb-2">About</h3>
        <p className="text-[#e6edf3] text-sm mb-3">
          Your own personal AI assistant. Any OS. Any Platform. The lobster way. 🦞
        </p>
        <a 
          href="#" 
          className="flex items-center gap-2 text-[#2f81f7] hover:underline text-sm"
        >
          <Link2 className="h-4 w-4" />
          openclaw.ai
        </a>
      </div>
      
      {/* Topics */}
      <div>
        <div className="flex flex-wrap gap-2">
          {topics.map((topic) => (
            <a
              key={topic}
              href="#"
              className="text-[#2f81f7] bg-[#388bfd1a] hover:bg-[#388bfd26] px-3 py-1 rounded-full text-xs transition-colors"
            >
              {topic}
            </a>
          ))}
        </div>
      </div>
      
      {/* Resources */}
      <div>
        <h3 className="text-[#e6edf3] font-semibold mb-2">Resources</h3>
        <div className="space-y-1">
          <a 
            href="#" 
            className="flex items-center gap-2 text-[#7d8590] hover:text-[#2f81f7] text-sm py-1"
          >
            <BookOpen className="h-4 w-4" />
            Readme
          </a>
          <a 
            href="#" 
            className="flex items-center gap-2 text-[#7d8590] hover:text-[#2f81f7] text-sm py-1"
          >
            <Scale className="h-4 w-4" />
            MIT license
          </a>
          <a 
            href="#" 
            className="flex items-center gap-2 text-[#7d8590] hover:text-[#2f81f7] text-sm py-1"
          >
            <Users className="h-4 w-4" />
            Contributing
          </a>
          <a 
            href="#" 
            className="flex items-center gap-2 text-[#7d8590] hover:text-[#2f81f7] text-sm py-1"
          >
            <Shield className="h-4 w-4" />
            Security policy
          </a>
          <a 
            href="#" 
            className="flex items-center gap-2 text-[#7d8590] hover:text-[#2f81f7] text-sm py-1"
          >
            <Activity className="h-4 w-4" />
            Activity
          </a>
          <a 
            href="#" 
            className="flex items-center gap-2 text-[#7d8590] hover:text-[#2f81f7] text-sm py-1"
          >
            <Settings className="h-4 w-4" />
            Custom properties
          </a>
        </div>
      </div>
      
      {/* Stats */}
      <div className="flex items-center gap-4 text-sm">
        <a href="#" className="flex items-center gap-1 text-[#7d8590] hover:text-[#2f81f7]">
          <Star className="h-4 w-4" />
          <span className="text-[#e6edf3] font-semibold">147k</span> stars
        </a>
        <a href="#" className="flex items-center gap-1 text-[#7d8590] hover:text-[#2f81f7]">
          <Eye className="h-4 w-4" />
          <span className="text-[#e6edf3] font-semibold">773</span> watching
        </a>
        <a href="#" className="flex items-center gap-1 text-[#7d8590] hover:text-[#2f81f7]">
          <GitFork className="h-4 w-4" />
          <span className="text-[#e6edf3] font-semibold">22k</span> forks
        </a>
      </div>
      
      {/* Report Repository */}
      <a 
        href="#" 
        className="text-[#7d8590] hover:text-[#2f81f7] text-xs"
      >
        Report repository
      </a>
      
      {/* Releases */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[#e6edf3] font-semibold">Releases</h3>
          <span className="text-[#7d8590] text-xs bg-[#30363d] px-2 py-0.5 rounded-full">
            35
          </span>
        </div>
        <div className="border border-[#30363d] rounded-md p-3">
          <div className="flex items-center gap-2 mb-1">
            <Tag className="h-4 w-4 text-[#e6edf3]" />
            <a href="#" className="text-[#2f81f7] hover:underline text-sm font-medium">
              openclaw 2026.1.30
            </a>
            <Badge className="bg-[#238636] text-white text-[10px] px-1.5 py-0">
              Latest
            </Badge>
          </div>
          <p className="text-[#7d8590] text-xs ml-6">2 days ago</p>
        </div>
        <a 
          href="#" 
          className="flex items-center gap-1 text-[#2f81f7] hover:underline text-sm mt-2"
        >
          + 34 releases
        </a>
      </div>
      
      {/* Contributors */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[#e6edf3] font-semibold">Contributors</h3>
          <span className="text-[#7d8590] text-xs bg-[#30363d] px-2 py-0.5 rounded-full">
            376
          </span>
        </div>
        <div className="flex flex-wrap gap-1">
          {contributors.map((contributor) => (
            <a
              key={contributor.name}
              href="#"
              className="relative group"
              title={contributor.name}
            >
              <img
                src={contributor.avatar}
                alt={contributor.name}
                className="w-8 h-8 rounded-full border border-[#30363d] hover:border-[#2f81f7] transition-colors"
              />
            </a>
          ))}
        </div>
        <a 
          href="#" 
          className="flex items-center gap-1 text-[#2f81f7] hover:underline text-sm mt-2"
        >
          + 362 contributors
        </a>
      </div>
      
      {/* Languages */}
      <div>
        <h3 className="text-[#e6edf3] font-semibold mb-2">Languages</h3>
        <div className="h-2 flex rounded-full overflow-hidden mb-3">
          {languages.map((lang) => (
            <div
              key={lang.name}
              style={{ 
                width: `${lang.percentage}%`, 
                backgroundColor: lang.color 
              }}
              className="h-full"
              title={`${lang.name} ${lang.percentage}%`}
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {languages.map((lang) => (
            <a
              key={lang.name}
              href="#"
              className="flex items-center gap-1.5 text-xs text-[#7d8590] hover:text-[#2f81f7]"
            >
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: lang.color }}
              />
              {lang.name}
              <span className="text-[#7d8590]">{lang.percentage}%</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
