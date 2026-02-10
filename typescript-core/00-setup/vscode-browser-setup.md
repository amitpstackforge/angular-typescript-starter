# VS Code + Browser টেস্ট সেটআপ (বিগিনার স্টেপ-বাই-স্টেপ)

> দ্রুত চেষ্টা করতে `demos/hospital-dashboard` ফোল্ডার খুলে নিন।

1) Node.js ইনস্টল করুন (v18+). 
2) TypeScript ইনস্টল
   - গ্লোবাল: `npm install -g typescript`
   - অথবা লোকাল (recommended): প্রজেক্ট রুটে `npm install -D typescript`
3) VS Code-এ ফোল্ডার খুলুন
   - `File > Open Folder...` → `typescript-core/demos/hospital-dashboard`
4) tsconfig প্রস্তুত
   - আমরা আগে থেকে `tsconfig.json` দিয়েছি; দেখতে চাইলে খুলে নিন।
5) TypeScript → JavaScript কম্পাইল
   - টার্মিনাল (VS Code): `npx tsc --watch`
   - আউটপুট `dist/app.js` তে যাবে।
6) Live Server দিয়ে ব্রাউজারে চালান
   - VS Code extension marketplace থেকে “Live Server” ইনস্টল করুন।
   - `index.html` ফাইলের ওপর রাইট-ক্লিক → `Open with Live Server`.
   - ব্রাউজারে ড্যাশবোর্ড খুলবে; Console ট্যাবে লজিক দেখুন।
7) কোড এডিট করুন
   - `src/app.ts` এ পরিবর্তন করুন; watch মোড auto-compile করবে; ব্রাউজার রিলোড করুন।

### যদি Live Server না থাকে
- `npx http-server .` (npm install -g http-server লাগতে পারে) রান করে `http://localhost:8080` খুলুন।

### Debugging Tip
- VS Code Run and Debug প্যানেলে `Chrome`/`Edge` debug profile দিয়ে breakpoint সেট করে `tsconfig` এর `sourceMap: true` রাখুন (ডিফল্ট true)।
