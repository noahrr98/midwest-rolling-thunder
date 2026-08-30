# Midwest Rolling Thunder

Marketing site for the club: who we are, the ride calendar, a photo wall from
past runs, and the clubhouse address and contact form.

Vite + React 19 + TypeScript + Tailwind v4 + Motion. No backend, no CMS, no
database — the whole site is static files, which is why it can be hosted for
free and why updating it means editing one file.

```bash
npm install
npm run dev      # http://localhost:5174
```

`npm run build` writes `dist/`. That folder is the entire website.

## Updating the site

Everything an officer needs to change lives in **`src/content.ts`**. Nothing
else has to be touched.

| To change | Edit in `src/content.ts` |
|---|---|
| Headline, stats, the "who we are" copy | `club`, `stats`, `about` |
| Officers | `officers` |
| Upcoming rides | `events` |
| Past-event photos | `gallery` |
| Clubhouse address, hours, phone, email | `contact` |

### Adding a ride

Copy an existing block in `events` and change the values. Dates are
`YYYY-MM-DD`. A ride moves from **Upcoming** to **Past** by itself the day
after it happens, so old rides do not need to be deleted — they become the
archive. Setting `signupUrl` swaps the "call the clubhouse" button for a
"sign up" button pointing at that link.

### Adding photos

Put the image files in `public/photos/`, then add entries to `gallery` with
`src: '/photos/toy-run-2026.jpg'`. Every photo needs an `alt` (what is in the
picture, for screen readers and for search) and a `caption` (what shows on
hover). Resize to roughly 1600px on the long edge before uploading — phone
photos are 5–8 MB each and will make the page crawl.

The photos currently in `gallery` are **grayscale placeholders** loaded from
picsum.photos. Replace all eight.

### Adding a phone number later

`contact.phone` is empty, so every phone link on the site is hidden — the
clubhouse block, the footer, and the form's failure message. Type a number into
that one field and all three come back. Same for `contact.socials`: add a row
and the link appears in the footer.

### The contact form

Out of the box the form opens the visitor's own mail app with the message
filled in and addressed to the clubhouse. That works with no server, but it
only works for visitors who have mail set up on their device.

To collect messages properly, sign up for a free form service (Formspree,
Basin, or Netlify Forms if you host there), then paste the endpoint into
`contact.formEndpoint`. The form starts POSTing to it immediately — nothing
else changes.

## Placeholder content to replace before launch

Real and confirmed: the clubhouse address (**305 SW State Rte 7, Pleasant Hill,
MO 64080**), the email (**mrt.phmo@gmail.com**), and the Facebook page.
Everything below is still invented and needs the club's real details:

1. All four officers and their road names
4. The four events in `events`
5. The eight placeholder photos
6. The stats (`$318,400`, `140`, `41`) and the founding year
7. The Facebook and Instagram links in `contact.socials`, which currently point
   at the sites' homepages

## The logo

`public/logo.png` was made from the club patch: cropped square, masked to a
circle, and given a transparent background so it sits on the dark page without
a black box around it. The source is kept beside it as
`public/logo-original.jpeg`.

The source image is only about 290px across, so the large patch in the hero is
being upscaled. If there is a higher-resolution original — a vector file from
whoever made the patch, or a large PNG — drop it in as `public/logo.png` and
the hero gets noticeably sharper. Keep it square with a transparent background.

If `logo.png` is ever missing, the site falls back to an "MRT" wordmark rather
than showing a broken image.

## Hosting

`npm run build`, then drag `dist/` onto Netlify, Vercel, or Cloudflare Pages.
All three have a free tier that covers a club site. Point the club's domain at
whichever one you pick.

## Notes for future work

- Port **5174** is reserved for this project in the workspace port table
  (`../CLAUDE.md`). Do not move it without updating that table.
- `src/content.ts` is the only file that should need editing for routine
  updates. If a change requires touching a component, that is a sign the
  content model is missing a field — add the field rather than hard-coding.
- Section order and anchors: `#top`, `#about`, `#events`, `#gallery`,
  `#contact`. The nav and the in-page links depend on those ids.
