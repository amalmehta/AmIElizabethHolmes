// Single source of truth for the quiz, the share pages and the cards.
// Answer scores (0–3) are invented for comedy; facts are real and cited.

export const SITE_URL = 'https://amalmehta.github.io/AmIElizabethHolmes/';

export const PANELS = [
  { id: 'demo',    name: 'Demo integrity' },
  { id: 'claims',  name: 'Claims vs evidence' },
  { id: 'persona', name: 'Turtleneck index' },
  { id: 'secrecy', name: 'Stealth mode' },
  { id: 'critics', name: 'Critic handling' },
];

export const QUESTIONS = [
  {
    panel: 'demo',
    q: 'Your demo breaks five minutes before the investor call. You…',
    answers: [
      'Say it broke and reschedule',
      'Show a recording, labelled as a recording',
      'Play the recording and say “live” with your chest',
      'Hardcode the output and call it “cached inference”',
    ],
    fact: 'According to John Carreyrou’s Bad Blood, when a Theranos reader malfunctioned before a 2006 Novartis demo in Switzerland, a team in California beamed over a fake result.',
    source: { name: 'KQED, excerpt from Bad Blood, May 2018', url: 'https://www.kqed.org/futureofyou/442098/book-excerpt-one-execs-tumultuous-last-day-at-theranos' },
  },
  {
    panel: 'demo',
    q: 'Your “proprietary model” is, technically, someone else’s API. The landing page says…',
    answers: [
      '“Built on [their model]”',
      '“Powered by leading models”',
      '“Our proprietary engine”',
      'Nothing. You’ve also sanded the logo off the server.',
    ],
    fact: 'The Wall Street Journal reported in 2015 that, per former employees, Theranos ran only about 15 of its 240-plus tests on its own Edison device, and used commercial analyzers for most of the rest.',
    source: { name: 'Wall Street Journal, Oct 2015', url: 'https://www.wsj.com/articles/theranos-has-struggled-with-blood-tests-1444881901' },
  },
  {
    panel: 'claims',
    q: 'A big company once replied “interesting” to your cold email. In your deck, they’re…',
    answers: [
      'Not mentioned',
      '“In conversations with”',
      'A logo on the “Trusted by” slide',
      'A logo on a validation report they never wrote',
    ],
    fact: 'At her 2021 trial, Holmes admitted adding Pfizer and Schering-Plough logos to Theranos validation reports. Witnesses from those companies testified that they never authorized it.',
    source: { name: 'CNBC, Nov 2021', url: 'https://www.cnbc.com/2021/11/23/elizabeth-holmes-admits-she-added-drugmakers-logos-to-theranos-reports.html' },
  },
  {
    panel: 'claims',
    q: 'Where is your product deployed?',
    answers: [
      '“Three pilot users. One is my mum.”',
      '“Pilots with a few teams”',
      '“Used across the enterprise”',
      '“On the battlefield”',
    ],
    fact: 'Investors testified that Holmes told them Theranos devices were used on military medevac helicopters. Holmes denied saying it, and the military never deployed them.',
    source: { name: 'CNBC, Oct 2021', url: 'https://www.cnbc.com/2021/10/26/theranos-investor-betsy-devos-rep-says-elizabeth-holmes-misled-them.html' },
  },
  {
    panel: 'persona',
    q: 'Your work wardrobe is…',
    answers: [
      'Whatever was clean',
      'A fleece vest with a logo on it',
      'The same outfit daily, “to save decisions”',
      'Black turtleneck. You never met Steve Jobs. You have studied him.',
    ],
    fact: 'Holmes routinely wore black turtlenecks, a look widely reported as modelled on Steve Jobs. She said her mother dressed her in them as a child.',
    source: { name: 'Business Insider, Mar 2018', url: 'https://www.businessinsider.com/elizabeth-holmes-black-turtleneck-symbol-of-fraud-2018-3' },
  },
  {
    panel: 'persona',
    q: 'When you pitch, your voice…',
    answers: [
      'Sounds like you',
      'Goes a bit “podcast host”',
      'Drops an octave near VCs',
      'Drops an octave, and slipped once at the holiday party',
    ],
    fact: 'Former employees told ABC’s The Dropout that Holmes’s deep voice seemed put on, and that it reportedly slipped once at a company party. Her family says the voice is natural.',
    source: { name: 'Business Insider, Mar 2019', url: 'https://www.businessinsider.com/theranos-founder-elizabeth-holmes-deep-voice-2019-3' },
  },
  {
    panel: 'secrecy',
    q: 'How much does your own team know about how the product works?',
    answers: [
      'Everything. It’s in the README.',
      'Most of it',
      '“Need to know”',
      'Teams sit in separate rooms and are told not to compare notes',
    ],
    fact: 'According to former employees quoted in Bad Blood, Theranos kept teams siloed and restricted them from sharing information across departments.',
    source: { name: 'Bad Blood, John Carreyrou (Knopf, 2018)', url: 'https://en.wikipedia.org/wiki/Bad_Blood:_Secrets_and_Lies_in_a_Silicon_Valley_Startup' },
  },
  {
    panel: 'secrecy',
    q: 'Has anyone outside your company checked your results?',
    answers: [
      'Yes. It’s published, with code.',
      'An advisor looked at it once',
      '“We’re in stealth”',
      'Publishing would reveal trade secrets. Also, it would not survive.',
    ],
    fact: 'In a 2015 JAMA Viewpoint titled “Stealth Research”, Stanford’s John Ioannidis pointed to Theranos’s near-absence of peer-reviewed publications.',
    source: { name: 'JAMA, Feb 2015', url: 'https://doi.org/10.1001/jama.2014.17662' },
  },
  {
    panel: 'critics',
    q: 'A junior engineer finds a real flaw in your core claim. You…',
    answers: [
      'Thank them and fix it',
      'Fix it quietly',
      '“Let’s take this offline”, forever',
      'Send lawyers to their grandfather’s house',
    ],
    fact: 'Whistleblower Tyler Shultz has said Theranos lawyers were waiting for him at his grandfather George Shultz’s home in 2015, pressing him to sign documents. He refused.',
    source: { name: 'Wall Street Journal, Nov 2016', url: 'https://www.wsj.com/articles/theranos-whistleblower-shook-the-companyand-his-family-1479335963' },
  },
  {
    panel: 'critics',
    q: 'A journalist reports that your thing doesn’t work. You say…',
    answers: [
      '“They’re right about X. Here’s our fix.”',
      '“No comment”',
      '“Haters gonna hate”',
      '“First they think you’re crazy, then they fight you…” on live TV',
    ],
    fact: 'The day the WSJ exposé ran, Holmes told CNBC’s Mad Money: “first they think you’re crazy, then they fight you, and then all of a sudden you change the world.”',
    source: { name: 'CNBC, Oct 2015', url: 'https://www.cnbc.com/2015/10/15/theranos-ceo-fires-back-at-wsj-i-was-shocked.html' },
  },
];

