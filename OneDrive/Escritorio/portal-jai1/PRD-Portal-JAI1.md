# PRODUCT REQUIREMENTS DOCUMENT (PRD)

## Portal JAI1 - Tax Refund Service

### Angular + NestJS Full-Stack Application

---

| **Versión**                    | 1.6 - Dashboard Track Filters             |
| ------------------------------ | ----------------------------------------- |
| **Fecha Última Actualización** | 12 de Marzo, 2026                         |
| **Fecha Creación**             | 27 de Diciembre, 2024                    |
| **Deadline MVP**               | 10 de Enero, 2025                        |
| **Inicio Temporada**           | 28 de Enero, 2025 (Temporada Fiscal USA) |
| **Clientes Reales**            | 21 clientes importados (temporada 2025)  |
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
23. ✅ **Client Portal Polish (v0.5)** - COMPLETADO
    - Profile: Removed in-app password change (use forgot password flow)
    - Profile: Fixed loading race condition on first visit
    - Sidebar: Fixed logout button visibility on desktop
    - Calculator: Fixed mobile scroll to show CTA button
    - Notifications: Added deletedAt filter (soft-delete support)
    - Referrals: Expiration job now includes 'tax_form_submitted' status
    - DiscountApplication: Unique constraint per referral
    - Financial validation: CHECK constraints for non-negative amounts
24. ✅ **Status System v2 (v0.6)** - COMPLETADO
    - Unified CaseStatus enum (awaiting_form, awaiting_docs, preparing, taxes_filed, case_issues)
    - Enhanced FederalStatusNew tracking (9 estados detallados)
    - Enhanced StateStatusNew tracking (9 estados detallados)
    - Phase-based workflow (caseStatus === taxes_filed separates pre/post filing)
    - Complete status change timestamps per track
25. ✅ **Alarm System (v0.6)** - COMPLETADO
    - AlarmThreshold per tax case (custom or global defaults)
    - AlarmHistory tracking with resolution workflow
    - Alarm types: verification delays, letter timeouts, processing delays
    - Alarm levels: warning, critical
    - Auto-resolve when status changes
    - Admin dashboard for active alarms
26. ✅ **Audit Logs (v0.6)** - COMPLETADO
    - Track security events (password changes, failed logins)
    - Track financial events (refund updates, discount applications)
    - Track document deletions
    - IP address and user agent logging
    - Admin export to CSV
27. ✅ **Refresh Token System (v0.6)** - COMPLETADO
    - Secure token rotation with hash storage
    - Device info and IP tracking
    - Token revocation and replacement chain
    - Logout from all devices support
28. ✅ **i18n / Multi-language (v0.6)** - COMPLETADO
    - User language preference (preferredLanguage field)
    - Spanish/English support
    - Automatic notification translation
29. ✅ **System Settings (v0.6)** - COMPLETADO
    - Key-value configuration store
    - Admin-managed settings
    - Audit trail for setting changes
30. ✅ **V1→V2 Status Migration Complete (v0.7)** - COMPLETADO
    - Removed V1 enums from database (TaxStatus, PreFilingStatus)
    - Removed V1 columns (pre_filing_status, federal_status, state_status)
    - Added DEPOSIT_PENDING status to FederalStatusNew and StateStatusNew
    - All queries now use V2 fields exclusively (caseStatus, federalStatusNew, stateStatusNew)
    - Backfill migration executed: all existing data migrated to V2
    - Backup table created: _backup_v1_status_20250124
    - V1 fields (taxesFiled, taxesFiledAt) kept for referral code generation only
    - Frontend fully migrated: admin panel uses V2 exclusively
    - Backend fully migrated: all services and queries use V2
31. ✅ **API Sync & Type Generation (v0.8)** - COMPLETADO
    - Centralized pagination constants (PAGINATION_LIMITS) - no more magic numbers
    - Standardized response wrapper DTOs (PaginatedResponseDto, etc.)
    - Full Swagger/OpenAPI decorators on all DTOs (@ApiProperty, @ApiPropertyOptional)
    - Controller documentation (@ApiTags, @ApiOperation, @ApiResponse)
    - Automatic OpenAPI spec export (openapi.json)
    - ng-openapi-gen integration for frontend type generation
    - 39 models and 14 services auto-generated from backend DTOs
    - `npm run generate:api` to sync frontend types from backend
32. ✅ **Visual Review System (v0.9)** - COMPLETADO
    - Gamified 4-step document verification flow
    - Step 1: Client form data review (SSN, name, DOB, address, employer)
    - Step 2: W2 verification with bento grid layout (50/50 split)
      - LEFT: Client data panel + W2 key fields checklist (Box 2, Box 17, estimated refund)
      - RIGHT: Document preview with zoom, rotate, fullscreen, download
      - W2 document selector for multiple W2s
      - OCR confidence badge from calculator
    - Step 3: Payment proof review (document list + preview)
    - Step 4: Consent form review (document list + preview)
    - Final decision screen (Accept / Problem Detected)
    - Celebration animation on successful verification
    - Progress indicator (1/4, 2/4, etc.)
33. ✅ **Refund Confirmation System (v0.9)** - COMPLETADO
    - Client can confirm when they received their refund
    - Separate confirmation for federal and state tracks
    - Updates actual refund amounts (federalActualRefund, stateActualRefund)
    - Records deposit dates (federalDepositDate, stateDepositDate)
    - Client-facing UI in tax tracking section
34. ✅ **Commission Payment Tracking (v0.9)** - COMPLETADO
    - Admin view of unpaid commissions per client
    - Checkbox to mark commission as paid
    - commissionPaid flag on TaxCase model
    - commissionPaidAt timestamp for audit trail
35. ✅ **Engineer Status System Improvements (v0.9)** - COMPLETADO
    - Auto-transition to documentos_enviados when 4 items complete:
      - Tax form submitted (profileComplete && !isDraft)
      - W2 document uploaded
      - Payment proof uploaded
      - Consent form signed
    - Status tooltips/descriptions in admin dropdown UI
    - Auto-calculated Fecha Estimada on taxes_filed:
      - Federal: filing date + 6 weeks
      - State: filing date + 9 weeks
    - Monto Real entry guidance (only enter when confirmed)
    - Removed IRS_VERIFICATION from ProblemType enum
    - Auto-resolve problems on positive status progression
    - Verification handled via status (in_verification) not problem flags
36. ✅ **Status System v2 Final (v1.0)** - COMPLETADO
    - Renamed all status enums to Spanish for client-facing consistency
    - FederalStatusNew: taxes_en_proceso, en_verificacion, verificacion_en_progreso, problemas, verificacion_rechazada, deposito_directo, cheque_en_camino, comision_pendiente, taxes_completados
    - StateStatusNew: same 9 statuses as federal
    - CaseStatus: awaiting_form, awaiting_docs, documentos_enviados, preparing, taxes_filed, case_issues
    - Removed DEPOSIT_PENDING, verification_letter_sent (replaced by Spanish equivalents)
    - Removed old V1 backup table
37. ✅ **Commission Proof System (v1.0)** - COMPLETADO
    - Dual-track commission proof: federal and state tracked separately
    - Client uploads payment receipt (commission_proof_federal, commission_proof_state DocumentTypes)
    - Admin reviews proof: reviewedBy, reviewedAt, reviewNote fields per track
    - Per-track commission rates: federalCommissionRate, stateCommissionRate (11% normal, 22% verification)
    - Commission paid tracking: federalCommissionPaid, stateCommissionPaid with timestamps
38. ✅ **Consent Form System (v1.0)** - COMPLETADO
    - ConsentFormStatus enum (pending, signed) on TaxCase
    - Consent form upload, signing timestamp, storage path
    - consent_form DocumentType for uploads
    - Auto-transition to documentos_enviados when consent signed + W2 + payment proof + profile complete
39. ✅ **JAI1GENT Referral Program (v1.0)** - COMPLETADO
    - New UserRole: jai1gent (alongside client, admin)
    - Jai1gentInviteCode: Admin-generated 8-char invite codes for JAI1GENT registration
    - Jai1gentProfile: Referral code (JAI + 3 name + 4 random), payment info (bank_transfer/zelle)
    - Jai1gentReferral: Per-referral tracking with commission calculation
    - Denormalized stats: totalReferrals, completedReferrals, totalEarnings, paidEarnings
40. ✅ **RAG Knowledge Base (v1.0)** - COMPLETADO
    - KnowledgeChunk model with pgvector embeddings (1536 dimensions)
    - Section-based content organization for chatbot RAG
    - OpenAI integration for embedding generation
41. ✅ **Production Data Migration (v1.0)** - COMPLETADO
    - Wiped all test data from Supabase
    - Imported 21 real clients from manual spreadsheet
    - 10 clients with taxes filed (status: taxes_en_proceso)
    - 11 clients in various pre-filing stages
    - All sensitive data encrypted (AES-256-GCM): SSN, TurboTax creds, bank info, addresses
    - Admin account created: jai@memas.agency
    - All clients have temporary password for first login

### ✅ Sesión 7-Mar-2026 — Monitoring Fixes & UX:

42. ✅ **PrismaService Global Singleton (v1.1)** - COMPLETADO
    - Created `PrismaModule` with `@Global()` decorator
    - Removed duplicate `PrismaService` provider declarations from all 17 feature modules
    - Backend now logs exactly one "Database connected successfully" on startup
    - Eliminates multiple PostgreSQL connection pools per process

43. ✅ **IRS & Colorado Monitor — Admin Approval Flow Restored (v1.1)** - COMPLETADO
    - Fixed: `handleCheckResult` was pre-updating local `federalStatusNew`/`stateStatusNew`,
      causing approve/dismiss recommendation buttons to never appear
    - Fixed: empty white toast square during batch monitoring (Angular `[class]` binding
      was replacing base `toast` CSS class — changed to `[ngClass]`)
    - Status changes now require explicit admin approval via ✓/✕ buttons
    - Toast wording changed to "recomendación → X (pendiente de aprobación)"

44. ✅ **Monitor UX Improvements (v1.1)** - COMPLETADO
    - "Ocultar completados" toggle (default ON) hides taxes_completados,
      deposito_directo, cheque_en_camino clients from both monitor tables
    - Fixed horizontal scroll on desktop (overflow: hidden → overflow-x: auto)
    - CO Monitor: "X de Y clientes filed" counter in header — turns amber
      if any taxes_filed clients have non-Colorado workState
    - CO Monitor getStats() now returns coloradoFiledCount + totalFiledCount
      via parallel Promise.all queries

### ✅ Sesión 9-Mar-2026 — Statistics & Earnings Fix:

45. ✅ **Fix Ganancias Realizadas (v1.2)** - COMPLETADO
    - Bug: raw SQL in `getSeasonStats()` was summing both federal + state commission
      whenever EITHER deposit date was set — overstating earnings
    - Fix: per-track `CASE WHEN` logic — federal commission only when
      `federal_deposit_date IS NOT NULL`, state only when `state_deposit_date IS NOT NULL`

46. ✅ **Dashboard Stats Endpoint (v1.2)** - COMPLETADO
    - New `GET /admin/stats/dashboard` endpoint with DB-aggregate counts
    - Returns groupStats (pending/inReview/completed/needsAttention/total),
      caseStatusBreakdown, federalStatusBreakdown, stateStatusBreakdown, financials
    - Replaces client-side calculation from first 500 loaded clients — now always accurate
    - Admin dashboard quick-stat cards now use backend counts

47. ✅ **Admin Statistics Page (v1.2)** - COMPLETADO
    - New route `/admin/statistics` with full sidebar layout
    - Season summary cards (total, % completados, earnings realized/projected)
    - Pipeline funnel — 4 cards with animated progress bars + % per group
    - 3 horizontal bar charts: Case Status / Federal Status / State Status distributions
    - Financial breakdown: federal/state refund totals, client counts, averages
    - Dark mode supported, fully responsive
    - Added "📈 Estadísticas" nav item to admin dashboard sidebar
    - No external chart library — pure CSS gradients

### ✅ Sesión 11-Mar-2026 — Engineer Fixes & Chatbot KB:

48. ✅ **IRS Monitor — M1-M4 Engineer Fixes (v1.4)** - COMPLETADO
    - M1: `getFiledClients()` ahora retorna `ssnFull` (SSN desencriptado) además del `ssnMasked`
      — visible en la tabla del IRS Monitor para que el equipo pueda operar correctamente
    - M2: Botón "📸 Ver captura" inline en la columna "Último Check IRS" de la tabla principal
      — carga la screenshot del check más reciente sin necesidad de abrir el historial
    - M3: Clic en ✓ (aprobar recomendación) ahora abre un modal de confirmación con:
      — campo "Comentario para el cliente" (visible en portal del cliente)
      — campo "Comentario interno" (solo visible para el equipo)
      — ambos comentarios se guardan en `federalLastComment` y `statusHistory`
    - M4: Columna "Filing" eliminada de la tabla (mostraba "Single" para todos, sin valor)

49. ✅ **WhatsApp Chatbot — KB & Prompt Updates (v1.4)** - COMPLETADO
    - Ajuste #2: Agregados scripts específicos en system-prompt para cuando el cliente
      manda W2/PDF o SSN por WhatsApp — redirige a la app, nunca a soporte
    - Ajuste #3: Datos de pago actualizados en ambos bots (WhatsApp + in-app N8N):
      — Zelle: jai1@memas.agency / Lautaro Iglesias
      — Transferencia ARS: $43.000 / CBU 0000031000790171606023 / Lautaro Iglesias
      — PayPal: lautigle@gmail.com / Lautaro Iglesias
    - Ajuste #4: Regla explícita — nunca decir que el pago solo se puede hacer en dólares
    - Auditoría completa de los 10 archivos KB del WhatsApp bot (Relevance AI):
      — Pricing and Payments: agregados medios de pago reales (era el más crítico)
      — FAQS: agregar preguntas #21-23 (pago en pesos, medios de pago, W2 por chat)
      — Conversation Flows: agregar Flow 4B (W2/SSN recibido por chat)
      — Escalation Rules: agregar excepción para documentos vía chat

### ✅ Sesión 12-Mar-2026 (mañana) — Demo Mode:

50. ✅ **Demo Mode — Admin Login → Client Portal (v1.5)** - COMPLETADO
    - Problema: los owners creaban cuentas dummy en producción para hacer demos
    - Solución: botón "Modo Demo" en la página `/admin-login` que abre el portal
      del cliente como una cuenta demo pre-seedeada, sin necesidad de credenciales
    - Backend: `POST /auth/demo-session` (público, throttled 10/min) — busca
      `demo@jai1.com` y devuelve tokens JWT válidos como cualquier login normal
    - Backend: `POST /auth/demo/reset` (admin-only) — borra todos los datos del
      demo en una `$transaction`: tickets, documentos, historial, taxCases, perfil,
      W2s, notificaciones, refresh tokens
    - Frontend: botón "Modo Demo" en `admin-login.html` con estado de carga,
      estilos secundarios (outline), separador visual
    - Frontend: botón "🔄 Reset Demo" en sidebar de admin dashboard bajo "Herramientas"
    - Demo user excluida permanentemente de todos los listados del admin panel
      via filtro `user.email NOT 'demo@jai1.com'` en `client-query.service.ts`
    - Setup one-time: INSERT SQL del usuario demo en producción (hecho ✅)
    - Pendiente: poblar `ClientProfile` con datos demo realistas para una demo visual

### ✅ Sesión 12-Mar-2026 (tarde) — Dashboard Fixes & Track Filters (v1.6):

51. ✅ **Build Error Fix** - COMPLETADO
    - `router` era `private` en `AdminDashboard` pero el template lo accedía directamente
    - Fix: cambiar a `router = inject(Router)` (sin private)
    - El build de producción fallaba silenciosamente — Railway desplegaba versión vieja

52. ✅ **Demo Page — Bug Fixes (v1.6)** - COMPLETADO
    - 401 en `GET /auth/demo/status`: auth interceptor skippeaba token para todas las URLs
      con `/auth/` — fix: agregar `/auth/demo/` como excepción
    - 500 en `GET /admin/stats/season`: SQL crudo comparaba columnas enum de Postgres
      con text sin casting — fix: agregar `::text` en todas las columnas enum del raw SQL

53. ✅ **Dashboard Track Filter — Federal / Estatal / Ambos (v1.6)** - COMPLETADO
    - 3 botones toggle sobre las tarjetas de estadísticas: Ambos / 🇺🇸 Federal / 🏛️ Estatal
    - Al seleccionar un track, los group filters (En Proceso, Completados, etc.) filtran
      solo por `federalStatusNew` o `stateStatusNew` según corresponda
    - Las tarjetas de conteo también reflejan el track seleccionado (cálculo client-side)
    - Backend: nuevo parámetro `track` en `GET /admin/clients` y `findAll()` options
    - Corregido `group_in_review` para incluir los 6 estados activos (antes solo 3)
    - En modo "Ambos": counts vienen del backend (más precisos)
    - En modo Federal/Estatal: counts recalculados client-side

54. ✅ **Total Clientes — Corrección (v1.6)** - COMPLETADO
    - `getSeasonStats().totalClients` ahora cuenta TODOS los `clientProfile` (no solo taxes_filed)
    - Dashboard y Estadísticas muestran el mismo número total de clientes

### ⏳ Pendiente (Próximas prioridades):

1. **Admin Panel Polish** (Prioridad Media)
   - ✅ Visual review system implemented
   - ✅ Status system improvements implemented
   - ✅ Commission tracking implemented
   - ✅ Dashboard de métricas admin (Statistics page con charts CSS)
   - ☐ Bulk actions para operaciones masivas
   - ☐ Export reports (CSV/PDF)

2. **Testing** (Prioridad Alta)
   - Tests unitarios backend (services)
   - Tests de integración (API endpoints)
   - Tests E2E frontend (flujos críticos)

3. **Performance & Polish** (Prioridad Baja)
   - Reducir CSS bundle size (actualmente 90kb, budget 80kb)
   - Lazy loading de componentes no críticos
   - Image optimization

### ❌ Funcionalidades EXCLUIDAS del MVP (Fase 2+):

