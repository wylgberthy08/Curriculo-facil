'use client'

import { ResumePreview } from '@/features/resume/components/ResumePreview'
import { useLoadResume } from '@/features/resume/hooks/useLoadResume'
import { useEffect } from 'react'

export default function PrintPage() {
  const { data, isLoading } = useLoadResume()

  useEffect(() => {
    if (!isLoading && data) {
      setTimeout(() => {
        window.print()
      }, 500)
    }
  }, [isLoading, data])

  if (isLoading || !data) return null

  return (
    <div className="bg-white min-h-screen">
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          @page { margin: 0; size: A4; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}} />
      <ResumePreview data={data} />
    </div>
  )
}
