# PRODUCT REQUIREMENTS DOCUMENT (PRD)

## Portal JAI1 - Tax Refund Service

### Angular + NestJS Full-Stack Application

---

| **Versión**                    | 0.4 - Database Hardening                 |
| ------------------------------ | ---------------------------------------- |
| **Fecha Última Actualización** | 13 de Enero, 2026                        |
| **Fecha Creación**             | 27 de Diciembre, 2024                    |
| **Deadline MVP**               | 10 de Enero, 2025                        |
| **Inicio Temporada**           | 28 de Enero, 2025 (Temporada Fiscal USA) |
| **Clientes Esperados**         | 200 clientes (temporada 2026)            |

---

# 1. RESUMEN EJECUTIVO

## 1.1 Descripción del Proyecto

Portal JAI1 es una aplicación web full-stack diseñada para gestionar el servicio de devolución de impuestos (tax refunds) para estudiantes sudamericanos con visa J-1 que participaron en programas Work & Travel en Estados Unidos. El portal reemplaza el proceso manual actual basado en WhatsApp, Google Forms y Notion, centralizando toda la operación en una plataforma profesional.

## 1.2 Problema que Resuelve

- Proceso fragmentado entre múltiples herramientas (WhatsApp, Google Forms, Notion, email)
- Falta de visibilidad del estado del trámite para los clientes
- Gestión manual de documentos sensibles (W2, SSN, datos bancarios)
- Dificultad para escalar operaciones en temporada alta
- Alto volumen de consultas de soporte repetitivas

## 1.3 Alcance del MVP

### ✅ Funcionalidades IMPLEMENTADAS en el MVP:

1. ✅ Registro y autenticación de usuarios (clientes y admins) - COMPLETADO
2. ✅ **Google OAuth (Login con Google)** - COMPLETADO (v0.3)
3. ✅ Formulario F1 (datos básicos) integrado en el portal - COMPLETADO
4. ✅ Formulario F2 (datos sensibles: SSN, banco, dirección) - COMPLETADO
5. ✅ Upload de documentos W2 y comprobantes de pago - COMPLETADO
6. ✅ Dashboard del cliente con estado del trámite - COMPLETADO
7. ✅ Panel admin para gestión de clientes - COMPLETADO
8. ✅ Sistema de tickets de soporte interno - COMPLETADO
9. ✅ Notificaciones por email y in-app - COMPLETADO
10. ✅ Descarga de información por parte de los dueños - COMPLETADO
11. ✅ Integración con Make (webhooks) - COMPLETADO
12. ✅ Calculadora de impuestos con OCR (W2) - COMPLETADO
13. ✅ Chatbot integrado - COMPLETADO
14. ✅ Sistema de seguimiento de estado mejorado - COMPLETADO
15. ✅ Login separado para admin - COMPLETADO
16. ✅ **Programa de Referidos con Leaderboard** - COMPLETADO (v0.3)
17. ✅ **Onboarding Flow guiado** - COMPLETADO (v0.3)
18. ✅ **Sistema de automatización de progreso** - COMPLETADO (v0.3)
19. ✅ **Sistema de tracking de problemas (Admin)** - COMPLETADO (v0.3)
20. ✅ **Fast Loading Pattern (sin flash de contenido)** - COMPLETADO (v0.3)
21. ✅ **Database Hardening (Phases 1-8)** - COMPLETADO (v0.4)
    - Schema improvements: indexes, timestamps con timezone, @db.Date
    - CHECK constraints en base de datos
    - TEXT to UUID migration (12 tablas, 28 campos)
    - Row Level Security (RLS) en todas las tablas
22. ✅ **Cache clearing on login** - COMPLETADO (v0.4)

### ⏳ Pendiente (Mejoras en curso):

- Tests automatizados
- Notificaciones WhatsApp (en desarrollo con Make)
- Download document verification (tested, working)

### ❌ Funcionalidades EXCLUIDAS del MVP (Fase 2+):

- **WebSocket / Real-time messaging** (ver sección 16 para justificación técnica)
- App mobile nativa
- Multi-idioma
- Reportes avanzados y métricas
- 2FA (Two-Factor Authentication)
- Audit logs accesibles desde UI
- Google Drive backup automático (descargar manual ya implementado)

---

# 2. STACK TECNOLÓGICO

## 2.1 Arquitectura General

La aplicación sigue una arquitectura cliente-servidor con separación clara entre frontend y backend, comunicándose a través de una API REST. La base de datos y almacenamiento de archivos están gestionados por Supabase.

## 2.2 Stack Detallado - ✅ IMPLEMENTADO

| Capa                 | Tecnología                      | Estado          | Justificación                                  |
| -------------------- | ------------------------------- | --------------- | ---------------------------------------------- |
| **Frontend**         | Angular 21 con Angular Material | ✅ IMPLEMENTADO | Componentes UI prediseñados, desarrollo rápido |
| **Backend**          | NestJS (Node.js)                | ✅ IMPLEMENTADO | TypeScript, arquitectura modular, decorators   |
| **Base de Datos**    | Supabase (PostgreSQL)           | ✅ IMPLEMENTADO | Managed, backups automáticos, RLS              |
| **Storage**          | Supabase Storage                | ✅ IMPLEMENTADO | Integrado con DB, signed URLs                  |
| **ORM**              | Prisma                          | ✅ IMPLEMENTADO | Type-safe DB queries                           |
| **Autenticación**    | JWT + Passport + Google OAuth   | ✅ IMPLEMENTADO | Tokens seguros, estrategia JWT y Google        |
| **Encriptación**     | AES-256                         | ✅ IMPLEMENTADO | Datos sensibles (SSN, passwords)               |
| **Email**            | Resend/SendGrid                 | ✅ IMPLEMENTADO | Emails transaccionales                         |
| **Automatización**   | Make (Integromat)               | ✅ IMPLEMENTADO | Webhooks, OCR externo                          |
| **Hosting Frontend** | Vercel                          | ✅ IMPLEMENTADO | CDN global, preview deployments                |
| **Hosting Backend**  | Railway                         | ✅ IMPLEMENTADO | Fácil deploy, escalable                        |

## 2.3 Estructura de Carpetas - Frontend (Angular) - ✅ IMPLEMENTADO

