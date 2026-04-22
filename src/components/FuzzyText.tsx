import { Children, useEffect, useRef, type ReactNode } from 'react';

interface FuzzyTextProps {
  children: ReactNode;
  fontSize?: number | string;
  fontWeight?: string | number;
  fontFamily?: string;
  color?: string;
  enableHover?: boolean;
  baseIntensity?: number;
  hoverIntensity?: number;
  fuzzRange?: number;
  fps?: number;
  letterSpacing?: number;
  className?: string;
}

type FuzzyCanvas = HTMLCanvasElement & { cleanupFuzzyText?: () => void };

const parseCssNumber = (value: string | null | undefined, fallback: number): number => {
  const parsed = Number.parseFloat(value ?? '');
  return Number.isFinite(parsed) ? parsed : fallback;
};

const resolveFontSizePx = (value: number | string): number => {
  if (typeof value === 'number') return value;

  const temp = document.createElement('span');
  temp.textContent = 'M';
  temp.style.position = 'absolute';
  temp.style.visibility = 'hidden';
  temp.style.pointerEvents = 'none';
  temp.style.fontSize = value;
  document.body.appendChild(temp);

  const computedSize = window.getComputedStyle(temp).fontSize;
  document.body.removeChild(temp);

  const parsed = parseFloat(computedSize);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 16;
};

