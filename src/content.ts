/* ---------------------------------------------------------------------------
 * EDIT THIS FILE TO UPDATE THE SITE.
 *
 * Everything a club officer needs to change lives here: the ride calendar,
 * the photo wall, the clubhouse address, the contact details, the officers.
 * Nothing else in the project needs to be touched to keep the site current.
 *
 * All of the values below are PLACEHOLDERS. Replace them with the club's real
 * details before the site goes live.
 * ------------------------------------------------------------------------- */

export type Event = {
  /** Any unique string. Used as a React key and as the deep link (#ride-<id>). */
  id: string
  title: string
  /** YYYY-MM-DD. Rides move from "Upcoming" to "Past" automatically at midnight. */
  date: string
  /** Optional second day for weekend runs. YYYY-MM-DD. */
  endDate?: string
  /** Free text — "Kickstands up 9:00 AM" reads better than a bare time. */
  time: string
  /** Where riders meet. */
  location: string
  city: string
  /** One or two sentences. What the ride is and who it helps. */
  blurb: string
  /** Short label shown as a pill. Keep to a handful of repeated values. */
  tag: string
  /** What it costs to ride. Use 'Free' or 'No charge' when it is. */
  cost: string
  /** Optional. Adds a "Sign up" button to the ride when present. */
  signupUrl?: string
}

export type Photo = {
  /** '/photos/name.jpg' for a file in public/photos, or a full URL. */
  src: string
  /** What is actually in the picture. Screen readers and search engines read this. */
  alt: string
  /** Shown on hover and under the photo in the lightbox. */
  caption: string
  /** Optional. Omit it and no year is shown rather than a wrong one. */
  year?: string
}

export type Officer = {
  name: string
  roadName: string
  role: string
}

export const club = {
  name: 'Midwest Rolling Thunder',
  shortName: 'MRT',
  founded: 2011,
  region: 'Cass County, Missouri',
  /** Sits above the headline in the hero. */
  eyebrow: 'Chartered 2011 — Pleasant Hill, Missouri',
  /** The headline. Short beats clever. */
  headline: 'Loud pipes,\nfull pantries.',
  /** One paragraph under the headline. Say concretely what the club does. */
  subhead:
    'We are a over 40-member riding club that turns weekend runs into groceries, fuel cards, and heating bills for families across Cass and Johnson counties. Every dollar we raise stays in the community.',
}

/** The three numbers in the hero rail. Keep them honest and specific. */
export const stats = [
  { value: '$100,000', label: 'Over raised since 2011' },
  { value: '40+', label: 'Patched members' },
  { value: '5', label: 'Runs a year' },
]

/** The scrolling band under the hero. Short phrases only. */
export const marquee = [
  'Ride for a reason',
  'Every dollar stays local',
  'All makes welcome',
  'Since 2011',
  'Serving the Community',
]

export const about = {
  /** Small label above the heading. */
  heading: 'Who we are',
  /** The heading. Keep it to four or five words — it is set very large. */
  title: 'A riding club first',
  /** One sentence under the heading. */
  lead: 'The charity work is what the riding is for.',
  paragraphs: [
    'Midwest Rolling Thunder started in a basement in odessa with four riders and one rule: if a run does not help somebody, it is just a Sunday. Fifteen years later the rule has not changed, we have just grown in to multiple chapters.',
    'Members ride everything from a bagger to a twenty year old Bandit. There is no brand requirement, no probationary hazing, and no expectation that you show up to every run. Show up to the ones you can, and put in the work when you are there.',
    'We are not a one-percenter club and we do not pretend to be. We are a chartered, insured, family-friendly organization that loves helping out in our community.',
  ],
  /** The "what we do" list. Three to four items reads best. */
  pillars: [
    {
      title: 'Benefit runs',
      body: 'Eleven charity runs a year, each raising money for one named family or one local organization. The beneficiary is announced before the ride, and the total is published after it.',
    },
    {
      title: 'The winter fund',
      body: 'From October to March we cover heating bills and fuel cards for households referred to us by three area food pantries. No application, no means test, no publicity for the family.',
    },
    {
      title: 'Toy run and pantry drive',
      body: 'The December toy run fills a box truck. The autumn pantry drive fills four. Both end at the clubhouse with a chili cookoff that has caused two separate arguments among the officers.',
    },
  ],
}

export const officers: Officer[] = [
  { name: 'Danny', roadName: 'Crash', role: 'President' },
  { name: 'Tyler', roadName: 'Swamp', role: 'Vice President' },
  { name: 'Chris', roadName: 'Birdman', role: 'Master at Arms' },
  { name: 'Jeremy', roadName: 'Cajun', role: 'Sargent at Arms' },
  { name: 'Katie', roadName: 'Chong', role: 'Treasurer' },
  { name: 'Nate', roadName: 'Mator', role: 'Road Captain' },
]

