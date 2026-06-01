export const questions = [
  {
    title: "What best describes you?",
    desc: "Your role shapes your entire toolkit.",
    multi: false,
    options: [
      { icon: "🎓", label: "Student", hint: "Studying, assignments, research" },
      { icon: "🎨", label: "Content Creator", hint: "Videos, reels, blogs, social media" },
      { icon: "💼", label: "Freelancer", hint: "Clients, projects, proposals" },
      { icon: "👨‍💻", label: "Developer", hint: "Code, apps, automation" },
      { icon: "🚀", label: "Founder", hint: "Building a product or business" },
      { icon: "📈", label: "Marketer", hint: "Campaigns, SEO, ads, growth" },
    ]
  },
  {
    title: "What's your biggest challenge?",
    desc: "Be honest — we'll find tools that actually solve this.",
    multi: false,
    options: [
      { icon: "⏰", label: "Saving Time", hint: "Too much to do, not enough hours" },
      { icon: "✍️", label: "Writing & Content", hint: "Creating good content is hard" },
      { icon: "🎬", label: "Video Creation", hint: "Making engaging videos fast" },
      { icon: "🧠", label: "Learning & Research", hint: "Processing information quickly" },
      { icon: "💡", label: "Generating Ideas", hint: "Running out of creative ideas" },
      { icon: "🤖", label: "Automation", hint: "Repeating boring manual tasks" },
    ]
  },
  {
    title: "Which platforms do you use?",
    desc: "Select all that apply to your daily workflow.",
    multi: true,
    options: [
      { icon: "📸", label: "Instagram", hint: "Reels, posts, stories" },
      { icon: "▶️", label: "YouTube", hint: "Videos, shorts, uploads" },
      { icon: "🐦", label: "Twitter / X", hint: "Tweets, threads" },
      { icon: "📄", label: "Docs / Notion", hint: "Writing, notes, planning" },
      { icon: "💻", label: "VS Code / GitHub", hint: "Coding, version control" },
      { icon: "📧", label: "Email / Sheets", hint: "Business communication" },
    ]
  },
  {
    title: "Your AI experience level?",
    desc: "No judgment — this helps us recommend the right tools.",
    multi: false,
    options: [
      { icon: "🌱", label: "Beginner", hint: "Just starting, need simple tools" },
      { icon: "⚡", label: "Intermediate", hint: "Used a few tools, want more" },
      { icon: "🔥", label: "Advanced", hint: "I use AI daily, love exploring" },
    ]
  },
  {
    title: "Your #1 goal with AI?",
    desc: "The north star that matters most to you right now.",
    multi: false,
    options: [
      { icon: "📈", label: "Grow my audience", hint: "More followers, reach, engagement" },
      { icon: "💰", label: "Make more money", hint: "Earn faster, get more clients" },
      { icon: "🧠", label: "Learn faster", hint: "Study, upskill, stay updated" },
      { icon: "🎯", label: "Build something", hint: "Launch a product or project" },
      { icon: "😌", label: "Reduce stress", hint: "Work smarter, not harder" },
    ]
  }
]

