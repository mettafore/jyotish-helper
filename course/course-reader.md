# Elite AI-Assisted Coding

*Course Reader*

**Eleanor Berger**

# Part I — Foundations

# Lesson 1 — Orientation & The AI-Assisted Development Model

*This lesson sets the terms for the whole reader. It explains what “AI-assisted coding” actually means, what kinds of outcomes we should optimise for, and why good results depend less on model mystique than on disciplined engineering practice. By the end, you should have a clear mental model for the course and two durable habits to carry into every session: be specific, and curate context.*

## The Promise

AI-assisted development is not about typing less for its own sake. It is about improving the quality of software work while reducing the friction between intention and delivery. Used well, these tools help you move from idea to merged change more quickly, but the deeper value is that they also help you think more clearly, review more systematically, and delegate routine or multi-step work with greater confidence.

We will optimise for four outcomes throughout this course:

- **Quality** — producing clearer, more dependable, more maintainable software.
- **Velocity** — shortening the path from idea to tested, reviewable implementation.
- **Efficacy** — making developers more capable, not merely faster at the obvious bits.
- **Democratisation** — widening who can contribute meaningfully when the right guardrails are in place.

These outcomes support each other. Better context and clearer specifications reduce rework, which improves velocity. Better review and tighter feedback loops improve quality, which makes future changes easier. Better tooling and clearer interfaces let more people participate without turning the codebase into a crime scene. The aim is not chaos with autocomplete. It is disciplined leverage.

Democratisation, though, is not a promise that every task becomes equally safe for every contributor. The practical meaning is narrower and more useful: more people can contribute to well-specified, reviewable, low-blast-radius work when the harness is strong. The moment the task touches money, safety, security, or deep architectural trade-offs, the guardrails and expertise need to tighten again.

## What “AI-Assisted” Means In Practice

It helps to start with a simple reframe: AI-assisted software development is still software development. The same fundamentals remain in force — architecture, tests, interfaces, version control, review, documentation, and operational discipline. What changes is that more of the work can now be delegated, accelerated, or explored conversationally.

In practice, this means you will move between several kinds of interaction with AI systems:

- **As an assistant** — asking questions, generating drafts, explaining code, or proposing edits while you remain tightly in control.
- **As a reviewer** — checking a diff, highlighting risks, tracing a bug, or stress-testing a plan before implementation.
- **As an agent** — taking on a multi-step task with tools, context, and a goal, then returning with a concrete artefact such as a patch or pull request.
- **As an operator in the loop** — helping with CI failures, routine maintenance, documentation drift, issue triage, or other ongoing engineering work.

These are not rigid categories. The same task may move through several of them: you might begin in chat clarifying the problem, switch into a narrow edit once the shape is clear, and only then delegate a broader implementation. Later in the course — and in the Week 1 demo — we will make that movement explicit.

It is also useful to name the five practical modalities we will use across the reader: **completion**, **inline editing**, **chat Q&A**, **chat-driven editing**, and **agentic coding**. Different tools surface these differently — for example in an IDE sidebar, a terminal session, or a hosted pull-request workflow — but the real question stays the same: how much context, autonomy, and review does this task actually need?

The important shift is that software work becomes more orchestral. You are no longer only writing code directly. You are also choosing modalities, shaping specifications, curating context, delegating subtasks, and reviewing outputs. In other words, part of the job becomes designing the conditions under which good work can be produced.

This is also where a useful distinction appears. Outcome-first improvisation has its place in throwaway prototypes or low-stakes experiments, but professional work needs a different posture. The moment code is expected to survive review, maintenance, or operational scrutiny, you are no longer merely “vibe coding”. You are doing agentic engineering: using AI inside a workflow where specifications, tests, review, and accountability still matter.

That distinction has become sharper as the tooling has matured. **Vibe coding** can be perfectly reasonable when the artefact is disposable and the fastest route to a rough answer matters more than long-term comprehension. **Agentic engineering** begins the moment the result is expected to survive review, incident response, reuse, or hand-off. At that point, “it seems to work” is no longer enough. The work needs to be legible, testable, and reversible.

That distinction also carries an ethical boundary. Outcome-first improvisation is fine for throwaway prototypes, experiments, and personal tooling. It is not fine for systems where failure affects money, safety, privacy, compliance, or other people’s future work. In those settings, engineering discipline is not a preference. It is part of the job.

## The AI-Assisted Development Model

A useful mental model is this: the model supplies fluency, while you supply judgement.

Large language models are very good at operating inside a well-described local problem. They can transform code, explore options, write first drafts, follow patterns, and use tools to gather more information. What they are not good at is inferring your unstated standards, understanding your project’s hidden constraints, or reliably choosing the right trade-off when the situation is ambiguous and the brief is vague.

That leads to a practical division of labour:

- **You define the objective** — what needs to happen, why it matters, and what counts as success.
- **You provide the operating environment** — context, documentation, conventions, tooling, and constraints.
- **The model does scoped work** — drafting, transforming, searching, planning, testing, or executing steps against the environment you have exposed.
- **You review and steer** — accepting, rejecting, refining, or tightening the task until the output is fit for use.

That judgement is not an abstraction. It includes deciding what should be delegated at all, which trade-offs still need a human call, what evidence counts as proof, and when a task should be narrowed, split, or stopped. The model accelerates the work. You remain responsible for the shape of the work.

When this works well, you spend less time wrestling with syntax and boilerplate, and more time on design, verification, prioritisation, and trade-offs. That is the development model this course is trying to build: not blind trust in autonomous behaviour, but deliberate use of AI to make high-quality engineering more repeatable.

This also means the old engineering disciplines matter more, not less. Clear interfaces, explicit architectural boundaries, dependable tests, and coherent review practices give the model something real to work with. An agent cannot reliably respect boundaries that the project itself has never made clear.

## The Two Principles That Matter Most

Across tools, models, and workflows, two principles show up again and again. If you remember nothing else from this lesson, remember these.

### Specificity

AI systems are unusually willing to proceed on partial information. When a human teammate is missing something important, they may stop and ask. Models frequently do not. They produce something plausible and move on. That means vague prompts are expensive even when they look fast.

Specificity means describing the task with enough precision that the model does not need to guess at the important parts. In practice, that often means naming:

- the exact objective;
- the acceptance criteria;
- relevant constraints;
- important non-goals;
- the style or approach you want followed; and
- any files, tools, or sources that should be consulted.

The goal is not decorative verbosity. It is to reduce ambiguity. A short prompt can be specific; a long prompt can still be muddled. What matters is whether the brief tells the model what good looks like.

A short contrast makes the point. “Add CSV export to the admin page” sounds clear until the model has to guess about columns, permissions, encoding, and tests. A better brief might say:

- **Intent** — add CSV export for the existing orders table so support staff can reconcile orders offline.
- **Acceptance criteria** — export includes the currently visible columns, uses UTF-8 CSV, and is triggered from the existing admin toolbar.
- **Constraints** — reuse the current query layer and do not introduce a new dependency.
- **Non-goals** — do not redesign the table or add scheduled exports.

That version is only slightly longer, but it changes the task from plausible improvisation to a reviewable brief.

### Curating Context

A strong model with weak context behaves like a talented contractor dropped into an unfamiliar codebase on no sleep and with no onboarding. It may still do something impressive, but it will waste time guessing and it will miss important local rules.

Context is everything that makes the work situated rather than generic: repository structure, build and test commands, architectural decisions, dependencies, documentation, review standards, house style, product intent, operational constraints, and previous decisions that ought not to be rediscovered from first principles.

This matters because model performance is not determined by model capability alone. It is determined by model capability working against a particular task inside a particular environment. Well-curated context narrows the distance between generic intelligence and useful contribution.

A helpful shorthand is to think of context in three dimensions:

- **Intent** — why this task exists, what problem it solves, and what success should look like.
- **Logic** — how this codebase, workflow, or system actually works; where the sharp edges and real dependencies are.
- **Style** — the conventions, patterns, naming, and presentation choices that make the output feel native rather than generic.

That framing also points toward the next lessons. In practice, context will show up as always-on rules, reusable Skills, runtime connections such as `MCP`, and living documents that stay close to the work itself.

## What This Course Is — And Is Not

This course is deliberately practical. It is not trying to settle grand philosophical questions about artificial intelligence, nor is it a vendor loyalty programme in mild disguise.

Some readers will explore these ideas in tools such as GitHub Copilot, Claude Code, Codex, Cursor, or editor-native chat surfaces. The point is not to pick a mascot. It is to understand the engineering patterns that transfer across them.

It is:

- **vendor-agnostic** — the principles matter more than the product logos;
- **framework-first** — patterns that transfer across tools matter more than loyalty to one interface;
- **workflow-focused** — we care about how work actually gets done in repositories and teams;
- **engineering-first** — specifications, tests, review, and operations still matter;
- **progressive** — each lesson adds another layer of capability and control.

It is not:

- a defence of “vibe coding” as a universal method;
- a claim that AI replaces developers or makes fundamentals obsolete;
- a catalogue of every tool on the market;
- a promise that prompt cleverness alone can rescue weak engineering practice.

The broader argument is more modest and more useful: if you combine strong specifications, curated context, sensible tooling, and disciplined review, AI becomes a dependable engineering multiplier. If you do not, it becomes an unusually confident source of rework.

## The Course Arc

The reader is organised to match that claim.

### Part 1: Foundations

We begin by building the basic operating model. That includes context engineering, reusable instructions, the spectrum of coding modalities, and the craft of writing more precise requests and specifications. The goal of Part 1 is not merely to know the vocabulary. It is to help you set up an environment in which good results become normal.

### Part 2: Agentic Software Engineering

The second part moves from personal fluency to disciplined delegation. We will look at specification-driven development, control versus autonomy, sub-agents, tooling, and harness design. This is the layer where AI-assisted work starts to resemble a repeatable delivery system rather than a clever conversation.

### Part 3: Agents At Scale

The final part expands the frame again: background agents, agentic workflows, scaling patterns, security, measurement, and organisational adoption. By that point, the question is no longer “can the model help me code?” but “how do we make AI assistance safe, reviewable, and genuinely useful across a team or an organisation?”

Seen together, the course moves from individual technique to system design. That is deliberate. Most failures in AI-assisted development are not failures of raw model output. They are failures of workflow, interfaces, guardrails, or measurement.

## How To Get The Most From The Course

The course will work best if you treat it as an active practice rather than a passive feed of useful-sounding ideas. Watching the lesson and reading the companion reader matter, but they are only the starting point.

To get the most out of it:

- **Watch the lesson and read the reader together** — use the video for demonstration and emphasis, and the written lesson for slower, more reflective understanding.
- **Attempt the homework exercises yourself** — do not skip straight to the walkthrough. The productive struggle is part of the point.
- **Ask questions in the Discord** — especially when something is unclear in your own environment or workflow.
- **Bring questions to the office hours sessions** — live discussion is often where abstractions finally become concrete.

Active engagement matters because AI-assisted development is a practical craft. You will not build judgement by osmosis. You build it by trying things, noticing where they break, comparing approaches, and asking better questions over time.

## Your Default Operating Posture

Alongside that course arc, it helps to fix one practical default early: do not try to use the most autonomous workflow available by default. Start with the smallest unit of delegation that gives you useful leverage.

That usually means:

- ask questions before issuing commands;
- test a prompt in a narrow scope before expanding it;
- inspect outputs early rather than after a heroic multi-file run;
- prefer reversible changes — feature flags, small diffs, and clean rollback paths make experimentation safer;
- commit or checkpoint before risky changes;
- keep tasks reviewable;
- prefer clear specifications over improvisation when the stakes rise.

This is less glamorous than grand claims about autonomous software factories, but it works better. In practice, strong AI-assisted development feels closer to good technical leadership than to magic. You create the conditions, define the boundaries, and review the work. The tool does not abolish responsibility. It changes the shape of it.

There is another reason to prefer this active posture: passive delegation creates **comprehension debt** — the gap between how much code exists and how much anyone genuinely understands. AI can generate code faster than a reviewer can absorb it, and passive code generation predictably weakens later comprehension, debugging, and code-reading skill. If you optimise only for output volume, you eventually inherit code that passes tests yet cannot be changed with confidence. Treat the model as a thinking partner rather than an answer machine: sketch your own view first, ask it to challenge your assumptions, ask it what it is assuming, and keep the review loop intellectually active.

## Closing Thought

The main thing to understand at the start of this course is that AI-assisted development is not a separate craft floating above software engineering. It is software engineering conducted through a new set of interfaces. Those interfaces are powerful, but they are only as good as the discipline around them.

If you optimise only for speed, you will get a great deal of plausible output and a surprising amount of avoidable pain. The risk is not only immediate rework. It is also comprehension debt: code accumulates faster than understanding does. Passive delegation makes that worse. Active delegation — sketching your own view first, asking the model to challenge it, testing the result, and reviewing with intent — is the healthier pattern.

If instead you optimise for specificity, context, reviewability, and controlled delegation, you get something much more valuable: a repeatable way to produce better work with less friction.

That is the frame for everything that follows. We are not learning how to impress a model. We are learning how to build workflows in which the model can be genuinely useful.

---

## Deep Dives

