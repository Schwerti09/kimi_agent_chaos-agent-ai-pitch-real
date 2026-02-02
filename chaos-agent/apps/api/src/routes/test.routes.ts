import { Router } from 'express'
import { TestController } from '../controllers/test.controller'
import { authenticate } from '../middleware/auth.middleware'

const router = Router()
const testController = new TestController()

// Public routes
router.post('/start', testController.startTest)
router.get('/:testId/status', testController.getTestStatus)
router.get('/:testId/results', testController.getTestResults)
router.post('/:testId/stop', testController.stopTest)

// Protected routes
router.get('/history', authenticate, testController.getTestHistory)
router.delete('/:testId', authenticate, testController.deleteTest)

export { router as testRoutes }
