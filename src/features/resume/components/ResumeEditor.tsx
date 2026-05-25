'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ResumeData, defaultResumeData, resumeSchema } from '../types'
import { ResumeForm } from './ResumeForm'
import { ResumePreview } from './ResumePreview'
import { useEffect, useState } from 'react'
import { useLoadResume } from '../hooks/useLoadResume'
import { useResumeAutoSave } from '../hooks/useResumeAutoSave'
import { Loader2, Check, Download, FileText, PenLine } from 'lucide-react'
import Link from 'next/link'
import { ScaledPreviewWrapper } from './ScaledPreviewWrapper'

type MobileTab = 'form' | 'preview'

export function ResumeEditor() {
  const [isClient, setIsClient] = useState(false)
  const [mobileTab, setMobileTab] = useState<MobileTab>('form')

  const { data: initialData, isLoading } = useLoadResume()

  const form = useForm<ResumeData>({
    resolver: zodResolver(resumeSchema),
    defaultValues: defaultResumeData,
    mode: 'onChange',
  })

  useEffect(() => {
    if (initialData) form.reset(initialData)
  }, [initialData, form])

  useEffect(() => {
    setIsClient(true)
  }, [])

  const watchedData = form.watch()
  const { saveStatus } = useResumeAutoSave(watchedData, isClient)

  if (!isClient || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  const SaveStatus = () => (
    <span className="text-sm font-medium text-gray-500 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm flex items-center gap-2 border border-white/40">
      {saveStatus === 'saving' && <Loader2 className="w-4 h-4 animate-spin text-blue-500" />}
      {saveStatus === 'saved' && <Check className="w-4 h-4 text-green-500" />}
      {saveStatus === 'idle' && <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />}
      {saveStatus === 'saving' ? 'Salvando...' : saveStatus === 'saved' ? 'Salvo!' : 'Sincronizado'}
    </span>
  )

  const DownloadButton = ({ className = '' }: { className?: string }) => (
    <Link
      href="/print"
      target="_blank"
      className={`flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors text-sm ${className}`}
    >
      <Download className="w-4 h-4" />
      Baixar PDF
    </Link>
  )

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50/50">

      {/* ══════════════════════════════════════
          MOBILE: Topbar + Abas + Bottom Nav
      ══════════════════════════════════════ */}
      <div className="lg:hidden flex flex-col h-screen">
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 shadow-sm flex-shrink-0">
          <h1 className="text-lg font-bold text-blue-700 tracking-tight">CurrículoFácil</h1>
          <div className="flex items-center gap-2">
            <SaveStatus />
            <DownloadButton />
          </div>
        </div>

        {/* Conteúdo da aba ativa */}
        <div className="flex-1 overflow-y-auto">
          {mobileTab === 'form' ? (
            <ResumeForm form={form} />
          ) : (
            <div className="p-4 bg-[#E9EEF9] min-h-full">
              <ScaledPreviewWrapper>
                <ResumePreview data={watchedData} />
              </ScaledPreviewWrapper>
            </div>
          )}
        </div>

        {/* Bottom Tab Bar */}
        <div className="flex-shrink-0 bg-white border-t border-gray-200 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
          <div className="flex">
            <button
              onClick={() => setMobileTab('form')}
              className="flex-1 flex flex-col items-center gap-1 py-3 transition-colors"
            >
              <div className={`flex items-center justify-center w-24 h-7 rounded-full transition-all ${
                mobileTab === 'form' ? 'bg-blue-600' : 'bg-gray-100'
              }`}>
                <PenLine className={`w-4 h-4 mr-1 ${mobileTab === 'form' ? 'text-white' : 'text-gray-400'}`} />
                <span className={`text-xs font-semibold ${mobileTab === 'form' ? 'text-white' : 'text-gray-400'}`}>
                  Preencher
                </span>
              </div>
            </button>

            <button
              onClick={() => setMobileTab('preview')}
              className="flex-1 flex flex-col items-center gap-1 py-3 transition-colors"
            >
              <div className={`flex items-center justify-center w-24 h-7 rounded-full transition-all ${
                mobileTab === 'preview' ? 'bg-blue-600' : 'bg-gray-100'
              }`}>
                <FileText className={`w-4 h-4 mr-1 ${mobileTab === 'preview' ? 'text-white' : 'text-gray-400'}`} />
                <span className={`text-xs font-semibold ${mobileTab === 'preview' ? 'text-white' : 'text-gray-400'}`}>
                  Visualizar
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          DESKTOP: Layout dividido (lado a lado)
      ══════════════════════════════════════ */}
      <aside className="hidden lg:block w-[500px] xl:w-[600px] flex-shrink-0 border-r border-gray-200 bg-white shadow-sm overflow-y-auto h-screen">
        <ResumeForm form={form} />
      </aside>

      <main className="hidden lg:flex flex-1 flex-col p-8 bg-[#E9EEF9] overflow-y-auto h-screen">
        <div className="w-full flex justify-end mb-6 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <SaveStatus />
            <DownloadButton />
          </div>
        </div>
        <div className="w-full max-w-[800px] mx-auto pb-16">
          <ScaledPreviewWrapper naturalWidth={794}>
            <ResumePreview data={watchedData} />
          </ScaledPreviewWrapper>
        </div>
      </main>

    </div>
  )
}
