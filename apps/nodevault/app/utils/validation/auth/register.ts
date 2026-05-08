import { z } from 'zod'
import { zodValidate } from '../zod'

const registerValidationSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.email('Enter a valid email address'),
  phone: z.object({
    countryCode: z.string(),
    number: z.string(),
  }).optional(),
})

export const validateRegisterForm = zodValidate(registerValidationSchema)
