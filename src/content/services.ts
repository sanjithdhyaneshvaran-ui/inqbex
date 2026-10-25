// Services page copy. Source: approved Services design on the canvas (1B 2A 3A 4A 5B 6A 7B).

export const services = {
  hero: {
    eyebrow: "Services",
    // Words animate in one by one; the marked word carries the purple tint
    words: ["Built", "to", "work", "*together.*"],
    body: "Websites, Meta ads and content, planned around one commercial objective. Take them together as an integrated engagement, or start with the one you need now.",
    chips: [
      { label: "Websites & digital infrastructure", href: "#websites" },
      { label: "Performance marketing", href: "#performance" },
      { label: "Content & creative", href: "#content" },
      { label: "Integrated growth", href: "#integrated", primary: true },
    ],
  },

  web: {
    eyebrow: "Websites & digital infrastructure",
    title: "A site that explains the offer and turns the right visitors into enquiries.",
    body: "We plan the journey first, then design and build the site, store or landing pages around it. Tracking goes in from day one, so the ads and the reporting have something reliable to work from.",
    list: [
      { name: "Marketing websites", note: "Design and build" },
      { name: "Campaign landing pages", note: "Built for paid traffic" },
      { name: "Shopify storefronts", note: "Ecommerce" },
      { name: "Tracking and analytics", note: "Pixels, events, reporting" },
      { name: "Speed, SEO and accessibility", note: "Foundations" },
    ],
    link: { label: "See website work", href: "/#work" },
    showcase: {
      image: "/work/breast-health-about.jpg",
      alt: "The About page of the Breast Health website, introducing Dr. Kirti Katherine Kabeer",
      name: "Breast Health",
      part: "Strategy and website redesign",
      tag: "Portfolio work · In progress",
    },
  },

  perfContent: {
    eyebrow: "Performance marketing × Content & creative",
    title: "Ads and content, made to feed each other.",
    body: "When content and media are planned apart, the ads run out of things worth showing. We plan the content and the media together, so every shoot is made for the ads it will run in, and every result shapes the next shoot.",
    performance: {
      lead: "Inqbex",
      title: "Performance marketing",
      body: "Meta ads planned, run and measured against the agreed objective.",
      list: [
        "Account and campaign structure",
        "Audience and creative testing",
        "Budget pacing and optimisation",
        "Reporting against the objective",
      ],
      stats: [
        { value: "₹5 lakh+", label: "Meta spend managed" },
        { value: "50M+", label: "impressions" },
        { value: "37M+", label: "people reached" },
        { value: "4x", label: "ROAS" },
      ],
    },
    content: {
      lead: "Inqbex × BAZ",
      title: "Content & creative",
      body: "Content strategy and production through BAZ, our content production partner.",
      list: [
        "Content strategy and calendar",
        "Shoots and editing",
        "Ad creative cut for each placement",
        "Scheduling and posting",
      ],
      note: "Inqbex sets the direction and the media plan. BAZ plans, shoots, edits and publishes.",
    },
    footnote: "Figures are combined across Inqbex-managed Meta campaigns.",
  },

  integrated: {
    eyebrow: "Integrated growth",
    title: "The engagement that connects the rest.",
    body: "Integrated growth isn't a fourth service. It's how we run the other three: one objective, one team and one plan, with the website, content and media each doing a defined job.",
    centre: { kicker: "Your", label: "Commercial objective" },
    nodes: [
      {
        label: "Web",
        angle: -90,
        kicker: "Websites & digital infrastructure",
        title: "Turns the plan into a site that converts",
        body: "The site, store and landing pages that paid and organic traffic land on, with tracking the rest of the system relies on.",
      },
      {
        label: "Performance",
        angle: 30,
        kicker: "Performance marketing",
        title: "Puts the work in front of the right people",
        body: "Meta campaigns built around the objective, tested and paced, then reported in terms the business uses.",
      },
      {
        label: "Content",
        angle: 150,
        kicker: "Content & creative · Inqbex × BAZ",
        title: "Gives every channel something worth showing",
        body: "Content planned against the media plan and produced with BAZ, so the ads never run short of creative.",
      },
    ],
    list: [
      "One agreed objective and measurement plan",
      "One team across web, content and media",
      "Shared reporting against the objective",
      "Inqbex × BAZ production where content is needed",
    ],
    link: { label: "Discuss an integrated engagement", href: "/start-a-project" },
  },

  howWeWork: {
    eyebrow: "How we work",
    title: "Five steps, in the order the problem needs.",
    body: "This is the usual sequence. A launch with a fixed date might start at Build, and a stalled account might start at Learn.",
    steps: [
      {
        short: "Define the objective",
        title: "Define the objective",
        body: "We agree what the engagement is for, how success will be measured and what evidence already exists.",
        get: "An agreed objective and measurement plan.",
      },
      {
        short: "Map the journey",
        title: "Map the journey and measurement",
        body: "We map how customers find, judge and buy, and decide what the website, content and media each need to do.",
        get: "A journey map and a channel plan.",
      },
      {
        short: "Build",
        title: "Build",
        body: "The website, content and campaigns are produced together from one brief, with BAZ handling production where content is needed.",
        get: "The site, assets and campaigns, ready to launch.",
      },
      {
        short: "Launch",
        title: "Launch",
        body: "We go live in stages and check tracking before budgets grow.",
        get: "Live campaigns with tracking you can trust.",
      },
      {
        short: "Learn and adjust",
        title: "Learn and adjust",
        body: "We report against the objective and change what the evidence says, from creative to landing pages to spend.",
        get: "Regular reports and a clear list of next changes.",
      },
    ],
  },

  faq: {
    eyebrow: "FAQs",
    title: "Questions we're often asked.",
    nudge: {
      title: "Still unsure where to start?",
      body: "Send us a message on WhatsApp and tell us what you're working on.",
      action: "Message on WhatsApp",
    },
    items: [
      {
        q: "Do you only take on integrated engagements?",
        a: "No. Integrated growth is where we do our best work, but you can start with a website, Meta ads or content on their own, and connect the rest later if it makes sense.",
      },
      {
        q: "Can we hire you just for Meta ads, or just a website?",
        a: "Yes. Tell us which one in your brief. We will still ask about the commercial objective, because it shapes how we plan the work.",
      },
      {
        q: "How does the Inqbex × BAZ collaboration work?",
        a: "Inqbex leads the strategy, website and paid media. BAZ is the content production hub and handles planning, shooting, editing and publishing. On joint work we run as one team from one brief.",
      },
      {
        q: "Can you work alongside our existing team or agency?",
        a: "Yes. We can take one part of the work and plan it around the teams and channels you already have.",
      },
      { q: "Do you build on Shopify?", a: "Yes. Our ecommerce builds run on Shopify." },
      {
        q: "What do you need from us to get started?",
        a: "A sense of what needs to change and your timing is enough to begin. A rough idea, a launch date or a full brief all work.",
      },
      {
        q: "How do you report on results?",
        a: "Every month you get a report on progress against the objective: what's working, what isn't, and the plan for the month ahead.",
      },
    ],
  },

  cta: {
    marquee: "Websites · Meta ads · Content · Integrated growth ·",
    title: "Tell us what needs to move.",
    body: "A rough idea is enough. We'll reply with how we'd approach it.",
  },
} as const;
