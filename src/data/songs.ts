export type Song = {
  slug: string;
  title: string;
  number: number;
  available: boolean;
  audioUrl?: string;
  // Embed URLs for streaming. If neither is set, SongEmbed shows a
  // "Stream opening soon on Spotify" placeholder instead of broken controls.
  spotifyEmbedUrl?: string;
  soundcloudEmbedUrl?: string;
  theme: string; // short phrase, e.g. "the looping mind"
  tagline: string;
  description: string;
  pull: string; // a pulled lyric/excerpt
  factIds: string[];
  relatedSlugs: string[];
  resourceIds: string[];
  style: "rap" | "sing" | "hybrid";
  mood: "soft" | "raw" | "head-bob-sob";
};

export const SONGS: Song[] = [
  {
    slug: "both-things-can-be-true",
    title: "Both Things Can Be True",
    number: 1,
    available: true,
    audioUrl: "/audio/both-things-can-be-true.mp3",
    theme: "the contradiction",
    tagline: "The truth gets more honest when it stops demanding one clean answer.",
    description:
      "This isn't a happy ending. It's permission to hold contradiction without forcing false resolution. Broken and brilliant. Losing and still winning. A disaster and still worthy. ADHD lives in paradox — and the most honest thing the album can do is refuse to flatten it.",
    pull: "I can love you and forget you exist by Thursday.",
    factIds: ["combinations", "rsd"],
    relatedSlugs: ["brain-on-shuffle", "i-break-me", "shame-keeps-blooming"],
    resourceIds: ["chadd", "additude"],
    style: "hybrid",
    mood: "head-bob-sob",
  },
  {
    slug: "brain-on-shuffle",
    title: "Brain On Shuffle",
    number: 2,
    available: true,
    audioUrl: "/audio/brain-on-shuffle.mp3",
    theme: "the anti-superpower song",
    tagline: "My greatest gift keeps tripping me.",
    description:
      "This one directly attacks the 'superpower' framing. Not defensive — just exhausted by simplistic optimism. The brain that everyone calls fascinating is the same one that loses the keys, the conversation, the plot, and the morning. Same engine. Different verdict, depending on whether you have to live in it.",
    pull: "I sat down to do one thing. I'm sorry, what was it?",
    factIds: ["executive", "combinations"],
    relatedSlugs: ["looping-mind", "daydream-terrors", "glitch-cycle"],
    resourceIds: ["how-to-adhd", "barkley"],
    style: "rap",
    mood: "head-bob-sob",
  },
  {
    slug: "daydream-terrors",
    title: "Daydream Terrors",
    number: 3,
    available: true,
    audioUrl: "/audio/daydream-terrors.mp3",
    theme: "the imagination that turns on you",
    tagline: "The imagination that builds worlds and then uses them as evidence against you.",
    description:
      "Contradiction, self-cruelty, pressure, overclocked dreaming, and the violence of inner standards. Someone both dazzled by their own mind and deeply injured by it. The daydream isn't a coping skill anymore — it's the apartment you live in, and the lease is in the disorder's name.",
    pull: "I survived the day. I just wasn't in it.",
    factIds: ["executive", "combinations"],
    relatedSlugs: ["looping-mind", "brain-on-shuffle", "loud-brain-tired-bones"],
    resourceIds: ["additude"],
    style: "sing",
    mood: "soft",
  },
  {
    slug: "glitch-cycle",
    title: "Glitch Cycle",
    number: 4,
    available: true,
    audioUrl: "/audio/glitch-cycle.mp3",
    theme: "the named loop",
    tagline: "Not mystery. Not drama. A known loop, still undefeated.",
    description:
      "This names the mechanism clearly. Same loop. Same crash. Same intentions. Same rewrites. Same failure to sustain. The cycle isn't a personality flaw — it's a regulation failure that keeps getting dressed up as one so somebody has someone to blame.",
    pull: "Day six of starting over for the last time.",
    factIds: ["outcomes", "untreated", "executive"],
    relatedSlugs: ["looping-mind", "i-break-me", "shame-keeps-blooming"],
    resourceIds: ["barkley", "how-to-adhd"],
    style: "hybrid",
    mood: "head-bob-sob",
  },
  {
    slug: "i-break-me",
    title: "I Break Me",
    number: 5,
    available: true,
    audioUrl: "/audio/i-break-me.mp3",
    theme: "the weapon turned inward",
    tagline: "I am the weapon used against me. And I spend all my time sharpening the blades.",
    description:
      "Self-destruction as a performance of worth. Overworking, overcompensating, and punishing yourself to prove you deserve to exist, belong, succeed, or be loved. The hardest part of severe ADHD isn't what happens to you — it's what you do to yourself when you can't tolerate the gap between who you are and who you keep failing to be.",
    pull: "I break me just to prove I'm worth the time.",
    factIds: ["suicide", "rsd", "sud"],
    relatedSlugs: ["shame-keeps-blooming", "the-same-damn-knife", "slow-death-part-2"],
    resourceIds: ["988", "samhsa"],
    style: "sing",
    mood: "raw",
  },
  {
    slug: "looping-mind",
    title: "Looping Mind",
    number: 6,
    available: true,
    audioUrl: "/audio/looping-mind.mp3",
    theme: "the room that won't get quiet",
    tagline: "The point where exhaustion stops wanting inspiration and starts wanting silence.",
    description:
      "This one is darker on purpose. It speaks to exhaustion, repetition, dread, and the wish for the room itself to stop for a while. Not suicidal in the dramatic sense — just the very specific tiredness of a mind that can't put itself down. Not over-softened, because softening it would be a lie.",
    pull: "Eight years ago I said the wrong thing. I'm still saying it.",
    factIds: ["executive", "rsd"],
    relatedSlugs: ["glitch-cycle", "daydream-terrors", "shame-keeps-blooming"],
    resourceIds: ["additude", "how-to-adhd"],
    style: "hybrid",
    mood: "soft",
  },
  {
    slug: "loud-brain-tired-bones",
    title: "Loud Brain, Tired Bones",
    number: 7,
    available: true,
    audioUrl: "/audio/loud-brain-tired-bones.mp3",
    theme: "the regular operational tax",
    tagline: "Ordinary suffering, repeated so often people forget it counts.",
    description:
      "Daily life under the condition. Not an exceptional crisis. Just the regular operational tax of living with a brain that is too loud and a body that is already tired before the day starts. The version of suffering that doesn't get sympathy because it never stops long enough to be noticed.",
    pull: "I've been still for hours and somehow I'm winded.",
    factIds: ["executive", "lifespan"],
    relatedSlugs: ["daydream-terrors", "looping-mind", "slow-death-part-2"],
    resourceIds: ["additude"],
    style: "sing",
    mood: "soft",
  },
  {
    slug: "shame-keeps-blooming",
    title: "Shame Keeps Blooming",
    number: 8,
    available: true,
    audioUrl: "/audio/shame-keeps-blooming.mp3",
    theme: "the religion of self-blame",
    tagline: "Shame is what grows in the space between insight and execution.",
    description:
      "The gap between knowing and doing gets moralized until the person sees themselves as a failure instead of as someone with a brutal wiring problem. By adulthood the shame isn't a feeling anymore — it's the soil. This song sits in that garden honestly and refuses to call it anything kinder than what it is.",
    pull: "I can't tell where the disorder ends and the apologies start.",
    factIds: ["rsd", "suicide", "untreated"],
    relatedSlugs: ["i-break-me", "the-same-damn-knife", "you-know"],
    resourceIds: ["988", "chadd"],
    style: "sing",
    mood: "raw",
  },
  {
    slug: "the-same-damn-knife",
    title: "The Same Damn Knife",
    number: 9,
    available: true,
    audioUrl: "/audio/the-same-damn-knife.mp3",
    theme: "still here",
    tagline: "Not healed. Still here.",
    description:
      "This is the staying-alive song. Not triumph. Not victory. Just reaching again after falling in the same place over and over. The same trait, the same hand, the same wound — and a person who has decided, for today, to keep being here anyway.",
    pull: "Same blade. Same hand. Different week.",
    factIds: ["combinations", "outcomes"],
    relatedSlugs: ["both-things-can-be-true", "i-break-me", "fast-life-part-1"],
    resourceIds: ["chadd", "additude"],
    style: "hybrid",
    mood: "head-bob-sob",
  },
  {
    slug: "you-know",
    title: "You Know",
    number: 10,
    available: true,
    audioUrl: "/audio/you-know.mp3",
    theme: "the torture of knowing",
    tagline: "You do not need someone to explain your maze to you. You need someone to acknowledge it's there and they live in one too.",
    description:
      "This may be the emotional center of the project. It's about the torture of knowing — knowing what to do, knowing why, knowing the pattern, knowing the language, knowing how to help everyone else, and still being unable to save yourself. Not the closer — Slow Death (Part 2) is. This one is the recognition.",
    pull: "The worst part of all is that you know!",
    factIds: ["late-dx", "combinations"],
    relatedSlugs: ["both-things-can-be-true", "shame-keeps-blooming", "slow-death-part-2"],
    resourceIds: ["chadd", "additude", "how-to-adhd"],
    style: "rap",
    mood: "head-bob-sob",
  },
  {
    slug: "fast-life-part-1",
    title: "Fast Life (Part 1 of 2)",
    number: 11,
    available: true,
    audioUrl: "/audio/fast-life-part-1.mp3",
    theme: "the engine everyone claps for",
    tagline: "The engine everyone claps for while the driver is barely hanging on.",
    description:
      "This is the externally visible version of ADHD suffering — the energy, the speed, the brilliance, the intensity, the part people sometimes admire. Underneath it: white-knuckled panic, no brakes, and a nervous system burning itself alive. It rolls directly into Slow Death (Part 2), which is the bill.",
    pull: "I'd rather burn the engine than learn the route.",
    factIds: ["crashes", "sud", "lifespan"],
    relatedSlugs: ["slow-death-part-2", "i-break-me", "glitch-cycle"],
    resourceIds: ["chadd", "samhsa"],
    style: "rap",
    mood: "head-bob-sob",
  },
  {
    slug: "slow-death-part-2",
    title: "Slow Death (Part 2 of 2)",
    number: 12,
    available: true,
    audioUrl: "/audio/slow-death-part-2.mp3",
    theme: "the closer · the part nobody sees",
    tagline: "The part nobody sees because from the outside it looks like nothing.",
    description:
      "The shutdown state after the fast life. Not rest. Not laziness. Not 'taking it easy.' A collapse where the body and brain stop cooperating and the world keeps interpreting that as a choice. Any remaining hope gets eaten by the shame. Untreated ADHD is associated with a measurably shorter lifespan — accidents, addiction, suicide, neglect of medical care. This song doesn't dramatize it. It just names it and sits there.",
    pull: "Nothing dramatic. Just a hundred small things I never finished.",
    factIds: ["lifespan", "sud", "outcomes"],
    relatedSlugs: ["fast-life-part-1", "i-break-me", "shame-keeps-blooming"],
    resourceIds: ["988", "samhsa", "chadd"],
    style: "sing",
    mood: "raw",
  },
];

