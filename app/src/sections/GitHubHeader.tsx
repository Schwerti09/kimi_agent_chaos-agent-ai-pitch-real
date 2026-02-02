import { 
  ChevronDown, 
  Search, 
  Menu,
  Github
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function GitHubHeader() {
  return (
    <header className="bg-[#010409] border-b border-[#30363d] px-4 py-3">
      <div className="flex items-center justify-between max-w-[1280px] mx-auto">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden text-[#e6edf3] hover:bg-[#30363d]"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <a href="#" className="flex items-center">
            <Github className="h-8 w-8 text-white" />
          </a>
          
          <nav className="hidden lg:flex items-center gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="text-[#e6edf3] hover:bg-[#30363d] gap-1"
                >
                  Platform <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#161b22] border-[#30363d]">
                <DropdownMenuItem className="text-[#e6edf3] hover:bg-[#30363d]">
                  GitHub Copilot
                </DropdownMenuItem>
                <DropdownMenuItem className="text-[#e6edf3] hover:bg-[#30363d]">
                  Security
                </DropdownMenuItem>
                <DropdownMenuItem className="text-[#e6edf3] hover:bg-[#30363d]">
                  Actions
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="text-[#e6edf3] hover:bg-[#30363d] gap-1"
                >
                  Solutions <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#161b22] border-[#30363d]">
                <DropdownMenuItem className="text-[#e6edf3] hover:bg-[#30363d]">
                  For Enterprise
                </DropdownMenuItem>
                <DropdownMenuItem className="text-[#e6edf3] hover:bg-[#30363d]">
                  For Teams
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="text-[#e6edf3] hover:bg-[#30363d] gap-1"
                >
                  Resources <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#161b22] border-[#30363d]">
                <DropdownMenuItem className="text-[#e6edf3] hover:bg-[#30363d]">
                  Documentation
                </DropdownMenuItem>
                <DropdownMenuItem className="text-[#e6edf3] hover:bg-[#30363d]">
                  GitHub Skills
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button 
              variant="ghost" 
              className="text-[#e6edf3] hover:bg-[#30363d]"
            >
              Open Source
            </Button>
            
            <Button 
              variant="ghost" 
              className="text-[#e6edf3] hover:bg-[#30363d]"
            >
              Enterprise
            </Button>
            
            <Button 
              variant="ghost" 
              className="text-[#e6edf3] hover:bg-[#30363d]"
            >
              Pricing
            </Button>
          </nav>
        </div>
        
        {/* Right Section */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7d8590]" />
              <input
                type="text"
                placeholder="Search or jump to..."
                className="w-[240px] bg-[#0d1117] border border-[#30363d] rounded-md py-1.5 pl-9 pr-3 text-sm text-[#e6edf3] placeholder:text-[#7d8590] focus:outline-none focus:border-[#2f81f7] focus:ring-1 focus:ring-[#2f81f7]"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[#7d8590] text-xs border border-[#30363d] rounded px-1.5 py-0.5">
                /
              </span>
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon"
            className="md:hidden text-[#e6edf3] hover:bg-[#30363d]"
          >
            <Search className="h-5 w-5" />
          </Button>
          
          <div className="h-5 w-px bg-[#30363d] mx-1 hidden sm:block" />
          
          <Button 
            variant="ghost" 
            className="hidden sm:flex text-[#e6edf3] hover:bg-[#30363d]"
          >
            Sign in
          </Button>
          
          <Button 
            className="hidden sm:flex bg-transparent border border-[#30363d] text-[#e6edf3] hover:bg-[#30363d]"
          >
            Sign up
          </Button>
        </div>
      </div>
    </header>
  )
}