// Ranges are inclusive and cover 0–100 with no gaps.
export const TIERS = [
  { id: 'honest',    min: 0,  max: 15,  name: 'Clinically Honest',
    line: 'You show your work. Possibly to a fault.' },
  { id: 'roundsup',  min: 16, max: 35,  name: 'Rounds Up',
    line: 'Your “almost done” is doing some heavy lifting.' },
  { id: 'prerev',    min: 36, max: 55,  name: 'Pre-Revenue Visionary',
    line: 'The roadmap is real. The product is a roadmap.' },
  { id: 'audit',     min: 56, max: 80,  name: 'Visionary, Pending Audit',
    line: 'Investors love you. Your engineers have questions.' },
  { id: 'holmes',    min: 81, max: 100, name: 'Elizabeth Holmes',
    line: 'A few drops of blood. A lot of claims. Eleven years.' },
];

export const OUTCOME = {
  fact: 'Holmes was convicted in January 2022 on four counts of defrauding investors and sentenced to 135 months (11 years, 3 months). Theranos had been valued at about $9 billion in 2014.',
  source: { name: 'CNBC, Nov 2022', url: 'https://www.cnbc.com/2022/11/18/former-theranos-ceo-elizabeth-holmes-sentenced-to-more-than-11-years-in-prison.html' },
};
