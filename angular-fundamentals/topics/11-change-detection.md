# 11) Change Detection + OnPush

- Default strategy: সব binding path dirty-check; বেশি কাজ → পারফ হিট।
- OnPush: Input reference change, observable async pipe, event, markForCheck ইত্যাদিতে update।

**হাসপাতাল উদাহরণ**
```ts
@Component({
  selector: 'hms-bed-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <li *ngFor="let bed of beds">{{ bed.id }} - {{ bed.status }}</li>
    <button (click)="refresh()">Refresh</button>
  `,
})
export class BedListComponent {
  beds = this.bedService.beds$; // Observable + async pipe in template
  constructor(public bedService: BedService) {}
  refresh() { this.bedService.reload(); }
}
```

**Tips**
- Immerse: ফাংশনের ভিতরে array push না করে নতুন array assign করুন।
- Async pipe auto-unsubscribe; OnPush এর সাথে ভালো কাজ করে।

**Interview Q**
- markForCheck বনাম detectChanges?
- OnPush + mutable object pitfalls?

## Tailwind-ready HMS examples (OnPush)
1) **Async pipe list**  
```html
<ul>
  <li *ngFor="let bed of beds$ | async" class="py-1">{{ bed.id }} - {{ bed.status }}</li>
></ul>
```
2) **Immutable update pattern**  
```ts
this.beds$ = this.beds$.pipe(map(list => [...list, newBed]));
```
3) **Manual refresh button**  
```html
<button class="btn w-auto px-3 py-2" (click)="refresh()">Refresh</button>
```
4) **TrackBy performance**  
```html
<li *ngFor="let p of patients$ | async; trackBy: trackById" class="py-2 border-b">{{p.name}}</li>
```
5) **ChangeDetectionStrategy.OnPush declaration**  
```ts
@Component({ changeDetection: ChangeDetectionStrategy.OnPush, ... })
```

**UI test hint**: Patients observable আপডেট করতে service থেকে নতুন array emit করুন; OnPush হওয়ায় async pipe UI আপডেট হবে। TrackBy থাকলে ngFor DOM key স্থির আছে কিনা Elements-এ দেখুন।

## কীভাবে VS Code + Chrome এ দ্রুত চালাবেন
1) `ng new hms-demo --standalone --routing --style=scss` → `cd hms-demo`
2) কম্পোনেন্টে `changeDetection: ChangeDetectionStrategy.OnPush` সেট করুন; Observable data expose করুন।
3) Template এ async pipe list/refresh/trackBy স্নিপেট পেস্ট করুন।
4) Tailwind CDN যোগ করে `ng serve`; service থেকে data replace করলে UI আপডেট হচ্ছে কিনা এবং DOM reuse (TrackBy) হচ্ছে কিনা Chrome Elements এ যাচাই করুন।

## সম্পূর্ণ রানযোগ্য ডেমো (সব টপিক টেস্ট করুন)
1) `ng new hms-demo --standalone --routing --style=scss` → `cd hms-demo`
2) `angular-fundamentals/demos/hms-appointments/*` → `src/app/` কপি।
3) Tailwind CDN: `src/index.html` এ `<script src="https://cdn.tailwindcss.com"></script>`
4) `ng serve`; `/patients` ও `/appointments` পেজে async pipe + OnPush আপডেট ও trackBy আচরণ দেখুন (Elements প্যানেল DOM নোড স্টেবল থাকে)।

## পূর্ণ রানযোগ্য ন্যূনতম কোড (OnPush + async pipe)
**ট্রি**
```
src/app/app.component.ts
src/app/app.component.html
```

**app.component.ts**
```ts
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

interface Bed { id: string; status: 'Free' | 'Occupied'; }

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
})
export class AppComponent {
  private bedsSubject = new BehaviorSubject<Bed[]>([
    { id: 'B1', status: 'Occupied' },
    { id: 'B2', status: 'Free' },
  ]);
  beds$ = this.bedsSubject.asObservable();

  refresh() {
    this.bedsSubject.next([
      { id: 'B1', status: 'Occupied' },
      { id: 'B2', status: 'Free' },
      { id: 'B3', status: 'Free' },
    ]);
  }

  trackById(_i: number, item: Bed) { return item.id; }
}
```

**app.component.html**
```html
<div class="p-4 space-y-3">
  <button class="btn w-auto px-3 py-2" (click)="refresh()">Refresh beds</button>
  <ul>
    <li *ngFor="let bed of beds$ | async; trackBy: trackById" class="py-1">
      {{ bed.id }} - {{ bed.status }}
    </li>
  </ul>
  <p class="text-xs text-slate-500">OnPush + async pipe + trackBy</p>
</div>
```

**Run**: `ng serve` → Refresh ক্লিক করলে নতুন আইটেম যোগ হয়; OnPush থেকেও UI আপডেট হবে, trackBy ফলে DOM স্থির থাকে।