- **WebSocket / Real-time messaging** (ver sección 16 para justificación técnica)
- **Notificaciones WhatsApp** (integración con Make)
- App mobile nativa
- Reportes avanzados y métricas (dashboard básico implementado)
- 2FA (Two-Factor Authentication)
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
│   │   │   ├── api/                 # ✅ NUEVO v0.8 - Generated API types from OpenAPI
│   │   │   │   ├── models/          # Auto-generated DTOs (39 models)
│   │   │   │   ├── fn/              # Auto-generated API functions
│   │   │   │   └── services/        # Auto-generated API services (14 services)
│   │   │   ├── guards/
│   │   │   ├── interceptors/
│   │   │   ├── models/              # ✅ Frontend-only interfaces
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
│   │   ├── constants/               # ✅ NUEVO v0.8 - Pagination limits, config
│   │   ├── decorators/              # ✅ @CurrentUser, @Roles
│   │   ├── dto/                     # ✅ NUEVO v0.8 - Shared DTOs (PaginatedResponse)
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
│   └── schema.prisma                # ✅ Schema completo (actualizado v0.7 - V2 only)
├── scripts/
│   └── create-admin.ts              # ✅ Script para crear admin
├── package.json
└── tsconfig.json
```

---

# 3. MODELOS DE DATOS

## 3.1 Prisma Schema (Actualizado v1.0)

**Nota v1.0 - Production Launch:**
- Status enums renamed to Spanish for client-facing consistency
- JAI1GENT referral program: new role, profiles, invite codes, per-referral tracking
- Commission proof system: dual-track proof submission and admin review
- Consent form tracking on TaxCase
- KnowledgeChunk model for RAG chatbot with pgvector
- Email verification fields on User
- Internal comments on StatusHistory and TaxCase
- 21 real clients imported, all test data wiped

**Nota v0.7:**
- V1 status enums REMOVED: `TaxStatus`, `PreFilingStatus`
- V1 columns REMOVED: `pre_filing_status`, `federal_status`, `state_status`
- V2 is now SOURCE OF TRUTH: `caseStatus`, `federalStatusNew`, `stateStatusNew`

**Nota v0.6:**
- Todos los campos ID y FK usan tipo nativo PostgreSQL UUID con `@db.Uuid`
- Timestamps usan `@db.Timestamptz` para soporte de timezone
- Sistema de alarmas con AlarmThreshold y AlarmHistory
- Audit logs para tracking de seguridad
- Refresh tokens con rotación segura

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
  jai1gent    // NEW v1.0 - JAI1GENT referral agents
}

// NOTE v0.7: V1 enums (TaxStatus, PreFilingStatus) have been REMOVED from database
// All status tracking now uses V2 system exclusively

// Unified case status (pre-filing workflow) - UPDATED v1.0
enum CaseStatus {
  awaiting_form        // Waiting for tax form completion
  awaiting_docs        // Waiting for document uploads
  documentos_enviados  // NEW v1.0 - All docs submitted, ready for review
  preparing            // Documents ready, preparing filing
  taxes_filed          // Taxes submitted to IRS
  case_issues          // Case has problems requiring attention
}

// Federal status tracking (post-filing) - RENAMED v1.0 to Spanish
enum FederalStatusNew {
  taxes_en_proceso          // Initial processing by IRS
  en_verificacion           // Under IRS verification
  verificacion_en_progreso  // Active verification process
  problemas                 // Problems with federal return
  verificacion_rechazada    // Verification rejected
  deposito_directo          // Direct deposit sent
  cheque_en_camino          // Check mailed to client
  comision_pendiente        // Refund received, awaiting commission payment
  taxes_completados         // Process fully completed
}

// State status tracking (post-filing) - RENAMED v1.0 to Spanish
enum StateStatusNew {
  taxes_en_proceso          // Initial processing by state
  en_verificacion           // Under state verification
  verificacion_en_progreso  // Active verification process
  problemas                 // Problems with state return
  verificacion_rechazada    // Verification rejected
  deposito_directo          // Direct deposit sent
  cheque_en_camino          // Check mailed to client
  comision_pendiente        // Refund received, awaiting commission payment
  taxes_completados         // Process fully completed
}

enum DocumentType {
  w2
  payment_proof
  consent_form                // NEW v1.0
  commission_proof_federal    // NEW v1.0
  commission_proof_state      // NEW v1.0
  other
}

// NEW v1.0: Consent form signing status
enum ConsentFormStatus {
  pending
  signed
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
  problem_alert
}

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

// Payment method for refund delivery
enum PaymentMethod {
  bank_deposit    // Direct deposit to bank account
  check           // Paper check mailed
}

enum ProblemType {
  missing_documents
  incorrect_information
  bank_issue
  state_issue
  federal_issue
  client_unresponsive
  other
  // NOTE v0.9: irs_verification REMOVED - verification handled via status, not problem flags
}

// NEW v0.6: Alarm System Enums
enum AlarmType {
  possible_verification_federal
  possible_verification_state
  verification_timeout
  letter_sent_timeout
}

enum AlarmLevel {
  warning
  critical
}

enum AlarmResolution {
  active
  acknowledged
  resolved
  auto_resolved
  dismissed       // NEW v1.0
}

// Audit Log Actions (UPDATED v1.0)
enum AuditAction {
  PASSWORD_CHANGE
  PASSWORD_RESET
  CREDENTIALS_ACCESS    // NEW v1.0 - Track admin credential reveals
  DOCUMENT_DELETE
  REFUND_UPDATE
  DISCOUNT_APPLIED
  LOGIN_FAILED
  PROFILE_UPDATE        // NEW v1.0
  SSN_CHANGE            // NEW v1.0
  BANK_INFO_CHANGE      // NEW v1.0
}

// ============= MODELS =============

model User {
  id                    String    @id @default(uuid()) @db.Uuid
  email                 String    @unique
  passwordHash          String    @map("password_hash")
  role                  UserRole  @default(client)
  firstName             String    @map("first_name")
  lastName              String    @map("last_name")
  phone                 String?
  profilePicturePath    String?   @map("profile_picture_path")  // NEW v0.6
  googleId              String?   @unique @map("google_id")
  isActive              Boolean   @default(true) @map("is_active")
  lastLoginAt           DateTime? @map("last_login_at") @db.Timestamptz
  createdAt             DateTime  @default(now()) @map("created_at") @db.Timestamptz
  updatedAt             DateTime  @updatedAt @map("updated_at") @db.Timestamptz
  resetToken            String?   @map("reset_token")
  resetTokenExpiresAt   DateTime? @map("reset_token_expires_at") @db.Timestamptz
  tokenVersion          Int       @default(1) @map("token_version")
  // Email verification - NEW v1.0
  emailVerified              Boolean   @default(false) @map("email_verified")
  verificationToken          String?   @map("verification_token")
  verificationTokenExpiresAt DateTime? @map("verification_token_expires_at") @db.Timestamptz
  preferredLanguage     String    @default("es") @map("preferred_language") @db.VarChar(5)

  // Referral program fields
  referralCode          String?   @unique @map("referral_code")
  referredByCode        String?   @map("referred_by_code")
  referralCodeCreatedAt DateTime? @map("referral_code_created_at") @db.Timestamptz
  referralOnboardingCompleted Boolean @default(false) @map("referral_onboarding_completed") // NEW v1.0

  // Relations
  clientProfile         ClientProfile?
  notifications         Notification[]
  statusChanges         StatusHistory[] @relation("ChangedBy")
  ticketMessages        TicketMessage[]
  tickets               Ticket[]
  w2Estimates           W2Estimate[]
  documentsUploaded     Document[]      @relation("DocumentUploader")
  referralsMade         Referral[]      @relation("ReferrerUser")
  referralReceived      Referral?       @relation("ReferredUser")
  discountsReceived     DiscountApplication[] @relation("DiscountUser")
  discountsApplied      DiscountApplication[] @relation("DiscountAppliedBy")
  alarmsResolved        AlarmHistory[]        @relation("AlarmResolver")  // NEW v0.6
  alarmThresholdsCreated AlarmThreshold[]     @relation("AlarmThresholdCreator")  // NEW v0.6
  refreshTokens         RefreshToken[]  // NEW v0.6
  systemSettingsUpdated SystemSetting[]       @relation("SystemSettingUpdater")  // NEW v0.6
  auditLogsAsActor      AuditLog[]            @relation("AuditLogActor")  // NEW v0.6
  auditLogsAsTarget     AuditLog[]            @relation("AuditLogTarget")  // NEW v0.6

  @@index([role])
  @@index([isActive])
  @@map("users")
}

// NEW v0.6: Refresh token storage for secure token rotation
model RefreshToken {
  id          String    @id @default(uuid()) @db.Uuid
  userId      String    @map("user_id") @db.Uuid
  tokenHash   String    @unique @map("token_hash")  // SHA-256 hash
  deviceInfo  String?   @map("device_info")
  ipAddress   String?   @map("ip_address")
  expiresAt   DateTime  @map("expires_at") @db.Timestamptz
  createdAt   DateTime  @default(now()) @map("created_at") @db.Timestamptz
  isRevoked   Boolean   @default(false) @map("is_revoked")
  revokedAt   DateTime? @map("revoked_at") @db.Timestamptz
  replacedByTokenId String? @map("replaced_by_token_id") @db.Uuid

  user            User          @relation(fields: [userId], references: [id], onDelete: Cascade)
  replacedByToken RefreshToken? @relation("TokenReplacement", fields: [replacedByTokenId], references: [id])
  replacedTokens  RefreshToken[] @relation("TokenReplacement")

  @@index([userId])
  @@index([expiresAt])
  @@index([isRevoked])
  @@index([userId, isRevoked])
  @@map("refresh_tokens")
}

model ClientProfile {
  id                String    @id @default(uuid()) @db.Uuid
  userId            String    @unique @map("user_id") @db.Uuid

  // Sensitive data (encrypted at application level)
  ssn               String?
  dateOfBirth       DateTime? @map("date_of_birth") @db.Date

  // Address
  addressStreet     String?   @map("address_street")
  addressCity       String?   @map("address_city")
  addressState      String?   @map("address_state")
  addressZip        String?   @map("address_zip")
  addressCountry    String?   @map("address_country") @default("USA")  // NEW v0.6

  // TurboTax credentials (encrypted)
  turbotaxEmail     String?   @map("turbotax_email")
  turbotaxPassword  String?   @map("turbotax_password")

  // IRS account credentials (encrypted) - NEW v0.6
  irsUsername       String?   @map("irs_username")
  irsPassword       String?   @map("irs_password")

  // State account credentials (encrypted) - NEW v0.6
  stateUsername     String?   @map("state_username")
  statePassword     String?   @map("state_password")

  // Profile status
  profileComplete   Boolean   @default(false) @map("profile_complete")
  isDraft           Boolean   @default(true) @map("is_draft")
  // Computed status fields for efficient querying (NEW v1.0)
  isReadyToPresent  Boolean   @default(false) @map("is_ready_to_present")
  isIncomplete      Boolean   @default(true) @map("is_incomplete")

  createdAt         DateTime  @default(now()) @map("created_at") @db.Timestamptz
  updatedAt         DateTime  @updatedAt @map("updated_at") @db.Timestamptz

  // Relations
  user              User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  taxCases          TaxCase[]

  @@index([profileComplete])
  @@index([isDraft])
  @@index([createdAt])
  @@index([isReadyToPresent])    // NEW v1.0
  @@index([isIncomplete])        // NEW v1.0
  @@map("client_profiles")
}

model TaxCase {
  id                 String          @id @default(uuid()) @db.Uuid
  clientProfileId    String          @map("client_profile_id") @db.Uuid
  taxYear            Int             @map("tax_year")  // CHECK: 2020-2100

  // Legacy flags - kept for referral code generation only
  taxesFiled         Boolean         @default(false) @map("taxes_filed")
  taxesFiledAt       DateTime?       @map("taxes_filed_at") @db.Timestamptz

  // NOTE v0.7: V1 columns REMOVED from database:
  // - pre_filing_status (PreFilingStatus enum)
  // - federal_status (TaxStatus enum)
  // - state_status (TaxStatus enum)
  // Backup available in: _backup_v1_status_20250124

  // Refund tracking
  estimatedRefund    Decimal?        @map("estimated_refund") @db.Decimal(10, 2)

  // Separate federal/state tracking (SOURCE OF TRUTH)
  federalEstimatedDate  DateTime?    @map("federal_estimated_date") @db.Timestamptz
  stateEstimatedDate    DateTime?    @map("state_estimated_date") @db.Timestamptz
  federalActualRefund   Decimal?     @map("federal_actual_refund") @db.Decimal(10, 2)
  stateActualRefund     Decimal?     @map("state_actual_refund") @db.Decimal(10, 2)
  federalDepositDate    DateTime?    @map("federal_deposit_date") @db.Timestamptz
  stateDepositDate      DateTime?    @map("state_deposit_date") @db.Timestamptz

  // Federal status tracking (comments and dates)
  federalLastComment      String?    @map("federal_last_comment")
  federalStatusChangedAt  DateTime?  @map("federal_status_changed_at") @db.Timestamptz
  federalLastReviewedAt   DateTime?  @map("federal_last_reviewed_at") @db.Timestamptz

  // State status tracking (comments and dates)
  stateLastComment        String?    @map("state_last_comment")
  stateStatusChangedAt    DateTime?  @map("state_status_changed_at") @db.Timestamptz
  stateLastReviewedAt     DateTime?  @map("state_last_reviewed_at") @db.Timestamptz

  // Internal comments (admin-only, never shown to clients) - NEW v1.0
  federalInternalComment  String?    @map("federal_internal_comment")
  stateInternalComment    String?    @map("state_internal_comment")

  // ============= STATUS SYSTEM v2 (SOURCE OF TRUTH) =============
  // Unified case status (pre-filing workflow)
  caseStatus            CaseStatus?       @map("case_status")
  caseStatusChangedAt   DateTime?         @map("case_status_changed_at") @db.Timestamptz

  // Federal status (post-filing tracking)
  federalStatusNew          FederalStatusNew?  @map("federal_status_new")
  federalStatusNewChangedAt DateTime?          @map("federal_status_new_changed_at") @db.Timestamptz

  // State status (post-filing tracking)
  stateStatusNew            StateStatusNew?    @map("state_status_new")
  stateStatusNewChangedAt   DateTime?          @map("state_status_new_changed_at") @db.Timestamptz

  // Payment tracking
  paymentReceived    Boolean         @default(false) @map("payment_received")
  commissionPaid     Boolean         @default(false) @map("commission_paid")
  // Refund receipt confirmation (client confirms they received money) - NEW v1.0
  federalRefundReceived     Boolean    @default(false) @map("federal_refund_received")
  stateRefundReceived       Boolean    @default(false) @map("state_refund_received")
  federalRefundReceivedAt   DateTime?  @map("federal_refund_received_at") @db.Timestamptz
  stateRefundReceivedAt     DateTime?  @map("state_refund_received_at") @db.Timestamptz
  // Separate commission paid tracking per track - NEW v1.0
  federalCommissionPaid     Boolean    @default(false) @map("federal_commission_paid")
  stateCommissionPaid       Boolean    @default(false) @map("state_commission_paid")
  federalCommissionPaidAt   DateTime?  @map("federal_commission_paid_at") @db.Timestamptz
  stateCommissionPaidAt     DateTime?  @map("state_commission_paid_at") @db.Timestamptz
  // Commission proof submission tracking - NEW v1.0
  federalCommissionProofSubmitted    Boolean?  @default(false)
  federalCommissionProofSubmittedAt  DateTime?
  stateCommissionProofSubmitted      Boolean?  @default(false)
  stateCommissionProofSubmittedAt    DateTime?
  // Commission proof review tracking (admin) - NEW v1.0
  federalCommissionProofReviewedBy   String?   @db.Uuid
  federalCommissionProofReviewedAt   DateTime?
  federalCommissionProofReviewNote   String?
  stateCommissionProofReviewedBy     String?   @db.Uuid
  stateCommissionProofReviewedAt     DateTime?
  stateCommissionProofReviewNote     String?
  // Per-track commission rates (11% normal, 22% verification) - NEW v1.0
  federalCommissionRate     Decimal    @default(0.11) @db.Decimal(3, 2)
  stateCommissionRate       Decimal    @default(0.11) @db.Decimal(3, 2)

  // Year-specific employment and banking info (SOURCE OF TRUTH)
  workState          String?         @map("work_state")
  employerName       String?         @map("employer_name")
  bankName           String?         @map("bank_name")
  bankRoutingNumber  String?         @map("bank_routing_number")
  bankAccountNumber  String?         @map("bank_account_number")
  paymentMethod      PaymentMethod   @default(bank_deposit) @map("payment_method")

  statusUpdatedAt    DateTime        @default(now()) @map("status_updated_at") @db.Timestamptz
  // Consent form tracking - NEW v1.0
  consentFormStatus       ConsentFormStatus  @default(pending) @map("consent_form_status")
  consentFormSignedAt     DateTime?          @map("consent_form_signed_at") @db.Timestamptz
  consentFormStoragePath  String?            @map("consent_form_storage_path")

  // Admin step control: 1=Registration, 2=W2 Uploaded, 3=Tax Form Complete, 4=IRS Review, 5=Finalized
  adminStep          Int?            @map("admin_step")

  // Problem tracking (hidden from client)
  hasProblem         Boolean         @default(false) @map("has_problem")
  problemStep        Int?            @map("problem_step")
  problemType        ProblemType?    @map("problem_type")
  problemDescription String?         @map("problem_description")
  problemResolvedAt  DateTime?       @map("problem_resolved_at") @db.Timestamptz

  createdAt          DateTime        @default(now()) @map("created_at") @db.Timestamptz
  updatedAt          DateTime        @updatedAt @map("updated_at") @db.Timestamptz

  // Relations
  documents          Document[]
  statusHistory      StatusHistory[]
  discounts          DiscountApplication[]
  w2Estimates        W2Estimate[]
  referrals          Referral[]
  alarmThreshold     AlarmThreshold?  // NEW v0.6
  alarmHistory       AlarmHistory[]   // NEW v0.6
  clientProfile      ClientProfile   @relation(fields: [clientProfileId], references: [id], onDelete: Cascade)

  @@unique([clientProfileId, taxYear])
  @@index([clientProfileId])
  @@index([taxYear])
  @@index([hasProblem])
  @@index([createdAt])
  @@index([taxesFiled])
  @@index([taxesFiled, createdAt])
  // Composite indexes for status queries - NEW v1.0
  @@index([caseStatus, federalStatusNew, stateStatusNew])
  @@index([hasProblem, federalStatusNew, stateStatusNew])
  @@index([consentFormStatus])
  // Indexes for alarm queries (status system v2)
  @@index([caseStatus])
  @@index([federalStatusNew])
  @@index([stateStatusNew])
  @@index([federalStatusNew, federalStatusNewChangedAt])
  @@index([stateStatusNew, stateStatusNewChangedAt])
  @@map("tax_cases")
}

model Document {
  id           String       @id @default(uuid()) @db.Uuid
  taxCaseId    String       @map("tax_case_id") @db.Uuid
  type         DocumentType
  fileName     String       @map("file_name")
  storagePath  String       @unique @map("storage_path")
  mimeType     String       @map("mime_type")
  fileSize     Int          @map("file_size")
  taxYear      Int?         @map("tax_year")
  isReviewed   Boolean      @default(false) @map("is_reviewed")
  reviewedAt   DateTime?    @map("reviewed_at") @db.Timestamptz  // NEW v0.6
  uploadedAt   DateTime     @default(now()) @map("uploaded_at") @db.Timestamptz
  uploadedById String?      @map("uploaded_by_id") @db.Uuid  // NEW v0.6

  // Relations
  taxCase      TaxCase      @relation(fields: [taxCaseId], references: [id], onDelete: Cascade)
  uploadedBy   User?        @relation("DocumentUploader", fields: [uploadedById], references: [id], onDelete: SetNull)

  @@index([taxCaseId])
  @@index([type])
  @@index([uploadedAt])
  @@index([isReviewed])
  @@index([uploadedById])
  @@map("documents")
}

model Ticket {
  id          String       @id @default(uuid()) @db.Uuid
  userId      String       @map("user_id") @db.Uuid
  subject     String
  status      TicketStatus @default(open)
  unreadCount Int          @default(0) @map("unread_count")  // NEW v0.6
  deletedAt   DateTime?    @map("deleted_at") @db.Timestamptz  // NEW v0.6
  createdAt   DateTime     @default(now()) @map("created_at") @db.Timestamptz
  updatedAt   DateTime     @updatedAt @map("updated_at") @db.Timestamptz

  // Relations
  messages    TicketMessage[]
  user        User            @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([status])
  @@index([userId, status])
  @@index([deletedAt])
  @@map("tickets")
}

model TicketMessage {
  id        String    @id @default(uuid()) @db.Uuid
  ticketId  String    @map("ticket_id") @db.Uuid
  senderId  String?   @map("sender_id") @db.Uuid
  message   String
  isRead    Boolean   @default(false) @map("is_read")  // NEW v0.6
  deletedAt DateTime? @map("deleted_at") @db.Timestamptz  // NEW v0.6
  createdAt DateTime  @default(now()) @map("created_at") @db.Timestamptz

  // Relations
  sender    User?     @relation(fields: [senderId], references: [id], onDelete: SetNull)
  ticket    Ticket    @relation(fields: [ticketId], references: [id], onDelete: Cascade)

  @@index([ticketId])
  @@index([senderId])
  @@index([isRead])
  @@index([deletedAt])
  @@map("ticket_messages")
}

model StatusHistory {
  id             String   @id @default(uuid()) @db.Uuid
  taxCaseId      String   @map("tax_case_id") @db.Uuid
  previousStatus String?  @map("previous_status")
  newStatus      String   @map("new_status")
  changedById    String?  @map("changed_by_id") @db.Uuid
  comment        String?
  internalComment String?  @map("internal_comment")  // NEW v1.0 - admin-only
  createdAt      DateTime @default(now()) @map("created_at") @db.Timestamptz

  // Relations
  changedBy      User?    @relation("ChangedBy", fields: [changedById], references: [id], onDelete: SetNull)
  taxCase        TaxCase  @relation(fields: [taxCaseId], references: [id], onDelete: Cascade)

  @@index([taxCaseId])
  @@index([changedById])
  @@index([createdAt])
  @@map("status_history")
}

model Notification {
  id         String           @id @default(uuid()) @db.Uuid
  userId     String           @map("user_id") @db.Uuid
  type       NotificationType
  title      String
  message    String
  isRead     Boolean          @default(false) @map("is_read")
  isArchived Boolean          @default(false) @map("is_archived")  // NEW v0.6
  deletedAt  DateTime?        @map("deleted_at") @db.Timestamptz  // NEW v0.6
  createdAt  DateTime         @default(now()) @map("created_at") @db.Timestamptz

  // Relations
  user       User             @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([isRead])
  @@index([isArchived])
  @@index([deletedAt])
  @@index([userId, isRead])
  @@index([userId, isArchived])
  @@index([createdAt])
  @@index([userId, createdAt])
  @@map("notifications")
}

// ============= REFERRAL SYSTEM MODELS =============

model Referral {
  id               String         @id @default(uuid()) @db.Uuid
  referrerId       String         @map("referrer_id") @db.Uuid
  referredUserId   String         @unique @map("referred_user_id") @db.Uuid
  referralCode     String         @map("referral_code")
  status           ReferralStatus @default(pending)
  taxCaseId        String?        @map("tax_case_id") @db.Uuid
  completedAt      DateTime?      @map("completed_at") @db.Timestamptz
  referredDiscount Decimal?       @map("referred_discount") @db.Decimal(10, 2)
  createdAt        DateTime       @default(now()) @map("created_at") @db.Timestamptz
  updatedAt        DateTime       @updatedAt @map("updated_at") @db.Timestamptz

  referrer     User     @relation("ReferrerUser", fields: [referrerId], references: [id], onDelete: Cascade)
  referredUser User     @relation("ReferredUser", fields: [referredUserId], references: [id], onDelete: Cascade)
  taxCase      TaxCase? @relation(fields: [taxCaseId], references: [id], onDelete: SetNull)
  discounts    DiscountApplication[]

  @@index([referrerId])
  @@index([status])
  @@index([referrerId, status])
  @@index([referralCode])
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
  createdAt        DateTime       @default(now()) @map("created_at") @db.Timestamptz
  updatedAt        DateTime       @updatedAt @map("updated_at") @db.Timestamptz

  // Relations
  user          User      @relation("DiscountUser", fields: [userId], references: [id], onDelete: Cascade)
  taxCase       TaxCase?  @relation(fields: [taxCaseId], references: [id], onDelete: SetNull)
  referral      Referral? @relation(fields: [referralId], references: [id], onDelete: SetNull)
  appliedByAdmin User?    @relation("DiscountAppliedBy", fields: [appliedByAdminId], references: [id], onDelete: SetNull)

  @@unique([referralId, discountType])  // NEW v0.6: Prevent duplicate discounts per referral
  @@index([userId])
  @@index([status])
  @@index([taxCaseId])
  @@index([referralId])
  @@index([seasonYear])
  @@map("discount_applications")
}

model W2Estimate {
  id              String         @id @default(uuid()) @db.Uuid
  userId          String         @map("user_id") @db.Uuid
  taxCaseId       String?        @map("tax_case_id") @db.Uuid  // NEW v0.6
  box2Federal     Decimal        @map("box_2_federal") @db.Decimal(10, 2)
  box17State      Decimal        @map("box_17_state") @db.Decimal(10, 2)
  estimatedRefund Decimal        @map("estimated_refund") @db.Decimal(10, 2)
  w2FileName      String         @map("w2_file_name")
  w2StoragePath   String?        @unique @map("w2_storage_path")  // NEW v0.6
  ocrConfidence   OcrConfidence  @map("ocr_confidence")
  ocrRawResponse  Json?          @map("ocr_raw_response")  // NEW v0.6
  createdAt       DateTime       @default(now()) @map("created_at") @db.Timestamptz

  user            User           @relation(fields: [userId], references: [id], onDelete: Cascade)
  taxCase         TaxCase?       @relation(fields: [taxCaseId], references: [id], onDelete: SetNull)

  @@index([userId])
  @@index([taxCaseId])
  @@map("w2_estimates")
}

// ============= ALARM SYSTEM (NEW v0.6) =============

model AlarmThreshold {
  id                    String   @id @default(uuid()) @db.Uuid
  taxCaseId             String   @map("tax_case_id") @db.Uuid
  // Custom thresholds (null = use global default)
  federalInProcessDays      Int?  @map("federal_in_process_days")      // Default: 25
  stateInProcessDays        Int?  @map("state_in_process_days")        // Default: 50
  verificationTimeoutDays   Int?  @map("verification_timeout_days")    // Default: 63
  letterSentTimeoutDays     Int?  @map("letter_sent_timeout_days")     // Default: 63
  // Disable specific alarms
  disableFederalAlarms  Boolean  @default(false) @map("disable_federal_alarms")
  disableStateAlarms    Boolean  @default(false) @map("disable_state_alarms")
  // Metadata
  reason                String?
  createdById           String?  @map("created_by_id") @db.Uuid
  createdAt             DateTime @default(now()) @map("created_at") @db.Timestamptz
  updatedAt             DateTime @updatedAt @map("updated_at") @db.Timestamptz

  taxCase               TaxCase  @relation(fields: [taxCaseId], references: [id], onDelete: Cascade)
  createdBy             User?    @relation("AlarmThresholdCreator", fields: [createdById], references: [id], onDelete: SetNull)

  @@unique([taxCaseId])
  @@index([createdById])
  @@map("alarm_thresholds")
}

model AlarmHistory {
  id                String          @id @default(uuid()) @db.Uuid
  taxCaseId         String          @map("tax_case_id") @db.Uuid
  alarmType         AlarmType       @map("alarm_type")
  alarmLevel        AlarmLevel      @map("alarm_level")
  track             String          // 'federal' or 'state'
  message           String
  thresholdDays     Int             @map("threshold_days")
  actualDays        Int             @map("actual_days")
  statusAtTrigger   String          @map("status_at_trigger")
  statusChangedAt   DateTime        @map("status_changed_at") @db.Timestamptz
  // Resolution tracking
  resolution        AlarmResolution @default(active)
  resolvedAt        DateTime?       @map("resolved_at") @db.Timestamptz
  resolvedById      String?         @map("resolved_by_id") @db.Uuid
  resolvedNote      String?         @map("resolved_note")
  autoResolveReason String?         @map("auto_resolve_reason")
  // Timestamps
  triggeredAt       DateTime        @default(now()) @map("triggered_at") @db.Timestamptz
  updatedAt         DateTime        @updatedAt @map("updated_at") @db.Timestamptz

  taxCase           TaxCase         @relation(fields: [taxCaseId], references: [id], onDelete: Cascade)
  resolvedBy        User?           @relation("AlarmResolver", fields: [resolvedById], references: [id], onDelete: SetNull)

  @@index([taxCaseId])
  @@index([alarmType])
  @@index([alarmLevel])
  @@index([resolution])
  @@index([triggeredAt])
  @@index([taxCaseId, resolution])
  @@map("alarm_history")
}

// ============= AUDIT LOGS (NEW v0.6) =============

model AuditLog {
  id           String      @id @default(uuid()) @db.Uuid
  userId       String?     @map("user_id") @db.Uuid
  targetUserId String?     @map("target_user_id") @db.Uuid
  action       AuditAction
  details      Json?
  ipAddress    String?     @map("ip_address")
  userAgent    String?     @map("user_agent")
  createdAt    DateTime    @default(now()) @map("created_at") @db.Timestamptz

  user         User?       @relation("AuditLogActor", fields: [userId], references: [id], onDelete: SetNull)
  targetUser   User?       @relation("AuditLogTarget", fields: [targetUserId], references: [id], onDelete: SetNull)

  @@index([userId])
  @@index([targetUserId])
  @@index([action])
  @@index([createdAt])
  @@index([action, createdAt])
  @@map("audit_logs")
}

// ============= SYSTEM SETTINGS (NEW v0.6) =============

model SystemSetting {
  key         String    @id
  value       String
  description String?
  updatedAt   DateTime  @updatedAt @map("updated_at") @db.Timestamptz
  updatedBy   String?   @map("updated_by") @db.Uuid

  updatedByUser User?   @relation("SystemSettingUpdater", fields: [updatedBy], references: [id], onDelete: SetNull)

  @@index([updatedBy])
  @@map("system_settings")
}

// ============= JAI1GENT REFERRAL PROGRAM (NEW v1.0) =============

enum Jai1gentPaymentMethod {
  bank_transfer
  zelle
}

enum Jai1gentReferralStatus {
  pending           // Client registered but not filed
  taxes_filed       // Client has filed taxes
  completed         // Commission earned
  expired           // No activity after timeout
}

// Admin-generated invite codes for JAI1GENT registration
model Jai1gentInviteCode {
  id          String    @id @default(uuid()) @db.Uuid
  code        String    @unique @db.VarChar(8)
  createdById String    @map("created_by_id") @db.Uuid
  usedById    String?   @unique @map("used_by_id") @db.Uuid
  usedAt      DateTime? @map("used_at") @db.Timestamptz
  createdAt   DateTime  @default(now()) @map("created_at") @db.Timestamptz
  @@map("jai1gent_invite_codes")
}

// JAI1GENT profile with referral and payment info
model Jai1gentProfile {
  id                  String    @id @default(uuid()) @db.Uuid
  userId              String    @unique @map("user_id") @db.Uuid
  referralCode        String    @unique @map("referral_code") @db.VarChar(10)  // JAI + 3 name + 4 random
  paymentMethod       Jai1gentPaymentMethod?
  bankName            String?
  bankRoutingNumber   String?
  bankAccountNumber   String?
  zelleEmail          String?
  zellePhone          String?
  // Denormalized stats
  totalReferrals      Int       @default(0)
  completedReferrals  Int       @default(0)
  totalEarnings       Decimal   @default(0) @db.Decimal(10, 2)
  paidEarnings        Decimal   @default(0) @db.Decimal(10, 2)
  createdAt           DateTime  @default(now()) @map("created_at") @db.Timestamptz
  updatedAt           DateTime  @updatedAt @map("updated_at") @db.Timestamptz
  @@map("jai1gent_profiles")
}

// Per-referral tracking for JAI1GENTs
model Jai1gentReferral {
  id                  String    @id @default(uuid()) @db.Uuid
  jai1gentProfileId   String    @map("jai1gent_profile_id") @db.Uuid
  referredUserId      String    @unique @map("referred_user_id") @db.Uuid
  referralCode        String    @map("referral_code")
  status              Jai1gentReferralStatus @default(pending)
  jai1Fee             Decimal?  @db.Decimal(10, 2)
  commissionPercent   Decimal?  @db.Decimal(5, 2)
  commissionAmount    Decimal?  @db.Decimal(10, 2)
  completedAt         DateTime? @map("completed_at") @db.Timestamptz
  createdAt           DateTime  @default(now()) @map("created_at") @db.Timestamptz
  updatedAt           DateTime  @updatedAt @map("updated_at") @db.Timestamptz
  @@map("jai1gent_referrals")
}

// ============= KNOWLEDGE BASE / RAG (NEW v1.0) =============

// Knowledge chunks for chatbot RAG (pgvector for embeddings)
model KnowledgeChunk {
  id        String   @id @default(uuid()) @db.Uuid
  section   String   @db.VarChar(200)
  content   String
  // embedding vector(1536) - handled via raw SQL (pgvector)
  metadata  Json     @default("{}")
  createdAt DateTime @default(now()) @map("created_at") @db.Timestamptz
  updatedAt DateTime @updatedAt @map("updated_at") @db.Timestamptz
  @@index([section])
  @@map("knowledge_chunks")
}
```

