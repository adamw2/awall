import Link from 'next/link';
import Image from 'next/image';

const GITHUB_URL = 'https://github.com/adamw2/tunnelboy';

export default function TunnelBoyPage() {
  return (
    <>
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-green-800/60 bg-[#0a0f0a]/95 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/tunnelboy" className="flex items-center shrink-0">
            <Image
              src="/tunnelboy-logo.png"
              alt="TunnelBoy"
              width={200}
              height={52}
              className="h-9 w-auto object-contain object-left-top sm:h-10"
              priority
            />
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            <Link href="#solutions" className="text-sm font-medium text-green-400/90 hover:text-green-300">
              Solutions
            </Link>
            <Link href="#about" className="text-sm font-medium text-green-400/90 hover:text-green-300">
              About
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-green-400/90 hover:text-green-300">
              Pricing
            </Link>
            <Link href="#resources" className="text-sm font-medium text-green-400/90 hover:text-green-300">
              Resources
            </Link>
          </div>
          <div className="hidden items-center gap-4 md:flex">
            <Link
              href="#"
              className="rounded border border-green-600/60 px-4 py-2 text-sm font-medium text-green-400/90 hover:bg-green-900/30"
            >
              Sign In
            </Link>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded border-2 border-[#00ff41] bg-[#00ff41]/10 px-4 py-2 text-sm font-medium text-[#00ff41] hover:bg-[#00ff41]/20"
            >
              View on GitHub
            </a>
          </div>
          <details className="relative md:hidden">
            <summary className="list-none cursor-pointer rounded border border-green-700 p-2 [&::-webkit-details-marker]:hidden">
              <span className="sr-only">Menu</span>
              <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </summary>
            <div className="absolute right-0 top-full mt-2 w-48 rounded border border-green-800 bg-[#0d2818] py-2 shadow-lg">
              <Link href="#solutions" className="block px-4 py-2 text-sm text-green-400 hover:bg-green-900/30">
                Solutions
              </Link>
              <Link href="#about" className="block px-4 py-2 text-sm text-green-400 hover:bg-green-900/30">
                About
              </Link>
              <Link href="#pricing" className="block px-4 py-2 text-sm text-green-400 hover:bg-green-900/30">
                Pricing
              </Link>
              <Link href="#resources" className="block px-4 py-2 text-sm text-green-400 hover:bg-green-900/30">
                Resources
              </Link>
              <hr className="my-2 border-green-800" />
              <Link href="#" className="block px-4 py-2 text-sm text-green-400 hover:bg-green-900/30">
                Sign In
              </Link>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-sm font-medium text-[#00ff41] hover:bg-green-900/30">
                View on GitHub
              </a>
            </div>
          </details>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-700/60 bg-green-950/50 px-4 py-1.5 text-xs font-medium text-amber-400/90">
              Pip-Boy themed • MIT License
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-[#00ff41] sm:text-5xl lg:text-6xl">
              Vault-Grade AWS Tunneling
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-green-400/90">
              Securely connect to RDS, OpenSearch, and EC2 through SSM Session Manager. Service discovery, jump hosts, and a Pip-Boy TUI. No SSH keys required.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded border-2 border-[#00ff41] bg-[#00ff41]/10 px-8 py-4 text-center text-base font-semibold text-[#00ff41] hover:bg-[#00ff41]/20 sm:w-auto"
              >
                View on GitHub
              </a>
              <a
                href={`${GITHUB_URL}#installation`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded border-2 border-amber-500/60 bg-amber-950/30 px-8 py-4 text-center text-base font-semibold text-amber-400 hover:bg-amber-900/30 sm:w-auto"
              >
                Install via Homebrew
              </a>
            </div>
          </div>
        </section>

        {/* Social proof */}
        <section className="border-y border-green-800/50 bg-green-950/20 px-4 py-12 sm:px-6 lg:px-8">
          <p className="mb-8 text-center text-sm font-medium text-green-500/80">
            Trusted by vault dwellers and SREs
          </p>
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-12 gap-y-6">
            <span className="text-lg font-semibold text-green-600/80">Vault-Tec Industries</span>
            <span className="text-lg font-semibold text-green-600/80">Nuka-Cola DevOps</span>
            <span className="text-lg font-semibold text-green-600/80">Commonwealth Cloud</span>
            <span className="text-lg font-semibold text-green-600/80">Brotherhood of SSM</span>
            <span className="text-lg font-semibold text-green-600/80">Institute Labs</span>
          </div>
        </section>

        {/* Stats */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 sm:grid-cols-4 text-center">
            <div>
              <p className="text-4xl font-bold text-[#00ff41] sm:text-5xl">10K+</p>
              <p className="mt-2 text-green-500/80">RDS instances tunneled</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[#00ff41] sm:text-5xl">50K+</p>
              <p className="mt-2 text-green-500/80">SSM sessions secured</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[#00ff41] sm:text-5xl">99.9%</p>
              <p className="mt-2 text-green-500/80">Tunnel uptime</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-amber-400 sm:text-5xl">1</p>
              <p className="mt-2 text-green-500/80">Pip-Boy themed CLI</p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="solutions" className="border-t border-green-800/50 bg-green-950/10 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-center text-3xl font-bold text-[#00ff41]">
              Built for the Wasteland of Your VPC
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-green-400/90">
              AWS SSO, service discovery, jump hosts, and a terminal UI that doesn&apos;t look like the pre-war internet.
            </p>
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { title: 'AWS SSO Support', description: 'Works with your existing AWS profiles and SSO sessions. No keycard required.', icon: '🔐' },
                { title: 'Service Discovery', description: 'Automatically discover RDS instances, OpenSearch domains, and EC2 instances.', icon: '🔍' },
                { title: 'Flexible Jump Hosts', description: 'Configure jump hosts by name patterns, tags, or explicit instance IDs.', icon: '🦘' },
                { title: 'Direct SSM', description: 'Connect to SSM-enabled instances without a jump host. Session Manager only.', icon: '⚡' },
                { title: 'OpenSearch SigV4 Proxy', description: 'Automatic signing proxy for Kibana and OpenSearch Dashboards in your browser.', icon: '📊' },
                { title: 'Pip-Boy TUI', description: 'Interactive terminal UI for selecting resources. Vault-Tec approved.', icon: '⌚' },
              ].map((f) => (
                <div
                  key={f.title}
                  className="rounded-xl border border-green-700/50 bg-[#0d2818]/80 p-6 transition-colors hover:border-green-600/50"
                >
                  <div className="text-2xl">{f.icon}</div>
                  <h3 className="mt-4 text-lg font-semibold text-[#00ff41]">{f.title}</h3>
                  <p className="mt-2 text-sm text-green-400/80">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="about" className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-center text-3xl font-bold text-[#00ff41]">How It Works</h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-green-400/90">
              Three steps to a secure tunnel. No radaway needed.
            </p>
            <div className="mt-16 grid gap-12 sm:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg border-2 border-[#00ff41] bg-[#00ff41]/10 text-xl font-bold text-[#00ff41]">
                  1
                </div>
                <h3 className="mt-4 font-semibold text-[#00ff41]">Install</h3>
                <p className="mt-2 text-sm text-green-400/80">
                  <code className="rounded bg-green-950/80 px-1.5 py-0.5">brew tap adamw2/tunnelboy && brew install tunnelboy</code>
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg border-2 border-[#00ff41] bg-[#00ff41]/10 text-xl font-bold text-[#00ff41]">
                  2
                </div>
                <h3 className="mt-4 font-semibold text-[#00ff41]">Configure</h3>
                <p className="mt-2 text-sm text-green-400/80">
                  Create <code className="rounded bg-green-950/80 px-1.5 py-0.5">~/.tunnelboy.yaml</code> with jump hosts and connection presets.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg border-2 border-[#00ff41] bg-[#00ff41]/10 text-xl font-bold text-[#00ff41]">
                  3
                </div>
                <h3 className="mt-4 font-semibold text-[#00ff41]">Connect</h3>
                <p className="mt-2 text-sm text-green-400/80">
                  <code className="rounded bg-green-950/80 px-1.5 py-0.5">tunnelboy connect rds</code> or opensearch or ec2. Interactive selection included.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="border-t border-green-800/50 bg-green-950/10 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-center text-3xl font-bold text-[#00ff41]">
              &ldquo;Finally, a tunnel CLI that doesn&apos;t look like the pre-war internet&rdquo;
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-green-400/90">
              Hear from vault dwellers who run their tunnels on TunnelBoy every day.
            </p>
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {[
                { quote: 'TunnelBoy is a game-changer. RDS tunneling with a Pip-Boy UI? I never thought I\'d see it. My vault has never been more secure.', name: 'Overseer Smith', title: 'Vault 101 IT' },
                { quote: 'We scaled from one RDS instance to hundreds. The interactive TUI and connection presets saved us countless radaway.', name: 'Paladin Jones', title: 'Brotherhood of SSM' },
                { quote: 'If you\'re not using TunnelBoy for your AWS tunnels, you\'re still living in 2077.', name: 'Director Chen', title: 'Institute Labs' },
              ].map((t) => (
                <div key={t.name} className="rounded-xl border border-green-700/50 bg-[#0d2818]/80 p-6">
                  <p className="text-green-300/90">&ldquo;{t.quote}&rdquo;</p>
                  <p className="mt-4 font-semibold text-[#00ff41]">{t.name}</p>
                  <p className="text-sm text-green-500/80">{t.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-center text-3xl font-bold text-[#00ff41]">Pricing</h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-green-400/90">
              Free for the wasteland. No caps required.
            </p>
            <div className="mt-16 grid gap-8 lg:grid-cols-3">
              <div className="rounded-xl border-2 border-green-700/60 bg-[#0d2818]/80 p-8">
                <h3 className="text-xl font-bold text-[#00ff41]">Free</h3>
                <p className="mt-2 text-3xl font-bold text-[#00ff41]">$0</p>
                <p className="mt-4 text-sm text-green-400/80">MIT license. For the wasteland. Unlimited tunnels.</p>
                <ul className="mt-6 space-y-3 text-sm text-green-400/80">
                  <li>• RDS, OpenSearch, EC2</li>
                  <li>• Pip-Boy TUI</li>
                  <li>• Shell completion</li>
                </ul>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 block w-full rounded border-2 border-green-600 py-3 text-center font-semibold text-[#00ff41] hover:bg-green-900/30"
                >
                  Get Started
                </a>
              </div>
              <div className="rounded-xl border-2 border-[#00ff41] bg-[#00ff41]/5 p-8">
                <p className="text-sm font-medium text-amber-400/90">Most popular</p>
                <h3 className="mt-2 text-xl font-bold text-[#00ff41]">Nuka-Cola</h3>
                <p className="mt-2 text-3xl font-bold text-[#00ff41]">$0<span className="text-lg font-normal text-green-500/70">/mo</span></p>
                <p className="mt-4 text-sm text-green-400/80">Same as Free, but with a cold one. (Still $0.)</p>
                <ul className="mt-6 space-y-3 text-sm text-green-400/80">
                  <li>• Everything in Free</li>
                  <li>• Good vibes</li>
                  <li>• No actual Nuka-Cola</li>
                </ul>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 block w-full rounded border-2 border-[#00ff41] bg-[#00ff41]/10 py-3 text-center font-semibold text-[#00ff41] hover:bg-[#00ff41]/20"
                >
                  Install Now
                </a>
              </div>
              <div className="rounded-xl border-2 border-green-700/60 bg-[#0d2818]/80 p-8">
                <h3 className="text-xl font-bold text-[#00ff41]">Vault-Tec Approved</h3>
                <p className="mt-2 text-3xl font-bold text-amber-400">Contact Us</p>
                <p className="mt-4 text-sm text-green-400/80">Enterprise. Dedicated overseer. SLA. (It&apos;s still open source.)</p>
                <ul className="mt-6 space-y-3 text-sm text-green-400/80">
                  <li>• Everything in Nuka-Cola</li>
                  <li>• Custom vault integration</li>
                  <li>• We send you a Pip-Boy sticker</li>
                </ul>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 block w-full rounded border-2 border-amber-500/60 bg-amber-950/30 py-3 text-center font-semibold text-amber-400 hover:bg-amber-900/30"
                >
                  View on GitHub
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="resources" className="border-t border-green-800/50 bg-green-950/10 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-3xl font-bold text-[#00ff41]">Frequently Asked Questions</h2>
            <dl className="mt-12 space-y-8">
              {[
                { q: 'What is TunnelBoy?', a: 'TunnelBoy is an AWS VPC tunneling CLI for macOS. It uses SSM Session Manager to create secure tunnels to RDS, OpenSearch, and EC2—with optional jump hosts—and includes an interactive Pip-Boy themed TUI. Install via Homebrew.' },
                { q: 'Why Pip-Boy theme?', a: 'Because terminals can be fun. The interactive UI uses a Fallout-style Pip-Boy aesthetic for selecting RDS instances, OpenSearch domains, and EC2 instances. TunnelBoy is not affiliated with Bethesda; Pip-Boy is a trademark.' },
                { q: 'What do I need?', a: 'macOS (Intel or Apple Silicon), AWS CLI configured with profiles, and the Session Manager Plugin (brew install --cask session-manager-plugin). AWS SSO is supported.' },
                { q: 'How do I install?', a: 'Run: brew tap adamw2/tunnelboy && brew install tunnelboy. See the GitHub README for verification and shell completion setup.' },
                { q: 'Where do I get help?', a: 'Open an issue or check the README on GitHub. The docs cover profiles, jump hosts, connection presets, RDS IAM auth, and OpenSearch signing proxy.' },
              ].map((faq) => (
                <div key={faq.q}>
                  <dt className="text-lg font-semibold text-[#00ff41]">{faq.q}</dt>
                  <dd className="mt-2 text-green-400/90">{faq.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl rounded-2xl border-2 border-[#00ff41]/50 bg-[#0d2818] px-6 py-16 text-center sm:px-12">
            <h2 className="text-2xl font-bold text-[#00ff41] sm:text-3xl">
              Ready to Tunnel the Wasteland?
            </h2>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded border-2 border-[#00ff41] bg-[#00ff41]/10 px-8 py-4 text-center font-semibold text-[#00ff41] hover:bg-[#00ff41]/20 sm:w-auto"
              >
                View on GitHub
              </a>
              <a
                href={`${GITHUB_URL}#installation`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded border-2 border-amber-500/60 px-8 py-4 text-center font-semibold text-amber-400 hover:bg-amber-900/30 sm:w-auto"
              >
                Install via Homebrew
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-green-800/50 bg-green-950/20 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <Link href="/tunnelboy" className="flex items-center gap-2">
                <Image src="/tunnelboy-logo.png" alt="TunnelBoy" width={160} height={42} className="h-10 w-auto" />
              </Link>
              <p className="mt-2 text-sm text-green-500/80">
                Vault-grade AWS tunneling. Pip-Boy themed. MIT License.
              </p>
            </div>
            <div className="flex flex-wrap gap-6 text-sm">
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="text-green-400/90 hover:text-[#00ff41]">
                GitHub
              </a>
              <Link href="#pricing" className="text-green-400/90 hover:text-[#00ff41]">
                Pricing
              </Link>
              <Link href="#about" className="text-green-400/90 hover:text-[#00ff41]">
                About
              </Link>
              <Link href="#resources" className="text-green-400/90 hover:text-[#00ff41]">
                FAQs
              </Link>
            </div>
          </div>
          <div className="mt-12 border-t border-green-800/50 pt-8">
            <p className="text-xs text-green-600/80">
              TunnelBoy is not affiliated with Bethesda. Pip-Boy is a trademark. Use AWS responsibly.
            </p>
            <p className="mt-4 text-xs text-green-600/80">© 2026 TunnelBoy. MIT License.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
