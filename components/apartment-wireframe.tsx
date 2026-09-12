'use client'

import { useEffect, useRef, useState } from 'react'

type Vec3 = [number, number, number]
type Segment = { a: Vec3; b: Vec3; bronze: boolean }

const CREAM: Vec3 = [0.94, 0.91, 0.85]
const BRONZE: Vec3 = [0.725, 0.553, 0.341]

/** Axonometric wireframe cutaway of an apartment, listed as ordered segments. */
function getSegments(): Segment[] {
  const segs: Segment[] = []
  const line = (a: Vec3, b: Vec3, bronze = false) => segs.push({ a, b, bronze })
  const box = (min: Vec3, max: Vec3) => {
    const [x0, y0, z0] = min
    const [x1, y1, z1] = max
    const c: Vec3[] = [
      [x0, y0, z0],
      [x1, y0, z0],
      [x1, y0, z1],
      [x0, y0, z1],
      [x0, y1, z0],
      [x1, y1, z0],
      [x1, y1, z1],
      [x0, y1, z1],
    ]
    const e: [number, number][] = [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 4],
      [0, 4],
      [1, 5],
      [2, 6],
      [3, 7],
    ]
    for (const [i, j] of e) line(c[i], c[j])
  }

  const X = 3.2
  const Z = 2.2
  const H = 1.7

  // --- Floor outline ---
  line([-X, 0, -Z], [X, 0, -Z])
  line([X, 0, -Z], [X, 0, Z])
  line([X, 0, Z], [-X, 0, Z])
  line([-X, 0, Z], [-X, 0, -Z])

  // --- Walls ---
  // perimeter corner verticals
  line([-X, 0, -Z], [-X, H, -Z])
  line([X, 0, -Z], [X, H, -Z])
  line([X, 0, Z], [X, H, Z])
  line([-X, 0, Z], [-X, H, Z])
  // top perimeter
  line([-X, H, -Z], [X, H, -Z])
  line([X, H, -Z], [X, H, Z])
  line([X, H, Z], [-X, H, Z])
  line([-X, H, Z], [-X, H, -Z])
  // interior partition along z = 0 (with door gap between x -1.4 and -0.6)
  line([-X, 0, 0], [-1.4, 0, 0])
  line([-0.6, 0, 0], [0.4, 0, 0])
  line([-X, H, 0], [0.4, H, 0])
  line([-X, 0, 0], [-X, H, 0])
  line([0.4, 0, 0], [0.4, H, 0])
  // perpendicular partition x = 0.4 toward front
  line([0.4, 0, 0], [0.4, 0, Z])
  line([0.4, H, 0], [0.4, H, Z])
  // furniture volumes
  box([-2.8, 0, 0.5], [-1.1, 0.5, 1.8]) // sofa
  box([1.3, 0, -1.9], [2.9, 0.85, -1.4]) // counter

  // --- Openings (bronze) ---
  // door frame in the partition gap
  line([-1.4, 0, 0], [-1.4, 1.4, 0], true)
  line([-0.6, 0, 0], [-0.6, 1.4, 0], true)
  line([-1.4, 1.4, 0], [-0.6, 1.4, 0], true)
  // window on back wall (z = -Z)
  line([1.0, 0.7, -Z], [2.4, 0.7, -Z], true)
  line([2.4, 0.7, -Z], [2.4, 1.4, -Z], true)
  line([2.4, 1.4, -Z], [1.0, 1.4, -Z], true)
  line([1.0, 1.4, -Z], [1.0, 0.7, -Z], true)
  // window on right wall (x = X)
  line([X, 0.7, -0.8], [X, 0.7, 0.8], true)
  line([X, 0.7, 0.8], [X, 1.4, 0.8], true)
  line([X, 1.4, 0.8], [X, 1.4, -0.8], true)
  line([X, 1.4, -0.8], [X, 0.7, -0.8], true)

  return segs
}

function projectIso(x: number, y: number, z: number) {
  const s = 42
  return {
    sx: 300 + (x - z) * s * 0.87,
    sy: 235 + ((x + z) * s * 0.5 - y * s),
  }
}

function StaticSvg() {
  const segs = getSegments()
  return (
    <svg
      viewBox="0 0 600 420"
      className="h-full w-full"
      role="img"
      aria-label="Axonometrische Strichzeichnung eines Wohnungsgrundrisses mit Wänden, Tür und Fenstern"
    >
      {segs.map((seg, i) => {
        const p1 = projectIso(...seg.a)
        const p2 = projectIso(...seg.b)
        return (
          <line
            key={i}
            x1={p1.sx}
            y1={p1.sy}
            x2={p2.sx}
            y2={p2.sy}
            stroke={seg.bronze ? '#b98d57' : '#e7e2d6'}
            strokeWidth={seg.bronze ? 1.4 : 1}
            strokeOpacity={seg.bronze ? 0.95 : 0.7}
          />
        )
      })}
    </svg>
  )
}

