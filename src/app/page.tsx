export default async function Home() {
  const res = await fetch('http://localhost:3000/api?handle=mg07315');
  const __html = await res.text();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div dangerouslySetInnerHTML={{ __html }}></div>
      </main>
    </div>
  );
}