```
portal-jai1-frontend/
├── src/
│   ├── app/
│   │   ├── core/                    # ✅ Servicios singleton, guards, interceptors
│   │   │   ├── guards/
│   │   │   ├── interceptors/
│   │   │   ├── models/              # ✅ Interfaces TypeScript
│   │   │   └── services/
│   │   │       ├── auth.service.ts
│   │   │       ├── profile.service.ts
│   │   │       ├── document.service.ts
│   │   │       ├── referral.service.ts      # ✅ NUEVO v0.3
│   │   │       ├── toast.service.ts         # ✅ NUEVO v0.3
│   │   │       ├── data-refresh.service.ts  # ✅ NUEVO v0.3
│   │   │       └── ...
│   │   ├── shared/                  # ✅ Componentes reutilizables
│   │   │   ├── components/
│   │   │   ├── pipes/
│   │   │   └── directives/
│   │   ├── components/              # ✅ Componentes de funcionalidad IMPLEMENTADOS:
│   │   │   ├── admin-dashboard/     # ✅ Panel admin con lista de clientes
│   │   │   ├── admin-client-detail/ # ✅ Detalle de cliente para admin
│   │   │   ├── admin-login/         # ✅ Login admin separado
│   │   │   ├── dashboard/           # ✅ Dashboard del cliente
│   │   │   ├── document-upload/     # ✅ Upload de documentos
│   │   │   ├── login/               # ✅ Login cliente
│   │   │   ├── register/            # ✅ Registro de usuarios
│   │   │   ├── forgot-password/     # ✅ Recuperar contraseña
│   │   │   ├── reset-password/      # ✅ Reset de contraseña
│   │   │   ├── google-callback/     # ✅ NUEVO v0.3 - Google OAuth callback
│   │   │   ├── profile/             # ✅ Formulario F2 (datos sensibles)
│   │   │   ├── tax-form/            # ✅ Formulario F1 (datos básicos)
│   │   │   ├── tax-calculator/      # ✅ Calculadora de impuestos
│   │   │   ├── tax-tracking/        # ✅ Seguimiento de estado
│   │   │   ├── user-messages/       # ✅ Sistema de tickets
│   │   │   ├── chatbot/             # ✅ Chatbot integrado
│   │   │   ├── onboarding/          # ✅ NUEVO v0.3 - Onboarding flow
│   │   │   └── referral-program/    # ✅ NUEVO v0.3 - Programa de referidos
│   │   ├── main-layout/             # ✅ Layout principal
│   │   └── app.routes.ts            # ✅ Rutas configuradas
│   ├── assets/
│   ├── environments/
│   └── styles/
├── angular.json
├── package.json
└── tsconfig.json
```

## 2.4 Estructura de Carpetas - Backend (NestJS) - ✅ IMPLEMENTADO

```
portal-jai1-backend/
├── src/
│   ├── main.ts                      # ✅ Punto de entrada
│   ├── app.module.ts                # ✅ Módulo raíz
│   ├── common/                      # ✅ Elementos compartidos IMPLEMENTADOS
│   │   ├── decorators/              # ✅ @CurrentUser, @Roles
│   │   ├── filters/                 # ✅ HTTP exception filter
│   │   ├── guards/                  # ✅ JWT auth guard, Roles guard
│   │   ├── interceptors/            # ✅ Interceptores
│   │   ├── pipes/                   # ✅ Validación
│   │   └── services/                # ✅ Email, Encryption, Supabase
│   ├── config/                      # ✅ Configuración IMPLEMENTADA
│   │   ├── database.config.ts       # ✅ Configuración DB
│   │   ├── supabase.config.ts       # ✅ Configuración Supabase
│   │   ├── supabase.service.ts      # ✅ Servicio Supabase
│   │   └── prisma.service.ts        # ✅ Servicio Prisma
│   └── modules/                     # ✅ Módulos de negocio IMPLEMENTADOS
│       ├── auth/                    # ✅ Autenticación completa
│       │   ├── auth.module.ts
│       │   ├── auth.controller.ts
│       │   ├── auth.service.ts
│       │   ├── dto/                 # ✅ Login, Register, Reset, Forgot
│       │   └── strategies/          # ✅ JWT strategy + Google strategy (v0.3)
│       ├── users/                   # ✅ Gestión de usuarios
│       ├── clients/                 # ✅ Gestión de clientes
│       ├── documents/               # ✅ Gestión de documentos
│       ├── tickets/                 # ✅ Sistema de tickets
│       ├── notifications/           # ✅ Notificaciones
│       ├── calculator/              # ✅ Calculadora de impuestos
│       ├── webhooks/                # ✅ Webhooks para Make
│       ├── referrals/               # ✅ NUEVO v0.3 - Programa de referidos
│       │   ├── referrals.module.ts
│       │   ├── referrals.controller.ts
│       │   ├── referrals.service.ts
│       │   └── dto/
│       └── progress/                # ✅ NUEVO v0.3 - Automatización de progreso
│           ├── progress.module.ts
│           └── progress-automation.service.ts
├── prisma/
│   └── schema.prisma                # ✅ Schema completo (actualizado v0.3)
├── scripts/
│   └── create-admin.ts              # ✅ Script para crear admin
├── package.json
└── tsconfig.json
```

---

# 3. MODELOS DE DATOS

## 3.1 Prisma Schema (Actualizado v0.4)

**Nota v0.4:** Todos los campos ID y FK ahora usan tipo nativo PostgreSQL UUID con `@db.Uuid` para mejor eficiencia de almacenamiento y validación. Timestamps usan `@db.Timestamptz` para soporte de timezone.

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ============= ENUMS =============

enum UserRole {
  client
  admin
}

enum InternalStatus {
  revision_de_registro
  esperando_datos
  falta_documentacion
  en_proceso
  en_verificacion
  resolviendo_verificacion
  inconvenientes
  cheque_en_camino
  esperando_pago_comision
  proceso_finalizado
}

enum ClientStatus {
  esperando_datos
  cuenta_en_revision
  taxes_en_proceso
  taxes_en_camino
  taxes_depositados
  pago_realizado
  en_verificacion
  taxes_finalizados
}

enum TaxStatus {
  pending
  processing
  approved
  rejected
  deposited
}

enum DocumentType {
  w2
  payment_proof
  other
}

enum TicketStatus {
  open
  in_progress
  closed
}

enum NotificationType {
  status_change
  docs_missing
  message
  system
  problem_alert      // NUEVO v0.3
}

// NUEVO v0.3 - Referral System Enums
enum ReferralStatus {
  pending
  tax_form_submitted
  awaiting_refund
  successful
  expired
}

enum DiscountType {
  referral_bonus
  referrer_reward
}

enum DiscountStatus {
  pending
  applied
  expired
}

enum OcrConfidence {
  high
  medium
  low
}

// NUEVO v0.3 - Problem Tracking Enum
enum ProblemType {
  missing_documents
  incorrect_information
  irs_verification
  bank_issue
  state_issue
  federal_issue
  client_unresponsive
  other
}

// ============= MODELS =============

model User {
  id            String    @id @default(uuid()) @db.Uuid
  email         String    @unique
  passwordHash  String    @map("password_hash")
  role          UserRole  @default(client)
  firstName     String    @map("first_name")
  lastName      String    @map("last_name")
  phone         String?
  isActive      Boolean   @default(true) @map("is_active")
  lastLoginAt   DateTime? @map("last_login_at")
  createdAt     DateTime  @default(now()) @map("created_at")
  updatedAt     DateTime  @updatedAt @map("updated_at")

  // NUEVO v0.3 - Google OAuth
  googleId              String?   @unique @map("google_id")

  // NUEVO v0.3 - Referral System
  referralCode          String?   @unique @map("referral_code")
  referredByCode        String?   @map("referred_by_code")
  referralCodeCreatedAt DateTime? @map("referral_code_created_at")

  // Relations
  clientProfile   ClientProfile?
  tickets         Ticket[]
  ticketMessages  TicketMessage[]
  notifications   Notification[]
  statusChanges   StatusHistory[] @relation("ChangedBy")

  // NUEVO v0.3 - Referral Relations
  referralsMade    Referral[] @relation("ReferrerUser")
  referralReceived Referral?  @relation("ReferredUser")

  @@map("users")
}

