# 01) HTML semantics & basic a11y — hospital intake page

**কি শিখবেন**
- HTML5 ল্যান্ডমার্ক ট্যাগ (header/main/nav/section/footer) কেন জরুরি।
- ফর্ম ফিল্ডে label + `for` + `id`, `aria-describedby` দিয়ে এরর/হিন্ট সংযোগ।
- বেসিক লিস্ট/টেবিল সেম্যান্টিকস (patient list)।

**Code**
```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>CityCare Intake</title>
</head>
<body>
  <header>
    <nav aria-label="Primary">
      <a href="#intake">Intake</a>
      <a href="#beds">Beds</a>
      <a href="#pharmacy">Pharmacy</a>
    </nav>
  </header>

  <main id="intake">
    <h1>Patient Intake</h1>
    <p>Admit new patients and assign beds.</p>

    <form>
      <div>
        <label for="pid">Patient ID</label>
        <input id="pid" name="pid" required aria-describedby="pid-hint" />
        <small id="pid-hint">Format: P-101</small>
      </div>
      <div>
        <label for="bed">Bed</label>
        <select id="bed" name="bed" required>
          <option value="">Select</option>
          <option>ICU-1</option>
          <option>ICU-2</option>
        </select>
      </div>
      <div>
        <label>
          <input type="checkbox" name="consent" required />
          Consent signed
        </label>
      </div>
      <button type="submit">Admit</button>
    </form>

    <section id="beds" aria-labelledby="beds-heading">
      <h2 id="beds-heading">Bed Status</h2>
      <ul>
        <li><strong>ICU-1</strong> — P-11</li>
        <li><strong>ICU-2</strong> — Empty</li>
      </ul>
    </section>
  </main>

  <footer>
    <small>&copy; 2026 CityCare Hospital</small>
  </footer>
</body>
</html>
```

**Interview takeaways**
- ল্যান্ডমার্ক ট্যাগ স্ক্রিন রিডার নেভিগেশন সহজ করে; `<div>` এর বদলে `<main>/<nav>/<header>` ব্যবহার করুন।
- ফর্ম ফিল্ডে label + `id/for` বাধ্যতামূলক; `aria-describedby` দিয়ে হিন্ট/এরর যুক্ত করুন।
- List বা টেবিল ডেটা উপস্থাপন করতে সঠিক সেম্যান্টিক ট্যাগ ব্যবহার করুন—এতে a11y + SEO দুটোই লাভবান।

**আরো উদাহরণ (beginner → advanced)**
1) Beginner — মিনিমাল ল্যান্ডমার্ক
```html
<header>CityCare</header>
<main><h1>Patients</h1></main>
<footer>&copy; 2026</footer>
```
2) Beginner — label/for ও hint
```html
<label for="pname">Name</label>
<input id="pname" />
<small id="pname-hint">Full legal name</small>
```
3) Intermediate — definition list for vitals
```html
<dl>
  <dt>Heart Rate</dt><dd>88</dd>
  <dt>SpO2</dt><dd>96%</dd>
</dl>
```
4) Intermediate — table with caption
```html
<table>
  <caption>Bed Status</caption>
  <thead><tr><th>Bed</th><th>Status</th></tr></thead>
  <tbody>
    <tr><td>ICU-1</td><td>Occupied</td></tr>
    <tr><td>ICU-2</td><td>Empty</td></tr>
  </tbody>
</table>
```
5) Advanced — visually hidden text for icon buttons
```html
<button aria-label="Open pharmacy panel">
  <svg aria-hidden="true" viewBox="0 0 16 16">...</svg>
</button>
```

**Try it**
- ফর্মে একটি “Symptoms” textarea যোগ করুন এবং `aria-describedby` দিয়ে হিন্ট দিন।
- `Beds` সেকশনকে টেবিল হিসেবে লিখুন (কলাম: Bed, Status, Last cleaned) সঠিক `<table>` সেম্যান্টিক দিয়ে।
- কিবোর্ড ট্যাব-অর্ডার চেক করুন; nav লিঙ্কে `:focus` স্টাইল যোগ করুন (অন্য ফাইলে CSS করে নিন)।  
