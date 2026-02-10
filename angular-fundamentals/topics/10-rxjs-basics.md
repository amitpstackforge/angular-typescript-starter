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