model ClientProfile {
  id                  String   @id @default(uuid()) @db.Uuid
  userId              String   @unique @map("user_id") @db.Uuid

  // Sensitive data (SSN and address encrypted at application level)
  ssn                 String?
  dateOfBirth         DateTime? @map("date_of_birth")

  // Address
  addressStreet       String?  @map("address_street")
  addressCity         String?  @map("address_city")
  addressState        String?  @map("address_state")
  addressZip          String?  @map("address_zip")

  // Banking info
  bankName            String?  @map("bank_name")
  bankRoutingNumber   String?  @map("bank_routing_number")
  bankAccountNumber   String?  @map("bank_account_number")

  // Work info
  workState           String?  @map("work_state")
  employerName        String?  @map("employer_name")

  // TurboTax credentials (optional)
  turbotaxEmail       String?  @map("turbotax_email")
  turbotaxPassword    String?  @map("turbotax_password")

  // Profile status
  profileComplete     Boolean  @default(false) @map("profile_complete")
  isDraft             Boolean  @default(true) @map("is_draft")

  createdAt           DateTime @default(now()) @map("created_at")
  updatedAt           DateTime @updatedAt @map("updated_at")

  // Relations
  user     User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  taxCases TaxCase[]

  @@map("client_profiles")
}

model TaxCase {
  id                String         @id @default(uuid()) @db.Uuid
  clientProfileId   String         @map("client_profile_id") @db.Uuid
  taxYear           Int            @map("tax_year")

  // Status tracking
  internalStatus    InternalStatus @default(revision_de_registro) @map("internal_status")
  clientStatus      ClientStatus   @default(esperando_datos) @map("client_status")
  federalStatus     TaxStatus?     @map("federal_status")
  stateStatus       TaxStatus?     @map("state_status")

  // Financial info
  estimatedRefund   Decimal?       @map("estimated_refund") @db.Decimal(10, 2)
  actualRefund      Decimal?       @map("actual_refund") @db.Decimal(10, 2)
  refundDepositDate DateTime?      @map("refund_deposit_date")

  // NUEVO v0.3 - Federal/State Separation
  federalEstimatedDate DateTime?  @map("federal_estimated_date")
  stateEstimatedDate   DateTime?  @map("state_estimated_date")
  federalActualRefund  Decimal?   @map("federal_actual_refund") @db.Decimal(10, 2)
  stateActualRefund    Decimal?   @map("state_actual_refund") @db.Decimal(10, 2)
  federalDepositDate   DateTime?  @map("federal_deposit_date")
  stateDepositDate     DateTime?  @map("state_deposit_date")

  // Payment tracking
  paymentReceived   Boolean        @default(false) @map("payment_received")
  commissionPaid    Boolean        @default(false) @map("commission_paid")

  // Year-specific employment and banking info
  workState         String?        @map("work_state")
  employerName      String?        @map("employer_name")
  bankName          String?        @map("bank_name")
  bankRoutingNumber String?        @map("bank_routing_number")
  bankAccountNumber String?        @map("bank_account_number")

  statusUpdatedAt   DateTime       @default(now()) @map("status_updated_at")

  // NUEVO v0.3 - Admin Step Control (1-5)
  adminStep         Int?           @map("admin_step")

  // NUEVO v0.3 - Problem Tracking
  hasProblem         Boolean       @default(false) @map("has_problem")
  problemStep        Int?          @map("problem_step")
  problemType        ProblemType?  @map("problem_type")
  problemDescription String?       @map("problem_description")
  problemResolvedAt  DateTime?     @map("problem_resolved_at")

  createdAt         DateTime       @default(now()) @map("created_at")
  updatedAt         DateTime       @updatedAt @map("updated_at")

  // Relations
  clientProfile  ClientProfile   @relation(fields: [clientProfileId], references: [id], onDelete: Cascade)
  documents      Document[]
  statusHistory  StatusHistory[]

  @@unique([clientProfileId, taxYear])
  @@map("tax_cases")
}

model Document {
  id          String       @id @default(uuid()) @db.Uuid
  taxCaseId   String       @map("tax_case_id") @db.Uuid
  type        DocumentType
  fileName    String       @map("file_name")
  storagePath String       @map("storage_path")
  mimeType    String       @map("mime_type")
  fileSize    Int          @map("file_size")
  taxYear     Int?         @map("tax_year")
  isReviewed  Boolean      @default(false) @map("is_reviewed")
  uploadedAt  DateTime     @default(now()) @map("uploaded_at")

  // Relations
  taxCase TaxCase @relation(fields: [taxCaseId], references: [id], onDelete: Cascade)

  @@map("documents")
}

model Ticket {
  id        String       @id @default(uuid()) @db.Uuid
  userId    String       @map("user_id") @db.Uuid
  subject   String
  status    TicketStatus @default(open)
  createdAt DateTime     @default(now()) @map("created_at")
  updatedAt DateTime     @updatedAt @map("updated_at")

  // Relations
  user     User            @relation(fields: [userId], references: [id], onDelete: Cascade)
  messages TicketMessage[]

  @@map("tickets")
}

model TicketMessage {
  id        String   @id @default(uuid()) @db.Uuid
  ticketId  String   @map("ticket_id") @db.Uuid
  senderId  String   @map("sender_id") @db.Uuid
  message   String
  createdAt DateTime @default(now()) @map("created_at")

  // Relations
  ticket Ticket @relation(fields: [ticketId], references: [id], onDelete: Cascade)
  sender User   @relation(fields: [senderId], references: [id])

  @@map("ticket_messages")
}

model StatusHistory {
  id             String   @id @default(uuid()) @db.Uuid
  taxCaseId      String   @map("tax_case_id") @db.Uuid
  previousStatus String?  @map("previous_status")
  newStatus      String   @map("new_status")
  changedById    String   @map("changed_by_id") @db.Uuid
  comment        String?
  createdAt      DateTime @default(now()) @map("created_at")

  // Relations
  taxCase   TaxCase @relation(fields: [taxCaseId], references: [id], onDelete: Cascade)
  changedBy User    @relation("ChangedBy", fields: [changedById], references: [id])

  @@map("status_history")
}

model Notification {
  id        String           @id @default(uuid()) @db.Uuid
  userId    String           @map("user_id") @db.Uuid
  type      NotificationType
  title     String
  message   String
  isRead    Boolean          @default(false) @map("is_read")
  createdAt DateTime         @default(now()) @map("created_at")

  // Relations
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("notifications")
}

// ============= NUEVO v0.3 - REFERRAL SYSTEM MODELS =============

model Referral {
  id              String         @id @default(uuid()) @db.Uuid
  referrerId      String         @map("referrer_id") @db.Uuid
  referredUserId  String         @unique @map("referred_user_id") @db.Uuid
  referralCode    String         @map("referral_code")
  status          ReferralStatus @default(pending)
  taxCaseId       String?        @map("tax_case_id") @db.Uuid
  completedAt     DateTime?      @map("completed_at")
  referredDiscount Decimal?      @map("referred_discount") @db.Decimal(10, 2)
  createdAt       DateTime       @default(now()) @map("created_at")
  updatedAt       DateTime       @updatedAt @map("updated_at")

  referrer     User @relation("ReferrerUser", fields: [referrerId], references: [id])
  referredUser User @relation("ReferredUser", fields: [referredUserId], references: [id])

  @@map("referrals")
}

