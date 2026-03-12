# Demo Mode — Admin Login → Client Portal

**Status:** 🟡 In Progress
**Created:** 2026-03-12
**Priority:** Medium

## Problem Statement

Owners want to showcase the client portal to prospects without creating and cleaning up real accounts in production each time. Currently, multiple dummy accounts accumulate in the DB.

## Proposed Solution

Add a "Demo Mode" button to the admin login page (`/admin-login`). Clicking it logs the user into the client portal as a pre-seeded demo account — no credentials required. The demo account has realistic fake data (profile, documents, status) and can be reset by admins at any time.

## Flow

```
Admin Login Page
  └── "Demo Mode" button
        └── POST /auth/demo-session  (no auth required)
              └── Backend returns { access_token, refresh_token, user }
                    └── Frontend stores tokens via handleExternalAuthResponse()
                          └── router.navigate(['/dashboard'])
                                └── Client portal opens as demo user ✅
```

## Implementation Plan

### Step 1 — Backend: `demoLogin()` in auth.service.ts
- Look up the demo user by a hardcoded email: `demo@jai1.com`
- Call the existing private `generateTokens()` method for that user
- Return the same shape as normal login: `{ access_token, refresh_token, expires_in, user }`
- If demo user doesn't exist → throw `NotFoundException` (don't silently fail)

### Step 2 — Backend: `POST /auth/demo-session` in auth.controller.ts
- Public endpoint (no JwtAuthGuard)
- Apply throttle: `{ limit: 10, ttl: 60000 }` — enough for demos, prevents abuse
- Calls `authService.demoLogin()`
- Returns standard auth response shape (same as login, works with existing frontend)

### Step 3 — Frontend: `demoLogin()` in auth.service.ts
- `POST /auth/demo-session` → pipe through `tap(handleAuthResponse)` and `catchError`
- Same pattern as existing `login()` method — 4 lines

### Step 4 — Frontend: `admin-login.ts`
- Add `isDemoLoading: boolean = false`
- Add `onDemoMode()` method: calls `authService.demoLogin()`, on success navigates to `/dashboard`
- On error: shows `errorMessage`

### Step 5 — Frontend: `admin-login.html`
- Add a second button below the existing login form: "Modo Demo"
- Visually distinct (secondary/outline style, not primary)
- Shows loading state when `isDemoLoading` is true

### Step 6 — Demo User Setup (manual, one-time, production)
- Create user in DB with:
  - email: `demo@jai1.com`
  - role: `client`
  - emailVerified: `true`
  - isActive: `true`
  - firstName: `Demo`, lastName: `User`
- Complete the ClientProfile with realistic fake data
- This is done manually via SQL or a seed script — NOT a migration

## Technical Details

### Backend Changes

| File | Change |
|---|---|
| `src/modules/auth/auth.service.ts` | Add `async demoLogin()` method (calls existing `generateTokens()`) |
| `src/modules/auth/auth.controller.ts` | Add `@Post('demo-session')` endpoint with `@Throttle` |

### Frontend Changes

| File | Change |
|---|---|
| `src/app/core/services/auth.service.ts` | Add `demoLogin(): Observable<AuthResponse>` |
| `src/app/components/admin-login/admin-login.ts` | Add `isDemoLoading` + `onDemoMode()` |
| `src/app/components/admin-login/admin-login.html` | Add "Modo Demo" button |
| `src/app/components/admin-login/admin-login.css` | Add `.btn-demo` style (optional) |

### Database Changes
- No Prisma migration needed
- Demo user created manually in production (one-time setup, documented below)

## Demo User SQL (run once in production)
```sql
-- Run this once in production via Railway DB console or Supabase
INSERT INTO users (
  id, email, password_hash, role, first_name, last_name,
  email_verified, is_active, token_version, preferred_language
) VALUES (
  gen_random_uuid(),
  'demo@jai1.com',
  '$2b$10$REPLACE_WITH_BCRYPT_HASH', -- hash of a strong random password nobody knows
  'client',
  'Demo',
  'User',
  true,
  true,
  1,
  'es'
);
```
> Password hash should be a bcrypt hash of a random string — nobody should ever log in as demo with a password, only via the demo-session endpoint.

## What NOT to Do
- ❌ Do NOT add `isDemo` flag to the Prisma schema — no migration needed
- ❌ Do NOT skip the throttle on the demo-session endpoint
- ❌ Do NOT use the admin JWT guard on the demo endpoint (user isn't logged in yet)
- ❌ Do NOT store anything in localStorage beyond what `handleAuthResponse` already does
- ❌ Do NOT touch app.routes.ts — `/dashboard` route already exists and works

## Success Criteria

- [ ] "Modo Demo" button visible on `/admin-login` page
- [ ] Clicking it navigates to `/dashboard` as the demo user
- [ ] Client portal loads fully (profile, documents, status, etc.)
- [ ] No errors in browser console
- [ ] Demo session expires normally (same as any real session)
- [ ] Endpoint returns 429 if hit more than 10 times/minute
- [ ] No new Prisma migration created

## Notes

- `generateTokens()` is currently `private` in auth.service.ts — `demoLogin()` will be a method
  in the same class so it can call it directly. No access modifier change needed.
- The frontend `handleExternalAuthResponse()` already exists in auth.service.ts for this exact
  use case (external auth flows like jai1gent registration). We use it directly.
- The demo user token is a real JWT with role=client. The authGuard will pass it through
  normally. No special guards or interceptors needed.
