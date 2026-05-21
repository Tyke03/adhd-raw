export type Song = {
  slug: string;
  title: string;
  number: number;
  available: boolean;
  audio?: string;
  theme: string; // short phrase, e.g. "the looping mind"
  tagline: string;
  description: string;
  pull: string; // a pulled lyric/excerpt
  factIds: string[];
  relatedSlugs: string[];
  resourceIds: string[];
};

export const SONGS: Song[] = [
  {
    slug: "both-things-can-be-true",
    title: "Both Things Can Be True",
    number: 1,
    available: false,
    theme: "the contradiction",
    tagline: "Holding two opposite truths in the same hand without dropping either.",
    description:
      "ADHD lives in paradox: brilliant and incompetent in the same hour, kind and cruel in the same sentence. This is the album's thesis statement — the brain is not broken in one direction. It is broken in every direction at once.",
    pull: "I can love you and forget you exist by Thursday.",
    factIds: ["combinations", "rsd"],
    relatedSlugs: ["brain-on-shuffle", "i-break-me", "shame-keeps-blooming"],
    resourceIds: ["chadd", "additude"],
  },
  {
    slug: "brain-on-shuffle",
    title: "Brain On Shuffle",
    number: 2,
    available: false,
    theme: "no internal order",
    tagline: "Twelve open tabs, none of them yours.",
    description:
      "There is no playlist. There is no queue. Every thought arrives uninvited, plays half a chorus, and skips. This song is what it's like to have working memory that empties faster than you can fill it.",
    pull: "I sat down to do one thing. I'm sorry, what was it?",
    factIds: ["executive", "combinations"],
    relatedSlugs: ["looping-mind", "daydream-terrors", "glitch-cycle"],
    resourceIds: ["how-to-adhd", "barkley"],
  },
  {
    slug: "daydream-terrors",
    title: "Daydream Terrors",
    number: 3,
    available: false,
    theme: "the inner cinema that won't stop",
    tagline: "Maladaptive daydreaming as a full-time second life.",
    description:
      "Hours lost to scenarios that never happened. Conversations rehearsed with people who'll never hear them. The daydream isn't a coping skill anymore — it's the apartment you actually live in.",
    pull: "I survived the day. I just wasn't in it.",
    factIds: ["executive", "combinations"],
    relatedSlugs: ["looping-mind", "brain-on-shuffle", "loud-brain-tired-bones"],
    resourceIds: ["additude"],
  },
  {
    slug: "fast-life-part-1",
    title: "Fast Life (Part 1 of 2)",
    number: 4,
    available: true,
    audio: "/audio/fast-life-part-1.mp3",
    theme: "the speed before the crash",
    tagline: "The novelty-chasing, risk-taking high before the bill comes due.",
    description:
      "ADHD's dopamine economy doesn't reward maintenance — it rewards intensity. Speed, risk, new everything. This is the half of the story where it still feels like winning. Pair with Slow Death (Part 2) for the rest.",
    pull: "I'd rather burn the engine than learn the route.",
    factIds: ["crashes", "sud", "lifespan"],
    relatedSlugs: ["slow-death-part-2", "i-break-me", "glitch-cycle"],
    resourceIds: ["chadd", "samhsa"],
  },
  {
    slug: "glitch-cycle",
    title: "Glitch Cycle",
    number: 5,
    available: true,
    audio: "/audio/glitch-cycle.mp3",
    theme: "the loop you can't quit",
    tagline: "Same mistake, same shame, same promise to fix it tomorrow.",
    description:
      "Not a metaphor — a real cognitive loop. Hyperfocus, collapse, recovery, hyperfocus, collapse. The cycle isn't a personality flaw; it's a regulation failure dressed up as one.",
    pull: "Day six of starting over for the last time.",
    factIds: ["outcomes", "untreated", "executive"],
    relatedSlugs: ["looping-mind", "i-break-me", "shame-keeps-blooming"],
    resourceIds: ["barkley", "how-to-adhd"],
  },
  {
    slug: "i-break-me",
    title: "I Break Me",
    number: 6,
    available: true,
    audio: "/audio/i-break-me.mp3",
    theme: "self-sabotage as a verb",
    tagline: "I wasn't waiting for it to fall apart. I helped.",
    description:
      "The hardest part of severe ADHD isn't what happens to you — it's what you do to yourself when you can't tolerate the gap between who you are and who you keep failing to be. This is the confession track.",
    pull: "Nobody ruined this. I just got there first.",
    factIds: ["suicide", "rsd", "sud"],
    relatedSlugs: ["shame-keeps-blooming", "the-same-damn-knife", "slow-death-part-2"],
    resourceIds: ["988", "samhsa"],
  },
  {
    slug: "looping-mind",
    title: "Looping Mind",
    number: 7,
    available: false,
    theme: "the song that won't end",
    tagline: "Rumination on infinite repeat with no exit ramp.",
    description:
      "Different from Glitch Cycle — Looping Mind is what happens at 3 a.m. when the same five seconds of a conversation replay until morning. Anxiety dressed as memory.",
    pull: "Eight years ago I said the wrong thing. I'm still saying it.",
    factIds: ["executive", "rsd"],
    relatedSlugs: ["glitch-cycle", "daydream-terrors", "shame-keeps-blooming"],
    resourceIds: ["additude", "how-to-adhd"],
  },
  {
    slug: "loud-brain-tired-bones",
    title: "Loud Brain, Tired Bones",
    number: 8,
    available: false,
    theme: "wired and exhausted at once",
    tagline: "The body collapsed an hour ago. The brain didn't get the memo.",
    description:
      "Severe ADHD plus revenge bedtime procrastination plus a nervous system that won't downshift. You're not lazy. You're running a marathon with the parking brake on, every day.",
    pull: "I've been still for hours and somehow I'm winded.",
    factIds: ["executive", "lifespan"],
    relatedSlugs: ["daydream-terrors", "looping-mind", "slow-death-part-2"],
    resourceIds: ["additude"],
  },
  {
    slug: "shame-keeps-blooming",
    title: "Shame Keeps Blooming",
    number: 9,
    available: true,
    audio: "/audio/shame-keeps-blooming.mp3",
    theme: "the inheritance you can't return",
    tagline: "Every missed deadline waters something already growing.",
    description:
      "ADHD shame compounds. Every forgotten birthday, late bill, dropped friendship adds a layer. By adulthood it's not a feeling anymore — it's the soil. This song sits in that garden honestly.",
    pull: "I can't tell where the disorder ends and the apologies start.",
    factIds: ["rsd", "suicide", "untreated"],
    relatedSlugs: ["i-break-me", "the-same-damn-knife", "you-know"],
    resourceIds: ["988", "chadd"],
  },
  {
    slug: "slow-death-part-2",
    title: "Slow Death (Part 2 of 2)",
    number: 10,
    available: true,
    audio: "/audio/slow-death-part-2.mp3",
    theme: "the bill for Fast Life",
    tagline: "The same engine that thrilled you wears the rest of you down.",
    description:
      "If Fast Life is the rush, this is the receipt. Untreated ADHD is associated with a measurably shorter lifespan — accidents, addiction, suicide, neglect of medical care. This song doesn't dramatize it. It just names it.",
    pull: "Nothing dramatic. Just a hundred small things I never finished.",
    factIds: ["lifespan", "sud", "outcomes"],
    relatedSlugs: ["fast-life-part-1", "i-break-me", "shame-keeps-blooming"],
    resourceIds: ["988", "samhsa", "chadd"],
  },
  {
    slug: "the-same-damn-knife",
    title: "The Same Damn Knife",
    number: 11,
    available: false,
    theme: "the tool that cuts both ways",
    tagline: "The trait that saves you on Tuesday wrecks you by Friday.",
    description:
      "Hyperfocus, intensity, novelty-seeking — every so-called superpower has a back edge. The knife that makes you the most interesting person in the room is the same one that opens the wound.",
    pull: "Same blade. Same hand. Different week.",
    factIds: ["combinations", "outcomes"],
    relatedSlugs: ["both-things-can-be-true", "i-break-me", "fast-life-part-1"],
    resourceIds: ["chadd", "additude"],
  },
  {
    slug: "you-know",
    title: "You Know",
    number: 12,
    available: true,
    audio: "/audio/you-know.mp3",
    theme: "the recognition",
    tagline: "The closing track. You don't need this song explained to you.",
    description:
      "If you've made it through the album, this one doesn't need a paragraph. It's the moment someone with severe ADHD finally hears a song and realizes it was written from inside the same room they've been locked in.",
    pull: "You know. That's why you stayed for the whole record.",
    factIds: ["late-dx", "combinations"],
    relatedSlugs: ["both-things-can-be-true", "shame-keeps-blooming", "slow-death-part-2"],
    resourceIds: ["chadd", "additude", "how-to-adhd"],
  },
];

export const songBySlug = (slug: string) => SONGS.find((s) => s.slug === slug);