## 3.2 Estados del Trámite

### Status System v2 (v0.6) - NUEVO

El sistema de estados v2 reemplaza el sistema anterior con una estructura más clara basada en fases.

#### CaseStatus (Estado Unificado del Caso)

| Estado           | Descripción                                        |
| ---------------- | -------------------------------------------------- |
| `awaiting_form`  | Esperando que el cliente complete el formulario    |
| `awaiting_docs`  | Esperando documentos (W2, etc.)                    |
| `preparing`      | Preparando declaración de impuestos                |
| `taxes_filed`    | Impuestos presentados, en proceso IRS              |
| `case_issues`    | Problemas que requieren atención                   |

#### PreFilingStatus (Pre-Presentación)

Usado cuando `taxesFiled = false`:

| Estado                    | Descripción                                    |
| ------------------------- | ---------------------------------------------- |
| `awaiting_registration`   | Esperando registro completo                    |
| `awaiting_documents`      | Esperando documentos                           |
| `documentation_complete`  | Documentación completa, listo para procesar    |

#### FederalStatusNew / StateStatusNew (Post-Presentación)

Usado cuando `taxesFiled = true`:

| Estado                        | Descripción                                    |
| ----------------------------- | ---------------------------------------------- |
| `in_process`                  | En proceso inicial                             |
| `in_verification`             | IRS/Estado verificando                         |
| `verification_in_progress`    | Verificación en progreso activo                |
| `verification_letter_sent`    | Carta de verificación enviada                  |
| `check_in_transit`            | Cheque en camino                               |
| `issues`                      | Problemas detectados                           |
| `taxes_sent`                  | Impuestos enviados/procesados                  |
| `taxes_completed`             | Proceso fiscal completado                      |

