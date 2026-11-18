# How This Portfolio Works

A guide to the workflow of this website, written for someone who already knows **plain HTML, CSS and JavaScript**. It explains how the pages, buttons, navigation and styling are built, and how each file supports the others.

> To create the project from scratch, see [SETUP.md](SETUP.md). This file explains what happens *after* setup.

---

## 1. The big picture

### Plain HTML website
```
index.html   about.html   projects.html  ...   one file per page
style.css    script.js                         shared styles and behavior
```
Clicking a link makes the browser **load a whole new HTML file**. The navbar and footer are copied into every page.

### This React website
```
index.html          ONE page, almost empty:  <div id="root"></div>
src/main.tsx        starts the app
src/App.tsx         decides which "page" to show for each URL
src/pages/*.tsx     the pages
src/components/*    pieces reused on many pages (navbar, footer ...)
src/data/site.ts    all your text and links, in one place
```
There is **only one real HTML page**. JavaScript builds everything you see inside `<div id="root">`. Clicking a link doesn't load a new file: JavaScript swaps the content and changes the address bar. This is called a **single-page app (SPA)**.

---

## 2. Translating what you already know

| In plain HTML / CSS / JS | In this project |
|---|---|
| A `.html` file per page | A **page component** in `src/pages/` (a function that returns HTML-like code) |
| Copy-pasting the navbar into every page | One `Navbar` **component**, used once in `Layout` |
| `<a href="about.html">` | `<Link to="/about">` (no page reload) |
| `class="..."` | `className="..."` |
| Writing the same card 6 times | An **array** of data and `.map()` that draws one card per item |
| Variables that change, then you update the DOM by hand | **State** (`useState`): change the value and React redraws for you |
| `addEventListener('click', ...)` | `onClick={...}` right on the element |
| `window.onload` / `DOMContentLoaded` | `useEffect(() => {...}, [])` |
| `<script src="other.js">` | `import ... from './other'` |
| Your own CSS file with class names | **Tailwind**: small ready-made classes written on the element |
| `.tsx` / TypeScript | JavaScript with types: it warns you about mistakes before you run the code |

### What is JSX / TSX?
The HTML-looking code inside `.tsx` files is **JSX**. It's JavaScript that produces HTML:

```tsx
function Greeting() {
  const name = 'Hubert'
  return <h1 className="text-4xl">Hi, {name}</h1>   // {} = run JavaScript here
}
```
Rules to remember:
- A component name starts with a **capital letter** (`Navbar`) and is used like a tag: `<Navbar />`.
- `class` is written `className`.
- Every tag must be closed (`<img />`, not `<img>`).
- A component returns **one** parent element (or a wrapper `<>...</>`).

---

## 3. Folder map: what each file does

```
Hubert-Portfolio/
├── index.html                 The only HTML page. Fonts, theme script, <div id="root">.
├── netlify.toml / vercel.json Hosting rules (explained in section 11)
├── vite.config.ts             Build tool setup (React + Tailwind plugins)
├── public/                    Files served as they are: photos, favicon.svg
└── src/
    ├── main.tsx               START: mounts the app into #root
    ├── App.tsx                ROUTES: which page shows for which URL
    ├── index.css              STYLES: Tailwind import, theme colors, scroll animation
    │
    ├── components/            Reusable pieces
    │   ├── Layout.tsx         Frame around every page: Navbar + page + Footer
    │   ├── Navbar.tsx         Top bar: logo, page links, theme toggle, mobile menu
    │   ├── Footer.tsx         Bottom bar: about text, quick links, social icons
    │   ├── ThemeToggle.tsx    Sun/moon button for light and dark mode
    │   ├── SocialLinks.tsx    The GitHub, LinkedIn, Instagram, WhatsApp icons
    │   ├── PageHeader.tsx     The big title block at the top of inner pages
    │   └── Reveal.tsx         Fade-in-on-scroll wrapper
    │
    ├── pages/                 One file per page (URL)
    │   ├── Home.tsx           /            hero, skills strip, "Explore" cards
    │   ├── About.tsx          /about
    │   ├── Experience.tsx     /experience
    │   ├── Projects.tsx       /projects
    │   ├── Skills.tsx         /skills
    │   ├── Gallery.tsx        /gallery     photo grid + pop-up
    │   └── Contact.tsx        /contact
    │
    ├── data/site.ts           ALL CONTENT: name, links, skills, experience, projects, photos
    └── utils/formatDate.ts    Small helper: '2026-03-12' -> '12 March 2026'
```

---

## 4. What happens when someone opens the site