const FuzzyText = ({
  children,
  fontSize,
  fontWeight,
  fontFamily,
  color = '#fff',
  enableHover = true,
  baseIntensity,
  hoverIntensity,
  fuzzRange = 30,
  fps = 60,
  letterSpacing,
  className = ''
}: FuzzyTextProps) => {
  const canvasRef = useRef<FuzzyCanvas>(null);

  useEffect(() => {
    let animationFrameId = 0;
    let isCancelled = false;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const init = async () => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const canvasStyles = window.getComputedStyle(canvas);

  const resolvedFontFamily = (fontFamily ?? canvasStyles.fontFamily) || 'sans-serif';
  const resolvedFontWeight = (fontWeight ?? canvasStyles.fontWeight) || 900;
  const resolvedFontSize = (fontSize ?? canvasStyles.fontSize) || 96;
      const resolvedLetterSpacing =
        letterSpacing ?? parseCssNumber(canvasStyles.letterSpacing, 0);
      const resolvedBaseIntensity =
        baseIntensity ?? parseCssNumber(canvasStyles.getPropertyValue('--fuzzy-base-intensity'), 0.18);
      const resolvedHoverIntensity =
        hoverIntensity ?? parseCssNumber(canvasStyles.getPropertyValue('--fuzzy-hover-intensity'), 0.5);

      const numericFontSize = resolveFontSizePx(resolvedFontSize);
      const fontSizeStr = `${numericFontSize}px`;
      const fontString = `${resolvedFontWeight} ${fontSizeStr} ${resolvedFontFamily}`;

      try {
        await document.fonts.load(fontString);
      } catch {
        await document.fonts.ready;
      }

      if (isCancelled) return;

      const text = Children.toArray(children).join('');
      const offscreen = document.createElement('canvas');
      const offCtx = offscreen.getContext('2d');
      if (!offCtx || !text) return;

      offCtx.font = fontString;
      offCtx.textBaseline = 'alphabetic';

      let totalWidth = offCtx.measureText(text).width;
      if (resolvedLetterSpacing !== 0) {
        totalWidth = 0;
        for (const char of text) {
          totalWidth += offCtx.measureText(char).width + resolvedLetterSpacing;
        }
        totalWidth -= resolvedLetterSpacing;
      }

      const metrics = offCtx.measureText(text);
      const actualLeft = metrics.actualBoundingBoxLeft ?? 0;
      const actualRight =
        resolvedLetterSpacing !== 0 ? totalWidth : metrics.actualBoundingBoxRight ?? metrics.width;
      const actualAscent = metrics.actualBoundingBoxAscent ?? numericFontSize;
      const actualDescent = metrics.actualBoundingBoxDescent ?? numericFontSize * 0.2;

      const textBoundingWidth = Math.ceil(
        resolvedLetterSpacing !== 0 ? totalWidth : actualLeft + actualRight
      );
      const tightHeight = Math.ceil(actualAscent + actualDescent);

      const horizontalMargin = fuzzRange + 20;
      const verticalMargin = 6;
      const extraWidthBuffer = 10;
      const offscreenWidth = textBoundingWidth + extraWidthBuffer;
      const xOffset = extraWidthBuffer / 2;

      offscreen.width = offscreenWidth;
      offscreen.height = tightHeight;

      offCtx.font = fontString;
      offCtx.textBaseline = 'alphabetic';
      offCtx.fillStyle = color;

      if (resolvedLetterSpacing !== 0) {
        let xPos = xOffset;
        for (const char of text) {
          offCtx.fillText(char, xPos, actualAscent);
          xPos += offCtx.measureText(char).width + resolvedLetterSpacing;
        }
      } else {
        offCtx.fillText(text, xOffset - actualLeft, actualAscent);
      }

      canvas.width = offscreenWidth + horizontalMargin * 2;
      canvas.height = tightHeight + verticalMargin * 2;
      ctx.translate(horizontalMargin, verticalMargin);

      const interactiveLeft = horizontalMargin + xOffset;
      const interactiveTop = verticalMargin;
      const interactiveRight = interactiveLeft + textBoundingWidth;
      const interactiveBottom = interactiveTop + tightHeight;

      let isHovering = false;
      let lastFrameTime = 0;
      const frameDuration = 1000 / fps;

      const run = (timestamp: number) => {
        if (isCancelled) return;

        if (timestamp - lastFrameTime < frameDuration) {
          animationFrameId = window.requestAnimationFrame(run);
          return;
        }
        lastFrameTime = timestamp;

  const intensity = enableHover && isHovering ? resolvedHoverIntensity : resolvedBaseIntensity;

        ctx.clearRect(
          -fuzzRange - 20,
          -fuzzRange - 10,
          offscreenWidth + 2 * (fuzzRange + 20),
          tightHeight + 2 * (fuzzRange + 10)
        );

        for (let j = 0; j < tightHeight; j++) {
          const dx = Math.floor(intensity * (Math.random() - 0.5) * fuzzRange);
          ctx.drawImage(offscreen, 0, j, offscreenWidth, 1, dx, j, offscreenWidth, 1);
        }

        animationFrameId = window.requestAnimationFrame(run);
      };

      const isInsideTextArea = (x: number, y: number) =>
        x >= interactiveLeft && x <= interactiveRight && y >= interactiveTop && y <= interactiveBottom;

      const handleMouseMove = (event: MouseEvent) => {
        if (!enableHover) return;
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        isHovering = isInsideTextArea(x, y);
      };

      const handleMouseLeave = () => {
        isHovering = false;
      };

      if (enableHover) {
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);
      }

      animationFrameId = window.requestAnimationFrame(run);

      const cleanup = () => {
        window.cancelAnimationFrame(animationFrameId);
        if (enableHover) {
          canvas.removeEventListener('mousemove', handleMouseMove);
          canvas.removeEventListener('mouseleave', handleMouseLeave);
        }
      };

      canvas.cleanupFuzzyText = cleanup;
    };

    init();

    return () => {
      isCancelled = true;
      window.cancelAnimationFrame(animationFrameId);
      canvas.cleanupFuzzyText?.();
    };
  }, [
    children,
    fontSize,
    fontWeight,
    fontFamily,
    color,
    enableHover,
    baseIntensity,
    hoverIntensity,
    fuzzRange,
    fps,
    letterSpacing
  ]);

  return <canvas ref={canvasRef} className={className} />;
};

export default FuzzyText;