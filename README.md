# WhiteCodel — agency website, admin panel & API

A complete platform for an IT & growth services company: a redesigned public
marketing site, a full admin panel to run it, and a feature-based NestJS API
behind both.

```
WebsiteRaj/
├── apps/
│   ├── web/      Next.js 15 (App Router) — public website + /admin panel
│   └── api/      NestJS 10 + MongoDB — feature-based REST API
├── .claude/launch.json
└── package.json  npm workspaces
```

---

## 1. Quick start

Requirements: Node 18+, MongoDB running locally (or a connection string).

```bash
npm install
```

```bash
cp apps/api/.env.example apps/api/.env && cp apps/web/.env.example apps/web/.env.local
```

Start MongoDB, then seed the database with the full starter content
(14 services, 6 case studies, 4 blog posts, FAQs, team, industries, job
openings, site settings and the superadmin account):

```bash
npm run seed
```

Run both apps together:

```bash
npm run dev
```

- Website → http://localhost:3000
- API → http://localhost:4001/api/v1
- Admin panel → http://localhost:3000/admin

Sign in with the credentials from `apps/api/.env` (`SEED_ADMIN_EMAIL` /
`SEED_ADMIN_PASSWORD`). **Change the seeded password before deploying.**

> On this machine ports 3000 and 4000 were already in use by other node
> processes, so the API default was moved to **4001** and the dev server was
> started on **3001** (`.claude/launch.json`). Change `PORT` in `apps/api/.env`
> and `NEXT_PUBLIC_API_URL` in `apps/web/.env.local` if you want different
> ports — they must agree, and the web origin must appear in `CORS_ORIGINS`.

Run them separately if you prefer:

```bash
npm run dev:api
```

```bash
npm run dev:web
```

---

## 2. What the site sells

Every service is a database record with its own page, starting price, timeline,
inclusions, deliverables and enquiry form:

| Build | Growth & media | Run |
| --- | --- | --- |
| Mobile App Development | Digital Marketing (SEO/content/social) | Cloud & DevOps |
| Web Development | Google & Meta Ads | QA & Test Automation |
| Custom Software & SaaS | Video Editing & Motion | Hire Dedicated Developers |
| UI/UX Design | Graphic Design & Branding | Maintenance & Support |
| AI & Automation | E-Commerce Development | |

Add, rename, re-price or remove any of them from the admin panel — nothing is
hardcoded in the pages.

### Public pages

`/` home · `/services` + `/services/[slug]` · `/portfolio` +
`/portfolio/[slug]` · `/pricing` · `/about` · `/blog` + `/blog/[slug]` ·
`/careers` (with applications) · `/contact` · plus `sitemap.xml`, `robots.txt`
and per-page SEO metadata.

The home page carries the pitch: hero with live service list, trust stats, the
full service grid, differentiators, case studies with results, a five-step
process, industries, testimonials, three engagement models, blog teasers and
FAQs.

---

## 3. Admin panel (`/admin`)

JWT login, three roles (`superadmin`, `admin`, `editor`), and a screen for
everything on the site:

- **Dashboard** — lead totals, conversion rate, pipeline by stage, leads-per-month chart, content counts, recent enquiries
- **Leads** — searchable CRM inbox: stage dropdown, detail view, internal notes, CSV export, delete
- **Services / Portfolio / Blog / Testimonials / Team / FAQs / Industries** — full CRUD with search, pagination, publish toggle, image upload, tag and list editors
- **Job openings / Applications** — manage roles and move candidates through stages
- **Subscribers** — newsletter list with CSV export
- **Site settings** — brand, contact details, social links, hero copy, headline stats, SEO defaults
- **Admin users** — create users, set roles, enable/disable, change your password

Every list and form is driven by one generic `ResourceManager` component, so a
new content type is about 40 lines of config.

---

## 4. API (NestJS, feature-based)

