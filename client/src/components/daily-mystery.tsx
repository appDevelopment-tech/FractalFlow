import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getDailyMystery, getDailyMysteryProgress, getTimeUntilNextMystery, type DailyMystery } from '@/lib/daily-mystery';

interface DailyMysteryProps {
  discoveredSymbols: string[];
  onHintClick?: () => void;
}

export function DailyMysteryCard({ discoveredSymbols = [], onHintClick }: DailyMysteryProps) {
  const mystery = getDailyMystery();
  const progress = getDailyMysteryProgress();
  const isCompleted = discoveredSymbols.includes(mystery.reward);
  const timeUntilNext = getTimeUntilNextMystery();

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
              <p className="text-sm text-muted">
                Solve today's mystery to unlock a special symbol
              </p>
            </div>
            

          </>
        ) : (
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
            <div className="text-4xl mb-2">{mystery.reward}</div>
            <p className="font-medium text-green-800 mb-1">
              Mystery Solved!
            </p>
            <p className="text-sm text-green-700">
              {mystery.description}
            </p>
          </div>
        )}

        <div className="text-center text-xs text-muted">
          Next mystery in {timeUntilNext}
        </div>
      </div>
    </div>
  );
}