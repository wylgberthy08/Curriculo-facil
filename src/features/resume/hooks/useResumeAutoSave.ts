import { useEffect, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createClient } from '@/lib/supabase/client'
import { ResumeData } from '../types'

export function useResumeAutoSave(data: ResumeData, isClient: boolean) {
  const supabase = createClient()
  const queryClient = useQueryClient()
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  const mutation = useMutation({
    mutationFn: async (resumeData: ResumeData) => {
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) throw new Error('Not authenticated')

      // Check if user has an existing resume
      const { data: existing } = await supabase
        .from('resumes')
        .select('id')
        .eq('user_id', userData.user.id)
        .single()

      if (existing) {
         // Update
         const { error } = await supabase
           .from('resumes')
           .update({ content: resumeData as any, updated_at: new Date().toISOString() })
           .eq('id', existing.id)
         if (error) throw error
      } else {
         // Insert
         const { error } = await supabase
           .from('resumes')
           .insert({
             user_id: userData.user.id,
             title: 'Meu Currículo',
             content: resumeData as any
           })
         if (error) throw error
      }
    },
    onMutate: () => {
      setSaveStatus('saving')
    },
    onSuccess: () => {
      setSaveStatus('saved')
      setTimeout(() => setSaveStatus('idle'), 2000)
    },
    onError: () => {
      setSaveStatus('error')
    }
  })

  // Debounce the save
  useEffect(() => {
    if (!isClient) return
    const timer = setTimeout(() => {
      mutation.mutate(data)
    }, 1500) // 1.5 seconds debounce

    return () => clearTimeout(timer)
  }, [JSON.stringify(data), isClient])

  return { saveStatus }
}
