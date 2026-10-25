// Home page copy. Source: approved Draft 2 on the design canvas (sections 01–06).

export const home = {
  hero: {
    eyebrow: "Inqbex Growth Studio",
    // Words wrapped in *asterisks* carry the purple tint
    headline: "Growth is a *system.* Build it like *one.*",
    subheading:
      "We connect strategy, creative, web and paid media around what your business needs to achieve.",
  },

  proof: {
    label: "Results across Inqbex campaigns",
    stats: [
      { value: "₹5 lakh+", label: "Meta ad spend managed" },
      { value: "50M+", label: "Impressions served" },
      { value: "37M+", label: "People reached" },
      { value: "4x", label: "Return on ad spend (ROAS)" },
    ],
    note: "Combined across Inqbex-managed Meta campaigns.",
  },

  system: {
    eyebrow: "The Inqbex system",
    title: "One objective. Four disciplines working on it.",
    body: "Most growth problems are connection problems. We agree the commercial objective first, then plan the strategy, website, content and paid media around it, so every part pulls in the same direction.",
    link: { label: "Explore services", href: "/services" },
    centre: { kicker: "Your", label: "Commercial objective" },
    disciplines: [
      {
        name: "Strategy",
        body: "Positioning, the customer journey and the plan that ties every channel to the objective.",
      },
      { name: "Web", body: "Websites and landing pages built to explain the offer and convert the right visitor." },
      { name: "Content", body: "Brand, campaign and product creative made for the channels it will actually run on." },
      { name: "Performance", body: "Paid social on Meta, planned, run and measured against the agreed objective." },
    ],
  },

  work: {
    eyebrow: "Selected work",
    title: "A closer look at what we do.",
    // Leads to the partner work on the Inqbex × BAZ page
    bazLink: { label: "View Inqbex × BAZ work", href: "/inqbex-baz#partner-work" },
    projects: [
      {
        name: "Stephin Lalan",
        summary: "An ecommerce home for a designer fashion label, with its Instagram run entirely through Meta ads.",
        image: "/work/stephin-lalan-home.jpg",
        alt: "Stephin Lalan homepage showing a model in an embroidered black shirt",
        tag: "Portfolio work",
        part: "Ecommerce site · Meta ads",
        sector: "Fashion ecommerce",
        href: "https://stephinlalan.com",
      },
      {
        name: "Breast Health",
        summary: "A clearer, calmer website for a breast oncoplastic surgeon in Chennai.",
        image: "/work/breast-health-about.jpg",
        alt: "The About page of the Breast Health website, introducing Dr. Kirti Katherine Kabeer",
        tag: "Portfolio work · In progress",
        part: "Strategy · Website redesign",
      },
      {
        name: "The BAZ",
        summary: "A website for BAZ, the creative partner we make content with.",
        image: "/work/thebaz-home.jpg",
        alt: "The BAZ homepage: \"Your brand is already talking. Let's make sure it says the right thing.\"",
        tag: "Portfolio work",
        part: "Website design and build",
        href: "https://www.thebaz.in/",
      },
      {
        name: "BRB Holdings",
        summary: "A composed, institutional website for a multisectoral holding company.",
        image: "/work/brb-holdings-home.jpg",
        alt: "BRB Holdings homepage with a gold wordmark over a city skyline at dusk",
        tag: "Portfolio work",
        part: "Website design and build",
        href: "https://brbholdings.org/",
      },
    ],
  },

  baz: {
    eyebrow: "Inqbex × BAZ",
    title: "Strategy and distribution, with production built in.",
    body: "Inqbex leads the strategy, website and paid media. BAZ is the content production hub: planning, shooting, editing and publishing. On selected work we run as one team, from one brief.",
    steps: [
      { lead: "inqbex", title: "Objective and audience", body: "What the content has to achieve, and for whom." },
      { lead: "both", title: "Content direction", body: "Ideas and formats agreed against the plan." },
      { lead: "baz", title: "Production plan", body: "Shot lists, schedules, locations and talent." },
      { lead: "baz", title: "Shoot and edit", body: "Channel-ready assets, cut for each placement." },
      { lead: "baz", title: "Schedule and post", body: "Organic publishing on a planned calendar." },
      { lead: "inqbex", title: "Distribution and learning", body: "Paid reach, then results fed into the next round." },
    ],
    compare: {
      separate: {
        label: "Separate vendors",
        body: "An agency, a production house and a media buyer, each with its own brief, timeline and idea of success.",
      },
      together: {
        label: "Inqbex × BAZ",
        body: "One plan, one team and one feedback loop, from the first idea to what the ads teach us.",
      },
    },
    link: { label: "Meet Inqbex × BAZ", href: "/inqbex-baz" },
  },

  start: {
    eyebrow: "Start a project",
    title: "Start with the brief you have.",
    body: "A rough idea, a launch date or a finished brief are all good places to begin. Pick the route that suits you.",
    process: [
      { title: "Define the objective", body: "What has to move, and how we will know." },
      { title: "Build the system", body: "Site, content and media planned and made together." },
      { title: "Learn and adjust", body: "Report against the objective, then change what the evidence says." },
    ],
  },
} as const;

export type Lead = (typeof home.baz.steps)[number]["lead"];
