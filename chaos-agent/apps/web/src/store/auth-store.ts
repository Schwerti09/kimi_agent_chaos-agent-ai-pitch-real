import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  email: string
  name: string
  avatar?: string
  subscription: 'free' | 'starter' | 'pro' | 'enterprise'
  subscriptionEndsAt?: string
}

interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
  updateSubscription: (tier: User['subscription']) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      isAuthenticated: false,

      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setLoading: (isLoading) => set({ isLoading }),

      login: async (email, password) => {
        set({ isLoading: true })
        try {
          const mockUser: User = {
            id: '1',
            email,
            name: 'Demo User',
            subscription: 'free',
          }
          set({ user: mockUser, isAuthenticated: true })
        } finally {
          set({ isLoading: false })
        }
      },

      signup: async (email, password, name) => {
        set({ isLoading: true })
        try {
          const mockUser: User = {
            id: '1',
            email,
            name,
            subscription: 'free',
          }
          set({ user: mockUser, isAuthenticated: true })
        } finally {
          set({ isLoading: false })
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false })
      },

      updateSubscription: (tier) => {
        const { user } = get()
        if (user) {
          set({ user: { ...user, subscription: tier } })
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)
