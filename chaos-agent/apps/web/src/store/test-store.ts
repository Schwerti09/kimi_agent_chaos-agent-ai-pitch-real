import { create } from 'zustand'

export type AgentPersona = 
  | 'boomer' 
  | 'hacker' 
  | 'shopper' 
  | 'mobile-user' 
  | 'impatient' 
  | 'explorer'

export interface Agent {
  id: string
  name: string
  persona: AgentPersona
  status: 'idle' | 'running' | 'completed' | 'error'
  progress: number
  currentAction?: string
  screenshot?: string
  logs: string[]
  errors: Array<{
    timestamp: string
    message: string
    type: 'error' | 'warning' | 'info'
  }>
}

export interface TestRun {
  id: string
  url: string
  status: 'pending' | 'running' | 'completed' | 'failed'
  startedAt?: string
  completedAt?: string
  agents: Agent[]
  summary?: {
    totalErrors: number
    totalWarnings: number
    criticalIssues: number
    uxIssues: number
    performanceScore: number
  }
  videoUrl?: string
}

interface TestState {
  currentTest: TestRun | null
  testHistory: TestRun[]
  isLoading: boolean
  startTest: (url: string, personas: AgentPersona[]) => Promise<void>
  stopTest: () => void
  updateAgentStatus: (agentId: string, updates: Partial<Agent>) => void
  addAgentLog: (agentId: string, log: string) => void
}

export const useTestStore = create<TestState>((set, get) => ({
  currentTest: null,
  testHistory: [],
  isLoading: false,

  startTest: async (url, personas) => {
    set({ isLoading: true })
    
    const agents: Agent[] = personas.map((persona, index) => ({
      id: `agent-${index}`,
      name: getAgentName(persona),
      persona,
      status: 'idle',
      progress: 0,
      logs: [],
      errors: [],
    }))

    const newTest: TestRun = {
      id: `test-${Date.now()}`,
      url,
      status: 'running',
      startedAt: new Date().toISOString(),
      agents,
    }

    set({ currentTest: newTest, isLoading: false })

    // Simulate agent progress
    agents.forEach((agent, index) => {
      setTimeout(() => {
        get().updateAgentStatus(agent.id, { status: 'running' })
        simulateAgentProgress(agent.id, get)
      }, index * 500)
    })
  },

  stopTest: () => {
    const { currentTest } = get()
    if (currentTest) {
      set({
        currentTest: {
          ...currentTest,
          status: 'completed',
          completedAt: new Date().toISOString(),
          summary: {
            totalErrors: Math.floor(Math.random() * 10),
            totalWarnings: Math.floor(Math.random() * 20),
            criticalIssues: Math.floor(Math.random() * 5),
            uxIssues: Math.floor(Math.random() * 15),
            performanceScore: Math.floor(Math.random() * 40) + 60,
          },
        },
      })
    }
  },

  updateAgentStatus: (agentId, updates) => {
    const { currentTest } = get()
    if (!currentTest) return

    const updatedAgents = currentTest.agents.map((agent) =>
      agent.id === agentId ? { ...agent, ...updates } : agent
    )

    set({
      currentTest: { ...currentTest, agents: updatedAgents },
    })
  },

  addAgentLog: (agentId, log) => {
    const { currentTest } = get()
    if (!currentTest) return

    const updatedAgents = currentTest.agents.map((agent) =>
      agent.id === agentId
        ? { ...agent, logs: [...agent.logs, log] }
        : agent
    )

    set({
      currentTest: { ...currentTest, agents: updatedAgents },
    })
  },
}))

function getAgentName(persona: AgentPersona): string {
  const names: Record<AgentPersona, string> = {
    boomer: 'The Boomer',
    hacker: 'The Hacker',
    shopper: 'The Shopper',
    'mobile-user': 'Mobile User',
    impatient: 'The Impatient',
    explorer: 'The Explorer',
  }
  return names[persona]
}

function simulateAgentProgress(agentId: string, get: () => TestState) {
  let progress = 0
  const interval = setInterval(() => {
    progress += Math.random() * 15
    if (progress >= 100) {
      progress = 100
      clearInterval(interval)
      get().updateAgentStatus(agentId, { 
        status: 'completed', 
        progress: 100,
        currentAction: 'Test completed'
      })
    } else {
      get().updateAgentStatus(agentId, { 
        progress,
        currentAction: getRandomAction()
      })
      if (Math.random() > 0.7) {
        get().addAgentLog(agentId, getRandomLog())
      }
    }
  }, 1000)
}

function getRandomAction(): string {
  const actions = [
    'Scanning DOM structure...',
    'Clicking random elements...',
    'Testing form inputs...',
    'Checking responsive layout...',
    'Analyzing console logs...',
    'Testing navigation...',
    'Checking accessibility...',
    'Simulating network errors...',
  ]
  return actions[Math.floor(Math.random() * actions.length)]
}

function getRandomLog(): string {
  const logs = [
    'Found 3 broken links',
    'Console error: undefined is not a function',
    'Form validation passed',
    'Page load time: 2.3s',
    'Detected 2 accessibility issues',
    'Mobile viewport test: OK',
    'JavaScript error at line 42',
    'API response: 200 OK',
  ]
  return logs[Math.floor(Math.random() * logs.length)]
}