### Core Framing
- [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) — A strong foundation for thinking about workflows, agents, and the trade-offs between simplicity and autonomy.
- [About GitHub Copilot coding agent](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-coding-agent) — Useful for understanding the pull-request-centric background-agent model.
- [Common workflow patterns for AI agents—and when to use them](https://claude.com/blog/common-workflow-patterns-for-ai-agents-and-when-to-use-them) — A compact framing for sequential, parallel, and evaluator-optimizer workflows.
- [What is Agentic Engineering?](https://simonwillison.net/2025/May/22/what-is-agentic-engineering/) — A crisp “tools in a loop” explanation that sharpens the lesson’s core development model.

### Specificity & Context
- [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) — Why context is the real performance surface for agentic work.
- [Your AI Is Only as Good as Your Context](https://elite-ai-assisted-coding.dev/p/your-ai-is-only-as-good-as-your-context) — Practical course-site framing for the same core idea.
- [Refine your initial prompt instead of course-correcting](https://elite-ai-assisted-coding.dev/p/refine-your-initial-prompt-instead-of-course-correcting) — A useful reminder that better briefs beat repeated nudging.
- [Comprehension Debt](https://www.builder.io/blog/comprehension-debt) — Why passive delegation eventually leaves teams with code they can no longer change confidently.
- [How can I use AI without losing my core problem-solving skills?](https://elite-ai-assisted-coding.dev/p/use-ai-without-losing-problem-solving-skills) — Helpful if you want to preserve judgement rather than outsource it completely.

### Tooling Landscape
- [A Straightforward Answer to “What Tool Should I Use?”](https://elite-ai-assisted-coding.dev/p/a-straightforward-answer-to-what-tool-should-i-use) — A pragmatic overview of the current tool landscape.
- [What are the key differences between IDE-focused tools and CLI-based agents?](https://elite-ai-assisted-coding.dev/p/ide-vs-cli-agents) — Helpful for choosing a primary modality without becoming doctrinaire.
- [Agentic AI Foundation (AAIF)](https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation) — A useful signal that these patterns are consolidating into broader ecosystem standards.

# Lesson 2 — The Portable Context Stack

*If specificity tells an agent what you want, context gives it the environment in which that request can be carried out intelligently. This lesson introduces the layered context model that underpins the rest of the course: a portable stack of rules, documents, references, and runtime connections that can move with you from project to project. By the end, you should be able to think about context as an engineered system rather than a bag of helpful notes.*

## Why Context Is The Real Multiplier

Prompting is often discussed as though the prompt were the whole story. In practice, the prompt is only the most visible part of a larger context surface. The model is always responding to the total state it has been given: instructions, repository files, local documentation, external references, tool descriptions, previous conversation, runtime data, and any rules loaded before the task even begins.

This matters because model outputs are highly sensitive to missing local information. A general-purpose model may know plenty about Python, React, or Docker. It does not automatically know your naming conventions, your branching policy, your preferred package manager, your deployment process, or which part of the repository is treated as the source of truth. Without that local context, it must guess. And it does so with unnerving cheerfulness.

Nor does context have to be text alone. Screenshots, diagrams, style guides, voice notes, and short recordings can all function as context if they reduce ambiguity and make the work more situated. The governing question is simple: does this artefact help the model understand what good looks like in this project?

A useful way to think about this is that context narrows the space of plausible behaviour. The better the context, the less improvisation the model has to do. That does not eliminate review or testing, but it makes the model far more likely to operate within the boundaries you actually care about.

## From Ad Hoc Notes To A Portable Stack

Most people begin with scattered instructions: a few remarks in chat, maybe a repository note, perhaps a copied command or two. That can work for one-off tasks, but it does not scale. As soon as you move between projects, tools, or collaborators, the same advice must be restated over and over.

A better approach is to design a **portable context stack**: a layered model that separates enduring context from local context and static references from runtime connections. The layers are conceptual rather than technical. Files are still files; Markdown is still Markdown. The value of the stack is that it helps you decide what belongs where, what should always load, what should remain optional, and what needs to be kept current.

The stack we will use has four layers:

- **Global rules** — enduring preferences and defaults that follow you across projects.
- **Project context** — repository-specific instructions, standards, and operating knowledge.
- **External references** — framework, library, and platform documentation you do not maintain yourself.
- **Living documentation** — specifications, plans, ADRs, and other project artefacts that evolve with the work.

Together, these layers make delegation repeatable. The model does not need to rediscover your environment each time. It can start from a more complete operating picture.

## The Four Layers

### Layer 1: Global Rules

Global rules are the instructions you want in force almost everywhere. They express your default engineering posture.

Typical examples include:

- preferred tools and package managers;
- coding style and formatting expectations;
- testing habits;
- source-control conventions;
- common safety preferences; and
- default behaviours for exploration, editing, and validation.

These rules are especially valuable because they encode lessons that you do not want to relearn in every repository. If you always want Python work to use `uv`, always want changes committed on a topic branch, or always want agents to run tests after edits, that should live at the global layer.

What belongs here is not “everything important”. It is the set of defaults that are stable across your work. Keep this layer opinionated but concise. If global rules become bloated, they stop feeling like a foundation and start feeling like a cargo hold.

### Layer 2: Project Context

Project context is where the stack becomes truly useful. This is the layer that tells the model how *this* codebase works.

Examples include:

- repository structure and key directories;
- build, test, and lint commands;
- architectural boundaries;
- naming and coding conventions specific to the project;
- product goals and local priorities;
- review or release expectations;
- local warnings, edge cases, or “do not do this” guidance.

This is where files such as `AGENTS.md`, `CLAUDE.md`, `.github/copilot-instructions.md`, or path-specific instruction files become valuable. They act as repository-level onboarding materials. It is useful to think of `AGENTS.md` as a kind of README for agents: if a new human contributor would need to know it on day one, the agent probably needs it too.

This does not mean a repository instruction file should become a second-rate architectural tour written for its own sake. If the agent can discover a fact quickly by listing directories, reading the README, or inspecting the code, repeating it in a monolithic `AGENTS.md` often adds noise rather than clarity. The highest-value lines tend to be the non-discoverable ones: which package manager to use, which tests give false positives, which directory is deceptively named, or which legacy module must not be touched.

A practical filter helps here: if the agent can discover a fact cheaply by listing the repository or opening a nearby document, it probably does not deserve a precious line in your always-on instructions. Longer files are not automatically better files. Auto-generated instruction documents often disappoint for exactly this reason — they restate obvious facts while omitting the local landmines. What earns a line is the non-obvious detail that would otherwise be rediscovered expensively or unreliably.

The key design question is not which filename is metaphysically superior. It is whether the content is specific enough to be operational. Good project context contains concrete instructions, examples, and boundaries. Weak project context contains aspirations.

A useful practical test is this: if removing a line from your project instructions would force the agent to rediscover a fact expensively or unreliably, it probably belongs in the file. If the fact is obvious from a quick directory listing or a nearby README, repeating it may only add noise. Good project context is less like a tourist guide and more like a set of local hazards, shortcuts, and conventions.

### Layer 3: External References

No repository contains all the knowledge needed to work effectively. Most projects depend on frameworks, libraries, APIs, and services that live elsewhere. That means a good context stack must also account for third-party documentation.

There are three broad ways to handle this.

### Bring Key References In-Repos

If a dependency is central, stable, and used constantly, it can make sense to vendor a small amount of relevant documentation into the repository. This is especially useful when you need deterministic access, long-lived examples, or a stable explanation of house patterns built on top of an external library.

### Link To Curated External Sources

Sometimes the best move is not to copy anything, but to point clearly to the right sources. This is where curated lists, project notes, or `llms.txt` files are helpful. The `llms.txt` convention exists precisely because generic websites are often optimised for human browsing rather than inference-time retrieval. A well-maintained `llms.txt` file gives an agent a shorter path to the relevant material.

### Retrieve Context At Runtime

For changing or dynamic information, static copies are often the wrong tool. Runtime retrieval through search, tools, or MCP resources is more appropriate. This allows the agent to fetch the current documentation, current schema, or current system state rather than rely on a stale local snapshot.

The right choice depends on volatility, importance, and frequency of use. Stable and foundational material can live close to the code. Fast-changing or operational information should usually be retrieved when needed.

A useful anti-pattern to avoid is dumping huge slabs of third-party documentation into always-on instructions just because it feels thorough. In practice, that usually makes the context noisier without making the behaviour sharper. Curated pointers, stable local summaries, and runtime retrieval of the relevant section are usually more effective than a fifty-page raw dump that no one will keep current.

### Layer 4: Living Documentation

The fourth layer is the one teams most often neglect. They keep instructions about style, but fail to maintain the artefacts that explain what the project is currently trying to do.

Living documentation includes:

- plans and execution notes;
- product requirements and specifications;
- architectural decision records;
- operational runbooks;
- migration notes;
- data definitions;
- review checklists; and
- current priorities.

This layer matters because long-running or multi-session agentic work cannot rely on chat history alone. Context windows are finite. Sessions end. Summaries are lossy. Durable progress has to live in files and version control, not only in the conversation.

A useful rule is this: if the next engineer would need it, the next agent session will need it too. Plans, progress notes, feature lists, and current decisions are not optional polish. They are continuity mechanisms.

This layer is also where you can deliberately accumulate learning. If the agent discovers a surprising constraint, a fragile command, or an undocumented dependency, that knowledge should usually be appended to a durable project artefact rather than left to evaporate in chat history. Living documentation is not only something the agent reads. It is something the workflow can continuously improve.

Suppose a team is midway through a billing migration. The most valuable context may not be the static architecture diagram, but the current `plan.md`, the cut-over checklist, the note explaining why one endpoint is temporarily duplicated, and the exact test commands used to verify progress. That is living documentation: the artefacts that tell the next session what is true right now.

### What Goes Where

One reason living documentation decays is that teams treat every useful note as though it belonged in one giant file. It usually works better to separate a few distinct artefacts:

- **`plan.md`** — the current objective, intended sequence of work, and the main checkpoints.
- **`decisions.md`** or ADRs — durable choices and the trade-offs behind them.
- **`progress.md`** — what has been completed, what is in flight, and what remains blocked.
- **`learnings.md`** — awkward local truths, fragile commands, integration quirks, and other discoveries worth preserving.

The exact filenames matter less than the separation of purpose. The agent should not have to infer whether a file is a stable decision record, a live execution note, or a graveyard of abandoned ideas.

## Four Ways Context Gets Packaged

The layers above describe *what* context exists. We also need a practical model of *how* that context reaches the agent. In this course, four packaging mechanisms matter most.

### Rules Files

Rules files are the simplest and often the highest-leverage mechanism. They are usually Markdown files loaded automatically or semi-automatically by the tool. Their strength is clarity: what you write is what the model sees.

They work best for:

- always-on project or user instructions;
- coding conventions;
- build and validation commands;
- review expectations;
- safety and workflow constraints.

Their main weakness is that everything tends to load every time. That means they should be tight, explicit, and pruned regularly.

### Agent Skills

Skills package reusable expertise into portable units. Instead of loading all possible instructions up front, a skill can be activated when relevant, often using a progressive-disclosure model: metadata first, deeper instructions later, and scripts or reference material only when needed.

This makes skills particularly useful for procedural knowledge that is not needed on every task — for example, working with a particular document type, running a specific workflow, or enforcing a specialised review pattern.

### MCP Servers

MCP is not just “more context”. It provides a structured way to expose tools, resources, and prompts to an agent at runtime. That distinction matters.

- **Tools** let the model take actions.
- **Resources** provide application-driven data or documents.
- **Prompts** offer reusable, user-invoked templates.

In other words, MCP is partly about context, but just as importantly about connectivity and operation. It is how an agent stops being limited to static text and starts interacting with external systems in a governed way.

A browser-automation server is a useful illustration. A tool might click through the application. A resource might expose the latest DOM snapshot or test report. A prompt might scaffold a structured accessibility review. That is why MCP changes the operating model rather than merely padding the context window: it gives the agent governed ways to inspect and act.

### In-Repo Documentation

Specifications, ADRs, plans, READMEs, and workflow notes remain indispensable because they are version-controlled, local to the project, and reviewable alongside code. They may be less glamorous than a shiny new integration, but they are often the cleanest source of truth.

## Choosing The Right Packaging Mechanism

The four mechanisms are complementary rather than competitive. A rough rule of thumb helps:

- **Use rules files** when the guidance should apply nearly every time: package managers, testing habits, review expectations, and recurring guardrails.
- **Use Skills** when the knowledge is specialised, procedural, and useful across more than one project, but not worth loading on every task.
- **Use MCP** when the agent needs runtime access to tools, systems, or current data rather than more prose.
- **Use in-repo documentation** when the knowledge is part of the project’s durable memory and should be version-controlled beside the work.

In practice, strong setups use all four. The question is not which mechanism “wins”. It is which mechanism gives the agent the lightest, clearest route to the behaviour you actually want.

## Writing Effective Rules

The quality of a context stack depends heavily on the quality of the instructions inside it. Useful rules have a few recurring properties.

### They Are Specific

A rule such as “write clean code” sounds sensible but is operationally useless. A better rule names what “clean” means in this project: small functions, descriptive names, no nested ternaries, tests for public behaviour, or whatever else actually matters.

### They Include Positive And Negative Patterns

It is often helpful to show both what to do and what not to do. Positive examples narrow the target. Negative examples identify local traps. Together they reduce ambiguity far more effectively than abstract ideals.

### They Separate Defaults From Exceptions

A strong rule set does not pretend every situation is identical. It states the default and clarifies when an exception applies. This makes the guidance more believable and easier to follow.

### They Use Real Project Language

Rules should refer to real paths, real commands, real checklists, and real files. The more a rule feels like generic internet advice, the less likely it is to shape behaviour in a useful way.

### They Need Repeated Validation

Rules are part of the engineering surface, which means they need testing rather than reverence. Ask the agent the same question more than once. Run the same scenario several times. If behaviour is inconsistent, revise the wording, move the important constraint earlier, or shorten the file until the signal becomes clearer. A single successful run is encouraging. It is not proof.

## Sourcing Context: Generic, Curated, Personalised

A practical way to build a stack is to think in three sourcing tiers.

- **Generic context** — readily available material such as official docs, published `llms.txt` files, or community skills.
- **Curated context** — the subset you select because it is actually relevant to this project.
- **Personalised context** — instructions or skills you author specifically for your own work or team.

Most teams should use all three. Generic context is fast to acquire. Curated context improves signal quality. Personalised context gives you the highest degree of alignment. The mistake is to stop at the first tier and assume the rest will sort itself out.

### Compressed Navigation Beats Raw Dumps

At larger scale, teams often do better with compressed navigation aids than with enormous raw dumps. A concise module map, a `llms.txt` index, a generated list of services and entry points, or a short architectural summary gives the agent a route through the codebase without forcing it to ingest the entire repository at once. The goal is not to make the model memorise the whole system. It is to make the important parts easier to find.

A Code Map is a particularly useful example of this pattern: a terse summary of module responsibilities, public entry points, and function or class signatures that gives the agent a bird’s-eye view before it drills into implementation detail. Good context often works by improving navigation, not by maximizing bulk.

This is also where context engineering becomes editorial work. You are deciding which abstractions help the agent navigate reality, and which details belong behind a later lookup. Good context often looks less like maximal inclusion and more like well-designed indirection.

At larger scale, this usually means preferring abstraction over completeness. A concise module index, `llms.txt` summary, or generated code map is often more useful than dumping raw implementation details into context. The goal is to help the agent navigate the system, not to make it memorise the whole thing.

Once the stack spans several repositories or internal systems, another concern appears: permissioned context. The question is no longer only “what would help the agent?” but also “what should this agent actually be allowed to read?” At that point, context design and access control start to become the same conversation. A useful stack does not merely expose more information. It exposes the right information to the right workflow.

At team and enterprise scale, that usually means favouring generated navigation aids over giant raw dumps: module maps, service indexes, curated `llms.txt` files, and concise architectural summaries that can be regenerated as the codebase changes. It also means treating context as reviewed infrastructure. If a generated map is stale, or a repository instruction file quietly contradicts reality, the stack has become a source of drift rather than a source of leverage.

## A Worked Portable Stack

Imagine you are setting up two related repositories in the same organisation: a Next.js web app and a Python API. The point of the stack is not that both repositories contain identical context. It is that the context is layered consistently.

- **Global rules** — always use `uv` for Python work and the team’s preferred JavaScript package manager for web work; run tests after edits; avoid destructive commands without approval; keep changes on reviewable branches.
- **Project context** — the web repo explains where UI state lives, which directories are stable extension points, and which commands build, lint, and test the app. The API repo explains service boundaries, migration rules, and the expected way to run targeted backend tests.
- **External references** — the stack points to the current Next.js docs, the Python framework docs, and any third-party API references the product depends on, ideally through curated `llms.txt` indexes or reliable runtime retrieval.
- **Living documentation** — current feature specs, `plan.md`, ADRs, and migration notes record what the team is actually trying to change this week.

Now imagine asking an agent to add billing-export support that touches both repositories. Global rules supply your default engineering posture. Project context supplies the local commands and boundaries. External references supply framework truth. Living documentation supplies the current intent. That is what makes the stack portable: not one giant note, but a repeatable way of assembling the right operating picture.

## Maintaining The Stack Over Time

The portable stack only stays useful if it is maintained as deliberately as the code it supports. Context decays quietly. A package manager changes. A directory is renamed. A favourite command starts producing false positives. A once-helpful example becomes actively misleading after a framework upgrade. Stale context is not neutral. It nudges the agent toward outdated behaviour with impressive confidence.

That is why context maintenance needs a rhythm. For personal projects, a light monthly pass is often enough. For team repositories, it is usually worth reviewing the stack whenever architecture changes materially or at a regular quarterly cadence. The review does not need theatre. It needs discipline.

Useful maintenance questions include:

- **What still changes behaviour?** — prune lines that the agent can now discover cheaply or that no longer affect outcomes.
- **What has gone stale?** — refresh commands, links, examples, and references that no longer match the current project.
- **What should be regenerated?** — rebuild code maps, indexes, or summaries that are meant to be derived rather than hand-maintained.
- **Where has learning accumulated?** — promote recurring discoveries from chat, PR comments, or issue threads into durable files where they can help the next session.

This is one reason compressed navigation aids are so valuable at scale. A short module map, curated `llms.txt` index, or generated service summary is often easier to keep current than a heroic instruction file that tries to explain the whole system forever.

## Validating The Stack

A context stack is not finished because the files exist. It is finished when you have evidence that it changes behaviour in the way you intended.

There are two sensible ways to validate it.

### Smoke Tests

Ask the agent questions it could only answer if it had loaded the correct context. Request a build command. Ask where progress notes should live. Ask which package manager to use. If it cannot answer these cleanly, the stack is weaker than you think.

Then repeat the exercise. Models are non-deterministic. If the same question produces one correct answer and two vague ones, the stack is not yet dependable enough to trust. Repeated validation tells you much more than a single clean pass.

Useful smoke tests are often embarrassingly concrete. Ask the agent which targeted test command to run for a backend change. Ask which directory contains durable plans rather than ephemeral notes. Ask which files should not be touched during a migration. If the answers are vague, contradictory, or suspiciously generic, the stack has not actually loaded the right operating picture.

A simple validation loop is often enough to reveal whether the stack is doing useful work:

1. Ask the agent which package manager or build command it should use.
2. Ask where durable progress notes or plans should live.
3. Ask for the narrowest relevant test command for a typical change.
4. Repeat the same questions in a fresh session or after a restart.

If the answers wobble, the stack is not yet dependable enough to trust. Revise the instructions, shorten what is noisy, and test again.

### When Validation Fails

The failure patterns themselves are often diagnostic. If the agent keeps naming the wrong package manager or test command, the relevant rule may be too deeply buried or too weakly phrased. If the answers are generic rather than local, the stack probably lacks enough project-specific context. If behaviour changes wildly between sessions, the instructions may be ambiguous, bloated, or split across too many competing sources.

These signals are useful precisely because they tell you what to change next. Strengthen the highest-value instruction. Move the critical boundary earlier in the file. Remove lines that add bulk without changing behaviour. If the stack only works after a long conversational warm-up, more of that state should probably live in durable files instead.

### Scripted Checks

For larger projects, it is often worth automating validation. That might mean running a task and checking whether the agent used the instructed commands, followed the correct file locations, or respected local patterns. At that point, context becomes part of the engineering surface, not just a courtesy note.

It is also worth testing the instructions themselves as if they were any other piece of infrastructure. Ask the agent to explain how it understands the rules. Run the same scenario more than once. If behaviour is inconsistent, revise the wording, move important constraints higher, or shorten the file until the signal becomes clearer. Context files that are never validated tend to decay into folklore.

Teams that lean on context heavily often go one step further and interrogate the stack after changes. They run the same scenario twice, compare behaviour before and after a rules edit, and prune instructions that are redundant or routinely ignored. In practice, context files need the same maintenance loop as code: add, test, observe, shorten, repeat.

This is a good habit to cultivate early. Context should be treated like code: versioned, reviewed, and periodically tested.

## Closing Thought

The portable context stack is a way of turning vague “AI setup” work into a disciplined engineering activity. Instead of thinking of context as whatever happens to be lying around at the time, you treat it as a layered system: some rules global, some local, some external, some living with the work itself.

That shift matters because dependable delegation does not come from model capability alone. It comes from model capability operating inside a well-designed environment. Once you start thinking in stacks rather than scattered notes, your tooling becomes easier to reuse, your agents become easier to trust, and your projects become easier to hand over — to humans and machines alike.

---

## Deep Dives

### Core Concepts
- [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) — A strong theoretical and practical framing of context as the real control surface.
- [AGENTS.md](https://agents.md/) — The open convention for repository-level instructions for agents.
- [Custom instructions in Visual Studio Code](https://code.visualstudio.com/docs/copilot/customization/custom-instructions) — Useful for understanding always-on and file-based instruction layers.

### Skills, MCP, & Packaging
- [Equipping agents for the real world with agent skills](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills) — Why progressive disclosure and reusable expertise matter.
- [Agent Skills Specification](https://agentskills.io/) — The core standard for portable skills.
- [Model Context Protocol introduction](https://modelcontextprotocol.io/introduction) — The clearest high-level introduction to MCP as a runtime interface for tools and resources.
- [MCP architecture](https://modelcontextprotocol.io/docs/learn/architecture) — Helpful once you want the host, client, and server model made explicit.

### External Documentation
- [llms.txt](https://llmstxt.org/) — The standard for AI-oriented documentation indexes.
- [directory.llmstxt.cloud](https://directory.llmstxt.cloud/) — A directory for discovering published `llms.txt` files.
- [Guide to writing `AGENTS.md` files](https://agentsmd.net/) — Good practical advice on making repository instructions genuinely operational.

### Course-Site References
- [Your AI Is Only as Good as Your Context](https://elite-ai-assisted-coding.dev/p/your-ai-is-only-as-good-as-your-context) — A concise practical restatement of the lesson’s thesis.
- [Managing Exploding Enterprise Context](https://elite-ai-assisted-coding.dev/p/managing-exploding-enterprise-context) — Helpful once the problem stops being one repository and starts becoming many.
- [Context from Internal Git Repos](https://elite-ai-assisted-coding.dev/p/context-from-internal-git-repos) — Useful if your context stack has to cross repository boundaries.
- [Skillz: Anthropic-style Skills for Any MCP Client](https://elite-ai-assisted-coding.dev/p/skillz) — Useful if you want to connect skills and MCP in practice.
- [Building and Deploying a Remote MCP Server in Minutes with FastMCP Cloud](https://elite-ai-assisted-coding.dev/p/building-and-deploying-a-remote-mcp) — A practical example of how runtime connectivity changes what an agent can do.

# Lesson 3 — Agent Skills & Reusable Expertise

*Rules tell an agent how to behave in a given environment. Skills go a step further: they package expertise so that it can be discovered, activated when relevant, and shared across tools or teams. This lesson looks at Skills as a practical unit of reusable intelligence — not magic, but structured onboarding for recurring work. By the end, you should understand when a rule is enough, when a Skill is better, and how to design one that actually activates when needed.*

## Why Skills Matter

As soon as you start using AI tools seriously, you notice a pattern: some instructions are global defaults, some are project-specific, and some are specialised workflows that only matter occasionally but matter a great deal when they do.

That third category is where Skills become useful. A Skill packages procedural knowledge, examples, references, and sometimes scripts into a reusable unit that an agent can call upon when the task warrants it. Instead of restating the same instructions every time you need to process a PDF, review an accessibility issue, draft a PR description, or follow a specialised deployment flow, you can encode that expertise once and reuse it.

The value here is not just convenience.

- **Consistency** — the same specialised workflow can be applied repeatedly.
- **Portability** — expertise can move across repositories, tools, or teammates.
- **Efficiency** — detailed instructions do not need to sit in the active context for every task.

In other words, Skills help separate everyday context from specialised context. That keeps the default environment lighter while still making rich expertise available when it is relevant.

## The Open Standard

One reason Skills matter now rather than merely in theory is that they are increasingly becoming a cross-tool standard rather than a proprietary oddity. The `agentskills.io` specification describes a common structure for packaging Skills so they can be authored once and used across multiple agentic environments.

That portability is important. Teams do not all use the same stack. One person may prefer a CLI agent, another an IDE-first workflow, another a hosted pull-request-based agent. If reusable expertise only works inside one product, the maintenance burden rises quickly. A shared standard lowers that burden and makes it more plausible that Skills become part of normal engineering practice rather than a niche trick.

In practice, that means the same packaged workflow can often travel across hosted agents, editor-native environments, CLI runtimes, and community clients that implement the standard. The precise UX varies, but the economic point is the same: write the expertise once, then reuse it wherever the team actually works.

That portability matters most when a workflow is valuable enough to outgrow one tool, but not large enough to justify a full application. In that middle ground, a Skill can act like a small portable product: a packet of prompts, instructions, examples, and optional scripts that travels between environments with much less operational baggage than a separate web app or service.

The open-standard model also nudges people toward clearer packaging. A Skill should declare what it is for, what it contains, and when it should be used. That makes Skills legible to tools, but also to humans reviewing them.

## Progressive Disclosure

A key design idea behind Skills is **progressive disclosure**. Not every instruction needs to be loaded at all times.

This matters because context is finite and expensive. If you dump every specialised workflow into always-on instructions, you pollute the active context with material that is irrelevant to most tasks. The model must then waste attention deciding what to ignore.

Skills solve this by separating layers of detail:

- **Lightweight metadata** identifies what the Skill is for.
- **Core instructions** load when the Skill is judged relevant.
- **Scripts, references, or assets** can be pulled in only when actually needed.

That makes a Skill feel less like a giant rules file and more like a just-in-time packet of expertise. The active context stays cleaner, but the agent still has access to substantial guidance once the task crosses the right threshold.

This is one of the biggest practical advantages of Skills over stuffing everything into a single instructions document. They let you keep specialised knowledge deep without making the default experience noisy.

### Activation Is Usually Model Reasoning

In most environments, Skill activation is not a rigid routing table. The model is shown the available Skill descriptions and must decide, from the language of the task, whether one of them fits. That means the description is not decorative metadata. It is the discovery surface.

This is why good activation language matters so much. If the description sounds like a real task a user might request, activation is more likely to be sensible. If it sounds like abstract branding, the Skill may never fire at the right time — or worse, trigger on the wrong work.

It is worth testing that discovery surface deliberately. Ask the agent which Skills appear relevant to a few realistic tasks. If your Skill never appears, appears for the wrong work, or requires you to paraphrase the task unnaturally, the description needs sharpening before the deeper instructions matter.

## Anatomy Of A Skill

Although implementations vary, the common shape is straightforward: a Skill is a folder centred on a `SKILL.md` file, usually with structured metadata and Markdown instructions, plus optional supporting material.

Typical components include:

- **Metadata** — often expressed as YAML frontmatter carrying the name, description, activation clues, allowed tools, and any other discovery hints the host expects.
- **Instructions** — the workflow, standards, and guidance the agent should follow, usually kept concise enough that activation remains cheap. In practice, many teams find it wise to keep core instructions well under a few hundred lines rather than turn `SKILL.md` into a novella.
- **References** — linked or bundled documents that provide deeper context.
- **Scripts or tools** — optional executable helpers where supported. For Python helpers in particular, `uv` plus inline dependency metadata is a pragmatic way to keep those scripts portable across machines and CI environments.
- **Assets** — templates, examples, or other files useful to the workflow.

The most important piece is almost never the script. It is the description. If the description is vague, activation will be poor. If the description is sharp, the tool has a better chance of recognising when the Skill fits the task.

### Key Metadata In `SKILL.md`

In practice, a few metadata fields do most of the work:

- **`name`** — the stable identifier of the Skill.
- **`description`** — the discovery surface that tells the model when this Skill should activate.
- **`allowed-tools`** — where supported, the tools or command surfaces this Skill may use.
- **optional model or mode fields** — useful when a Skill genuinely needs a stronger model, a constrained execution mode, or a more explicit manual invocation path.

The exact schema varies by host, but the pattern is stable: keep the metadata legible, keep the description concrete, and scope the power of the Skill deliberately rather than implicitly.

A concrete example helps. A frontend-design skill may contain little more than strong metadata, a few pages of design guidance, and links to examples. No heavy runtime is required. The prompt expansion itself is what changes the result.

In practice, many teams keep these folders in repository-local locations such as `.agents/skills/` or similar conventions. That has a practical advantage: the expertise stays version-controlled, close to the code, and easier for both humans and tools to discover.

A useful way to think about a Skill is as a form of compressed onboarding. It should give the agent enough structure that the agent knows what kind of work this is, how to approach it, and what standards to apply.

### What Belongs In `SKILL.md`, `scripts/`, & `references/`

One simple way to keep a Skill lean is to separate judgement from mechanics.

- **`SKILL.md`** should hold the discovery surface and the core workflow: what this Skill is for, when it applies, and how the agent should think about the task.
- **`scripts/`** should hold deterministic, repeated mechanics: commands you want run the same way every time, especially when the model would otherwise have to reconstruct them from prose.
- **`references/`** should hold bulky checklists, examples, or background documents that are useful on demand but too expensive to keep in the main instructions.

That split keeps activation cheap. The model sees enough to decide the Skill is relevant, then loads the deeper material only if the task justifies it.

## When To Use A Skill Instead Of A Rule

Rules and Skills are complementary, not interchangeable.

### Use Rules For Always-On Defaults

If something should apply nearly all the time, it belongs in your general instructions or project rules. Examples include:

- the package manager to use;
- how to run tests;
- source-control expectations;
- local coding conventions;
- required review habits.

These are defaults. They shape ordinary behaviour.

### Use Skills For Specialised, Occasional, Or Portable Work

A Skill is the better fit when the knowledge is:

- too specialised to justify always-on loading;
- reused across projects or teams;
- procedural rather than merely advisory;
- best supported by extra references or scripts.

For example, “always run `uv` for Python work” is a rule. “When working with spreadsheets, extract structure carefully, preserve formulas, and use these validation steps” is a Skill. “Do not bypass tests” is a rule. “Perform a structured security review of a pull request using this checklist and these tools” is a Skill.

The decision is usually about scope and frequency. Defaults live in rules. Specialised playbooks live in Skills.

A simple test helps. If omitting the instruction would make ordinary work worse across most sessions, it probably belongs in rules. If the instruction matters a great deal only for a recognisable class of tasks, it probably wants to be a Skill.

There is also a middle ground worth naming plainly: if the workflow is purely project-local and mostly execution-heavy, a small script or command may be better than a full Skill. Skills earn their keep when portability, discoverability, or team reuse matters. A local helper script can be the simpler answer when those things do not.

## Writing A Skill That Actually Activates

A Skill that never activates is not a reusable capability. It is a decorative folder. The activation description therefore deserves real care.

A good Skill description usually does three things.

### It Names The Triggering Situations Clearly

Do not describe the Skill in abstract branding language. Describe the actual tasks that should trigger it. If the Skill is for creating flashcards, say so. If it is for handling a PDF extraction workflow, say so. If it is for reviewing security-sensitive code paths, say that plainly.

### It Uses The Language A User Would Actually Use

Activation works better when the description overlaps with the natural phrasing of the task. Think in terms of the words likely to appear in prompts or issue descriptions. If a user will say “review this PR for security issues”, the Skill description should not say only “applies defensive assurance heuristics to software artefacts”. One of these is human language. The other is grant application language.

### It States Boundaries

A strong Skill description also clarifies what it is *not* for. This reduces accidental activation and helps preserve trust in the mechanism. A skill for static-site deployment should not trigger on general DevOps questions. A Skill for code review should not quietly behave like a full implementation workflow.

The deeper instructions matter, of course, but clear activation is what makes the deeper instructions reachable.

### A Simple Activation Test

Before you trust a Skill, test whether its description actually surfaces at the right moments.

1. Write three or four realistic prompts a user might actually type.
2. Check whether the agent chooses the Skill without needing you to paraphrase the task unnaturally.
3. Try one near miss and one obvious non-match to see whether the Skill stays out of the way when it should.
4. If activation is inconsistent, sharpen the description before you touch the deeper instructions.

Descriptions are routing surfaces, not decorative summaries. If the description is vague, the best instructions in the world may never even load.

### A Concrete Activation Example

Imagine a Skill called `security-review`. A sensible activation test might use prompts such as “review this PR for security issues” or “this change touches auth and tokens — what should I worry about?” Those should surface the Skill naturally. A near miss such as “help me design a secure session strategy” may or may not be appropriate depending on the Skill’s scope. An obvious non-match such as “rename this component and fix the spacing” should definitely not activate it.

That small exercise usually reveals whether the description is doing real routing work or merely sounding respectable. If the Skill still activates inconsistently after a few realistic passes, fix the description before expanding the body. The discovery surface is usually the leverage point.

## Sourcing Skills: Build, Adapt, Share

You do not need to author every Skill from scratch.

In practice, good starting points include official repositories, vendor examples, and community collections on GitHub. The useful question is not whether a source is fashionable. It is whether the Skill is maintained, explicit about when it should trigger, and light enough to adapt to your environment without surgery.

A sensible progression is:

- **Start with pre-built Skills** where good ones already exist.
- **Customise community Skills** so they match your conventions and tooling.
- **Write your own Skills** once you identify repeated, high-value workflows.

Concrete starting points help here. Official vendor repositories, community registries such as `skills.sh`, framework-specific collections, and internal team repositories are all sensible places to begin. The practical sequence is usually the same: search for a close fit, adapt it to your environment, test activation against realistic prompts, and only then decide whether a brand-new Skill is warranted.

This mirrors good engineering practice generally. Reuse where appropriate, adapt where necessary, and build only when the gap is real.

Community and vendor-provided Skills are especially useful for common file types, standard workflows, or mature problem domains. But even good published Skills often need local adjustment. What matters is not whether the original source was official. It is whether the resulting Skill genuinely fits your environment.

Once you have working Skills, sharing them across a team becomes valuable. That turns individual cleverness into institutional capability. A good Skill is really a documented, reusable piece of team process.

Once a Skill proves itself locally, publishing it is mostly an exercise in clarity. Tighten the description, remove project-private assumptions, keep the support files lean, and document which tools or environments it expects. That is what turns a clever internal workflow into a portable capability other people can actually adopt.

## Skills, MCP, & The Rest Of The Stack

Skills sit within the broader context stack rather than above it.

- **Rules** establish baseline behaviour.
- **Skills** package specialised expertise and workflow judgement.
- **MCP** provides runtime tools, resources, and prompts.
- **Living documentation** provides project-specific truth that must evolve with the work.

Confusion arises when people expect one layer to replace the others. Skills do not remove the need for project rules. MCP does not remove the need for durable written guidance. Rules do not remove the need for on-demand specialised procedures.

A short rule of thumb is useful here: if the agent mainly needs better instructions, richer examples, or a repeatable procedure, reach for a Skill. If it needs to query a live system, fetch current data, or act on an external service, reach for MCP. They often work best together: the Skill shapes the workflow, and MCP supplies the runtime reach.

A good engineering setup uses each mechanism for the work it suits best. Skills are powerful precisely because they occupy a middle ground: more structured and reusable than ad hoc prompting, but more targeted and selective than monolithic always-on instructions.

## What Makes A Skill Worth Keeping

Not every workflow deserves to become a Skill. A useful filter is to ask whether the workflow is:

- repeated often enough to justify packaging;
- specialised enough to benefit from extra guidance;
- stable enough that maintenance will not become miserable;
- important enough that consistency matters.

If the answer to most of those questions is no, a normal prompt or a short rule is probably enough. Skills are not trophies. They are infrastructure. Like any infrastructure, they should exist because they make future work easier, safer, or more consistent.

A more operational filter is often useful:

- **Frequency** — does this workflow show up often enough to justify packaging, perhaps several times a month?
- **Consequence** — does inconsistent execution create real cost, risk, or review pain?
- **Reuse** — is the knowledge portable across repositories, teammates, or tools?
- **Ownership** — is someone actually willing to keep it current once it exists?

If the answer to frequency is no, the workflow may be too niche. If the answer to ownership is no, the Skill is likely to rot. Both are good reasons not to package it yet.

There is a maintenance corollary here. A stale Skill is worse than no Skill at all, because it activates confidently with outdated guidance. The best Skills are attached to workflows stable enough to justify upkeep and important enough that someone will actually keep them current.

This is also how teams avoid the quiet creation of a skill graveyard: dozens of half-overlapping folders, each solving yesterday’s version of the problem. A short quarterly audit is often enough. Remove unused Skills, consolidate overlapping ones, and tighten the descriptions of the survivors so the discovery surface remains clean.

When a Skill changes in a breaking way, version or deprecate it clearly rather than letting silent drift surprise everyone who depends on it. Skills are infrastructure, and infrastructure benefits from legible change management.

## Closing Thought

Agent Skills are one of the clearest examples of a broader shift in AI-assisted development: expertise is increasingly becoming something we can package, version, share, and invoke on demand.

That does not make expertise cheap. Someone still has to design the workflow well. Someone still has to test whether the instructions are sound, whether the activation is sensible, and whether the outputs improve in practice. But once that work is done, the payoff is substantial. What used to live in a senior engineer’s memory, or in a pile of repeated prompts, can become a durable capability available across tools and across time.

That is the real promise of Skills. They do not make judgement unnecessary. They make good judgement easier to reuse.

---

## Deep Dives

### Core References
- [Agent Skills Specification](https://agentskills.io/) — The open standard itself.
- [Equipping agents for the real world with agent skills](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills) — A strong explanation of why Skills matter in practice.
- [About agent skills in VS Code / GitHub Copilot](https://code.visualstudio.com/docs/copilot/customization/agent-skills) — Useful for understanding how Skills show up in one mainstream environment.

### Practical Reuse
- [Anthropic Skills repository](https://github.com/anthropics/skills) — A good source of real examples.
- [Skillz: Anthropic-style Skills for Any MCP Client](https://elite-ai-assisted-coding.dev/p/skillz) — A practical bridge between Skills and broader tool ecosystems.
- [UV for Portable Python in Agent Skills](https://elite-ai-assisted-coding.dev/p/uv-for-portable-python-in-agent-skills) — A useful example of making a Skill more portable and robust.

### Commentary & Design Thinking
- [Claude Skills are awesome, maybe a bigger deal than MCP](https://simonwillison.net/2025/Oct/16/claude-skills/) — A thoughtful external perspective on why Skills may matter more than they first appear.
- [Guide to writing `AGENTS.md` files](https://agentsmd.net/) — Helpful alongside Skills because it clarifies what belongs in rules versus richer packaging.
- [Custom Tools for AI Agents: Beyond MCP](https://elite-ai-assisted-coding.dev/p/custom-tools-for-ai-agents-talk) — Useful once you start thinking about the boundary between packaged instructions and executable capability.

# Lesson 4 — The Spectrum of AI Coding Modalities

*AI-assisted development is not one workflow but a spectrum of interaction modes, each with its own strengths, costs, and control surface. This lesson maps that spectrum so you can choose the right modality for the job rather than reaching automatically for whichever button happens to be nearest. By the end, you should be able to move deliberately between completion, editing, chat, and agentic workflows as a task evolves.*

## Why Modalities Matter

A common early mistake is to treat AI coding as a single capability. People ask which tool is “best” or whether they should use chat, an IDE assistant, or a coding agent, as though these were mutually exclusive identities rather than complementary modes of work.

In reality, the important question is not “which tool?” but “which modality fits this task right now?” Different modes impose different trade-offs around latency, context, autonomy, reversibility, and review effort. Choosing well is one of the highest-leverage habits you can develop, because many AI frustrations come from using the wrong mode rather than from any intrinsic failure of the model.

A useful principle is to treat modalities as a toolkit rather than a ladder. The most autonomous option is not always the most effective. Often the best workflow begins with a question in chat, moves into a constrained edit, and only later expands into a broader agentic task.

Tool choice enters here mostly as workflow surface, not as a metaphysical divide in capability. IDE-centred tools know about your cursor, your open files, and the local editing state. CLI agents know about shells, repository state, environment variables, and automation environments. The overlap is substantial. In practice, you are often choosing a preferred control surface as much as a model or feature set.

That is also why the landscape keeps broadening. The same five modalities now show up across IDE extensions, CLI agents, browser-based products, and increasingly capable open-source tools. The question is rarely whether a product is “the chat one” or “the agent one”. It is which interaction surface fits the work best.

A quick surface map helps:

- **IDE surfaces** keep code, diffs, and review close together. They are excellent when you want tight steering and low-latency interaction.
- **CLI surfaces** are strongest when shells, scripts, Git, and repeatable local commands are part of the job.
- **Hosted or pull-request-based surfaces** shine when the task is already well specified and the natural output is a reviewable artefact rather than a live edit session.

## The Five Core Modalities

For this course, we will use a practical five-part model.

- **Completion** — near-cursor suggestions while you type.
- **Inline editing** — localised edits against a selected block of code.
- **Chat Q&A** — conversational analysis, explanation, and planning.
- **Chat-driven editing** — broader but still guided changes initiated through chat.
- **Agentic coding** — multi-step task execution with tools, files, and iterative work.

These are not rigid categories enforced by the laws of physics. Products blend them in different ways. But as a decision model, the distinction is extremely useful.

There is also a sixth pattern worth naming early: **background or async execution**. In that case, the agent runs away from your immediate attention and returns later with a branch, patch, or PR. We will treat that in depth in Part 3, but it is helpful to recognise now that the modality spectrum does not stop at live interaction.

### Completion: The Smallest Useful Assist

Completion is the lightest-weight modality. You are already writing code, and the tool proposes what might come next.

This mode excels when:

- you know roughly what you are trying to write;
- the change is local and low-risk;
- syntax, boilerplate, or repetition is the main friction;
- you want to stay in flow without opening a larger interaction loop.

Completion is often underrated because it looks modest. In practice, it can be one of the highest-value modes precisely because it is cheap to accept, reject, or ignore. The review loop is immediate. The context required is minimal. And the cognitive overhead is low.

The weakness of completion is obvious: it is myopic. It cannot easily reason across multiple files or longer chains of intent. Use it when the task is local and you remain fully in the driver’s seat.

### Inline Editing: Constrained Transformation

Inline editing sits one step above completion. Instead of proposing the next token, the tool transforms a selected block according to a clear instruction.

This is useful when you want to say things like:

- simplify this function;
- rewrite this in a clearer style;
- convert this loop into a comprehension;
- add error handling here;
- adjust this snippet to match a particular API.

The main advantage is boundedness. The scope is small enough that review is easy, but large enough to allow meaningful transformation. For that reason, inline editing is often the safest place to experiment with phrasing and style.

Its limitation is that it cannot reliably handle cross-cutting work. Once the edit requires repository-level understanding, dependent changes elsewhere, or interaction with tools, you are usually better served by a broader modality.

### Chat Q&A: Analysis Before Action

Chat Q&A is not primarily an editing mode. It is a thinking mode.

Use it when you need to:

- understand unfamiliar code;
- trace a bug hypothesis;
- compare alternative approaches;
- interpret an error message or stack trace;
- learn a framework concept;
- turn a rough idea into a clearer plan.

This modality is often the best starting point for difficult work because it is cheap and reversible. You can explore without committing the system to action. You can discover what the real task is before you start issuing edit instructions.

That matters more than it sounds. A great deal of wasted effort in AI-assisted development comes from trying to execute before the task has been properly framed. Chat is where you earn clarity.

The trap, of course, is endless conversation. Analysis becomes procrastination if it never collapses into a specification or decision. Chat Q&A is most valuable when it sharpens the next step.

### Chat-Driven Editing: Guided Multi-Step Work

Chat-driven editing occupies the middle ground between local transformation and full agentic delegation. Here, you use conversational instructions to make constrained but wider changes — often across several files, symbols, or related components.

Typical examples include:

- renaming a concept across the codebase;
- updating an API call pattern in several places;
- implementing a small feature with clear boundaries;
- adjusting tests and docs to match a local change.

This modality works well when the task is more than local, but you still want tight conversational steering. It allows the system to do useful work while keeping the human review loop close and active.

In practice, this is where many professional workflows spend a lot of time. It is powerful enough to save real effort, yet controlled enough that the work remains inspectable. If you are unsure whether a task deserves a full agent run, chat-driven editing is often the sensible middle path.

### Agentic Coding: Delegation With Teeth

Agentic coding is the broadest modality in this lesson. Here, you hand the model a goal rather than merely a line or block to transform. The model can then inspect files, use tools, run commands, gather context, make edits, and iterate toward completion.

This mode is appropriate when:

- the task spans multiple files or steps;
- tool use is required;
- there is a clear, reviewable deliverable;
- the task benefits from planning and iteration;
- the specification is strong enough to support broader delegation.

The attraction is obvious: agentic systems can compress a surprising amount of work. They can plan, implement, test, and prepare a result in one flow. The cost is that review becomes more important, not less. Broader delegation widens both the upside and the failure surface.

A useful mental model is that agentic coding is best when you can define the “what” clearly and provide the environment needed for the “how”. When the goal is vague, the context incomplete, or the consequences hard to inspect, autonomy becomes a liability rather than a benefit.

## Choosing The Right Modality

A practical way to choose a modality is to ask four questions.

### Start With Reversibility

Before you ask how broad the task is, ask how easy the result will be to inspect and roll back. If the change is cheap to review, easy to test, and straightforward to undo, a broader mode may be perfectly sensible. If the work is hard to inspect, expensive to reverse, or likely to create hidden downstream effects, narrower modes are usually the wiser starting point.

This is one reason small diffs, feature flags, and explicit rollback paths matter so much. Reversibility gives you room to widen the execution surface without turning every experiment into a white-knuckle event.

### How Broad Is The Scope?

If the task is one line or one function, completion or inline editing is often enough. If it crosses files or requires tools, move upward.

### How Expensive Is A Mistake?

High-risk changes usually warrant tighter control and more explicit review. That does not always mean avoiding agents altogether, but it does mean using them inside clearer boundaries.

### How Much Context Does The Task Need?

Tasks that depend on local architecture, conventions, or system state often benefit from chat or agentic workflows where context can be gathered and inspected more explicitly.

Weak context usually pushes you toward narrower modes. If the repository picture is still hazy, chat or constrained edits are often safer than broad delegation.

### How Reversible Is The Work?

If you can review and roll back quickly, a broader mode may be perfectly reasonable. If the task is hard to inspect or has high operational consequences, narrower steps are safer.

### How Good Is The Current Specification?

This question is easy to miss and expensive to ignore. If you cannot yet state the intent, constraints, and success criteria clearly, that usually pushes you toward narrower modes such as chat or inline work. Stronger specifications buy you safer autonomy. Weaker specifications force you back into constant supervision, regardless of what the product demo promised.

These questions are not mathematical, but they do prevent the most common mismatch: using a broad autonomous mode for a task that was never properly shaped.

### Task Phase Matters Too

Modality choice is also shaped by the phase of the work. Early exploration usually benefits from chat Q&A because the cost of being wrong is still mostly conceptual. Once the shape is clearer, inline editing or chat-driven editing becomes a good way to make bounded progress. Repetitive cleanup, assertions, or obvious local transformations often drop down naturally into completion. Repository-wide execution or multi-step implementation only becomes a good candidate for agentic coding once the specification, context, and proof burden are all legible.

Seen this way, switching modalities is not indecision. It is healthy phase-matching.

A related but separate decision concerns model choice. A lighter or cheaper model may be perfectly suitable once the task is well bounded and the proof burden is clear. Harder exploratory work often benefits from a stronger reasoning model first, followed by a narrower execution surface afterwards. Modality choice and model choice influence each other, but they are not the same decision.

### Scope And Autonomy Are Related, But Not Identical

It helps to separate two variables that are often blurred together: **scope** and **autonomy**. Scope tells you how much of the codebase or workflow the change touches. Autonomy tells you how many local decisions you want the model to make without intervention.

Completion, for example, has tiny scope but relatively high local autonomy: the model decides the next line or token. Chat Q&A can have broad conceptual scope while still keeping autonomy low because you have not asked the model to act. Agentic coding is broad on both axes. This distinction matters because some failures are really scope failures, while others are autonomy failures. Getting clearer about which one you are dealing with makes it easier to choose the right mode.

A cross-codebase rename is a useful example. The scope may be broad because many files are involved, but the autonomy can still stay low if you define the symbol to change, the exclusions to respect, and the exact review surface you want back. Broad work does not automatically require loose delegation.

### Planning Before Execution

Many modern tools now separate planning from execution more explicitly than they once did. That is a healthy development. A read-only planning pass lets you inspect the codebase, sketch the likely approach, and review the proposal before the agent starts making changes.

Used well, this acts like a pressure valve between chat and full autonomy. You can sharpen the specification, confirm the boundaries, and only then widen the execution surface. That is often a better professional habit than jumping straight from a loose prompt into a multi-file edit because the button happens to be there.

## Moving Between Modalities

Good AI-assisted work is rarely locked into one mode from start to finish. The more common pattern is movement.

A typical sequence might look like this:

1. Use **chat Q&A** to clarify the problem and sketch the approach.
2. Switch to **chat-driven editing** for a constrained implementation step.
3. Fall back to **completion** for local cleanup and polish.
4. Escalate to **agentic coding** only once the task, context, and acceptance criteria are clear.

This matters because it suggests a healthier default: start with the lightest mode that can make progress, then widen the delegation surface only when the work justifies it.

That is often faster overall than starting with maximum autonomy. Smaller loops expose misunderstandings earlier. Broader loops are then reserved for the parts of the task where they truly pay for themselves.

### When To Switch Up Or Down

A few signals are especially useful.

- **Move toward higher-autonomy modes** when the task is now well bounded, the relevant context is loaded, and you can describe success clearly.
- **Move toward lower-autonomy modes** when the system starts making structural assumptions you have not endorsed, or when you realise the real problem is still poorly understood.
- **Narrow the mode** when review becomes harder than the work itself.
- **Widen the mode** when the implementation has become repetitive and the proof burden is already clear.

Good switching is less about confidence in the model than about confidence in the current definition of the task.

It also helps to watch for failure signatures. If chat has become circular, drop to an inline or chat-driven edit and force the task into something concrete. If local editing has become repetitive, widen the mode and let the system carry the routine parts. If an agent keeps drifting, the right move is often not “try autonomy harder”, but “step back, rewrite the brief, and switch down a level”.

### One Task, Several Moves

Imagine you need to add CSV export to an admin table. You might begin in **chat Q&A** by asking where export logic should live and which edge cases matter. You could then use **chat-driven editing** to wire the button, service layer, and tests across a few files. Inside one helper, **inline editing** might be the fastest way to simplify a messy transformation. For repetitive assertions or column mappings, **completion** may be enough. Only if the task expands into broader refactoring, documentation updates, and verification across the repository does it become a good candidate for **agentic coding**.

The task has not changed. What changes is the surface area, the certainty, and the cost of getting it wrong.

## The T-Shaped Approach

You do not need equal mastery of every modality. In fact, most people work best with a **T-shaped** approach:

- **Deep competence in one primary mode** — the mode that best fits your daily workflow.
- **Broad working literacy across the others** — enough to recognise when they are the better choice.

For some people, that primary mode will be IDE-centred chat. For others, it will be CLI-based agentic work. For still others, it will be highly efficient use of completions and local edits. The important point is not ideological purity. It is having enough breadth to avoid forcing every task through one habitual interface.

A mature workflow feels less like loyalty to a product and more like fluency in a family of moves.

One practical note: the right modality is constrained not only by the task, but by team readiness. CLI-first agentic work assumes comfort with shells, logs, and Git. IDE-centred workflows assume good local setup discipline. Hosted workflows assume strong review habits because the execution happens further from the developer’s hands. Choose the modality your team can operate reliably today, then broaden the repertoire deliberately.

## Common Failure Modes

Because modality choice matters so much, a few mistakes recur.

- **Using agents for unclear tasks** — the usual signal is expensive wandering: repeated clarification loops, structural guesses you did not endorse, or wide changes against a vague goal. The fix is normally to step down into chat, sharpen the brief, and only then widen the mode again.
- **Using chat when a local edit would do** — the signal is conversational overhead. If you have spent three turns discussing a one-line rename or a tiny guard clause, the workflow is too heavy. Drop to inline editing or completion.
- **Staying in chat too long** — the signal is circular analysis. The same options are being restated, but no executable brief is emerging. Force the task into a bounded edit, a short plan, or a concrete decision.
- **Treating autonomy as progress** — the signal is impressive motion with weak proof: larger diffs, more files touched, and less certainty about whether the right thing happened. Pull the task back toward reviewable increments.
- **Failing to switch modes as the task evolves** — the signal is friction in both directions: a mode that was right for exploration becomes too vague for execution, or a mode that was right for local edits becomes too manual once the work turns repetitive. Change the surface instead of blaming the tool.

These are not moral failings. They are calibration issues. The cure is simply to ask, more often and more explicitly, whether the current mode still fits the current task.

A related mistake is to use loose, outcome-first work in places that require disciplined engineering. Vibe coding can be perfectly reasonable for low-stakes prototypes, throwaway experiments, or cosmetic work where the artefact will not be maintained. It is a poor fit for durable product code, high-risk systems, or shared codebases that other people must understand later.

## Closing Thought

The spectrum of AI coding modalities matters because AI-assisted development is not one thing. It is a collection of interfaces for thinking, editing, exploring, and delegating, each useful under different conditions.

Once you see the landscape clearly, the question “which AI tool should I use?” becomes much less interesting. The better question is: what kind of interaction does this task require right now? Sometimes the answer will be a tiny completion. Sometimes it will be a structured agent run. Often it will be movement between several modes.

That is the real skill this lesson is trying to build. Not devotion to any single modality, but the judgement to choose, combine, and switch between them with intent.

---

## Deep Dives

### Modality & Workflow Foundations
- [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) — Especially useful for the workflow patterns behind higher-autonomy modes.
- [Common workflow patterns for AI agents—and when to use them](https://claude.com/blog/common-workflow-patterns-for-ai-agents-and-when-to-use-them) — A concise decision framework for sequential, parallel, and evaluator-optimizer workflows.
- [About GitHub Copilot coding agent](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-coding-agent) — Good for understanding the background-agent end of the spectrum.

### Practical Course-Site References
- [A Straightforward Answer to “What Tool Should I Use?”](https://elite-ai-assisted-coding.dev/p/a-straightforward-answer-to-what-tool-should-i-use) — A grounded survey of the landscape.
- [What are the key differences between IDE-focused tools and CLI-based agents?](https://elite-ai-assisted-coding.dev/p/ide-vs-cli-agents) — Helpful for understanding where different primary modalities tend to live.
- [How can I use AI without losing my core problem-solving skills?](https://elite-ai-assisted-coding.dev/p/use-ai-without-losing-problem-solving-skills) — A useful corrective to over-delegation.

### Control & Calibration
- [I Argue With My AI Pair Programmer, and It Makes My Code Better](https://elite-ai-assisted-coding.dev/p/i-argue-with-my-ai-pair-programmer) — A healthy model of interactive collaboration rather than passive acceptance.
- [What is “Vibe Coding” and when should I use it?](https://elite-ai-assisted-coding.dev/p/what-is-vibe-coding-when-to-use) — Helpful for understanding when looseness is acceptable and when it is not.
- [Optimize AI Model Usage by Phase](https://elite-ai-assisted-coding.dev/p/optimize-ai-model-usage-by-phase) — A practical way to match task phase and model/tool choice.

# Lesson 5 — Specificity & Specification

*The first four lessons all point toward the same conclusion: better AI-assisted development depends on better task definition. Specificity is the practical skill that turns context, tooling, and modality choice into dependable output, and specification is the durable artefact that carries that specificity into execution. By the end of this lesson, you should be able to turn a vague request into a clear, scoped, reviewable brief that an assistant or agent can actually work from.*

## Why Specificity Has Such High Leverage

If there is one skill that repays practice faster than any other in AI-assisted development, it is specificity.

That is because most model failures do not come from the model lacking raw capability. They come from the model being asked to operate against an under-specified objective. Faced with ambiguity, the model does what language models do: it fills in the gaps with what seems plausible. Sometimes that guess is excellent. Often it is merely adjacent to what you wanted. In both cases, you still pay the review cost.

Specificity reduces that waste. It gives the system a sharper target, a smaller interpretation surface, and a clearer standard against which to judge its own work.

In practice, specificity improves several things at once:

- **First-pass yield** — more of the initial output is usable.
- **Review efficiency** — mismatches are easier to spot because the target is clear.
- **Delegation quality** — the system can make useful local decisions without drifting.
- **Team alignment** — a well-specified task helps humans as much as machines.

This is why specificity matters even if you never use a fully autonomous agent. It is not an “AI trick”. It is a general engineering skill that AI makes impossible to ignore.

## The Problem With Vague Prompts

A vague prompt often feels efficient because it is quick to write. That efficiency is usually illusory.

Consider requests such as:

- “clean this up”;
- “make this better”;
- “add authentication”;
- “refactor this component”;
- “set up a workflow for docs”.

Each of these contains a real intention, but none tells the model enough about the intended result. Better in what sense? Authentication with which assumptions? Refactor toward which architectural goal? Documentation updated from what source of truth?

A human teammate might push back and ask clarifying questions. A model often proceeds. That is the central operational risk of underspecification: the tool rarely refuses the work. It confidently chooses a version of the task on your behalf.

The answer is not to make every request painfully long. It is to make the important dimensions explicit. Good specificity is not verbosity. It is task design.

## From Request To Specification

A useful way to work is to treat the first prompt as raw material rather than the final brief. Your job is to convert the initial request into an executable specification.

Before you become overly technical, start with product thinking. Ask who this change is for, what job it is meant to do, and whether you can explain its value in one or two sentences. If those answers are still fuzzy, the specification is likely to become precise about the wrong thing. AI systems are perfectly capable of implementing the wrong solution very efficiently. Product clarity is how you stop that happening.

That conversion usually involves answering a small number of questions.

### What Is The Actual Goal?

Name the outcome rather than the activity alone. “Refactor this” is an activity. “Extract the API client so request logic is shared and testable” is a goal.

### What Counts As Done?

Describe the success condition in observable terms. If the task completes successfully, what should now be true that was not true before?

### What Must Remain Stable?

Constraints matter because they define the boundaries of acceptable change. Which APIs must not break? Which files should not move? Which behaviours must remain unchanged?

### What Is Not In Scope?

Non-goals are underrated. They keep the system from “helpfully” broadening the task. Many AI-generated tangles begin with the model improving things you never asked it to improve.

These questions are enough to turn a loose request into something an agent can reason over more safely.

You can think of this as ambiguity removal. A useful test is to ask what a competent teammate would still have to guess after reading the brief. Wherever that guesswork feels expensive, the specification needs another pass.

It also helps to do a small amount of product thinking before you become overly technical. What job is this change meant to do for the user or the team? Why is this the right slice of work now? A specification written without that frame may still be precise, but it will often be precise about the wrong thing.

The specification also does not have to be text-only. A screenshot, a rough diagram, a short dictated explanation, or a link to the relevant mock-up can all carry important intent. The goal is not Markdown purity. It is to expose enough of the real requirement that the system does not have to guess.

### Specification And Plan Are Different Artefacts

It is helpful to separate the specification from the plan even when both live in the same Markdown file.

- **The specification** states the intent, success criteria, constraints, and non-goals.
- **The plan** turns that brief into a likely sequence of work, checkpoints, and verification steps.

This distinction matters because the two artefacts change at different rates. The specification should remain fairly stable unless the goal changes. The plan should evolve as the agent or the team learns more about the codebase. When people mix them together too early, they often mistake implementation guesses for requirements.

### From Brainstorm To Spec To Tasks

In practice, good specifications often emerge through a short sequence rather than in one immaculate pass.

1. **Brainstorm** — capture the rough idea, questions, and edge cases without worrying about polish.
2. **Refine into a specification** — turn the raw request into a stable statement of intent, acceptance criteria, constraints, and non-goals.
3. **Break the work into tasks** — create reviewable chunks that can be implemented and verified independently.
4. **Implement against the spec, not against the original chat drift** — let the specification remain the source of truth.
5. **Capture what changed** — if the work reveals a real constraint or new decision, update the spec or plan so the next session does not have to rediscover it.

This is still lightweight. The important shift is simply that the first conversation becomes input material, while the specification becomes the durable brief the work is actually judged against.

### Curation Is Part Of The Work

A draft specification — whether written by you or generated with AI help — is still only a draft. It needs curation. That means tightening vague phrases, removing decorative detail, checking that the acceptance criteria are genuinely observable, and making sure the non-goals really fence the task in.

This is one of the places where human judgement matters most. The model can help you produce a structured brief quickly. You still need to decide whether the brief reflects the actual problem, names the relevant edge cases, and gives the work a sane proof surface. Specification-driven development is not only about generating better artefacts. It is about editing them into something trustworthy.

That curation does not stop once implementation begins. Real work often reveals that a dependency behaves differently than expected, an edge case matters more than the original brief suggested, or a rollout concern should be elevated from a note to a constraint. When that happens, update the specification or the plan deliberately rather than letting the truth live only in chat drift or reviewer memory. A spec that never changes is not automatically disciplined; it may simply be stale.

## The Anatomy Of A Lightweight Specification

A specification need not be a grand, formal document. For much everyday work, a lightweight spec is enough. The important thing is that the key dimensions are present.

A practical minimal specification usually includes:

- **Intent** — why the task exists and what problem it solves.
- **Acceptance criteria** — the conditions that define success.
- **Constraints** — rules, boundaries, or technical limitations.
- **Non-goals** — what should not be changed or attempted.
- **Relevant context** — files, references, commands, or docs that matter.

For larger work, it is also helpful to include:

- **user stories or scenarios**;
- **implementation notes or preferred approach**;
- **verification plan**;
- **open questions** that must be resolved before or during execution.

The point is not bureaucratic perfection. The point is to create a durable artefact that separates the definition of the task from the improvisation of the conversation.

A useful quick-start order for an everyday spec is: **Intent & product framing**, **acceptance criteria**, **constraints**, **non-goals**, **relevant context**, and **verification**. That sequence forces you to say what matters before you disappear into implementation detail.

## Acceptance Criteria Are The Centre Of Gravity

If you only improve one part of your briefs, improve the acceptance criteria.

Acceptance criteria matter because they make “done” testable. They tell both you and the model how to judge success. Without them, review degenerates into vibes and plausibility.

Good acceptance criteria are:

- **observable** — you can tell whether they are met;
- **specific** — they do not rely on fuzzy adjectives alone;
- **scoped** — they concern the task at hand, not everything desirable in the universe;
- **compatible with verification** — they can be checked through tests, inspection, or explicit steps.

For example, “improve the login flow” is vague. Better acceptance criteria might say:

- users can sign in with email and password;
- empty passwords are rejected;
- failed sign-in attempts show the existing error style;
- current session handling remains unchanged;
- unit tests cover the new validation path.

That does not dictate every implementation detail. It tells the system what success must include.

Done well, acceptance criteria are only one step away from tests. They do not need to be written as code in the first instance, but they should be concrete enough that you can later express them through automated checks, manual verification steps, or both. If a criterion cannot be verified in any plausible way, it is usually not specific enough yet.

One particularly effective pattern is to ask the agent to generate tests from the acceptance criteria *before* it sees the implementation. If the resulting tests are vague, contradictory, or obviously incomplete, the criteria still need work. If the tests look sharp, the specification is usually in much better shape than it first appeared.

## Constraints & Non-Goals Prevent Drift

One of the most useful shifts in AI-assisted development is learning to specify not only the target, but the edges.

Constraints tell the system where it must not improvise. They might include:

- use the existing data model;
- do not introduce a new dependency;
- keep changes within this package;
- preserve the public API;
- use the current testing framework;
- avoid schema migrations.

Non-goals are slightly different. They define tempting adjacent improvements that are explicitly out of scope.

Examples:

- do not redesign the UI;
- do not refactor unrelated modules;
- do not switch auth providers;
- do not update old tests unless required by the feature.

These statements feel negative, but they are actually liberating. They reduce the space in which the model can “help” in ways that create more review burden than value.

### A Useful Constraint Structure

One practical way to express boundaries is to separate them into three bands:

- **Always** — actions the system should take without hesitation, such as running the relevant tests or using the project’s existing validation helpers.
- **Ask first** — actions that may be reasonable, but require human confirmation, such as changing a schema, adding a dependency, or broadening the scope.
- **Never** — hard stops, such as touching secrets, editing vendor code, or bypassing the release process.

This structure is often clearer than a flat wall of prohibitions because it tells the model where it can proceed confidently, where it should pause, and where it should simply stop.

It also helps to distinguish hard stops from strong preferences. “Preserve the public API” is usually a hard boundary. “Prefer the current helper pattern unless it creates obvious duplication” is often an ask-first preference. That distinction tells the agent where it can optimise and where it should stop and seek judgement.

## Calibrated Specificity

The goal is not maximal detail. The goal is **calibrated specificity**.

A brief can fail in two directions.

### Under-Specified

Here the model has to infer too much. It chooses architecture, scope, or interpretation for you. You get plausible but unreliable output.

### Over-Specified

Here the brief dictates so much that the model has no room to contribute useful reasoning. You may also spend too much time specifying irrelevant detail upfront, especially where the right approach should depend on what the system discovers.

The sweet spot is what we might call **precisely incomplete**. You specify the parts that must be explicit — goals, constraints, acceptance criteria, non-goals, and key references — while leaving room for the model to work within those bounds.

This is one reason specifications are so valuable. They let you be crisp about the important parts without forcing you to pre-write the entire implementation.

Before handing a specification to an agent, a teammate, or your future self, it is worth running a short calibration check. Can each acceptance criterion be verified? Have you named the constraints that matter and the tempting adjacent work that does not? Would a first-time reader understand why this task exists? If not, the document is still closer to a prompt than to a specification.

A short contrast helps.

- **Under-specified** — “Build a better dashboard.” The model must guess what matters: speed, layout, data, permissions, or design.
- **Over-specified** — “Build the dashboard with exactly these components, these column widths, this internal file layout, and these helper names,” before the codebase has even been inspected.
- **Precisely incomplete** — “Add a sales dashboard for regional managers showing revenue, orders, and refund rate by region; it must load under two seconds on the current dataset, respect existing permissions, reuse the analytics service, and exclude forecasting for now.” Here the goal and boundaries are clear, while the implementation still has room to breathe.

## When A Prompt Should Become A File

Not every task deserves a standalone document. But many tasks cross the line sooner than people think.

A prompt should usually become a file when:

- the task spans multiple steps or sessions;
- more than one person or agent may touch it;
- the work needs review before execution;
- the brief will evolve over time;
- the acceptance criteria matter enough to preserve;
- the conversation would otherwise become the only place where the task is defined.

A useful rule of thumb is that if another person — or future you on a tired Friday afternoon — needs to understand the task without rereading the chat, it deserves a file.

At that point, a Markdown plan, spec, or PRD becomes more than convenience. It becomes an operational control surface. Durable written artefacts improve agentic development because they externalise intent and give the work a stable reference point outside the chat.

Once the spec becomes a file, treat it like real project infrastructure. Link to it from the pull request. Refer to it in commits when the work is long-running. If the implementation changes the scope or reveals a missing constraint, update the file so the next human or next agent does not have to rediscover the truth painfully from repository archaeology.

For larger pieces of work, one file is often not enough. The practical pattern is to keep the specification as the stable statement of intent, then derive a plan, a task list, and perhaps a short summary or index from it. Large monolithic briefs tend to collapse under their own weight. Structured, modular artefacts give the agent a clearer route through the work.

That modularity matters more as work scales. A single oversized brief can become a dumping ground that weakens rather than strengthens execution. Separate the stable statement of intent from the task list, and split large programmes into sections or companion files when doing so makes the work easier to navigate and verify.

This is also why plans matter. A good plan translates the specification into a sequence of reviewable steps. The spec defines the “what”. The plan starts to shape the “how”.

## Specification Improves People Work Too

It is worth saying plainly that specifications are not only for models. They improve communication among humans as well.

A good brief:

- clarifies decisions before implementation begins;
- exposes ambiguity early;
- makes reviews more concrete;
- reduces accidental scope growth;
- creates a better historical record of why a change exists.

This is part of why AI-assisted development often rewards teams that were already good at writing things down. The presence of an agent simply makes the benefits of legibility more immediate. The hidden assumptions that used to survive through hallway knowledge now become a direct source of task failure.

The corollary is that stale specifications create their own kind of debt. A spec that no longer matches the work is not harmless background noise. It is a misleading interface. Treat specifications like code: versioned, reviewable, and worth updating when reality changes.

## A Small Practical Rewrite Pattern

One of the best habits you can develop is a quick rewrite pass from raw request to executable brief.

Take the initial request and add, in order:

1. **Intent** — what problem are we solving?
2. **Acceptance criteria** — what must be true when we are done?
3. **Constraints** — what should stay fixed?
4. **Non-goals** — what is outside scope?
5. **Context** — which files, docs, or commands matter?

Even when done quickly, this rewrite changes the quality of the interaction dramatically. It turns a conversational wish into an engineering artefact.

## Closing Thought

Specificity is the bridge between having powerful tools and getting dependable results from them. Without it, AI-assisted work remains plausible, reactive, and often wasteful. With it, the interaction becomes far more like professional engineering: clear objectives, bounded scope, observable success, and reviewable artefacts.

That is why this lesson lands at the end of Part 1. Context, Skills, and modality choice all become more useful once you can specify the work properly. The next part of the course builds on exactly that foundation: once you can define the task well, you can start delegating it more confidently and designing workflows around it.

---

## Deep Dives

### Specification-Driven Development
- [GitHub Spec Kit](https://github.com/github/spec-kit) — A practical framework for turning specifications into plans and tasks.
- [Spec-driven development using Markdown as a programming language when building with AI](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-using-markdown-as-a-programming-language-when-building-with-ai/) — A strong case for treating Markdown artefacts as operational inputs, not just notes.
- [A guide to spec-driven development](https://github.com/github/spec-kit/blob/main/spec-driven.md) — The clearest compact articulation of the workflow.
- [Kiro and the future of AI spec-driven software development](https://kiro.dev/blog/kiro-and-the-future-of-software-development/) — Useful for understanding file-backed planning as a response to context-window drift.

### Prompting & Practical Framing
- [Refine your initial prompt instead of course-correcting](https://elite-ai-assisted-coding.dev/p/refine-your-initial-prompt-instead-of-course-correcting) — A practical expression of this entire lesson.
- [Make Dictation Your Prompting Superpower](https://elite-ai-assisted-coding.dev/p/make-dictation-your-prompting-superpower) — Helpful if your bottleneck is getting clear intent out of your head quickly.
- [Product Thinking for Agentic Development](https://elite-ai-assisted-coding.dev/p/product-thinking-for-agentic-development) — A useful reminder that better briefs usually begin with clearer product reasoning.

### Durable Artefacts
- [Product requirements document](https://en.wikipedia.org/wiki/Product_requirements_document) — Background if you want the broader lineage.
- [Architectural Decision Records](https://adr.github.io/) — A lightweight way to persist technical decisions that agents and humans alike can consult.
- [Spec-First Development For API -> MCP](https://elite-ai-assisted-coding.dev/p/spec-first-development-for-api-mcp) — A concrete example of using specifications as the starting point for tool and system work.

# Homework — Build the Working Surface for Your App

*This homework turns Part I into a concrete setup you can keep using for the rest of the course. The point is not to build a large application. The point is to create a small real project with enough structure that an AI coding agent can onboard, understand the domain, run the app, and make future changes with less guessing.*

## Topic

**Build a tiny app and the AI operating surface around it.**

## Main Goal

Create a deliberately small web app and package it with the context, rules, tools, and reference material an agent will need later. By the end, you should have a repo that is easy for both a human and an agent to navigate: the app runs, the intent is written down, the boundaries are explicit, and the useful commands and docs are discoverable without spelunking.

Keep the app itself narrow. A todo list, bookmarks catalogue, reading list, recipe box, habit tracker, or lightweight personal CRM are all perfectly good choices. In Week 1, you only need **one thin vertical slice**: one page or screen, one domain object, and one simple create-and-display flow. Minimal persistence is fine.

## Core Exercise

Build the app and add the core pieces of a portable context stack around it.

Your repository should include:

- a **working mini-app** with one clear user flow;
- `docs/spec.md` with the app’s **intent**, **acceptance criteria**, **constraints**, and **non-goals**;
- `AGENTS.md` or the equivalent rules file for your main tool, including the real run/build/test commands, key paths, durable docs, and clear **always / ask first / never** guidance;
- at least **two Skills**:
  - one **procedural Skill** such as `app-smoke-test`, `setup-and-run`, or `frontend-change-review`;
  - one **knowledge Skill** such as `app-domain-reference` or `data-model-and-route-map`;
- at least **one MCP server**, with Playwright MCP as the default recommendation for a web app;
- `docs/reference-index.md` or an equivalent curated doc index pointing to the framework docs, testing or browser-tool docs, and one additional source relevant to your stack;
- a `README.md` that explains what the app is, how to run it, which tool you used, and where the rules, Skills, MCP config, and reference docs live.

Work pragmatically. Start from a familiar starter if that saves time. Adapt existing examples where sensible. Keep the rules file short and operational rather than philosophical. Make the procedural Skill concrete enough that you would genuinely want to invoke it again, and make the knowledge Skill a tight discovery surface rather than a dumping ground for every note you have ever had.

The real learning target is the **division of labour between context surfaces**: rules for always-on defaults, Skills for specialised procedures or reference knowledge, MCP for runtime inspection, and docs for durable truth. If that division is still fuzzy in your repo, tighten it until it becomes obvious.

## Stretch Goal

Prove that the setup works rather than stopping at “the files exist”.

Add `docs/validation.md` and run a few fresh-session checks. Ask the agent which package manager and dev command to use, where the durable docs live, which Skill should handle a smoke test, which MCP server is available, and what is out of bounds. Then run one real workflow with the procedural Skill and the MCP server: launch the app, perform a simple user action, confirm the result, and ask the knowledge Skill to explain the domain model or suggest one small next change. If the answers wobble or turn generic, revise the setup once and record what improved.

## Advanced Stretch

If you want to push this further, make the setup more **shareable, portable, or harder to break**. Good directions include adding another procedural Skill, generating a lightweight code map, introducing a second MCP server that genuinely matches your workflow, or turning one of the Skills into a more deterministic script-backed procedure. You could also add a project-local AI-facing doc index, a second rules surface for another client, a tiny `docs/decisions.md`, or a minimal test harness that prepares the repo for Week 2.

The advanced bar is not about volume. One excellent reusable review Skill and one crisp architecture summary are worth far more than a forest of context files nobody will actually maintain.

# Part II — Agentic Software Engineering

# Lesson 6 — Specification-Driven Development

*Part 1 argued that better results begin with better task definition. Lesson 5 showed how to write clearer specifications; this lesson turns those artefacts into a repeatable engineering method. Specification-driven development treats the specification as the primary interface to agentic coding: a durable statement of intent, scope, and success that can be reviewed before implementation begins. By the end, you should understand how a spec, a plan, and a verification loop combine to make agentic work far more predictable.*

## Why The Specification Becomes The Interface

In ordinary interactive prompting, the conversation itself often carries the task. That works for narrow or exploratory work, but it breaks down as scope, duration, or autonomy increase. Once an agent is operating over many steps, possibly across multiple sessions or files, the task definition needs to become more durable than a chat turn.

That is why specification-driven development matters. The specification becomes the interface between intent and execution. Instead of asking the model to infer what you meant from a short conversational exchange, you give it an artefact that can be reviewed, revised, and reused.

This creates several advantages:

- **Clarity before action** — ambiguity surfaces earlier, when it is cheaper to fix.
- **Reviewability** — humans can inspect the brief before the agent starts changing code.
- **Continuity** — the definition of the work survives context-window loss or session boundaries.
- **Composability** — plans, tasks, tests, and reviews can all point back to the same source of intent.

The broader point is simple: when AI becomes part of implementation, written artefacts become more important, not less. They give plans, tasks, tests, and reviews a shared source of intent.

## The Core Artefacts: Spec, Plan, Tasks

A useful way to think about specification-driven work is as a short chain of increasingly concrete artefacts.

### The Specification

The specification defines the problem. It answers what we are trying to achieve, why it matters, what constraints apply, and what counts as success.

### The Plan

The plan translates the specification into an execution approach. It identifies the likely components, dependencies, checkpoints, risks, and verification strategy.

### The Tasks

Tasks break the plan into reviewable units of work. Each task should be small enough to execute and verify, but large enough to make real progress.

This progression is valuable because it preserves a clean separation of concerns. The spec is not forced to describe every implementation step. The plan is not forced to redefine the product intent. The tasks are not forced to rediscover the architecture. Each artefact does a specific job.

For agentic work, a fourth artefact is often worth keeping close by: a record of important decisions. A plan tells the agent what sequence to follow. A decision log or preserved transcript summary explains why a dependency was chosen, why a scope cut was made, or why an apparently simpler alternative was rejected. That record becomes valuable the moment a future session, reviewer, or second agent asks not only “what happened?” but “why this way?”

A short to-do list inside chat can still be useful for a single session. The difference is that a file-backed `plan.md` survives the session. It can be reviewed, revised, and handed to the next human or agent without relying on memory.

There is also a curation step hiding in this chain. AI can help draft a specification, propose a plan, or split work into tasks, but a draft is not yet a hand-off. Someone still needs to tighten the language, remove decorative complexity, and check that the artefacts describe the actual problem rather than the first plausible version of it. Specification-driven development is not spec generation. It is spec curation.

In practice, that curation usually means doing three things deliberately: keep the acceptance criteria sharper than the prose around them, make the commands and boundaries painfully explicit, and preserve the product reasoning that the code alone will not reveal later. The draft may come from the model. The authority still has to come from you.

## What A Good Specification Contains

A strong specification does not need to be encyclopedic, but it does need to carry the essential structure of the problem.

At minimum, it should usually include:

- **Intent** — the problem being solved and the value of solving it.
- **Acceptance criteria** — observable conditions that define success.
- **Constraints** — architectural, product, operational, or procedural boundaries.
- **Non-goals** — adjacent changes that must not be folded in.
- **Relevant context** — files, systems, documents, or references that matter.

For larger tasks, it often helps to add:

- user stories or scenarios;
- risks or open questions;
- migration or rollout concerns;
- verification expectations;
- links to related plans or prior work.

Many teams also make the operational surface explicit: which commands matter, which tests are authoritative, which parts of the project structure are in play, what style rules apply, how Git should be used, and where the hard boundaries sit. That may sound pedestrian. It is also where a large share of failed delegations begins.

If the work will run unattended, this operational surface matters even more. A background agent cannot rely on conversational rescue, so commands, tests, Git expectations, and hard boundaries should be explicit rather than merely implied.


If the change is user-facing, it also helps to name the user or operational job explicitly. A technically precise specification built on fuzzy product reasoning still gives the agent too much room to solve the wrong problem.
The art is to be explicit where ambiguity would be costly while remaining light enough that the specification stays readable. A spec should make the intended change clearer, not bury it under ceremony.

### Always, Ask First, Never

One especially useful way to state boundaries is to split them into three bands.

- **Always** — actions the agent should take without hesitation, such as running the relevant tests or following the project’s naming conventions.
- **Ask first** — actions that may be reasonable, but only with human confirmation, such as adding a dependency or changing a schema.
- **Never** — hard boundaries, such as touching secrets, modifying vendor code, or bypassing the release process.

This structure is often clearer than a flat pile of prohibitions because it tells the agent when to proceed confidently, when to pause, and when not to attempt the move at all.

A useful practical rule is that intent, acceptance criteria, constraints, and relevant context are usually mandatory. Migration notes, rollout details, and richer user scenarios become more valuable as the task crosses team, system, or operational boundaries. Not every spec needs every appendix.

## Plans As Guiding Artefacts

If the specification answers the “what”, the plan begins to answer the “how”.

A good plan gives the agent and the reviewer a structured sense of attack:

- which components are likely involved;
- what order of work makes sense;
- where checkpoints should exist;
- what verification is needed;
- what failure modes are likely.

This matters because many agentic failures are not failures of raw implementation. They are failures of sequencing. An agent tackles too much at once, modifies code before establishing a clean baseline, or declares success before proper validation. A plan reduces that tendency by imposing a visible structure on the work.

Plans also create a useful human review point. It is often cheaper to challenge a plan than to challenge a finished implementation. If the plan reveals that the task has been misunderstood, you can correct course before the codebase absorbs the misunderstanding.

That is why file-backed planning is so effective. A `plan.md` or similar artefact externalises the reasoning and makes it inspectable. It also keeps important progress out of the chat transcript, where it will otherwise decay.

### Keeping Plans Current

Plans are living artefacts rather than ceremonial prefaces. Update the plan when implementation reveals a real constraint, when a verification step turns out to be missing, or when the intended order of work no longer makes sense. If the code and the plan drift apart for too long, the plan stops being guidance and starts being folklore.

## The Spec-Test-Implement Loop

A practical specification-driven workflow is not linear. It is iterative.

A good working loop often looks like this:

1. **Specify** — define the task clearly enough that success is testable.
2. **Plan** — decide the likely execution shape and checkpoints.
3. **Implement** — carry out a bounded unit of work.
4. **Verify** — run tests, checks, or explicit review steps.
5. **Refine** — improve the spec or plan if the result diverges.

This is one place where software engineering and agent design align beautifully. Acceptance criteria become tests. Tests reveal mismatches. Mismatches reveal either implementation bugs or specification bugs. Either way, the loop gets tighter.

In practice, the tighter version of this loop is often **specify, express the key checks, implement, verify, refine**. The moment you can restate an acceptance criterion as a test or explicit validation step, you have made the task safer to delegate.

When risk or ambiguity is high, it can be useful to write or refine verification before implementation. Tests drafted from the specification force the acceptance criteria into executable form and reduce the temptation to declare victory on vague grounds. This is one of the clearest ways to keep “spec-driven” from collapsing back into prompt-driven improvisation.

The important insight is that verification is not an optional extra bolted onto the end. It is part of the method. Without it, a specification is just a well-worded hope.

It is also worth saying plainly that verification cannot be delegated away in the strongest sense. Agents can run tests, gather evidence, and even review diffs intelligently. They do not remove the need for human judgement about whether the proof is meaningful, whether the right risks were checked, or whether a passing run has simply missed the real edge case.

It is also part of how teams avoid comprehension debt. Verification is not only there to catch bugs. It keeps human understanding coupled to the work. If the agent’s output volume grows while review quality shrinks, the system may look faster while becoming harder to change safely.

## Treat Failures As Specification Bugs

One of the healthiest mental shifts in agentic software engineering is to stop treating every bad run as proof that the model is unreliable in some vague cosmic sense.

Often the more useful interpretation is that the run exposed a **specification bug**.

That might mean:

- the scope was ambiguous;
- the acceptance criteria were incomplete;
- the wrong context was referenced;
- a critical constraint was implicit rather than stated;
- the plan failed to sequence verification properly.

This framing is powerful because it gives you something concrete to improve. Instead of arguing abstractly about whether the model is “good”, you ask a more engineering-like question: what was missing from the definition of the task?

This is also why specification-driven development composes so well with agentic iteration. Each run teaches you something about how much explicit structure the task needs. Over time, those lessons improve not only the current task, but your general ability to delegate work safely.

Suppose the specification says only “improve onboarding performance”. An agent may redesign the flow, cache aggressively, or shift work to the client in ways you never intended. That does not prove the agent is bizarre. It proves the brief never said whether the priority was first paint, completion time, network chatter, or preserving the existing user journey. Once the spec is rewritten to say “reduce onboarding bundle size by 20%, keep the flow unchanged, and verify with the existing Web Vitals script”, the task becomes sharply more tractable. That is a specification repair.

## Context Provides The “How”, The Spec Provides The “What”

A useful distinction is that context and specification solve different problems.

- **Context** gives the agent the environment in which to work: conventions, commands, architecture, references, and tools.
- **Specification** gives the agent the objective: what change is required, what success means, and what boundaries apply.

You need both.

If you have rich context but a weak specification, the agent knows the world but not the mission. If you have a strong specification but poor context, the agent knows the mission but not the terrain. High-quality agentic work emerges when both are present and clearly separated.

This is also why context files should not be forced to carry the entire task definition. The repository instructions explain how the world works. The specification explains what must happen now.

## First-Pass Yield As A Useful North-Star Metric

A practical measure of specification quality is **first-pass yield**: how often does a delegated change come back close to mergeable without substantial corrective work?

In practice, this metric becomes useful as soon as you define what “close to mergeable” means locally. That might include passing the relevant tests, staying within the intended architecture, satisfying the acceptance criteria, and requiring only light review edits rather than a second planning round. You do not need a grand analytics platform to begin. A simple weekly count across a dozen delegated tasks is already informative.

This is not the only useful metric, but it is a revealing one because it captures the combined effect of several good habits:

- strong specifications;
- relevant context;
- appropriate modality choice;
- sensible plans;
- meaningful verification.

If first-pass yield is consistently poor, the lesson is not necessarily “use a better model”. It may be that your specifications are too vague, your plans are too loose, your tasks are too broad, or your context is incomplete. The metric points you back toward workflow quality rather than model mythology.

For everyday use, the measure can stay simple: of the changes you delegate, how many return close to mergeable without a second planning round or a large rewrite during review? Once you can answer that consistently, first-pass yield becomes a practical feedback signal rather than a slogan.

## Why Markdown Works So Well

It is worth noting why so much specification-driven work ends up in Markdown. Markdown sits in a sweet spot:

- easy for humans to read and edit;
- easy for agents to parse;
- easy to version in Git;
- light enough to remain flexible;
- structured enough to hold real planning artefacts.

This may sound mundane, but it matters. The best operational artefact is often not the most elaborate one. It is the one that will actually be written, reviewed, updated, and kept near the code. Markdown wins not because it is grand, but because it is frictionless enough to become habit.

For larger programmes of work, the practical answer is usually not one enormous file. It is a stable top-level specification accompanied by a plan, a task list, and perhaps short section summaries or domain-specific companion files. Modular artefacts usually scale better than monoliths because they preserve clarity without forcing the agent to wade through every detail on every turn.

## Closing Thought

Specification-driven development is not paperwork for its own sake. It is a method for making agentic work reviewable, durable, and predictable. The more autonomy you introduce, the more valuable that method becomes.

A well-written specification turns intention into a stable engineering artefact. A good plan turns that artefact into an execution path. Verification closes the loop. Together, they give you something much better than a clever prompt: a repeatable way to delegate complex work without surrendering clarity or control.

That is the foundation for the rest of Part 2. Once the work is specified properly, the next question becomes how to exercise control over the agent that executes it.

---

## Deep Dives

### Core Frameworks
- [GitHub Spec Kit](https://github.com/github/spec-kit) — The most practical open framework for spec → plan → tasks → implementation.
- [A guide to spec-driven development](https://github.com/github/spec-kit/blob/main/spec-driven.md) — A concise expression of the method.
- [Spec-driven development using Markdown as a programming language when building with AI](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-using-markdown-as-a-programming-language-when-building-with-ai/) — Strong conceptual framing from GitHub Next.

### File-Backed Planning
- [Kiro and the future of AI spec-driven software development](https://kiro.dev/blog/kiro-and-the-future-of-software-development/) — Useful for understanding why file-backed artefacts outperform prompt-only workflows for larger tasks.
- [Product Thinking for Agentic Development](https://elite-ai-assisted-coding.dev/p/product-thinking-for-agentic-development) — A practical reminder that better implementation starts with clearer product reasoning.
- [Spec-First Development For API -> MCP](https://elite-ai-assisted-coding.dev/p/spec-first-development-for-api-mcp) — A concrete example of letting the specification drive downstream technical work.

### Supporting Artefacts
- [Architectural Decision Records](https://adr.github.io/) — Useful when specifications depend on durable technical decisions.
- [Product requirements document](https://en.wikipedia.org/wiki/Product_requirements_document) — Background on the broader lineage of specification artefacts.
- [Make Dictation Your Prompting Superpower](https://elite-ai-assisted-coding.dev/p/make-dictation-your-prompting-superpower) — Helpful if the bottleneck is extracting clear intent quickly enough to turn into a usable spec.

# Lesson 7 — Exercising Control in Agentic Coding

*Agentic coding is powerful precisely because it can take on broader, longer, and more autonomous work. That same breadth makes control a first-class concern. This lesson explores how to exercise control without smothering the benefits of delegation: choosing the right level of autonomy, managing scope, using checkpoints, and handling the reality of finite context windows. By the end, you should be able to design agentic work that remains inspectable, recoverable, and calm.*

## Autonomy Is Not The Goal

A great deal of agentic tooling is framed around autonomy. This is understandable: it is more exciting to imagine an agent independently completing a feature than to imagine a series of careful checkpoints. But in real software work, autonomy is not the objective. Useful delegation is.

That distinction matters. The right question is not “how much can I get the agent to do by itself?” The right question is “what level of independence is appropriate for this task, in this repository, under these constraints?”

In practice, effective control means choosing a point on a spectrum.

- **Low autonomy** — tightly guided, short-loop work with frequent review.
- **Moderate autonomy** — bounded tasks where the agent can make local decisions inside a clear brief.
- **High autonomy** — broader execution where the agent plans, acts, and verifies with limited intervention.

Each point has legitimate uses. The mistake is to assume that more autonomy is automatically more advanced. Often it is simply more expensive when the task is underspecified.

## Match Autonomy To Scope

A practical rule is to align the amount of autonomy with the amount of scope and the cost of error.

When the change is small and local, you can keep the loop tight. When the change is broader but well-specified, you can widen the loop. When the stakes are high or the boundaries unclear, you usually want more explicit review, not less.

A few useful heuristics:

- **Small local changes** tolerate tight, lightweight loops.
- **Cross-file but bounded changes** often fit moderate autonomy with clear checkpoints.
- **Open-ended or high-risk work** demands stronger specifications, stronger verification, and often lower operational freedom even if the agent is capable of more.

This is why specification quality and control are inseparable. A strong brief buys you more safe autonomy. A weak brief forces you back into constant supervision.

### Specification Is The First Control Surface

The cheapest control mechanism is often not a setting. It is a better brief. If the agent keeps drifting, the first question is usually not “which approval mode should I change?” but “what did I fail to make explicit?” Strong control starts with intent, constraints, acceptance criteria, non-goals, and a clear review surface. Tooling settings then reinforce that control rather than trying to rescue its absence.

Scope and permissions still matter, but they work best when they reinforce that brief rather than compensate for its absence.

## Scope Management Is A Control Mechanism

One of the simplest ways to stay in control is to define smaller units of work.

Agents get into trouble when the task boundary is vague. They decide to “clean up” adjacent code, fold in unrelated refactors, or widen the solution space beyond what the reviewer can comfortably inspect. That is not necessarily irrational behaviour. It is a consequence of a boundary that was never made concrete.

Useful scoping habits include:

- naming the exact subsystem or directory in scope;
- listing files or entry points likely to change;
- stating which behaviours must remain untouched;
- breaking large goals into distinct tasks rather than one enormous run;
- declaring explicit non-goals.

This keeps the review surface legible. Smaller scope does not mean smaller ambition overall. It means larger ambitions are pursued through controlled increments rather than one dramatic swing.

A scope statement can be blunt. “Change only files under `src/auth/`; do not add dependencies; preserve token-refresh behaviour; prove the result with the auth test suite.” That kind of sentence is not glamorous, but it is one of the cheapest control mechanisms available.

## Version Control As Your Safety Net

If you work with agents seriously, version control stops being mere hygiene and becomes part of the control plane.

Topic branches, small commits, and meaningful history make agentic work easier to inspect and easier to recover from. They also reduce fear, which matters more than people admit. Teams are more willing to delegate broader work when they know that rollback is straightforward.

Useful habits include:

- work on dedicated branches;
- commit at natural checkpoints;
- keep commit messages descriptive enough to explain what changed;
- use draft pull requests when the work needs broader visibility;
- prefer reviewable history over one giant final squashing manoeuvre.

The point is not pedantry. It is to create a trail of legible decisions. An agent that leaves a clean series of changes is far easier to trust than one that returns with a single opaque blob of modifications.

## Checkpoints Create Recoverability

Checkpointing is broader than Git, though Git is usually the best foundation for it.

A checkpoint is any recoverable moment in the work where you can stop, inspect, and decide whether to continue. In practice, checkpoints might be:

- a commit;
- a saved diff;
- a clean passing test run;
- a progress update in a plan file;
- a draft PR state;
- a manual approval gate.

These moments matter because they turn a potentially messy continuous run into a sequence of bounded decisions. Each checkpoint asks a simple question: do we like the current direction enough to proceed?

This pattern is particularly important for longer-running or higher-autonomy tasks. Agents perform better when they are encouraged to make incremental progress, leave the environment in a clean state, and write durable progress notes for the next session rather than trying to one-shot everything.

## Incremental Review: Complete, Review, Verify, Test

A useful operational loop for agentic work is extremely simple:

1. **Complete** a bounded unit of work.
2. **Review** what changed.
3. **Verify** that it matches the brief.
4. **Test** the relevant behaviour.

This sounds almost insultingly obvious, which may be why people skip it. But the loop is effective precisely because it is boring. It keeps the task from drifting too far between human checks.

Review and verification are not the same thing. Review asks whether the change makes sense. Verification asks whether it satisfies the specification. Testing asks whether it actually works. Together, they provide three different lenses on the same output.

That distinction is worth preserving. A diff can look tidy and still miss the brief. A change can satisfy the brief and still fail in execution. Collapsing review, verification, and testing into one vague “seems fine” judgement is how drift sneaks through.

None of this removes the proof burden. If you have not seen the change do the right thing — through a targeted test run, a manual walkthrough, or both — then the change is not done merely because the diff looks plausible. AI makes this sharper, not softer, because it can produce more code in less time than a human can comfortably absorb.

As autonomy increases, this loop should become more structured, not less. The danger is not that agents change too little. It is that they change a great deal before anyone asks whether the work still aligns with intent.

### A Manager’s Quick Check

Before you widen autonomy, ask four blunt questions:

1. **Can I state success clearly?** If not, the task is not ready.
2. **What still requires my judgement?** Architecture, product trade-offs, and risk decisions rarely benefit from being hidden inside the hand-off.
3. **How will I verify the work?** Passing tests, manual checks, and explicit review criteria should exist before the agent starts improvising.
4. **Can I recover cleanly?** If rollback, restart, or hand-off would be messy, tighten the loop first.

These are management questions more than prompt questions. That is partly the point.

### A Short Control Loop In Practice

Suppose an agent has been asked to update an authentication flow across three files. A sensible loop would look like this: first, let it complete the bounded code change; then review the diff to make sure it touched only the intended files; then verify the change against the brief, perhaps confirming that token-refresh behaviour was not altered; then run the targeted authentication tests before allowing the task to continue into docs or cleanup. That small loop is often enough to catch drift before it spreads.

## Context Window Management

There is a second control problem that becomes more visible in agentic workflows: finite context windows.

Even very large windows are still bounded, and quality tends to degrade as irrelevant material accumulates. Models can carry more than before, but they do not possess magical perfect recall across arbitrarily long sessions. Eventually, the active state becomes noisy, summaries become lossy, and the model starts reasoning over a blurred version of the earlier conversation.

This is why context management is a control concern rather than a mere technical footnote. If the working state degrades, so does the quality of the agent’s judgement.

Typical warning signs are surprisingly mundane:

- the agent reintroduces approaches that were already rejected;
- it needs repeated reminders about file locations or constraints;
- it starts answering in broader, more generic terms even as the task becomes more specific;
- or it confuses verified facts with earlier hypotheses.

Once those patterns appear, you are usually better served by externalising state and starting clean than by trying to heroically preserve one swollen thread forever.

### Working With Fresh Sessions

One healthy habit is to prefer fresh sessions sooner than your optimism suggests.

A fresh session can be an advantage when:

- the current thread has accumulated too much exploratory detritus;
- the next step is distinct enough to deserve a clean brief;
- compaction would likely discard important nuance;
- you want to restate the task against the current, verified repository state.

This does not mean abandoning continuity. It means moving continuity into durable artefacts — plans, progress notes, specs, file-backed state, and Git history — so that a fresh session starts from legible external memory rather than fragile conversational residue.

In other words, a fresh session is not a reset if the project has been documented properly. It is a deliberate garbage collection step.

A clean handoff usually includes four things: the current specification, the recent commits or diff, a short progress note explaining what has been verified already, and the open questions that still matter. If those artefacts exist, a fresh session is usually a gain rather than a cost.

### Compaction, Summaries, & Sub-Agents

Modern tools increasingly offer compaction or summarisation as the context window fills. This is useful, but it is not magic. Summaries compress detail. Compression always loses something.

That means compaction is best treated as a tool with trade-offs:

- helpful when the prior conversation contains routine material;
- risky when the session contains delicate edge cases or tacit decisions not preserved elsewhere;
- safer when durable files already hold the important state.

Sub-agents can also help here by isolating work in cleaner local contexts. Rather than forcing one session to carry every detail of every subtask, you can delegate research, verification, or focused transformations to smaller contexts and return with distilled findings. This is one of the main reasons sub-agents are valuable: not because they are fashionable, but because they protect attention.

Seen this way, sub-agents are a control pattern as much as a productivity pattern. A focused worker with a narrow brief, a constrained toolset, and a clean context is easier to trust than a swollen main thread that is now trying to remember everything at once.

## Approval Modes & Practical Guardrails

For some tasks, control is not just about workflow shape but about explicit permission boundaries.

Approval modes, command confirmation, restricted tool use, and sandbox boundaries all provide practical guardrails. These are especially useful when the task involves:

- risky shell commands;
- external network calls;
- infrastructure or deployment actions;
- migrations;
- access to sensitive repositories or data.

The key is not to turn every action into a bureaucratic slog. Approval fatigue is real. The aim is to put friction where the consequences justify it. Routine low-risk edits should feel light. Potentially effectful or irreversible actions should feel deliberate.

Background or unattended agents make this even sharper. When there is no mid-flight conversation, specification quality and approval design do far more of the control work up front. The safest async runs are rarely the most loosely phrased ones.

One simple model is to think in bands. Low-risk edits can stay in a green zone of routine execution plus review. Changes with wider blast radius sit in an amber zone of explicit confirmation and tighter checkpoints. Highly consequential actions — production changes, destructive scripts, sensitive credential use — belong in a red zone where human approval is not ceremonial but required.

A useful middle ground is report-first approval. The agent investigates, summarises what it plans to do, and waits for sign-off before taking the effectful step. This preserves speed for analysis while keeping consequential actions deliberate.

### Solo And Team Control Are Not The Same

A solo developer with a strong test suite can sometimes afford looser control. If the code is low-risk, the rollback path is easy, and the same person will live with the result, automation can shoulder more of the burden. Even then, manual verification of the final behaviour remains essential.

In practice, that usually means something like this:

- **Solo work** — more autonomy is acceptable when the tests are trustworthy, the rollback path is clean, and the same person will absorb the consequences.
- **Team work** — smaller diffs, tighter specifications, and explicit sign-off matter earlier because the code will outlive the person who prompted it.

Teams face a different constraint. Review is not only about catching bugs; it is also a knowledge-transfer mechanism. If AI-generated work lands without any human fully understanding it, the future cost arrives during on-call, maintenance, or the next refactor. As output volume rises, human review bandwidth becomes the real limit. That is why team workflows usually need smaller changes, clearer proof, and explicit human sign-off long before anything reaches `main`.

That is also why team control should usually tighten earlier than solo control. A single developer can sometimes afford more improvisation because they will personally absorb the consequences. A team inherits one another’s changes. That makes clarity, proof, and handoff quality more important than local speed.

## Control Should Feel Lightweight

There is a final subtle point here. Good control does not feel like micromanagement. It feels like confidence.

That is also why autonomy is not something to maximise abstractly. It is something to grant where the stakes, specification quality, and proof surface justify it. Low-stakes prototypes can tolerate more looseness. Shared code, sensitive systems, and long-lived maintenance work usually cannot.

When the specification is clear, the scope bounded, checkpoints visible, and progress recoverable, you can grant the agent more operational freedom without feeling reckless. The result is a calmer workflow: less thrashing, less fear, fewer dramatic recoveries.

That calm is a sign that the control layer is working. You are not fighting the agent. You are giving it a structure within which useful delegation becomes normal.

## Closing Thought

Control in agentic coding is not about distrusting the model. It is about acknowledging the realities of software work: scope drifts, context windows fill, tasks expand, and mistakes become more expensive as they travel.

The answer is not to avoid delegation. It is to shape delegation so that it remains inspectable and recoverable. Smaller scopes, better checkpoints, durable artefacts, fresh sessions, and sensible approval boundaries all serve the same end: they let you benefit from agentic execution without surrendering the engineering discipline that keeps a codebase healthy.

In short, the best kind of control is not oppressive. It is infrastructural. It is the set of conditions that lets useful autonomy happen safely.

---

## Deep Dives

### Control & Workflow Discipline
- [Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) — Excellent on incremental progress, clean state, and durable progress artefacts.
- [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) — Useful background on when increasing complexity is actually warranted.
- [Refine your initial prompt instead of course-correcting](https://elite-ai-assisted-coding.dev/p/refine-your-initial-prompt-instead-of-course-correcting) — A practical companion to the lesson’s main claim.

### Checkpoints & Recovery
- [Use Git for Automated Checkpointing](https://elite-ai-assisted-coding.dev/p/use-git-for-automated-checkpointing) — A concrete application of checkpoint thinking.
- [Build Checkpoints for Your Agent with Neon Snapshots](https://elite-ai-assisted-coding.dev/p/build-checkpoints-for-your-agent) — Useful if your environment supports deeper snapshotting.
- [Attribute Git Commits to AI Agents](https://elite-ai-assisted-coding.dev/p/attribute-git-commits-to-ai-agents) — Helpful for keeping history legible.

### Context Windows & Guardrails
- [Does including `AGENTS.md` cause context overflow?](https://elite-ai-assisted-coding.dev/p/does-agents-md-cause-context-overflow) — A practical note on keeping context useful rather than bloated.
- [How do you handle agent sandboxing?](https://elite-ai-assisted-coding.dev/p/how-do-you-handle-agent-sandboxing) — Relevant once control includes environment restrictions.
- [What is “Vibe Coding” and when should I use it?](https://elite-ai-assisted-coding.dev/p/what-is-vibe-coding-when-to-use) — Helpful for recognising where looser control is acceptable and where it is not.

# Lesson 8 — Sub-Agents & Multi-Agent Orchestration

*As agentic tools mature, it becomes tempting to split work across multiple agents: one planning, one implementing, one reviewing, perhaps another lurking ominously as a judge. Sometimes this is exactly right. Sometimes it is merely an expensive way to duplicate context and lose information in transit. This lesson explains when sub-agents are useful, how to decompose work sensibly, and which orchestration patterns are most likely to improve results rather than inflate token bills.*

## Start With One Agent

The most important principle in multi-agent design is surprisingly conservative: start with a single agent until you have evidence that one agent is not enough.

This is not because multi-agent systems are uninteresting. It is because every additional agent introduces overhead:

- another prompt or instruction surface to maintain;
- another context that must be populated;
- another handoff where information can be lost;
- another coordination step that consumes time and tokens.

The practical warning is blunt: teams often build elaborate multi-agent systems where a better prompt, clearer context, or stronger harness for a single agent would have achieved comparable or better outcomes. Multi-agent orchestration is a tool for specific constraints, not a badge of sophistication.

## When Multiple Agents Help

There are three especially good reasons to introduce sub-agents.

### Context Protection

Sometimes a subtask generates a great deal of local information that the main task does not need to carry in full. In those cases, a sub-agent can work in a clean context, process the bulky material, and return a distilled result.

This protects the main agent from context pollution. It is especially useful for retrieval-heavy work, repository exploration, or any subtask where the raw material is large but the useful output is compact.

Fresh context windows are the mechanism that makes this valuable. One agent does not need to carry every file listing, experiment, and false start forever. A sub-agent can absorb that local bulk in its own window and return only the part that remains useful.

### Parallelisation

When subtasks are genuinely independent, separate agents can work simultaneously. This is most compelling for research, exploration, or analysis where broader coverage matters more than strict sequential coherence.

The benefit here is usually thoroughness rather than raw speed. Multiple agents can investigate different facets of a problem or different parts of a search space. The cost is increased coordination and summarisation overhead.

Sometimes the win is less about intelligence than about state isolation. A separate agent working in a separate workspace, branch, or worktree can hold its own local assumptions without contaminating the main thread. In practice, that is often the cleanest reason to split work.

### Specialisation

Sometimes different parts of the work really do benefit from different prompts, tools, or constraints. A code review agent, a documentation agent, and an infrastructure agent may each work better with narrower toolsets and tailored instructions than one bloated generalist exposed to everything at once.

Specialisation is most useful when the domains are clearly separable. If every agent needs half the repository and the same shared state, specialisation often creates more friction than value.

## Designing Effective Sub-Agents

A **sub-agent** is best understood as a scoped worker with its own context and often its own constraints. It is not merely “the same agent again”. It has a narrower mission.

Common use cases include:

- codebase exploration;
- targeted research;
- verification or test running;
- focused edits in a bounded area;
- domain-specific tasks such as documentation, accessibility, or security checks.

This works well because the sub-agent does not need the full weight of the main conversation. It needs only enough context to do its assigned job and return a useful output.

That return path matters. A good sub-agent brief names the question, the scope of the search or action, and the shape of the expected answer. “Investigate our auth tests and return the failing cases plus the most likely root cause” is far more useful than “look into auth”. Narrow tasks create cleaner handoffs.

### A Strong Handoff Brief

One reliable pattern is to structure the handoff around a small set of fields:

- **Outcome** — what the worker is trying to produce.
- **Context** — the minimum background it needs to avoid blind guessing.
- **Constraints** — what must remain stable or out of bounds.
- **Non-goals** — tempting adjacent work the worker should ignore.
- **Acceptance criteria** — how the main agent will judge success.
- **Integration notes** — where the result has to fit back into the wider task.
- **Verification plan** — which checks, tests, or review steps should happen before the result is accepted.

That may sound formal for a small delegation, but even a short version of it dramatically improves handoff quality.

One practical implementation of this idea is to give each worker its own branch or worktree plus a small setup script that recreates the right environment. That turns decomposition into something concrete: each agent gets a bounded slice of state, a reproducible setup, and an output surface that can be reviewed or merged later.

In practice, modern tools expose this in several ways:

- built-in exploration or planning agents;
- custom agent definitions stored in repository files such as `.claude/agents/*.md` or `agent.md`;
- explicit delegation commands;
- UI models that let several agents run side by side.

The exact product surface varies, but the underlying design idea is the same: isolate a subproblem in a context suited to that subproblem.

### Hierarchical Subagents

You do not have to decompose everything flatly. A useful pattern is to let a higher-level worker own a meaningful slice of the problem, then let that worker spawn narrower specialists beneath it. The parent agent now coordinates fewer conversations, while the feature-level worker owns the local details. This often scales more cleanly than asking one top-level agent to micromanage a small army directly.

For example, a top-level agent might own “search”, then hand the backend API work to one worker, the UI integration to another, and the verification pass to a third. The top-level agent does not need every intermediate detail. It needs clear checkpoints and concise returns.

### Decompose By Context, Not Theatre

The most important design choice in multi-agent work is how to split the work.

A common mistake is **problem-centric decomposition**: one agent plans, another implements, another writes tests, another reviews. On paper this sounds tidy. In practice it often creates a telephone game. Each handoff sheds nuance. The tester lacks the implementation rationale. The reviewer lacks the exploration history. Coordination begins to consume more effort than execution.

A more reliable pattern is **context-centric decomposition**. Split work where the context can genuinely be isolated.

Good decomposition boundaries include:

- independent research paths;
- separate components with clean interfaces;
- retrieval tasks that can return summaries;
- black-box verification where the verifier only needs the artefact and the success criteria.

Bad decomposition boundaries include:

- planning and implementation of the same tightly coupled feature;
- tasks that require constant back-and-forth state synchronisation;
- components that share too much mutable understanding.

A useful rule is this: keep together the work that needs the same context. Split only where the boundary is real.

One practical comparison makes the point. A retrieval-heavy sub-agent that reads twenty files and returns a half-page synthesis is usually a win, because it protects the main context from bulk. A “planner” agent handing a vague design to an “implementer” agent is often a loss, because the second agent still needs the reasoning the first one discarded.

## Useful Orchestration Patterns

In practice, a small pattern catalogue does most of the work.

- **Task dispatch** — one orchestrator assigns clearly bounded work items to workers rather than letting several agents wander into the same area.
- **Hierarchical delegation** — a lead owns a feature area and spawns narrower specialists beneath it.
- **Verification workers** — separate agents check whether the artefact meets explicit criteria.
- **Causal chains through artefacts** — one workflow produces an issue, report, or draft PR that the next workflow can consume without guessing.

You do not need to use every pattern. The value is in recognising that orchestration works best when the coordination surface itself is explicit.

Once the boundaries are sensible, a small number of orchestration patterns tend to deliver most of the value.

One multi-agent pattern is consistently more useful than most: the **verification sub-agent**.

Here, the main agent performs the work and a separate agent checks whether the result meets explicit criteria. This can involve:

- running tests;
- checking output schemas;
- reviewing for security or policy issues;
- validating factual claims;
- verifying that acceptance criteria were actually met.

This pattern works well because verification can often be treated as a black-box problem. The verifier does not need the entire history of how the artefact came to be. It needs the requirements, the output, and the means to test or inspect them.

That is one reason verification deserves pride of place. Multi-agent systems generate more output, but proof remains scarce. A separate verification pass is often the difference between parallel progress and parallel confusion.

This is also why verification sub-agents avoid much of the telephone-game problem. The handoff surface is narrower and more objective.

In practice, that handoff should be structured. Give the verifier the success criteria, the artefact to inspect, and the allowed verification methods. Ask it to return a pass/fail judgement, the evidence, and any unresolved risks. Once you specify the interface that clearly, the sub-agent becomes much more dependable.

A minimal handoff template is often enough:

- **Success criteria** — what the verifier should judge against.
- **Artefact** — the diff, PR, report, or build output to inspect.
- **Allowed checks** — tests, static analysis, policy checks, or manual inspection steps.
- **Expected response shape** — pass/fail, evidence, open risks, and recommended next action.

The main caveat is that verification must be concrete. If the verifier is merely told to “check that it works”, it may do a perfunctory pass and declare victory early. Strong success criteria and explicit testing instructions are essential.

As systems scale, verification often becomes the bottleneck rather than generation. That is not a sign that multi-agent work has failed. It is a sign that proof is the scarce resource. Good orchestration plans for that scarcity instead of pretending that more output automatically means more progress.

### Planner, Worker, Judge

A useful general orchestration pattern is a hierarchical one: a planner or orchestrator delegates to workers, and either the planner or a separate judge/verifier evaluates the result.

This pattern is attractive because it mirrors familiar human team structures. But it only works well when the roles are sharply defined.

- **Planner** — decomposes the task, allocates work, and decides the order.
- **Worker** — performs a bounded subtask with the needed tools and context.
- **Judge or verifier** — evaluates whether the result meets the stated criteria.

Where teams get into trouble is when these roles become too abstract. If the planner produces vague tasks, the workers drift. If the judge uses fuzzy criteria, evaluation becomes arbitrary. The pattern is strongest when the planner is grounded in a real spec and the judge is grounded in real verification.

### Agent Teams Beyond Hub-And-Spoke

Some environments now support agent teams rather than only single-lead orchestration. That is, several agents can operate in parallel with their own state and exchange outputs through shared task boards, mailboxes, or structured coordination.

This is where orchestration starts to look more like management than prompting. Shared task lists, explicit ownership, and bounded communication channels matter because they keep the work legible as the number of active agents grows.

This can be useful for:

- parallel research;
- multiple component owners working off a shared plan;
- simultaneous documentation, implementation, and verification work;
- repository-level automation where several repetitive tasks run side by side.

The challenge is the same as in human teams: coordination overhead must not swallow the benefit. More agents do not automatically mean more progress. The win only appears when the work can be partitioned cleanly and the outputs can be recombined without endless reconciliation.

This is where isolated workspaces or branches become valuable. Parallel agents behave much more sensibly when each has its own clean surface area and a clear merge path back into the shared branch.

In local setups, `git worktree` is often the blunt but effective answer. It gives each worker a separate branch and directory without forcing constant branch switching in one checkout.

This is why orchestration layers matter. Task dispatch, merge-from-main maintenance, conflict resolution, and progress tracking are not decorative extras once several agents are active. They are the difference between parallel progress and a polite distributed mess.

## Orchestration In IDEs & Tooling

The growing variety of agentic products means orchestration now appears in several forms:

- side-by-side agents in an IDE;
- built-in planner/explorer agents;
- custom agent files that declare purpose, tools, or instructions;
- background agents triggered by pull requests, issues, or comments;
- workflow systems that spawn specialised steps in CI.

From a course perspective, the product surface matters less than the orchestration principle. The key questions remain:

- why is this sub-agent necessary;
- what context should it have;
- what should it return;
- who verifies the result;
- and what would be simpler if done with one agent instead?

These questions keep you grounded. They stop orchestration from becoming decorative complexity.

A useful economic rule of thumb is that a sub-agent should save more context, time, or coordination than it costs in handoff overhead. If the summary, merge, or verification burden exceeds the benefit, the decomposition is too clever for its own good.

## Common Failure Modes

A few failure modes recur in multi-agent systems.

- **Too many agents too early** — complexity grows before the single-agent path has been exhausted.
- **Bad boundaries** — work is split by role labels rather than by real context boundaries.
- **Weak handoffs** — one agent returns vague summaries that the next agent must reinterpret.
- **Tool overload** — each agent is given too many tools, defeating the point of specialisation.
- **No meaningful verification** — the system produces outputs, but no one checks them rigorously.

When one of these failure modes appears, the best recovery is usually simplification rather than escalation. Salvage the useful artefacts, tighten the brief, and fall back to a single-agent or human-guided path if necessary. Adding yet another coordinating agent is often how a manageable confusion becomes an expensive distributed one.

These are mostly design problems, not model problems. The cure is usually to simplify the architecture, tighten the decomposition, or replace abstract coordination with clearer artefacts.

## Closing Thought

Sub-agents and multi-agent orchestration are useful precisely when they solve a concrete problem: protecting context, parallelising genuinely independent work, or specialising around clearer toolsets and responsibilities.

Outside those cases, more agents often mean more cost, more coordination, and more opportunities for drift. That is why the safest default remains simple: start with one agent, add more only when you can name the constraint they solve, and decompose work by context rather than by theatrical role titles.

When done well, sub-agents feel less like a swarm and more like sensible modularisation. They keep attention where it belongs, verification where it matters, and the main workflow cleaner than it would otherwise be. At scale, this starts to look less like “prompting harder” and more like management: clear briefs, bounded responsibilities, and review loops that keep parallel work from outrunning judgement.

---

## Deep Dives

### Core Guidance
- [Building multi-agent systems: When and how to use them](https://claude.com/blog/building-multi-agent-systems-when-and-how-to-use-them) — The strongest concise argument for starting simple and decomposing by context.
- [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) — Useful background on orchestrator-workers and evaluator-optimizer patterns.
- [Common workflow patterns for AI agents—and when to use them](https://claude.com/blog/common-workflow-patterns-for-ai-agents-and-when-to-use-them) — Good on sequential, parallel, and evaluation loops.

### Parallel & Verification Patterns
- [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) — Helpful for thinking about verification, graders, and evaluation harnesses.
- [The Parallel Agent Multiplier with Git Worktrees and Conductor](https://elite-ai-assisted-coding.dev/p/the-parallel-agent-multiplier-conductor-with-charlie-holtz) — A practical look at parallel agent work in local environments.
- [AI Coding Trace Dissections](https://elite-ai-assisted-coding.dev/p/ai-coding-trace-dissections) — Useful for understanding how agent runs actually unfold.

### Orchestration Ecosystem
- [Agent Skills Specification](https://agentskills.io/) — Relevant because specialisation often depends on reusable packaged expertise.
- [GitHub Agentic Workflows](https://githubnext.com/projects/agentic-workflows/) — Helpful if you want to see orchestration extended into repository automation.
- [How AI Coding Agents Work](https://elite-ai-assisted-coding.dev/p/how-ai-coding-agents-work) — A practical course-site companion to the concepts in this lesson.

# Lesson 9 — The Agent’s Toolbox

*The real leap from assistant to agent happens when the model can do more than speak. Once it can run commands, read files, call services, inspect repositories, and interact with external systems through well-defined tools, it starts to participate in the software development lifecycle rather than merely comment on it. This lesson maps that toolbox: local commands, operational tasks, MCP servers, and reusable prompts or modes. By the end, you should understand not just what tools agents can use, but how to expose them in ways that make good behaviour more likely.*

## Why Tools Change The Game

A chat-only model can explain, propose, or draft. A tool-using agent can inspect the world, test its assumptions, and take action.

That difference is profound. Software engineering is not just text generation. It involves:

- reading code and documentation;
- running tests and linters;
- checking logs and CI output;
- interacting with version control;
- querying APIs and databases;
- preparing pull requests and deployment artefacts.

When an agent gains access to a toolbox that supports these activities, it stops operating in a largely hypothetical space. It can obtain ground truth from the environment instead of relying only on prior probability. That is one reason coding agents work as well as they do: code can be run, checked, and corrected against feedback.

This is also why tool design matters so much. The quality of an agent’s behaviour depends not only on the model and the prompt, but on the clarity of the interfaces through which it acts.

If you remember only one idea from this lesson, remember this one: agents often fail at the interface before they fail at the reasoning. A well-designed tool narrows that failure surface dramatically.

## Local Commands: The First And Most Important Tool Surface

The command line is often the most versatile tool surface available to an agent. If a task can be done by a careful human using standard CLI commands, it can often be delegated to an agent as well.

Typical examples include:

- running tests;
- formatting and linting;
- static analysis and type checking;
- searching the repository;
- building local artefacts;
- reading logs;
- invoking project-specific scripts.

This matters because the CLI already contains much of your engineering environment. You do not need a special AI-native protocol for every useful action. In many cases, a good shell command is the cleanest interface.

That said, command access should be treated with respect. Shell tools are powerful because they expose the real environment. That power needs boundaries, which is why approval modes, sandboxing, and good defaults matter so much.

## Tooling For Development Work

Once you accept that agents can operate through the CLI, a wide range of development workflows become natural.

### Build, Test, & Validate

This is the most obvious category. Agents can run the exact same validation steps your team already trusts:

- unit and integration tests;
- linting and formatting;
- type checks;
- static security analysis;
- build commands.

This is invaluable because it creates a closed feedback loop. The agent edits code, runs the checks, sees what failed, and adjusts. It is no longer guessing whether the change worked.

### Repository Exploration

Agents are also effective at reading the codebase through a combination of search, file listing, and targeted reads. This is especially useful when the task requires the model to find the right file, pattern, or configuration before making changes.

### Diagnostics

Error logs, stack traces, failing tests, and CI output are all rich diagnostic artefacts. Agents are often very good at turning these into hypotheses and proposed fixes, particularly when they can also inspect the relevant files directly.

## DevOps & Operational Tasks

The phrase “AI-assisted coding” sometimes hides the fact that much of software development is operational work rather than fresh code writing. Agents can be genuinely helpful across that broader lifecycle.

Examples include:

- creating or updating branches;
- writing or amending commit messages;
- opening pull requests;
- generating PR descriptions;
- watching CI runs;
- retrieving logs from failed pipelines;
- proposing or applying fixes for broken checks;
- checking issue state or release metadata.

This is particularly useful because operational work is often repetitive, structured, and context-rich — exactly the sort of territory where agents can deliver leverage without requiring heroic creativity.

A good example is CI babysitting. Rather than repeatedly opening a failed Actions run, reading logs, fixing a lint issue, and pushing again by hand, you can have an agent do the loop: inspect, diagnose, patch, push, repeat. That is not glamorous, but it is an excellent use of delegated effort.

### A Concrete CI Babysitting Loop

Imagine a pull request fails after a dependency update. The agent reads the CI logs, traces the failure to a formatting rule and a changed import path, patches the affected files, reruns the relevant checks locally, and pushes the fix back to the branch. The human reviewer does not spend twenty minutes replaying a routine failure analysis; they spend two minutes checking that the diagnosis and patch are sensible. That is exactly the kind of operational toil agents are well suited to absorb.

## MCP: Tools, Resources, & Prompts At Runtime

The Model Context Protocol is useful because it standardises how agents access capabilities and information at runtime.

Its three core primitives are worth keeping distinct.

### Tools

Tools are model-invoked actions. They allow the agent to do something: query a service, modify a resource, execute a function, or interact with an external system.

### Resources

Resources are application-provided pieces of data or documents that the model can consult. They are context surfaces rather than actions.

### Prompts

Prompts are reusable templates or guided interactions exposed through the same protocol. They help structure recurring workflows without forcing everything into a monolithic rules file.

This matters because people often talk about MCP as if it were simply “more context”. In reality, it is an interface layer for capability. It allows agents to connect to systems cleanly and, when designed well, safely.

## Common MCP Use Cases

In practical software work, MCP servers are often used for:

- browser automation;
- API testing;
- GitHub or issue-tracker interaction;
- database inspection;
- observability and logging systems;
- knowledge-base or documentation retrieval;
- file transformation or document parsing.

The exact choice depends on your stack. The more important lesson is architectural: use MCP where runtime access or structured capability is genuinely needed, not simply because it sounds more advanced than reading a file.

It is also worth noticing that reusable tools can be exposed in three broad ways: directly inside a model SDK, through a higher-level abstraction library, or as an MCP server. The first maximises control, the second development speed, the third portability. The right choice is usually an architectural decision about coupling, not a referendum on which approach is morally pure.

### MCP Versus CLI Is Usually A Workflow Choice

Many teams already have useful capabilities in the command line. In those cases, a CLI command is often the lightest-weight starting point because the capability already exists and the operational cost is low. MCP becomes especially attractive when you want cleaner discovery, richer typing, shared reuse across tools, or a governed interface to a service rather than a shell wrapper.

There is a real context-cost trade-off here as well. General-purpose servers often expose far more tools than any one task actually needs, which means the discovery surface can become noisy and expensive. A small CLI wrapper or local script may be less elegant on paper, yet more reliable in practice because it exposes only the capability required for the job at hand.

There is also a token-efficiency angle. A purpose-built CLI command often exposes only the one capability you need right now. A general-purpose server may surface a broader catalogue of tools and metadata on every run. That can still be the right trade. It is simply worth recognising that portability and discoverability sometimes cost more context than a single well-chosen command.

In other words, this is usually not a morality play between “simple” and “advanced”. It is a choice about interface shape, portability, and how much of the workflow you want to standardise.

## Good Tool Interfaces Matter

The same design rule applies here: good tool interfaces deserve the same care as good human-computer interfaces.

A poorly designed tool forces the model to think around the interface rather than through the task. Good tools make the intended use obvious.

Descriptions matter especially here because they are the discovery surface. If the agent never reaches for a tool you expected it to use, the first question is often not “is the model broken?” but “does the description clearly say when this tool is for the job?”

That is why description work often beats interface surgery. If a tool is being ignored, clarify the trigger language before you redesign the implementation. Tell the agent when the tool is appropriate, what kind of output it should expect back, and what common problem the tool solves better than a generic shell command.

Useful design habits include:

- clear names;
- precise parameter descriptions;
- examples where ambiguity is likely;
- constraints that prevent obvious misuse;
- formats that are natural for models to produce.

A nice concrete example is file paths. If an agent can get confused by relative paths after moving around the repository, requiring absolute paths may improve behaviour dramatically. That is not a prompt trick. It is better interface design.

The same principle applies everywhere. If a tool is hard for a conscientious junior developer to use correctly from a docstring, it is probably hard for the model too.

Good tool descriptions also make failure legible. A strong interface tells the agent not only what the tool does, but when to use it, what inputs it expects, and what common failure modes mean. Error messages should guide the next step rather than merely announce defeat.

### From Inline Helpers To Shared Infrastructure

Not every capability needs to become a full server. A useful spectrum runs from the lightest local helper through to shared infrastructure.

- **Inline instructions or local scripts** are often enough when the workflow is personal, simple, and easy to explain in a sentence or two.
- **Small reusable command wrappers** make sense when a pattern repeats across sessions but still lives comfortably inside one repository.
- **Skills** become useful when the workflow is specialised, reused, and benefits from progressive disclosure rather than always-on loading.
- **MCP servers** earn their keep when the capability needs to be shared across tools, teams, or environments and deserves a governed runtime surface.

The point is not to crown one architecture as morally superior. It is to match the packaging cost to the reuse value.

### Tool Health Is Part Of The Interface

Agents cannot use a tool well if the tool is intermittently broken, poorly authenticated, or difficult to discover from the environment. A healthy toolbox therefore needs maintenance as well as design. Periodically check that the tool is visible to the agent, that authentication still works, and that a representative happy-path example still succeeds. A stale tool description or broken setup often looks like a model failure when it is really infrastructure drift.

## Custom Tools, Prompts, & Modes

Not every useful workflow needs a full external integration. Many high-value agent capabilities can be created locally through lighter packaging.

### Custom Tools

If you find yourself repeatedly running the same structured process — a report generator, a repository query, a formatting pipeline, a domain-specific validator — it may be worth exposing it as a dedicated tool. The main advantage is that the tool bakes in the right interface and eliminates repeated prompt explanation.

### Reusable Prompts Or Slash Commands

Some workflows are mostly instructional rather than operational. A structured review request, a documentation pass, an architecture critique, or a planning scaffold can often be packaged as a reusable prompt or slash command. This keeps behaviour consistent and reduces prompting overhead.

### Skills As A Lightweight Middle Ground

Skills sit usefully between a one-off prompt and a full external integration. They package reusable instructions, references, and sometimes scripts without requiring every workflow to become its own server. That makes them attractive when you want portability and progressive disclosure, but do not yet need the runtime surface area of MCP.

### Modes Or Sub-Agents

Some tools allow specialised modes or sub-agents that change the prompt, tool access, or behavioural stance for a class of work. A review mode, a testing mode, or a documentation mode can be an elegant way to package intent without rebuilding the whole environment each time.

Together, these mechanisms turn repeated individual cleverness into reusable workflow infrastructure.

## Git & GitHub As Part Of The Toolbox

Version control and collaboration surfaces deserve special mention because they are where so much engineering work ultimately lands.

Agents can be helpful with:

- staging and committing changes;
- composing commit messages in the team’s preferred style;
- opening pull requests;
- linking issues and writing summaries;
- requesting or responding to review feedback;
- gathering context from existing issues and PR history.

They can also help with more advanced Git work than people sometimes expect: tracing regressions with `git bisect`, resolving merge conflicts by comparing intent across branches, or cleaning up a history before review. These are not party tricks. They are often some of the most practical uses of tool-aware agents because Git provides hard evidence about what changed and when.

### Proof Before Review

As AI-generated output becomes faster, review works better when it starts from evidence rather than optimism. A good pull request should not only explain what changed and why. It should also carry proof: the relevant tests that passed, the manual verification steps that were run, and any logs, screenshots, or artefacts that show the change behaving as intended.

This matters even more in team settings. AI can increase output volume faster than it increases reviewer attention. If the result arrives as a large diff with no proof attached, the reviewer is being asked to validate a hypothesis rather than inspect a result.

This does not mean the agent should own the merge button by default. It means that much of the mechanical work around collaboration can be delegated, while humans retain judgement around intent, risk, and final approval.

The best use of these tools is usually not to eliminate human review, but to make human review more focused and better informed.

## Tool Choice Should Follow The Workflow

A final warning: it is easy to become seduced by the existence of tools and start wiring them in everywhere.

A good toolbox is not the largest possible toolbox. It is the smallest set of capabilities that gives the agent the environment it needs to do the job well.

Too many tools can reduce reliability. The agent spends more attention deciding what to use, misclassifies domains, or reaches for an unnecessary capability when a simpler action would do. This is one reason specialisation and tool curation matter.

The right question is not “what can I expose?” but “what capabilities actually improve this workflow?”

A short, well-described toolbox often outperforms a sprawling one. Minimalism is not aesthetic puritanism here. It is a reliability tactic.

A good curation test is simple: if the agent repeatedly reaches for the wrong tool, hesitates among near-duplicates, or never uses a capability you thought was essential, the toolbox is probably too broad or too poorly described. More tools can reduce reliability just as easily as they expand it.

It is also worth remembering that tools increasingly live inside recurring workflows, not only inside one-off sessions. A shell command, Skill, or MCP surface you create for today’s task may become part of tomorrow’s CI triage loop, documentation workflow, or review automation. Designing for clarity, observability, and safe reuse pays off disproportionately once that happens.

## Closing Thought

The agent’s toolbox is where AI-assisted development becomes concrete. Tools let the model move from describing work to carrying it out against reality: running tests, inspecting files, checking CI, opening PRs, querying systems, and validating assumptions.

That power is only as good as the interfaces around it. Clear tools, good defaults, sensible restrictions, and lightweight reusable workflows make agents more dependable. Messy interfaces, unnecessary capabilities, and poor boundaries do the opposite.

In practice, the toolbox is not about giving the model everything. It is about giving it the right things, in the right shape, so that useful action becomes easier than plausible nonsense.

---

## Deep Dives

### Core Tooling Concepts
- [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) — Especially the appendix on prompt-engineering tool interfaces.
- [Model Context Protocol introduction](https://modelcontextprotocol.io/introduction) — The cleanest high-level framing of MCP.
- [MCP architecture](https://modelcontextprotocol.io/docs/learn/architecture) — Helpful for understanding tools, resources, and prompts as distinct primitives.
- [MCP server concepts](https://modelcontextprotocol.io/docs/learn/server-concepts) — Useful once you want the finer distinctions made explicit.

### Practical Operations & GitHub Workflows
- [Using GitHub Copilot code review](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/request-a-code-review/use-code-review) — Useful for understanding one concrete review workflow.
- [About GitHub Copilot coding agent](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-coding-agent) — Good on the pull-request-centric background-agent model.
- [Automate GitHub workflows with AI agents and the GitHub CLI](https://elite-ai-assisted-coding.dev/p/gh-for-agentic-github) — A practical course-site companion to this lesson.
- [AI-Assisted DevOps: Driving Git and GitHub with Gut](https://elite-ai-assisted-coding.dev/p/ai-assisted-devops-clelia-astra-bartelli) — Useful for the operational side of the toolbox.

### Reusable Tools & Packaging
- [The 3 Architectures for Reusable LLM Tools](https://elite-ai-assisted-coding.dev/p/the-3-architectures-for-reusable-llm-tools) — Good for deciding how a capability should be exposed.
- [Custom Tools for AI Agents: Beyond MCP](https://elite-ai-assisted-coding.dev/p/custom-tools-for-ai-agents-talk) — Helpful for thinking about the boundary between MCP and other tool patterns.
- [Enable universal file access for your AI coding agent with MarkItDown-MCP](https://elite-ai-assisted-coding.dev/p/markitdown-mcp) — A concrete example of using a tool to extend an agent’s reach usefully.

# Lesson 10 — Harness Engineering for AI Coding Agents

*The prompt is the most visible part of agentic coding, but it is rarely the highest-leverage part. Once a tool such as Claude Code, Codex, or GitHub Copilot can roughly understand the task, the next gains usually come from the harness: the instruction layers, hooks, permissions, execution environment, and verification loops around the model. In this course, harness engineering does **not** mean building an agent framework from scratch. It means shaping the control surfaces of an existing AI coding harness so the agent sees the right context, has the right tools, stops at the right boundaries, and can prove that it succeeded. By the end of this lesson, you should be able to separate real harness engineering from general workflow advice and make deliberate changes that improve the next run, not just the current one.*

## A Narrower Definition

A useful working definition for this course is:

> **Harness engineering is the work of configuring the system around an existing coding agent so its intelligence becomes usable, safe, resumable, and verifiable inside a real software project.**

You will sometimes hear the broader formula **agent = model + harness**. That framing is helpful, but for this lesson we need a tighter practical boundary. We care about the parts of the harness that working developers can actually tune inside tools such as Claude Code, Codex, and GitHub Copilot.

In practice, that usually means:

- the **instruction layers** the agent reads automatically;
- the **hooks or middleware** that run around tool use or completion;
- the **permissions, approvals, and exposed tools** that define what it may do;
- the **execution environment** in which it runs locally or remotely;
- the **feedback and observation surfaces** that tell it whether it succeeded.

That boundary matters because many agent failures are not really prompt failures. They are harness failures. The agent did not know the right command, could not reach the right tool, ran in the wrong environment, stopped too early, or had no trustworthy way to verify the result. A better prompt can help. But after a point, repeated prompt edits mostly disguise a harness problem.

It is equally important to say what this lesson is **not** about. Harness engineering is not a synonym for the whole software delivery process. Clear specs, code review, Git discipline, and good team communication still matter, but they are adjacent practices. If we call all of them harness engineering, the term stops being useful.

## The Harness Surfaces You Can Actually Tune

### Instruction Layers Are The First Harness Surface

For most students, the first meaningful harness surface is the always-on context layer: files such as `CLAUDE.md`, `AGENTS.md`, `.github/copilot-instructions.md`, path-specific instruction files, or tool-native Skills and rule files.

These files should answer questions such as:

- what commands are canonical for this repository;
- which directories or subsystems matter for common work;
- which boundaries are important enough to say explicitly;
- which local gotchas repeatedly trip the agent up;
- what counts as evidence before claiming completion.

A good instruction file reads like onboarding notes for a strong engineer who is new to the repository. It should contain the non-obvious information that the codebase itself does not make plain.

That means instruction files should stay short, sharp, and current. If a line merely restates something the agent can discover instantly by reading the repository, it is probably noise rather than leverage. If a rule used to matter but no longer changes behaviour, it is harness debt. Bloated instruction files are not a sign of maturity. They are often a sign that nobody is pruning.

### Hooks Turn Repeated Advice Into Policy

If instruction files are the first harness surface, hooks are often the second. They let you move repeated human guidance out of chat and into deterministic behaviour.

In Claude Code, for example, hooks can run around events such as `PreToolUse` and `PostToolUse`. GitHub Copilot cloud agent now versions hook definitions in `.github/hooks`, including `preToolUse` and `postToolUse`. Codex leans more heavily on approval policy and sandbox modes than on the same event names, but the architectural role is still similar: the harness can intercept or constrain what happens around the model loop.

That is powerful because it turns workflow habits into enforceable structure. A hook can:

- block obviously dangerous shell patterns before they run;
- require a verification pass before the agent claims completion;
- send a notification after a long-running task finishes;
- attach extra context at the start of a run;
- take a snapshot before risky edits;
- record evidence for later review.

This is one of the clearest examples of real harness engineering. If you keep telling the agent the same thing - *run this test before you stop*, *never touch that directory without approval*, *remember to leave a summary* - that repeated instruction is a good candidate for a hook, a permission rule, or a better instruction file.

Good hooks stay narrow, deterministic, and easy to reason about. Bad hooks quietly mutate files, create confusing loops, or bury critical policy in shell glue that nobody remembers exists.

### Permissions, Approvals, And Tool Exposure Shape Risk

Another major harness surface is deciding what the agent is allowed to do automatically.

Several distinct questions matter here:

- **Authorisation** - may this agent connect to this repository or system at all?
- **Permissions** - which tools, commands, paths, or integrations may it use automatically?
- **Approvals** - which risky actions require a human gate right now?
- **Tool exposure** - which external systems are even visible to the agent in the first place?

This distinction is useful because many teams speak vaguely about "guardrails" while mixing together very different controls.

For coding agents, practical harness decisions include:

- whether bash is broadly available or tightly scoped;
- whether deploy, migration, or secret-bearing commands require approval;
- whether GitHub, browser, or MCP access is exposed by default or only for certain tasks;
- whether file edits are constrained to particular directories;
- whether the agent can continue autonomously after a failure or must hand back control.

The right default is usually **least privilege with enough capability to finish the task**. Too little access causes thrashing. Too much access creates silent risk. In practice these controls often exist at several layers - personal, project, and organisation-managed - so part of harness engineering is knowing which layer should own which rule. Harness engineering is not maximal freedom for the model. It is the deliberate choice of which capabilities belong inside the boundary for this job.

### The Execution Environment Is Part Of The Harness

Students often notice instruction files first because they are easy to edit. But the execution environment is just as important.

A coding agent can run:

- on your local machine;
- in a devcontainer;
- in a remote sandbox or cloud workspace;
- inside a GitHub Action or another CI-like environment.

Those are not merely hosting details. They are harness decisions. A well-prepared environment gives the agent the right runtimes, package managers, browsers, fixture data, repository checkout, and working directory defaults. A poor environment forces the agent to spend time rediscovering basics or fighting the machine instead of solving the task.

This is one reason remote environments matter. They do not replace harness engineering. They make it more explicit. If the agent is going to work in the background or in a shared environment, you usually want stronger isolation, more reproducible tooling, clearer secret boundaries, and better logs than a one-off local session needs. They also separate agent risk from developer-machine risk, which is one of the strongest arguments for remote execution in the first place.

The same harness logic applies in both places. Whether the agent runs on your laptop or in a remote container, you are still deciding what it can see, what it can install, what it can execute, what it can access, and what evidence it must leave behind.

### Feedback Loops And Observability Make The Harness Teachable

A harness becomes useful when it gives the agent reliable ways to discover whether it is right or wrong.

For AI-assisted software development, those loops often include:

- targeted tests;
- lint and type checks;
- browser smoke tests;
- logs and screenshots;
- CI as an independent final check;
- transcripts or traces that let you inspect recurring failures.

The key idea is simple: **make success executable**. If there is no trustworthy command or short sequence that proves the result, the harness is leaving too much to guesswork.

This does not mean every team needs a grand evaluation platform. For most students, a useful starting point is smaller:

- the agent knows the canonical verification commands;
- the environment can actually run them;
- completion requires evidence rather than optimism;
- recurring failures can be inspected and turned into harness changes.

That last step matters. Observability is not only for incident response. It is how the harness improves. A trace, a failed check, or a repeated approval interruption tells you where the surrounding system is still weak.

## Diagnose Harness Failures, Not Just Prompt Failures

Once you take the harness seriously, a different debugging habit becomes available.

When an agent struggles, ask questions such as:

- was the startup context missing, stale, or noisy;
- were the canonical commands hidden or hard to run;
- did repeated human advice belong in a hook or instruction file;
- was tool access too broad or too narrow;
- did the environment lack the runtime, browser, fixtures, or seed data the task required;
- did the agent stop before verification because the harness allowed it to;
- did the harness provide evidence, or only output.

This mindset matters because it shifts attention from rescuing one awkward run to improving the next run under the same conditions.

A useful rule of thumb is this: **when the same failure happens twice, try to move the fix from chat into the harness**. If you keep reminding the agent which command to run, expose that command more clearly. If you keep warning it away from the same risky path, encode that boundary. If it keeps claiming success before verification, tighten the completion surface.

That is how brittle workflows become dependable ones. The harness learns by turning repeated mistakes into structure.

## A Worked Example: Tightening A Coding Harness

Imagine you ask a coding agent to add CSV export to an admin orders table.

A weak harness might look like this:

- the frontend lives in `apps/admin`, but no instruction file says so;
- there are three competing test commands, none clearly canonical;
- the browser smoke test requires seed data and a local browser the environment does not have;
- the agent can run broad shell commands, but there is no approval boundary around migrations or deploy scripts;
- nothing prevents the agent from stopping as soon as the code looks plausible.

A stronger harness does **not** need a different model. It needs better surrounding structure.

- `CLAUDE.md` or `AGENTS.md` names the relevant directories, canonical commands, and risky areas;
- a hook or completion checklist refuses to finish before the targeted test and a small smoke check have run;
- tool permissions allow ordinary application commands but require approval for migrations, deploys, or secret-bearing scripts;
- a devcontainer or remote sandbox supplies the browser, dependencies, and seed data the task actually needs;
- CI remains the final independent check rather than a decorative afterthought.

Now the same model is working in a different system. It sees clearer context, acts inside better boundaries, and gets stronger proof signals before it can declare success.

That is harness engineering in the sense that matters for this course. Changing branch naming conventions or rewriting the PR template may still be useful, but those are adjacent workflow moves. The core harness move is shaping the runtime around the agent itself.

## Design Principles For Course Participants

If you are customising an existing AI coding harness, a few principles go a long way:

- **Prefer small, sharp changes over giant rulebooks.**
- **Encode repeated advice into files, hooks, permissions, or one-command scripts.**
- **Keep critical policy visible rather than hiding it in forgotten glue code.**
- **Make success executable, not merely discussable.**
- **Prune stale instructions, brittle hooks, and ignored checks.**
- **Treat recurring failures as harness bugs until proven otherwise.**

These principles are deliberately modest. The goal is not to build a full agent platform in Week 2. The goal is to recognise the surfaces that matter and tighten them with intent.

## Closing Thought

Harness engineering is the work of programming the workspace around the agent.

When developers start using tools such as Claude Code, Codex, or GitHub Copilot seriously, the biggest gains often come not from smarter prompting but from better defaults: cleaner context, tighter hooks, clearer permissions, better environments, and stronger verification.

The model supplies intelligence. The harness decides whether that intelligence becomes dependable software work.

---

## Deep Dives

### Core Harness Thinking
- [Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) - The strongest overall reference for why harness quality dominates long-running agent behaviour.
- [AGENTS.md](https://agents.md/) - A simple standard for repository-level instruction files.

### Harness Surfaces In Real Tools
- [Claude Code hooks](https://docs.claude.com/en/docs/claude-code/hooks) - Official docs on lifecycle hooks and deterministic policy around tool use.
- [Claude Code memory](https://docs.claude.com/en/docs/memory) - Official docs on `CLAUDE.md` and related memory surfaces.
- [Claude Code permission modes](https://docs.claude.com/en/docs/permission-modes) - Official docs on approval boundaries and tool permissions.
- [Claude Code GitHub Actions](https://docs.claude.com/en/docs/claude-code/github-actions) - Useful for seeing the same harness ideas in a remote execution context.
- [GitHub Copilot custom instructions](https://docs.github.com/en/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot) - Official docs on repo-wide and path-specific instruction files.
- [GitHub Copilot hooks](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-hooks) - Official docs on `preToolUse`, `postToolUse`, and related hook events.
- [GitHub Copilot custom agents](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-custom-agents) - Useful if you want specialised agent profiles with different prompts and tools.
- [GitHub Copilot MCP extension](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/extend-coding-agent-with-mcp) - Good on exposing external tools deliberately rather than by accident.
- [Codex overview](https://developers.openai.com/codex/overview) - Official OpenAI entry point for the current Codex workflow.
- [Codex agent approvals and security](https://developers.openai.com/codex/agent-approvals-security) - Useful for understanding sandboxing, approval policy, and remote execution boundaries.

# Homework — Spec, Delegate, Verify, Refine

*This homework turns Part II into a real delivery workflow. You are no longer just asking the agent for help with a feature. You are learning to express work as durable artefacts, hand it off in a controlled way, and improve the surrounding setup until the feature becomes reliably completable agentically.*

## Topic

**Deliver one meaningful feature through specification-driven agentic development.**

## Main Goal

Extend the same app from Part I with **one bounded feature** and use it to practise real **spec-driven development**. The goal is to learn how to turn a feature into a durable brief, a workable plan, a reviewable implementation pass, and a verification loop that the agent can actually follow. The feature should be small enough to merge in one sitting, but large enough that it needs a real spec and touches more than one file.

Good examples include due dates and overdue filtering in a todo app, tags and tag filtering in a bookmarks app, status tracking in a reading list, favourites in a recipe box, or a streak display in a habit tracker. Avoid redesigns, vague clean-up work, or anything so broad that the agent has to guess where the edges are.

## Core Exercise

Choose one feature and create a **small set of durable artefacts** that define and control the work. The exact structure is up to you. You might keep everything under `specs/<feature>/`, put it in `docs/`, or use a simpler layout that fits your project. Suggested files such as `spec.md`, `plan.md`, `tasks.md`, and `review.md` are useful because they keep intent, execution, decomposition, and reflection separate, but they are suggestions rather than a mandatory template.

What matters is that your workflow includes the following:

- a written **specification** covering the **intent**, **acceptance criteria**, **constraints**, **non-goals**, **relevant context**, **verification**, and clear **always / ask first / never** boundaries;
- a **plan** for how the work will be approached, including likely files or components, execution order, checkpoints, and likely risks or ambiguities;
- a **task breakdown** into a few reviewable chunks;
- a short **review or retrospective note** recording whether the first pass was mergeable or close to it, what changed after the first run, what was underspecified, and which checks actually proved completion.

These can live in separate files, in one folder, or as clearly separated sections in fewer files. The important thing is that the work is durable, reviewable, and usable as a handoff.

Then hand the work to the agent using those artefacts as the brief. A sensible pattern is to ask the agent to review the spec and plan first, surface missing risks, refine the spec once if needed, implement against the written brief, pause at checkpoints, and then review and verify the result properly. For the core assignment, your evidence should include one diff review, one pass against the acceptance criteria, one test or smoke-check result, and one short note on what had to change before the task became reliably completable by the agent.

The pedagogical point is precise: if the first run is weak, do not quietly finish the hard parts by hand and congratulate yourself. Improve the artefacts or the harness until the feature can actually be delivered through the engineered workflow.

## Stretch Goal

Turn the single feature into a **small spec-driven MVP backlog**. Define an MVP scope for the app, break it into **3-5 mergeable slices**, and give each slice its own written brief, plan, task breakdown, and review trail. You may choose to keep these in separate files, per-feature folders, or another structure that makes the slices easy to execute and review independently. It is also useful to keep one higher-level MVP note describing the overall goal, slice order, dependencies, and what counts as “done enough”.

The goal of this stretch is decomposition. Instead of one large ambiguous brief, you should end up with a sequence of smaller features that can be implemented, reviewed, verified, and merged independently.

## Advanced Stretch

For the advanced version, push the workflow rather than merely increasing feature count. You might add a dedicated verifier or reviewer flow, move repeated failures into the harness by improving `AGENTS.md` or a canonical smoke test, compare tighter steering with broader delegation on similar slices, or measure first-pass yield across several specs. Another strong direction is to make the work more production-shaped with checkpoint commits, draft PRs, and CI evidence around the slices.

Choose one or two directions and treat them as engineering experiments. The interesting question is not whether the agent can produce more output. It is whether you can shape the surrounding system so the output becomes clearer, easier to review, and closer to mergeable on the first serious pass.

# Part III — Agents At Scale

# Lesson 11 — Background Async Agents & Autonomous Execution

*Interactive agentic work is useful, but it still ties your time to the agent’s execution loop. Background async agents change that equation. They let you delegate a complete task, allow it to run remotely or unattended, and come back to a reviewable artefact such as a pull request. This lesson looks at how that works, when it is worth doing, and what a task needs before it can safely be handed off without live supervision.*

## Why Background Agents Matter

The core promise of a background agent is simple: you specify the work, the agent runs elsewhere, and the result comes back in a form that fits your existing engineering workflow.

This matters because it changes the economics of delegation.

With interactive tools, you often remain in the loop minute by minute. You watch the agent, answer questions, nudge it back on course, and verify progress live. That can be productive, but it still binds your attention to the session.

Background agents break that coupling. They enable:

- **true parallelism** — several tasks can proceed while you do something else;
- **review-first outputs** — work typically returns as a PR, patch, or other inspectable artefact;
- **repeatable execution** — the same specification can be rerun under the same environment;
- **organisational leverage** — work can be initiated by issues, schedules, or team workflows rather than only by a person sitting in an IDE.

The result is not merely convenience. It is a shift from synchronous assistance to delegated execution.

## The Main Forms Of Background Execution

In practice, background agents usually appear in two broad forms.

### Hosted Remote Agents

These run inside a vendor-managed environment. You assign work through a web interface, issue tracker, or repository integration, and the provider handles execution. The result normally returns as a pull request or equivalent artefact.

The main advantages are low friction and a polished user experience. The trade-off is that you work within the boundaries of the provider’s environment, supported models, and integration model.

### CLI Agents In CI Or Automation

The other path is to run a CLI-capable agent inside a GitHub Action or similar automation environment. This gives you far more control over the environment, toolchain, and triggering conditions. It also makes the agent feel more like part of your infrastructure than part of somebody else’s product.

The trade-off here is mostly setup burden. The experience is usually less elegant than a hosted UI, but more flexible and more under your control. You also inherit the responsibility of keeping that environment reproducible over time: dependencies, system packages, and credentials do not stay tidy by themselves.

From a workflow perspective, both modes solve the same class of problem: unattended execution that produces reviewable work.

The practical trade-off is straightforward. Hosted agents usually win on convenience and polish; CLI-in-CI tends to win on controllability, model choice, and environment ownership. Neither is universally superior. The right choice depends on whether the larger constraint is adoption friction or infrastructure control.

## Fire-And-Forget Requires Better Briefs

The most important thing to understand about background agents is that they are not merely interactive agents moved elsewhere. The lack of live intervention changes what a task needs in order to succeed.

When you cannot continuously correct the agent mid-flight, the specification has to do more work up front. It must define:

- the goal;
- the constraints;
- the boundaries of scope;
- the expected artefacts;
- the relevant validation steps;
- what counts as done.

This is why background work rewards specification-driven habits so strongly. A vague task that might have been rescued interactively often fails expensively when executed asynchronously. The answer is not to specify every last keystroke. It is to become better at **calibrated specificity**: enough detail to make the task executable without turning the brief into a brittle script.

A good fire-and-forget brief is precise about the mission and clear about the boundaries, while leaving room for the agent to figure out the local implementation details.

A useful readiness test is whether you can answer three questions cleanly before handoff: what exactly should change, how success will be verified, and what should happen if the first attempt stalls or fails. If those answers are still muddy, the task is probably not ready for unattended execution.

This is also where the work starts to resemble management. A background brief is not merely a prompt. It is a handoff. The skills involved — clarifying scope, naming constraints, defining success, and deciding when to escalate — are the same ones that make human delegation effective.

### A Good Async Brief Looks Different From A Bad One

A weak async brief might say, “clean up the onboarding flow and make it faster”. That sounds efficient, but it leaves the agent to guess whether “faster” means bundle size, first paint, completion time, network chatter, or fewer support tickets. A stronger background brief sounds more like a handoff: reduce onboarding bundle size by 20%; preserve the current step order and copy; limit changes to `src/onboarding/`; verify with the existing Web Vitals script plus the onboarding test suite; return a draft PR; and pause for approval before adding dependencies or changing analytics events.

The difference is not verbosity for its own sake. The second brief tells the agent what success looks like, where the edges are, and what proof to return. That is often the difference between a productive overnight run and an expensive morning surprise.

One practical habit is to do a short refinement pass before promoting a task into full background mode. Ask the agent to restate the task, surface ambiguities, and sketch a validation plan. If that dry run reveals missing context, promote the artefact, not the confusion. Async work is cheaper when the first failure happens in the brief rather than halfway through a remote run.

## The Result Should Always Be Reviewable

A healthy mental model is that the output of background execution is not “completion”. It is a **reviewable artefact**.

That usually means:

- a pull request;
- a draft change set;
- a generated report;
- a comment on an issue;
- a branch with explicit outputs and logs.

This matters because review is what transforms asynchronous autonomy into safe engineering practice. The agent can operate at a distance, but the human team still owns judgement about whether the result should land.

This reviewability also makes background agents easier to integrate into existing processes. They do not need an entirely new governance model. They can fit into the familiar sequence of PR, review, CI, and merge.

## Harnesses At Scale

The same harness principles from Part 2 still apply, but background execution makes them more visible and less forgiving.

A strong async harness typically includes:

- a defined runtime environment;
- clear instructions and repository context;
- durable specifications and plans;
- reliable build, test, and lint commands;
- logging and artefact capture;
- explicit permission boundaries;
- a clean output path back into human review.

This is also where durable progress artefacts become especially important. Progress should live in files, Git history, or workflow logs rather than in a transient conversational state. If the agent needs multiple passes or future continuation, those artefacts are what preserve continuity.

It is also why documentation stops being optional background material and becomes a gating factor. Async agents do better when the repository contains legible specs, commands, and progress notes they can read without conversational rescue. When a run fails, the most useful question is often not “which model was wrong?” but “what did the brief or harness fail to make explicit?”

For repository-centred work, boring command-line surfaces matter a great deal here. `git`, the GitHub CLI, issue trackers, and workflow logs give the agent durable verbs: inspect the issue, create a branch, capture artefacts, update status, open a PR. They are less glamorous than a live chat window, but often better substrates for unattended execution because they turn state into artefacts that both humans and other systems can inspect.

If several background tasks are running at once, the same principle extends to merge strategy. Clear ownership, bounded scopes, and an explicit merge order matter just as much in async work as they do in human parallel work.

The same pattern matters here: agents perform better when they start from durable state, choose one meaningful increment at a time, and leave the environment clean for the next session rather than attempting to one-shot an entire project.

Background execution also needs observability. If the work runs elsewhere and returns only at the end, you lose the chance to notice that it has been wandering, looping, or repeatedly failing the same check. Good async harnesses therefore surface logs, workflow state, intermediate artefacts, and enough progress information that a human can inspect what happened before deciding whether to rerun, revise, or merge.

Useful measures include completion rate without manual rescue, rerun rate, median review effort for returned artefacts, and the share of tasks that get demoted back to interactive mode because the brief was not yet stable enough. Those signals tell you whether background execution is becoming more dependable or merely more theatrical.

Of these, first-pass yield is especially revealing. If background runs return close to mergeable on the first attempt, the specification and harness are probably doing their job. If they routinely need a second planning round, the most useful fix is often not a more heroic model. It is a sharper brief, clearer boundaries, or stronger validation.

## Guardrails For Unattended Execution

Because background agents operate without constant live supervision, guardrails need to be designed into the environment.

Useful guardrails include:

- **max iteration limits** so a bad run does not spin indefinitely;
- **test suites and validation steps** that enforce objective checks;
- **sandboxing** so file-system and system access remain bounded;
- **network restrictions** where appropriate;
- **cost caps or usage limits** to prevent runaway expense;
- **approval requirements** for sensitive actions;
- **least-privilege credentials** scoped to the task.

These are not signs that the model cannot be trusted in principle. They are signs that the system is being engineered responsibly. Background execution multiplies leverage, which means it also multiplies the importance of sensible boundaries.

These guardrails work best when they support self-correction rather than only prevention. Max-iteration limits stop a bad loop from running forever. Deterministic tests tell the agent whether the last step helped. Cost caps bound the blast radius of mistakes. Together they let the system try, inspect, and recover within limits instead of thrashing indefinitely.

Cost caps deserve more than a passing mention. Long-running failures can quietly turn into expensive failures, especially when several jobs are active at once. A budget per run or per workflow is a practical guardrail, not an accounting flourish.

### Risk Tiers Keep The Controls Proportionate

A small internal documentation fix does not need the same control surface as a production migration. It helps to think in tiers. Low-risk tasks can usually run with light guardrails and ordinary review. Medium-risk work deserves stronger tests, clearer approval points, and tighter credential scopes. High-risk work should usually add staged execution, richer logs, and explicit human sign-off before anything consequential lands.

That framing matters because unattended execution scales badly when every task gets treated as equally dangerous or equally harmless. Good systems make the controls match the consequences.

A low-risk documentation refresh might run with read-only repository access, a narrow write path for a draft PR, a small iteration cap, and ordinary review. A production-affecting migration deserves something very different: staged approval, tighter credentials, stronger logging, a rollback expectation, and much more explicit proof. Guardrails become useful when they reflect the task, not when they aspire to sound strict in the abstract.

## A Spectrum Of Background Autonomy

Not all async work has to be fully unsupervised in the strongest possible sense. It is useful to think in terms of a spectrum.

- **Supervised fire-and-forget** — you hand off a bounded task and inspect the result promptly.
- **Workflow-triggered automation** — the agent runs in response to repository events or schedules.
- **Longer-horizon unattended work** — the agent iterates across a larger task with stronger harness support and more explicit limits.
- **Continuous recurring work** — the agent runs repeatedly against a standing class of problems, such as documentation drift or dependency maintenance, and returns reviewable artefacts over time.

The further right you move on that spectrum, the more the surrounding system matters. At the supervised end, a well-written spec and a PR loop may be enough. At the more autonomous end, you need a more explicit harness, stronger logs, better isolation, and clearer escalation paths.

The lesson is not that “fully autonomous” is the inevitable destination. It is that different levels of unattended execution are appropriate for different classes of work.

A practical rule is simple: move right on the spectrum when the task is easy to validate, cheap to roll back, and supported by a harness you already trust. Stay further left when the work depends on tacit product judgement, unfolding discovery, or delicate coordination with humans and systems that the agent cannot safely infer on its own.

## When Async Is The Wrong Mode

Background execution is powerful, but it is not the universal default. It is usually the wrong mode when:

- the task is still being discovered rather than executed;
- success depends on frequent human taste judgments or negotiation;
- the codebase area is poorly documented and you do not yet understand the terrain yourself;
- rollback is expensive or ambiguous;
- or the task’s main challenge is deciding what should happen, not carrying it out.

In those cases, interactive work is not a lesser form. It is simply the more honest interface for the problem you actually have.

## What Background Agents Are Good For

Background agents tend to shine on tasks that are:

- clearly bounded;
- easy to validate;
- useful but time-consuming to do manually;
- repeatable across repositories or teams;
- suited to returning a concrete artefact.

Examples include:

- documentation updates;
- dependency maintenance;
- issue-driven bug fixes;
- straightforward refactors;
- code review and CI follow-up;
- issue triage or summarisation.

They are less suited to highly ambiguous strategic work, deeply novel architectural decisions, or tasks where the specification is still being discovered. Those usually benefit from a more interactive mode first.

## Background Agents Reward Organisational Clarity

One reason background execution matters in teams is that it surfaces the state of organisational discipline. Teams with strong conventions, legible repositories, reliable CI, and clear review practices tend to get more out of async delegation. Teams with hidden rules, stale docs, and inconsistent validation tend to struggle.

That may sound slightly harsh, but it is useful. Background agents expose where the engineering system depends too much on tacit human knowledge. They do not create that weakness. They reveal it.

In that sense, adopting async agents can improve more than throughput. It can push a team toward clearer specifications, better documentation, more reliable validation, and more explicit operating boundaries.

## Closing Thought

Background async agents matter because they take agentic work out of the live session and into the broader engineering system. They let you delegate work in parallel, connect execution to repository workflows, and receive results in artefacts that your team already knows how to review.

But they only work well when the surrounding discipline is strong enough to support them. Fire-and-forget does not mean thought-and-forget. It means thinking earlier, specifying better, and building a harness that can carry the task without constant rescue.

When those pieces are in place, background execution becomes one of the clearest examples of what AI can do best in software development: not merely accelerate what you are already doing, but carry well-defined work forward while your attention is somewhere else.

Once that pattern is dependable for one-off delegation, the natural next step is to wire it into recurring repository workflows. That is the bridge from background agents to Continuous AI.

---

## Deep Dives

### Core References
- [About GitHub Copilot coding agent](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-coding-agent) — A strong reference for the PR-centric background-agent model.
- [Working with asynchronous coding agents](https://elite-ai-assisted-coding.dev/p/working-with-asynchronous-coding-agents) — A direct course-site companion to this lesson.
- [Asynchronous CLI Agents in GitHub Actions](https://elite-ai-assisted-coding.dev/p/asynchronous-cli-agents-in-github-actions) — Useful if you want the infrastructure-controlled path.

### Harness & Specifications
- [Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) — Especially relevant once async work spans more than one clean run.
- [Spec-driven development using Markdown as a programming language when building with AI](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-using-markdown-as-a-programming-language-when-building-with-ai/) — Helpful because good async work begins with strong durable artefacts.
- [Refine your initial prompt instead of course-correcting](https://elite-ai-assisted-coding.dev/p/refine-your-initial-prompt-instead-of-course-correcting) — The fire-and-forget version of the same lesson.

### Ecosystem Examples
- [Claude Code GitHub Actions](https://docs.claude.com/en/docs/claude-code/github-actions) — A concrete example of CLI agents in automation.
- [Gemini CLI GitHub Action](https://github.com/marketplace/actions/run-gemini-cli) — Another example of the pattern in practice.
- [Codex Cloud](https://developers.openai.com/codex/cloud/) — Useful for the hosted-agent side of the landscape.

# Lesson 12 — Continuous AI & Agentic Workflows

*Background agents become much more powerful once they stop being one-off delegations and start participating in the ongoing life of a repository. This lesson introduces Continuous AI: the use of automated AI workflows to support software collaboration on a recurring or event-driven basis. It also looks at agentic workflows as a particularly clear way of expressing those automations. By the end, you should have a practical model for deciding which recurring tasks deserve AI automation and how to structure those workflows so they remain auditable and reviewable.*

## From Delegated Tasks To Continuous Work

A single background task is useful. A repeatable system that applies AI whenever the repository needs it is more interesting.

That is the basic move from async delegation to **Continuous AI**. Rather than thinking of agents only as helpers you manually invoke, you begin to treat AI as part of the automation layer of software collaboration. It becomes one more kind of recurring workflow, alongside CI and deployment automation.

Continuous AI is automated AI support for software collaboration. The emphasis is not merely on individual productivity, but on the collaborative tasks that keep projects healthy over time.

This is why it helps to treat Continuous AI as an engineering paradigm rather than a clever collection of bots. In the same way that CI and CD moved testing and deployment into the fabric of software delivery, Continuous AI moves certain kinds of judgement, summarisation, and repository housekeeping into the automation layer.

That framing is important because the highest-leverage uses are often not glamorous feature implementation. They are the repetitive, collaborative, mildly annoying tasks that help repositories stay clear, current, and trustworthy.

## What Continuous AI Actually Looks Like

Continuous AI is easiest to understand through examples.

Typical cases include:

- continuously updating or improving documentation;
- triaging and labelling issues;
- summarising recent project activity;
- reviewing code for specific risks or standards;
- suggesting new tests from coverage reports;
- maintaining dependency hygiene;
- analysing failed CI runs and proposing likely fixes;
- checking accessibility or quality drift in recurring ways.

These tasks share a few useful properties:

- they are repetitive;
- they fit naturally into repository workflows;
- they benefit from judgement rather than only static heuristics;
- they are auditable when expressed through issues, comments, PRs, or logs;
- they can often be triggered by events or schedules.

They also need measurement. A recurring workflow that no one uses, trusts, or even notices is not a capability. It is background noise with a token bill. Before enabling one, decide what success looks like, how often humans should accept or act on the output, and what signal would tell you to tighten or retire it.

This is why Continuous AI feels like the agentic cousin of CI/CD. The work is ongoing, event-driven, and infrastructure-backed — but the tasks often require some interpretation rather than purely deterministic execution.

A few early workflows recur because they combine clear triggers with easy review:

- **Documentation drift** — run after merged changes, compare the code and docs, and open a PR with proposed updates.
- **CI failure triage** — trigger on failed pipelines, summarise the most likely root cause, and suggest the next debugging step or draft patch.
- **Dependency hygiene** — run on a schedule, group low-risk updates, and return a reviewable PR with changelog notes and test results.

Many of the strongest workflows are multi-phase rather than single-shot. One run classifies or summarises, another performs the bounded change, and a later one refreshes documentation or follow-up artefacts. Splitting the work that way matters because each phase can have different permissions, a different model, and a different approval rule.

## Agentic Workflows As A Practical Form

One especially interesting expression of Continuous AI is the **agentic workflow**: a repository automation defined in natural language or lightweight structured Markdown, executed by a coding agent inside a controlled workflow environment.

An agentic workflow is compelling precisely because it makes the design philosophy explicit. Instead of hiding automation logic inside opaque scripts or vendor-specific magic, it lets teams describe repository-level behaviour in a clear, reviewable format that still compiles down to familiar workflow machinery.

That approach has several virtues:

- **clarity** — the workflow is legible to humans;
- **versionability** — it lives in the repository alongside other engineering artefacts;
- **auditability** — execution still runs through normal workflow logs and permissions;
- **portability** — the high-level intent is not too tightly coupled to one coding agent.

A useful default is to make these workflows read-only or report-first before you let them become effectful. Let the automation classify, summarise, comment, or open a draft artefact first. Only once the pattern is genuinely useful should it graduate to broader write permissions.

The deeper lesson is broader than any one project. Continuous AI works best when the automation itself is visible, reviewable, and treated as a real artefact of the repository.

## Triggers Matter

Continuous AI becomes practical when you connect it to meaningful triggers. Common triggers include:

- pushes to key branches;
- pull request creation or updates;
- issue creation, comments, or labels;
- scheduled runs;
- release events;
- failed CI runs.

Choosing the trigger well is part of the workflow design. Too few triggers and the automation is inert. Too many and you create noise, waste, or automated churn no one asked for.

This is why trigger design is partly a product question. Ask not only “can this be automated?” but “when should automation meaningfully occur?” A docs-refresh agent that runs on every trivial push may be worse than one that runs on merged changes or on a nightly cadence. Good triggering respects both repository rhythms and human attention.

In practice, every workflow needs a trigger budget. If it fires constantly and produces little that humans keep, it is creating noise rather than value. A good Continuous AI workflow earns its right to run by producing outputs that are used often enough to justify the interruption and cost.

A few concrete trigger pairings make this less abstract:

- **Pull request opened or updated** — run a review agent that checks for risky migrations, missing tests, or policy issues, then post the findings as a comment.
- **Nightly schedule** — refresh documentation indexes, dependency reports, or backlog summaries after a day of merged changes.
- **Failed CI run on `main`** — gather logs, summarise the likely root cause, and open a diagnostic issue or draft fix.
- **Issue labelled `needs-triage`** — classify the report, request missing reproduction details, and apply initial labels.

## Two Common Orchestration Patterns

In practice, Continuous AI tends to be built using one of two broad orchestration patterns.

### CLI-In-CI

A CLI-capable agent runs inside a CI system such as GitHub Actions. The workflow gathers context, passes the task, captures logs, and publishes the result.

This pattern gives you strong control over:

- the runtime environment;
- the exact tools installed;
- the permission model;
- the trigger logic;
- the logging and artefact flow.

It feels infrastructural and is often attractive to teams that want maximum control or want to mix and match models and tooling.

### Hosted Agent Triggers

A hosted remote agent is invoked through repository events, comments, issues, or API calls. The environment is more provider-managed, but the workflow is often easier to adopt.

This pattern is attractive when:

- the hosted product integrates cleanly with the repository platform;
- setup speed matters;
- the use case is well aligned with the provider’s interaction model;
- deep runtime customisation is not required.

Both approaches can work well. The real decision is not ideological. It is about control, convenience, and the specific needs of the workflow.

In practice, CLI-in-CI is usually stronger when you need a reproducible environment, bespoke tools, explicit state hand-offs, or tight control over credentials and logging. Hosted triggers are attractive when the work is mostly repository-native and the provider’s default review loop already fits the job. The sensible choice is the one whose control surface matches the task, not the one with the most doctrinal supporters.

### Workflow Chaining

As teams mature, another pattern appears: one workflow produces the artefact that makes the next workflow possible. A triage workflow might classify an issue and attach the right labels. A follow-on implementation workflow might only activate once those labels exist. A documentation workflow might then open a draft PR after the implementation lands. This chaining can be powerful because it breaks a large recurring problem into smaller, reviewable stages.

The trick is to keep the hand-offs explicit. The first workflow should produce a stable surface — an issue, comment, label set, draft PR, or report — that the next workflow can consume without guessing. Otherwise “workflow chaining” becomes a polite name for automation that keeps stepping on its own shoelaces.

This is really a state-management problem in polite clothing. Labels, status comments, structured reports, draft PRs, and durable artefacts are what make chained workflows resumable instead of mystical. A small, explicit state machine is usually more reliable than a bag of loosely related prompts.

Useful state surfaces include:

- **Labels** — to signal class, priority, or readiness for the next workflow.
- **Issue or discussion comments** — to preserve summaries, requested information, or escalation notes.
- **Draft PRs** — to hold implementation output in a reviewable form before merge.
- **Status files or reports** — to record machine-readable progress for later stages.
- **Linked artefacts** — issue references, changelog notes, or docs tasks that let later workflows continue without rediscovering the earlier intent.

## Safe Outputs Over Silent Mutation

One of the best ideas in the Continuous AI and agentic-workflow space is the preference for **safe outputs**.

Rather than allowing silent mutation of the repository, a good workflow tends to produce something humans can inspect:

- a pull request;
- a comment;
- an issue;
- a structured report;
- an explicitly logged suggestion.

This is important for two reasons.

First, it preserves reviewability. Second, it reduces the risk of automation quietly doing the wrong thing at scale. The workflow remains useful because it proposes or prepares work, not because it bypasses human governance altogether.

This is best treated as baseline design, not as a refinement to add later.

This is one place where the design of Continuous AI is stronger when it learns from CI history. Mature automation is observable and auditable. AI automation should be too.

In practice, many teams stage permissions in roughly this order: **read and report**, then **comment or label**, then **open draft artefacts such as PRs or issues**, and only in rare cases **perform narrow direct writes**. That progression keeps the workflow useful while making trust something the system earns rather than something it assumes.

A related requirement is idempotency. A recurring workflow should be able to run twice without creating chaos. If a docs agent fires again, it should update the existing draft PR or produce a clean new proposal rather than duplicating work blindly. If a triage agent retries after failure, it should be obvious what state it is resuming from.

That usually requires deliberate design: check before creating, reuse or supersede existing outputs, and store enough state that retries behave predictably. Idempotency is not an accidental luxury. It is part of what makes recurring automation tolerable.

### Observability For Recurring Workflows

Recurring automation should not be judged only by whether it ran. It should be judged by whether it produced something humans kept. Useful signals include run frequency, no-op rate, acceptance rate, reviewer effort, median time to act on the output, cost per useful run, and the share of executions that repeatedly fail at the same phase. If a workflow runs fifty times a day and most of its outputs are ignored, the trigger budget or the specification almost certainly needs tightening.

This is also where silent failure hides. A workflow may complete successfully from the platform’s point of view while still producing generic, repetitive, or unactionable results. Logs tell you that it ran. Acceptance and reuse tell you whether it helped.

## A Reusable Pattern For Designing Continuous AI

A helpful reusable pattern is:

1. **Trigger** — what event or schedule starts the workflow?
2. **Environment** — where does it run, with which tools and permissions?
3. **Context** — what repository knowledge, rules, or references does it need?
4. **Specification** — what exactly should this workflow do?
5. **Execution** — which agent carries out the task and how?
6. **Output** — how does the result return to the team in a reviewable form?

This pattern is valuable because it forces you to think end to end. A good Continuous AI workflow is not just a clever prompt bolted onto a trigger. It is a designed system with explicit boundaries and a clear return path into human collaboration.

The workflow itself also needs measurement. Useful signals include how often outputs are accepted, how often a run creates noise, how long humans spend reviewing it, and whether trigger frequency matches the value it creates. Continuous AI that is never evaluated tends to become continuous background chatter.

Cost belongs in the same conversation. Some recurring tasks justify a premium model because the reasoning load is high. Others are better served by cheaper models or narrower prompts because the workflow is mostly classification, summarisation, or templated review. A healthy system measures usefulness per run, not merely total activity.

### Worked Example: Issue Triage Workflow

Suppose you want a recurring issue-triage assistant.

- **Trigger** — a new issue is opened or an existing issue receives the `needs-triage` label.
- **Environment** — a hosted agent runs with permission to read the repository and write comments and labels, but not to push code.
- **Context** — the agent reads the issue template, `CONTRIBUTING.md`, label definitions, and a shortlist of similar recent issues.
- **Specification** — it must classify the issue, request missing information if the report is incomplete, and never close the issue automatically.
- **Execution** — the agent summarises the report, checks for duplicates, and chooses the most likely labels.
- **Output** — a comment with the summary and next action, plus suggested labels that the team can inspect immediately.

That is a useful Continuous AI workflow because it runs where the collaboration already happens and returns a reviewable artefact rather than mutating the repository silently.

The same workflow can also become the first link in a chain. Once an issue is labelled clearly, a follow-on workflow can pick up only issues marked `bug` or `good-first-agent-task`, prepare a bounded implementation PR, and let a later docs workflow update release notes after the merge. The labels and draft artefacts are what make that chain legible.

## Where Continuous AI Creates The Most Value

The strongest use cases tend to be the ones that satisfy three conditions.

### They Are Repetitive

If the task recurs and is mildly annoying, automation can compound value over time.

### They Benefit From Judgement

If the task is too fuzzy for a static rule but structured enough for an agent to reason about, AI may be a strong fit.

### They Fit Existing Collaboration Patterns

If the output can naturally appear as a PR, issue, or report, the workflow becomes easy to adopt without asking the team to learn a strange parallel universe.

This is why Continuous AI often shines on “unglamorous” work: issue triage, documentation drift, coverage improvement, or recurring quality checks. These are all things teams want, but often underinvest in because the manual overhead feels perpetually too high.

It is often worth doing a rough cost check before you switch one on. If an issue-triage workflow costs a few pence or cents per run and removes hours of repetitive sorting each month, the trade is probably excellent. If a premium-model workflow fires constantly and produces outputs people rarely keep, the value case may be worse than the demo implied. Cost only becomes meaningful when it is discussed alongside usefulness.

## Continuous AI Requires Governance

Because these workflows run repeatedly, governance becomes essential.

Important questions include:

- what permissions does the workflow have;
- what external communication is allowed;
- what kinds of changes can it propose;
- who reviews outputs;
- how is spend or usage controlled;
- what logs exist if the workflow misbehaves.

A practical way to scale this is to think in risk tiers. Low-risk workflows can suggest or prepare work with light oversight. Medium-risk workflows can open artefacts such as draft PRs but should still require human review. High-risk workflows — security-sensitive code, production-affecting changes, financial systems — need explicit approval gates, richer logs, and a lower tolerance for false positives.

The workflow definition should make those tiers visible. It should be obvious which phases are allowed to read data, which may write comments or labels, which may open PRs, and which can never perform direct side effects. Governance is much easier when the boundaries are inspectable before the workflow runs.

This is also why explicit policy surfaces matter. The more legible the workflow definition, the easier it is for a team to review and refine its behaviour. Opaque automation is not a recipe for trust.

There is also a quiet operational question here: who turns the workflow off when it becomes noisy? Good governance includes not only permission to run, but a clear path to pause, tighten, or retire a workflow whose outputs have stopped earning attention.

In that sense, Continuous AI is not just about clever automation. It is about building automation that your team can live with.

## Closing Thought

Continuous AI is the point where AI-assisted software development stops being only a personal productivity technique and starts becoming part of the collaboration fabric of a project.

Used well, it does not replace CI/CD or ordinary repository practices. It enriches them. It brings model-driven judgement to recurring tasks that static automation alone cannot handle cleanly, while still returning outputs through ordinary reviewable surfaces.

That is the key. Continuous AI should feel like a natural extension of healthy repository automation: triggered intentionally, bounded by environment and permissions, and always legible enough that humans remain able to understand, review, and improve what it is doing.

---

## Deep Dives

### Core Concepts
- [Continuous AI](https://githubnext.com/projects/continuous-ai/) — The clearest statement of the concept from GitHub Next.
- [Agentic Workflows](https://githubnext.com/projects/agentic-workflows/) — A concrete exploration of AI-native repository workflows.
- [How can we use a “Continuous AI” pattern to integrate AI into CI/CD?](https://elite-ai-assisted-coding.dev/p/how-can-we-use-continuous-ai) — A practical course-site companion to the lesson.

### Workflow Design & Examples
- [Awesome Continuous AI](https://github.com/githubnext/awesome-continuous-ai) — A useful starting point for examples and patterns.
- [Adventures in Continuous AI](https://elite-ai-assisted-coding.dev/p/adventures-in-continuous-ai) — Helpful for understanding what these workflows look like in practice.
- [Automate GitHub workflows with AI agents and the GitHub CLI](https://elite-ai-assisted-coding.dev/p/gh-for-agentic-github) — Relevant when the pattern uses CLI agents in automation.

### Broader Automation Context
- [Claude Code GitHub Actions](https://docs.claude.com/en/docs/claude-code/github-actions) — A practical example of CLI-in-CI orchestration.
- [About GitHub Copilot coding agent](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-coding-agent) — Useful if your mental model of Continuous AI includes hosted pull-request-based agents.
- [A Straightforward Answer to “What Tool Should I Use?”](https://elite-ai-assisted-coding.dev/p/a-straightforward-answer-to-what-tool-should-i-use) — Helpful for choosing which execution substrate makes sense for your workflow.

# Lesson 13 — Parallelisation & Scaling

*Once agentic workflows are reliable, the next question is usually not “can this be delegated?” but “how many things can we delegate at once, and under what coordination model?” This lesson looks at parallelisation across local and remote environments, from git worktrees and multi-agent IDE workflows to cloud-hosted agents in isolated containers. By the end, you should understand how to split work safely, where the scaling benefits really come from, and why parallelism is ultimately about team capacity rather than personal spectacle.*

## Why Parallelisation Matters

Parallelisation matters because software work is often bottlenecked not by raw difficulty, but by waiting.

A developer can only actively drive one thread of work at a time. That means useful tasks pile up:

- a feature branch waits for a test pass;
- a PR waits for review feedback;
- documentation waits for someone to update it;
- a backlog of minor issues waits because no one has enough contiguous attention to pick them up.

Agents change this by making it possible to run multiple bounded pieces of work simultaneously. That does not eliminate the need for planning, review, or ownership, but it does mean more useful work can proceed in parallel than one human attention stream could normally sustain.

The important thing to remember is that the benefit is not merely personal speed. The deeper benefit is increased **capacity**: more tasks can be started, advanced, or validated at the same time without collapsing into chaos.

## Parallelism Requires Clean Decomposition

Before discussing tools, we need the more important principle: parallelism only works when the work can be decomposed cleanly.

A task is a good candidate for parallel execution when:

- it has a clear interface or boundary;
- it does not require constant shared mutable state;
- its output can be reviewed or merged independently;
- coordination overhead is low relative to the value of splitting it.

This is why specifications and planning continue to matter at scale. If the work has not been partitioned clearly, parallel agents simply create parallel confusion.

Good decomposition often looks like:

- separate repository components with clear APIs;
- independent issue-driven tasks;
- research or analysis facets that can be synthesised later;
- verification steps that can be run independently of implementation.

In practice, the cleanest parallel work often begins with a written contract before anyone starts implementing. If a unit of work cannot state its boundary, dependencies, expected artefact, and merge assumptions clearly, it is usually not ready to be parallelised. Parallelism gets much easier when the specification does the coordination work in advance.

In practice, responsibility layers are often a good starting point: backend service changes, frontend adaptations, tests, and documentation updates can frequently move in parallel once the interfaces between them are clear. The point is not merely to split the work. It is to split it into pieces that can still be specified, reviewed, and merged independently.

Bad decomposition usually looks like splitting tightly coupled work for the sake of looking efficient. If two agents need to constantly rediscover each other’s assumptions, you have not created scale. You have created friction.

### A Quick Parallelisation Check

Before splitting a task, ask four blunt questions:

- **Boundary** — can I describe exactly what this unit owns and what it must not touch?
- **Ownership** — who will review it, merge it, and resolve conflicts if it drifts?
- **Merge contract** — what assumptions does it make about adjacent work, and in what order can it land?
- **Proof** — what tests, demos, or checks will show that the unit is really done?

If those answers are still fuzzy, the task is usually not ready to be parallelised.

### A Worked Decomposition Example

Imagine a feature that adds billing export support across a backend service, an admin UI, and the operator documentation. That can be parallelised cleanly only if the interfaces are already known. One stream owns the backend export endpoint and the data contract. A second owns the admin button and the client-side handling, but only once the contract is stable. A third owns verification: integration tests, CSV edge cases, and a short manual check. A fourth owns docs once the behaviour is confirmed.

The merge contract is what keeps this sane. The backend lands first or at least stabilises its interface first. The frontend can then target something real. Verification runs against the integrated behaviour rather than against guesses. Documentation lands last, once the operator-facing surface is no longer moving. That is parallelism with coordination, not parallelism by wishful thinking.

## Local Parallelisation

Local parallelisation usually means running multiple agents from the same machine in separate workspaces, branches, or worktrees.

### Git Worktrees

`git worktree` is the classic foundation here. It allows multiple working trees from the same repository so several changes can proceed simultaneously without constant branch switching.

This is useful because it provides:

- clean isolation between branches;
- quick context switching for a human;
- a natural substrate for running multiple agents locally.

In practice, good local parallelism usually depends on lightweight setup scripts that recreate the right environment in each worktree — dependencies installed, environment files copied, caches warmed. Otherwise the time saved by parallel execution is quietly lost to repetitive setup and drift between workspaces.

A tiny bootstrap checklist often pays for itself here: create the worktree, install or sync dependencies, copy the right environment template, run one smoke test, and record the branch purpose in a short note. The goal is not ceremony. It is to stop every new worktree from becoming a slightly different snowflake.

### Multi-Agent IDE Workflows

Some modern IDEs increasingly support multiple agent sessions or parallel working surfaces. This can make local orchestration easier because the environment manages context, file access, and branch separation more gracefully than manual terminal juggling.

### Local Orchestration Tools

There are also tools and patterns that coordinate several local agent sessions across worktrees, effectively turning one machine into a small parallel agent cluster.

Examples include orchestration wrappers such as Conductor, multi-agent IDE panes, or simple custom scripts that spin up separate worktrees and agent sessions with a consistent naming scheme. The precise tool matters less than the discipline: separate state, clear ownership, and a clean merge path back.

A related local pattern is to use parallel sub-agents instead of full parallel worktrees when the main constraint is context rather than repository state. Separate context windows can sometimes give you the benefits of decomposition without immediately creating merge surfaces.

The main advantages of local parallelism are immediacy and control. You remain close to the work, the environment is familiar, and setup can be relatively lightweight if your machine can handle it.

The limitations are equally clear: your machine is still the bottleneck. CPU, memory, terminal attention, and local state management all become limiting factors sooner than you might like.

## Remote Parallelisation

Remote parallelisation removes many of those local limits by running work in cloud or CI-backed environments.

This often means:

- separate containerised environments per task;
- background agents triggered by issues, comments, or workflows;
- CI infrastructure used as an execution substrate;
- hosted remote agents producing PRs in parallel.

The big advantages are:

- **true concurrency** beyond the constraints of one laptop;
- **clean isolation** between tasks;
- **consistent environments** that reduce machine-specific drift;
- **team accessibility** because multiple people can initiate and review work.

At larger scale, remote parallelism also benefits from some form of dispatch layer. That may be a workflow controller, a queue, or even a coordinating agent that turns a larger plan into bounded briefs and collects the resulting artefacts. This does not remove ownership. It simply makes task dispatch and status tracking more systematic.

Whichever route you choose, merge conflicts are not an edge case to fear away but a normal consequence of successful parallelism. The practical question is whether your workflow makes them routine to resolve: regular syncs from `main`, bounded scopes, and explicit ownership usually matter more than perfect avoidance.

This is where scaling starts to become organisational rather than personal. The question shifts from “how many sessions can I personally juggle?” to “how much bounded work can the team safely push through the system at once?”

### Hybrid Patterns Are Often The Practical Default

In real teams, the answer is often “both”. Local parallelism is useful for supervised work, rapid iteration, and tasks where a developer wants close visibility. Remote parallelism is useful for overnight maintenance, workflow-triggered chores, or larger task queues that benefit from consistent isolated environments. A healthy scaling pattern often uses local systems for discovery and remote systems for repeatable throughput.

## Convenience Versus Control

A recurring trade-off in parallel systems is convenience versus control.

### Local Systems Tend To Maximise Control

Local worktrees, CLI agents, and manual orchestration let you inspect, interrupt, and redirect work easily. They are excellent for experimentation, development, or situations where you want close operational oversight.

### Remote Systems Tend To Maximise Capacity

Hosted or CI-backed agents scale more naturally, support broader team use, and reduce dependence on one person’s workstation. But that comes with more setup, more governance needs, and sometimes a less tactile sense of control.

Neither side is “better” in the abstract. The right choice depends on the problem you are solving. Early experimentation often belongs locally. Repeatable team workflows often belong remotely.

## Parallelism Does Not Remove Review

One of the easiest mistakes to make is to confuse parallelism with automatic throughput. Running more tasks at once does not help if the review and merge stages become the new bottleneck.

This is why scaling should be thought of as a whole-system concern. If parallel agents produce more PRs than reviewers can meaningfully inspect, you have only moved congestion downstream.

Healthy scaling therefore requires attention to:

- review capacity;
- CI reliability;
- branch hygiene;
- merge sequencing;
- specification quality;
- task granularity.

It also helps when each unit returns with a small merge contract: what changed, what assumptions it makes about adjacent work, what must land before or after it, and which validation already ran. That reduces the amount of rediscovery required during review and integration.

Parallelism is useful when the rest of the system can absorb its outputs. Otherwise it simply creates a queue in a different place.

This is why teams need a notion of parallelism budget. The real bottleneck may be review capacity, merge capacity, deployment risk, or even compute spend rather than the agent layer itself. If ten parallel tasks produce three times the review backlog, the system has not become three times more effective.

Treat that budget as something measurable. How many PRs can the team meaningfully review in a week? How many changes can safely merge without creating CI churn or deployment risk? How much model and CI spend is acceptable for the class of work in question? Parallelism becomes useful when those downstream systems can absorb the output, not merely when the agents can generate it.

This is also why staged rollout is such a sensible scaling pattern. Start with two parallel streams on low-risk work. Measure review latency, merge-conflict frequency, reruns, and cost per merged item. If the system stays calm, widen to three or four. If it gets chaotic, the answer is usually to improve decomposition and ownership rather than to add even more agents and hope morale will do the rest.

Good observability makes that visible sooner. Queue depth, review latency, merge-conflict frequency, CI rerun rates, and cost per merged work item are all more useful than a boast about how many agents happened to be running on Tuesday afternoon.

### Review Architecture Matters Too

The review loop should scale with the risk of the work, not merely with the number of active agents.

- **Intent-first review** fits high-risk or high-novelty work, where the specification and plan should be challenged before several streams begin implementation.
- **Iterative review** fits medium-risk work, where bounded units can move in parallel provided the reviewer keeps checking direction as they land.
- **Demo-only or batch review** fits low-risk, low-blast-radius work such as documentation or narrowly bounded maintenance tasks.

Parallelism without a matching review architecture tends to turn speed into queueing rather than into delivery.

## Ownership Still Matters

As the number of parallel tasks increases, ownership becomes more important, not less.

Each unit of work should have clarity around:

- who initiated it;
- which specification it relates to;
- what subsystem it affects;
- who is responsible for final review;
- how conflicts with adjacent work will be resolved.

This is true whether the “owner” is a developer, a tech lead, or a workflow controller inside an automation system. Parallelism without ownership tends to create orphaned work: PRs no one feels accountable for, branches that drift, or multiple agent runs unknowingly attacking the same problem from different angles.

Ownership is also where intent is preserved. Each unit of work needs not only a boundary, but a reason for existing that survives the handoff. Good specifications, decision records, and plan files are what keep parallel work from becoming a pile of disconnected outputs.

Parallel work also spends real money. Model usage, CI minutes, hosted environments, and human review time all scale with the number of active streams. That does not make parallelism suspect. It simply means that scaling decisions should be economic as well as technical.

## Common Failure Modes

A few mistakes recur whenever teams scale agentic work too quickly:

- **Splitting tightly coupled work** until coordination costs exceed the benefit of parallelism.
- **Ignoring review capacity** and discovering too late that the bottleneck has merely moved downstream.
- **Letting ownership blur** so that orphaned branches, duplicate work, or contradictory PRs accumulate.
- **Treating merge conflicts as surprises** instead of designing for regular sync, explicit merge order, and bounded scopes.

These are workflow failures more than model failures. The fix is usually clearer decomposition, stronger contracts, and a saner merge strategy.

## Scaling From Individual Leverage To Team Capacity

The deepest shift here is conceptual. Early AI adoption is often framed as an individual productivity story: one developer, one assistant, one faster workflow.

Parallelisation pushes you into a different frame. The real opportunity is to improve the capacity of the team and the repository system as a whole.

That means asking questions such as:

- which categories of work are safe to run in parallel;
- how can backlog items be shaped into independently reviewable units;
- where should parallel work happen locally and where should it happen remotely;
- how much review bandwidth do we have;
- which guardrails keep this from becoming PR spam.

Once you ask those questions, parallelism stops looking like a personal performance trick and starts looking like engineering operations design.

At organisational scale, parallelism also changes perspective. What looks like a local optimisation inside one repository becomes a portfolio question across many repos: where are review queues forming, which workflows produce useful pull requests, and which categories of work should be automated continuously rather than dispatched ad hoc?

## A Practical Parallelisation Pattern

A sensible parallelisation pattern often looks like this:

1. Define a clear **backlog slice** or plan.
2. Partition it into **independent units** with explicit ownership and boundaries.
3. Decide whether each unit belongs in **local** or **remote** execution.
4. Ensure the **harness** and specs are strong enough for independent runs.
5. Run the work in parallel.
6. Funnel outputs back through review, CI, and merge in a controlled order.

That order matters. The point is not simply to run many things at once. The point is to run the *right* things at once while keeping the merge path sane.

Imagine a feature that touches a backend service, a frontend admin surface, and the operator documentation. Those three strands may be parallelisable if the interfaces are already clear, but they still need a defined merge order and an integration check before release. Parallelism does not remove coordination. It changes when and where coordination happens.

## Closing Thought

Parallelisation is one of the most compelling scaling patterns in AI-assisted software development because it addresses a real bottleneck: the mismatch between the amount of useful work available and the amount of human synchronous attention available to drive it.

But the benefits do not come from spawning agents indiscriminately. They come from decomposition, ownership, clean interfaces, and reviewable outputs. Local parallelism offers immediacy and control. Remote parallelism offers team-level capacity and cleaner scaling. The right choice depends on your system, not your appetite for theatrics.

In the end, scaling is not about how many agents you can run. It is about how much parallel work your engineering system can absorb without losing clarity, quality, or accountability.

---

## Deep Dives

### Core Patterns
- [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) — Especially useful for the underlying concept of parallelisation and sectioning.
- [Building multi-agent systems: When and how to use them](https://claude.com/blog/building-multi-agent-systems-when-and-how-to-use-them) — Helpful on when parallel agents genuinely outperform a single agent.
- [Common workflow patterns for AI agents—and when to use them](https://claude.com/blog/common-workflow-patterns-for-ai-agents-and-when-to-use-them) — A compact reference for choosing parallel workflows deliberately.

### Local Parallelism
- [`git worktree` documentation](https://git-scm.com/docs/git-worktree) — The foundational primitive for local parallel work.
- [Working with multiple branches using `git worktree`](https://www.gitkraken.com/learn/git/git-worktree) — A practical human-oriented guide.
- [The Parallel Agent Multiplier with Git Worktrees and Conductor](https://elite-ai-assisted-coding.dev/p/the-parallel-agent-multiplier-conductor-with-charlie-holtz) — A direct course-site companion to this lesson.

### Remote Capacity & Workflow Design
- [Working with asynchronous coding agents](https://elite-ai-assisted-coding.dev/p/working-with-asynchronous-coding-agents) — Useful when parallelism moves into remote execution.
- [Continuous AI](https://githubnext.com/projects/continuous-ai/) — Helpful for the broader system view of recurring parallel work.
- [Agentic Workflows](https://githubnext.com/projects/agentic-workflows/) — Relevant when scaling from manual delegation to repository-native orchestration.

# Lesson 14 — Agentic AI Security

*As agents gain tools, context, and autonomy, security stops being a side concern and becomes part of the core design problem. This lesson introduces a practical risk-management frame for agentic systems: prompt injection, excessive agency, least privilege, sandboxing, and the “lethal trifecta” that makes exfiltration attacks possible. By the end, you should be able to reason about agent security architecturally rather than treating it as a prompt-writing superstition.*

## Why Agent Security Feels Different

Traditional software security already asks us to reason about permissions, trust boundaries, input validation, and unintended effects. Agentic systems inherit all of that and add a new complication: the decision-making layer is probabilistic and instruction-following.

This means the system is not merely executing a predetermined script. It is interpreting language and choosing actions based on inputs it receives. That makes it powerful — and also unusually sensitive to hostile or misleading instructions embedded in content.

The consequence is that security for agents cannot be reduced to “write a stronger system prompt”. You are dealing with a system that can ingest instructions from multiple sources, use tools with real-world effect, and operate across boundaries that may previously have been kept separate.

That is why the right stance is architectural. We are not looking for magical incantations. We are designing systems in which dangerous combinations of capability are avoided or tightly constrained.

## Prompt Injection Is The Core Problem

Prompt injection occurs when inputs alter the model’s behaviour or output in unintended ways. Those inputs do not have to look suspicious to a human. They only need to be interpreted by the model.

The key danger is that language models do not reliably distinguish instructions by provenance. Your instructions, a user’s input, a webpage, a PDF, an issue comment, or hidden text in a file can all end up as token sequences inside the same context. Once that happens, the model may follow the wrong instruction source.

This is why prompt injection is not merely a “jailbreak” curiosity. It becomes a serious engineering concern when the model can access sensitive data or perform meaningful actions. Indirect prompt injection — where the malicious instruction arrives through external content rather than through the user directly — is particularly relevant to agentic systems because those systems often read the web, repository content, emails, tickets, or other dynamic data sources.

### Deliberate And Accidental Injection

It helps to separate two related problems. **Deliberate prompt injection** is adversarial: someone hides instructions in untrusted content hoping the agent will follow them. **Accidental prompt injection** is less theatrical but still dangerous: a perfectly legitimate document, runbook, or ticket is phrased in a way the model interprets as instruction rather than data. The mitigations overlap, but not completely. Deliberate attacks demand architectural separation and least privilege. Accidental cases often demand clearer data boundaries, better labelling of context, and more careful prompt design around what the agent should treat as executable guidance.

A small example makes the second case clearer. Imagine an internal migration note that says, “After the move, delete the legacy dataset.” A human reader understands that as background planning. An agent may treat it as an instruction for the current run unless the note is clearly framed as context rather than an action request. Labels such as “Background”, “For reference only”, or a distinct planning section can reduce that ambiguity.

## The Lethal Trifecta

A useful mental model for the highest-risk agentic scenarios is **the lethal trifecta**.

The three ingredients are:

- **access to private data**;
- **exposure to untrusted content**;
- **the ability to externally communicate**.

When an agent has all three at once, an attacker has a realistic path to exfiltration. The agent reads malicious content, follows instructions contained in that content, accesses something sensitive, and sends it out.

This model is powerful because it gives you a concrete architectural test. Do not ask only “is prompt injection possible?” Ask instead: does this workflow combine all three elements in the same execution path?

If it does, you should assume the risk is real.

### Classify The Data Before You Delegate

This is also why data classification matters. Teams are far safer when they know which inputs are public, internal, restricted, or highly sensitive before an agent ever sees them. Without that distinction, “private data” remains a hand-wavy category and least privilege becomes much harder to enforce in practice.

In other words, security starts before tool invocation. If a task can be completed with public repository state and no customer data, design it that way. If it truly needs sensitive material, make that fact explicit and wrap the workflow in tighter controls.

A lightweight workflow helps here: identify the source, assign a data class, strip or summarise anything more sensitive than the task requires, and only then pass the minimum necessary fragment into the agent context. Classification is most useful when it changes what the workflow is allowed to see.

A practical four-band model is often enough:

- **Public** — safe to expose to ordinary low-risk workflows.
- **Internal** — restricted to trusted team contexts, but not inherently sensitive.
- **Restricted** — available only to specific workflows or roles because misuse would create material risk.
- **Sensitive** — never exposed directly to general-purpose agent runs; summarise or gate access through much tighter controls if it must be touched at all.

The value of the labels is not taxonomy for its own sake. It is that the classification tells the harness what the agent is allowed to read, how the output must be reviewed, and which approval path becomes mandatory.

## Why Architecture Beats Magic Guardrails

This is the unpleasant part. There is still no known, universally reliable way to guarantee that prompt injection will always be blocked by prompt-level or model-level defences.

The standard mitigations are sensible and useful — constrain behaviour, validate outputs, filter inputs and outputs, enforce least privilege, require human approval for high-risk actions, segregate external content, and run adversarial testing. All of that helps. But none of it changes the deeper reality that the model is a stochastic instruction follower.

The warning is worth taking seriously here: guardrail products that claim to catch “most attacks” are not solving the whole problem. In classic application security, 95% detection is not comfortingly close to 100%. It is a breach rate.

This does not mean defences are pointless. It means your strongest defences are architectural and procedural, not purely linguistic.

This is where security marketing tends to become unhelpful. A product that claims to catch “most” attacks may still be leaving you with an unacceptable breach rate. In ordinary application security, ninety-five percent is not comfortingly close to one hundred. It is failure with a nicer brochure.

### Break The Dangerous Combination

The most reliable way to reduce severe risk is to break at least one leg of the lethal trifecta.

### Limit Access To Private Data

Do not hand the agent more data than it needs. Scope repository access, credentials, and file visibility to the minimum required for the task.

### Limit Exposure To Untrusted Content

If a workflow does not need to read the open web, external emails, public issue threads, or arbitrary attachments, do not expose those sources. Where external content is required, separate it clearly and treat it as untrusted.

### Limit External Communication

Restrict outbound network access wherever possible. If the agent can only interact with a narrow allowlist of trusted services, or cannot transmit arbitrary content at all, exfiltration becomes much harder.

This is the core design principle. You do not need perfect detection if the system simply lacks one of the required capabilities for the attack to succeed.

## Least Privilege & Excessive Agency

The broader risk picture matters because prompt injection is not the only relevant danger. Excessive agency is its own risk.

An agent with broad function-calling authority, sweeping filesystem access, production credentials, and unrestricted network reach is not merely useful. It is fragile in exactly the wrong way.

Least privilege therefore matters at multiple levels:

- **credentials** — short-lived, scoped, task-specific tokens;
- **filesystem** — restrict access to the project directory rather than the whole machine;
- **tools** — expose only the functions needed for the task;
- **network** — constrain outbound destinations;
- **write authority** — prefer PRs and draft artefacts over direct mutation of protected branches or environments.

Least privilege is sometimes discussed as though it were an inconvenience to be tolerated. In agentic systems it is closer to structural sanity.

Credential lifecycle is part of this discipline. Short-lived, task-scoped tokens are usually safer than broad, durable credentials. In practice, that often means per-job CI tokens, temporary cloud credentials, and service-specific secrets with explicit expiry rather than shared keys that linger for months. Rotation, revocation, and clear ownership matter because agent workflows tend to multiply the number of systems in play.

## Sandboxing, Approval, & Safe Outputs

Sandboxing is one of the most practical and valuable agent security measures.

A sandboxed environment can:

- isolate the filesystem;
- limit access to host resources;
- constrain network behaviour;
- make teardown and cleanup easy;
- reduce the blast radius of mistakes or malicious instructions.

Containers, remote execution environments, and tightly configured runners are all useful here. They are not magical guarantees of safety, but they are vastly better than letting an agent roam a full developer machine with every secret, config file, and browser session within reach.

There is no special LLM-only sandboxing trick here. The boring infrastructure tools are still the right ones.

Network design belongs in the same category. Outbound allowlists, restricted transports, and narrowly scoped service access can break the external-communication leg of the lethal trifecta even when the agent still needs some runtime connectivity.

A useful rule of thumb is simple: if the task can run in a sandbox, it should.

The trade-off is that sandboxes can make some workflows less capable. A tightly isolated environment may not be able to reach a production-like dependency, run a full integration test, or inspect a sensitive internal service directly. That is usually a price worth paying for medium- and high-risk work, but it should be acknowledged openly. Sandboxing is a deliberate exchange: less convenience in return for a smaller blast radius.

### Human Approval Still Matters

Human approval is not a complete solution, but it remains an important control for high-risk actions.

Useful approval points include:

- running scripts with side effects;
- making infrastructure changes;
- applying schema migrations;
- using sensitive credentials;
- approving external communications;
- merging the final result.

The caveat, as always, is approval fatigue. If every minor action requires confirmation, people will approve reflexively and the control will collapse into ritual.

The answer is selective friction. Put approval gates where consequences justify them. Keep low-risk work fluid and high-risk work deliberate.

It is usually better to design approval around stages than around individual shell commands. Approve access to sensitive data separately from approval to make side-effectful changes. Approve outbound communication separately from approval to merge. Stage-based approval is easier to reason about and far less likely to degenerate into habitual clicking.

### Scale The Controls To The Risk

A low-stakes personal script, running in a narrow sandbox with no sensitive data and no external communication, does not need the same control surface as an agent acting on production systems or private repositories. Manual review may be enough in the first case. In the second, you should expect least-privilege credentials, strict network controls, staged execution, richer logs, and explicit human approval before anything consequential happens.

What matters is not theatrical maximalism. It is proportionality. Security controls should become more formal as access, consequence, and exposure increase.

A practical way to think about this is:

- **Low-risk workflows** — personal or disposable tasks with no sensitive data and no external communication. Manual review may be enough.
- **Medium-risk workflows** — internal tools with scoped data access or controlled writes. Here, sandboxing, least-privilege credentials, and explicit approval for effectful actions become sensible defaults.
- **High-risk workflows** — production systems, sensitive data, or workflows with meaningful external communication. These demand staged execution, richer logs, stricter network controls, and explicit human approval before consequential steps.

### Secure By Output Design

Another strong pattern is to prefer outputs that humans can inspect rather than silent mutation.

Safer output patterns include:

- pull requests instead of direct merges;
- reports instead of direct production actions;
- suggested commands instead of automatic execution for risky operations;
- staged diffs instead of hidden edits.

This principle aligns security with reviewability. It makes the agent’s work more legible and gives the human team more chances to catch problems before they become real damage.

It also fits well with the broader theme of the course: useful agentic systems should return work through ordinary engineering surfaces, not through magical hidden channels.

### Third-Party Components Expand The Trust Boundary

Every external Skill, MCP server, agent runtime, or automation action extends the system’s trust boundary. That does not mean you should avoid them categorically. It does mean you should review who maintains them, what permissions they need, how they are updated, and whether they can be sandboxed or observed adequately. Security problems often enter through convenience.

MCP deserves special scrutiny here because one server can accidentally combine all three legs of the lethal trifecta. A server that reads untrusted issues, accesses private repository state, and can create outbound content or pull requests is not just “more convenient GitHub integration”. It may also be a ready-made exfiltration surface if you have not broken the dangerous combination elsewhere.

That is especially true when an MCP server supports token passthrough, arbitrary URL fetches, or broad repository actions behind one friendly interface. Convenience is not free. It is often a compressed trust boundary.

A concrete confused-deputy pattern looks like this: the agent reads an untrusted issue comment, treats embedded instructions as operational guidance, then uses a broadly trusted MCP server to fetch private project data or prepare a pull request that leaks it elsewhere. The model has not “broken” the tool. It has simply been allowed to use a trusted capability on behalf of an untrusted input. That is why trust boundaries belong in the architecture, not merely in the prompt.

## Logging, Audit Trails, & Risk Management

You cannot defend what you cannot inspect. Agentic systems therefore need logging and traceability.

Useful artefacts include:

- the specification given to the agent;
- the tools invoked;
- outputs returned by those tools;
- validation results;
- code diffs and commits;
- workflow logs;
- decisions around approval steps.

These are useful not only for incident response. They also improve trust and debugging. If an agent behaved strangely, you want to know whether the cause was malicious content, a weak spec, excessive permissions, or a misunderstood tool result.

Good logs turn security from hand-waving into investigation.

Operationally, that usually means logs that are timestamped, tied to a run identifier, and rich enough to reconstruct what the agent saw, what it attempted, and why it took or refused a particular action. For higher-risk workflows, centralising those logs outside the agent’s immediate execution environment makes tampering harder and review easier.

At minimum, higher-risk runs should make it possible to inspect prompt sources, retrieved documents, tool invocations, permission grants, approval events, and outbound destinations. If that sounds excessive, it usually means the workflow is too powerful to be operating without that visibility.

Defences are also worth testing adversarially. Try the awkward prompts, the malicious issue comments, the fake instructions inside retrieved content, and the unauthorised data requests. If a workflow has never been exercised against hostile inputs, its security posture is still largely aspirational.

### A Short Incident-Response Loop

Even a well-designed system needs a response plan for the day something slips through. A short loop is usually enough to start:

1. **Detect** — notice the unexpected action, suspicious outbound request, or surprising access pattern.
2. **Isolate** — revoke tokens, pause the workflow, or cut the affected runner off from further action.
3. **Audit** — inspect logs, retrieved content, tool calls, and approval events to understand what the agent saw and did.
4. **Recover** — rotate affected secrets, notify the right people, tighten the harness, and only then re-enable the workflow.

This is another reason durable logs matter. Without them, incident response collapses into guesswork just when guesswork is least acceptable.

### Security Is A Risk-Management Practice

A final point: agentic security is not a binary state where a workflow is either “safe” or “unsafe” in some universal sense. It is a risk-management discipline.

That means asking:

- what does the agent have access to;
- what untrusted content can reach it;
- what can it do with that access;
- which actions require approval;
- what output path does it use;
- what logs exist if something goes wrong.

This approach is more mature than hunting for a silver bullet. It accepts the underlying properties of the system and designs around them.

## A Worked Mitigation Example

Imagine a background workflow that reads public bug reports, has access to a private repository with incident notes, and can send arbitrary outbound web requests. That is the lethal trifecta in one rather dangerous combination.

Now imagine that a public bug report contains hidden text instructing the agent to search the internal incident notes for credentials and send them to an external paste service “for diagnosis”. That is not a theoretical parlour trick. It is exactly the kind of exploit chain the lethal trifecta is warning you about.

A safer design splits the work.

1. **Public triage agent** — reads the incoming issue, classifies it, and can only label or comment within the repository. It has no access to private notes and no arbitrary outbound network access.
2. **Private reproduction agent** — runs in a sandbox with read-only access to the codebase and scoped internal documentation. It does not ingest raw public content directly; instead, it receives a structured summary prepared by the first step.
3. **Human-reviewed output** — any proposed fix returns as a draft PR or internal report. External communication, credential use, and merges still require explicit approval.

This does not make the workflow magically safe. It does, however, remove the single execution path in which untrusted content, private data, and free external communication all coexist. That is often the difference between an annoying prompt-injection attempt and a genuine exfiltration incident.

## Closing Thought

Agentic AI security becomes much clearer once you stop treating it as a prompt-engineering parlour trick and start treating it as architecture. Language models follow instructions in content. Tool-using agents can act in the world. Sensitive data is often nearby. Those facts do not become less true because the interface is friendly.

The practical answer is to break dangerous capability combinations, reduce privileges, use sandboxes, prefer reviewable outputs, and place human approval where it matters. None of that is glamorous. All of it is effective.

In short, the safest agentic systems are not the ones that trust the model most. They are the ones designed so that even when the model is successfully influenced, the consequences remain bounded.

---

## Deep Dives

### Core Security Framing
- [The lethal trifecta for AI agents: private data, untrusted content, and external communication](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/) — The clearest single mental model for the highest-risk agentic workflows.
- [LLM01:2025 Prompt Injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/) — OWASP’s practical taxonomy and mitigation guidance.
- [OWASP Top 10 Risk & Mitigations for LLMs and Gen AI Apps](https://genai.owasp.org/llm-top-10/) — Useful broader security reference, especially around excessive agency and improper output handling.

### Runtime & Architectural Mitigations
- [MCP security best practices](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices) — Strong on confused deputy risks, token passthrough, and transport-layer concerns.
- [How do you handle agent sandboxing?](https://elite-ai-assisted-coding.dev/p/how-do-you-handle-agent-sandboxing) — A practical course-site companion to sandbox design.
- [How can I defend against prompt-injection attacks in AI-assisted software development?](https://elite-ai-assisted-coding.dev/p/how-to-defend-against-prompt-injection) — Useful as a hands-on summary.

### Design Patterns & Commentary
- [Design Patterns for Securing LLM Agents against Prompt Injections](https://arxiv.org/html/2506.08837v3) — Helpful if you want a deeper research treatment of mitigation patterns.
- [An Introduction to Google’s Approach to AI Agent Security](https://simonwillison.net/2025/Jun/15/ai-agent-security/) — Useful commentary on broader security design thinking.
- [How do you ensure the quality and safety of AI-generated code?](https://elite-ai-assisted-coding.dev/p/how-to-ensure-code-quality-and-safety) — Relevant when security concerns intersect with ordinary engineering review.

# Lesson 15 — Measurement, Continuous Improvement, & Enterprise Adoption

*The final step in AI-assisted software development is not more tooling. It is learning how to tell whether the system is actually helping, how to improve it over time, and how to scale adoption without turning the organisation into a loose federation of incompatible prompting habits. This lesson brings the course together through three themes: meaningful measurement, continuous improvement, and context ownership as a form of knowledge governance. By the end, you should be able to think about AI adoption as an engineering system rather than a collection of isolated wins.*

## The Point Is Not Activity, It Is Outcomes

Once AI enters a workflow, the temptation to measure the wrong things becomes intense.

You can count prompts, accepted suggestions, generated lines, number of agent runs, or PRs opened by automation. Those numbers are easy to collect. They are not always useless, but they are rarely sufficient. The mistake is to treat them as the whole story.

The question that matters is simpler and harder: is the software delivery system actually improving?

That means asking about outcomes such as:

- quality of changes;
- throughput of useful work;
- reduction of manual toil;
- review burden;
- developer confidence and satisfaction;
- organisational ability to adopt and sustain the practices.

Activity is not meaningless, but it is only context. The real goal is better software work, not better dashboard cosmetics.

## DORA & SPACE As Starting Points

Two measurement frameworks are especially useful because they prevent overly narrow thinking.

### DORA

DORA focuses on software delivery and operational performance. Its familiar metrics — deployment frequency, lead time for changes, change failure rate, and time to restore service — are useful because they connect engineering practice to flow and stability.

In an AI-assisted environment, DORA-like measures can help answer questions such as:

- are we shipping more frequently;
- are changes moving through the system faster;
- are failures increasing or decreasing;
- are we recovering more quickly when things break?

### SPACE

SPACE expands the picture. It reminds us that developer productivity is not a single metric and not reducible to activity alone. Satisfaction and well-being, performance, activity, communication and collaboration, and efficiency and flow all matter.

This is especially important for AI adoption. It is possible to increase visible output while worsening review load, interrupting flow, or damaging trust. SPACE gives you a language for those trade-offs.

The key lesson from both frameworks is the same: measure a constellation of indicators, not one heroic number.

That usually means establishing a baseline before you declare victory. If you can compare a team’s performance before and after AI adoption — or compare similar workflows with and without AI assistance — you are much less likely to mistake novelty or enthusiasm for durable improvement.

It is also worth watching for skill erosion, not only speed gains. If people stop reasoning through tests, debugging paths, or architectural trade-offs because the agent usually offers a plausible answer first, the short-term numbers can look healthy while the underlying engineering capability quietly weakens. Sustainable adoption improves leverage without hollowing out judgement.

### Skill Erosion Needs Its Own Signal

Skill erosion is easy to wave away because it often arrives as convenience. Reviews become shorter because “the agent probably handled it”. Tests are accepted without anyone really tracing the edge cases. Architectural conversations get thinner because implementation is now cheap enough to skip the thinking phase. None of these changes looks catastrophic in isolation. Together, they hollow out the organisation’s ability to supervise the very systems it now depends on.

It helps to watch for a few practical signals: shallower code review comments, fewer developer-written tests before implementation, a decline in people being able to explain why a change was made, or recurring dependence on the same individuals to sanity-check AI-generated work. The response is not to ban AI. It is to preserve deliberate human practice: rotate review duties, keep some design work explicitly manual, and expect teams to explain the reasoning behind important changes rather than only presenting the diff.

## What Meaningful Metrics Look Like

A useful measurement approach usually has a few properties.

### It Is Actionable

If a metric changes, can you do something in response? If not, it may be interesting, but it is not guiding improvement.

### It Is Contextual

Metrics should reflect your team’s current goals and constraints. A startup trying to reduce time-to-ship will not measure exactly the same things as a regulated enterprise trying to reduce risk and improve auditability.

### It Includes Tension

Good measurement systems often contain metrics that pull against each other. This is healthy. Faster delivery and lower failure rate do not always rise together automatically. Higher automation and higher developer trust are not the same thing. Tension forces better decisions.

### It Includes Human Experience

Any meaningful productivity measurement has to include perception. Developer satisfaction, confidence, and friction are not soft extras. They are leading indicators of whether the system is sustainable.

## AI-Specific Signals Worth Tracking

In addition to broader engineering measures, some AI-specific signals are often useful.

Examples include:

- **first-pass yield** — how often delegated work returns close to mergeable without a second planning round;
- **review load** — whether AI-generated work reduces or increases reviewer effort, requested changes, or manual cleanup;
- **time saved on toil** — especially for tasks such as docs, tests, triage, or dependency maintenance;
- **acceptance or adoption trends** — are people using the system meaningfully over time rather than only sampling it once;
- **pull request lifecycle metrics** — counts, time to merge, and throughput effects;
- **quality of recurring automation outputs** — are Continuous AI workflows producing useful artefacts or just noise.

It is also worth tracking cost-aware measures such as spend per accepted pull request, spend per useful automation run, or the cost of reviewer time saved versus reviewer time created. Adoption is easier to sustain when value and cost are discussed together.

One caution is worth stating plainly: measurement has its own overhead. A metric that never changes a decision is probably decoration. Instrument the system enough to steer it, not so heavily that the team spends its time tending dashboards instead of improving the workflow.

If you want a starting formula, keep it boring. **First-pass yield** can be measured as the proportion of delegated changes that return close to mergeable without a second planning loop or substantial review rewrite. **Acceptance rate** can be measured as the proportion of suggestions, PRs, or recurring workflow outputs that the team actually keeps. Neither formula is philosophically perfect, but both are concrete enough to improve.

Of these, first-pass yield is especially useful because it exposes the combined quality of your specifications, context, harness, and review loop. When it is low, the problem is rarely “the AI” in the abstract. More often, the surrounding system is underspecified or poorly instrumented.

The negative signals matter just as much. Rising reviewer effort, more reopened bugs, repeated PR churn, or a queue of half-finished agent branches are all forms of measurement too. A healthy dashboard needs red metrics, not just flattering ones.

A useful adoption dashboard combines usage, engagement, acceptance, code generation, and PR lifecycle measures. The point is not to copy a vendor dashboard wholesale. It is to connect AI usage to delivery flow rather than measure it only in isolation.

## The Learning Loop

Measurement is only useful when it feeds a loop of improvement.

A simple and powerful pattern is:

1. **Capture** — collect artefacts, metrics, logs, and examples.
2. **Analyse** — look for patterns in what is working and what is failing.
3. **Refine** — improve prompts, specs, tools, harnesses, or policies.
4. **Repeat** — run again against the updated system.

The loop also needs a sensible cadence. If capture and analysis happen only quarterly, most of the useful signal has already decayed into anecdotes. Weekly or per-sprint reviews are usually more valuable because they keep the distance between observation and correction short.

This mirrors the specification-improvement cycle from earlier lessons, but at organisational scale. The team is not only refining one task definition. It is refining its whole way of working with AI.

The best teams make this loop routine. They do not treat AI adoption as a one-time rollout followed by passive observation. They treat it as an engineering practice that needs instrumentation and iteration.

That loop should also feed people, not only prompts and policies. Teams need to keep practising specification, review, debugging, and architectural judgement even as more execution becomes delegated. Otherwise the organisation improves its harness while neglecting the humans expected to supervise it.

## Context Ownership & Enterprise Capabilities

By the time an organisation reaches serious AI adoption, one fact becomes impossible to ignore: context is now strategic.

Shared instructions, rules, specs, examples, templates, tool configurations, and process guidance all affect the quality and consistency of results. If that context is fragmented, stale, or privately hoarded, adoption becomes inconsistent and difficult to trust.

This is why **context ownership** matters. Someone — whether an individual, a small group, or a broader enablement function — needs to curate the shared context layer.

A useful hierarchy usually has three levels:

- **Organisation-level context** — global guardrails, security expectations, preferred tooling, and shared templates.
- **Repository-level context** — local instructions, architecture notes, commands, and conventions for a specific codebase.
- **Task-level context** — the current specification, plan, progress notes, and decision records for the work at hand.

Each layer should have both an owner and a refresh path. Otherwise the organisation ends up with plenty of context and very little confidence that any of it is still true.

Freshness matters as much as ownership. Shared context that is stale, bloated, or contradictory does not merely fail to help; it actively distorts the agent’s choices. Good governance therefore includes pruning, regeneration, and a bias toward lightweight guidance that stays current rather than grand encyclopedic files that rot quietly.

In practice, that usually means giving shared context an explicit maintenance rhythm. Regenerate the pieces that should be derived automatically. Prune the parts that are no longer true. Review high-value guidance on a cadence rather than waiting for drift to become embarrassing. Context ownership is maintenance, not a naming ceremony.

The failure modes are familiar once you start looking for them: contradictory instructions copied across repos, local prompt snippets that never get promoted into shared standards, giant guidance files no one prunes, and “temporary” exceptions that become permanent folklore. Context governance is partly about preventing that quiet fragmentation.

That does not mean centralising every experiment into a slow bureaucracy. It means establishing a model in which:

- useful patterns are captured;
- shared context can be reviewed and updated;
- project-level and org-level guidance are distinguished;
- teams can contribute improvements back to the common layer;
- important norms and guardrails do not remain tribal knowledge.

This is essentially knowledge governance for the AI era. The organisation is deciding how it remembers what works.

Successful adoption depends on organisational capabilities, not merely on turning the tool on.

Among the capabilities that matter most are:

- strong version control practices;
- AI-accessible internal data;
- working in small batches;
- a clear and communicated AI stance;
- a quality internal platform;
- healthy data ecosystems;
- a user-centric orientation.

These are not embellishments on top of adoption. They are the conditions under which adoption becomes dependable.

These are revealing because none of them is “buy an AI product”. They are all about the surrounding engineering system.

This aligns perfectly with the rest of the course. Better adoption comes from better specifications, better context, better harnesses, better permissions, better reviewability, and clearer expectations — in other words, better engineering infrastructure.

### Readiness Comes Before Rollout

Not every team is ready for the same level of adoption at the same time. A team with weak tests, fuzzy ownership, and inconsistent review practices is unlikely to succeed with highly autonomous workflows merely by buying access to a model. Readiness usually depends on the basics: clear specifications, reliable validation, legible repositories, and someone willing to own the shared context layer.

A lightweight readiness checklist is often enough:

- **Specifications are clear** — the team can define work before it delegates it.
- **Validation is reliable** — tests, checks, or review steps exist and are trusted.
- **Ownership is legible** — someone knows who owns the change, the review, and the context.
- **The repository is navigable** — the agent is not being asked to work inside a maze of tacit knowledge.
- **Shared context has an owner** — rules, templates, and guidance are maintained rather than improvised.

If several of those are missing, the answer is not “no AI”. It is usually “start with more interactive and more closely supervised workflows while you fix the surrounding system.”

For larger organisations, a lightweight rubric makes the same idea more actionable. Score each category from 1 to 5: specification quality, validation reliability, ownership clarity, repository navigability, and shared-context maintenance. Teams scoring near the bottom should stay with interactive, tightly supervised use cases. Teams in the middle are usually ready for bounded pilots. Teams scoring strongly across the board are in a better position to scale recurring workflows and background execution without improvising the surrounding system every week.

## Scaling Adoption Without Losing Coherence

A recurring problem in organisations is that AI adoption begins as individual enthusiasm. Different people discover different tricks, use different tools, and develop different habits. That is useful early on, but eventually it creates drift.

The challenge then becomes how to scale without flattening everything into one rigid workflow.

A healthy pattern often includes:

- a shared baseline of rules and guardrails;
- room for local experimentation;
- a way to promote successful local patterns into shared standards;
- a review path for changes to common context or policies;
- clear guidance on where AI may be used more freely and where oversight is stricter.

A simple risk-tier model can help here as well. Low-risk domains such as documentation or lightweight analysis can tolerate more experimentation. Medium-risk work such as refactors or test generation benefits from reviewable PR-based workflows. High-risk domains such as security-sensitive code, payments, or production operations deserve tighter approval boundaries and stronger verification before anything lands.

This allows an organisation to benefit from experimentation while still converging on practices that are legible, supportable, and safe.

At this stage, orchestration becomes a management skill as much as a tooling choice. Someone needs to shape the backlog into delegable units, decide which workflows deserve automation, watch the review queue, and retire patterns that create more churn than value. Enterprise adoption depends on that coordination layer.

This is partly a change-management problem. Move too fast and the organisation accumulates broken context, inconsistent habits, and quiet mistrust. Move too slowly and the useful experiments never graduate into shared practice. The workable middle path is usually a sequence of small, instrumented rollouts with clear feedback channels and an explicit right to revise or pause the workflow.

### Orchestration Is Part Of Adoption

By this point, adoption is not just about who has access to a model. It is about whether the organisation can shape work into bounded units, route those units through the right workflows, and keep the resulting review queues healthy.

That usually means someone has to own the orchestration layer: deciding which tasks stay interactive, which become recurring automation, which can run in parallel, and which should remain tightly supervised because the proof burden is too high. Tool access is only the start. The real system is the combination of backlog shaping, workflow choice, review capacity, and context maintenance.

### What To Watch Out For

A few failure modes are especially common at this stage.

- **Measuring activity as though it were productivity** — the classic trap.
- **Optimising for individual speed at the expense of team flow** — for example, generating more review burden than value.
- **Treating adoption as a licence rollout** — without investing in context, training, and workflow design.
- **Leaving context unowned** — so that useful practice remains fragmented.
- **Ignoring the human side** — especially trust, satisfaction, and the effects of new workflow burdens.

These are not reasons to avoid adoption. They are reminders that enterprise success is usually systemic rather than tool-centric.

### Retire Workflows And Run Post-Mortems

Not every workflow deserves to live forever. A recurring automation that once saved time may gradually turn into background noise, duplicated effort, or a cost sink once the repository changes around it. Build in a retirement habit: if the output is repeatedly ignored, if reviewer effort keeps rising, or if the workflow now solves yesterday’s problem, pause it and decide whether to tighten it or remove it.

When an AI-assisted workflow fails, treat that as a post-mortem opportunity rather than as a morality play about the model. Ask what context was missing, which boundary was fuzzy, whether the proof surface was too weak, and what part of the harness or governance model should change before the next run. That keeps the improvement loop focused on engineering rather than superstition.

## A Practical Dashboard & Adoption Pattern

A small pilot team does not need a grand analytics platform. It needs a dashboard simple enough to inspect and concrete enough to change behaviour.

A sensible starter dashboard might include:

- **Delivery outcomes** — median lead time for changes, deployment frequency, and change failure rate.
- **AI effectiveness** — first-pass yield on delegated tasks, percentage of AI-assisted PRs merged without major rework, and median time from draft PR to review-ready state.
- **Human experience** — a short recurring confidence pulse, reviewer-reported effort, and the volume of repetitive toil removed from the sprint.
- **Automation quality** — for Continuous AI workflows, the proportion of outputs that were useful enough to keep versus noisy enough to ignore.

It is also useful to include system observability: active workflow count, queue depth, median review latency, rerun frequency, and combined spend across models, CI minutes, and reviewer time. Costs usually become visible at scale only after you aggregate them.

The value of a dashboard like this is not the spreadsheet aesthetics. It is the conversation it enables. If first-pass yield rises but reviewer effort also rises, your problem is probably not model intelligence; it is likely specification quality or harness quality. If automation output volume grows but usefulness falls, the trigger or success criteria need tightening.

From there, a practical adoption pattern often looks like this:

1. Start with a few **high-value use cases** where the benefit is visible.
2. Measure a small set of **meaningful metrics** across outcomes and experience.
3. Capture successful workflows into **shared context, templates, or tools**.
4. Establish clear **review and security boundaries**.
5. Expand gradually, promoting what works into common practice.

This avoids both extremes: chaotic bottom-up drift and heavy-handed top-down standardisation before anyone knows what works.

When possible, compare the new workflow against a recent baseline or a similar team not yet using it at that level. Even lightweight comparison is better than relying entirely on the vibes of an unusually exciting pilot.

## Closing Thought

The end state of AI-assisted software development is not a pile of impressive demos. It is an engineering system that knows how to learn.

That system measures outcomes rather than merely activity, improves itself through captured feedback, and treats context as a shared organisational asset rather than as scattered personal lore. It also recognises that enterprise adoption depends less on purchasing capability than on building the surrounding conditions in which that capability becomes trustworthy and useful.

In that sense, this lesson is also the closing argument of the course. Better AI-assisted development is not really about prompts alone, models alone, or tools alone. It is about designing an ecosystem of specifications, context, harnesses, workflows, guardrails, and measurement that makes useful delegation sustainable. Once that ecosystem exists, improvement becomes cumulative.

Governance is therefore not an afterthought to bolt on once the workflows are popular. It is part of what makes that improvement durable in the first place.

---

## Deep Dives

### Measurement Frameworks
- [The SPACE of Developer Productivity](https://queue.acm.org/detail.cfm?id=3454124) — The essential reference for why productivity should not be reduced to one metric.
- [DORA](https://dora.dev/) — The main home for DORA research and guidance.
- [AI Capabilities Model](https://dora.dev/ai/) — Useful for understanding organisational capabilities that amplify AI adoption.
- [GitHub Copilot usage metrics](https://docs.github.com/en/copilot/concepts/copilot-usage-metrics/copilot-metrics) — A concrete example of linking AI usage to adoption and PR lifecycle outcomes.

### Course-Site Companions
- [How can we use a “Continuous AI” pattern to integrate AI into CI/CD?](https://elite-ai-assisted-coding.dev/p/how-can-we-use-continuous-ai) — Relevant when measurement includes recurring automation.
- [How do you ensure the quality and safety of AI-generated code?](https://elite-ai-assisted-coding.dev/p/how-to-ensure-code-quality-and-safety) — Useful once outcome measurement includes quality and governance.
- [A Straightforward Answer to “What Tool Should I Use?”](https://elite-ai-assisted-coding.dev/p/a-straightforward-answer-to-what-tool-should-i-use) — Helpful for thinking about adoption in a vendor-agnostic way.

### Broader Research & Adoption
- [Balancing AI tensions: Moving from AI adoption to effective SDLC use](https://dora.dev/insights/balancing-ai-tensions/) — Useful on the organisational trade-offs around adoption.
- [Choosing measurement frameworks to fit your organizational goals](https://dora.dev/insights/measurement-frameworks/) — Helpful when designing local metrics rather than inheriting them wholesale.
- [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) — Valuable once continuous improvement starts to resemble structured evaluation practice.

# Homework — Build a Recurring Async Repository Review Workflow

*This homework turns Part III into a small continuous-AI system. The aim is not to create flashy autonomy for its own sake. The aim is to take the app and workflow you built in Parts I and II and operationalise them as a remote, recurring, reviewable automation with explicit guardrails.*

## Topic

**Create a report-first remote workflow that reviews your repository on a schedule.**

## Main Goal

Build a **remote, async, recurring AI workflow** that runs outside your local IDE session, reviews the repository, and returns a reviewable artefact with useful suggestions for improving the app. For the core assignment, keep it **report-first**: the workflow should not push code or merge anything. It should surface a small number of structured recommendations that a human can inspect and act on.

Choose one execution mode:

- a **hosted remote agent**; or
- a **CLI-capable agent running in GitHub Actions** or similar CI automation.

Either is acceptable. Hosted systems usually win on convenience; CLI-in-CI usually wins on environment control, permissions design, and observability.

## Core Exercise

Create a durable workflow brief such as `automation/repo-review.md` and define the system using the same Week 3 pattern from the reader: **Trigger**, **Environment**, **Context**, **Specification**, **Execution**, and **Output**. Treat that file as the handoff for unattended work, not as decorative documentation.

The workflow should review the repository through at least **four lenses** such as code quality, tests and verification gaps, documentation drift, dependency hygiene, UX/accessibility, or architecture and boundary issues. Even so, the output must stay bounded: return only the **top 3-5 prioritised suggestions**. For each suggestion, include a short title, the supporting evidence or file/path basis, why it matters, an effort or risk estimate, and the recommended next step such as ignore, backlog item, candidate spec, or low-risk automation candidate.

Use the context stack you already built. The workflow should refer to your `AGENTS.md` or equivalent rules, project Skills, reference docs, and relevant Week 2 specs and plans where appropriate. Add both a **manual trigger** for testing and a **recurring trigger** such as a nightly or weekly schedule. Keep the output safe and reviewable by returning one of the following: an issue, a PR comment, a structured Markdown report artefact, or another inspectable status surface.

Finally, define basic guardrails in the workflow brief or notes: an **iteration cap**, a **permission model**, an **idempotency rule**, one **approval boundary**, and two **success signals** you will watch. Then run the workflow at least once through the remote path, inspect the result, and tighten one thing based on what you learned. A good minimum repository shape would include the workflow definition, the durable brief, and short notes on guardrails and observed behaviour.

## Stretch Goal

Take one narrow review lane and turn it into an **effectful but bounded** async workflow that opens a **draft PR**. Good candidates include documentation refresh, low-risk dependency hygiene, changelog or README updates, generated repo-doc refreshes, or a narrow test-maintenance task.

Keep the lane low-risk, give it a clear trigger, require a short PR summary, and make the idempotency rule explicit so reruns do not create chaos. The strongest version uses a two-phase pattern: the core review workflow identifies a candidate, and a second workflow turns that candidate into a bounded draft PR.

## Advanced Stretch

For deeper experimentation, make the system **clearer, safer, more scalable, or more measurable**. You could chain several workflows together with explicit state surfaces, harden the security posture with least-privilege credentials and staged approvals, compare the same workflow in hosted and CLI-in-CI forms, add measurement such as acceptance rate or cost per useful run, split the work into several narrow remote lanes, or add a verifier workflow that judges the output of the effectful lane.

Choose one or two directions and treat the result like a small operating system for unattended work. The interesting question is not “can I automate more?” but “can I make recurring automation useful, reviewable, and trustworthy enough that I would actually leave it switched on?”