```
apps/api/src/
├── main.ts                  single bootstrap entry
├── app.module.ts            wires every feature + global middleware
├── config/                  configuration.ts, database.module.ts
├── common/
│   ├── middleware/          logger, request-id
│   ├── guards/              jwt-auth, roles
│   ├── decorators/          @Public, @Roles, @CurrentUser
│   ├── filters/             http-exception (uniform error shape)
│   ├── interceptors/        transform ({ success, data, meta })
│   ├── dto/                 pagination
│   └── services/            base-crud.service.ts (shared CRUD)
└── features/                each: *.module · *.controller · *.service · models/ · dto/
    ├── auth/         login, profile, users, password
    ├── services/     the service catalogue
    ├── projects/     portfolio / case studies
    ├── blog/         posts, view counts, related posts
    ├── leads/        enquiries, stages, notes, stats, CSV
    ├── testimonials/ · team/ · faqs/ · industries/
    ├── careers/      jobs + applications
    ├── newsletter/   subscribers
    ├── settings/     singleton site settings
    ├── dashboard/    aggregated admin overview + health
    ├── uploads/      image/PDF/video upload to /uploads
    └── seed/         demo content + CLI (`npm run seed`)
```

Conventions used throughout:

- **Models** are Mongoose schemas under `features/<name>/models/`.
- **Routes**: `GET /x` and `GET /x/slug/:slug` are public; `GET /x/manage`,
  `POST`, `PATCH`, `PATCH /:id/publish` and `DELETE` require a JWT.
- **Responses** are always `{ success, data }`, with `meta` on paginated lists.
- **Errors** are always `{ success: false, statusCode, error, message, path, requestId }`.
- Validation runs through `class-validator` DTOs; rate limiting protects the
  public contact, apply and subscribe endpoints.

Useful endpoints:

```bash
curl http://localhost:4001/api/v1/dashboard/health
```

```bash
curl -X POST http://localhost:4001/api/v1/auth/login -H "Content-Type: application/json" -d "{\"email\":\"admin@whitecodel.dev\",\"password\":\"Admin@12345\"}"
```

---

## 5. Rebranding

1. `apps/web/src/config/site.ts` — name, nav, footer links, process steps, engagement models, differentiators, tech stack.
2. Admin → **Site settings** — brand name, contact details, hero copy, stats, SEO (these override the config at runtime).
3. `apps/web/src/app/globals.css` — colour tokens (`--color-brand-*`, `--color-aqua-*`, `--color-ink-*`) and fonts.

The site renders bundled fallback content when the API is unreachable
(`apps/web/src/lib/fallback.ts`), so a demo never shows an error page.

---

## 6. Build & deploy

```bash
npm run build
```

Environment variables for production:

| App | Variable | Note |
| --- | --- | --- |
| api | `MONGODB_URI` | MongoDB connection string |
| api | `JWT_SECRET` | long random string |
| api | `CORS_ORIGINS` | comma-separated website origins |
| api | `PUBLIC_URL` | public API URL (used for upload links) |
| web | `NEXT_PUBLIC_API_URL` | `https://api.example.com/api/v1` |
| web | `NEXT_PUBLIC_SITE_URL` | canonical site URL for SEO/sitemap |

Deploy `apps/web` to Vercel (or any Node host) and `apps/api` to Render,
Railway, Fly or a VPS with MongoDB Atlas. Uploaded files live in
`apps/api/uploads` — mount a volume or switch the uploads feature to S3.

---

## 7. Checks run against this build

- `nest build` and `next build` both pass (28 routes).
- 34 end-to-end API checks pass: login, all 12 admin list endpoints, a full
  create → update → publish → public slug lookup → delete round trip, settings
  write, lead notes and stage changes, role enforcement (an `editor` gets 403
  on delete), and all public endpoints without a token.
- Admin panel verified in the browser: login, dashboard with live figures,
  services table, leads inbox.
