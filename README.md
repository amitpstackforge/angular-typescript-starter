নিচে **Angular + TypeScript interview crack করার জন্য (Beginner/B.Tech fresher, India startup)** একদম **স্টার্ট-টু-ফিনিশ টপিক লিস্ট + কীভাবে পড়বে + কী প্রশ্ন আসে**—সব **বাংলায়** দিলাম। এটা ধরে 2–4 সপ্তাহ সিরিয়াসলি করলে বেশিরভাগ fresher Angular interview cover হয়ে যাবে।

> নতুন: `ecmascript-core/` ফোল্ডারে ES1 → ES2024 (ES15) বাংলা নোট + হাসপাতাল উদাহরণ যোগ করা আছে—JS ফাউন্ডেশন ঝালিয়ে নিতে ব্যবহার করুন।  
> নতুন: **Angular-focused Frontend Roadmap (English)** দেখুন: `docs/roadmaps/angular.md`  
> নতুন: **Angular ফ্রন্টএন্ড রোডম্যাপ (বাংলা)** দেখুন: `docs/roadmaps/angular-roadmap-bn.md`

---

## 1) JavaScript/TypeScript বেসিক (Angular এর আগে MUST)

**TS না জানলে Angular ভেঙে পড়ে।**

### TypeScript Core

* `type` vs `interface`
* `union |` / `intersection &`
* `optional ?` / `readonly`
* `generics <T>` (Array<T>, Observable<T>, ApiResponse<T>)
* `enum` vs string literal union (`'ADMIN' | 'USER'`)
* `any` vs `unknown` vs `never`
* `null/undefined` + strict mode
* `classes`, `access modifiers` (public/private/protected), `get/set`
* `async/await`, Promise basics

**Startup প্রশ্ন**: “type vs interface কবে?”, “generic কেন দরকার?”, “unknown vs any?”

---

## 2) Angular Fundamentals (সবচেয়ে গুরুত্বপূর্ণ)

### Angular কীভাবে কাজ করে

* SPA কী, Angular architecture overview
* **Component**: template + class + styles
* **Module vs Standalone component** (আজকাল স্ট্যান্ডএলোন বেশি)
* **Template syntax**

  * interpolation `{{ }}`
  * property binding `[value]`
  * event binding `(click)`
  * two-way `[(ngModel)]`
* **Structural directives**: `*ngIf`, `*ngFor`, `ngSwitch`
* **Attribute directives**: `ngClass`, `ngStyle`

**Startup প্রশ্ন**: “binding types explain করো”, “*ngIf vs hidden?”

---

## 3) Components Deep (ইন্টারভিউতে সবচেয়ে বেশি আসে)

* **@Input / @Output** + EventEmitter
* **Parent-child communication**
* **ViewChild / ContentChild** বেসিক
* **Lifecycle hooks**

  * `ngOnInit`, `ngOnChanges`, `ngOnDestroy`
* **Change Detection**

  * Default vs `OnPush`
  * কখন OnPush use করবে
* **TrackBy** (ngFor performance)

**Startup প্রশ্ন**: “ngOnChanges কখন trigger হয়?”, “OnPush মানে কী?”

---

## 4) Routing (Startup app এ mandatory)

* Route config, `routerLink`, `router.navigate`
* **Route params** (`/users/:id`)
* Query params (`?tab=info`)
* **Guards**: AuthGuard (canActivate)
* Lazy loading (basic idea)
* 404 route (wildcard)

**Startup প্রশ্ন**: “guard কেন?”, “param vs query param?”

---

## 5) Forms (Angular fresher interview killer topic)

### Template-driven vs Reactive

Startup এ 90% **Reactive Forms**।

* `FormControl`, `FormGroup`, `FormArray`
* Validators: required, minLength, pattern
* Custom validator (phone/email etc.)
* `valueChanges`
* Form submit best practice
* Error message UI patterns