```
Browser asks for the site
        │
        ▼
index.html loads
  ├─ the tiny script in <head> picks light/dark mode (before anything is drawn)
  ├─ Google Fonts load
  └─ <div id="root"></div>  (empty) and  <script src="/src/main.tsx">
        │
        ▼
main.tsx   ── finds #root and draws <App /> inside it,
              wrapped in <BrowserRouter> (this watches the address bar)
        │
        ▼
App.tsx    ── looks at the URL and chooses a route:
              "/"        -> Home
              "/about"   -> About   ... and so on
        │
        ▼
Layout.tsx ── draws Navbar + [chosen page] + Footer
        │
        ▼
The page   ── reads text from data/site.ts and draws its sections
```

`main.tsx`, in short:
```tsx
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>   {/* makes navigation work */}
      <App />
    </BrowserRouter>
  </StrictMode>,
)
```

---

## 5. Pages and navigation

### 5.1 The route table ([App.tsx](src/App.tsx))
```tsx
<Routes>
  <Route element={<Layout />}>                      {/* shared frame */}
    <Route index element={<Home />} />              {/* "/"        */}
    <Route path="about" element={<About />} />      {/* "/about"   */}
    <Route path="experience" element={<Experience />} />
    <Route path="projects" element={<Projects />} />
    <Route path="skills" element={<Skills />} />
    <Route path="gallery" element={<Gallery />} />
    <Route path="contact" element={<Contact />} />
    <Route path="*" element={<Home />} />           {/* any unknown URL */}
  </Route>
</Routes>
```
This table does the job of "one `.html` file per page". Each line says: **when the URL is X, show component Y**.

### 5.2 The shared frame ([Layout.tsx](src/components/Layout.tsx))
```tsx
<Navbar />
<main>
  <Outlet />     {/* <- the chosen page appears HERE */}
</main>
<Footer />
```
`<Outlet />` is a placeholder. Open `/about` and it becomes `<About />`; open `/projects` and it becomes `<Projects />`. The navbar and footer are written **once** and never reloaded, which replaces copy-pasting them into every HTML file. Layout also scrolls to the top whenever the URL changes.

### 5.3 Links without page reloads
```tsx
<Link to="/about">About</Link>          // like <a href="/about">, but no reload
<NavLink to="/about" className={...}>   // same, and knows if it is the CURRENT page
```
- `Link` changes the address bar and swaps the page component. The browser never reloads, so the site feels instant.
- `NavLink` is used in the navbar. It tells you if the link matches the current URL (`isActive`), which is how the current page gets a highlighted pill.
- Use a normal `<a href>` only for **outside** links (GitHub, LinkedIn, `mailto:`, `tel:`).

### 5.4 Back and forward buttons
Because the router updates the browser's history, the back and forward buttons work as normal.

---

## 6. Buttons and what they do

Every "button" is one of two kinds:

| Looks like a button, goes to another page | Really does something in the page |
|---|---|
| `<Link to="/projects" className="...">View Portfolio</Link>` | `<button onClick={...}>` |

| Button | Where | What happens |
|---|---|---|
| **View Portfolio**, **Contact Me**, **Let's Talk**, card **Explore** | Home, Navbar | `Link`: goes to a page |
| **Hamburger** (phone) | Navbar | `onClick` flips the `open` state, so the menu shows or hides |
| **Sun / moon** | Navbar | `onClick` switches the theme and saves it (section 8) |
| **Gallery photo** | Gallery | `onClick` stores which photo is open, so the pop-up appears |
| **X / arrows** in pop-up | Gallery | Close or move to the next or previous photo |
| **Social icons** | Footer, Contact | Normal `<a href>` to outside sites |

### Example: the phone menu, plain JS versus React
**Plain JS**
```js
const btn = document.querySelector('#menu-btn')
const menu = document.querySelector('#menu')
btn.addEventListener('click', () => menu.classList.toggle('hidden'))
```

**React** (in [Navbar.tsx](src/components/Navbar.tsx))
```tsx
const [open, setOpen] = useState(false)          // memory: is the menu open?

<button onClick={() => setOpen(o => !o)}>...</button>   // flip it on click

{open && <div>...menu links...</div>}              // draw the menu ONLY if open is true
```
You never touch the DOM. You change the **state**, and React redraws what depends on it. This idea, **state drives what's on screen**, is the biggest difference from plain JavaScript.

---

## 7. How one file feeds another

### 7.1 Imports are your `<script>` and `<link>` tags
```tsx
import Navbar from './Navbar'                  // another component
import { navLinks, profile } from '../data/site'   // data from site.ts
import { LuMenu } from 'react-icons/lu'        // an icon from a package
```
`../` means "go up one folder". `import` is how a file asks another file for something. The other file shares it with `export`.