model DiscountApplication {
  id               String         @id @default(uuid()) @db.Uuid
  userId           String         @map("user_id") @db.Uuid
  taxCaseId        String?        @map("tax_case_id") @db.Uuid
  discountType     DiscountType
  discountAmount   Decimal        @map("discount_amount") @db.Decimal(10, 2)
  discountPercent  Decimal?       @map("discount_percent") @db.Decimal(5, 2)
  referralId       String?        @map("referral_id") @db.Uuid
  appliedByAdminId String?        @map("applied_by_admin_id") @db.Uuid
  seasonYear       Int            @map("season_year")
  status           DiscountStatus @default(pending)
  notes            String?
  createdAt        DateTime       @default(now()) @map("created_at")
  updatedAt        DateTime       @updatedAt @map("updated_at")

  @@map("discount_applications")
}

// NUEVO v0.3 - W2 Estimate from Calculator
model W2Estimate {
  id              String        @id @default(uuid()) @db.Uuid
  userId          String        @map("user_id") @db.Uuid
  taxYear         Int           @map("tax_year")
  w2FileName      String?       @map("w2_file_name")
  box2Federal     Decimal       @map("box2_federal") @db.Decimal(10, 2)
  box17State      Decimal       @map("box17_state") @db.Decimal(10, 2)
  estimatedRefund Decimal       @map("estimated_refund") @db.Decimal(10, 2)
  ocrConfidence   OcrConfidence @map("ocr_confidence")
  createdAt       DateTime      @default(now()) @map("created_at")

  @@unique([userId, taxYear])
  @@map("w2_estimates")
}
```

## 3.2 Estados del Trámite

### Estados Internos (internal_status) - Solo Admins

| Estado                     | Descripción                                        |
| -------------------------- | -------------------------------------------------- |
| `revision_de_registro`     | Cliente se registró, admin debe revisar datos      |
| `esperando_datos`          | Esperando que cliente complete F2 o suba W2        |
| `falta_documentacion`      | Documentos incompletos o ilegibles                 |
| `en_proceso`               | Equipo procesando la declaración                   |
| `en_verificacion`          | IRS verificando (puede tomar tiempo)               |
| `resolviendo_verificacion` | Trabajando en resolver issues del IRS              |
| `inconvenientes`           | Problemas que requieren atención especial          |
| `cheque_en_camino`         | Reembolso aprobado, en camino                      |
| `esperando_pago_comision`  | Cliente recibió reembolso, pendiente pago comisión |
| `proceso_finalizado`       | Todo completado, caso cerrado                      |

### Estados del Cliente (client_status) - Visibles para el cliente

| Estado               | Texto mostrado al cliente                          |
| -------------------- | -------------------------------------------------- |
| `esperando_datos`    | "Necesitamos tus datos y documentos"               |
| `cuenta_en_revision` | "Estamos revisando tu información"                 |
| `taxes_en_proceso`   | "¡Estamos trabajando en tu declaración!"           |
| `taxes_en_camino`    | "Tu reembolso está en camino"                      |
| `taxes_depositados`  | "¡Reembolso depositado en tu cuenta!"              |
| `pago_realizado`     | "Gracias por tu pago"                              |
| `en_verificacion`    | "El IRS está verificando tu caso"                  |
| `taxes_finalizados`  | "¡Proceso completado! Gracias por confiar en JAI1" |

### Admin Step Control (v0.3)

| Step | Descripción                              |
| ---- | ---------------------------------------- |
| 1    | Registro inicial                         |
| 2    | W2 subido / Documentos completos         |
| 3    | Formulario fiscal completado             |
| 4    | En proceso de revisión IRS               |
| 5    | Finalizado                               |

---

# 4. ROLES Y PERMISOS

## 4.1 Roles del Sistema

| Rol        | Descripción                                                                                                                     |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **client** | Estudiante sudamericano con visa J-1. Usuario final del servicio de tax refund.                                                 |
| **admin**  | Dueño del negocio o empleado autorizado. Gestiona todos los clientes. 3 usuarios admin simultáneos esperados en temporada alta. |

## 4.2 Matriz de Permisos

| Acción                              |         Client          |        Admin         |
| ----------------------------------- | :---------------------: | :------------------: |
| Ver su propio perfil                |            ✓            |          ✓           |
| Editar su propio perfil             |  ✗ (contactar soporte)  |          ✓           |
| Subir documentos (W2, comprobantes) |            ✓            |          ✓           |
| Eliminar/reemplazar documento       | ✓ (solo si no revisado) |          ✓           |
| Ver estado de su trámite            |    ✓ (client_status)    | ✓ (internal_status)  |
| Crear ticket de soporte             |            ✓            |          ✓           |
| Ver TODOS los clientes              |            ✗            |          ✓           |
| Ver SSN completo de clientes        |            ✗            |   ✓ (123-45-6789)    |
| Ver datos bancarios de clientes     |            ✗            |          ✓           |
| Editar información de clientes      |            ✗            |          ✓           |
| Cambiar estado del trámite          |            ✗            | ✓ (cualquier estado) |
| Descargar documentos                |       ✓ (propios)       |      ✓ (todos)       |
| Eliminar clientes                   |            ✗            |          ✓           |
| Marcar pago recibido                |            ✗            |          ✓           |
| Exportar lista de clientes (Excel)  |            ✗            |          ✓           |
| Responder tickets                   |       ✓ (propios)       |      ✓ (todos)       |
| Ver programa de referidos           |            ✓            |          ✓           |
| Gestionar referidos                 |            ✗            |          ✓           |
| Aplicar descuentos                  |            ✗            |          ✓           |

---

# 5. API ENDPOINTS

**Base URL:** `https://api.portaljai1.com/v1`

**Nota v0.3:** Todas las respuestas ahora usan **camelCase** en lugar de snake_case.

## 5.1 Autenticación

### POST /auth/register

Registra un nuevo usuario cliente.

**Request:**

```json
{
  "email": "string",
  "password": "string",
  "firstName": "string",
  "lastName": "string",
  "phone": "string (optional)",
  "referralCode": "string (optional)"  // NUEVO v0.3
}
```

**Response 201:**

```json
{
  "user": {
    "id": "uuid",
    "email": "string",
    "firstName": "string",
    "lastName": "string",
    "role": "client",
    "createdAt": "datetime"
  },
  "accessToken": "jwt",
  "refreshToken": "jwt"
}
```

### POST /auth/login

Inicia sesión.

### POST /auth/logout

Cierra sesión actual.

### POST /auth/refresh

Renueva tokens. Ahora incluye objeto user completo.

### POST /auth/forgot-password

Envía email de recuperación.

### POST /auth/reset-password

Resetea contraseña con token.

### GET /auth/google (NUEVO v0.3)

Inicia el flujo de autenticación con Google OAuth.

- **Redirect:** Redirige a Google para autenticación

### GET /auth/google/callback (NUEVO v0.3)

Callback de Google OAuth.

- **Response:** Redirige al frontend con tokens en query params

---

## 5.2 Profile (Cliente)

### GET /profile

Obtiene perfil del usuario autenticado.

### POST /profile/complete

Completa el formulario F2 (datos sensibles).

### GET /profile/draft