export const songBySlug = (slug: string) => SONGS.find((s) => s.slug === slug);

// Recommended listening order — different from the track numbering.
// Builds from thesis → mechanics → spirals → confession → fast-life/slow-death finale.
export const RECOMMENDED_ORDER: string[] = [
  "both-things-can-be-true",
  "brain-on-shuffle",
  "daydream-terrors",
  "looping-mind",
  "glitch-cycle",
  "loud-brain-tired-bones",
  "you-know",
  "the-same-damn-knife",
  "shame-keeps-blooming",
  "i-break-me",
  "fast-life-part-1",
  "slow-death-part-2",
];

export function nextInOrder(slug: string): Song | undefined {
  const i = RECOMMENDED_ORDER.indexOf(slug);
  if (i === -1 || i === RECOMMENDED_ORDER.length - 1) return undefined;
  return songBySlug(RECOMMENDED_ORDER[i + 1]);
}

export function prevInOrder(slug: string): Song | undefined {
  const i = RECOMMENDED_ORDER.indexOf(slug);
  if (i <= 0) return undefined;
  return songBySlug(RECOMMENDED_ORDER[i - 1]);
}

export const STYLE_LABEL: Record<Song["style"], string> = {
  rap: "Rap",
  sing: "Sung",
  hybrid: "Rap + sung",
};

export const MOOD_LABEL: Record<Song["mood"], string> = {
  soft: "Soft",
  raw: "Raw",
  "head-bob-sob": "Head-bob sob",
};