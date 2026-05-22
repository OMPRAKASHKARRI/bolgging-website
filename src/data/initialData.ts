import { Post, Category, Author } from '../types';

export const authors: Author[] = [
  {
    id: 'author-1',
    name: 'Elena Vasquez',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Senior engineer and tech writer passionate about web development, design systems, and building great developer experiences.',
    role: 'Lead Engineer',
  },
  {
    id: 'author-2',
    name: 'Marcus Chen',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Full-stack developer and open source contributor. Writes about React, Node.js, and modern JavaScript patterns.',
    role: 'Full-Stack Developer',
  },
  {
    id: 'author-3',
    name: 'Sophia Laurent',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'UX designer turned developer. Passionate about the intersection of design and engineering.',
    role: 'Design Engineer',
  },
];

export const categories: Category[] = [
  { id: 'cat-1', name: 'Technology', slug: 'technology', description: 'Latest in tech, tools, and innovation', color: 'blue', postCount: 0 },
  { id: 'cat-2', name: 'Design', slug: 'design', description: 'UI/UX, visual design, and creative tools', color: 'rose', postCount: 0 },
  { id: 'cat-3', name: 'Programming', slug: 'programming', description: 'Code tutorials, tips, and best practices', color: 'emerald', postCount: 0 },
  { id: 'cat-4', name: 'Career', slug: 'career', description: 'Growth, interviews, and professional development', color: 'amber', postCount: 0 },
  { id: 'cat-5', name: 'Productivity', slug: 'productivity', description: 'Tools and habits for staying effective', color: 'cyan', postCount: 0 },
];