Obtiene el borrador guardado del perfil.

### PATCH /profile/user-info (NUEVO v0.3)

Actualiza información básica del usuario (nombre, teléfono, dirección, fecha de nacimiento).

---

## 5.3 Documents

### POST /documents/upload

Sube un documento.

### GET /documents

Lista documentos del usuario.

### GET /documents/:id/download

Genera URL firmada para descarga.

### DELETE /documents/:id

Elimina documento (solo si no ha sido revisado).

---

## 5.4 Tax Cases

### GET /tax-case

Obtiene el caso fiscal del cliente autenticado.

### GET /tax-case/status

Obtiene solo el estado simplificado para mostrar en dashboard.

---

## 5.5 Admin - Clients

### GET /admin/clients

Lista todos los clientes con paginación.

### GET /admin/clients/:id

Obtiene detalle completo de un cliente.

### PATCH /admin/clients/:id

Actualiza información de un cliente.

### PATCH /admin/clients/:id/status

Cambia el estado del trámite.

### PATCH /admin/clients/:id/admin-step (NUEVO v0.3)

Cambia el admin step de un cliente.

### PATCH /admin/clients/:id/problem (NUEVO v0.3)

Registra o resuelve un problema en el caso.

### DELETE /admin/clients/:id

Elimina un cliente y todos sus datos.

### POST /admin/clients/:id/mark-paid

Marca el pago como recibido.

### GET /admin/clients/export

Exporta lista de clientes a Excel.

---

## 5.6 Tickets (Soporte)

### POST /tickets

Crea un nuevo ticket.

### GET /tickets

Lista tickets del usuario o todos (admin).

### GET /tickets/:id

Obtiene detalle del ticket con mensajes.

### POST /tickets/:id/messages

Envía un mensaje al ticket.

### PATCH /tickets/:id/status

Cambia estado del ticket (admin).

---

## 5.7 Notifications

### GET /notifications

Lista notificaciones del usuario.

### PATCH /notifications/:id/read

Marca notificación como leída.

### PATCH /notifications/read-all

Marca todas como leídas.

---

## 5.8 Webhooks (para Make/Integraciones)

### POST /webhooks/make/new-client

Webhook para nuevo lead.

### POST /webhooks/make/ocr-result

Recibe resultado del OCR de W2.

### GET /webhooks/status

Health check.

---

## 5.9 Referrals (NUEVO v0.3)

### GET /referrals/validate/:code (Público)

Valida un código de referido.

**Response:**

```json
{
  "valid": true,
  "referrerName": "Juan P.",
  "referrerId": "uuid"
}
```

### GET /referrals/my-code (Protegido)

Obtiene el código de referido del usuario. Si el usuario es elegible (profileComplete = true) pero no tiene código, se genera automáticamente.

**Response:**

```json
{
  "code": "JUA4X7K",
  "isEligible": true,
  "createdAt": "datetime"
}
```

### GET /referrals/my-referrals (Protegido)

Lista los referidos hechos por el usuario.

**Response:**

```json
[
  {
    "id": "uuid",
    "referredUser": {
      "firstName": "María",
      "lastName": "G."
    },
    "status": "successful",
    "createdAt": "datetime",
    "completedAt": "datetime"
  }
]
```

### GET /referrals/my-discount (Protegido)

Obtiene información de descuento del usuario.

**Response:**

```json
{
  "successfulReferrals": 3,
  "pendingReferrals": 2,
  "currentDiscountPercent": 20,
  "nextTierAt": 4,
  "discountTiers": [
    { "min": 1, "percent": 5 },
    { "min": 2, "percent": 10 },
    { "min": 3, "percent": 20 },
    { "min": 4, "percent": 30 },
    { "min": 5, "percent": 50 },
    { "min": 6, "percent": 75 },
    { "min": 7, "percent": 100 }
  ]
}
```

### GET /referrals/leaderboard (Protegido)

Obtiene el leaderboard global de referidos.

**Query params:** `limit` (default: 10)

**Response:**

```json
[
  {
    "rank": 1,
    "userId": "uuid",
    "displayName": "Juan P.",
    "successfulReferrals": 7,
    "currentTier": 100
  }
]
```

### GET /referrals/admin (Admin)

Lista todos los referidos del sistema.

### GET /referrals/admin/stats (Admin)

Estadísticas del programa de referidos.

**Response:**

```json
{
  "totalReferrals": 150,
  "successfulReferrals": 45,
  "pendingReferrals": 80,
  "totalUsersWithCode": 200,
  "conversionRate": 30,
  "seasonYear": 2026
}
```

### PATCH /referrals/admin/:id/status (Admin)

Actualiza el estado de un referido.

### POST /referrals/admin/clients/:id/apply-discount (Admin)

Aplica un descuento a un cliente.

**Request:**

```json
{
  "discountType": "referrer_reward",
  "discountAmount": 50,
  "discountPercent": 20,
  "seasonYear": 2026,
  "applyImmediately": true,
  "notes": "Descuento por 3 referidos exitosos"
}
```

---

## 5.10 Calculator

### POST /calculator/estimate

Calcula estimación de reembolso usando OCR en W2.

### GET /calculator/latest-estimate

Obtiene la última estimación guardada del usuario.

---

# 6. USER FLOWS

## 6.1 Flow de Registro y Onboarding (Cliente)

```
┌─────────────────────────────────────────────────────────────────┐
│                    FLUJO DE ONBOARDING (v0.3)                   │
└─────────────────────────────────────────────────────────────────┘

1. LANDING PAGE
   ├── Opción 1: Formulario de registro tradicional
   └── Opción 2: Login con Google (NUEVO v0.3)
         │
         ▼
2. REGISTRO
   ├── Email / Contraseña
   ├── Nombre completo
   ├── Teléfono (opcional)
   └── Código de referido (opcional, NUEVO v0.3)
         │
         ▼
3. ONBOARDING FLOW (NUEVO v0.3)
   ├── Pantalla de bienvenida
   ├── Beneficios del portal (3 slides)
   ├── Verificación de documentos
   └── Calculadora W2 (opcional)
         │
         ▼
4. DASHBOARD DEL CLIENTE
   ├── Estado actual del trámite
   ├── Próximos pasos
   ├── Timeline de progreso
   └── Acceso a programa de referidos (si elegible)
         │
         ▼
5. FORMULARIO F2 (datos sensibles)
   ├── SSN
   ├── Fecha de nacimiento
   ├── Dirección completa USA
   ├── Datos bancarios
   ├── Estado donde trabajó
   ├── Nombre del empleador
   └── Credenciales TurboTax (opcional)
         │
         ▼
6. UPLOAD DE DOCUMENTOS
   ├── W2 (obligatorio)
   ├── Comprobante de pago
   └── Otros documentos
         │
         ▼
7. ESPERAR PROCESAMIENTO
   └── Notificaciones automáticas
```

## 6.2 Flow del Programa de Referidos (NUEVO v0.3)

