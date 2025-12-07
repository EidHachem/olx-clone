OLX Lebanon – Mini Clone (Assessment)

This project is a simplified OLX Lebanon clone built with Next.js (App Router) and TypeScript.
It implements the required assessment features: category browsing, dynamic category fields, posting an ad, and Arabic/English localization.

🚀 Tech Stack

Next.js (App Router)

TypeScript

Tailwind CSS

SweetAlert2 (form feedback)

Custom i18n (en.json / ar.json)

External APIs:

https://www.olx.com.lb/api/categories

https://www.olx.com.lb/api/categoryFields

📌 Features Implemented
1. Home + Static Category Cards

Uses local category config (postAdCategories.ts) with icons.

Fully translated (EN/AR).

2. Post an Ad – Step 1 (/post-ad)

Displays static category cards with images.

Selecting a card moves to the dynamic OLX data browser.

3. Post an Ad – Step 2 (Dynamic 3-column category browser)

Categories fetched once from /api/categories.

Three columns:

Main categories

Subcategories

Third-level categories

Clicking the correct category navigates to attributes:

/post-ad/attributes?slug=<categorySlug>&categoryLabel=<name>

4. Post an Ad – Step 3 (/post/attributes)

Fetches dynamic fields from /api/categoryFields.

Renders:

Select fields

Multi-select chips

Number fields

Generic fields (title, description, location, seller name, phone)

Supports Arabic field names (name_l1 / label_l1).

5. Validation

Validation logic lives in lib/postAdValidation.ts.

Checks:

Required dynamic fields

Title, description, location, name, phone, contact method

Shows SweetAlert2 success/error popups.

6. Localization (EN / AR)

Custom translation hook.

Field names and choice labels use Arabic where available.

📁 Project Structure (Important Parts)
app/
  post-ad/                   # Step 1 + Step 2
  post/attributes/           # Step 3 (dynamic form)
  api/
    categories/              # Proxy OLX categories API
    categoryFields/          # Proxy OLX categoryFields API

components/post-ad/
  PostAdCategoryStep.tsx
  PostAdDynamicCategoryStep.tsx
  PostAdAttributesForm.tsx

lib/
  postAdCategories.ts
  postAdValidation.ts

locales/
  en.json
  ar.json

▶️ Running the Project
Install dependencies
npm install

Start development server
npm run dev


Visit:

Home: http://localhost:3000

Post an ad: http://localhost:3000/post-ad