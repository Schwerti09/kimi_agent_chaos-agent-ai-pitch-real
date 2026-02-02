import { Request, Response } from 'express'
import { TestService } from '../services/test.service'

export class TestController {
  private testService: TestService

  constructor() {
    this.testService = new TestService()
  }

  startTest = async (req: Request, res: Response) => {
    try {
      const { url, personas, options } = req.body
      
      if (!url) {
        return res.status(400).json({ error: 'URL is required' })
      }

      const test = await this.testService.startTest(url, personas, options)
      
      res.status(201).json({
        success: true,
        data: test,
      })
    } catch (error) {
      console.error('Start test error:', error)
      res.status(500).json({ error: 'Failed to start test' })
    }
  }

  getTestStatus = async (req: Request, res: Response) => {
    try {
      const { testId } = req.params
      const status = await this.testService.getTestStatus(testId)
      
      res.json({
        success: true,
        data: status,
      })
    } catch (error) {
      console.error('Get test status error:', error)
      res.status(500).json({ error: 'Failed to get test status' })
    }
  }

  getTestResults = async (req: Request, res: Response) => {
    try {
      const { testId } = req.params
      const results = await this.testService.getTestResults(testId)
      
      res.json({
        success: true,
        data: results,
      })
    } catch (error) {
      console.error('Get test results error:', error)
      res.status(500).json({ error: 'Failed to get test results' })
    }
  }

  stopTest = async (req: Request, res: Response) => {
    try {
      const { testId } = req.params
      await this.testService.stopTest(testId)
      
      res.json({
        success: true,
        message: 'Test stopped successfully',
      })
    } catch (error) {
      console.error('Stop test error:', error)
      res.status(500).json({ error: 'Failed to stop test' })
    }
  }

  getTestHistory = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const userId = req.user?.id
      const history = await this.testService.getTestHistory(userId)
      
      res.json({
        success: true,
        data: history,
      })
    } catch (error) {
      console.error('Get test history error:', error)
      res.status(500).json({ error: 'Failed to get test history' })
    }
  }

  deleteTest = async (req: Request, res: Response) => {
    try {
      const { testId } = req.params
      await this.testService.deleteTest(testId)
      
      res.json({
        success: true,
        message: 'Test deleted successfully',
      })
    } catch (error) {
      console.error('Delete test error:', error)
      res.status(500).json({ error: 'Failed to delete test' })
    }
  }
}