```
┌─────────────────────────────────────────────────────────────────┐
│                    FLUJO DE REFERIDOS                           │
└─────────────────────────────────────────────────────────────────┘

REFERIDOR (quien refiere):
1. Completa formulario fiscal (profileComplete = true)
         │
         ▼
2. Obtiene código de referido automáticamente
   Formato: PRIMERAS_3_LETRAS + 4_ALFANUMÉRICOS (ej: JUA4X7K)
         │
         ▼
3. Comparte código vía WhatsApp/Email/Twitter
         │
         ▼
4. Por cada referido exitoso, sube de tier:
   ├── 1 referido → 5% descuento
   ├── 2 referidos → 10% descuento
   ├── 3 referidos → 20% descuento
   ├── 4 referidos → 30% descuento
   ├── 5 referidos → 50% descuento
   ├── 6 referidos → 75% descuento
   └── 7+ referidos → 100% GRATIS

REFERIDO (quien usa el código):
1. Se registra con código de referido
         │
         ▼
2. Referral status: "pending"
         │
         ▼
3. Completa formulario fiscal
   └── Referral status: "tax_form_submitted"
         │
         ▼
4. Recibe reembolso (federal o estatal depositado)
   └── Referral status: "successful"
         │
         ▼
5. Obtiene $11 USD de descuento en comisión
```

---

# 7. WIREFRAMES Y UI

## 7.1 Especificaciones de Diseño

- **Colores primarios:** `#B21B43` (rojo JAI1) y `#1D345D` (azul oscuro)
- **Color secundario:** `#FFFFFF` (blanco sólido)
- **Framework UI:** Angular Material + Custom CSS
- **Responsive:** Desktop first, mobile básico
- **Idioma:** Solo español
- **Formato fechas:** DD/MM/YYYY
- **Zona horaria:** UTC

## 7.2 Patrones de UI (NUEVO v0.3)

### Fast Loading Pattern

Para evitar flash de contenido, todos los componentes usan:

```typescript
// Componente
hasLoaded: boolean = false;

ngOnInit() {
  this.loadData();
}

loadData() {
  this.service.getData().pipe(
    finalize(() => {
      this.hasLoaded = true;
      this.cdr.detectChanges();
    })
  ).subscribe({...});
}
```

```html
<!-- Template -->
<div *ngIf="!hasLoaded" class="loading-spinner">
  Cargando...
</div>

<div *ngIf="hasLoaded">
  <!-- Contenido real -->
</div>
```

### Toast Notifications

Sistema unificado de notificaciones:

```typescript
this.toastService.success('Guardado correctamente');
this.toastService.error('Error al guardar');
this.toastService.warning('Campos incompletos');
```

---

# 8. NOTIFICACIONES

## 8.1 Canales Activos (MVP)

1. **Email** - Prioridad 1
2. **In-app notifications** - Prioridad 2

## 8.2 Triggers de Notificaciones

### Para CLIENTES:

| Evento                           | Email | In-app |
| -------------------------------- | :---: | :----: |
| Registro completado (bienvenida) |   ✓   |   ✓    |
| Cambio de estado del trámite     |   ✓   |   ✓    |
| Falta documentación adicional    |   ✓   |   ✓    |
| Respuesta a ticket de soporte    |   ✓   |   ✓    |
| Nuevo referido registrado (v0.3) |   ✓   |   ✓    |
| Referido exitoso (v0.3)          |   ✓   |   ✓    |

### Para ADMINS:

| Evento                            | Email | In-app |
| --------------------------------- | :---: | :----: |
| Nuevo cliente registrado          |   ✓   |   ✓    |
| Nuevo mensaje de cliente (ticket) |   ✓   |   ✓    |
| Perfil completado                 |   ✓   |   ✓    |
| W2 subido                         |   ✓   |   ✓    |
| Comprobante de pago subido        |   ✓   |   ✓    |
| Problema reportado (v0.3)         |   ✓   |   ✓    |

---

# 9. SEGURIDAD

## 9.1 Datos Encriptados

Los siguientes campos están encriptados usando AES-256:

- `ssn` (Social Security Number)
- `address_street` (Dirección)
- `turbotax_password` (si aplica)

## 9.2 Autenticación

- **JWT tokens** con expiración corta (15 min access, 7 días refresh)
- **Google OAuth** (NUEVO v0.3) para login simplificado
- **Sesión única:** Al hacer login, se invalidan tokens anteriores
- **Remember Me:** Opción para sesión persistente en localStorage vs sessionStorage

## 9.3 Google OAuth (NUEVO v0.3)

- Usa Passport.js con estrategia Google
- Callback seguro solo a dominios autorizados
- Creación automática de cuenta si el email no existe
- Vinculación automática si el email ya existe (sin Google)

## 9.4 Manejo de SSN

- Admin ve SSN completo: `123-45-6789`
- No hay enmascaramiento parcial

## 9.5 Almacenamiento de Archivos

- Supabase Storage con buckets privados
- URLs firmadas (signed URLs) con expiración de 1 hora
- Máximo 25 MB por archivo
- Solo PDF, JPG, PNG permitidos

## 9.6 Referral Codes (NUEVO v0.3)

- Códigos únicos generados criptográficamente
- Formato: 3 letras del nombre + 4 caracteres alfanuméricos random
- Generación usa `crypto.randomBytes()` para seguridad

---

# 10. INTEGRACIONES

## 10.1 Make (Integromat)

Webhooks expuestos por el portal.

## 10.2 Google OAuth (NUEVO v0.3)

**Configuración:**

```env
GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxx
GOOGLE_CALLBACK_URL=https://api.portaljai1.com/v1/auth/google/callback
```

**Flujo:**
1. Usuario hace clic en "Login con Google"
2. Redirect a Google para autenticación
3. Google redirige a callback con código
4. Backend intercambia código por tokens
5. Backend crea/actualiza usuario
6. Redirect a frontend con JWT tokens

## 10.3 Email (Resend/SendGrid)

Configuración estándar para emails transaccionales.

---

# 11. DEPLOYMENT

## 11.1 Ambientes

Solo **Producción** en MVP.

## 11.2 Variables de Entorno

### Backend (.env)

```env
# Database
DATABASE_URL=postgresql://user:password@host:5432/db

# Supabase
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_KEY=xxx

# JWT
JWT_SECRET=your-super-secret-key
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Email
EMAIL_PROVIDER=resend
RESEND_API_KEY=re_xxx
EMAIL_FROM=notificaciones@portaljai1.com

# Encryption
ENCRYPTION_KEY=32-byte-key-for-aes-256

# Webhooks
MAKE_API_KEY=xxx

# App
PORT=3000
NODE_ENV=production
FRONTEND_URL=https://portaljai1.com

# NUEVO v0.3 - Google OAuth
GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxx
GOOGLE_CALLBACK_URL=https://api.portaljai1.com/v1/auth/google/callback

# NUEVO v0.3 - Admin Notifications
ADMIN_EMAIL=admin@portaljai1.com
```

### Frontend (environment.prod.ts)

```typescript
export const environment = {
  production: true,
  apiUrl: "https://api.portaljai1.com/v1",
  supabaseUrl: "https://xxx.supabase.co",
  supabaseAnonKey: "xxx",
};
```

## 11.3 Estado de Implementación (Enero 2026 - v0.3)

### Stack Tecnológico en Producción

| Capa              | Tecnología                    | Hosting  |
| ----------------- | ----------------------------- | -------- |
| **Backend**       | NestJS + Prisma ORM           | Railway  |
| **Base de datos** | PostgreSQL                    | Supabase |
| **Frontend**      | Angular 21                    | Vercel   |
| **Autenticación** | JWT + Google OAuth            | —        |
| **Storage**       | Supabase Buckets              | —        |
| **IA**            | OpenAI Vision API             | —        |

