# 10) RxJS basics (switchMap, debounce)

- Observable vs Promise
- Operators: map, filter, tap, switchMap, debounceTime, catchError

**হাসপাতাল সার্চ উদাহরণ**
```ts
search$ = new FormControl('');
results$ = this.search$.valueChanges.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap(term => this.http.get<any>(`https://dummyjson.com/users/search?q=${term}`)),
  map(res => res.users)
);
```

**Try it**
- `catchError` যোগ করে error হলে খালি array রিটার্ন করুন।
- `finalize` দিয়ে loading false সেট করুন।

## Tailwind-ready HMS examples (RxJS)
1) **Search input + results**  
```html
<input class="input" [formControl]="search$" placeholder="Search patient" />
<ul class="divide-y divide-slate-200">
  <li *ngFor="let p of results$ | async" class="py-2 flex justify-between">
    <span>{{p.firstName}} {{p.lastName}}</span><span class="text-xs text-slate-500">{{p.email}}</span>
  </li>
</ul>
```
2) **Loading indicator with finalize**  
```html
<div *ngIf="loading" class="text-sm text-slate-500">Loading...</div>
```
3) **switchMap snippet**  
```ts
results$ = this.search$.valueChanges.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap(term => this.http.get<any>(`https://dummyjson.com/users/search?q=${term || 'a'}`)),
  map(r => r.users ?? [])
);
```
4) **debounce for button clicks**  
```ts
fromEvent(button,'click').pipe(debounceTime(300)).subscribe(() => save());
```
5) **Tailwind class helpers**  
```scss
.input { @apply w-full border rounded px-3 py-2; }
```

**UI test hint**: search inputে টাইপ করুন, Network ট্যাবে debounced call (dummyjson) হচ্ছে কিনা দেখুন; observable result আপডেট হলে তালিকা rerender হচ্ছে কিনা লক্ষ্য করুন। loading flag true করলে “Loading...” টেক্সট দেখুন।

## কীভাবে VS Code + Chrome এ দ্রুত চালাবেন
1) `ng new hms-demo --standalone --routing --style=scss` → `cd hms-demo`
2) কম্পোনেন্টে `imports:[CommonModule, ReactiveFormsModule, HttpClientModule]` যোগ করুন; TS এ search control + results$ কোড পেস্ট করুন।
3) Template এ input + তালিকা + loading টেক্সট স্নিপেট পেস্ট করুন।
4) Tailwind CDN যোগ করে `ng serve`; Chrome Network ট্যাবে debounced GET কল দেখুন, UI তে ফলাফল আপডেট নিশ্চিত করুন।

## সম্পূর্ণ রানযোগ্য ডেমো (সব টপিক টেস্ট করুন)
1) `ng new hms-demo --standalone --routing --style=scss` → `cd hms-demo`
2) `angular-fundamentals/demos/hms-appointments/*` → `src/app/` কপি।
3) Tailwind CDN: `src/index.html` এ `<script src="https://cdn.tailwindcss.com"></script>`
4) `ng serve`; `/patients` এ টাইপ করে RxJS debounce+switchMap ফলাফল, loading টেক্সট ও Network কল দেখুন।

## পূর্ণ রানযোগ্য ন্যূনতম কোড (RxJS + debounce ডেমো)
**ট্রি**
```
src/app/app.component.ts
src/app/app.component.html
```

**app.component.ts**
```ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  private http = inject(HttpClient);
  loading = false;
  search = new FormControl('', { nonNullable: true });

  results$ = this.search.valueChanges.pipe(
    startWith(''),
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(term => {
      this.loading = true;
      return this.http.get<any>(`https://dummyjson.com/users/search?q=${term || 'a'}`);
    }),
    map(res => { this.loading = false; return res.users ?? []; })
  );
}
```

**app.component.html**
```html
<div class="p-4 space-y-3">
  <input class="input" [formControl]="search" placeholder="Search patient" />
  <div *ngIf="loading" class="text-sm text-slate-500">Loading...</div>
  <ul class="divide-y divide-slate-200">
    <li *ngFor="let p of results$ | async" class="py-2 flex justify-between">
      <span>{{ p.firstName }} {{ p.lastName }}</span>
      <span class="text-xs text-slate-500">{{ p.email }}</span>
    </li>
  </ul>
</div>
```

**Run**: `ng serve` → টাইপ করলে debounced API কল; Network ট্যাবে দেখুন, তালিকা আপডেট দেখুন।
