import { Router } from 'express'
import { BillingController } from '../controllers/billing.controller'
import { authenticate } from '../middleware/auth.middleware'

const router = Router()
const billingController = new BillingController()

router.get('/plans', billingController.getPlans)
router.post('/subscribe', authenticate, billingController.createSubscription)
router.post('/webhook', billingController.handleWebhook)
router.get('/subscription', authenticate, billingController.getSubscription)
router.delete('/subscription', authenticate, billingController.cancelSubscription)

export { router as billingRoutes }
