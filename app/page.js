import Link from 'next/link';

export default function HomePage() {
  const weekDemo = 2;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-26">
      <div className="z-12 max-w-5xl w-full items-center justify-between text-sm">
        <h1 className="text-5xl font-bold mb-6">CPRG 306: Web Development 2 - Assignments</h1>
        <div className="text-lg">
          <ul>
            <Link href="/week-2"> <a>Week 2 Assignment</a></Link>
          </ul>
        </div>
      </div>
    </main>
  );
}

