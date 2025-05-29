import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getDailyMystery, getDailyMysteryProgress, getTimeUntilNextMystery, hasCompletedDailyMystery, type DailyMystery } from '@/lib/daily-mystery';

interface DailyMysteryProps {
  discoveredSymbols: string[];
  onHintClick?: () => void;
}

export function DailyMysteryCard({ discoveredSymbols = [], onHintClick }: DailyMysteryProps) {
  const mystery = getDailyMystery();
  const progress = getDailyMysteryProgress();
  const isCompleted = hasCompletedDailyMystery(discoveredSymbols);
  const timeUntilNext = getTimeUntilNextMystery();
  
  // Show progress: how many required symbols have been discovered
  const discoveredCount = mystery.solution.filter(symbol => discoveredSymbols.includes(symbol)).length;
  const totalRequired = mystery.solution.length;

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl shadow-sm border border-purple-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-800 flex items-center">
          <span className="text-purple-500 mr-2">🎁</span>
          Daily Mystery
        </h3>
        <div className="flex items-center space-x-2">
          {progress.streak > 0 && (
            <Badge variant="secondary" className="bg-purple-100 text-purple-700">
              {progress.streak} day streak
            </Badge>
          )}
          {isCompleted && (
            <Badge className="bg-green-500 text-white">
              ✓ Solved
            </Badge>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {!isCompleted ? (
          <>
            <div className="text-center p-4 bg-white/50 rounded-lg border border-purple-100">
              <div className="text-2xl mb-2">🤔</div>
              <p className="text-lg font-medium text-purple-800 mb-2">
                "{mystery.hint}"
              </p>
              <p className="text-sm text-muted mb-3">
                Solve today's mystery to unlock a special symbol
              </p>
              
              {/* Progress indicator */}
              <div className="flex items-center justify-center space-x-2 mt-3">
                <span className="text-sm text-purple-600">Progress:</span>
                <div className="flex space-x-1">
                  {mystery.solution.map((symbol, index) => (
                    <div
                      key={index}
                      className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center text-xs",
                        discoveredSymbols.includes(symbol)
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-400"
                      )}
                    >
                      {discoveredSymbols.includes(symbol) ? "✓" : "?"}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-purple-600">
                  {discoveredCount}/{totalRequired}
                </span>
              </div>
            </div>

          </>
        ) : (
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-2xl">🌟</span>
              <span className="text-xl font-bold text-green-800">Mystery Solved!</span>
              <span className="text-2xl">🌟</span>
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-2xl">{mystery.reward}</span>
              <span className="font-medium text-green-700">Cosmic Awakening</span>
            </div>
            <p className="text-sm text-green-600 italic leading-relaxed">
              {mystery.description}
            </p>
            <div className="mt-2 text-xs text-green-500">
              ✨ Special symbol unlocked ✨
            </div>
          </div>
        )}

        <div className="text-center text-xs text-muted">
          Next mystery in {timeUntilNext}
        </div>
      </div>
    </div>
  );
}