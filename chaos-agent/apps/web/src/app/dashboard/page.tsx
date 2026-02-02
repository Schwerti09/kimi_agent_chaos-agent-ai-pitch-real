'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Zap, 
  Play, 
  Square, 
  Bug, 
  AlertTriangle, 
  CheckCircle2,
  Clock,
  Monitor,
  Terminal,
  ChevronDown,
  ChevronUp,
  Download,
  Share2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useTestStore } from '@/store/test-store'
import Link from 'next/link'

const personaColors: Record<string, string> = {
  boomer: '#f59e0b',
  hacker: '#ef4444',
  shopper: '#10b981',
  'mobile-user': '#3b82f6',
  impatient: '#f97316',
  explorer: '#8b5cf6',
}

const personaIcons: Record<string, string> = {
  boomer: '👴',
  hacker: '👨‍💻',
  shopper: '🛒',
  'mobile-user': '📱',
  impatient: '⏰',
  explorer: '🌍',
}

export default function DashboardPage() {
  const { currentTest, stopTest } = useTestStore()
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)
  const [expandedLogs, setExpandedLogs] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (currentTest?.status === 'running') {
      const allCompleted = currentTest.agents.every(
        (a) => a.status === 'completed' || a.status === 'error'
      )
      if (allCompleted) {
        stopTest()
      }
    }
  }, [currentTest, stopTest])

  if (!currentTest) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <Zap className="w-16 h-16 text-chaos-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">No Active Test</h1>
          <p className="text-gray-400 mb-6">Start a new test from the homepage</p>
          <Link href="/">
            <Button className="bg-gradient-to-r from-chaos-600 to-cyber-600">
              <Play className="w-4 h-4 mr-2" />
              Start New Test
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const toggleLogs = (agentId: string) => {
    setExpandedLogs((prev) => {
      const next = new Set(prev)
      if (next.has(agentId)) {
        next.delete(agentId)
      } else {
        next.add(agentId)
      }
      return next
    })
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-white/10 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-chaos-500" />
              <span className="font-bold">Chaos-Agent.ai</span>
            </Link>
            <div className="h-6 w-px bg-white/10" />
            <span className="text-gray-400 text-sm truncate max-w-[200px] md:max-w-md">
              {currentTest.url}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {currentTest.status === 'running' ? (
              <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/50">
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse mr-1" />
                Running
              </Badge>
            ) : (
              <Badge className="bg-green-500/20 text-green-500 border-green-500/50">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Completed
              </Badge>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4">
        <div className="max-w-7xl mx-auto">
          {/* Stats Bar */}
          {currentTest.summary && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6"
            >
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                  <Bug className="w-4 h-4" />
                  Errors
                </div>
                <div className="text-2xl font-bold text-red-500">
                  {currentTest.summary.totalErrors}
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                  <AlertTriangle className="w-4 h-4" />
                  Warnings
                </div>
                <div className="text-2xl font-bold text-yellow-500">
                  {currentTest.summary.totalWarnings}
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                  <Bug className="w-4 h-4" />
                  Critical
                </div>
                <div className="text-2xl font-bold text-red-600">
                  {currentTest.summary.criticalIssues}
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                  <Monitor className="w-4 h-4" />
                  UX Issues
                </div>
                <div className="text-2xl font-bold text-orange-500">
                  {currentTest.summary.uxIssues}
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                  <Clock className="w-4 h-4" />
                  Performance
                </div>
                <div className="text-2xl font-bold text-cyber-500">
                  {currentTest.summary.performanceScore}/100
                </div>
              </div>
            </motion.div>
          )}

          {/* Agent Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
            {currentTest.agents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedAgent(agent.id)}
                className={`agent-video-container cursor-pointer ${
                  selectedAgent === agent.id ? 'active' : ''
                }`}
              >
                {/* Video Placeholder */}
                <div 
                  className="aspect-video bg-gradient-to-br from-gray-900 to-black flex items-center justify-center relative overflow-hidden"
                  style={{
                    boxShadow: agent.status === 'running' 
                      ? `0 0 20px ${personaColors[agent.persona]}40`
                      : 'none'
                  }}
                >
                  {/* Scan line effect */}
                  {agent.status === 'running' && (
                    <div className="scan-line" />
                  )}
                  
                  {/* Agent Icon */}
                  <div className="text-4xl">{personaIcons[agent.persona]}</div>
                  
                  {/* Status overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  {/* Progress bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                    <div 
                      className="h-full transition-all duration-500"
                      style={{ 
                        width: `${agent.progress}%`,
                        backgroundColor: personaColors[agent.persona]
                      }}
                    />
                  </div>
                  
                  {/* Status badge */}
                  <div className="absolute top-2 left-2">
                    <Badge 
                      variant="outline" 
                      className="text-[10px] bg-black/50 border-white/20"
                    >
                      {agent.status === 'running' && (
                        <div 
                          className="w-2 h-2 rounded-full animate-pulse mr-1"
                          style={{ backgroundColor: personaColors[agent.persona] }}
                        />
                      )}
                      {agent.status}
                    </Badge>
                  </div>
                </div>
                
                {/* Agent Info */}
                <div className="p-3 bg-white/5">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{agent.name}</span>
                    <span className="text-xs text-gray-500">
                      {Math.round(agent.progress)}%
                    </span>
                  </div>
                  {agent.currentAction && (
                    <p className="text-xs text-gray-400 truncate mt-1">
                      {agent.currentAction}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Details Panel */}
          {selectedAgent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 border border-white/10 rounded-lg overflow-hidden"
            >
              <Tabs defaultValue="logs">
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold">
                      {currentTest.agents.find(a => a.id === selectedAgent)?.name}
                    </span>
                    <Badge variant="agent">
                      {currentTest.agents.find(a => a.id === selectedAgent)?.persona}
                    </Badge>
                  </div>
                  <TabsList className="bg-white/5">
                    <TabsTrigger value="logs">Logs</TabsTrigger>
                    <TabsTrigger value="errors">Errors</TabsTrigger>
                    <TabsTrigger value="screenshots">Screenshots</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="logs" className="p-0">
                  <div className="bg-black/50 p-4 font-mono text-sm max-h-64 overflow-y-auto">
                    {currentTest.agents
                      .find(a => a.id === selectedAgent)
                      ?.logs.map((log, i) => (
                        <div key={i} className="terminal-line text-gray-300 mb-1">
                          <span className="text-gray-500">[{new Date().toLocaleTimeString()}]</span>{' '}
                          {log}
                        </div>
                      )) || (
                        <div className="text-gray-500 italic">No logs yet...</div>
                      )}
                  </div>
                </TabsContent>

                <TabsContent value="errors" className="p-4">
                  <div className="space-y-2">
                    {currentTest.agents
                      .find(a => a.id === selectedAgent)
                      ?.errors.length === 0 ? (
                      <div className="text-gray-500 italic">No errors found</div>
                    ) : (
                      currentTest.agents
                        .find(a => a.id === selectedAgent)
                        ?.errors.map((error, i) => (
                          <div 
                            key={i} 
                            className={`p-3 rounded-lg border ${
                              error.type === 'error' 
                                ? 'bg-red-500/10 border-red-500/30' 
                                : 'bg-yellow-500/10 border-yellow-500/30'
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              {error.type === 'error' ? (
                                <Bug className="w-4 h-4 text-red-500" />
                              ) : (
                                <AlertTriangle className="w-4 h-4 text-yellow-500" />
                              )}
                              <span className="font-medium">{error.type}</span>
                              <span className="text-gray-500 text-sm">
                                {new Date(error.timestamp).toLocaleTimeString()}
                              </span>
                            </div>
                            <p className="text-sm text-gray-300">{error.message}</p>
                          </div>
                        ))
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="screenshots" className="p-4">
                  <div className="grid grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div 
                        key={i}
                        className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center"
                      >
                        <span className="text-gray-500 text-sm">
                          Screenshot {i}
                        </span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" className="border-white/20">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline" className="border-white/20">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Link href="/">
              <Button className="bg-gradient-to-r from-chaos-600 to-cyber-600">
                <Play className="w-4 h-4 mr-2" />
                New Test
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
