# 09) HttpClient + Interceptor (JWT, error)

- HttpClient observable রিটার্ন করে; টাইপ যোগ করুন `http.get<ApiResponse<Patient[]>>()`.
- Interceptor: request/response pipeline; JWT attach, global error/logging।

**JWT attach interceptor**
```ts
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('token');
    const authReq = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;
    return next.handle(authReq).pipe(
      catchError(err => {
        console.error('API error', err);
        return throwError(() => err);
      })
    );
  }
}
```

**Provider (standalone bootstrap)**
```ts
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([authInterceptorFn]))
  ]
});
```

**Fake hospital API**
- GET patients: `https://dummyjson.com/users?limit=5`
- POST appointment: `https://jsonplaceholder.typicode.com/posts`

**Interview Q**
- Interceptor order? (provider array order)
- clone vs mutate request difference?

## Tailwind-ready HMS examples (Http + Interceptor)
1) **Loading bar**  
```html
<div *ngIf="loading" class="h-1 bg-blue-200">
  <div class="h-full w-1/3 bg-blue-600 animate-pulse"></div>
</div>
```
2) **Error toast**  
```html
<div *ngIf="error" class="mt-2 inline-flex items-center gap-2 rounded bg-rose-50 px-3 py-2 text-rose-700">
  ⚠️ {{ error }}
</div>
```
3) **JWT badge**  
```html
<span class="text-xs text-slate-500">Token: {{ token ? 'set' : 'missing' }}</span>
```
4) **HTTP call button**  
```html
<button class="btn" (click)="refresh()">Reload patients</button>
```
5) **TS snippet with interceptor fn**  
```ts
export const authInterceptorFn: HttpInterceptorFn = (req,next)=> {
  const token = localStorage.getItem('token');
  return next(token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req);
};
```