/* ---------------------------------------------------------------------------
 * UPCOMING EVENTS
 * Add a ride by copying a block and changing the values. Past dates drop off
 * the "Upcoming" list on their own — you do not have to delete them.
 * ------------------------------------------------------------------------- */
export const events: Event[] = [
  {
    id: 'Boot drive',
    title: 'Thanksgiving boot drive',
    date: '2026-11-14',
    time: '10:00 AM',
    location: 'Clubhouse lot, then south on Route 7',
    city: 'Pleasant Hill, MO',
    blurb:
      'We are taking donations to help familys pay for groceries around the holidays.',
    tag: 'Boot drive',
    cost: 'Taking donations',
    signupUrl: '',
  },
  {
    id: 'Kodiak memorial',
    title: 'Memorial for Kodiak',
    date: '2026-09-26',
    time: 'noon till 4:00',
    location: 'mule skinners bar & grill',
    city: 'Centerview, MO',
    blurb:
      'An afternoon at Mule Skinners to remember Kodiak. Family, friends, and anyone who shared the road are welcome — no patch required. Come as you are and stay as long as you like.',
    tag: 'Memorial',
    cost: 'Free',
  },
]

/* ---------------------------------------------------------------------------
 * PAST EVENT PHOTOS
 * Real club photos, in public/photos/. To add one: drop the file in that
 * folder, copy a block below, and point src at it. Resize to about 1600px on
 * the long edge first — a straight-off-the-phone photo is 5-8 MB and will make
 * the page crawl. Order here is the order on the wall.
 * ------------------------------------------------------------------------- */
export const gallery: Photo[] = [
  {
    src: '/photos/staging-lot.jpg',
    alt: 'A long row of motorcycles parked at an event lot, a custom orange Softail closest to the camera',
    caption: 'Staged up before the run',
  },
  {
    src: '/photos/swamp-on-the-road.jpg',
    alt: 'A rider in an MRT vest leading traffic down a four-lane road',
    caption: 'Swamp out front',
  },
  {
    src: '/photos/grocery-store-santa.jpg',
    alt: 'Club members, families, and children posed with Santa in front of a Christmas tree inside a grocery store',
    caption: 'Christmas shopping with Santa',
  },
  {
    src: '/photos/roadside-lineup.jpg',
    alt: 'Riders standing beside their bikes along a country road next to a cemetery',
    caption: 'Kickstands down at the cemetery',
  },
  {
    src: '/photos/st-patricks-crew.jpg',
    alt: 'Nine club members in MRT vests wearing green for St. Patrick\'s Day',
    caption: 'Wearing green in March',
  },
  {
    src: '/photos/fight-like-jack.jpg',
    alt: 'A Fight Like Jack banner and an American flag hung between two tow-truck cranes over an event lot',
    caption: 'Flying the flag for Jack',
  },
  {
    src: '/photos/benefit-turnout.jpg',
    alt: 'A large crowd of riders and families filling a parking lot at a benefit',
    caption: 'The turnout',
  },
  {
    src: '/photos/santa-street-glide.jpg',
    alt: 'A rider in a full Santa suit on a blue Street Glide, pulling out onto the road',
    caption: 'Santa takes the Street Glide',
  },
]

/* ---------------------------------------------------------------------------
 * CLUBHOUSE AND CONTACT
 * ------------------------------------------------------------------------- */
export const contact = {
  address: {
    line1: '305 SW State Rte 7',
    line2: 'Pleasant Hill, MO 64080',
    /** Used to build the directions link. Full address as you would type it into Maps. */
    mapQuery: '305 SW State Rte 7, Pleasant Hill, MO 64080',
  },
  hours: [
    { day: 'Friday', detail: '6:30 PM — open to the public' },
    { day: 'Saturday', detail: '9:00 AM — members and guests' },
    { day: 'Run days', detail: 'Lot opens 90 minutes before roll out' },
  ],
  /**
   * Leave empty and every phone link on the site disappears — the header, the
   * footer, and the "we could not send that" fallback all check for it.
   * Fill it in and they all come back.
   */
  phone: '',
  /**
   * Add a row per address and the clubhouse block and the footer both list it.
   * The first row is the club's primary: it is the one the contact form mails
   * when `formEndpoint` below is empty. Reorder the rows to change that.
   */
  emails: ['mrt.phmo@gmail.com', 'midwestrollingthunder1@gmail.com'],
  /**
   * Where the contact form sends messages.
   * Leave this as an empty string and the form falls back to opening the
   * visitor's mail app with everything filled in — which works with no server.
   * To collect messages properly, paste a Formspree / Basin / Netlify Forms
   * endpoint here, e.g. 'https://formspree.io/f/xxxxxxxx'.
   */
  formEndpoint: '',
  /** Add a row per account. An empty array hides the row entirely. */
  socials: [{ label: 'Facebook', href: 'https://www.facebook.com/MRTPHMO/' }],
}

export const contactReasons = [
  'Joining the club',
  'Sponsoring a run',
  'Making a donation',
  'Requesting help',
  'Something else',
]