### URLs de Producción

- **Frontend:** `https://portal-jai1-frontend.vercel.app`
- **Backend:** Railway (auto-deploy)

### Módulos Backend

`auth · users · clients · documents · tickets · notifications · webhooks · calculator · referrals · progress`

### Features en Producción (v0.4)

- ☑ Registro y login (cliente + admin)
- ☑ Login con Google OAuth
- ☑ Upload de documentos (PDF, JPEG, PNG)
- ☑ Sistema de tickets/mensajería
- ☑ Panel admin con detalle de clientes
- ☑ Calculadora de reembolso con OCR (W2)
- ☑ Control de pasos interno (adminStep)
- ☑ Programa de referidos con leaderboard
- ☑ Onboarding flow guiado
- ☑ Automatización de progreso
- ☑ Sistema de tracking de problemas
- ☑ Fast loading pattern (sin flash)
- ☑ Toast notifications
- ☑ **Database hardening (v0.4):**
  - Native UUID types (12 tables, 28 fields)
  - CHECK constraints for data validation
  - Timestamps with timezone support
  - Row Level Security (RLS) on all tables
  - Optimized indexes
- ☑ **Cache clearing on login** (fresh data guaranteed)

### Pendiente

- ☐ Tests automatizados
- ☐ Notificaciones WhatsApp (Make)

---

# 12. CRITERIOS DE ACEPTACIÓN

## 12.1 MVP Success Criteria

El MVP es exitoso si:

- [ ] 42 clientes se registran en las primeras 2 semanas
- [ ] 80% de los clientes suben su W2 sin ayuda
- [ ] Pocos bugs reportados
- [ ] Sistema de referidos genera al menos 10 nuevos clientes

## 12.2 Acceptance Criteria - Referral Program (NUEVO v0.3)

### AC-010: Generación de Código de Referido

```gherkin
DADO que soy un cliente con perfil completo (profileComplete = true)
CUANDO accedo al programa de referidos
ENTONCES se genera automáticamente mi código de referido
Y puedo copiarlo y compartirlo
```

### AC-011: Registro con Código de Referido

```gherkin
DADO que tengo un código de referido válido
CUANDO me registro en el portal usando ese código
ENTONCES mi cuenta se vincula al referidor
Y el referidor recibe una notificación
Y mi referral status es "pending"
```

### AC-012: Referido Exitoso

```gherkin
DADO que me registré con un código de referido
Y completé mi formulario fiscal
CUANDO mi reembolso es depositado (federal o estatal)
ENTONCES mi referral status cambia a "successful"
Y el referidor avanza de tier en el programa
Y el referidor recibe notificación de referido exitoso
```

### AC-013: Leaderboard

```gherkin
DADO que estoy en la página del programa de referidos
CUANDO veo el leaderboard
ENTONCES veo los top 10 referidores de la temporada
Y veo mi posición si estoy en el ranking
```

---

# 13. TIMELINE Y MILESTONES

## Cronograma Original (14 días) - COMPLETADO

| Día   | Tarea                                        | Estado      |
| ----- | -------------------------------------------- | ----------- |
| 1-2   | Setup proyecto Angular + NestJS + Supabase   | ✅ Completo |
| 3-4   | Auth completo (registro, login, JWT, guards) | ✅ Completo |
| 5-6   | Formularios F1/F2, ProfileService            | ✅ Completo |
| 7-8   | Upload de documentos, Storage                | ✅ Completo |
| 9-10  | Dashboard cliente + Panel Admin básico       | ✅ Completo |
| 11-12 | Sistema de tickets, Notificaciones           | ✅ Completo |
| 13    | Testing, bug fixes                           | ✅ Completo |
| 14    | Deploy a producción                          | ✅ Completo |

## Cronograma v0.3 (Enero 2026) - COMPLETADO

| Tarea                             | Estado      |
| --------------------------------- | ----------- |
| Google OAuth                      | ✅ Completo |
| Programa de Referidos             | ✅ Completo |
| Onboarding Flow                   | ✅ Completo |
| Progress Automation               | ✅ Completo |
| Problem Tracking                  | ✅ Completo |
| Fast Loading Pattern              | ✅ Completo |
| Bug fixes (profile, loading, etc) | ✅ Completo |

## Cronograma v0.4 (13 Enero 2026) - COMPLETADO

| Tarea                                        | Estado      |
| -------------------------------------------- | ----------- |
| Phase 1-4: Schema improvements               | ✅ Completo |
| Phase 5: CHECK constraints                   | ✅ Completo |
| Phase 6: TaxCase as source of truth          | ✅ Completo |
| Phase 7: Frontend federal/state dates        | ✅ Completo |
| Phase 8: TEXT to UUID migration (12 tables)  | ✅ Completo |
| Cache clearing on login (fresh data)         | ✅ Completo |
| All critical flows verified                  | ✅ Completo |

---

# 14. GLOSARIO

| Término          | Definición                                                                     |
| ---------------- | ------------------------------------------------------------------------------ |
| **W2**           | Formulario fiscal de EE.UU. que muestra ingresos y retenciones del empleador   |
| **SSN**          | Social Security Number - Número de seguro social de EE.UU.                     |
| **J-1**          | Tipo de visa de intercambio cultural (incluye Work & Travel)                   |
| **Tax Refund**   | Devolución de impuestos retenidos en exceso                                    |
| **IRS**          | Internal Revenue Service - Agencia tributaria de EE.UU.                        |
| **F1**           | Formulario inicial con datos básicos (nombre, email, teléfono)                 |
| **F2**           | Formulario completo con datos sensibles (SSN, banco, dirección)                |
| **Make**         | Plataforma de automatización (antes Integromat)                                |
| **Supabase**     | Plataforma BaaS con PostgreSQL y Storage                                       |
| **Referidor**    | Usuario que comparte su código de referido (v0.3)                              |
| **Referido**     | Usuario que se registra usando un código de referido (v0.3)                    |
| **adminStep**    | Paso interno de control administrativo (1-5) (v0.3)                            |
| **OAuth**        | Protocolo de autorización para login con terceros (Google) (v0.3)              |

---

# 15. APÉNDICES

## A. Diagrama de Base de Datos (ER) - Actualizado v0.3

