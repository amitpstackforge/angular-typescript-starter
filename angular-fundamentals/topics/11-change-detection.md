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