### Admin Step Control

| Step | Descripción                              |
| ---- | ---------------------------------------- |
| 1    | Registro inicial                         |
| 2    | W2 subido / Documentos completos         |
| 3    | Formulario fiscal completado             |
| 4    | En proceso de revisión IRS               |
| 5    | Finalizado                               |

### Alarm Thresholds (v0.6)

| Alarma                         | Default (días) | Descripción                           |
| ------------------------------ | -------------- | ------------------------------------- |
| Federal in_process             | 25             | Federal lleva demasiado en proceso    |
| State in_process               | 50             | Estado lleva demasiado en proceso     |
| Verification timeout           | 63             | Verificación sin resolver             |
| Letter sent timeout            | 63             | Carta enviada sin respuesta           |

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

### GET /calculator/history

Lista todas las estimaciones del usuario.

### GET /calculator/has-estimate

Verifica si el usuario tiene alguna estimación.

---

## 5.11 Alarms (Admin) - NUEVO v0.6

### GET /admin/alarms/dashboard

Lista todos los casos con alarmas activas.

**Response:**

```json
{
  "casesWithAlarms": [
    {
      "taxCaseId": "uuid",
      "clientName": "Juan Pérez",
      "activeAlarms": [
        {
          "type": "possible_verification_federal",
          "level": "warning",
          "triggeredAt": "datetime",
          "daysOverdue": 5
        }
      ]
    }
  ]
}
```

