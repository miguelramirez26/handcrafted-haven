import Navigation from "@/app/components/navigation";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-stone-50">
      <Navigation />

      <section className="bg-slate-800 px-8 py-12 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-xs uppercase tracking-widest text-yellow-300">About</p>
          <h1 className="font-merriweather text-3xl md:text-4xl">Our story</h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300">
            Handcrafted Haven began as a small collective of artisans who wanted a fair
            and sustainable way to reach customers. We celebrate traditional techniques
            and meaningful materials while connecting makers with people who value
            thoughtfully created goods.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-8 py-16">
        <h2 className="font-merriweather text-2xl mb-4">Our values</h2>
        <ul className="space-y-3 text-stone-700">
          <li>Fair pay and transparency for makers</li>
          <li>Sustainable materials and mindful production</li>
          <li>Celebrate cultural craft and individual stories</li>
        </ul>
      </section>
    </main>
  );
}
