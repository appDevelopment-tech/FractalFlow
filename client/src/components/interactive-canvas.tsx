import React, { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Point {
  x: number;
  y: number;
  id: string;
}

interface Line {
  start: Point;
  end: Point;
  curve?: Point; // Mid-point for curved lines
  id: string;
  type: 'straight' | 'curved';
}

interface InteractiveCanvasProps {
  onSymbolCreated: (symbol: string) => void;
  onClear: () => void;
}

export function InteractiveCanvas({ onSymbolCreated, onClear }: InteractiveCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [points, setPoints] = useState<Point[]>([]);
  const [lines, setLines] = useState<Line[]>([]);
  const [dragging, setDragging] = useState<{ type: 'point' | 'line' | 'curve', id: string } | null>(null);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);

  const handleCanvasClick = useCallback((e: React.MouseEvent) => {
    if (dragging) return;
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Create a new point
    const newPoint: Point = {
      x,
      y,
      id: `point-${Date.now()}`
    };
    
    setPoints(prev => [...prev, newPoint]);
    onSymbolCreated('·'); // Created a dot
  }, [dragging, onSymbolCreated]);

  const handleMouseDown = useCallback((e: React.MouseEvent, point: Point) => {
    e.stopPropagation();
    setDragging({ type: 'point', id: point.id });
    setDragStart({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragging || !dragStart || !canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;
    
    if (dragging.type === 'point') {
      const point = points.find(p => p.id === dragging.id);
      if (!point) return;
      
      const distance = Math.sqrt(
        Math.pow(currentX - point.x, 2) + Math.pow(currentY - point.y, 2)
      );
      
      // If dragged far enough, create a line
      if (distance > 30) {
        const newLine: Line = {
          start: point,
          end: { x: currentX, y: currentY, id: `end-${Date.now()}` },
          id: `line-${Date.now()}`,
          type: 'straight'
        };
        
        setLines(prev => [...prev, newLine]);
        
        // Determine line type based on direction
        const deltaX = Math.abs(currentX - point.x);
        const deltaY = Math.abs(currentY - point.y);
        
        if (deltaX > deltaY) {
          onSymbolCreated('—'); // Horizontal line
        } else {
          onSymbolCreated('|'); // Vertical line
        }
        
        setDragging(null);
        setDragStart(null);
      }
    }
  }, [dragging, dragStart, points, onSymbolCreated]);

  const handleMouseUp = useCallback(() => {
    setDragging(null);
    setDragStart(null);
  }, []);

  const handleLineCurve = useCallback((line: Line, e: React.MouseEvent) => {
    e.stopPropagation();
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Add curve point at middle of line
    const curvePoint = { x, y, id: `curve-${Date.now()}` };
    
    setLines(prev => prev.map(l => 
      l.id === line.id 
        ? { ...l, curve: curvePoint, type: 'curved' as const }
        : l
    ));
    
    onSymbolCreated('∼'); // Created a curved line
  }, [onSymbolCreated]);

  const clearCanvas = useCallback(() => {
    setPoints([]);
    setLines([]);
    onClear();
  }, [onClear]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-800">Interactive Creation</h3>
        <Button onClick={clearCanvas} variant="outline" size="sm">
          Clear Canvas
        </Button>
      </div>
      
      <div 
        ref={canvasRef}
        className="relative w-full h-96 bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-lg border-2 border-dashed border-slate-300 cursor-crosshair overflow-hidden"
        onClick={handleCanvasClick}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Instructions */}
        {points.length === 0 && lines.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-slate-500">
            <div className="text-center">
              <div className="text-lg font-medium mb-2">Create from Nothing</div>
              <div className="text-sm">Click to place a point, drag to extend into lines</div>
              <div className="text-xs mt-1">Click middle of lines to make them curved</div>
            </div>
          </div>
        )}
        
        {/* Render lines */}
        {lines.map(line => (
          <svg
            key={line.id}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 1 }}
          >
            {line.type === 'straight' ? (
              <line
                x1={line.start.x}
                y1={line.start.y}
                x2={line.end.x}
                y2={line.end.y}
                stroke="rgb(59 130 246)"
                strokeWidth="3"
                className="pointer-events-auto cursor-pointer"
                onClick={(e) => handleLineCurve(line, e as any)}
              />
            ) : line.curve ? (
              <path
                d={`M ${line.start.x} ${line.start.y} Q ${line.curve.x} ${line.curve.y} ${line.end.x} ${line.end.y}`}
                stroke="rgb(147 51 234)"
                strokeWidth="3"
                fill="none"
                className="pointer-events-auto"
              />
            ) : null}
          </svg>
        ))}
        
        {/* Render points */}
        {points.map(point => (
          <div
            key={point.id}
            className={cn(
              "absolute w-4 h-4 bg-blue-500 rounded-full cursor-grab transform -translate-x-2 -translate-y-2",
              "hover:bg-blue-600 hover:scale-110 transition-all duration-200",
              "border-2 border-white shadow-sm"
            )}
            style={{ left: point.x, top: point.y, zIndex: 2 }}
            onMouseDown={(e) => handleMouseDown(e, point)}
          />
        ))}
        
        {/* Visual feedback during drag */}
        {dragging && dragStart && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded absolute top-2 left-2">
              Drag to extend into a line...
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-4 text-xs text-slate-500 text-center space-y-1">
        <div>• Click empty space to create points (·)</div>
        <div>• Drag points to create lines (— or |)</div>
        <div>• Click middle of lines to curve them (∼)</div>
      </div>
    </div>
  );
}