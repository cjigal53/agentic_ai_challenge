export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-8 text-center">
        <h1 className="text-5xl font-bold text-balance">
          Todo App
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Built with agentic AI development workflow
        </p>
        <div className="pt-4 space-y-2">
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Following the Plan → Build → Test cycle
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-600">
            Developed using Claude Code
          </p>
        </div>
      </div>
    </main>
  );
}
