import { NextResponse } from 'next/server';

export default async function Page() {
  return (
    <main className="min-h-screen bg-zinc-950">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b-zinc-900/10">
        <nav className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="text-xl font-bold bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
              Takahiro Motoyama
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <a href="/" className="relative py-2 text-sm font-medium transition-colors text-zinc-900 hover:text-teal-600">
                Home
                {`status === '/' && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-600 to-emerald-500"
                  />
                )}
              </a>
              <a href="/about" className="relative py-2 text-sm font-medium transition-colors text-zinc-500 hover:text-teal-600">
                About
                {`status === '/about' && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-600 to-emerald-500"
                  />
                )}
              </a>
              <a href="/philosophy" className="relative py-2 text-sm font-medium transition-colors text-zinc-500 hover:text-teal-600">
                Philosophy
                {`status === '/philosophy' && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-600 to-emerald-500"
                  />
                )}
              </a>
              <a href="/sessions" className="relative py-2 text-sm font-medium transition-colors text-zinc-500 hover:text-teal-600">
                Sessions
                {`status === '/sessions' && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-600 to-emerald-500"
                  />
                )}
              </a>
              <a href="/tasks" className="relative py-2 text-sm font-medium transition-colors text-zinc-500 hover:text-teal-600">
                Tasks
                {`status === '/tasks' && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-600 to-emerald-500"
                  />
                )}
              </a>
              <a href="/blog" className="relative py-2 text-sm font-medium transition-colors text-zinc-500 hover:text-teal-600">
                Blog
                {`status === '/blog' && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-600 to-emerald-500"
                  />
                )}
              </a>
              <a href="/contact" className="relative py-2 text-sm font-medium transition-colors text-zinc-500 hover:text-teal-600">
                Contact
                {`status === '/contact' && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-600 to-emerald-500"
                  />
                )}
              </a>
            </div>

            {/* External Links */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="https://ai-diagnosis-six.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-3 text-sm font-medium bg-gradient-to-r from-teal-600 to-emerald-500 text-white rounded-full hover:brightness-110 transition-all"
              >
                🤖 診断
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-zinc-500 hover:text-teal-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mt-4 pb-4 border-t border-zinc-900/10 pt-4"
          >
            <div className="flex flex-col gap-3">
              <a href="/" onClick={() => setIsMenuOpen(false)} className="py-2 text-sm font-medium transition-colors text-zinc-500 hover:text-teal-600">
                Home
              </a>
              <a href="/about" onClick={() => setIsMenuOpen(false)} className="py-2 text-sm font-medium transition-colors text-zinc-500 hover:text-teal-600">
                About
              </a>
              <a href="/philosophy" onClick={() => setIsMenuOpen(false)} className="py-2 text-sm font-medium transition-colors text-zinc-500 hover:text-teal-600">
                Philosophy
              </a>
              <a href="/sessions" onClick={() => setIsMenuOpen(false)} className="py-2 text-sm font-medium transition-colors text-zinc-500 hover:text-teal-600">
                Sessions
              </a>
              <a href="/tasks" onClick={() => setIsMenuOpen(false)} className="py-2 text-sm font-medium transition-colors text-zinc-500 hover:text-teal-600">
                Tasks
              </a>
              <a href="/blog" onClick={() => setIsMenuOpen(false)} className="py-2 text-sm font-medium transition-colors text-zinc-500 hover:text-teal-600">
                Blog
              </a>
              <a href="/contact" onClick={() => setIsMenuOpen(false)} className="py-2 text-sm font-medium transition-colors text-zinc-500 hover:text-teal-600">
                Contact
              </a>
            </div>
          </motion.div>
        )}
      </header>

      {/* Main Content */}
      <div className="pt-24">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 text-zinc-900">
            自己決定ダッシュボード
          </h1>
          <p className="text-lg text-zinc-600 mb-8">
            「自分のやり方を、自分のルールで」
          </p>

          {/* Progress Overview */}
          <div className="bg-white/20 backdrop-blur-xl rounded-xl p-8 border border-zinc-200 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-zinc-900">
              現在の進捗状況
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
              <div className="bg-gradient-to-r from-emerald-50 to-emerald-100/20 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-teal-600">Step 3</div>
                <div className="text-sm text-teal-500 font-medium">選択肢の評価</div>
                <div className="text-xs text-emerald-600 mt-2">50%</div>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-blue-100/20 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-blue-600">Step 4</div>
                <div className="text-sm text-blue-500 font-medium">価値観の確認</div>
                <div className="text-xs text-blue-600 mt-2">0%</div>
              </div>
              <div className="bg-gradient-to-r from-amber-50 to-amber-100/20 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-amber-600">Step 5</div>
                <div className="text-sm text-amber-500 font-medium">決定と実行</div>
                <div className="text-xs text-amber-600 mt-2">0%</div>
              </div>
              <div className="bg-gradient-to-r from-emerald-50 to-emerald-100/20 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-emerald-600">Step 6</div>
                <div className="text-sm text-emerald-500 font-medium">振り返しの学習</div>
                <div className="text-xs text-emerald-600 mt-2">0%</div>
              </div>
            </div>

            {/* Global Progress */}
            <div className="mt-8">
              <div className="flex items-center gap-4">
                <div className="flex-1 text-zinc-500">
                  <div className="text-sm text-zinc-600 font-medium mb-1">全体の進捗</div>
                  <div className="text-3xl font-bold text-zinc-900">33%</div>
                  <div className="text-xs text-zinc-500 mt-1">Step 3 of 6</div>
                </div>
                <div className="h-2 bg-zinc-200 rounded-full w-full max-w-2xl">
                  <div className="h-full bg-zinc-900 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Steps Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="flex flex-col gap-2">
              <button
                className="bg-white/20 backdrop-blur-xl rounded-xl p-6 border border-zinc-200 hover:border-teal-400 hover:scale-105 transition-all text-left"
                onClick={() => setActiveStep(1)}
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activeStep >= 1 ? 'bg-teal-600 text-white' : 'bg-zinc-200 text-zinc-400'
                  }`}>
                    1
                  </div>
                  <div>
                    <div className="font-bold text-zinc-900">現状の明確化</div>
                    <div className={`text-xs ${
                      activeStep >= 1 ? 'text-teal-500' : 'text-zinc-400'
                    }`}>
                      {activeStep >= 1 ? '完了' : '未完了'}
                    </div>
                  </div>
                </div>
              </button>
              <button
                className="bg-white/20 backdrop-blur-xl rounded-xl p-6 border border-zinc-200 hover:border-teal-400 hover:scale-105 transition-all text-left"
                onClick={() => setActiveStep(2)}
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activeStep >= 2 ? 'bg-teal-600 text-white' : 'bg-zinc-200 text-zinc-400'
                  }`}>
                    2
                  </div>
                  <div>
                    <div className="font-bold text-zinc-900">目標の設定</div>
                    <div className={`text-xs ${
                      activeStep >= 2 ? 'text-teal-500' : 'text-zinc-400'
                    }`}>
                      {activeStep >= 2 ? '完了' : '未完了'}
                    </div>
                  </div>
                </div>
              </button>
              <button
                className="bg-white/20 backdrop-blur-xl rounded-xl p-6 border border-zinc-200 hover:border-teal-400 hover:scale-105 transition-all text-left"
                onClick={() => setActiveStep(3)}
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activeStep >= 3 ? 'bg-teal-600 text-white' : 'bg-zinc-200 text-zinc-400'
                  }`}>
                    3
                  </div>
                  <div>
                    <div className="font-bold text-zinc-900">選択肢の評価</div>
                    <div className={`text-xs ${
                      activeStep >= 3 ? 'text-teal-500' : 'text-zinc-400'
                    }`}>
                      {activeStep >= 3 ? '完了' : '未完了'}
                    </div>
                  </div>
                </div>
              </button>
              <button
                className="bg-white/20 backdrop-blur-xl rounded-xl p-6 border border-zinc-200 hover:border-teal-400 hover:scale-105 transition-all text-left"
                onClick={() => setActiveStep(4)}
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activeStep >= 4 ? 'bg-teal-600 text-white' : 'bg-zinc-200 text-zinc-400'
                  }`}>
                    4
                  </div>
                  <div>
                    <div className="font-bold text-zinc-900">価値観の確認</div>
                    <div className={`text-xs ${
                      activeStep >= 4 ? 'text-teal-500' : 'text-zinc-400'
                    }`}>
                      {activeStep >= 4 ? '完了' : '未完了'}
                    </div>
                  </div>
                </div>
              </button>
              <button
                className="bg-white/20 backdrop-blur-xl rounded-xl p-6 border border-zinc-200 hover:border-teal-400 hover:scale-105 transition-all text-left"
                onClick={() => setActiveStep(5)}
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activeStep >= 5 ? 'bg-teal-600 text-white' : 'bg-zinc-200 text-zinc-400'
                  }`}>
                    5
                  </div>
                  <div>
                    <div className="font-bold text-zinc-900">決定と実行</div>
                    <div className={`text-xs ${
                      activeStep >= 5 ? 'text-teal-500' : 'text-zinc-400'
                    }`}>
                      {activeStep >= 5 ? '完了' : '未完了'}
                    </div>
                  </div>
                </div>
              </button>
              <button
                className="bg-white/20 backdrop-blur-xl rounded-xl p-6 border border-zinc-200 hover:border-teal-400 hover:scale-105 transition-all text-left"
                onClick={() => setActiveStep(6)}
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activeStep >= 6 ? 'bg-teal-600 text-white' : 'bg-zinc-200 text-zinc-400'
                  }`}>
                    6
                  </div>
                  <div>
                    <div className="font-bold text-zinc-900">振り返しの学習</div>
                    <div className={`text-xs ${
                      activeStep >= 6 ? 'text-teal-500' : 'text-zinc-400'
                    }`}>
                      {activeStep >= 6 ? '完了' : '未完了'}
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Question Script */}
          <div className="mt-8">
            <div className="bg-white/20 backdrop-blur-xl rounded-xl p-8 border border-zinc-200">
              <h2 className="text-2xl font-bold mb-4 text-zinc-900 flex items-center gap-3">
                <span>💡</span>
                問いかけ（Questioning Script）
              </h2>
              <p className="text-sm text-zinc-600 mb-6">
                迷った時に使える問いかけリストです。自分のルールを、自分のやり方で決定するために、事前に準備しておきましょう。
              </p>
              <div className="space-y-4">
                {/* Step 1: Situation Clarity */}
                <div className="border-l-2 border-zinc-200 rounded-lg p-6">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="flex-1 bg-emerald-500 text-white rounded-full h-6 w-6 flex items-center justify-center">
                      1
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-zinc-900">現状の明確化</div>
                      <div className="text-xs text-zinc-400">Step 1</div>
                    </div>
                  </div>
                  <div className="flex-1 flex-1">
                    <p className="text-base text-zinc-700 font-medium">現在の状況をどう理解していますか？</p>
                    <div className="mt-2 bg-zinc-50 rounded-lg p-4">
                      <p className="text-sm text-zinc-600 mb-2">
                        「何が起きているのか、客観的に言えますか？」
                      </p>
                      <p className="text-xs text-zinc-400 mb-2">
                        「何を決定する必要がありますか？」
                      </p>
                      <p className="text-xs text-zinc-400">
                        「どんな情報が不足していますか？」
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 2: Goal Setting */}
                <div className="border-l-2 border-zinc-200 rounded-lg p-6">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="flex-1 bg-emerald-500 text-white rounded-full h-6 w-6 flex items-center justify-center">
                      2
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-zinc-900">目標の設定</div>
                      <div className="text-xs text-zinc-400">Step 2</div>
                    </div>
                  </div>
                  <div className="flex-1 flex-1">
                    <p className="text-base text-zinc-700 font-medium">どんなゴールを目指しますか？</p>
                    <div className="mt-2 bg-zinc-50 rounded-lg p-4">
                      <p className="text-sm text-zinc-600 mb-2">
                        「そのゴールがあなたにとってなぜ重要ですか？」
                      </p>
                      <p className="text-xs text-zinc-400 mb-2">
                        「どのゴールを優先しますか？」
                      </p>
                      <p className="text-xs text-zinc-400">
                        「そのゴールを達成するための期間はどれくらいですか？」
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 3: Options Evaluation */}
                <div className="border-l-2 border-zinc-200 rounded-lg p-6">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="flex-1 bg-emerald-500 text-white rounded-full h-6 w-6 flex items-center justify-center">
                      3
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-zinc-900">選択肢の評価</div>
                      <div className="text-xs text-zinc-400">Step 3</div>
                    </div>
                  </div>
                  <div className="flex-1 flex-1">
                    <p className="text-base text-zinc-700 font-medium">どのような選択肢がありますか？</p>
                    <div className="mt-2 bg-zinc-50 rounded-lg p-4">
                      <p className="text-sm text-zinc-600 mb-2">
                        「選択肢Aのメリットとデメリットは何ですか？」
                      </p>
                      <p className="text-xs text-zinc-400 mb-2">
                        「選択肢Bのメリットとデメリットは何ですか？」
                      </p>
                      <p className="text-xs text-zinc-400 mb-2">
                        「どの選択肢が自分の価値観に最も合いますか？」
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 4: Values Confirmation */}
                <div className="border-l-2 border-zinc-200 rounded-lg p-6">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="flex-1 bg-emerald-500 text-white rounded-full h-6 w-6 flex items-center justify-center">
                      4
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-zinc-900">価値観の確認</div>
                      <div className="text-xs text-zinc-400">Step 4</div>
                    </div>
                  </div>
                  <div className="flex-1 flex-1">
                    <p className="text-base text-zinc-700 font-medium">自分の価値観は何ですか？</p>
                    <div className="mt-2 bg-zinc-50 rounded-lg p-4">
                      <p className="text-sm text-zinc-600 mb-2">
                        「成長」
                      </p>
                      <p className="text-xs text-zinc-400 mb-2">
                        「安定」
                      </p>
                      <p className="text-xs text-zinc-400 mb-2">
                        「自由」
                      </p>
                      <p className="text-xs text-zinc-400 mb-2">
                        「創造性」
                      </p>
                      <p className="text-xs text-zinc-400">
                        「スキルアップ」
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 5: Decision & Execution */}
                <div className="border-l-2 border-zinc-200 rounded-lg p-6">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="flex-1 bg-emerald-500 text-white rounded-full h-6 w-6 flex items-center justify-center">
                      5
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-zinc-900">決定と実行</div>
                      <div className="text-xs text-zinc-400">Step 5</div>
                    </div>
                  </div>
                  <div className="flex-1 flex-1">
                    <p className="text-base text-zinc-700 font-medium">どの選択肢を選びますか？</p>
                    <div className="mt-2 bg-zinc-50 rounded-lg p-4">
                      <p className="text-sm text-zinc-600 mb-2">
                        「選択肢A」
                      </p>
                      <p className="text-xs text-zinc-400 mb-2">
                        「選択肢B」
                      </p>
                      <p className="text-xs text-zinc-400 mb-2">
                        「選択肢C」
                      </p>
                    </div>
                    <div className="mt-4 bg-emerald-50 rounded-lg p-4">
                      <p className="text-sm text-teal-600 font-bold mb-2">
                        選んだ理由は何ですか？
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 6: Reflection & Learning */}
                <div className="border-l-2 border-zinc-200 rounded-lg p-6">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="flex-1 bg-emerald-500 text-white rounded-full h-6 w-6 flex items-center justify-center">
                      6
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-zinc-900">振り返しの学習</div>
                      <div className="text-xs text-zinc-400">Step 6</div>
                    </div>
                  </div>
                  <div className="flex-1 flex-1">
                    <p className="text-base text-zinc-700 font-medium">期待通りに行きましたか？</p>
                    <div className="mt-2 bg-zinc-50 rounded-lg p-4">
                      <p className="text-sm text-zinc-600 mb-2">
                        「期待通りに行きました」
                      </p>
                      <p className="text-xs text-zinc-400 mb-2">
                        「いえ、部分的に行きました」
                      </p>
                      <p className="text-xs text-zinc-400 mb-2">
                        「期待通りに行きませんでした」
                      </p>
                    </div>
                    <div className="mt-4 bg-emerald-50 rounded-lg p-4">
                      <p className="text-sm text-teal-600 font-bold mb-2">
                        何を学びましたか？
                      </p>
                    </div>
                    <div className="mt-2 bg-zinc-50 rounded-lg p-4">
                      <p className="text-sm text-zinc-600 mb-2">
                        「次回はどう改善できますか？」
                      </p>
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="mt-6 flex justify-center">
                  <button className="bg-emerald-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-600 transition-all">
                    保存して、次回へ進む
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-zinc-50 mt-24 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-zinc-600">
          <p className="text-sm mb-2">
            © 2026 Takahiro Motoyama. All rights reserved.
          </p>
          <p className="text-xs">
            「自分のやり方を、自分のルールで」
          </p>
        </div>
      </footer>
    </>
  );
}

export const metadata = {
  title: 'Self-Determination Dashboard',
  description: 'Dashboard for self-determination process',
};
