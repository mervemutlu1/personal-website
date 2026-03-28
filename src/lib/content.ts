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
  title?: string;
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
          id: 'craft:figma-agents-canvas',
          name: 'figma-agents-canvas.txt',
          type: 'file',
          icon: 'file-craft',
          title: 'Figma Just Opened the Canvas to Agents — I Immediately Tested It',
          date: 'Mar 2026',
          description: 'Three days after I shipped this site, Figma announced something I\'d been waiting for. So I tried it on the same project.',
          content: `figma.com/blog/the-figma-canvas-is-now-open-to-agents/

Three days after I shipped this site, Figma published
this announcement. I read it mid-scroll and stopped.

The Figma canvas is now open to agents.

Not just readable. Writable.

## THE CONTEXT

When I built this site, I skipped the design phase
entirely. No design work of my own. I referenced a
Windows 95 design system from Figma Community, but
I never opened a blank canvas and designed anything.
Just descriptions of what I wanted, and Claude Code
building it.

That worked. But something kept bothering me.

The feedback loop between design intent and built
output was always text. I'd describe what I wanted,
Claude Code would update the code, I'd see it was
still slightly off, I'd describe it again. If I
could have given the agent a Figma file with my
design decisions already documented, it would have
built closer to what I had in mind from the start.

But here's what I thought was the limitation:
AI agents could read Figma, but they couldn't
write to it. So the reverse workflow — build first,
then bring it into Figma — felt impossible.

>> That's what Figma just changed.

## WHAT FIGMA ANNOUNCED

On March 24, 2026, Figma shipped a new MCP tool:
\`use_figma\`.

Previously, Figma's MCP server was read-only for agents.
Claude Code could look at a Figma file, understand its
structure, extract tokens and components. But it couldn't
touch the canvas.

\`use_figma\` changes that. Agents can now create and
modify design assets directly in Figma — using your
actual design system. The canvas is now a shared
workspace between human and agent.

Alongside \`use_figma\`, Figma introduced something
even more interesting: **skills**.

Skills are markdown files that teach agents how your
team works. Instead of rewriting long prompts every
time, a skill gives the agent a stable sequence of
steps, conventions, and standards to follow. They're
what make the output consistent rather than random.

Nine community-built skills launched with the
announcement. The one I immediately needed:

**\`/figma-generate-library\`** — Create new components
in Figma from a codebase. A packaged workflow that
tells the agent how to read your code, extract design
decisions, and build proper Figma components with
variants, auto layout, and variables.

## WHAT I TRIED

I wanted to test this on a real project. So I used
this site — a Next.js app built entirely through
prompts, with no design documentation of my own.

**STEP 1 — Install the skills**

~~~
git clone https://github.com/figma/agent-skills
cp -r agent-skills/skills/figma-generate-library ~/.claude/skills/
cp -r agent-skills/skills/figma-generate-design ~/.claude/skills/
cp -r agent-skills/skills/sync-figma-token ~/.claude/skills/
cp -r agent-skills/skills/apply-design-system ~/.claude/skills/
~~~

The Figma MCP server was already connected and
auto-updated — no separate installation needed.

**STEP 2 — Create a blank Figma file**

I created a blank Figma file as the target.

**STEP 3 — Navigate to the project in Claude Code**

~~~
cd ~/personal-website
claude
~~~

Claude Code read the entire codebase — components,
CSS variables, MDX files, everything.

**STEP 4 — Run the skills in order**

I used four skills in sequence. Then \`/sync-figma-token\`
to sync CSS tokens to Figma variables,
\`/figma-generate-design\` to build screens using the
components, and \`/apply-design-system\` to review
everything and flag inconsistencies.

## THE HONEST RESULT

The Design Tokens page came out well. Colors,
typography scale, the four bevel variants (Raised,
Pressed, Sunken, Window Frame), spacing values — all
extracted from the actual code and documented in Figma.

>> For a project with no design documentation, having accurate tokens in Figma after a single prompt was genuinely surprising.

The components were a different story.

![Blog Post Reader component — created by the agent in Figma](/images/craft/foto.png)

Structure was there. The screens were skeletal. Correct in layout,
recognizable as the site — but not the kind of frames
you'd hand to a stakeholder.

This matches what others testing the tool have found.
The agent doesn't automatically detect your design
system or apply variables unless you explicitly tell
it to. Every time. Left to its defaults, it hardcodes
values and skips the component structure you'd expect.
It's not a bug — it's how agentic tools work.

>> The agent optimizes for the literal goal you gave it, not the implicit standards in your head.

The honest summary: what it created was a starting
point. Rough, but real. A Figma file I could open,
edit, and build on top of — which is meaningfully
faster than starting from a blank canvas.

## WHAT THIS CHANGES FOR PRODUCT DESIGNERS

I'm a product designer at Climateware, working on
[Carbondeck](https://www.carbondeck.io) — a SaaS
platform for carbon management. Complex product,
growing design system, constant pressure to ship
without losing quality.

Here's where I think this workflow actually helps:

**Token documentation becomes automatic.** When code
changes, an agent can reflect those changes in the
Figma file. The \`/sync-figma-token\` skill exists
specifically for this.

**Rough explorations cost less.** An agent can
scaffold a new feature direction in Figma from a
description. It won't be polished. But it gives you
something to react to — which is often all you need
before investing real design time.

**Component auditing gets faster.** The
\`/apply-design-system\` skill can flag where designs
drift from the system. For a platform with dozens of
components across many screens, that's real time
saved every sprint.

>> The design judgment still has to come from somewhere. Agents don't know what good looks like for your specific product, your users, your constraints.

The version of this tool that teams will actually use
isn't the raw agent — it's the agent plus skills that
encode your team's decisions.

But the distance between "I have an idea" and "I have
something in Figma to show" is getting shorter. For
a product designer who spends more time than she'd
like on documentation and handoff work, that's the
right distance to close.

## WHAT'S NEXT

This is still beta. The teams that figure out how to
build good skills — that encode their design system,
their conventions, their standards — are going to
move significantly faster than those that don't.

I'll keep testing this on real product work.
When something interesting happens, I'll write it here.

That's what this section of the site is for.

Tags: ai-design / figma / product-design / use-figma / agents

`,
        },
        {
          id: 'craft:how-i-built-this',
          name: 'how-i-built-this-without-writing-code.txt',
          type: 'file',
          icon: 'file-craft',
          title: 'How I Built This Without Writing a Single Line of Code',
          date: 'Mar 2026',
          description: 'A Windows 95 personal site, built with AI tools, zero coding experience, and one very long prompt.',
          content: `HOW I BUILT THIS WITHOUT WRITING A SINGLE LINE OF CODE
=======================================================
Mar 2026

A Windows 95 personal site, built with AI tools,
zero coding experience, and one very long prompt.

---

I have never written a line of production code in my life.
I'm a product designer. I know how interfaces should feel.
I know what makes a button wrong. I do not know what a
useEffect hook is, and until recently, I did not need to.

This site exists anyway. Here's how — and why.

---

## THE IDEA

Because something is shifting in product design,
and I wanted a place to think about it out loud.
AI tools that used to feel like shortcuts started
feeling like actual workflows. Figma Make, Lovable,
Stitch started generating full designs and interfaces
from prompts. Figma MCP made design files talk
directly to code. Cursor and Claude Code made
shipping something feel as fast as describing it.

The contrast between that shell and what's
inside it is the point.

In the pages that follow, you'll find how I built
and shipped this site using Figma, Claude Code, and
Vercel — without designing a single frame or writing
a single line of code. Just a clear picture of what
I wanted, and the right tools to describe it.

It wasn't about learning to code.
It was about learning to direct.

---

## STEP 1 — FINDING THE DESIGN SYSTEM

The first problem: I'm not building a Windows 95 design
system from scratch. That would take weeks and a very
different skill set.

So I looked in Figma Community. Someone had already done it.

→ Windows 95 Design System (Community)
→ https://figma.com/community/file/WqRM3ioze2H6GhABxv7uWH

Every component. Every color. Every beveled border.
The exact teal. The exact grey. The pixel font (W95FA
by FontsArena). All of it, already built.

>> I didn't design this site. I referenced it.

---

## STEP 2 — CONNECTING FIGMA TO CLAUDE CODE VIA MCP

This is where it gets interesting.

MCP stands for Model Context Protocol. It's a way to
connect external tools — like Figma — directly to
Claude Code, so Claude can see your design files
while it writes the code.

Setting up the Figma MCP:

  1. Open Claude Code settings
  2. Add MCP server → select Figma
  3. Authenticate with your Figma account
  4. Done

Once connected, Claude Code can look at any Figma frame
and use it as a reference while building. Not just a
screenshot — it reads the actual component structure,
color values, spacing, and layer names.

This meant I could say: "Use this design system as your
visual reference" and point at the Figma file.
Claude would actually understand what it was looking at.

---

## STEP 3 — THE PROMPT

I didn't open a code editor. I opened Claude (claude.ai)
and described what I wanted. We went back and forth.
I explained the structure, the content categories,
the window behavior, the aesthetic rules.

Claude turned all of that into a single, detailed prompt
to give to Claude Code. I gave it to Claude Code
in the terminal. It started writing. I watched.

---

## STEP 4 — CLAUDE CODE SKILLS

Before running the prompt, I installed two skills into
Claude Code — think of them as permanent instructions
that load every session:

→ \`frontend-design\` (by Anthropic)
  Tells Claude to make distinctive UI decisions
  instead of generic AI defaults. No Inter font.
  No purple gradients. Commit to an aesthetic.

→ \`web-design-guidelines\` (by Vercel)
  100+ rules for accessibility, UX best practices,
  and interface quality. Runs as a background check
  on everything Claude builds.

Installing them took about 2 minutes:

~~~
git clone https://github.com/anthropics/skills.git
cp -r skills/skills/frontend-design ~/.claude/skills/

git clone https://github.com/vercel-labs/agent-skills.git
cp -r agent-skills/skills/web-design-guidelines ~/.claude/skills/
~~~

After that, Claude Code reads them automatically.
Every project. Every session.

---

## STEP 5 — ITERATION

Claude Code built the first version in one session.
It wasn't perfect. Nothing is.

I kept a second window open — claude.ai — and used it
to translate what I wanted into prompts for Claude Code.
A feedback loop:

  See something off → describe it here → get a prompt →
  paste into Claude Code → see the change → repeat

>> No debugging. No Stack Overflow.

No understanding what a React component actually is
at a structural level. Just describing what I wanted
and refining.

Some things I iterated on:
  → Icon sizes (too small at first, bumped to 48px)
  → My Notes folder opens automatically on load
  → Close buttons weren't working (fixed)
  → Blog post reader needed to be more readable
     (kept Win95 chrome, redesigned the content area)

---

## STEP 6 — DEPLOYING TO VERCEL

Getting a Next.js site live on Vercel is surprisingly
straightforward — even if you've never deployed anything.

  1. Push your project to GitHub
     (Claude Code handles the git commands if you ask)

  2. Go to vercel.com → New Project
     Import your GitHub repository

  3. Vercel detects Next.js automatically
     No configuration needed

  4. Click Deploy

That's it. Vercel builds the project, assigns a URL,
and every time you push new changes to GitHub,
it redeploys automatically.

The whole process took about 10 minutes the first time.

---

## WHAT I LEARNED

This wasn't about learning to code.
It was about learning to direct.

Knowing what you want — specifically, visually,
structurally — turns out to be most of the work.
The prompt I gave Claude Code was detailed because
I had a clear picture.

>> Vague prompts get vague results.

But directing isn't always clean.

I iterated more than I expected. Some things Claude
Code built were almost right — close enough that I
accepted them, then changed my mind three versions
later. Some things broke when I touched them. A font
size change would fix one thing and quietly break
another. That's not a flaw in the tool. That's what
building anything actually feels like.

The Figma MCP connection changed something for me —
design and code stopped feeling like separate phases.
I could point at a component and say "make it look
like that" and it would. But the gap between Figma
and the live site isn't zero. When the code drifts
from the design — and it does — you have to decide
whether to update the design to match the code, or
push the code back toward the design.

>> That alignment work doesn't disappear. It just moves.

>> If you don't know what good looks like, a faster tool just gets you to bad faster.

The design judgment still has to come from somewhere.
AI amplifies taste. It doesn't replace it.

The last thing: iteration is the whole game.
The first version was rough. Every version after
was better.

>> Not because the tool got smarter — because I got clearer about what I wanted.

---

>>> I don't know how this site works at a code level.

>>> I know exactly how it should feel.

>>> For now, that's enough.

---

Tags: ai-design / vibe-coding / figma / product-design / no-code

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
          id: 'growth:dopamine-detox',
          name: 'dopamine-detox.txt',
          type: 'file',
          icon: 'file-growth',
          date: 'Jun 2023',
          description: 'How resetting your dopamine baseline changes everything about motivation and focus.',
          content: `DOPAMINE DETOX: IT WILL CHANGE YOUR LIFE
=========================================
Jun 2023

How resetting your dopamine baseline changes
everything about motivation and focus.

---

If you can't read even for 5 minutes or study
and think you have a distraction — this post is for you.

If you clicked this, you're probably having trouble
focusing on things you used to do easily. You may not
be able to read a book for a few minutes without getting
bored. You may find you're easily distracted.

But if you can spend hours on social media and video
games without being distracted, your dopamine system
may be damaged.

Dopamine is secreted by the brain when we attain some
goal. It can be as minor as drinking water, or as
important as getting into your dream university.

When we start studying, dopamine is secreted at first,
but decreases over time. Meanwhile, social media
algorithms constantly create new content, making us
feel good all the time. We run this system down by
spending too much time on platforms. When we don't get
a reward right away, we give up and return to social
media for the next hit.

An experiment was conducted on mice given a button
that released dopamine into their brains. The mice
lost their desire for food, water, and sex — and
instead just kept pressing the button.

Sound familiar?

When we cause our brain to release too much dopamine,
the brain tries to balance it two ways:

→ Decreases dopamine production
→ Dopamine can no longer reach its target

When we're exposed to too many instant pleasures,
it's no longer enough. We want more and different kinds.
It's the same with drugs and alcohol. Initially, a beer
gets you drunk. After a while, that number is 3–4.

I was experiencing this. I used to finish a book in a
day. Now I spend almost 2 hours on Instagram daily.
I know it needs to change. This is part of why I
started a 50-day challenge.

---

## THREE METHODS

## 1. One-day dopamine detox

Get away for one day from everything that gives you
pleasure. Social media, gaming, music, junk food,
smoking, alcohol. All of it.

Our minds have been running hot for a long time.
One clean day can reset more than you'd expect.

## 2. One week — selective detox

Choose one or more things to cut. For example:
no Instagram and Twitter for a week. This is a
tactic I use from time to time. It's accessible
and produces real results.

## 3. One week — full detox once a week

One solid detox day per week, every week.
This is the hardest program. Start with options
1 or 2, then push yourself over time.

---

While detoxing: walk, read, pray, sit with yourself.
There are a lot of other options.

>> If you want to succeed, you have to get away from
things that give immediate pleasure. Success is the
priceless pleasure that comes after long, hard work.

---

Tags: dopamine / focus / habits / mental-health

`,
        },
        {
          id: 'growth:learned-optimism',
          name: 'learned-optimism.txt',
          type: 'file',
          icon: 'file-growth',
          date: 'Aug 2023',
          description: 'What Martin Seligman\'s research reveals about how optimists think differently.',
          content: `LEARNED OPTIMISM: 3 THINGS HAPPY PEOPLE DO DIFFERENTLY
=======================================================
Aug 2023

What Martin Seligman's research reveals about how
optimists think — and how it can be learned.

---

Everyone wants happiness, an easy and enjoyable life.
Unfortunately, there is a lot we do not have control over.

Some people can stand strong in devastating events.
Their psychology is often little or not affected.
And then there are people like me who can be hurt
by a small incident and carry it for a long time.

A friend's comment said with good intentions can
make me feel terrible for days. So why can I be
made unhappy so easily when others stand stronger
in far worse situations?

I searched for the answer. In this post, I'll tell
you what learned optimism is and how I apply it now.

The father of the concept is American psychologist
Dr. Martin Seligman. According to him, it is necessary
to strive for optimism and to see solutions and
possibilities in every situation encountered in life.

>> Being optimistic takes effort and willpower.
You have to work at it. Which means it can be learned.

---

## 1. THIS TOO SHALL PASS

When we encounter something bad, we think "my life
is over, everything is ruined." But how we approach
the situation affects us just as much as the situation.

Focus on "this too shall pass" rather than the situation
itself. You've been here before. It is not your first
breakdown. You made it through. You can again.

I still try to change my mindset this way. It isn't easy
— especially when old traumas surface unexpectedly.
But with enough practice, everything gets better.

## 2. MISTAKES BELONG WHERE THEY ARE MADE

Don't put the weight of one failure on all parts of
your life. Failing a math exam doesn't mean you
failed everything. One bad relationship doesn't mean
all future ones will go the same way.

Do not generalize. Think about why you feel bad,
but be realistic. Are you feeling bad about a mistake
— or are you letting it define your whole life?

I felt like a failure just because I chose the wrong
career. Now I accept that my career is just one part
of my life. It doesn't define me.

## 3. MISTAKES DON'T DEFINE YOUR PERSONALITY

Sometimes we take risks and things don't work out.
But the reason things went wrong isn't always you.
There are situations outside your control.

Two startups with the same goal can end up very
differently doing everything the same. Sometimes
you lose because it wasn't the right time.

>> Accept your success. Stop attributing your wins
to luck. Your achievements come from you.

---

According to Seligman, the skills needed to get rid
of helplessness can be learned. It is seeing failures
as temporary, not permanent. It is developing solutions
and moving forward against the problems you face.

I hope you get the happiness you want — and more
importantly, that you stay there.

---

Tags: optimism / psychology / happiness / mindset

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

Currently building:
  → This personal site (you are inside it right now)
  → A workflow for turning daily work
     into something worth publishing

Currently learning:
  → How to use AI in day-to-day product design —
     faster prototypes, better design decisions
  → Prompting for design systems: letting AI
     help structure components and tokens
  → Getting real feedback from user research
     sessions faster with AI-assisted synthesis
  → How to document the process while
     living it, not after

Currently obsessing over:
  → The gap between design and code closing —
     and what that means for how I work
  → What it looks like when a product designer
     learns to ship, not just spec
  → Whether AI makes design better or just faster —
     I'm still figuring that out

---

This is a "now page" — a snapshot of what
I'm focused on at this point in time.

If you want to know what I was doing before,
that information doesn't exist.
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

I'm a product designer with 3+ years of experience.
I built this with AI as both a playground and a notebook.
As I keep learning and experimenting, I use this space
to document what I discover.

The Windows 95 aesthetic isn't ironic. It's a frame.

I'm watching AI reshape how product designers work —
Figma MCP, Claude Code, Cursor — tools that turn a
description into a running interface. This site is
where I take notes on that shift.

The retro shell, the modern content.
The contrast is the point.

Also, it was a fun weekend project.

==============================
WHAT I DO
==============================

Product design — I make digital products
  easier to use for their actual users.

Experiments — I build things to learn.
  Most of them don't ship. That's fine.

Writing — About design, systems,
  and things I'm noticing.

==============================
CURRENTLY
==============================

Working at:  Climateware, as a product designer
Working on:  this site, actually
Learning:    using AI to design, build, and ship faster

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
