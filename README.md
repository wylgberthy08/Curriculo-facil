# 📄 CurrículoFácil

> Uma plataforma moderna e intuitiva para criar, editar e gerenciar currículos profissionais de forma rápida e fácil.

![CurrículoFácil Editor](./screenshots/editor.png)
![CurrículoFácil Preview](./screenshots/preview.png)

## ✨ Funcionalidades

- ✏️ **Editor Intuitivo** - Interface amigável para preencher dados pessoais, experiência profissional, educação e habilidades
- 📸 **Upload de Foto** - Adicione uma foto de perfil profissional ao seu currículo
- 👁️ **Visualização em Tempo Real** - Veja as mudanças sendo aplicadas instantaneamente
- 💾 **Auto-Save** - Suas alterações são salvas automaticamente
- ☁️ **Sincronização** - Todos os seus dados sincronizados na nuvem
- 📥 **Download PDF** - Exporte seu currículo em formato PDF de alta qualidade
- 🔐 **Autenticação Segura** - Login seguro com autenticação moderna
- 📱 **Responsivo** - Funciona perfeitamente em desktop, tablet e mobile
- ⚡ **Rápido e Performático** - Carregamento rápido e navegação fluida

## 🎨 Capturas de Tela

### Tela de Edição
![Editor de Currículo](./screenshots/editor.png)

### Visualização do Currículo
![Preview do Currículo](./screenshots/preview.png)

## 🚀 Tecnologias Utilizadas

### Frontend
- **[Next.js 16.2.6](https://nextjs.org/)** - Framework React com SSR e otimizações
- **[React 19.2.4](https://react.dev/)** - Biblioteca de UI
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática para JavaScript
- **[TailwindCSS](https://tailwindcss.com/)** - Framework CSS utilitário
- **[React Hook Form](https://react-hook-form.com/)** - Gerenciamento eficiente de formulários
- **[Zod](https://zod.dev/)** - Validação de schemas TypeScript
- **[Lucide React](https://lucide.dev/)** - Biblioteca de ícones

### Backend & APIs
- **[Supabase](https://supabase.com/)** - Backend como serviço (autenticação, banco de dados e storage)
- **[Supabase SSR](https://supabase.com/docs/guides/auth/server-side-rendering)** - Autenticação server-side

### State Management & Data Fetching
- **[Zustand](https://github.com/pmndrs/zustand)** - Gerenciamento de estado minimalista
- **[React Query (@tanstack/react-query)](https://tanstack.com/query/latest)** - Gerenciamento de dados server e cache

### Desenvolvimento
- **[ESLint](https://eslint.org/)** - Linter de código
- **[PostCSS](https://postcss.org/)** - Processador de CSS

## 🛠️ Instalação

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Passo a Passo

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/cv-facil.git
cd cv-facil
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Configure as variáveis de ambiente**

Crie um arquivo `.env.local` na raiz do projeto:
```env
NEXT_PUBLIC_SUPABASE_URL=sua_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_supabase
```

4. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
# ou
yarn dev
```

5. **Acesse a aplicação**

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📦 Build e Deploy

### Build para Produção
```bash
npm run build
npm start
```

### Deploy no Vercel
A forma mais fácil de fazer o deploy é usando a [Plataforma Vercel](https://vercel.com) dos criadores do Next.js.

1. Faça push do seu código para o GitHub
2. Importe o repositório no [Vercel Dashboard](https://vercel.com/new)
3. Defina as variáveis de ambiente
4. Clique em Deploy

Para mais detalhes, consulte a [documentação de deployment do Next.js](https://nextjs.org/docs/app/building-your-application/deploying).

## 📁 Estrutura do Projeto

```
cv-facil/
├── src/
│   ├── app/              # Páginas e layouts Next.js
│   ├── features/
│   │   └── resume/       # Componentes e lógica de currículo
│   ├── lib/
│   │   └── supabase/     # Clientes Supabase
│   ├── providers/        # Provedores de contexto
│   └── types/            # Tipos TypeScript
├── public/               # Arquivos estáticos
├── package.json
├── tsconfig.json
├── next.config.ts
└── tailwind.config.js
```

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se livre para:

1. Fazer um Fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 📞 Contato

- **GitHub**: [@seu-usuario](https://github.com/seu-usuario)
- **Email**: seu-email@exemplo.com

---

**Desenvolvido com ❤️ para facilitar a criação de currículos**