export function ApartmentWireframe() {
  const mountRef = useRef<HTMLDivElement | null>(null)
  const [useSvg, setUseSvg] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setUseSvg(true)
      return
    }

    let disposed = false
    // three imported inside the effect so no WebGL touches the server
    let cleanup = () => {}

    import('three').then((THREE) => {
      const mount = mountRef.current
      if (disposed || !mount) return

      const segs = getSegments()
      const positions: number[] = []
      const colors: number[] = []
      for (const seg of segs) {
        positions.push(...seg.a, ...seg.b)
        const c = seg.bronze ? BRONZE : CREAM
        colors.push(...c, ...c)
      }
      const vertexCount = positions.length / 3

      let w = mount.clientWidth
      let h = mount.clientHeight

      const narrow = () => window.innerWidth < 1040

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, narrow() ? 1.5 : 2))
      renderer.setSize(w, h)
      mount.appendChild(renderer.domElement)

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(narrow() ? 44 : 34, w / h, 0.1, 100)
      camera.position.set(0, 0, narrow() ? 12.5 : 9.8)
      camera.lookAt(0, 0, 0)

      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
      geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
      geometry.center()
      geometry.setDrawRange(0, 0)

      const material = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.92,
      })
      const lines = new THREE.LineSegments(geometry, material)

      const group = new THREE.Group()
      group.rotation.x = 0.62
      group.add(lines)
      scene.add(group)

      let lastTime = performance.now()
      let drawProgress = 0
      let elapsed = 0
      let targetPX = 0
      let targetPY = 0
      let curPX = 0
      let curPY = 0
      let raf = 0
      let visible = false

      const onPointer = (e: PointerEvent) => {
        targetPX = (e.clientX / window.innerWidth) * 2 - 1
        targetPY = (e.clientY / window.innerHeight) * 2 - 1
      }

      const animate = () => {
        const now = performance.now()
        const delta = Math.min((now - lastTime) / 1000, 0.1)
        lastTime = now
        if (drawProgress < 1) {
          drawProgress = Math.min(1, drawProgress + delta / 2)
          let count = Math.floor(vertexCount * drawProgress)
          count -= count % 2
          geometry.setDrawRange(0, count)
        } else {
          elapsed += delta
        }
        curPX += (targetPX - curPX) * 0.045
        curPY += (targetPY - curPY) * 0.045
        group.rotation.y = -0.5 + Math.sin(elapsed * 0.2) * 0.12 + curPX * 0.22
        group.rotation.x = 0.62 + curPY * 0.08
        renderer.render(scene, camera)
        raf = requestAnimationFrame(animate)
      }

      const start = () => {
        if (raf) return
        lastTime = performance.now() // reset so a paused tab doesn't jump the draw-in
        raf = requestAnimationFrame(animate)
      }
      const stop = () => {
        if (raf) {
          cancelAnimationFrame(raf)
          raf = 0
        }
      }
      const evaluate = () => {
        if (visible && !document.hidden) start()
        else stop()
      }

      const observer = new IntersectionObserver(
        (entries) => {
          visible = entries[0]?.isIntersecting ?? false
          evaluate()
        },
        { threshold: 0.05 },
      )
      observer.observe(mount)

      const onVisibility = () => evaluate()
      const onResize = () => {
        if (!mountRef.current) return
        w = mountRef.current.clientWidth
        h = mountRef.current.clientHeight
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, narrow() ? 1.5 : 2))
        renderer.setSize(w, h)
        camera.fov = narrow() ? 44 : 34
        camera.position.z = narrow() ? 12.5 : 9.8
        camera.aspect = w / h
        camera.updateProjectionMatrix()
      }

      document.addEventListener('visibilitychange', onVisibility)
      window.addEventListener('pointermove', onPointer, { passive: true })
      window.addEventListener('resize', onResize)

      renderer.render(scene, camera)

      cleanup = () => {
        stop()
        observer.disconnect()
        document.removeEventListener('visibilitychange', onVisibility)
        window.removeEventListener('pointermove', onPointer)
        window.removeEventListener('resize', onResize)
        geometry.dispose()
        material.dispose()
        renderer.dispose()
        if (renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement)
        }
      }
    })

    return () => {
      disposed = true
      cleanup()
    }
  }, [])

  return (
    <div
      className="h-[360px] w-full md:h-[520px]"
      aria-hidden={!useSvg}
    >
      {useSvg ? <StaticSvg /> : <div ref={mountRef} className="h-full w-full" />}
    </div>
  )
}

export function PlanBand() {
  return (
    <section className="relative bg-ink py-20 md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #b98d57 1px, transparent 1px), linear-gradient(to bottom, #b98d57 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />
      <div className="relative mx-auto grid max-w-[1240px] items-center gap-10 px-5 md:grid-cols-2 md:px-8">
        <div className="max-w-md">
          <p className="mb-5 text-[11px] uppercase tracking-[0.34em] text-bronze">
            Erst planen, dann abreißen
          </p>
          <h2 className="font-serif text-3xl leading-[1.1] text-cream md:text-4xl text-balance">
            Wir kennen den Grundriss, bevor die erste Wand fällt.
          </h2>
          <p className="mt-6 text-[14.5px] leading-relaxed text-cream/70">
            Aufmaß, Leitungen, tragende Wände: Wir nehmen den Bestand vollständig auf, bevor wir
            anfangen. So gibt es später keine Überraschungen, die den Termin und den Preis
            sprengen.
          </p>
        </div>
        <ApartmentWireframe />
      </div>
    </section>
  )
}