### 7.2 Dependency map (who uses whom)
```
main.tsx ──► App.tsx ──► Layout.tsx ──┬─► Navbar.tsx ──► ThemeToggle.tsx
                │                      │                └► data/site.ts (links, name)
                │                      ├─► <page>  ──┬─► PageHeader.tsx ─► Reveal.tsx
                │                      │             ├─► Reveal.tsx
                │                      │             ├─► SocialLinks.tsx ─► data/site.ts
                │                      │             └─► data/site.ts
                │                      └─► Footer.tsx ──┬─► SocialLinks.tsx
                │                                       └─► data/site.ts
                └► pages/*.tsx
index.css ◄── imported once by main.tsx, styles everything
```

### 7.3 `site.ts` is your "database"
All of your text lives in [src/data/site.ts](src/data/site.ts) as plain data:

```ts
export const experience = [
  { role: 'Co-founder', org: 'JEHE TECH Co', period: 'Present', text: '...' },
  // add another { ... } here
]
```
and [Experience.tsx](src/pages/Experience.tsx) draws one block per item:

```tsx
{experience.map((e) => (
  <li key={e.role}>
    <p>{e.period}</p><h3>{e.role}</h3><p>{e.org}</p><p>{e.text}</p>
  </li>
))}
```
**Data change in one file, screen change in another.** Adding one entry to the list adds one block on the page, with its blue bullet, and you never edit the page file.

The same pattern is used for:
| Data in `site.ts` | Shown by |
|---|---|
| `profile` (name, title lines, pitch) | Home hero, Navbar logo, Footer, About, Contact |
| `navLinks` | Navbar and Footer quick links |
| `skills` | Home skills strip, Skills page, Footer text |
| `experience` | Experience page |
| `projects` | Projects page |
| `gallery` | Gallery grid and pop-up |
| `socials` | `SocialLinks`, used in Footer and Contact |

### 7.4 Props: passing values into a component
A component is like a function, and **props** are its arguments:
```tsx
<PageHeader eyebrow="Skills" title="What I bring" text="..." />   // the call (in Skills.tsx)

function PageHeader({ eyebrow, title, text }) { ... }             // the definition
```
Write `PageHeader` once, use it on every inner page with different text.

---

## 8. Styling

### 8.1 Tailwind: classes instead of a CSS file
```tsx
<h1 className="text-4xl font-bold text-fg">
```
Each class is one small CSS rule that already exists:
`text-4xl` = big font, `font-bold` = bold, `text-fg` = the main text color. Common ones used here:

| Class | Meaning | Plain CSS |
|---|---|---|
| `flex items-center gap-3` | row, centered, spaced | `display:flex; align-items:center; gap:12px` |
| `grid sm:grid-cols-2 lg:grid-cols-3` | 1 column, 2 on small screens, 3 on large | grid plus `@media` queries |
| `rounded-2xl border border-line` | rounded corners and a border | `border-radius` and `border` |
| `hover:bg-tint-2` | background changes on hover | `:hover { ... }` |
| `md:hidden` | hidden from the `md` breakpoint up | `@media (min-width:768px){display:none}` |
| `p-6`, `mt-4`, `px-6` | padding and margin | `padding`, `margin` |

Prefixes such as `sm:`, `md:`, `lg:` make the layout **responsive** (they work like `@media` queries). A class with no prefix applies on phones first.

### 8.2 Theme colors and light/dark mode
In [index.css](src/index.css) the colors are **CSS variables**, the same ones you'd write in plain CSS:

```css
:root                  { --ink: #f4f7ff; --fg: #0b1530; ... }   /* light mode */
:root[data-theme="dark"], .theme-dark
                       { --ink: #070d1f; --fg: #ffffff; ... }   /* dark mode */
```
Then Tailwind names are linked to them (`bg-ink`, `text-fg`, `border-line`). So a class like `text-fg` automatically becomes navy in light mode and white in dark mode.

How the mode is chosen:
1. A small script in [index.html](index.html) runs **before the page draws**. It reads the saved choice, or else the device setting, and sets `<html data-theme="dark|light">`.
2. [ThemeToggle.tsx](src/components/ThemeToggle.tsx) flips that attribute when you click the sun/moon, and saves it in `localStorage`.
3. The CSS above reacts to the attribute and every color on the site changes.

The **footer** has the class `theme-dark`, so it uses the dark colors (navy) even when the rest of the site is light.

---

## 9. Section by section

### Navbar ([Navbar.tsx](src/components/Navbar.tsx))
- `sticky top-0` keeps it at the top while you scroll. Its background is solid, so content stops at its bottom edge.
- The links come from the `navLinks` list in `site.ts`, drawn with `.map()`.
- On large screens the link pill shows (`hidden md:flex`). On phones the hamburger shows (`md:hidden`) and opens the menu.