export const toolDatabase = {
  writing: [
    { emoji: "✨", name: "ChatGPT", tag: "FREE", free: true, desc: "The most powerful general-purpose AI for writing, brainstorming, and research.", use: "Writing · Emails · Brainstorming" },
    { emoji: "🤖", name: "Claude", tag: "FREE", free: true, desc: "Exceptional for long-form writing, deep analysis, and nuanced content.", use: "Articles · Research · Analysis" },
    { emoji: "📝", name: "Notion AI", tag: "PAID", free: false, desc: "AI built right inside Notion — summarize, write, and organize in one place.", use: "Notes · Docs · Knowledge" },
  ],
  video: [
    { emoji: "🎬", name: "CapCut AI", tag: "FREE", free: true, desc: "AI-powered video editing with auto-captions, effects, and smart templates.", use: "Reels · Shorts · Social Videos" },
    { emoji: "🗣️", name: "ElevenLabs", tag: "FREE", free: true, desc: "Generate ultra-realistic AI voiceovers in any language in seconds.", use: "Voiceover · Narration · Podcast" },
    { emoji: "🎞️", name: "Runway ML", tag: "PAID", free: false, desc: "Professional AI video generation and editing used by top creators.", use: "AI Video · Effects · Editing" },
  ],
  image: [
    { emoji: "🎨", name: "Midjourney", tag: "PAID", free: false, desc: "The gold standard for stunning, photorealistic AI image generation.", use: "Thumbnails · Art · Visuals" },
    { emoji: "🖼️", name: "Adobe Firefly", tag: "FREE", free: true, desc: "Adobe's AI image generator — commercial safe and deeply powerful.", use: "Design · Professional Images" },
    { emoji: "⚡", name: "Leonardo AI", tag: "FREE", free: true, desc: "Fast, high-quality AI image generation with dozens of specialized models.", use: "Social Media · Concept Art" },
  ],
  research: [
    { emoji: "🔍", name: "Perplexity AI", tag: "FREE", free: true, desc: "AI-powered search that gives sourced, accurate answers instantly.", use: "Research · Fact-checking · News" },
    { emoji: "📚", name: "NotebookLM", tag: "FREE", free: true, desc: "Upload documents and chat with them — perfect for deep studying.", use: "Studying · Summarizing PDFs" },
    { emoji: "🧩", name: "Consensus", tag: "FREE", free: true, desc: "Search and understand scientific research papers using AI.", use: "Academic · Science Research" },
  ],
  coding: [
    { emoji: "💻", name: "GitHub Copilot", tag: "PAID", free: false, desc: "AI pair programmer that writes code as you type, right in your editor.", use: "Coding · Auto-completion" },
    { emoji: "🛠️", name: "Cursor", tag: "FREE", free: true, desc: "AI-first code editor that understands your entire codebase.", use: "Building Projects · Debugging" },
    { emoji: "🚀", name: "Lovable", tag: "FREE", free: true, desc: "Build full web apps just by describing what you want.", use: "No-code · App Building" },
  ],
  automation: [
    { emoji: "⚙️", name: "n8n", tag: "FREE", free: true, desc: "Open-source automation — connect any app to any app with AI workflows.", use: "Workflow Automation" },
    { emoji: "🔗", name: "Zapier AI", tag: "PAID", free: false, desc: "The easiest way to automate tasks between 6000+ apps.", use: "App Integrations" },
    { emoji: "📊", name: "Make", tag: "FREE", free: true, desc: "Visual automation builder with drag-and-drop workflow creation.", use: "Complex Automations" },
  ],
  productivity: [
    { emoji: "🗂️", name: "Notion", tag: "FREE", free: true, desc: "All-in-one workspace for notes, tasks, wikis, and project management.", use: "Organization · Planning" },
    { emoji: "🎯", name: "Reclaim AI", tag: "FREE", free: true, desc: "AI calendar assistant that auto-schedules your tasks and meetings.", use: "Time Management" },
    { emoji: "📋", name: "Taskade", tag: "FREE", free: true, desc: "AI project manager that helps plan, execute, and track projects.", use: "Tasks · Project Planning" },
  ],
  social: [
    { emoji: "📱", name: "Buffer AI", tag: "FREE", free: true, desc: "Schedule and analyze social media posts with smart AI assistance.", use: "Scheduling · Growth Analytics" },
    { emoji: "✍️", name: "Copy.ai", tag: "FREE", free: true, desc: "AI marketing copy for posts, ads, emails, and campaigns.", use: "Captions · Ads · Copy" },
    { emoji: "📊", name: "Metricool", tag: "FREE", free: true, desc: "Analytics and scheduling for all social platforms in one dashboard.", use: "Instagram · YouTube Analytics" },
  ]
}

export const personas = {
  "Student":          { title: "The Smart Learner",       emoji: "🧠", subtitle: "Your AI stack is built for maximum learning efficiency.",         categories: ["research", "writing", "productivity"], color: "#06b6d4" },
  "Content Creator":  { title: "The Creative Powerhouse", emoji: "🎨", subtitle: "Your AI stack is built to create incredible content, faster.",     categories: ["video", "image", "social", "writing"],  color: "#a855f7" },
  "Freelancer":       { title: "The Efficient Hustler",   emoji: "⚡", subtitle: "Your AI stack helps you deliver more to clients in less time.",    categories: ["writing", "productivity", "automation"], color: "#f59e0b" },
  "Developer":        { title: "The Code Wizard",         emoji: "💻", subtitle: "Your AI stack supercharges your development workflow.",            categories: ["coding", "automation", "research"],      color: "#6366f1" },
  "Founder":          { title: "The Builder",             emoji: "🚀", subtitle: "Your AI stack is built to move fast and build smart.",             categories: ["coding", "automation", "writing", "productivity"], color: "#f43f5e" },
  "Marketer":         { title: "The Growth Machine",      emoji: "📈", subtitle: "Your AI stack is optimized for traffic, content, and conversions.", categories: ["social", "writing", "image", "automation"], color: "#10b981" },
}
