import { z } from 'zod'
import { projectSchema } from '../models/project'

export const billingSubject = z.tuple([
    z.union([
        z.literal('manage'),
        z.literal('get'),
        z.literal('export'),
        z.literal('delete'),
    ]),
    z.union([z.literal('Billing'), projectSchema]),
])

export type BillingSubject = z.infer<typeof billingSubject>