### GET /admin/alarms/history

Lista historial de alarmas con filtros.

**Query params:** `resolution`, `alarmType`, `alarmLevel`, `startDate`, `endDate`, `limit`, `cursor`

### POST /admin/alarms/:id/acknowledge

Marca una alarma como "acknowledged" (reconocida).

### POST /admin/alarms/:id/resolve

Resuelve una alarma con nota opcional.

**Request:**

```json
{
  "note": "Verificación completada, cheque en camino"
}
```

### GET /admin/alarms/thresholds/:taxCaseId

Obtiene umbrales de alarma personalizados para un caso.

### PATCH /admin/alarms/thresholds/:taxCaseId

Configura umbrales personalizados para un caso.

**Request:**

```json
{
  "federalInProcessDays": 30,
  "stateInProcessDays": 60,
  "disableFederalAlarms": false,
  "reason": "Cliente notificó demora esperada"
}
```

### POST /admin/alarms/sync/:taxCaseId

Sincroniza/evalúa alarmas para un caso específico.

---

## 5.12 Audit Logs (Admin) - NUEVO v0.6

### GET /admin/audit-logs

Lista logs de auditoría con filtros.

**Query params:** `action`, `userId`, `startDate`, `endDate`, `limit`, `cursor`

**Response:**

```json
{
  "logs": [
    {
      "id": "uuid",
      "action": "PASSWORD_CHANGE",
      "userId": "uuid",
      "targetUserId": "uuid",
      "details": { "changedFields": ["password"] },
      "ipAddress": "192.168.1.1",
      "userAgent": "Mozilla/5.0...",
      "createdAt": "datetime"
    }
  ],
  "nextCursor": "string"
}
```

### GET /admin/audit-logs/actions

Lista tipos de acciones disponibles.

### GET /admin/audit-logs/stats

Estadísticas de auditoría por período.

### GET /admin/audit-logs/export

Exporta logs a CSV con filtros aplicados.

### GET /admin/audit-logs/user/:userId

Logs de auditoría para un usuario específico.

---

## 5.13 Health Check

### GET /health

Health check básico con status y uptime.

### GET /health/detailed

Health check detallado con memoria y versión de Node.

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

## 11.3 Estado de Implementación (Febrero 2026 - v1.0)

### Stack Tecnológico en Producción

| Capa              | Tecnología                    | Hosting  |
| ----------------- | ----------------------------- | -------- |
| **Backend**       | NestJS + Prisma ORM           | Railway  |
| **Base de datos** | PostgreSQL                    | Supabase |
| **Frontend**      | Angular 21                    | Vercel   |
| **Autenticación** | JWT + Google OAuth + Refresh Tokens | —  |
| **Storage**       | Supabase Buckets              | —        |
| **IA**            | OpenAI Vision API             | —        |
| **Monitoring**    | Sentry                        | —        |

### URLs de Producción

- **Frontend:** `https://portal-jai1-frontend.vercel.app`
- **Backend:** Railway (auto-deploy)

### Módulos Backend

`auth · users · clients · documents · tickets · notifications · webhooks · calculator · referrals · progress · alarms · audit-logs · health · storage-cleanup · consent-form · jai1gents · knowledge-base`

### Features en Producción (v1.0)

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
- ☑ **Client Portal Polish (v0.5):**
  - Profile page loading fix
  - Sidebar responsiveness (desktop logout visible)
  - Calculator mobile scroll fix
  - Soft-delete support for notifications
  - Financial validation constraints
  - Referral expiration job improvements
- ☑ **Status System v2 (v0.6):**
  - Unified CaseStatus (awaiting_form → taxes_filed → case_issues)
  - Enhanced FederalStatusNew (8 detailed statuses)
  - Enhanced StateStatusNew (8 detailed statuses)
  - PreFilingStatus for pre-filing workflow
  - Phase-based workflow (taxesFiled flag)
  - Status change timestamps per track
- ☑ **Alarm System (v0.6):**
  - AlarmThreshold per tax case (custom or global defaults)
  - AlarmHistory with resolution workflow
  - Alarm types: verification delays, letter timeouts
  - Alarm levels: warning, critical
  - Auto-resolve when status changes
  - Admin dashboard for active alarms
- ☑ **Audit Logs (v0.6):**
  - Track security events (password changes, failed logins)
  - Track financial events (refund updates, discounts)
  - Track document deletions
  - IP address and user agent logging
  - Admin CSV export
- ☑ **Refresh Token System (v0.6):**
  - Secure token rotation with hash storage
  - Device info and IP tracking
  - Token revocation and replacement chain
  - Logout from all devices support
- ☑ **i18n / Multi-language (v0.6):**
  - User language preference (preferredLanguage)
  - Spanish/English support
  - Automatic notification translation
- ☑ **System Settings (v0.6):**
  - Key-value configuration store
  - Admin-managed settings
  - Audit trail for setting changes

## Cronograma v1.0 (9 Febrero 2026) - COMPLETADO

- ☑ **Status System v2 Final:** Renamed all enums to Spanish (taxes_en_proceso, etc.)
- ☑ **Commission Proof System:** Dual-track proof submission + admin review
- ☑ **Consent Form System:** ConsentFormStatus enum, auto-transition logic
- ☑ **JAI1GENT Referral Program:** New role, profiles, invite codes, referral tracking
- ☑ **RAG Knowledge Base:** pgvector embeddings for chatbot
- ☑ **Email Verification:** emailVerified, verificationToken fields
- ☑ **Enhanced Audit Logging:** CREDENTIALS_ACCESS, PROFILE_UPDATE, SSN_CHANGE, BANK_INFO_CHANGE
- ☑ **Production Data Migration:**
  - Wiped all test data from Supabase
  - Imported 21 real clients from manual spreadsheet
  - All sensitive data encrypted (AES-256-GCM)
  - Admin account: jai@memas.agency

### Pendiente (Próximas Fases)

- ☐ **Admin Panel Polish** (Prioridad Media) — bulk actions, advanced filters, dashboard metrics
- ☐ **Tests automatizados** (Prioridad Alta)

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

## Cronograma v0.5 (13 Enero 2026 noche) - COMPLETADO

| Tarea                                        | Estado      |
| -------------------------------------------- | ----------- |
| Profile: Remove change password section      | ✅ Completo |
| Profile: Fix loading race condition          | ✅ Completo |
| Sidebar: Fix logout visibility on desktop    | ✅ Completo |
| Calculator: Enable mobile scrolling          | ✅ Completo |
| Notifications: Add deletedAt filter          | ✅ Completo |
| Referrals: Fix expiration job scope          | ✅ Completo |
| DiscountApplication: Add unique constraint   | ✅ Completo |
| Financial: Add CHECK constraints (>=0)       | ✅ Completo |

## Cronograma v0.6 (17 Enero 2026) - COMPLETADO

| Tarea                                        | Estado      |
| -------------------------------------------- | ----------- |
| Status System v2: CaseStatus enum            | ✅ Completo |
| Status System v2: FederalStatusNew enum      | ✅ Completo |
| Status System v2: StateStatusNew enum        | ✅ Completo |
| Status System v2: PreFilingStatus workflow   | ✅ Completo |
| Status System v2: Phase-based taxesFiled     | ✅ Completo |
| Alarm System: AlarmThreshold model           | ✅ Completo |
| Alarm System: AlarmHistory model             | ✅ Completo |
| Alarm System: Admin dashboard                | ✅ Completo |
| Alarm System: Resolution workflow            | ✅ Completo |
| Audit Logs: AuditLog model                   | ✅ Completo |
| Audit Logs: Security tracking                | ✅ Completo |
| Audit Logs: CSV export                       | ✅ Completo |
| Refresh Tokens: Secure rotation              | ✅ Completo |
| Refresh Tokens: Device tracking              | ✅ Completo |
| i18n: preferredLanguage field                | ✅ Completo |
| i18n: Notification translation               | ✅ Completo |
| SystemSetting: Key-value store               | ✅ Completo |

## Próximas Fases (v0.7+)

| Tarea                                        | Prioridad   |
| -------------------------------------------- | ----------- |
| Admin Panel: UI/UX review and improvements   | 🔴 Alta     |
| Admin Panel: Bulk actions                    | 🔴 Alta     |
| Admin Panel: Advanced filters and search     | 🔴 Alta     |
| Admin Panel: Metrics dashboard               | 🟡 Media    |
| Testing: Unit tests (backend services)       | 🔴 Alta     |
| Testing: Integration tests (API endpoints)   | 🔴 Alta     |
| Testing: E2E tests (critical user flows)     | 🟡 Media    |

