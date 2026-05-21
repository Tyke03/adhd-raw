export type Resource = {
  id: string;
  name: string;
  kind: string;
  url: string;
  description: string;
  audience: string;
};

export const RESOURCES: Resource[] = [
  {
    id: "988",
    name: "988 Suicide & Crisis Lifeline",
    kind: "Crisis",
    url: "https://988lifeline.org/",
    description: "Call or text 988 (US) for free, confidential support 24/7. If you're in immediate danger, this comes before anything else on this site.",
    audience: "Anyone in crisis",
  },
  {
    id: "samhsa",
    name: "SAMHSA National Helpline",
    kind: "Crisis / Substance use",
    url: "https://www.samhsa.gov/find-help/national-helpline",
    description: "1-800-662-HELP. Free, confidential treatment referral and information for mental health and substance use disorders.",
    audience: "People struggling with co-occurring substance use",
  },
  {
    id: "chadd",
    name: "CHADD",
    kind: "Advocacy & education",
    url: "https://chadd.org/",
    description: "Children and Adults with ADHD — the largest non-profit ADHD organization in the US. Local chapters, support groups, evidence-based info, and adult-specific resources.",
    audience: "Adults seeking community + reliable information",
  },
  {
    id: "additude",
    name: "ADDitude Magazine",
    kind: "Education",
    url: "https://www.additude.com/",
    description: "Free articles, webinars, and expert columns specifically on adult ADHD — comorbidities, relationships, executive function, medication realities.",
    audience: "Adults wanting deep, ongoing reading",
  },
  {
    id: "barkley",
    name: "Russell Barkley (YouTube)",
    kind: "Research / Lectures",
    url: "https://www.youtube.com/@russellbarkleyphd2023",
    description: "Dr. Russell Barkley's lectures on ADHD as a disorder of executive function and self-regulation — direct, unsentimental, and the closest you'll get to free graduate-level training on severe ADHD.",
    audience: "Anyone who wants the research framing",
  },
  {
    id: "how-to-adhd",
    name: "How to ADHD",
    kind: "Practical strategies",
    url: "https://howtoadhd.com/",
    description: "Jessica McCabe's videos and book translate research into practical, self-compassionate strategies — without the toxic-positivity 'superpower' framing.",
    audience: "Adults building day-to-day scaffolding",
  },
];

export const resourceById = (id: string) => RESOURCES.find((r) => r.id === id);