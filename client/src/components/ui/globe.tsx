import { useEffect, useRef } from 'react';
import createGlobe, { type Globe } from 'cobe';

import type { Marker } from '@/types/globe';
import { cn } from '@/lib/utils';

interface GlobeProps {
  markers: Marker[];
  className?: string;
}

export function Globe({ markers, className }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const globeRef = useRef<Globe | null>(null);
  const markersRef = useRef(markers);

  useEffect(() => {
    markersRef.current = markers;

    if (!globeRef.current) return;

    globeRef.current.update({
      markers: markers.map((m) => ({
        id: m.id,
        location: m.location,
        size: 0.02,
      })),
    });
  }, [markers]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let phi = 0;
    let theta = 0.2;

    let isDragging = false;
    let lastX = 0;
    let lastY = 0;

    let rafId: number;
    let destroyed = false;

    const globe = createGlobe(canvas, {
      width: canvas.offsetWidth * 2,
      height: canvas.offsetWidth * 2,
      devicePixelRatio: 2,
      mapSamples: 16000,
      phi,
      theta,
      mapBrightness: 1,
      dark: 0,
      diffuse: 0.2,
      baseColor: [1, 1, 1],
      glowColor: [0.8, 0.8, 0.8],
      markerElevation: 0,
      markerColor: [0, 0.5, 0.8],
      markers: markers.map((m) => ({
        id: m.id,
        location: m.location,
        size: 0.02,
      })),
    });
    globeRef.current = globe;

    function update() {
      if (!globeRef.current || destroyed) return;

      globeRef.current.update({
        phi,
        theta,
        markers: markersRef.current.map((m) => ({
          id: m.id,
          location: m.location,
          size: 0.02,
        })),
      });
    }

    function onPointerDown(e: PointerEvent) {
      isDragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
    }

    function onPointerMove(e: PointerEvent) {
      if (!isDragging) return;

      const deltaX = e.clientX - lastX;
      const deltaY = e.clientY - lastY;

      lastX = e.clientX;
      lastY = e.clientY;

      phi += deltaX * 0.002;
      theta += deltaY * 0.002;
      theta = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, theta));

      update();
    }

    function onPointerUp() {
      isDragging = false;
    }

    canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    function animate() {
      if (!isDragging && !destroyed) {
        phi += 0.002;
        update();
      }

      rafId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      destroyed = true;

      cancelAnimationFrame(rafId);

      globeRef.current?.destroy();
      globeRef.current = null;

      canvas.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, []);

  return (
    <div
      className={cn(
        'hidden max-w-150 [@media(min-width:320px)]:block',
        className,
      )}
    >
      <canvas
        ref={canvasRef}
        className='w-full cursor-grab active:cursor-grabbing'
      />
      {markers.map((marker) => (
        <div
          key={marker.caption}
          className='translate bg-background shadow-muted-foreground pointer-events-none absolute mb-2 -translate-x-1/2 translate-y-0 rounded p-1.5 pb-3 shadow-2xl transition-[opacity,filter] duration-300'
          style={{
            left: 'anchor(center)',
            bottom: 'anchor(top)',
            transform: `rotate(${marker.rotate}deg)`,
            filter: `blur(calc((1 - var(--cobe-visible-${marker.id}, 0)) * 8px))`,
            positionAnchor: `--cobe-${marker.id}`,
            opacity: `var(--cobe-visible-${marker.id}, 0)`,
          }}
        >
          <img
            src={marker.image}
            alt={marker.caption}
            className='h-auto w-16 object-contain'
          />
          <p className='mt-2 w-16 text-center text-[10px] leading-[1.2] font-medium wrap-break-word'>
            {marker.caption}
          </p>
        </div>
      ))}
    </div>
  );
}
