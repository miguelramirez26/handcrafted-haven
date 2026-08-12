export default function AboutPage() {
  return (
    <main className="min-h-screen bg-stone-50">
      {/* Navbar component is omitted here because it is already handled globally in src/app/layout.tsx */}
      
      <section className="bg-slate-800 px-8 py-12 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-xs uppercase tracking-widest text-yellow-300">Our Story</p>
          <h1 className="font-merriweather text-3xl md:text-4xl">About Handcrafted Haven</h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300">
            Discover the mission, vision, and the community behind our artisan marketplace.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-8 py-12">
        <div className="prose prose-stone bg-white border border-stone-200 p-8 md:p-12 shadow-sm rounded-sm">
          <h2 className="font-merriweather text-2xl text-stone-900 mb-4">Empowering Independent Artisans</h2>
          <p className="text-stone-600 text-sm leading-relaxed mb-6">
            Handcrafted Haven was born out of a desire to connect passionate creators with buyers who appreciate 
            the true value of handmade goods. In a world dominated by mass production, we offer a dedicated space 
            where unique crafts tell their own stories.
          </p>

          <h3 className="font-merriweather text-xl text-stone-900 mb-3 mt-8">Our Mission</h3>
          <p className="text-stone-600 text-sm leading-relaxed mb-6">
            To provide global visibility to independent artisans, offering them secure tools to showcase, manage, 
            and scale their craft business seamlessly while fostering authentic sustainable trade.
          </p>

          <h3 className="font-merriweather text-xl text-stone-900 mb-3">Our Core Values</h3>
          <ul className="list-disc pl-5 text-stone-600 text-sm space-y-2">
            <li><strong>Authenticity:</strong> Every item in our marketplace represents genuine human creativity and skill.</li>
            <li><strong>Community:</strong> We believe in building a supportive network linking buyers directly with local makers.</li>
            <li><strong>Transparency:</strong> Secure tracking, explicit artisan attribution, and fair monetization structures.</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
