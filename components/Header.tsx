'use client';

export default function Header(): JSX.Element {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Todo App by CJI
        </h1>
      </div>
    </header>
  );
}
