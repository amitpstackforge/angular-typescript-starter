# 02) Forms, validation & ARIA — admit + billing details

**কি শিখবেন**
- Required vs optional ফিল্ড নির্দেশ করা এবং কিভাবে।
- Inline validation বার্তা + `aria-live` রিজিয়ন।
- Input types (`email`, `tel`, `number`, `date`) সুবিধা ও মোবাইল কিবোর্ড।

**Code**
```html
<form id="admit-form" novalidate>
  <div>
    <label for="email">Email (billing)</label>
    <input id="email" type="email" name="email" required />
    <small class="hint">We send invoices here.</small>
  </div>
  <div>
    <label for="phone">Contact</label>
    <input id="phone" type="tel" name="phone" pattern="\\d{10}" required aria-describedby="phone-hint" />
    <small id="phone-hint">10-digit number</small>
  </div>
  <div>
    <label for="admit-date">Admit date</label>
    <input id="admit-date" type="date" name="admitDate" required />
  </div>
  <button type="submit">Submit</button>
  <div id="status" aria-live="polite"></div>
</form>

<script>
const form = document.querySelector('#admit-form');
const status = document.querySelector('#status');

form.addEventListener('submit', e => {
  e.preventDefault();
  if (!form.checkValidity()) {
    status.textContent = 'Fix errors before submit';
    status.style.color = 'crimson';
  } else {
    status.textContent = 'Admitted!';
    status.style.color = 'green';
  }
});
</script>
```

**Interview takeaways**
- `novalidate` দিয়ে ব্রাউজার ডিফল্ট এরর বন্ধ করে কাস্টম UI দিতে পারেন, কিন্তু `required`/`pattern` এখনও `checkValidity()` এ কাজ করে।
- `aria-live` polite/ assertive ব্যবহার করে এরর/সাকসেস স্ক্রিন রিডারে জানান।
- সঠিক input type মোবাইল UX ও validation সহজ করে (number keypad, email keyboard ইত্যাদি)।

**আরো উদাহরণ (beginner → advanced)**
1) Beginner — required + placeholder
```html
<input type="text" required placeholder="P-101" />
```
2) Beginner — fieldset/legend গ্রুপিং
```html
<fieldset>
  <legend>Consent</legend>
  <label><input type="radio" name="consent" value="yes" required /> Yes</label>
  <label><input type="radio" name="consent" value="no" /> No</label>
</fieldset>
```
3) Intermediate — inline error message
```html
<input id="phone" pattern="\\d{10}" required />
<p id="err" role="alert" hidden>10-digit only</p>
<script>
const i = phone, e = err;
i.addEventListener('input', () => {
  e.hidden = i.checkValidity();
});
</script>
```
4) Intermediate — date + min max
```html
<input type="date" min="2026-02-01" max="2026-12-31" />
```
5) Advanced — form data to JSON (vanilla)
```html
<form id="f"><input name="pid" /><button>Save</button></form>
<script>
f.addEventListener('submit', ev => {
  ev.preventDefault();
  const data = Object.fromEntries(new FormData(f));
  console.log(JSON.stringify(data));
});
</script>
```

**Try it**
- Patient ID এর জন্য `pattern="P-\\d{3}"` দিন; ইনভ্যালিড হলে লাল বার্তা দেখান।
- Consent checkbox না থাকলে submit বন্ধ করুন এবং `aria-live` এ বার্তা দেখান।
- Form reset বোতাম যোগ করে `status` ক্লিয়ার করুন।  
