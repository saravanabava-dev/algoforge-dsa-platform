import { PRODUCT_NAME } from "../data/team.js";

export default function About() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">

      {/* Header */}
      <div className="max-w-3xl">
        <p className="label-eyebrow">About the Platform</p>

        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-forge-900 md:text-5xl">
          {PRODUCT_NAME} is an interactive DSA laboratory
        </h1>

        <p className="mt-5 text-base leading-7 text-forge-700 md:text-lg">
          An interactive Data Structures and Algorithms learning environment
          designed to help students understand concepts through visual learning,
          hands-on coding practice and structured progress.
        </p>
      </div>

     

      {/* Learning Journey */}
      <section className="mt-16">
        <div className="card overflow-hidden">
          <div className="p-8 md:p-10">

            <p className="label-eyebrow">Learning Journey</p>

            <h2 className="mt-3 font-display text-2xl font-bold text-forge-900 md:text-3xl">
              Learn → Visualize → Code → Practice
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-forge-600">
              {PRODUCT_NAME} follows a practical learning approach where
              students can first understand a concept, visualize how it works,
              write code and finally test their knowledge through problems and
              quizzes.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-4">

              <div className="rounded-xl border border-forge-200 p-5">
                <p className="text-sm font-semibold text-forge-500">01</p>
                <h3 className="mt-2 font-display font-semibold text-forge-900">
                  Understand
                </h3>
                <p className="mt-2 text-sm text-forge-600">
                  Build a strong foundation with clear explanations.
                </p>
              </div>

              <div className="rounded-xl border border-forge-200 p-5">
                <p className="text-sm font-semibold text-forge-500">02</p>
                <h3 className="mt-2 font-display font-semibold text-forge-900">
                  Visualize
                </h3>
                <p className="mt-2 text-sm text-forge-600">
                  See algorithms and data structures in action.
                </p>
              </div>

              <div className="rounded-xl border border-forge-200 p-5">
                <p className="text-sm font-semibold text-forge-500">03</p>
                <h3 className="mt-2 font-display font-semibold text-forge-900">
                  Code
                </h3>
                <p className="mt-2 text-sm text-forge-600">
                  Apply what you learn by writing programs.
                </p>
              </div>

              <div className="rounded-xl border border-forge-200 p-5">
                <p className="text-sm font-semibold text-forge-500">04</p>
                <h3 className="mt-2 font-display font-semibold text-forge-900">
                  Practice
                </h3>
                <p className="mt-2 text-sm text-forge-600">
                  Solve problems and measure your progress.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Built for Students */}
      <section className="mt-16">
        <div className="grid items-center gap-8 md:grid-cols-2">

          <div>
            <p className="label-eyebrow">Built for Students</p>

            <h2 className="mt-3 font-display text-3xl font-bold text-forge-900">
              A focused environment for mastering DSA.
            </h2>

            <p className="mt-4 leading-7 text-forge-600">
              The platform brings learning material, visualizations, coding
              practice, quizzes and progress tracking together in one place.
            </p>
          </div>

          <div className="card p-7">
            <div className="grid grid-cols-2 gap-4">

              <div className="rounded-xl bg-forge-50 p-5">
                <p className="font-display text-2xl font-bold text-forge-900">
                  16
                </p>
                <p className="mt-1 text-sm text-forge-600">
                  DSA Modules
                </p>
              </div>

              <div className="rounded-xl bg-forge-50 p-5">
                <p className="font-display text-2xl font-bold text-forge-900">
                  24/7
                </p>
                <p className="mt-1 text-sm text-forge-600">
                  Learning Access
                </p>
              </div>

              <div className="rounded-xl bg-forge-50 p-5">
                <p className="font-display text-2xl font-bold text-forge-900">
                  Interactive
                </p>
                <p className="mt-1 text-sm text-forge-600">
                  Visual Learning
                </p>
              </div>

              <div className="rounded-xl bg-forge-50 p-5">
                <p className="font-display text-2xl font-bold text-forge-900">
                  Offline
                </p>
                <p className="mt-1 text-sm text-forge-600">
                  College Lab Ready
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

    </div>
  );
}