---

# 14. GLOSARIO

| Término              | Definición                                                                     |
| -------------------- | ------------------------------------------------------------------------------ |
| **W2**               | Formulario fiscal de EE.UU. que muestra ingresos y retenciones del empleador   |
| **SSN**              | Social Security Number - Número de seguro social de EE.UU.                     |
| **J-1**              | Tipo de visa de intercambio cultural (incluye Work & Travel)                   |
| **Tax Refund**       | Devolución de impuestos retenidos en exceso                                    |
| **IRS**              | Internal Revenue Service - Agencia tributaria de EE.UU.                        |
| **F1**               | Formulario inicial con datos básicos (nombre, email, teléfono)                 |
| **F2**               | Formulario completo con datos sensibles (SSN, banco, dirección)                |
| **Make**             | Plataforma de automatización (antes Integromat)                                |
| **Supabase**         | Plataforma BaaS con PostgreSQL y Storage                                       |
| **Referidor**        | Usuario que comparte su código de referido (v0.3)                              |
| **Referido**         | Usuario que se registra usando un código de referido (v0.3)                    |
| **adminStep**        | Paso interno de control administrativo (1-5) (v0.3)                            |
| **OAuth**            | Protocolo de autorización para login con terceros (Google) (v0.3)              |
| **CaseStatus**       | Estado unificado del caso fiscal (v0.6)                                        |
| **FederalStatusNew** | Estado detallado del tracking federal post-presentación (v0.6)                 |
| **StateStatusNew**   | Estado detallado del tracking estatal post-presentación (v0.6)                 |
| **PreFilingStatus**  | Estado del caso antes de presentar impuestos (v0.6)                            |
| **taxesFiled**       | Flag que indica si los impuestos fueron presentados (v0.6)                     |
| **AlarmThreshold**   | Umbral de tiempo para disparar alarmas por caso (v0.6)                         |
| **AlarmHistory**     | Historial de alarmas disparadas con resolución (v0.6)                          |
| **AuditLog**         | Registro de acciones de seguridad y cambios críticos (v0.6)                    |
| **RefreshToken**     | Token de renovación para mantener sesión activa (v0.6)                         |
| **i18n**             | Internacionalización - soporte multi-idioma (v0.6)                             |

---

# 15. APÉNDICES

## A. Diagrama de Base de Datos (ER) - Actualizado v0.6

```
┌──────────────────┐       ┌────────────────┐       ┌──────────────────┐
│      users       │       │ client_profiles│       │    tax_cases     │
├──────────────────┤       ├────────────────┤       ├──────────────────┤
│ id (PK)          │◄──────│ user_id (FK)   │       │ id (PK)          │
│ email            │       │ id (PK)        │◄──────│ client_id(FK)    │
│ password_hash    │       │ ssn (encrypted)│       │ tax_year         │
│ role             │       │ date_of_birth  │       │ taxes_filed      │
│ first_name       │       │ address_*      │       │ pre_filing_status│
│ last_name        │       │ irs_username   │       │ case_status (v0.6)
│ phone            │       │ irs_password   │       │ federal_status_new
│ profile_picture  │       │ state_username │       │ state_status_new │
│ google_id        │       │ state_password │       │ admin_step       │
│ referral_code    │       │ turbotax_*     │       │ has_problem      │
│ token_version    │       │ profile_complete       │ problem_*        │
│ preferred_lang   │       │ is_draft       │       │ fed_deposit_date │
└──────────────────┘       └────────────────┘       │ state_deposit_date
        │                                           └──────────────────┘
        │                                                    │
        ▼                                                    ▼
┌──────────────┐       ┌──────────────┐       ┌────────────────────┐
│   tickets    │       │  documents   │       │   alarm_history    │
│ (soft-delete)│       │ uploaded_by  │       │      (v0.6)        │
└──────────────┘       └──────────────┘       ├────────────────────┤
        │                     │               │ alarm_type         │
        ▼                     ▼               │ alarm_level        │
┌──────────────┐       ┌──────────────┐       │ resolution         │
│ticket_messages       │ w2_estimates │       │ resolved_by        │
│ (soft-delete)│       │ ocr_raw_resp │       └────────────────────┘
└──────────────┘       └──────────────┘
                                              ┌────────────────────┐
┌──────────────┐       ┌──────────────┐       │  alarm_thresholds  │
│notifications │       │  referrals   │       │      (v0.6)        │
│ (soft-delete)│       ├──────────────┤       ├────────────────────┤
│ is_archived  │       │ referrer_id  │       │ federal_days       │
└──────────────┘       │ referred_id  │       │ state_days         │
                       │ status       │       │ verification_days  │
┌──────────────┐       │ completed_at │       │ letter_days        │
│status_history│       └──────────────┘       └────────────────────┘
└──────────────┘              │
                              ▼               ┌────────────────────┐
┌──────────────┐       ┌──────────────┐       │    audit_logs      │
│refresh_tokens│       │ discount_    │       │      (v0.6)        │
│   (v0.6)     │       │ applications │       ├────────────────────┤
├──────────────┤       └──────────────┘       │ action             │
│ token_hash   │                              │ user_id            │
│ device_info  │       ┌──────────────┐       │ target_user_id     │
│ ip_address   │       │system_settings       │ ip_address         │
│ is_revoked   │       │   (v0.6)     │       │ user_agent         │
└──────────────┘       └──────────────┘       └────────────────────┘
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

# 18. CLIENT PORTAL POLISH (v0.5)

## 18.1 Overview

La versión 0.5 se enfocó en pulir la experiencia del cliente en el portal, corrigiendo bugs de responsiveness y mejorando la estabilidad del sistema.

## 18.2 Fixes Implementados

### Frontend

| Componente | Problema | Solución |
|------------|----------|----------|
| **Profile** | "Cambiar contraseña" no funcionaba | Removido - usar "Olvidé mi contraseña" en login |
| **Profile** | Loading infinito en primera visita | Fixed race condition en ngOnInit, añadido cdr.detectChanges() |
| **Sidebar** | Logout button invisible en desktop | Added flex-shrink:0 a footer, overflow handling |
| **Calculator** | Button "Continuar" no visible en mobile | Added overflow-y:auto en mobile breakpoint |

### Backend

| Módulo | Problema | Solución |
|--------|----------|----------|
| **Notifications** | Mostraba notificaciones eliminadas | Added `deletedAt: null` filter en queries |
| **Referrals** | Referrals en 'tax_form_submitted' no expiraban | Updated expireOldReferrals cron job |
| **Discounts** | Posibles duplicados por referral | Added unique constraint en Prisma schema |

### Database (SQL Migrations)

| Migration | Descripción |
|-----------|-------------|
| `20250113_discount_unique_constraint` | Unique index on (referral_id, discountType) |
| `20250113_financial_validation` | CHECK constraints para non-negative amounts |
| `20250113_backfill_refund_fields` | Migración de actualRefund → federal_actual_refund |

## 18.3 CSS Changes

```css
/* Sidebar fix for desktop logout visibility */
.sidebar { height: 100%; overflow: hidden; }
.sidebar-header { flex-shrink: 0; }
.sidebar-nav { flex: 1; overflow-y: auto; min-height: 0; }
.sidebar-footer { flex-shrink: 0; }

/* Calculator mobile scroll fix */
@media (max-width: 640px) {
  .calculator-container { overflow-y: auto; padding-bottom: 40px; }
  .calculator-card { margin-bottom: 20px; }
}
```

## 18.4 Files Modified

```
Frontend:
├── src/app/components/profile/profile.ts        # Loading fix, removed password change
├── src/app/components/profile/profile.html      # Removed security section
├── src/app/components/main-layout/main-layout.css  # Sidebar responsiveness
└── src/app/components/tax-calculator/tax-calculator.css  # Mobile scroll

Backend:
├── src/modules/notifications/notifications.service.ts  # deletedAt filter
├── src/modules/referrals/referrals.service.ts   # Expiration job scope
└── prisma/schema.prisma                         # DiscountApplication unique constraint

Migrations:
├── prisma/migrations/20250113_discount_unique_constraint/migration.sql
├── prisma/migrations/20250113_financial_validation/migration.sql
└── prisma/migrations/20250113_backfill_refund_fields/migration.sql
```

---

# 19. STATUS SYSTEM v2 & ALARM SYSTEM (v0.6)

## 19.1 Status System v2 Overview

La versión 0.6 introduce un sistema de estados completamente renovado que reemplaza el sistema anterior con una estructura más clara basada en fases.

### Cambios Principales

1. **Separación de Fases**: El campo `taxesFiled` (boolean) separa claramente pre-filing y post-filing.
2. **CaseStatus Unificado**: Estado general del caso visible para admins.
3. **FederalStatusNew/StateStatusNew**: Estados detallados independientes para tracking federal y estatal.
4. **PreFilingStatus**: Estados específicos antes de presentar impuestos.
5. **Timestamps por Track**: Cada cambio de estado se registra con su timestamp.

### Migración desde Sistema Anterior

Los campos legacy (`internalStatus`, `clientStatus`) se mantienen para compatibilidad pero el nuevo sistema usa:
- `caseStatus` para estado general
- `federalStatusNew` para tracking federal
- `stateStatusNew` para tracking estatal
- `preFilingStatus` cuando `taxesFiled = false`

## 19.2 Alarm System Overview

El sistema de alarmas monitorea automáticamente casos que llevan demasiado tiempo en ciertos estados.

### Componentes

1. **AlarmThreshold**: Configuración de umbrales por caso (o globales)
2. **AlarmHistory**: Registro de todas las alarmas disparadas
3. **AlarmType**: Tipos de alarma (verification, letter_sent, etc.)
4. **AlarmLevel**: warning o critical
5. **AlarmResolution**: Estado de resolución (active, acknowledged, resolved, auto_resolved)

### Flujo de Alarmas

```
1. Sistema evalúa casos → 2. Detecta exceso de tiempo
                              ↓
3. Crea AlarmHistory → 4. Admin ve en dashboard
                              ↓
5. Admin acknowledges → 6. Admin resuelve con nota
      o
   Status cambia → Auto-resolve