**Startup প্রশ্ন**: “Reactive form কেন better?”, “FormArray কোথায় use করো?”

---

## 6) HTTP + API Integration (Must)

* `HttpClient` basics (GET/POST/PUT/DELETE)
* Headers, params
* Response typing `Observable<ApiResponse<User>>`
* **Interceptor**

  * JWT token attach
  * global error handling
* Retry / timeout (basic)

**Startup প্রশ্ন**: “Interceptor কেন?”, “token attach কিভাবে?”

---

## 7) RxJS (Freshers সবচেয়ে ভয় পায়—কিন্তু startup সবচেয়ে বেশি দেখে)

**Minimum must know:**

* `Observable` vs `Promise`
* `subscribe`, `pipe`
* Operators:

  * `map`, `filter`, `tap`
  * `switchMap` (search typeahead)
  * `mergeMap` (parallel)
  * `concatMap` (serial)
  * `debounceTime`, `distinctUntilChanged`
  * `catchError`, `finalize`
* Unsubscribe:

  * `takeUntil` + Subject
  * async pipe

**Startup প্রশ্ন**: “switchMap কেন?”, “unsubscribe না করলে কী হয়?”

---

## 8) State Management (Fresher level)

Startup এ fresher জন্য:

* Service-based state (BehaviorSubject)
* `Subject` vs `BehaviorSubject`
* Component to component shared state
* (bonus) NgRx basic idea—না জানলেও চলবে, কিন্তু নাম শুনে রাখো

---

## 9) Angular Optimization & Best Practices (Startup impress)

* `OnPush`, `trackBy`
* `async` pipe usage
* smart/dumb components
* folder structure (feature-based)
* reusable components + shared module/design system

---

## 10) Testing (Fresher bonus, but startups like it)

* Unit test basics (Jasmine/Karma)
* Component test: create, click event, DOM expectation
* Service test with HttpTestingController

---

# Most Asked “Angular Fresher Interview” প্রশ্ন (বাংলায়)

1. Angular vs React difference?
2. Component কী? Module কী? Standalone কী?
3. Data binding কয় প্রকার?
4. Lifecycle hooks explain করো।
5. @Input/@Output use-case?
6. Reactive form কীভাবে বানাও? FormArray কী?
7. Observable vs Promise?
8. switchMap vs mergeMap difference?
9. Interceptor কী? কেন লাগে?
10. OnPush change detection কী?
11. Route guard কী?
12. unsubscribe না করলে কী সমস্যা?

---

# 2 সপ্তাহের স্টাডি প্ল্যান (Beginner Startup-focused)

### Week 1 (Core)

Day 1–2: TS basics + small exercises
Day 3–4: Angular components + binding + directives
Day 5: Lifecycle + Input/Output
Day 6: Routing + params + guard basics
Day 7: Reactive Forms + validation

### Week 2 (Interview-ready)

Day 8–9: HttpClient + Interceptor + error handling
Day 10–12: RxJS operators (switchMap, debounceTime, catchError)
Day 13: Optimization (OnPush, trackBy) + folder structure
Day 14: Mock interview Q&A + build a mini project

---

# 1টা Mini Project (Startup interview এ দেখানোর মতো)

**“Task Manager / Appointment Booking Lite”**

* List + Create + Edit + Delete (CRUD)
* Reactive form + validation
* Route: list → details (/tasks/:id)
* API integration (fake json server / mock service)
* Search with debounce + switchMap
* Token interceptor (fake token)
  এটা থাকলে fresher interview এ “প্র্যাক্টিক্যাল” vibe আসে।

---

আপনি চাইলে আমি আপনার জন্য **একটা “Angular Fresher Interview Question Bank (বাংলা + উত্তর + কোড)”** বানিয়ে দেব—**topic-wise** (TS, Components, Forms, RxJS, Routing) এবং সাথে **mini project starter code structure**ও দিয়ে  দেব।
