import Link from "next/link";

export default function HomePage() {
  const learningTracks = [
    {
      title: "LLM from Scratch",
      description:
        "Master Large Language Models with theory and hands-on coding",
      href: "/docs/llm-from-scratch",
      topics: [
        "Transformers",
        "Pretraining",
        "Fine-tuning",
        "GPT Architecture",
      ],
    },
    {
      title: "SLM from Scratch",
      description:
        "Build efficient Small Language Models for resource-constrained environments",
      href: "/docs/slm-from-scratch",
      topics: ["Model Compression", "Distillation", "Optimization"],
    },
    {
      title: "Transformers",
      description: "Deep dive into the architecture that revolutionized NLP",
      href: "/docs/transformer-from-scratch",
      topics: ["Attention Mechanism", "Encoder-Decoder", "Self-Attention"],
    },
    {
      title: "Tokenizers & Embeddings",
      description: "Understand how text is processed and represented",
      href: "/docs/tokenizer-embeddings",
      topics: ["BPE", "WordPiece", "Vector Representations"],
    },
  ];

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-64px)] px-4 py-12">
      {/* Hero Section */}
      <div className="text-center max-w-4xl mb-16">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
          Learn Language Models
          <span className="block text-primary mt-2">from Scratch</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          A comprehensive, hands-on guide to understanding and building Large
          Language Models, Small Language Models, and Transformers from the
          ground up.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/docs/llm-from-scratch"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-black text-white dark:bg-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 h-11 px-8"
          >
            Start Learning
          </Link>
          <Link
            href="https://github.com/fumadocs/fumadocs"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8"
          >
            View on GitHub
          </Link>
        </div>
      </div>

      {/* Learning Tracks */}
      <div className="w-full max-w-6xl mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Learning Tracks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {learningTracks.map((track) => (
            <Link
              key={track.href}
              href={track.href}
              className="group p-6 rounded-lg border border-border bg-card hover:bg-accent transition-colors"
            >
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                {track.title}
              </h3>
              <p className="text-muted-foreground mb-4">{track.description}</p>
              <div className="flex flex-wrap gap-2">
                {track.topics.map((topic) => (
                  <span
                    key={topic}
                    className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Key Topics Section */}
      <div className="w-full max-w-4xl text-center">
        <h2 className="text-3xl font-bold mb-6">What You'll Learn</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-4">
            <div className="text-4xl mb-3">📚</div>
            <h3 className="font-semibold mb-2">Theory</h3>
            <p className="text-sm text-muted-foreground">
              Understand the fundamental concepts behind modern language models
            </p>
          </div>
          <div className="p-4">
            <div className="text-4xl mb-3">💻</div>
            <h3 className="font-semibold mb-2">Coding</h3>
            <p className="text-sm text-muted-foreground">
              Build models from scratch with practical, hands-on implementations
            </p>
          </div>
          <div className="p-4">
            <div className="text-4xl mb-3">🚀</div>
            <h3 className="font-semibold mb-2">Practice</h3>
            <p className="text-sm text-muted-foreground">
              Apply your knowledge with real-world examples and projects
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
