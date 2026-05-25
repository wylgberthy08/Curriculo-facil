import { z } from 'zod'

export const experienceSchema = z.object({
  id: z.string().optional(), // For internal tracking if needed
  role: z.string().min(1, 'Cargo é obrigatório'),
  company: z.string().min(1, 'Empresa é obrigatória'),
  date: z.string(),
  description: z.string(),
})

export const educationSchema = z.object({
  id: z.string().optional(),
  degree: z.string().min(1, 'Curso/Grau é obrigatório'),
  institution: z.string().min(1, 'Instituição é obrigatória'),
  date: z.string(),
})

export const courseSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Nome do curso é obrigatório'),
  institution: z.string(),
  date: z.string(),
})

export const resumeSchema = z.object({
  personalInfo: z.object({
    fullName: z.string().min(1, 'Nome completo é obrigatório'),
    email: z.string().email('E-mail inválido').optional().or(z.literal('')),
    phone: z.string().optional(),
    photoUrl: z.string().optional(),
  }),
  objectiveRole: z.string().optional(),
  experiences: z.array(experienceSchema).default([]),
  education: z.array(educationSchema).default([]),
  skills: z.array(z.string()).default([]),
  courses: z.array(courseSchema).default([]),
})

export type ResumeData = z.infer<typeof resumeSchema>

export const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    photoUrl: '',
  },
  objectiveRole: '',
  experiences: [],
  education: [],
  skills: [],
  courses: [],
}
