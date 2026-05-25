import { useQuery } from '@tanstack/react-query'
import { createClient } from '@/lib/supabase/client'
import { defaultResumeData, ResumeData } from '../types'

export function useLoadResume() {
  const supabase = createClient()

  return useQuery({
    queryKey: ['resumeData'],
    queryFn: async () => {
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) return defaultResumeData

      const { data, error } = await supabase
        .from('resumes')
        .select('content')
        .eq('user_id', userData.user.id)
        .single()

      if (error || !data) return defaultResumeData
      return data.content as unknown as ResumeData
    }
  })
}
