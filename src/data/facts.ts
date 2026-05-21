export type Fact = {
  id: string;
  stat: string;
  headline: string;
  body: string;
  source: string;
  tags: string[]; // matches song themes
};

export const FACTS: Fact[] = [
  {
    id: "prison",
    stat: "~25%",
    headline: "About 1 in 4 incarcerated adults meet ADHD criteria.",
    body: "Roughly 10× the general adult rate. Untreated impulsivity, emotional dysregulation, and self-medication get filtered into punishment systems instead of care.",
    source: "Young et al., meta-analysis of adult prison populations",
    tags: ["impulsivity", "self-destruction", "shame"],
  },
  {
    id: "untreated",
    stat: "36.5%",
    headline: "Over a third of diagnosed U.S. adults with ADHD get no treatment at all.",
    body: "When this many diagnosed people are still untreated, “just get help” stops being advice and starts sounding like denial of a system failure.",
    source: "CDC / National Survey, U.S. adult ADHD treatment data",
    tags: ["systems", "shame"],
  },
  {
    id: "late-dx",
    stat: "55.9%",
    headline: "Most diagnosed adults weren't diagnosed until adulthood.",
    body: "Around 15.5 million U.S. adults live with ADHD, and the majority spent formative years being judged before they were understood.",
    source: "U.S. adult ADHD prevalence estimates, 2023",
    tags: ["identity", "shame", "looping"],
  },
  {
    id: "lifespan",
    stat: "Shorter life",
    headline: "An ADHD diagnosis now predicts a shorter lifespan.",
    body: "Driven by unmet need, untreated ADHD, undertreated co-occurring conditions, accidents, addiction, smoking, and suicide. Not harmless neurodiversity — a public-health failure.",
    source: "Russell Barkley & long-term outcome research",
    tags: ["self-destruction", "slow-death"],
  },
  {
    id: "crashes",
    stat: "+74%",
    headline: "ADHD is associated with a 74% higher crash risk.",
    body: "Roughly double the rate of traffic-ticket events. When people say ADHD is just about “focus,” they erase its real safety consequences.",
    source: "Driving / motor-vehicle outcome studies",
    tags: ["fast-life", "impulsivity"],
  },
  {
    id: "suicide",
    stat: ">2×",
    headline: "Suicide attempts and self-harm are more than twice as likely in ADHD.",
    body: "A condition with that profile should never be trivialized as cute chaos or a productivity quirk.",
    source: "Meta-analyses of ADHD and suicidality",
    tags: ["shame", "self-destruction", "i-break-me"],
  },
  {
    id: "sud",
    stat: "~6×",
    headline: "About 6× higher risk of developing a substance use disorder.",
    body: "For many, the addiction didn't come first. The untreated brain did. Self-medication is a predictable outcome of untreated executive dysfunction.",
    source: "Wilens et al., ADHD & substance use",
    tags: ["self-destruction", "fast-life", "slow-death"],
  },
  {
    id: "outcomes",
    stat: "74%",
    headline: "Untreated adults fare worse than treated peers across 74% of long-term outcomes.",
    body: "Academic, occupational, social, and substance-use domains. The question isn't whether ADHD is “real enough” to treat — it's how much damage happens when it isn't.",
    source: "Long-term ADHD outcome reviews",
    tags: ["systems", "looping"],
  },
  {
    id: "shortage",
    stat: "71.5%",
    headline: "Most adults on stimulants had trouble filling prescriptions in 2023.",
    body: "A treatable disorder being made less treatable by supply and policy failures.",
    source: "2023 U.S. stimulant shortage surveys",
    tags: ["systems", "shame"],
  },
  {
    id: "combinations",
    stat: "160,000+",
    headline: "ADHD has 160,000+ possible symptom combinations.",
    body: "No two ADHD brains present identically. The DSM gives a label; lived reality gives a fingerprint. That's why a single album needs twelve different songs.",
    source: "DSM-5 ADHD symptom combinatorics",
    tags: ["identity", "all"],
  },
  {
    id: "rsd",
    stat: "~99%",
    headline: "Nearly all adults with ADHD report rejection-sensitive dysphoria.",
    body: "Emotional dysregulation isn't a side dish to attention problems — for many, it's the loudest symptom. Criticism lands like a physical wound.",
    source: "Dodson, ADHD & emotional regulation literature",
    tags: ["shame", "i-break-me"],
  },
  {
    id: "executive",
    stat: "30%",
    headline: "Executive function in ADHD lags ~30% behind chronological age.",
    body: "A 30-year-old can have the time-management, organization, and self-regulation of a teenager — while being held to adult standards by everyone.",
    source: "Barkley, executive function research",
    tags: ["looping", "loud-brain", "daydream"],
  },
];

export const factById = (id: string) => FACTS.find((f) => f.id === id);