```

### Default Thresholds

| Alarma | Días |
|--------|------|
| Federal in_process | 25 |
| State in_process | 50 |
| Verification timeout | 63 |
| Letter sent timeout | 63 |

---

# 20. PRÓXIMOS PASOS (v1.0+)

## 20.1 Admin Panel Improvements

### ✅ Completado (v0.9-v1.0)
- [x] Visual Review System (4-step gamified verification)
- [x] Bento grid layout for W2 verification
- [x] Status system UI improvements with tooltips
- [x] Commission payment tracking (dual-track with proof)
- [x] Auto-transition logic for document completion
- [x] Auto-calculated estimated dates
- [x] Problem auto-resolution on status change
- [x] Consent form tracking
- [x] Commission proof submission and admin review
- [x] Internal comments (admin-only, hidden from clients)
- [x] JAI1GENT referral program management

### ⏳ Pendiente
- [ ] Selección múltiple de clientes (bulk actions)
- [ ] Cambio de estado masivo
- [ ] Envío de notificaciones masivas
- [ ] Export masivo de datos (CSV/PDF reports)
- [ ] Filtros avanzados en lista de clientes
- [ ] Dashboard de métricas con gráficos

## 20.2 Testing (Prioridad Alta)

### Backend Tests
- [ ] Unit tests para services (auth, users, clients, referrals, alarms, audit-logs)
- [ ] Integration tests para controllers
- [ ] Mock de Prisma y servicios externos

### Frontend Tests
- [ ] Unit tests para services críticos
- [ ] Component tests para formularios
- [ ] E2E tests para flujos: registro, login, upload, tax-form

### Test Coverage Goals
- Backend services: 80%+
- API endpoints: 90%+
- Critical user flows: 100%

---

# 21. API SYNC & TYPE GENERATION (v0.8)

## 21.1 Overview

The API Sync system ensures frontend TypeScript types are always in sync with backend DTOs through automatic code generation from OpenAPI specifications.

## 21.2 Pagination Constants

Centralized pagination limits in `src/common/constants/pagination.constants.ts`:

```typescript
export const PAGINATION_LIMITS = {
  CLIENTS: { DEFAULT: 20, MAX: 1000 },
  ACCOUNTS: { DEFAULT: 50, MAX: 500 },
  PAYMENTS: { DEFAULT: 50, MAX: 500 },
  DELAYS: { DEFAULT: 50, MAX: 500 },
  TICKETS: { DEFAULT: 20, MAX: 100 },
  NOTIFICATIONS: { DEFAULT: 20, MAX: 100 },
  REFERRALS: { DEFAULT: 50, MAX: 1000 },
  REFERRALS_SUMMARY: { DEFAULT: 50, MAX: 100 },
  LEADERBOARD: { DEFAULT: 10, MAX: 100 },
  AUDIT_LOGS: { DEFAULT: 50, MAX: 100 },
} as const;
```

Helper functions: `validateLimit()`, `validatePage()`, `validateOffset()`

## 21.3 Response DTOs

Standard response wrappers in `src/common/dto/`:

- `PaginatedResponseDto<T>` - Cursor-based pagination
- `OffsetPaginatedResponseDto<T>` - Offset-based pagination
- `SuccessResponseDto` - Generic success response
- `ErrorResponseDto` - Error response wrapper

Entity-specific response DTOs:
- `AuthResponseDto`, `RegisterResponseDto`, `LogoutResponseDto`
- `TicketsPaginatedResponseDto`, `TicketDetailDto`
- `NotificationsPaginatedResponseDto`, `UnreadCountResponseDto`
- `ClientsPaginatedResponseDto`, `ClientListItemDto`

## 21.4 Swagger Decorators

All DTOs now include `@ApiProperty` and `@ApiPropertyOptional` decorators with:
- Description
- Example values
- Enum constraints
- Nested type references

All controllers include:
- `@ApiTags()` - Group endpoints by feature
- `@ApiOperation()` - Describe endpoint purpose
- `@ApiResponse()` - Document response types
- `@ApiBearerAuth()` - Mark authenticated endpoints

## 21.5 OpenAPI Generation

Backend automatically exports `openapi.json` on startup (dev mode).

```bash
# Backend - generates openapi.json
npm run start:dev
```

## 21.6 Frontend Type Generation

Configuration in `ng-openapi-gen.json`:

```json
{
  "input": "../portal-jai1-backend/openapi.json",
  "output": "src/app/core/api",
  "enumStyle": "alias",
  "servicePrefix": "Api",
  "serviceSuffix": "Service"
}
```

```bash
# Frontend - generate types from OpenAPI spec
npm run generate:api
```

Generated files in `src/app/core/api/`:
- `models/` - 39 TypeScript interfaces (DTOs)
- `fn/` - API function implementations
- `services/` - 14 Angular services (by controller)

## 21.7 Usage

```typescript
// Import generated types
import { LoginDto, AuthResponseDto } from '../api/models';
import { ApiAuthService } from '../api/services';

// Types are always in sync with backend
```

## 21.8 Workflow

1. Modify backend DTO (add field, change type)
2. Restart backend (generates new openapi.json)
3. Run `npm run generate:api` in frontend
4. Frontend types are updated automatically

---

# 22. VISUAL REVIEW & REFUND CONFIRMATION (v0.9)

## 22.1 Visual Review System

### Purpose
Provides a gamified, step-by-step document verification flow for admins to quickly review client submissions.

### 4-Step Flow

```
Step 1          Step 2              Step 3              Step 4
┌─────────┐    ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│ Client  │    │ W2 Verification │  │ Payment Proof   │  │ Consent Form    │
│ Form    │ → │ (Bento Grid)    │ → │ Review          │ → │ Review          │
│ Review  │    │                 │  │                 │  │                 │
└─────────┘    └─────────────────┘  └─────────────────┘  └─────────────────┘
     ↓                ↓                    ↓                    ↓
  ✓ CORRECTO      ✓ CORRECTO          ✓ CORRECTO          Final Decision
                                                         Accept / Problem
```

### Step 2: Bento Grid Layout

The W2 verification step uses a special 50/50 bento grid layout:

```
┌────────────────────────┬────────────────────────┐
│   Datos del Cliente    │                        │
│   • SSN (with copy)    │   W2 Document Preview  │
│   • Nombre             │   • Zoom controls      │
│   • Direccion          │   • Rotate (images)    │
│   • Empleador          │   • Fullscreen         │
│   • Estado Trabajo     │   • Download           │
├────────────────────────┤                        │
│   Campos Clave W2      │   [Document selector   │
│   ☐ Box 2: Federal Tax │    for multiple W2s]   │
│   ☐ Box 17: State Tax  │                        │
│   ☐ Reembolso Estimado │                        │
│   OCR Confidence badge │                        │
└────────────────────────┴────────────────────────┘
        LEFT (50%)              RIGHT (50%)
```

### Steps 3 & 4: Document + Preview Layout

```
┌────────────────────────┬────────────────────────┐
│   Document List        │   Document Preview     │
│   • File 1             │   (just the document)  │
│   • File 2             │                        │
│   Click to view →      │   [Toolbar]            │
└────────────────────────┴────────────────────────┘
        LEFT                      RIGHT
```

### W2 Estimate API

Backend endpoint: `GET /clients/:id/w2-estimate`

Returns OCR-extracted W2 data:
```json
{
  "hasEstimate": true,
  "estimate": {
    "box2Federal": 1234.56,
    "box17State": 567.89,
    "estimatedRefund": 1802.45,
    "ocrConfidence": "high"
  }
}
```

## 22.2 Refund Confirmation System

### Client Flow
1. Client sees "Confirmar Recepcion" button when status is `taxes_sent` or `check_in_transit`
2. Client enters actual amount received
3. System updates:
   - `federalActualRefund` or `stateActualRefund`
   - `federalDepositDate` or `stateDepositDate`
   - Status to `taxes_completed`

### Admin View
- Can see confirmed vs unconfirmed refunds
- Commission tracking based on confirmed refunds

## 22.3 Commission Payment Tracking

### TaxCase Fields
```prisma
commissionPaid     Boolean    @default(false)
commissionPaidAt   DateTime?
```

### Admin Flow
1. View list of clients with unpaid commissions
2. Filter by commission status
3. Mark individual commissions as paid
4. System records payment timestamp

## 22.4 Engineer Status System Improvements

### Auto-Transition Logic
When all 4 items are complete, auto-transition to `documentos_enviados`:
1. ✓ Tax form submitted (profileComplete && !isDraft)
2. ✓ W2 document uploaded
3. ✓ Payment proof uploaded
4. ✓ Consent form signed

Triggered from:
- Document upload service
- Consent form signing service
- Profile completion service

### Auto-Calculated Estimated Dates
On `taxes_filed` transition:
- `federalEstimatedDate` = filing date + 6 weeks (42 days)
- `stateEstimatedDate` = filing date + 9 weeks (63 days)

Only sets if not already manually set.

### Problem Auto-Resolution
When status progresses to positive states (`deposit_pending`, `check_in_transit`, `taxes_sent`, `taxes_completed`):
- `hasProblem` set to false
- `problemResolvedAt` set to now
- `problemType` and `problemDescription` cleared

### Status Tooltips
Admin dropdowns show helpful descriptions:
- `in_verification`: "El IRS está revisando el caso"
- `deposit_pending`: "Depósito aprobado, esperando confirmación del banco"
- `check_in_transit`: "Cheque físico enviado por correo"
- etc.

---

---

## 23. SESIÓN 10 DE MARZO 2026 — REFERRAL PROGRAM FIXES

### Problemas encontrados y resueltos

#### Bug 1 — Columna `referral_onboarding_completed` faltante en producción
- La columna existía en el schema de Prisma pero no tenía migración
- Los endpoints `/referrals/onboarding-status` y `/referrals/mark-onboarding-complete` fallaban silenciosamente con error 500
- **Fix**: Se corrió manualmente en Supabase: `ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "referral_onboarding_completed" BOOLEAN NOT NULL DEFAULT false`

#### Bug 2 — Tabla `referrals` vacía (0 registros)
- El engineer estaba seteando `referred_by_code` directamente en Supabase sin crear los registros en la tabla `referrals`
- 9 usuarios tenían `referred_by_code` seteado pero 0 referral records
- Adicionalmente, 4 de esos usuarios tenían `\r\n` al final del código (copy/paste del engineer)
- **Fix**: Se limpió el whitespace con `REGEXP_REPLACE` y se hizo backfill de los 9 registros

### Estado actual del programa de referidos
- ✅ 9 referral records creados en producción
- ✅ Admin panel muestra referrers correctamente
- ✅ Columna `referral_onboarding_completed` presente en DB

### Procedimiento correcto para el engineer
Para registrar un referido manualmente, usar el endpoint:
`POST /v1/referrals/apply-code` con el JWT del usuario y `{ "code": "REFERRALCODE" }`
NO editar Supabase directamente.

### Pendiente
- Agregar FK constraint `users_referred_by_code_fkey` para bloquear códigos inválidos (script listo, no aplicado aún)

---

**FIN DEL DOCUMENTO**

_Este PRD debe ser usado como referencia única para el desarrollo del Portal JAI1. Cualquier cambio debe ser documentado y versionado._

_Versión 1.3 - Última actualización: 10 de Marzo, 2026_