export const initialPosts: Post[] = [
  {
    id: 'post-1',
    title: 'Building Scalable React Applications with Modern Patterns',
    slug: 'building-scalable-react-applications',
    excerpt: 'Explore the architectural patterns and best practices that power production-grade React apps, from component design to state management.',
    content: `## Introduction

React has evolved dramatically over the past few years. With hooks, concurrent features, and a mature ecosystem, building large-scale applications requires thoughtful architecture decisions from the start.

## Component Architecture

The foundation of any scalable React app is a well-thought-out component hierarchy. Think of your components in three layers:

**Presentational Components** — These are pure UI elements that receive props and render output. They have no knowledge of data sources or business logic.

**Container Components** — These handle data fetching, state management, and pass data down to presentational components.

**Feature Modules** — Group related components, hooks, and utilities by business domain rather than technical type.

## State Management Strategies

For most apps, the built-in React state primitives are sufficient:

- \`useState\` for local, isolated state
- \`useReducer\` for complex state transitions
- \`useContext\` for shared state across a subtree
- External libraries (Zustand, Jotai) when you need true global state

The mistake many teams make is reaching for Redux or a heavy state library too early. Start simple and graduate complexity as your needs demand.

## Custom Hooks: Your Secret Weapon

Custom hooks let you extract and reuse stateful logic without changing your component hierarchy. A well-named custom hook documents itself:

\`\`\`javascript
function useBlogPosts(category) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts(category).then(data => {
      setPosts(data);
      setLoading(false);
    });
  }, [category]);

  return { posts, loading };
}
\`\`\`

## Performance Optimization

React is fast by default, but large applications benefit from deliberate optimization:

1. **Code splitting** with \`React.lazy\` and \`Suspense\`
2. **Memoization** with \`React.memo\`, \`useMemo\`, and \`useCallback\`
3. **Virtualization** for long lists with libraries like react-virtual
4. **Bundle analysis** to identify and eliminate bloat

## Conclusion

Scalable React applications are built on clear separation of concerns, deliberate state management, and continuous refactoring. Start with the simplest approach that works, measure, then optimize.`,
    author: authors[0],
    category: 'Programming',
    tags: ['React', 'JavaScript', 'Architecture', 'Performance'],
    coverImage: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
    publishedAt: '2026-05-10T09:00:00Z',
    updatedAt: '2026-05-10T09:00:00Z',
    readTime: 7,
    featured: true,
    likes: 142,
    views: 3420,
    comments: [
      {
        id: 'c1',
        postId: 'post-1',
        author: 'Alex Kim',
        email: 'alex@example.com',
        content: 'This is exactly what I needed. The section on custom hooks really clicked for me.',
        createdAt: '2026-05-11T14:20:00Z',
        likes: 8,
      },
      {
        id: 'c2',
        postId: 'post-1',
        author: 'Jamie Torres',
        email: 'jamie@example.com',
        content: 'Great article! Would love to see a follow-up on testing strategies for these patterns.',
        createdAt: '2026-05-12T09:15:00Z',
        likes: 5,
      },
    ],
  },
  {
    id: 'post-2',
    title: 'The Art of Minimalist UI Design in 2026',
    slug: 'art-of-minimalist-ui-design-2026',
    excerpt: 'How stripping away visual noise creates interfaces that users love. A deep dive into the principles that define modern minimalist design.',
    content: `## Why Minimalism Works

Minimalism in UI design isn't about making things look sparse — it's about relentless prioritization. Every element on screen competes for the user's attention. Minimalism is the discipline of winning that competition by removing the competition itself.

## The Core Principles

### Purposeful White Space

White space is not empty space. It's an active design element that creates breathing room, establishes hierarchy, and guides the eye. Generous padding and margins signal confidence; cramped layouts signal anxiety.

### Typography as Visual Hierarchy

In a minimalist design, typography does the heavy lifting that decorative elements would otherwise handle. A strong typographic system — two typefaces maximum, three weights maximum — creates hierarchy without visual clutter.

### Color with Intention

A minimal palette doesn't mean black and white. It means each color has a job. Pick a primary, a neutral family, and one accent. Use the accent sparingly — it only has power if it's rare.

### Motion that Communicates

Animations in minimalist interfaces aren't decoration. They communicate state changes, guide attention, and provide feedback. Every motion should answer a question: "What just happened?" or "What should I do next?"

## Common Pitfalls

**The Empty Page Problem**: Minimalism can tip into confusion when there isn't enough affordance. Users need clear signals about what's interactive and what isn't.

**Over-iconography**: Icons without labels force users to guess. In minimalist design, this is doubly dangerous because there's no surrounding context to provide clues.

**False Minimalism**: Hiding complexity (behind menus, modals, expandable sections) isn't minimalism — it's avoidance. True minimalism means the complexity isn't there in the first place.

## Tools of the Trade

The best minimal UIs start with the user's mental model, not the designer's aesthetic preference. User research, clear information architecture, and rigorous content strategy precede any visual decisions.

## Conclusion

Minimalist design is harder than decorative design. It requires saying no constantly, justifying every addition, and trusting that simplicity communicates more powerfully than elaboration.`,
    author: authors[2],
    category: 'Design',
    tags: ['Design', 'UI', 'UX', 'Minimalism'],
    coverImage: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
    publishedAt: '2026-05-08T11:00:00Z',
    updatedAt: '2026-05-08T11:00:00Z',
    readTime: 6,
    featured: true,
    likes: 98,
    views: 2180,
    comments: [
      {
        id: 'c3',
        postId: 'post-2',
        author: 'Sam Rivera',
        email: 'sam@example.com',
        content: 'The distinction between true minimalism and "hiding complexity" is so important. Sharing this with my whole team.',
        createdAt: '2026-05-09T16:30:00Z',
        likes: 12,
      },
    ],
  },
  {
    id: 'post-3',
    title: 'TypeScript Patterns Every Developer Should Know',
    slug: 'typescript-patterns-every-developer-should-know',
    excerpt: 'From discriminated unions to template literal types, these TypeScript patterns will make your code more expressive and safer.',
    content: `## TypeScript Has Grown Up

What started as a type annotation layer on JavaScript has become one of the most expressive type systems in mainstream programming. Mastering it requires understanding not just the syntax, but the patterns it enables.

## Discriminated Unions

Discriminated unions are TypeScript's answer to sum types, and they're incredible for modeling state:

\`\`\`typescript
type RequestState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };
\`\`\`

The compiler now forces you to handle every case in a switch statement, eliminating entire classes of runtime bugs.

## Template Literal Types

Type-safe string manipulation was a game-changer:

\`\`\`typescript
type EventName = 'click' | 'focus' | 'blur';
type Handler = \`on\${Capitalize<EventName>}\`;
// Result: "onClick" | "onFocus" | "onBlur"
\`\`\`

## Mapped Types for Transformation

Derived types keep your type definitions DRY:

\`\`\`typescript
type ReadOnly<T> = {
  readonly [K in keyof T]: T[K];
};

type Optional<T> = {
  [K in keyof T]?: T[K];
};
\`\`\`

## The Builder Pattern with Method Chaining

TypeScript makes fluent APIs type-safe:

\`\`\`typescript
class QueryBuilder<T> {
  private filters: Partial<T>[] = [];

  where(filter: Partial<T>): this {
    this.filters.push(filter);
    return this;
  }

  build() {
    return this.filters;
  }
}
\`\`\`

## Conditional Types for Advanced Inference

\`\`\`typescript
type Unpacked<T> = T extends Array<infer U> ? U : T;
// Unpacked<string[]> → string
// Unpacked<string>   → string
\`\`\`

## Conclusion

These patterns take time to internalize, but they pay dividends in code that's easier to refactor, safer to change, and more self-documenting than anything comments could achieve.`,
    author: authors[1],
    category: 'Programming',
    tags: ['TypeScript', 'JavaScript', 'Patterns', 'Types'],
    coverImage: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800',
    publishedAt: '2026-05-05T08:00:00Z',
    updatedAt: '2026-05-05T08:00:00Z',
    readTime: 8,
    featured: false,
    likes: 211,
    views: 4890,
    comments: [],
  },
  {
    id: 'post-4',
    title: 'How to Negotiate Your Tech Salary in 2026',
    slug: 'negotiate-tech-salary-2026',
    excerpt: 'A practical, no-nonsense guide to salary negotiation for software engineers. Based on real conversations and real outcomes.',
    content: `## The Negotiation Mindset

Salary negotiation is not confrontational — it's collaborative. Both parties want to arrive at a number that works. Your job is to make sure that the starting point and the final number are as favorable to you as possible.

## Before the Conversation

Research is your most important preparation. Know the market rate for your role, level, and location from multiple sources: levels.fyi, Glassdoor, Blind, and direct conversations with peers. Without data, you're negotiating blind.

Write down your target number and your walk-away number before any conversation starts. The fog of a live negotiation is real — having pre-set anchors prevents you from accepting something you'll regret.

## The First Offer

Never accept the first offer immediately. Even if it's above your expectations, a brief "Thank you — I'm excited about this opportunity. I'd like a couple of days to review the details" is always appropriate. Urgency is almost always manufactured.

When you counter, ask for 10-20% above the offer. This gives room to meet in the middle at your actual target.

## Beyond Base Salary

Total compensation includes:
- **Equity** (vesting schedule, cliff, strike price for options)
- **Signing bonus** (often the most negotiable line item)
- **Performance bonus** (what does "target" actually mean?)
- **Benefits** (healthcare quality, 401k match, PTO policy)
- **Remote work flexibility**
- **Learning and development budget**

If the base salary is stuck, these levers often have more room.

## Handling Pushback

"That's outside our band" → "Can you tell me more about the band? I want to understand where this role sits."

"We've already made a strong offer" → "I agree, and I'm genuinely excited. The market data I have suggests [X], which is why I'm asking for [Y]."

"We need to know your current salary" → In many jurisdictions you're not required to share this. "I'd prefer to focus on the market rate and the value I bring to this role."

## Conclusion

Every engineer who has ever negotiated reports one common experience: it was less scary than expected and the outcome was better than if they hadn't tried. The worst realistic outcome is they say no to the higher number and you accept the original offer.`,
    author: authors[0],
    category: 'Career',
    tags: ['Career', 'Salary', 'Negotiation', 'Jobs'],
    coverImage: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
    publishedAt: '2026-05-01T10:00:00Z',
    updatedAt: '2026-05-01T10:00:00Z',
    readTime: 5,
    featured: false,
    likes: 167,
    views: 5230,
    comments: [
      {
        id: 'c4',
        postId: 'post-4',
        author: 'Dana Park',
        email: 'dana@example.com',
        content: 'Used exactly this approach last month and got 15% above the initial offer. Thank you!',
        createdAt: '2026-05-03T11:00:00Z',
        likes: 22,
      },
    ],
  },
  {
    id: 'post-5',
    title: 'The Deep Work Toolkit: Staying Focused in a Distracted World',
    slug: 'deep-work-toolkit-staying-focused',
    excerpt: 'Practical systems and tools for protecting your most important cognitive resource: sustained, uninterrupted focus.',
    content: `## Focus is a Skill

Cal Newport popularized the term "deep work" — the ability to focus without distraction on cognitively demanding tasks. What's easy to miss is that focus is not a personality trait. It's a practiced skill that degrades without use and improves with deliberate training.

## The Environment Stack

Your environment is doing a lot of work before your willpower is even involved.

**Physical space**: A dedicated work area, even a specific chair or corner of a room, trains your brain to shift into focus mode. Novelty and distraction live in the same places you relax.

**Digital space**: Notification-free apps, a focused browser profile (separate from your personal one), and site blockers during deep work windows eliminate the most common interruption vectors.

**Audio**: Many people focus best with brown noise, lo-fi music, or silence. Experiment and commit to what works.

## Time Blocking

Reactive schedules — responding to whatever demands attention — are the enemy of deep work. Time blocking is the practice of assigning specific tasks to specific time windows in advance.

The mechanics: At the end of each day, plan tomorrow. Assign your most important deep work to your highest-energy hours (usually morning). Leave buffers for the unexpected. Honor the blocks like meetings.

## The Shutdown Ritual

Without a clean end to the work day, the brain continues chewing on open loops. A shutdown ritual — reviewing your task list, capturing anything open, saying "shutdown complete" aloud — signals to your brain that the day is done and recovery can begin.

## Tracking Focus

You can't improve what you don't measure. Simple focus tracking: at the end of each day, record how many hours you spent in genuine deep work. The act of measurement makes the investment visible and motivates protection.

## Conclusion

Deep work is increasingly rare and increasingly valuable. The systems you build to protect it are a competitive advantage, a professional differentiator, and — perhaps most importantly — a source of profound satisfaction in the work itself.`,
    author: authors[1],
    category: 'Productivity',
    tags: ['Productivity', 'Focus', 'Deep Work', 'Habits'],
    coverImage: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800',
    publishedAt: '2026-04-28T07:00:00Z',
    updatedAt: '2026-04-28T07:00:00Z',
    readTime: 6,
    featured: false,
    likes: 89,
    views: 1980,
    comments: [],
  },
  {
    id: 'post-6',
    title: 'AI-Assisted Development: What Changes, What Doesn\'t',
    slug: 'ai-assisted-development-what-changes',
    excerpt: 'A grounded look at how AI coding tools are reshaping software development — and what skills remain irreplaceable.',
    content: `## The Honest Assessment

AI coding assistants have become genuinely useful. Not "impressive demo" useful — actually useful, daily, in production codebases. Understanding what they change and what they don't is essential for engineers navigating this shift.

## What AI Does Well

**Boilerplate generation**: CRUD operations, form handlers, API clients, test stubs — the mechanical code that has to be written but doesn't require creative problem-solving.

**Context-free transformations**: Reformatting, renaming, converting between formats, writing regex patterns. Tasks with a clear right answer that are tedious to do manually.

**Documentation**: AI is remarkably good at explaining what code does, generating docstrings, and writing clear commit messages.

**First drafts**: Getting from a blank page to something that compiles and roughly does the right thing. The last 20% — correctness, edge cases, performance — still requires human judgment.

## What Doesn't Change

**System design**: Understanding how to structure a large system, manage dependencies, plan migrations, and make architectural tradeoffs requires deep contextual understanding AI doesn't yet have reliably.

**Debugging**: AI can suggest fixes, but the investigative process — forming hypotheses, designing experiments, reading traces — is still fundamentally a human skill.

**Domain modeling**: Translating complex business requirements into precise data models and rules requires understanding the business, not just the code.

**Judgment**: Knowing when something is good enough, when to refactor vs. rewrite, when a feature is actually needed — these are judgment calls that require experience and context.

## The Skill Shift

Junior engineers who adopt AI tools can output more code. But output volume was never the bottleneck for junior engineers — judgment was. Senior engineers who adopt AI tools can spend more time on the problems that actually require senior judgment.

The engineers who will thrive are those who develop taste: the ability to recognize when AI output is correct, when it's subtly wrong, and when the problem requires a different approach entirely.

## Conclusion

The best analogy is the calculator. It eliminated a category of work and made the people who used them more capable, not less. The engineers who said "I need to be able to do this math by hand" were not wrong — but they were also less effective than those who embraced the tool while keeping the underlying knowledge sharp.`,
    author: authors[0],
    category: 'Technology',
    tags: ['AI', 'Development', 'Future', 'Tools'],
    coverImage: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    publishedAt: '2026-04-22T09:00:00Z',
    updatedAt: '2026-04-22T09:00:00Z',
    readTime: 7,
    featured: true,
    likes: 254,
    views: 6120,
    comments: [
      {
        id: 'c5',
        postId: 'post-6',
        author: 'Chris Walker',
        email: 'chris@example.com',
        content: 'The calculator analogy is perfect. Saving this one.',
        createdAt: '2026-04-23T12:00:00Z',
        likes: 18,
      },
    ],
  },
];
