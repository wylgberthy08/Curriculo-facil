'use client'

import { UseFormReturn, useFieldArray } from 'react-hook-form'
import { ResumeData } from '../types'
import { User, Briefcase, GraduationCap, Plus, Trash2, Target, Zap, BookOpen, X } from 'lucide-react'
import { useState, KeyboardEvent } from 'react'
import { PhotoUpload } from './PhotoUpload'

interface ResumeFormProps {
  form: UseFormReturn<ResumeData>
}

export function ResumeForm({ form }: ResumeFormProps) {
  const { register, control, formState: { errors }, watch, setValue } = form
  const [skillInput, setSkillInput] = useState('')

  const skills = watch('skills') || []

  const addSkill = () => {
    const trimmed = skillInput.trim()
    if (trimmed && !skills.includes(trimmed)) {
      setValue('skills', [...skills, trimmed], { shouldDirty: true })
      setSkillInput('')
    }
  }

  const removeSkill = (index: number) => {
    setValue('skills', skills.filter((_, i) => i !== index), { shouldDirty: true })
  }

  const handleSkillKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addSkill()
    }
  }

  const { fields: expFields, append: appendExp, remove: removeExp } = useFieldArray({
    control,
    name: 'experiences'
  })

  const { fields: eduFields, append: appendEdu, remove: removeEdu } = useFieldArray({
    control,
    name: 'education'
  })

  const { fields: courseFields, append: appendCourse, remove: removeCourse } = useFieldArray({
    control,
    name: 'courses'
  })

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header Form */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 p-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-blue-700 tracking-tight">CurrículoFácil</h1>
          <p className="text-sm text-gray-500 mt-1">Preencha os campos abaixo</p>
        </div>
      </div>

      <div className="p-8 space-y-12">
        {/* PROGRESS BAR MOCK */}
        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="w-1/3 h-full bg-blue-600 rounded-full"></div>
        </div>

        {/* SECTION: DADOS PESSOAIS */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
            <User className="text-blue-600 h-5 w-5" />
            <h2 className="text-xl font-semibold text-gray-900">Dados Pessoais</h2>
          </div>
          <p className="text-sm text-gray-500">Comece pelo básico para que os recrutadores te encontrem.</p>

          {/* FOTO */}
          <PhotoUpload
            value={watch('personalInfo.photoUrl')}
            onChange={(url) => setValue('personalInfo.photoUrl', url, { shouldDirty: true })}
          />

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
              <input 
                {...register('personalInfo.fullName')}
                className="w-full rounded-lg border border-gray-200 p-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all bg-gray-50/30 focus:bg-white"
                placeholder="Ex: João da Silva"
              />
              {errors.personalInfo?.fullName && <span className="text-xs text-red-500 mt-1">{errors.personalInfo.fullName.message}</span>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                <input 
                  {...register('personalInfo.email')}
                  className="w-full rounded-lg border border-gray-200 p-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all bg-gray-50/30 focus:bg-white"
                  placeholder="joao.silva@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                <input 
                  {...register('personalInfo.phone')}
                  className="w-full rounded-lg border border-gray-200 p-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all bg-gray-50/30 focus:bg-white"
                  placeholder="(11) 99999-9999"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: OBJETIVO */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
            <Target className="text-blue-600 h-5 w-5" />
            <h2 className="text-xl font-semibold text-gray-900">Objetivo Profissional</h2>
          </div>
          <p className="text-sm text-gray-500">
            Qual cargo você deseja ocupar na empresa? Nós montamos o texto para você.
          </p>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cargo Desejado</label>
            <input 
              {...register('objectiveRole')}
              className="w-full rounded-lg border border-gray-200 p-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all bg-gray-50/30 focus:bg-white"
              placeholder="Ex: Desenvolvedor Front-end Júnior"
            />
          </div>
        </section>

        {/* SECTION: EXPERIÊNCIA PROFISSIONAL */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
            <Briefcase className="text-blue-600 h-5 w-5" />
            <h2 className="text-xl font-semibold text-gray-900">Experiência Profissional</h2>
          </div>

          <div className="space-y-6">
            {expFields.map((field, index) => (
              <div key={field.id} className="p-5 border border-gray-100 rounded-xl bg-white shadow-sm relative group">
                <button 
                  type="button" 
                  onClick={() => removeExp(index)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cargo</label>
                    <input {...register(`experiences.${index}.role`)} className="w-full rounded-lg border border-gray-200 p-2.5 text-sm" placeholder="Ex: Desenvolvedor Front-end" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Empresa</label>
                    <input {...register(`experiences.${index}.company`)} className="w-full rounded-lg border border-gray-200 p-2.5 text-sm" placeholder="Ex: Tech Corp" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Período</label>
                    <input {...register(`experiences.${index}.date`)} className="w-full rounded-lg border border-gray-200 p-2.5 text-sm" placeholder="Ex: Jan 2020 - Atual" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descrição das Atividades</label>
                    <textarea {...register(`experiences.${index}.description`)} rows={3} className="w-full rounded-lg border border-gray-200 p-2.5 text-sm resize-none" placeholder="Descreva suas responsabilidades e conquistas..." />
                  </div>
                </div>
              </div>
            ))}
            
            <button
              type="button"
              onClick={() => appendExp({ role: '', company: '', date: '', description: '' })}
              className="w-full py-6 border-2 border-dashed border-blue-200 rounded-xl text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all flex flex-col items-center justify-center gap-2 group"
            >
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Plus className="h-5 w-5" />
              </div>
              <span className="font-medium">Adicionar Experiência</span>
            </button>
          </div>
        </section>

        {/* SECTION: EDUCAÇÃO */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
            <GraduationCap className="text-blue-600 h-5 w-5" />
            <h2 className="text-xl font-semibold text-gray-900">Educação</h2>
          </div>

          <div className="space-y-6">
            {eduFields.map((field, index) => (
              <div key={field.id} className="p-5 border border-gray-100 rounded-xl bg-white shadow-sm relative group">
                <button type="button" onClick={() => removeEdu(index)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100">
                  <Trash2 className="h-4 w-4" />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Curso / Grau</label>
                    <input {...register(`education.${index}.degree`)} className="w-full rounded-lg border border-gray-200 p-2.5 text-sm" placeholder="Ex: Ciência da Computação" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Instituição</label>
                    <input {...register(`education.${index}.institution`)} className="w-full rounded-lg border border-gray-200 p-2.5 text-sm" placeholder="Ex: Universidade XYZ" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Período</label>
                    <input {...register(`education.${index}.date`)} className="w-full rounded-lg border border-gray-200 p-2.5 text-sm" placeholder="Ex: 2018 - 2022" />
                  </div>
                </div>
              </div>
            ))}
            
            <button type="button" onClick={() => appendEdu({ degree: '', institution: '', date: '' })} className="w-full py-6 border-2 border-dashed border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-blue-600 hover:border-blue-200 transition-all flex flex-col items-center justify-center gap-2">
              <Plus className="h-6 w-6" />
              <span className="font-medium">Adicionar Formação</span>
            </button>
          </div>
        </section>

        {/* SECTION: HABILIDADES */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
            <Zap className="text-blue-600 h-5 w-5" />
            <h2 className="text-xl font-semibold text-gray-900">Habilidades</h2>
          </div>
          <p className="text-sm text-gray-500">Adicione suas principais habilidades técnicas e comportamentais.</p>

          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleSkillKeyDown}
                className="flex-1 rounded-lg border border-gray-200 p-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all bg-gray-50/30 focus:bg-white"
                placeholder="Ex: Microsoft Excel, Atendimento ao Cliente..."
              />
              <button
                type="button"
                onClick={addSkill}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-1 text-sm"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            {skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1.5 rounded-full text-sm font-medium"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      className="hover:text-red-500 transition-colors ml-0.5"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* SECTION: CURSOS */}
        <section className="space-y-6 pb-12">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
            <BookOpen className="text-blue-600 h-5 w-5" />
            <h2 className="text-xl font-semibold text-gray-900">Cursos Profissionalizantes</h2>
          </div>

          <div className="space-y-6">
            {courseFields.map((field, index) => (
              <div key={field.id} className="p-5 border border-gray-100 rounded-xl bg-white shadow-sm relative group">
                <button type="button" onClick={() => removeCourse(index)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 className="h-4 w-4" />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Curso</label>
                    <input {...register(`courses.${index}.name`)} className="w-full rounded-lg border border-gray-200 p-2.5 text-sm" placeholder="Ex: Excel Avançado" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Instituição</label>
                    <input {...register(`courses.${index}.institution`)} className="w-full rounded-lg border border-gray-200 p-2.5 text-sm" placeholder="Ex: SENAI, Sebrae..." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ano de Conclusão</label>
                    <input {...register(`courses.${index}.date`)} className="w-full rounded-lg border border-gray-200 p-2.5 text-sm" placeholder="Ex: 2023" />
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() => appendCourse({ name: '', institution: '', date: '' })}
              className="w-full py-6 border-2 border-dashed border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-blue-600 hover:border-blue-200 transition-all flex flex-col items-center justify-center gap-2"
            >
              <Plus className="h-6 w-6" />
              <span className="font-medium">Adicionar Curso</span>
            </button>
          </div>
        </section>

      </div>
    </div>
  )
}
