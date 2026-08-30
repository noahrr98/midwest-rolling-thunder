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
  src: string
  alt: string
  caption: string
  year: string
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
    'We are a 140-member riding club that turns weekend runs into groceries, fuel cards, and heating bills for families across Cass and Johnson counties. Every dollar we raise stays inside a ninety-mile radius of the clubhouse.',
}

/** The three numbers in the hero rail. Keep them honest and specific. */
export const stats = [
  { value: '$318,400', label: 'Raised since 2011' },
  { value: '140', label: 'Patched members' },
  { value: '41', label: 'Runs a year' },
]

/** The scrolling band under the hero. Short phrases only. */
export const marquee = [
  'Ride for a reason',
  'Every dollar stays local',
  'All makes welcome',
  'Since 2011',
  'Kickstands up at nine',
]

export const about = {
  /** Small label above the heading. */
  heading: 'Who we are',
  /** The heading. Keep it to four or five words — it is set very large. */
  title: 'A riding club first',
  /** One sentence under the heading. */
  lead: 'The charity work is what the riding is for.',
  paragraphs: [
    'Midwest Rolling Thunder started in a two-bay garage off Route 7 with nine riders and one rule: if a run does not help somebody, it is just a Sunday. Fifteen years later the rule has not changed, and neither has the garage — we just bought the building.',
    'Members ride everything from a bagger to a twenty-year-old Bandit. There is no brand requirement, no probationary hazing, and no expectation that you show up to every run. Show up to the ones you can, and put in the work when you are there.',
    'We are not a one-percenter club and we do not pretend to be. We are a chartered, insured, family-friendly organization that runs an open clubhouse on Thursdays and answers to a treasurer who publishes the books twice a year.',
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
    id: 'harvest-run-2026',
    title: 'Harvest Run for the Kellerman Family',
    date: '2026-09-19',
    time: 'Kickstands up 9:00 AM, riders meet at 8:15',
    location: 'Clubhouse lot, then south on Route 7',
    city: 'Pleasant Hill, MO',
    blurb:
      'A 118-mile loop through Cass and Johnson counties ending at Whitmore Orchard. All proceeds go to the Kellerman family after the shop fire in June.',
    tag: 'Benefit run',
    cost: '$25 rider, $15 passenger',
    signupUrl: '',
  },
  {
    id: 'thursday-open-house-oct',
    title: 'Open clubhouse and new-member night',
    date: '2026-10-08',
    time: '6:30 PM until we lock up',
    location: '305 SW State Rte 7',
    city: 'Pleasant Hill, MO',
    blurb:
      'If you have been thinking about riding with us, this is the night to walk in. Bring the bike or do not. Coffee is on, the grill is going, and nobody will ask you to prospect.',
    tag: 'Clubhouse',
    cost: 'Free',
  },
  {
    id: 'pantry-drive-2026',
    title: 'Autumn pantry drive and chili cookoff',
    date: '2026-10-24',
    endDate: '2026-10-25',
    time: 'Drop-off 10:00 AM to 4:00 PM both days',
    location: 'Clubhouse lot',
    city: 'Pleasant Hill, MO',
    blurb:
      'Two days of collection for the Marie Wilkins Food Pantry and Cass County Neighbors. Last year we filled four box trucks. Bring shelf-stable goods, diapers, or a cash donation.',
    tag: 'Drive',
    cost: 'Bring a bag',
  },
  {
    id: 'toy-run-2026',
    title: '15th Annual Toy Run',
    date: '2026-12-06',
    time: 'Staging 10:00 AM, roll out 11:00 AM sharp',
    location: 'City Park, east lot',
    city: 'Pleasant Hill, MO',
    blurb:
      'The big one. Police escort up Route 7 to the Boys and Girls Club. One unwrapped toy per rider gets you in. Cages welcome at the back of the pack.',
    tag: 'Toy run',
    cost: 'One unwrapped toy',
    signupUrl: '',
  },
]

/* ---------------------------------------------------------------------------
 * PAST EVENT PHOTOS
 * Drop real photos into  public/photos/  and change src to '/photos/name.jpg'.
 * The placeholders below load from picsum.photos so the wall is never empty.
 * ------------------------------------------------------------------------- */
export const gallery: Photo[] = [
  {
    src: 'https://picsum.photos/seed/mrt-toyrun-lineup/900/1200?grayscale',
    alt: 'Row of motorcycles staged in a parking lot before a charity run',
    caption: 'Staging for the toy run',
    year: '2025',
  },
  {
    src: 'https://picsum.photos/seed/mrt-route30-pack/1200/800?grayscale',
    alt: 'Group of riders on a two-lane highway between harvested fields',
    caption: 'Route 7, south of Harrisonville',
    year: '2025',
  },
  {
    src: 'https://picsum.photos/seed/mrt-pantry-truck/1000/1000?grayscale',
    alt: 'Volunteers loading boxes of canned goods into a box truck',
    caption: 'Loading the fourth truck',
    year: '2024',
  },
  {
    src: 'https://picsum.photos/seed/mrt-clubhouse-night/1200/900?grayscale',
    alt: 'Members gathered outside a lit clubhouse in the evening',
    caption: 'Thursday night, clubhouse lot',
    year: '2025',
  },
  {
    src: 'https://picsum.photos/seed/mrt-check-handoff/900/1150?grayscale',
    alt: 'Oversized donation check handed to a local family',
    caption: 'Handing off the Harvest Run total',
    year: '2024',
  },
  {
    src: 'https://picsum.photos/seed/mrt-chili-cookoff/1200/850?grayscale',
    alt: 'Long table of chili pots at an outdoor cookoff',
    caption: 'The cookoff that started the argument',
    year: '2024',
  },
  {
    src: 'https://picsum.photos/seed/mrt-kickstands/1000/1300?grayscale',
    alt: 'Close view of chrome handlebars and a fuel tank at sunrise',
    caption: 'Cold morning, warm start',
    year: '2023',
  },
  {
    src: 'https://picsum.photos/seed/mrt-escort/1200/800?grayscale',
    alt: 'Police escort leading a long column of motorcycles down a city street',
    caption: 'The Route 7 escort',
    year: '2023',
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
    { day: 'Thursday', detail: '6:30 PM — open to the public' },
    { day: 'Saturday', detail: '9:00 AM — members and guests' },
    { day: 'Run days', detail: 'Lot opens 90 minutes before roll out' },
  ],
  /**
   * Leave empty and every phone link on the site disappears — the header, the
   * footer, and the "we could not send that" fallback all check for it.
   * Fill it in and they all come back.
   */
  phone: '',
  email: 'mrt.phmo@gmail.com',
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
