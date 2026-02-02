'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Zap, 
  Shield, 
  Video, 
  Terminal, 
  ChevronRight,
  Play,
  Bug,
  Eye,
  Smartphone,
  Globe,
  Clock,
  CheckCircle2,
  ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useTestStore, AgentPersona } from '@/store/test-store'
import { useAuthStore } from '@/store/auth-store'
import Link from 'next/link'

const personas: { id: AgentPersona; name: string; description: string; icon: any }[] = [
  {
    id: 'boomer',
    name: 'The Boomer',
    description: 'Clicks wildly, zooms to 200%, uses bad internet',
    icon: Eye,
  },
  {
    id: 'hacker',
    name: 'The Hacker',
    description: 'SQL injection attempts, URL manipulation',
    icon: Terminal,
  },
  {
    id: 'shopper',
    name: 'The Shopper',
    description: 'Fills cart, abandons, tries invalid payment',
    icon: ShoppingCart,
  },
  {
    id: 'mobile-user',
    name: 'Mobile User',
    description: 'Tests on mobile viewport, touch interactions',
    icon: Smartphone,
  },
  {
    id: 'impatient',
    name: 'The Impatient',
    description: 'Rapid clicks, double submissions, no waiting',
    icon: Clock,
  },
  {
    id: 'explorer',
    name: 'The Explorer',
    description: 'Deep navigation, edge cases, hidden features',
    icon: Globe,
  },
]

import { ShoppingCart } from 'lucide-react'

export default function HomePage() {
  const [url, setUrl] = useState('')
  const [selectedPersonas, setSelectedPersonas] = useState<AgentPersona[]>(['boomer', 'hacker', 'shopper'])
  const { startTest, isLoading } = useTestStore()
  const { isAuthenticated } = useAuthStore()

  const togglePersona = (persona: AgentPersona) => {
    setSelectedPersonas((prev) =>
      prev.includes(persona)
        ? prev.filter((p) => p !== persona)
        : [...prev, persona]
    )
  }

  const handleStartTest = async () => {
    if (!url) return
    await startTest(url, selectedPersonas)
    window.location.href = '/dashboard'
  }

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-chaos-600/20 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-600/20 rounded-full blur-[128px]" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-6 bg-gradient-to-r from-chaos-600 to-cyber-600 text-white border-0">
              <Zap className="w-3 h-3 mr-1" />
              Autonomous Swarm QA
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="gradient-text">Fire your QA Team.</span>
            <br />
            <span className="text-white">Hire the Swarm.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
          >
            10 autonomous AI agents test your webapp simultaneously. 
            Watch them break things before your users do.
          </motion.p>

          {/* URL Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input
                  type="url"
                  placeholder="Enter your website URL (e.g., https://yourapp.com)"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="pl-12 h-14 bg-white/5 border-white/10 text-white placeholder:text-gray-500 text-lg"
                />
              </div>
              <Button
                onClick={handleStartTest}
                disabled={!url || isLoading || selectedPersonas.length === 0}
                className="h-14 px-8 bg-gradient-to-r from-chaos-600 to-cyber-600 hover:from-chaos-500 hover:to-cyber-500 text-white font-semibold"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Play className="w-5 h-5 mr-2" />
                    Launch Swarm
                  </>
                )}
              </Button>
            </div>
          </motion.div>

          {/* Persona Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-12"
          >
            <p className="text-sm text-gray-500 mb-4">Select your agents</p>
            <div className="flex flex-wrap justify-center gap-3">
              {personas.map((persona) => {
                const Icon = persona.icon
                const isSelected = selectedPersonas.includes(persona.id)
                return (
                  <button
                    key={persona.id}
                    onClick={() => togglePersona(persona.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                      isSelected
                        ? 'bg-chaos-600/20 border-chaos-500 text-white'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{persona.name}</span>
                  </button>
                )
              })}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-8 text-sm text-gray-500"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyber-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyber-500" />
              <span>3 free tests</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyber-500" />
              <span>Cancel anytime</span>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-white/50 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How the <span className="gradient-text">Swarm</span> Works
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our autonomous agents use Playwright and Gemini AI to intelligently 
              explore and test your application.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: '10 Parallel Agents',
                description: 'Each agent runs in its own Docker container with a unique persona and mission.',
              },
              {
                icon: Video,
                title: 'Video Recording',
                description: 'Watch every click, scroll, and interaction in real-time or replay later.',
              },
              {
                icon: Bug,
                title: 'AI Analysis',
                description: 'Gemini Pro analyzes console logs and screenshots to identify issues.',
              },
              {
                icon: Shield,
                title: 'Security Testing',
                description: 'Automated SQL injection, XSS, and vulnerability scanning.',
              },
              {
                icon: Terminal,
                title: 'Detailed Logs',
                description: 'Console output, network requests, and error stack traces.',
              },
              {
                icon: Eye,
                title: 'Visual Regression',
                description: 'Detect UI changes and broken layouts across viewports.',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-chaos-500/50 transition-colors"
              >
                <feature.icon className="w-10 h-10 text-chaos-500 mb-4" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple <span className="gradient-text">Pricing</span>
            </h2>
            <p className="text-gray-400">
              Start free, scale as you grow. No hidden fees.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Starter',
                price: '$49',
                period: '/month',
                description: 'Perfect for small teams',
                features: [
                  '50 test runs/month',
                  '5 parallel agents',
                  'Basic personas',
                  '7-day history',
                  'Email support',
                ],
                cta: 'Start Free Trial',
                popular: false,
              },
              {
                name: 'Pro',
                price: '$199',
                period: '/month',
                description: 'For growing companies',
                features: [
                  'Unlimited tests',
                  '10 parallel agents',
                  'All personas + custom',
                  '90-day history',
                  'Priority support',
                  'CI/CD integration',
                  'API access',
                ],
                cta: 'Start Free Trial',
                popular: true,
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                period: '',
                description: 'For large organizations',
                features: [
                  'Everything in Pro',
                  'Dedicated infrastructure',
                  'Custom agent development',
                  'SSO & SAML',
                  'SLA guarantee',
                  'Dedicated support',
                ],
                cta: 'Contact Sales',
                popular: false,
              },
            ].map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative p-8 rounded-2xl border ${
                  plan.popular
                    ? 'border-chaos-500 bg-gradient-to-b from-chaos-600/20 to-transparent'
                    : 'border-white/10 bg-white/5'
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-chaos-600 text-white">
                    Most Popular
                  </Badge>
                )}
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-500">{plan.period}</span>
                </div>
                <p className="text-gray-400 text-sm mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-cyber-500" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${
                    plan.popular
                      ? 'bg-gradient-to-r from-chaos-600 to-cyber-600 hover:from-chaos-500 hover:to-cyber-500'
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-12 rounded-3xl bg-gradient-to-r from-chaos-600/20 to-cyber-600/20 border border-white/10"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to break things?
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Join 500+ teams using Chaos-Agent to ship bug-free software faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-chaos-600 to-cyber-600 hover:from-chaos-500 hover:to-cyber-500 text-white"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Free Trial
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 hover:bg-white/10"
              >
                <Video className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-chaos-500" />
              <span className="font-bold text-xl">Chaos-Agent.ai</span>
            </div>
            <div className="flex gap-6 text-sm text-gray-400">
              <Link href="/docs" className="hover:text-white transition-colors">Docs</Link>
              <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
              <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
            <p className="text-sm text-gray-500">
              © 2024 Chaos-Agent.ai. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
