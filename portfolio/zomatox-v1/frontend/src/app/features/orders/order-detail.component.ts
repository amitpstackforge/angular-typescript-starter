import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../core/api.service';
import { Order } from '../../core/models';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
  <a routerLink="/orders" class="text-sm underline">← Back</a>

  <div *ngIf="order()" class="mt-3 bg-white border rounded-xl p-4">
    <div class="flex items-center justify-between">
      <div class="text-xl font-bold">Order #{{order()!.id}}</div>
      <div class="text-sm px-2 py-1 rounded bg-slate-100">{{order()!.status}}</div>
    </div>

    <div class="mt-2 text-sm">
      Item total: ₹{{order()!.itemTotal}} <br/>
      Delivery fee: ₹{{order()!.deliveryFee}} <br/>
      <b>Payable: ₹{{order()!.payableTotal}}</b>
    </div>

    <h3 class="mt-4 font-semibold">Items</h3>
    <div *ngFor="let it of order()!.items" class="py-2 border-b last:border-b-0">
      <div class="font-medium">{{it.name}}</div>
      <div class="text-sm text-slate-600">₹{{it.price}} × {{it.qty}} = ₹{{it.lineTotal}}</div>
    </div>

    <h3 class="mt-4 font-semibold">Timeline</h3>
    <div *ngFor="let ev of events()" class="py-2 border-b last:border-b-0 text-sm">
      <div class="font-medium">{{ev.status}}</div>
      <div class="text-slate-600">{{ev.message}}</div>
      <div class="text-xs text-slate-500">{{ev.createdAt}}</div>
    </div>

    <div class="mt-4 flex gap-2">
      <button class="bg-black text-white rounded px-4 py-2" (click)="confirm('SUCCESS')">Mock Pay SUCCESS</button>
      <button class="border rounded px-4 py-2" (click)="confirm('FAIL')">Mock Pay FAIL</button>
    </div>

    <div *ngIf="msg()" class="mt-3 text-sm">{{msg()}}</div>
  </div>
  `,
})
export class OrderDetailComponent {
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);

  order = signal<Order | null>(null);
  events = signal<any[]>([]);
  msg = signal<string>('');

  private id = Number(this.route.snapshot.paramMap.get('id'));

  constructor() {
    this.reload();
  }

  reload() {
    this.api.order(this.id).subscribe(o => this.order.set(o));
    this.api.orderEvents(this.id).subscribe(evs => this.events.set(this.sortEventsByTime(evs)));
  }

  confirm(result: 'SUCCESS' | 'FAIL') {
    this.msg.set('');
    this.api.confirmPayment(this.id, result).subscribe({
      next: () => {
        this.msg.set('Payment updated: ' + result);
        this.reload();
      },
      error: e => this.msg.set(e?.error?.message ?? 'Failed'),
    });
  }

  private sortEventsByTime(events: any[]): any[] {
    return [...events].sort((a, b) => this.toEpoch(a.createdAt) - this.toEpoch(b.createdAt));
  }

  private toEpoch(value: string): number {
    const parsed = Date.parse(value);
    return Number.isNaN(parsed) ? 0 : parsed;
  }
}