```
┌──────────────────┐       ┌────────────────┐       ┌──────────────┐
│      users       │       │ client_profiles│       │  tax_cases   │
├──────────────────┤       ├────────────────┤       ├──────────────┤
│ id (PK)          │◄──────│ user_id (FK)   │       │ id (PK)      │
│ email            │       │ id (PK)        │◄──────│ client_id(FK)│
│ password_hash    │       │ ssn (encrypted)│       │ tax_year     │
│ role             │       │ date_of_birth  │       │ internal_stat│
│ first_name       │       │ address_*      │       │ client_status│
│ last_name        │       │ bank_*         │       │ federal_stat │
│ phone            │       │ work_state     │       │ state_status │
│ google_id (v0.3) │       │ employer_name  │       │ admin_step   │
│ referral_code    │       │ turbotax_*     │       │ has_problem  │
│ referred_by_code │       │ profile_complete       │ problem_*    │
│ created_at       │       │ is_draft       │       │ fed_deposit  │
└──────────────────┘       └────────────────┘       │ state_deposit│
        │                                           └──────────────┘
        │                                                  │
        ▼                                                  ▼
┌──────────────┐       ┌──────────────┐       ┌──────────────┐
│   tickets    │       │  documents   │       │ w2_estimates │
└──────────────┘       └──────────────┘       │   (v0.3)     │
        │                                     └──────────────┘
        ▼
┌──────────────┐       ┌──────────────┐       ┌──────────────┐
│ticket_messages       │  referrals   │       │ discount_    │
└──────────────┘       │   (v0.3)     │       │ applications │
                       ├──────────────┤       │   (v0.3)     │
┌──────────────┐       │ id (PK)      │       └──────────────┘
│notifications │       │ referrer_id  │
└──────────────┘       │ referred_id  │
                       │ status       │
┌──────────────┐       │ completed_at │
│status_history│       └──────────────┘
└──────────────┘
```

## B. Discount Tiers (v0.3)

| Referidos Exitosos | Descuento para Referidor |
| ------------------ | ------------------------ |
| 1                  | 5%                       |
| 2                  | 10%                      |
| 3                  | 20%                      |
| 4                  | 30%                      |
| 5                  | 50%                      |
| 6                  | 75%                      |
| 7+                 | 100% (GRATIS)            |

**Bonus para Referido:** $11 USD de descuento en comisión

## C. Referral Status Flow (v0.3)

```
pending ─────► tax_form_submitted ─────► awaiting_refund ─────► successful
    │                                                               │
    │                                                               │
    └──────────────────────► expired ◄──────────────────────────────┘
                         (después de 1 año)
```

---

# 16. DECISIONES TÉCNICAS

## 16.1 WebSocket vs HTTP Polling - Decisión: HTTP Polling

### Contexto

Se evaluó implementar WebSocket para mensajería en tiempo real en el sistema de tickets/soporte. Después de un análisis de costo-beneficio, se decidió **NO implementar WebSocket** y usar **HTTP Polling cada 60 segundos** en su lugar.

### Razones para NO usar WebSocket en JAI1

| Factor | WebSocket | HTTP Polling (actual) |
|--------|-----------|----------------------|
| **Complejidad de implementación** | Alta (gateway, rooms, reconnect logic, auth) | Baja (ya implementado) |
| **Uso de memoria servidor** | ~10-50KB por conexión persistente | Cero (stateless) |
| **Costo de hosting (Railway)** | Mayor RAM requerida | Sin cambios |
| **Escalabilidad** | Requiere Redis para múltiples servidores | Escala naturalmente |
| **Mantenimiento** | Más código, más bugs potenciales | Mínimo |

### Características del caso de uso JAI1

El sistema de soporte de JAI1 tiene las siguientes características que hacen innecesario WebSocket:

1. **Volumen bajo de mensajes**: Los usuarios envían consultas ocasionales, no es un chat en vivo
2. **Tiempo de respuesta esperado**: 24-48 horas hábiles (documentado en UI)
3. **Usuarios concurrentes**: ~200 clientes esperados en temporada, no miles
4. **Naturaleza del soporte**: Consultas sobre trámites fiscales, no urgentes
5. **Presupuesto limitado**: Startup en fase inicial, optimizar costos

### Implementación actual: Auto-Polling 60 segundos

```typescript
// user-messages.ts
interval(60000).pipe(
  takeUntilDestroyed(this.destroyRef)
).subscribe(() => {
  if (this.hasLoaded && !this.isLoadingInProgress) {
    this.refreshActiveTicket();  // Silent refresh, no loading spinner
  }
});
```

**Beneficios de esta implementación:**
- Actualización automática sin acción del usuario
- Sin impacto visual (no muestra loading spinner)
- Auto-scroll solo si hay mensajes nuevos
- Se detiene automáticamente al salir del componente
- Cero costo adicional de infraestructura

### Cuándo reconsiderar WebSocket

Implementar WebSocket en el futuro SI:
- Se necesitan indicadores de "escribiendo..."
- Se requiere chat en tiempo real (respuestas instantáneas)
- Hay más de 1,000 usuarios concurrentes
- Se implementa un sistema de notificaciones push masivas
- El presupuesto de infraestructura aumenta significativamente

### Funcionalidades de tickets implementadas (v0.3)

A pesar de no usar WebSocket, el sistema de tickets incluye:
- ✅ Soft-delete de tickets (usuario y admin)
- ✅ Soft-delete de mensajes (admin only)
- ✅ Read receipts (marcado como leído)
- ✅ Unread count badges en lista de tickets
- ✅ Auto-polling cada 60 segundos
- ✅ Notificaciones por email cuando admin responde
- ✅ Notificaciones in-app

---

# 17. DATABASE HARDENING (v0.4)

## 17.1 Overview

En la versión 0.4 se realizó una serie de mejoras a la base de datos para garantizar integridad, eficiencia y seguridad.

## 17.2 Phases Completed

### Phase 1-4: Schema Improvements
- Agregados índices optimizados para queries frecuentes
- Timestamps convertidos a `@db.Timestamptz` para soporte de timezone
- Campos de fecha usando `@db.Date` para fechas sin hora
- Campo `address_country` agregado con default "USA"

### Phase 5: CHECK Constraints
- Validación de `tax_year` (2020-2100)
- Validación de campos `problem_*` (si `has_problem=false`, campos deben ser NULL)
- Constraints aplicados directamente en PostgreSQL

### Phase 6: Source of Truth
- Backend verificado para usar TaxCase como source of truth
- Campos de banking/employment year-specific en TaxCase (no ClientProfile)

### Phase 7: Frontend Updates
- Frontend computa `actualRefund = federalActualRefund + stateActualRefund`
- Usa fechas separadas `federalDepositDate` y `stateDepositDate`

### Phase 8: TEXT to UUID Migration
- 12 tablas migradas de TEXT a native PostgreSQL UUID
- 28 campos (PKs + FKs) con `@db.Uuid`
- Migration script: `scripts/sql/migrate-text-to-uuid.sql`
- Validation scripts creados para pre/post migration

## 17.3 Files Created/Modified

```
portal-jai1-backend/
├── prisma/schema.prisma                     # @db.Uuid en 28 campos
└── scripts/sql/
    ├── migrate-text-to-uuid.sql             # Migration script completo
    ├── enable-rls-policies.sql              # RLS en 12 tablas
    ├── validate-uuids-before-migration.sql  # Pre-migration validation
    └── verify-uuid-migration.sql            # Post-migration verification
```

## 17.4 Benefits

| Mejora | Beneficio |
|--------|-----------|
| Native UUID | 50% menos storage, validación automática de formato |
| CHECK constraints | Integridad de datos garantizada a nivel DB |
| Timestamptz | Manejo correcto de timezones |
| RLS | Seguridad adicional contra acceso directo |
| Indexes | Queries más rápidos en campos frecuentes |

---

**FIN DEL DOCUMENTO**

_Este PRD debe ser usado como referencia única para el desarrollo del Portal JAI1. Cualquier cambio debe ser documentado y versionado._

_Versión 0.4 - Última actualización: 13 de Enero, 2026_
