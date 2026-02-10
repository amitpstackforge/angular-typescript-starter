# TypeScript Core টিউটোরিয়াল (বাংলা, হাসপাতাল ম্যানেজমেন্ট উদাহরণ)

এই ফোল্ডার থেকে TypeScript-এর বেসিক থেকে ইন্টারমিডিয়েট পর্যন্ত core ধারণাগুলো বাংলায় বোঝানো হয়েছে। উদাহরণগুলো হাসপাতাল ম্যানেজমেন্ট (patient, doctor, billing) প্রসঙ্গ থেকে নেওয়া, যাতে ব্যবসায়িক ধারণা মাথায় রেখে TypeScript পড়া যায়।

## কীভাবে ব্যবহার করবেন
1. প্রথমে `00-setup/vscode-browser-setup.md` পড়ে VS Code + ব্রাউজারে রান সেটআপ করুন।
2. তারপর `topics` ফোল্ডারের নোটগুলো ক্রমানুসারে পড়ুন।
3. হাতে-কলম অনুশীলনের জন্য `demos/hospital-dashboard` রান করুন।

## টপিক লিস্ট (README.md এর TypeScript Core সেকশন অনুসারে)
- [01) type বনাম interface](topics/01-types-vs-interface.md)
- [02) union | এবং intersection &](topics/02-union-intersection.md)
- [03) optional ?, readonly](topics/03-optional-readonly.md)
- [04) Generics <T>](topics/04-generics.md)
- [05) enum বনাম string literal union](topics/05-enum-vs-literal.md)
- [06) any, unknown, never](topics/06-any-unknown-never.md)
- [07) null/undefined + strict mode](topics/07-null-undefined-strict.md)
- [08) classes + access modifiers + getter/setter](topics/08-classes-access-modifiers.md)
- [09) async/await + Promise basics](topics/09-async-await-promise.md)
- [10) Pharmacy scenario: inventory + literal unions](topics/10-pharmacy-inventory.md)
- [11) Lab scenario: report workflow + exhaustive checks](topics/11-lab-reports.md)
- [12) Tailwind UI স্নিপেট (HMS-ready)](topics/12-tailwind-hms-snippets.md)

## দ্রুত রিভিশন
- প্রতিটি ফাইলে ছোট ধারণা + উদাহরণ + interview প্রশ্ন আছে।
- ছোট exercise: প্রতিটি টপিক শেষে "Try it" অংশে hospital feature নিয়ে কিছু লিখতে বলা আছে।

## প্রাক-প্রয়োজন
- Node.js >= 18
- TypeScript (globally বা লোকাল dev dependency)
- VS Code + Live Server extension

## Demo
- `demos/hospital-dashboard` এ mini vanilla TS প্রজেক্ট আছে; সেখানে সব core কনসেপ্ট ব্যবহার করে ছোট ড্যাশবোর্ড তৈরি করা হয়েছে।
- `demos/angular-hospital-widget` এ একই লজিকের Angular standalone কম্পোনেন্ট, যাতে side-by-side তুলনা করা যায়।
