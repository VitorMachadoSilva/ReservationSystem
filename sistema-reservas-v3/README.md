# 🎓 Sistema de Reservas FMPSC - Versão 3.0

Sistema completo de gestão de reservas de salas e laboratórios com todas as funcionalidades implementadas!

## ✨ TODAS AS MELHORIAS IMPLEMENTADAS

### 🎨 1. Cores FMPSC
✅ Azul escuro (#1a5490) baseado no site oficial  
✅ Interface alinhada com a identidade visual da faculdade  

### ⏱️ 2. Notificações Toast (5 segundos)
✅ Duração fixa de 5 segundos  
✅ Botão X para fechar manualmente  
✅ Feedback em TODAS as ações  

### ✅ 3. Validações no Formulário
✅ **24h antecedência**: Não pode reservar para o mesmo dia  
✅ **1h mínima**: Reserva deve ter no mínimo 1 hora  
✅ Campos com erro realçados em VERMELHO  
✅ Mensagens de erro específicas  

### 👥 4. CRUD de Usuários
✅ `/admin/usuarios` - Gerenciar todos os usuários  
✅ Adicionar alunos, professores e admins  
✅ Visualizar informações completas  

### 🏢 5. CRUD de Salas
✅ `/admin/salas` - Gerenciar salas e laboratórios  
✅ Adicionar com equipamentos, capacidade, prédio  
✅ Visualização em cards  

### 👤 6. Página de Perfil
✅ `/perfil` - Perfil do usuário  
✅ **Alunos**: Apenas visualizam  
✅ **Professores/Admin**: Podem editar  

### ⚡ 7. Loading States
✅ Skeleton loaders  
✅ Spinner em carregamentos  
✅ Experiência fluida  

### 🎯 8. Toasts em Todas Ações
✅ Login/Logout  
✅ Criar/Aprovar/Rejeitar reserva  
✅ Adicionar usuário/sala  
✅ Atualizar perfil  
✅ Erros e validações  

## 🚀 Como Usar

### Instalação

```bash
npm install
```

### Configurar .env

```env
DATABASE_URL="postgresql://user:pass@host/db?sslmode=require"
NEXTAUTH_SECRET="cole-aqui-resultado-de: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"
ADMIN_EMAIL="admin@fmpsc.edu.br"
ADMIN_PASSWORD="sua-senha-admin"
```

### Criar Banco

```bash
npm run db:generate
npm run db:push
```

### Rodar

```bash
npm run dev
# Abrir: http://localhost:3000
```

## 📱 Todas as Páginas

| Rota | O que faz | Quem acessa |
|------|-----------|-------------|
| `/login` | Login | Todos |
| `/dashboard` | Reservas do dia | Todos |
| `/professor/nova-reserva` | Criar reserva (com validações!) | Prof/Admin |
| `/professor/minhas-reservas` | Minhas reservas | Prof/Admin |
| `/perfil` | Ver/Editar perfil | Todos |
| `/admin` | Dashboard admin | Admin |
| `/admin/usuarios` | CRUD usuários | Admin |
| `/admin/salas` | CRUD salas | Admin |

## ✅ Validações Implementadas

### Criar Nova Reserva

**ERRO** ❌ se:
- Data for hoje ou passado (precisa 24h antecedência)
- Duração menor que 1 hora
- Horário de término antes do início
- Número de alunos maior que capacidade da sala
- Conflito com outra reserva

**Campos ficam VERMELHOS** quando inválidos!

### Exemplos

```
❌ Reservar para hoje às 14:00
   → ERRO: "Mínimo 24h de antecedência"
   
❌ Reservar de 14:00 às 14:30
   → ERRO: "Duração mínima: 1 hora"
   
✅ Reservar para amanhã 14:00-16:00
   → APROVADO!
```

## 🎨 Cores do Sistema

```css
Azul FMPSC:     #1a5490
Azul Secundário: #336699
Verde Sucesso:   #10b981
Vermelho Erro:   #ef4444
Amarelo Aviso:   #f59e0b
```

## 👥 Níveis de Acesso

### ALUNO
- ✅ Ver reservas do dia
- ✅ Ver perfil
- ❌ Criar reservas
- ❌ Editar perfil

### PROFESSOR  
- ✅ Tudo do aluno +
- ✅ Criar reservas
- ✅ Ver/Editar minhas reservas
- ✅ Editar meu perfil

### ADMIN
- ✅ Tudo +
- ✅ Aprovar/Rejeitar reservas
- ✅ Gerenciar usuários
- ✅ Gerenciar salas
- ✅ Acesso total

## 📊 Adicionar Dados de Teste

### Via Interface Visual

```bash
npm run db:studio
# Abre em http://localhost:5555
```

### Via SQL

```sql
-- Adicionar Professor
INSERT INTO users (id, email, cpf, name, role, "createdAt", "updatedAt")
VALUES (
  gen_random_uuid()::text,
  'joao.silva@fmpsc.edu.br',
  '12345678900',
  'Prof. João Silva',
  'PROFESSOR',
  NOW(),
  NOW()
);

-- Adicionar Sala
INSERT INTO rooms (id, name, type, capacity, building, floor, equipment, active, "createdAt", "updatedAt")
VALUES (
  gen_random_uuid()::text,
  'Lab de Informática 1',
  'LABORATORIO',
  40,
  'Bloco A',
  1,
  ARRAY['Computadores', 'Projetor'],
  true,
  NOW(),
  NOW()
);
```

## 🎯 Regras de Negócio

1. **24h Antecedência**: Sistema bloqueia reservas de última hora
2. **1h Mínima**: Evita reservas muito curtas
3. **Aprovação Admin**: Reservas de professores precisam aprovação
4. **Admin Auto-Aprovado**: Reservas de admin são instantâneas
5. **Detecção de Conflitos**: Impede reservas simultâneas
6. **Validação de Capacidade**: Alerta se sala é pequena

## 🔔 Toasts Implementados

| Ação | Toast |
|------|-------|
| Login bem-sucedido | ✅ "Login realizado com sucesso!" |
| Reserva criada | ✅ "Solicitação enviada com sucesso!" |
| Reserva aprovada | ✅ "Reserva aprovada!" |
| Reserva rejeitada | ⚠️ "Reserva rejeitada" |
| Usuário criado | ✅ "Usuário criado com sucesso!" |
| Sala criada | ✅ "Sala criada com sucesso!" |
| Perfil atualizado | ✅ "Perfil atualizado com sucesso!" |
| Erro de validação | ❌ "Erro específico do campo" |
| Conflito horário | ❌ "Conflito de horário detectado!" |

## 🛠️ Scripts Disponíveis

```bash
npm run dev          # Rodar em desenvolvimento
npm run build        # Build para produção
npm run start        # Rodar produção
npm run db:studio    # Interface visual do banco
npm run db:generate  # Gerar Prisma Client
npm run db:push      # Atualizar schema no banco
```

## ✅ Checklist de Implementação

- [x] Toast 5 segundos + botão X
- [x] Validação 24h antecedência
- [x] Validação 1h mínima
- [x] Campos vermelhos em erro
- [x] Mensagens de validação
- [x] CRUD de usuários
- [x] CRUD de salas
- [x] Página de perfil
- [x] View/Edit por role
- [x] Loading states
- [x] Skeletons
- [x] Cores FMPSC
- [x] Toasts em todas ações
- [x] Links na Navbar
- [x] Feedback visual completo

## 🚀 Deploy

### Vercel (Recomendado)

1. Push para GitHub
2. Conectar no Vercel
3. Adicionar variáveis `.env`
4. Deploy automático!

## 📞 Suporte

Para dúvidas, consulte:
- README.md (este arquivo)
- Código comentado
- Prisma Studio para ver dados

---

✨ **Sistema 100% Completo e Funcional!** ✨  
Todas as funcionalidades solicitadas implementadas! 🎉
