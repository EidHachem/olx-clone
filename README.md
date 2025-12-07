# 🇱🇧 OLX Lebanon – Mini Clone (Assessment)

> This project is a **simplified OLX Lebanon clone** built as an assessment. It utilizes **Next.js (App Router)** and **TypeScript** to implement the core required features: category browsing, dynamic category fields, posting an ad, and bilingual **Arabic/English localization**.

---

## 🚀 Tech Stack

| Category | Technology | Notes |
| :--- | :--- | :--- |
| **Framework** | Next.js | App Router for modern routing |
| **Language** | TypeScript | Strong typing for reliability |
| **Styling** | Tailwind CSS | Utility-first CSS framework |
| **Form Feedback** | SweetAlert2 | Used for success/error popups |
| **Localization** | Custom i18n | Based on `en.json` / `ar.json` |

### 🔗 External APIs

The application proxies the following official OLX Lebanon endpoints:

* Category List: `https://www.olx.com.lb/api/categories`
* Dynamic Fields: `https://www.olx.com.lb/api/categoryFields`

---

## 📌 Features Implemented

### 🏡 Home and Static Category Cards

* Displays the main landing page.
* Uses local configuration (`lib/postAdCategories.ts`) for initial static category cards with icons.
* Fully translated (English/Arabic).

### 📝 Post an Ad Flow

#### Step 1: Initial Selection (`/post-ad`)

* Displays static category cards with images.
* Selecting a card initiates the flow to the dynamic OLX data browser.

#### Step 2: Dynamic 3-Column Category Browser

* Categories data is fetched once from the `/api/categories` proxy.
* Implemented as a **three-column hierarchical browser**:
    1.  Main categories
    2.  Subcategories
    3.  Third-level categories
* Clicking the final category navigates to the attributes form:
    * `/post-ad/attributes?slug=<category_slug>&categoryLabel=<label>`

#### Step 3: Attributes Form (`/post/attributes`)

* Fetches the **dynamic fields** specific to the selected category from the `/api/categoryFields` proxy.
* The form dynamically renders various input types:
    * `Select` fields (Dropdowns)
    * `Multi-select` chips
    * `Number` fields
    * Generic fields (Title, Description, Location, Seller Name, Phone)
* Supports Arabic field names using the provided `name_l1` / `label_l1` keys.

### 🛡️ Validation & Localization

* **Validation:** Logic lives in `lib/postAdValidation.ts`. It checks all required dynamic fields and standard fields (Title, Phone, etc.). User feedback is provided via SweetAlert2.
* **Localization (EN / AR):** Uses a custom translation hook. Field names and choice labels use Arabic translation where available.

---

## ▶️ Running the Project

1.  **Install dependencies:**
    ```bash
    npm install
    ```
2.  **Start the development server:**
    ```bash
    npm run dev
    ```
3.  **Visit the application:**
    * **Home:** `http://localhost:3000`
    * **Post an Ad:** `http://localhost:3000/post-ad`