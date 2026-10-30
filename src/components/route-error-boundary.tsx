import { Component, type ReactNode } from "react";

interface State {
  error: Error | null;
}

/**
 * Keeps one broken page from blanking the whole site: a crash while rendering
 * shows a message with a way out instead of a black screen. On the dev server
 * it also prints the error, so the cause is visible right on the page.
 */
export class RouteErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error) {
    console.error("Page failed to render:", error);
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <section role="alert" className="flex min-h-screen flex-col items-center justify-center gap-6 px-5 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-tone/70">Signal interrupted</p>
        <h1 className="text-4xl font-semibold tracking-[-0.04em] text-white md:text-6xl">This page didn't load.</h1>
        <p className="max-w-md text-slate-300">Please reload, or head back to the surface.</p>
        {import.meta.env.DEV && (
          <pre className="max-w-2xl whitespace-pre-wrap break-words rounded-xl border border-red-400/30 bg-red-500/5 p-4 text-left font-mono text-xs text-red-200">
            {this.state.error.message}
          </pre>
        )}
        <div className="flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-full bg-white px-6 py-3 text-sm font-medium text-slate-950 transition-colors hover:bg-slate-200"
          >
            Reload
          </button>
          <a href="/" className="rounded-full border border-white/20 px-6 py-3 text-sm text-white transition-colors hover:border-white/50">
            Back to Home
          </a>
        </div>
      </section>
    );
  }
}
