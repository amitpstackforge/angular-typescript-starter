# Angular Fundamentals (বাংলা, হাসপাতাল ম্যানেজমেন্ট উদাহরণ)

TypeScript Core শেষ করে এখানে আসুন। এই সিরিজে Angular-এর ভিত্তি বিষয়গুলো হাসপাতাল ম্যানেজমেন্ট উদাহরণ দিয়ে শেখানো হয়েছে।

## কীভাবে ব্যবহার করবেন
1) `00-setup/vscode-angular-setup.md` দেখে Angular CLI + VS Code সেটআপ করুন।
2) নিচের টপিকগুলো ক্রমানুসারে পড়ুন ও কনসোল/ব্রাউজার উদাহরণ চালান।
3) হাতে-কলম অনুশীলনের জন্য `demos/hms-appointments` কম্পোনেন্ট ফাইলগুলো একটি নতুন Angular প্রকল্পে কপি করুন এবং `ng serve` চালান।

## টপিক লিস্ট
- [01) Angular architecture ও SPA ধারণা](topics/01-architecture.md)
- [02) Components & templates বেসিক](topics/02-components-templates.md)
- [03) Data binding ও directives](topics/03-binding-directives.md)
- [04) @Input/@Output ও কম্পোনেন্ট যোগাযোগ](topics/04-input-output.md)
- [05) Services & Dependency Injection](topics/05-services-di.md)
- [06) Standalone vs Module](topics/06-standalone-vs-module.md)
- [07) Routing + params + lazy intro](topics/07-routing.md)
- [08) Reactive Forms (hospital forms)](topics/08-forms-reactive.md)
- [09) HttpClient + Interceptor (JWT, error)](topics/09-http-interceptor.md)
- [10) RxJS basics (switchMap, debounce)](topics/10-rxjs-basics.md)
- [11) Change Detection + OnPush](topics/11-change-detection.md)
- [12) Guards & Resolvers](topics/12-guards-resolvers.md)
- [13) Components Deep (Input/Output, ViewChild, projection)](topics/13-components-deep.md)
- [14) Routing (Startup app mandatory, hospital flows)](topics/14-routing-startup.md)
- [15) Forms (Angular fresher interview killer topic)](topics/15-forms.md)

## Demo
- `demos/hms-appointments` এ Angular standalone কম্পোনেন্টের কোড আছে; Angular CLI প্রজেক্টে কপি করে চালান।

## প্রাক-প্রয়োজন
- Node.js 18+
- Angular CLI (বর্তমান LTS; উদাহরণ `npm install -g @angular/cli`)
- TypeScript Core টপিকগুলোর ধারণা
