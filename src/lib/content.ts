export type IconType =
  | 'computer'
  | 'bin'
  | 'folder'
  | 'file-txt'
  | 'file-craft'
  | 'file-growth';

export interface FileEntry {
  id: string;
  name: string;
  type: 'folder' | 'file';
  icon: IconType;
  children?: FileEntry[];
  content?: string;
  date?: string;
  description?: string;
}

export const CONTENT: FileEntry = {
  id: 'root',
  name: 'My Notes',
  type: 'folder',
  icon: 'folder',
  children: [
    {
      id: 'craft',
      name: 'Craft',
      type: 'folder',
      icon: 'folder',
      children: [
        {
          id: 'craft:designing-for-clarity',
          name: 'designing-for-clarity.txt',
          type: 'file',
          icon: 'file-craft',
          date: 'Mar 2026',
          description: 'A few heuristics I use when the interface looks fine but still feels hard to use.',
          content: `DESIGNING FOR CLARITY
=====================
Mar 2026

A few heuristics I use when the interface
looks "fine" but still feels hard to use.

---

There's a specific failure mode in design
that I keep running into: the thing looks
polished but people still struggle with it.

The visual design is fine. The layout is clean.
And yet. Something is off.

After years of watching people use things I
designed, I've collected a few signals that
tell me clarity is missing before the usability
tests confirm it.


THE HEURISTICS
--------------

1. THE "WHERE AM I?" TEST

Cover the page title. Can you still tell
what this screen is for? If not, the
content isn't doing enough work.

Navigation labels and titles are load-bearing.
When I'm relying on position alone to orient
people, I've lost.


2. ONE QUESTION PER SCREEN

Every screen has a job. The question is:
what's the ONE thing I'm asking from the user?

When I can't answer that in five words, the
screen is doing too much.


3. THE BORED TEENAGER TEST

Imagine the most impatient user you know.
Would they know what to tap in the first
two seconds? Without reading anything?

If not, the affordance isn't strong enough.


4. SECOND-GUESS THE LABELS

"Manage", "Settings", "Configure", "Advanced" —
these words do almost no work. They describe
categories, not actions. What is the user
actually trying to DO?

Replace the noun with a verb. See if it gets
more specific.


5. WHERE DO EYES GO FIRST?

Close your eyes, then open them and look at
the screen for half a second. Where did you
look first? Is that where you SHOULD look?

Visual hierarchy is the cheapest thing to get
right and the easiest to get wrong.


---

None of these are new ideas. But I find myself
running through them every time something
feels off — and they usually point to the
right thing to fix.

The common thread: clarity is about reducing
the cognitive work required to understand what
to do. Not about removing complexity, but about
front-loading the right information at the right
moment.

---

  "Design is not just what it looks like and
   feels like. Design is how it works."
   — Some guy named Steve

`,
        },
        {
          id: 'craft:vibe-coding-experiment',
          name: 'vibe-coding-experiment.txt',
          type: 'file',
          icon: 'file-craft',
          date: 'Mar 2026',
          description: 'A low-stakes build to learn something new without turning it into a project.',
          content: `A TINY WEEKEND EXPERIMENT
=========================
Mar 2026

A low-stakes build to learn something new —
without turning it into a project.

---

I gave myself a constraint: build something
on Saturday morning. Something that doesn't
matter. Something that can be abandoned without
guilt.

The outcome was this Windows 95 website. (You're
looking at it right now. Meta.)


THE CONSTRAINT
--------------

Time box: 1 weekend.
Stakes: zero.
Goal: learn something, ship something.

No planning doc. No Notion board. No "roadmap".
Just start.


WHAT ACTUALLY HAPPENED
-----------------------

Hour 1-2: Set up Next.js, started making the
teal desktop background. Got excited.

Hour 3-4: Built the window drag system. This
was the fun part. Pointer capture is a thing
that exists. I learned this.

Hour 5-6: Realized the bevel borders are
everything. Spent too long on box-shadows.
Zero regrets.

Day 2: Content, icons, start menu. Started
feeling like a real thing.


WHAT I LEARNED
--------------

1. Pointer capture is underrated. It lets you
   drag without losing the pointer when it
   leaves the element. Game changer for
   anything drag-based.

2. Win95's visual language is incredibly
   systematic. Two pixels of bevel in the
   right direction. That's it. That's the
   whole thing.

3. Constraints create creativity. "Make it
   look exactly like 1995" is actually
   freeing — no decisions about aesthetics,
   just execution.

4. Ship before it's ready. This site went
   live before half the features worked.
   That's fine.


WHAT DIDN'T WORK
----------------

- MDX parsing: too much overhead for a
  weekend. I hardcoded the content instead.
  Not proud, not ashamed.

- Animations: Win95 doesn't animate. I kept
  adding things and then removing them.

- The recycling bin: still doesn't do
  anything. Authentic.


---

The best part of a low-stakes experiment is
that you can be honest about what you skipped.
This is me being honest.

The constraint worked. The thing exists.
I learned things.

Next weekend: something completely different.

`,
        },
        {
          id: 'craft:figma-to-code',
          name: 'figma-to-code.txt',
          type: 'file',
          icon: 'file-craft',
          date: 'Feb 2026',
          description: 'My current workflow for going from Figma designs to working code with AI.',
          content: `FIGMA TO CODE — MY WORKFLOW
============================
Feb 2026

My current workflow for going from Figma
designs to working code with AI.

---

I've been a product designer for 3 years.
Six months ago I started writing code.

Not because I had to. Because I got tired
of the handoff being a lossy process.


THE OLD WAY
-----------

Design in Figma.
Write specs.
Hand off to dev.
Watch something slightly different get built.
Go back to Figma.
Repeat.


THE NEW WAY
-----------

Design in Figma.
Use AI to generate a first pass.
Fix what the AI gets wrong.
Ship it.

Less meetings. More making.


HOW IT ACTUALLY WORKS
----------------------

Step 1: Design the component in Figma.
Keep it simple. Real components, not art.

Step 2: Screenshot the component. Drop it
into Claude or ChatGPT. Ask for a React
component. Be specific about the stack.

Step 3: The output is a starting point, not
a finish line. AI is good at structure,
bad at edge cases.

Step 4: Fix the things that are wrong.
Usually: spacing, states, accessibility.

Step 5: Show it to someone. Does it feel
like the design? If not, iterate.


WHAT AI IS GOOD AT
------------------

- Getting the structure right
- Writing boilerplate you'd hate to write
- Suggesting things you didn't think of
- Moving fast


WHAT AI IS BAD AT
-----------------

- Understanding your design system
- Edge cases and error states
- Knowing when something is "off"
- The last 10% that makes it feel right


THE REAL LESSON
---------------

AI doesn't replace the judgment call.
It just moves the work closer to the call.

The designer's job isn't to write code or
even to spec code. It's to know what "right"
looks like and close the gap between what
exists and that.

AI makes that gap smaller to close.
The judgment is still yours.

---

Still figuring this out. Will write more
as the workflow evolves.

`,
        },
      ],
    },
    {
      id: 'growth',
      name: 'Growth',
      type: 'folder',
      icon: 'folder',
      children: [
        {
          id: 'growth:small-systems',
          name: 'a-small-system-that-works.txt',
          type: 'file',
          icon: 'file-growth',
          date: 'Mar 2026',
          description: 'Less discipline, more defaults: a lightweight routine for staying consistent.',
          content: `A SMALL SYSTEM THAT WORKS
==========================
Mar 2026

Less discipline, more defaults: a lightweight
routine for staying consistent.

---

I used to believe consistency required
willpower. That if I just cared enough,
I'd do the thing.

That worked for about a week every January.


THE REFRAME
-----------

Discipline is a finite resource.
Systems are infrastructure.

You don't need to "decide" to put on a
seatbelt. It's just what you do when you
get in the car. The habit is encoded into
the context.

That's what I wanted. Encoded defaults.


THE SYSTEM (SUCH AS IT IS)
---------------------------

Morning:
  → Coffee before phone. Non-negotiable.
  → 15 min: whatever I'm learning
  → Write one sentence about yesterday

Work:
  → One thing that matters, done before noon
  → Everything else is bonus

Evening:
  → No screens 45 min before sleep
  → Write or read. No scrolling.

Weekly:
  → Sunday: plan the week in 10 min
  → Friday: write one thing I learned


WHAT MAKES IT WORK
------------------

1. It's small. Really small. Small enough
   that a bad day doesn't break it.

2. It's mine. I built it from observation,
   not from a book. It fits how I actually
   work, not how I wish I worked.

3. It changes. If something stops working,
   I replace it. No attachment to the system.

4. It has defaults, not rules. Rules feel
   like obligations. Defaults feel like
   starting points.


WHAT DOESN'T WORK
-----------------

- Tracking everything. I tried apps. I tried
  spreadsheets. I tried bullet journals.
  The tracking became the habit.

- Systems from other people. Other people's
  systems are optimized for other people's
  lives. Interesting to read, dangerous to copy.

- Perfection. Miss a day, miss a week —
  the system still works when you come back
  to it. Perfection is the enemy of ongoing.


---

The goal was never to be maximally productive.
It was to be consistently okay. To show up
most days and do the thing.

That's a much lower bar. And it turns out,
a much more achievable one.

`,
        },
        {
          id: 'growth:notes-from-istanbul',
          name: 'notes-from-istanbul.txt',
          type: 'file',
          icon: 'file-growth',
          date: 'Feb 2026',
          description: 'Observations, patterns, and the quiet joy of noticing where you live.',
          content: `NOTES FROM ISTANBUL
====================
Feb 2026

Observations, patterns, and the quiet joy
of noticing where you live.

---

I've lived in Istanbul my whole life.
Most of it I haven't really seen.

This is an attempt to fix that.


THE PROJECT
-----------

Once a week: walk somewhere I haven't
walked before. Notice things. Write them
down.

Not photos. Notes. There's a difference.


THINGS I NOTICED
----------------

The light at 5pm in February is different
from the light in August. Obvious. But I
didn't know this until I looked for it.

The Bosphorus is a different color every day.
On clear days: deep blue-green. On foggy days:
silver-grey. After rain: opaque brown.

Ferry terminals have their own time zone.
No one looks at their phone. Everyone is
just... waiting. Looking at water.

Old neighborhoods have cats who have
designated spots. The same cat, same corner,
same time. Infrastructure.

The Grand Bazaar has a smell. Not one smell —
a sequence of smells as you walk through.
I never noticed this before. Now I can't
stop noticing it.


WHAT NOTICING DOES
------------------

This is the thing I didn't expect: paying
attention to place makes you pay attention
to everything else differently.

You practice seeing. And the practice
generalizes.

I notice design problems more. I notice
when something is working without knowing why.
I notice when a conversation changes direction.

Noticing is a skill. It turns out you can
get better at it.


---

This started as a travel journal experiment
for a city I already live in.

It became something else: a practice in
looking at familiar things like they're new.

Istanbul has been doing this to people for
several thousand years. I'm a slow learner.

`,
        },
        {
          id: 'growth:reading-habit',
          name: 'building-a-reading-habit.txt',
          type: 'file',
          icon: 'file-growth',
          date: 'Jan 2026',
          description: 'How I went from "I should read more" to actually reading more.',
          content: `BUILDING A READING HABIT
=========================
Jan 2026

How I went from "I should read more"
to actually reading more.

---

"I should read more" is one of those
sentences that exists to feel good about
itself without producing any results.

I said it for years. Then I stopped saying
it and did this instead.


THE THING THAT WORKED
---------------------

Books by the bed. That's it.

No app. No goal. No tracker. No Goodreads.
Just: books within arm's reach when I'm
going to bed.

I read when I'm too tired to do anything
else. Which is every night. Which means
I read every night.


THE OTHER THINGS
----------------

Audiobooks for commutes and walks.
Started using them for non-fiction.
2x speed took a week to get used to.
Now 1x sounds slow.

Abandon bad books. This was the real unlock.
I used to finish everything. The sunk cost
kept me in books I didn't like.

Once I started quitting, I started reading
more. Less friction at the start because
the exit is clear.

Multiple books at once. One fiction, one
non-fiction, one "maybe". Switching when
stuck is better than stopping.


THE MISTAKE I WAS MAKING
------------------------

I was treating reading like exercise:
something to schedule, track, and optimize.

Reading isn't exercise. It's more like
eating. You do it because you're hungry.
The habit is: stay hungry.

Read things that make you want to read
more. Follow your curiosity, not a list.


CURRENT READING
---------------

  → Thinking Fast and Slow (yes, finally)
  → A short story collection (for the fiction
    slot, switching between stories)
  → Some half-read thing about design
    I keep meaning to finish

---

I read more this year than any other year
in my adult life. Not because I became more
disciplined. Because I stopped making it hard.

`,
        },
      ],
    },
    {
      id: 'now',
      name: 'Now.txt',
      type: 'file',
      icon: 'file-txt',
      content: `=== NOW ===
Last updated: March 2026

---

Currently reading:
  → Thinking Fast and Slow (Kahneman)
  → Various threads about AI and creativity

Currently building:
  → This Windows 95 personal site
     (you are inside it right now)
  → Exploring AI-assisted design tools
     in my day job

Currently learning:
  → How to actually write code, not just
     prompt for it
  → Prompt engineering patterns that work
     across different models
  → Turkish (studying my own city more
     carefully — see Notes from Istanbul)

Currently obsessing over:
  → The intersection of AI and design
  → Building things that stick without
     requiring maximum effort
  → Vintage computing aesthetics and what
     they say about interface design today

---

This is a "now page" — a snapshot of
what I'm focused on at this point in time.

If you want to know what I was doing in
the past, that information doesn't exist.
That's the point.

`,
    },
    {
      id: 'about',
      name: 'About.txt',
      type: 'file',
      icon: 'file-txt',
      content: `==============================
  MERVE — README.TXT
==============================

Hi. I'm Merve.

I live in Istanbul and spend most of my
time thinking about design, AI, and how
people learn to do things.

This site is my digital garden — a place
to share experiments, half-baked ideas,
and things I'm figuring out in public.

I'm a product designer with 3+ years of
experience. I built this with AI as both
a playground and a notebook. As I keep
learning and experimenting, I use this
space to document what I discover.

The Windows 95 aesthetic wasn't ironic.
It's sincere. There's something in the
pixelated borders and the teal desktop
that feels honest to me — an interface
that doesn't pretend to be invisible.

Also, it was a fun weekend project.

==============================
WHAT I DO
==============================

Product design — I make digital products
  easier to use for their actual users.

Experiments — I build things to learn.
  Most of them don't ship. That's fine.

Writing — Slowly. About design, systems,
  and things I'm noticing.

==============================
CURRENTLY
==============================

Working on:  this site, actually
Reading:     Thinking Fast and Slow
Learning:    how to ship code faster

==============================
CONTACT
==============================

Find me wherever you found this link.
Or don't. That's okay too.

==============================
`,
    },
  ],
};

export function findEntry(id: string, node: FileEntry = CONTENT): FileEntry | null {
  if (node.id === id) return node;
  if (node.children) {
    for (const child of node.children) {
      const found = findEntry(id, child);
      if (found) return found;
    }
  }
  return null;
}
