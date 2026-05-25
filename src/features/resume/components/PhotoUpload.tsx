'use client'

import { useState, useRef } from 'react'
import { Camera, Loader2, X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'

interface PhotoUploadProps {
  value?: string
  onChange: (url: string) => void
}

export function PhotoUpload({ value, onChange }: PhotoUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validações
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!validTypes.includes(file.type)) {
      setError('Formato inválido. Use JPG, PNG ou WebP.')
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      setError('Imagem muito grande. Máximo 2MB.')
      return
    }

    setError(null)
    setUploading(true)

    try {
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) throw new Error('Não autenticado')

      const ext = file.name.split('.').pop()
      const filePath = `${userData.user.id}/avatar.${ext}`

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true })

      if (uploadError) throw uploadError

      const { data: urlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath)

      // Adiciona um timestamp para evitar cache do browser
      onChange(`${urlData.publicUrl}?t=${Date.now()}`)
    } catch (err: any) {
      setError('Erro ao fazer upload. Tente novamente.')
      console.error(err)
    } finally {
      setUploading(false)
      // Limpa o input para permitir novo upload do mesmo arquivo
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  const handleRemove = () => {
    onChange('')
  }

  return (
    <div className="flex items-center gap-6 p-4 bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
      {/* Foto ou placeholder */}
      <div
        onClick={() => !uploading && inputRef.current?.click()}
        className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center relative overflow-hidden group cursor-pointer border-2 border-transparent hover:border-blue-500 transition-all flex-shrink-0"
      >
        {value ? (
          <>
            <Image
              src={value}
              alt="Foto do perfil"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Camera className="text-white h-6 w-6" />
            </div>
          </>
        ) : uploading ? (
          <Loader2 className="text-blue-600 h-8 w-8 animate-spin" />
        ) : (
          <Camera className="text-blue-600 h-8 w-8 group-hover:scale-110 transition-transform" />
        )}
      </div>

      {/* Info + botões */}
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-900">Foto do Perfil</h3>
        <p className="text-sm text-gray-500">
          {value ? 'Clique na foto para trocar.' : 'Adicione uma foto profissional. JPG, PNG. Máx. 2MB.'}
        </p>

        <div className="flex items-center gap-2 mt-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors disabled:opacity-50"
          >
            {uploading ? 'Enviando...' : value ? 'Trocar foto' : 'Adicionar foto'}
          </button>

          {value && !uploading && (
            <>
              <span className="text-gray-300">|</span>
              <button
                type="button"
                onClick={handleRemove}
                className="text-xs font-semibold text-red-500 hover:text-red-700 transition-colors flex items-center gap-1"
              >
                <X className="h-3 w-3" /> Remover
              </button>
            </>
          )}
        </div>

        {error && (
          <p className="text-xs text-red-500 mt-1">{error}</p>
        )}
      </div>

      {/* Input oculto */}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  )
}