### Home ([Home.tsx](src/pages/Home.tsx)) has four parts
1. **Hero**: your photo in an oval (`aspect-[3/4]` plus `rounded-[50%]` makes the ellipse, `object-cover` crops the photo to fit), next to the text and two buttons.
2. **Skills strip**: the `skills` list drawn as pills.
3. **"Explore more about me" cards**: a `cards` list defined at the top of the file (title, motivational text, link, icon), drawn as clickable cards.
4. Footer comes from `Layout`.

### Inner pages (About, Experience, Projects, Skills, Contact)
All follow one recipe: `<PageHeader ... />` for the title, then a section that draws data from `site.ts`.

### Footer ([Footer.tsx](src/components/Footer.tsx))
Three columns (`md:grid-cols-3`): your name and summary, quick links, social icons. It reuses `navLinks`, `skills` and `SocialLinks`, so it never needs separate editing.

### Fade-in on scroll ([Reveal.tsx](src/components/Reveal.tsx))
Wrapping anything in `<Reveal>` makes it fade up when it scrolls into view. Under the hood it's the plain JS you may know: an `IntersectionObserver` adds the class `is-visible`, and the CSS in `index.css` handles the transition.

### Gallery ([Gallery.tsx](src/pages/Gallery.tsx))
```
Grid of photos ──click──► setActive(index) ──► the pop-up <Post /> appears over the page
                                                 ├─ Esc / X / click outside ──► setActive(null) closes it
                                                 └─ arrows / buttons ─────────► next or previous photo
```
- The pop-up is **not a new page**. It's a component drawn on top of the Gallery page when the state `active` holds a photo number, and removed when `active` is `null`.
- While it's open, the page behind can't scroll (`document.body.style.overflow = 'hidden'`).
- Each photo's details (title, caption, date, location, tags) come from the `gallery` list. Anything left empty is simply not drawn.

---

## 10. Common tasks: where to edit

| I want to... | Edit |
|---|---|
| Change my name, title lines, email, phone | `profile` in [site.ts](src/data/site.ts) |
| Add an experience, project, skill | The matching list in `site.ts` |
| Add a gallery photo | Put the file in `public/`, add `{ src: '/file.jpeg', ... }` to `gallery` in `site.ts` |
| Change colors | The variables at the top of [index.css](src/index.css) |
| Change the About text | [About.tsx](src/pages/About.tsx) |
| Change the Explore cards on Home | The `cards` list at the top of [Home.tsx](src/pages/Home.tsx) |
| Add a menu link | `navLinks` in `site.ts` (plus a page, below) |

### Add a new page, for example "Blog"
1. Create `src/pages/Blog.tsx` that exports a component:
   ```tsx
   import PageHeader from '../components/PageHeader'
   export default function Blog() {
     return <PageHeader eyebrow="Blog" title="Writing" text="My notes." />
   }
   ```
2. Register it in `App.tsx`: `import Blog from './pages/Blog'` and `<Route path="blog" element={<Blog />} />`.
3. Add `{ label: 'Blog', to: '/blog' }` to `navLinks` in `site.ts`. The Navbar and Footer pick it up automatically.

---

## 11. Development and deployment

### Daily commands
```bash
npm run dev      # start the local site, reloads when you save a file
npm run build    # check types and create the final site in dist/
```

### How the build relates to the files you edit
- You write `.tsx` and TypeScript. Browsers can't read that directly.
- **Vite** converts it during `npm run build` into a few plain `.html`, `.css` and `.js` files in `dist/`.
- Netlify and Vercel just serve that `dist/` folder. There is no server running your code.

### Why `netlify.toml` and `vercel.json` exist
There's only one real HTML file, but the site has many URLs (`/about`, `/gallery`). If someone refreshes on `/about`, the host looks for an `about` file and finds nothing. These files tell the host: **for any URL, send `index.html`**. Then the router reads the URL and shows the right page.

---

## 12. Quick vocabulary

| Word | Meaning |
|---|---|
| **Component** | A reusable function that returns HTML-like code (`Navbar`, `Footer`) |
| **Page** | A component linked to a URL (`Home`, `About`) |
| **Props** | Values you pass into a component, like function arguments |
| **State** | A remembered value; when it changes, the screen updates |
| **Hook** | A function starting with `use` (`useState`, `useEffect`) |
| **Router** | The part that matches URLs to pages without reloading |
| **JSX / TSX** | HTML-like syntax inside JavaScript / TypeScript |
| **Build** | Turning your source files into plain files browsers understand |
| **SPA** | Single-page app: one HTML file, JavaScript swaps the content |
