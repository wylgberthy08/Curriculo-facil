'use client'

import { ResumeData } from '../types'
import Image from 'next/image'

interface ResumePreviewProps {
  data: ResumeData
}

export function ResumePreview({ data }: ResumePreviewProps) {
  const { personalInfo, objectiveRole, experiences, education, skills, courses } = data

  const hasName = !!personalInfo.fullName
  const displayName = hasName ? personalInfo.fullName.toUpperCase() : 'SEU NOME COMPLETO'
  const displayEmail = personalInfo.email || 'seu.email@exemplo.com'
  const displayPhone = personalInfo.phone || '(11) 99999-9999'

  return (
    <div className="w-full bg-white overflow-hidden flex flex-col" style={{ width: 794 }}>
      {/* HEADER */}
      <div className="p-10 pb-6 border-b-2 border-blue-700 flex items-center gap-6">
        {/* Foto */}
        {personalInfo.photoUrl && (
          <div className="h-20 w-20 rounded-full overflow-hidden flex-shrink-0 border-2 border-blue-100">
            <Image
              src={personalInfo.photoUrl}
              alt="Foto do perfil"
              width={80}
              height={80}
              className="object-cover w-full h-full"
            />
          </div>
        )}
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">{displayName}</h1>
          <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              {displayEmail}
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              {displayPhone}
            </span>
          </div>
        </div>
      </div>

      <div className="p-10 pt-6 flex-1 bg-white space-y-8">
        
        {/* OBJETIVO */}
        {objectiveRole && (
          <div>
            <h2 className="text-lg font-bold text-blue-700 uppercase tracking-wide mb-3 border-b border-gray-200 pb-1">Objetivo</h2>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
              Desejo fazer parte da equipe da empresa, atuando como <strong className="font-semibold">{objectiveRole}</strong>, oferecendo dedicação, comprometimento e vontade de aprender. Busco uma oportunidade para desenvolver meus conhecimentos profissionais e contribuir da melhor forma possível com a empresa.
            </p>
          </div>
        )}

        {/* EXPERIÊNCIA PROFISSIONAL */}
        <div>
          <h2 className="text-lg font-bold text-blue-700 uppercase tracking-wide mb-4 border-b border-gray-200 pb-1">Experiência Profissional</h2>
          <div className="space-y-4">
            {experiences.length > 0 ? experiences.map((exp, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-gray-900">{exp.role || 'Cargo'}</h3>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{exp.date || 'Período'}</span>
                </div>
                <div className="text-sm italic text-gray-600">{exp.company || 'Empresa'}</div>
                {exp.description && (
                  <p className="text-sm text-gray-700 mt-2 leading-relaxed whitespace-pre-wrap">
                    {exp.description}
                  </p>
                )}
              </div>
            )) : (
              <div className="space-y-1 opacity-50">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-gray-900">Cargo Exemplo</h3>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">2020 - Atual</span>
                </div>
                <div className="text-sm italic text-gray-600">Empresa Exemplo</div>
                <p className="text-sm text-gray-700 mt-2 leading-relaxed">Adicione suas experiências no formulário ao lado para visualizá-las aqui.</p>
              </div>
            )}
          </div>
        </div>

        {/* EDUCAÇÃO */}
        <div>
          <h2 className="text-lg font-bold text-blue-700 uppercase tracking-wide mb-4 border-b border-gray-200 pb-1">Educação</h2>
          <div className="space-y-4">
            {education.length > 0 ? education.map((edu, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-gray-900">{edu.degree || 'Curso'}</h3>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{edu.date || 'Período'}</span>
                </div>
                <div className="text-sm text-gray-600">{edu.institution || 'Instituição'}</div>
              </div>
            )) : (
              <div className="space-y-1 opacity-50">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-gray-900">Ensino Médio Completo</h3>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Concluído em 2019</span>
                </div>
                <div className="text-sm text-gray-600">Escola Estadual Professor José</div>
              </div>
            )}
          </div>
        </div>

        {/* HABILIDADES */}
        {skills && skills.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-blue-700 uppercase tracking-wide mb-3 border-b border-gray-200 pb-1">Habilidades</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              {skills.join(' • ')}
            </p>
          </div>
        )}

        {/* CURSOS */}
        {courses && courses.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-blue-700 uppercase tracking-wide mb-4 border-b border-gray-200 pb-1">Cursos</h2>
            <div className="space-y-3">
              {courses.map((course, index) => (
                <div key={index} className="space-y-0.5">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-gray-900 text-sm">{course.name || 'Curso'}</h3>
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{course.date}</span>
                  </div>
                  {course.institution && (
                    <div className="text-xs text-gray-500">{course.institution}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      <div className="mt-auto pb-4 text-center">
         <span className="text-[10px] text-gray-400 italic">Currículo gerado via CurrículoFácil.com.br</span>
      </div>
    </div>
  )
}
