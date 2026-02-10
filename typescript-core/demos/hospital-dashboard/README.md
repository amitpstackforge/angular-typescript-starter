# Hospital Dashboard (TypeScript Core Demo)

- `src/app.ts` এ core কনসেপ্ট (type/interface, union/intersection, generics, enum, unknown, class, async/await) ব্যবহার করা হয়েছে।
- `dist/app.js` ম্যানুয়ালি জেনারেট করা আছে; ইচ্ছা হলে `npx tsc --watch` চালিয়ে নিজের আউটপুট বানান।

## রান
1. `npm install -D typescript` (যদি না থাকে)।
2. `npx tsc --watch` (output: `dist/app.js`).
3. `index.html` → Live Server / `npx http-server .` দিয়ে খুলুন।
4. ব্রাউজার Console এ API লগ ও UI তে bed/patient আপডেট দেখুন।
