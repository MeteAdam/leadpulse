# LeadPulse AI — Operational Growth & Launch Playbook

## 1. Executive Summary & Growth Strategy

This playbook defines the zero-ad-spend customer acquisition system for **LeadPulse AI**. The entire pipeline operates around **high-intent social listening**, turning public problem expressions on Reddit, Twitter/X, and niche communities into paying SaaS customers.

---

## 2. Turkey-Friendly Monetization Setup (USD Revenue)

### Recommended: **Lemon Squeezy (Merchant of Record)**
- **Why:** Full legal MoR (handles global VAT, taxes, fraud, and chargebacks). Supports Turkish founders and pays out directly in USD/EUR via Wise, Payoneer, or direct international SWIFT bank transfer.
- **Setup Steps:**
  1. Register at [lemonsqueezy.com](https://www.lemonsqueezy.com).
  2. Create a new product: **LeadPulse AI — Pro Growth** ($29/month subscription).
  3. Copy your Checkout Link (e.g. `https://leadpulse.lemonsqueezy.com/buy/...`).
  4. Plug the URL into `app.js` or `index.html` on the `#buy-pro-btn` button.

### Alternative (Local TRY Sales): **Shopier / PayTR**
- Ideal if targeting domestic Turkish developers/marketers in TRY.

---

## 3. 1-Click Free Hosting on GitHub Pages

The frontend (`index.html`, `styles.css`, `app.js`) is completely static, lightweight, and blazing fast.

### Deployment Instructions:
1. Create a public/private repository on GitHub (e.g., `leadpulse-ai`).
2. Push all files from `Startup Project/` to the repository:
   ```bash
   git init
   git add .
   git commit -m "feat: initial LeadPulse AI launch"
   git remote add origin https://github.com/YOUR_USERNAME/leadpulse-ai.git
   git branch -M main
   git push -u origin main
   ```
3. In your GitHub repository: Go to **Settings** → **Pages** → under **Build and deployment**, select `Deploy from a branch` and choose `main` / `root`.
4. Your website is instantly live globally at `https://YOUR_USERNAME.github.io/leadpulse-ai/`.

---

## 4. Free Launch Channels & Distribution Roadmap

| Platform / Channel | Target Community | Strategy & Action Item |
| :--- | :--- | :--- |
| **Reddit** | `r/SaaS`, `r/SideProject`, `r/Entrepreneur` | Post value breakdown: *"How we built an autonomous scraper to find 100+ B2B leads on Reddit without ads"* (include link to live simulator). |
| **Hacker News** | `news.ycombinator.com` | Submit `Show HN: LeadPulse AI – High-intent social lead discovery for indie founders`. |
| **Indie Hackers** | `indiehackers.com/products` | Publish product milestone update & share first 10 leads case study. |
| **Product Hunt** | `producthunt.com` | Schedule official launch with interactive demo GIF and 20% launch discount code. |
| **Twitter / X** | Tech & Builder Community (`#buildinpublic`, `#indiehackers`) | Post daily intent breakdowns and snippets of real buyer queries found by the scanner. |

---

## 5. Daily Autonomous Operational Routine

To maintain consistent customer acquisition:
1. **Run Daily Prospector:** Execute `python lead_scanner.py` every morning.
2. **Review Pipeline:** Open `prospects.md` or `leads.json`.
3. **Engage High Scores:** For leads with Intent Score > 90%, open the thread link and post the tailored value pitch from `outreach-templates.md`.
4. **Handoff & CRM:** When prospects respond asking for demo access, send them to the live interactive demo on your GitHub Pages site.
