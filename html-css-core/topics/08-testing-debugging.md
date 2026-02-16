# 08) Debugging & testing — DevTools, a11y, visual checks

**কি শিখবেন**
- DevTools: layout pane (flex/grid), color contrast checker, device emulation।
- a11y checks: Lighthouse, axe DevTools, tab order, focus traps।
- Visual diffs: ছোট UI পরিবর্তন যাচাই (Playwright/Cypress snapshot hint)।

**Code (DevTools steps)**
```md
- Elements → Layout: flex/grid overlay দিয়ে bed cards alignment দেখুন।
- Console: `getComputedStyle(elem).gap` দিয়ে live gap যাচাই।
- Lighthouse (Ctrl+Shift+L): Performance + Accessibility রান; স্কোর ও রেকমেন্ডেশন নোট করুন।
- axe DevTools (extension): Critical issues (aria-label, contrast) ফিক্স করে rerun।
```

**Playwright smoke (optional)**
```ts
import { test, expect } from '@playwright/test';

test('nav and form render', async ({ page }) => {
  await page.goto('http://localhost:5500');
  await expect(page.getByRole('heading', { name: 'Patient Intake' })).toBeVisible();
  await expect(page.getByLabel('Patient ID')).toBeVisible();
});
```

**Interview takeaways**
- DevTools Layout/Accessibility প্যানেল চর্চা করলে দ্রুত bugfix; ইন্টারভিউতে “how do you debug layout/a11y?” প্রশ্নে সরাসরি উদাহরণ দিতে পারবেন।
- Minimal Playwright smoke টেস্টও সিগন্যাল দেয় আপনি UI স্থায়িত্ব মূল্য দেন।
- Tab-order ও focus-visible চেক করা a11y সচেতনতা দেখায়।

**আরো উদাহরণ (beginner → advanced)**
1) Beginner — manual contrast check
```md
Chrome DevTools → Elements → Styles → color picker → Contrast ratio shown; adjust until AA/AAA.
```
2) Beginner — simple tab walk
```md
Press Tab through intake form; ensure visible focus ring on every control.
```
3) Intermediate — Lighthouse CLI
```bash
npx lighthouse http://localhost:5500 --only-categories=accessibility --quiet
```
4) Intermediate — axe-core in Playwright
```ts
import AxeBuilder from '@axe-core/playwright';
const results = await new AxeBuilder({ page }).analyze();
console.log(results.violations);
```
5) Advanced — visual diff hint (Playwright)
```ts
await expect(page).toHaveScreenshot('beds.png', { fullPage: true });
```

**Try it**
- Layout overlay দিয়ে cards gap নোট করুন; পরে CSS gap পরিবর্তন করে ফল দেখুন।
- Lighthouse Accessibility স্কোর 90→100 করতে contrast বা aria-label ফিক্স করুন।
- Playwright smoke রান করে failing স্ক্রিনশট সেভ করুন (afterEach hook)।  
