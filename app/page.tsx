import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center shrink-0">
            <span className="flex h-8 w-28 items-center justify-center overflow-hidden sm:h-9 sm:w-36">
              <Image
                src="/wallos-logo.png"
                alt="WallOS"
                width={400}
                height={104}
                className="min-h-[140%] min-w-[140%] shrink-0 object-contain object-center"
                priority
              />
            </span>
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            <Link href="#solutions" className="text-sm font-medium text-zinc-600 hover:text-zinc-900">
              Solutions
            </Link>
            <Link href="#about" className="text-sm font-medium text-zinc-600 hover:text-zinc-900">
              About
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-zinc-600 hover:text-zinc-900">
              Pricing
            </Link>
            <Link href="#resources" className="text-sm font-medium text-zinc-600 hover:text-zinc-900">
              Resources
            </Link>
          </div>
          <div className="hidden items-center gap-4 md:flex">
            <Link
              href="#"
              className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
            >
              Sign In
            </Link>
            <Link
              href="/wall"
              className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
            >
              Get Started
            </Link>
          </div>
          {/* Mobile menu */}
          <details className="relative md:hidden">
            <summary className="list-none cursor-pointer rounded-lg p-2 hover:bg-zinc-100 [&::-webkit-details-marker]:hidden">
              <span className="sr-only">Menu</span>
              <svg className="h-6 w-6 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </summary>
            <div className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-zinc-200 bg-white py-2 shadow-lg">
              <Link href="#solutions" className="block px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50">
                Solutions
              </Link>
              <Link href="#about" className="block px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50">
                About
              </Link>
              <Link href="#pricing" className="block px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50">
                Pricing
              </Link>
              <Link href="#resources" className="block px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50">
                Resources
              </Link>
              <hr className="my-2 border-zinc-200" />
              <Link href="#" className="block px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50">
                Sign In
              </Link>
              <Link href="/wall" className="block px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50">
                Get Started
              </Link>
            </div>
          </details>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-1.5 text-xs font-medium text-zinc-600">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Now SOC 2 Type II Compliant for Walls
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
              The Operating System for Your Walls
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600">
              Enterprise-grade virtual wall infrastructure. Infinite scalability, dynamic load bearing, and full ceiling-and-floor compatibility—with 47 constraints lifted compared to physical walls.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/wall"
                className="w-full rounded-lg bg-zinc-900 px-8 py-4 text-center text-base font-semibold text-white hover:bg-zinc-800 sm:w-auto"
              >
                Launch Demo
              </Link>
              <Link
                href="#"
                className="w-full rounded-lg border-2 border-zinc-300 px-8 py-4 text-center text-base font-semibold text-zinc-900 hover:border-zinc-400 hover:bg-zinc-50 sm:w-auto"
              >
                Book a Consult
              </Link>
            </div>
          </div>
        </section>

        {/* Social proof */}
        <section className="border-y border-zinc-200 bg-zinc-50/50 px-4 py-12 sm:px-6 lg:px-8">
          <p className="mb-8 text-center text-sm font-medium text-zinc-500">
            Trusted by top wall professionals
          </p>
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-12 gap-y-6">
            <span className="text-lg font-semibold text-zinc-400">WallStreet Capital</span>
            <span className="text-lg font-semibold text-zinc-400">Brick & Co.</span>
            <span className="text-lg font-semibold text-zinc-400">Plaster Partners</span>
            <span className="text-lg font-semibold text-zinc-400">Frame Ventures</span>
            <span className="text-lg font-semibold text-zinc-400">Drywall Dynamics</span>
            <span className="text-lg font-semibold text-zinc-400">Sheetrock Labs</span>
          </div>
        </section>

        {/* Stats */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 sm:grid-cols-4 text-center">
            <div>
              <p className="text-4xl font-bold text-zinc-900 sm:text-5xl">10M+</p>
              <p className="mt-2 text-zinc-600">Walls Generated</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-zinc-900 sm:text-5xl">500K+</p>
              <p className="mt-2 text-zinc-600">Frames Placed</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-zinc-900 sm:text-5xl">99.9%</p>
              <p className="mt-2 text-zinc-600">Wall Uptime</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-zinc-900 sm:text-5xl">47</p>
              <p className="mt-2 text-zinc-600">Constraints Lifted vs. Physical</p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="solutions" className="border-t border-zinc-200 bg-zinc-50/30 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-center text-3xl font-bold text-zinc-900">
              Actionable Insights at Your Fingertips
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-zinc-600">
              Drill into wall-level performance metrics. Scale without limits. Full ceiling and floor compatibility—47 constraints lifted vs. physical walls.
            </p>
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: 'AI-Powered Wall Intelligence',
                  description: 'Leverage machine learning to optimize frame placement and wall composition.',
                  icon: '🧠',
                },
                {
                  title: 'Dynamic Load Bearing',
                  description: 'Virtual walls adapt to any frame load in real time. No structural permits, no weight limits.',
                  icon: '⚖️',
                },
                {
                  title: 'Ceiling & Floor Compatibility',
                  description: 'Native integration with virtual ceilings and floors. Deploy wall-to-wall, floor-to-ceiling, without constraints.',
                  icon: '📐',
                },
                {
                  title: 'Texture-as-a-Service (TaaS)',
                  description: 'Deploy brick, plaster, wood, and custom textures at scale. No reno required.',
                  icon: '🎨',
                },
                {
                  title: 'Infinite Scalability',
                  description: 'Spin up walls on demand. Scale horizontally and vertically—no physical limits, no permits.',
                  icon: '☁️',
                },
                {
                  title: 'Enterprise Wall Governance',
                  description: 'Role-based access, audit logs, and compliance controls for wall operations.',
                  icon: '🔒',
                },
                {
                  title: 'Wall Development Pipeline',
                  description: 'CI/CD for walls. Version, test, and deploy wall configurations with confidence.',
                  icon: '🚀',
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="text-3xl">{feature.icon}</div>
                  <h3 className="mt-4 text-lg font-semibold text-zinc-900">{feature.title}</h3>
                  <p className="mt-2 text-sm text-zinc-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="about" className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-center text-3xl font-bold text-zinc-900">How It Works</h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-zinc-600">
              Three steps to a world-class virtual wall.
            </p>
            <div className="mt-16 grid gap-12 sm:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 text-xl font-bold text-white">
                  1
                </div>
                <h3 className="mt-4 font-semibold text-zinc-900">Create Your Wall</h3>
                <p className="mt-2 text-sm text-zinc-600">
                  Launch the WallOS builder and choose your canvas. No code required.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 text-xl font-bold text-white">
                  2
                </div>
                <h3 className="mt-4 font-semibold text-zinc-900">Add Frames & Windows</h3>
                <p className="mt-2 text-sm text-zinc-600">
                  Drag, drop, and resize. AI-generated art or uploads. Optional virtual windows.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 text-xl font-bold text-white">
                  3
                </div>
                <h3 className="mt-4 font-semibold text-zinc-900">Scale & Govern</h3>
                <p className="mt-2 text-sm text-zinc-600">
                  Export, share, or plug into your wall governance stack. SOC 2 ready.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="border-t border-zinc-200 bg-zinc-50/30 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-center text-3xl font-bold text-zinc-900">
              &ldquo;I honestly think WallOS is the most finely tuned tool for walls&rdquo;
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-zinc-600">
              Hear from professionals who run their wall operations on WallOS every day.
            </p>
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {[
                {
                  quote:
                    'WallOS is a game-changer. It provides great wall analysis and is the best and easiest way to quickly understand a wall through a data-driven lens.',
                  name: 'Ben Rosengart',
                  title: 'Director of Wall Acquisitions, Brick & Co.',
                },
                {
                  quote:
                    'The dynamic load bearing alone changed everything. We scaled from one wall to thousands. Ceiling and floor compatibility meant zero integration headaches.',
                  name: 'Andrew Layton',
                  title: 'CAO, Plaster Partners',
                },
                {
                  quote:
                    "I can confidently say that if you're not leveraging their comprehensive wall platform, you're getting lapped by your competition.",
                  name: 'Jason Fort',
                  title: 'EVP, Frame Ventures',
                },
              ].map((t) => (
                <div
                  key={t.name}
                  className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
                >
                  <p className="text-zinc-700">&ldquo;{t.quote}&rdquo;</p>
                  <p className="mt-4 font-semibold text-zinc-900">{t.name}</p>
                  <p className="text-sm text-zinc-500">{t.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-center text-3xl font-bold text-zinc-900">Simple, Transparent Pricing</h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-zinc-600">
              Tiered subscription. All-inclusive. Ongoing wall support.
            </p>
            <div className="mt-16 grid gap-8 lg:grid-cols-3">
              <div className="rounded-2xl border-2 border-zinc-200 bg-white p-8">
                <h3 className="text-xl font-bold text-zinc-900">Bare</h3>
                <p className="mt-2 text-3xl font-bold text-zinc-900">Free</p>
                <p className="mt-4 text-sm text-zinc-600">1 wall, 5 frames. Perfect for trying WallOS.</p>
                <ul className="mt-6 space-y-3 text-sm text-zinc-600">
                  <li>• 1 virtual wall</li>
                  <li>• Up to 5 frames</li>
                  <li>• Basic textures</li>
                </ul>
                <Link
                  href="/wall"
                  className="mt-8 block w-full rounded-lg border-2 border-zinc-300 py-3 text-center font-semibold text-zinc-900 hover:bg-zinc-50"
                >
                  Get Started
                </Link>
              </div>
              <div className="rounded-2xl border-2 border-zinc-900 bg-zinc-900 p-8 text-white">
                <p className="text-sm font-medium text-zinc-300">Most popular</p>
                <h3 className="mt-2 text-xl font-bold">Painted</h3>
                <p className="mt-2 text-3xl font-bold">$49<span className="text-lg font-normal text-zinc-400">/mo</span></p>
                <p className="mt-4 text-sm text-zinc-300">Unlimited walls. Analytics. Priority support.</p>
                <ul className="mt-6 space-y-3 text-sm text-zinc-300">
                  <li>• Unlimited walls</li>
                  <li>• Frame analytics</li>
                  <li>• All textures + TaaS</li>
                  <li>• Email support</li>
                </ul>
                <Link
                  href="#"
                  className="mt-8 block w-full rounded-lg bg-white py-3 text-center font-semibold text-zinc-900 hover:bg-zinc-100"
                >
                  Start Free Trial
                </Link>
              </div>
              <div className="rounded-2xl border-2 border-zinc-200 bg-white p-8">
                <h3 className="text-xl font-bold text-zinc-900">Penthouse</h3>
                <p className="mt-2 text-3xl font-bold text-zinc-900">Contact Us</p>
                <p className="mt-4 text-sm text-zinc-600">Enterprise wall governance. SOC 2. Dedicated wall manager.</p>
                <ul className="mt-6 space-y-3 text-sm text-zinc-600">
                  <li>• Everything in Painted</li>
                  <li>• SOC 2 Type II</li>
                  <li>• Dedicated wall manager</li>
                  <li>• SLA & custom integrations</li>
                </ul>
                <Link
                  href="#"
                  className="mt-8 block w-full rounded-lg bg-zinc-900 py-3 text-center font-semibold text-white hover:bg-zinc-800"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="resources" className="border-t border-zinc-200 bg-zinc-50/30 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-3xl font-bold text-zinc-900">Frequently Asked Questions</h2>
            <dl className="mt-12 space-y-8">
              {[
                {
                  q: 'What is a virtual wall?',
                  a: 'A virtual wall is a cloud-native, programmable surface for frames and windows. WallOS delivers wall infrastructure so you can focus on content and layout. No physical drywall required. We’ve lifted 47 constraints that physical walls impose—load limits, permits, ceiling and floor alignment, and more.',
                },
                {
                  q: 'How does dynamic load bearing work?',
                  a: 'WallOS virtual walls support dynamic load bearing: they adapt in real time to any number of frames and any weight distribution. No structural engineering, no permits, no “max frames per wall” limits. Physical walls have fixed load capacity; ours scale with demand.',
                },
                {
                  q: 'Do your walls work with ceilings and floors?',
                  a: 'Yes. WallOS offers full ceiling and floor compatibility. Deploy wall-to-wall and floor-to-ceiling without alignment issues, load transfer concerns, or integration work. Virtual ceilings and floors plug in natively—another constraint lifted.',
                },
                {
                  q: 'How many constraints are lifted vs. physical walls?',
                  a: 'We’ve identified and lifted 47 constraints that physical walls impose: load bearing limits, permit requirements, ceiling and floor compatibility, scalability, reconfiguration cost, texture changes, and more. Our virtual walls scale infinitely with dynamic load bearing and full vertical/horizontal compatibility.',
                },
                {
                  q: 'Is WallOS SOC 2 compliant?',
                  a: 'Yes. WallOS maintains SOC 2 Type II compliance for wall operations. Our controls cover access, encryption, and change management for all wall assets.',
                },
                {
                  q: 'How many walls can I create?',
                  a: 'On Bare (free), you get one wall and up to 5 frames. Painted unlocks unlimited walls and frames with no scalability ceiling. Penthouse includes dedicated capacity and SLAs.',
                },
                {
                  q: 'What is Texture-as-a-Service (TaaS)?',
                  a: 'TaaS is our managed texture layer. Deploy brick, wood, plaster, concrete, and custom textures to your walls via API or the WallOS dashboard. Available on Painted and above.',
                },
                {
                  q: 'Do you offer a demo?',
                  a: 'Yes. Click “Launch Demo” to try the WallOS builder with no signup. For a guided walk-through and custom use cases, book a consult with our wall strategy team.',
                },
              ].map((faq) => (
                <div key={faq.q}>
                  <dt className="text-lg font-semibold text-zinc-900">{faq.q}</dt>
                  <dd className="mt-2 text-zinc-600">{faq.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl rounded-3xl bg-zinc-900 px-6 py-16 text-center sm:px-12">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Ready to Unlock the Power of Data-Driven Walls?
            </h2>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/wall"
                className="w-full rounded-lg bg-white px-8 py-4 text-center font-semibold text-zinc-900 hover:bg-zinc-100 sm:w-auto"
              >
                Launch Demo
              </Link>
              <Link
                href="#"
                className="w-full rounded-lg border-2 border-white/30 px-8 py-4 text-center font-semibold text-white hover:bg-white/10 sm:w-auto"
              >
                Book a Consult
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-zinc-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/wallos-logo.png"
                  alt="WallOS"
                  width={280}
                  height={73}
                  className="h-14 w-auto"
                />
              </Link>
              <p className="mt-2 text-sm text-zinc-500">
                The Operating System for Your Walls. Tiered subscription. All-inclusive. Ongoing training & support.
              </p>
            </div>
            <div className="flex flex-wrap gap-6 text-sm">
              <Link href="/wall" className="text-zinc-600 hover:text-zinc-900">
                Launch App
              </Link>
              <Link href="#pricing" className="text-zinc-600 hover:text-zinc-900">
                Pricing
              </Link>
              <Link href="#" className="text-zinc-600 hover:text-zinc-900">
                About
              </Link>
              <Link href="#" className="text-zinc-600 hover:text-zinc-900">
                FAQs
              </Link>
            </div>
          </div>
          <div className="mt-12 border-t border-zinc-200 pt-8">
            <p className="text-xs text-zinc-500">
              WallOS maintains SOC 2 Compliance for wall operations. Virtual walls are not a substitute for physical walls. No drywall was harmed in the making of this platform.
            </p>
            <p className="mt-4 text-xs text-zinc-500">© 2026 WallOS Inc.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
