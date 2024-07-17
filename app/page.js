import Link from 'next/link';

export default function HomePage() {
  const weekAssignments = [2, 3, 4, 5, 6, 7, 8, 10];
  const doneUpTo = 8;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-26">
      <div className="z-12 max-w-5xl w-full items-center justify-between text-sm">
        <h1 className="text-5xl font-bold mb-6">CPRG 306: Web Development 2 - Assignments</h1>
        <div className="text-lg">
          <ul>
            {weekAssignments.map((week) => (
              <li key={week} className="hover:text-blue-400 hover:underline">
                <Link href={`/week-${week}`}>Week {week} Assignment</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}

