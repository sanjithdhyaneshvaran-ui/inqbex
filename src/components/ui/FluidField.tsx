"use client";

import { useEffect, useRef } from "react";

// Fluid field background (inspired by 21st.dev "fluid-field" by mengto, rebuilt): a slow
// domain-warped noise field in the brand plums, with the accent purple drifting through
// it and a darker centre so the headline stays legible. The pointer nudges the flow.
// Renders at half resolution, pauses off screen and in background tabs, draws a single
// still frame for reduced motion, and falls back to a CSS glow without WebGL.

const ACCENT: [number, number, number] = [157 / 255, 78 / 255, 221 / 255]; // #9D4EDD

const vertex = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";

// "hero" is the Home field; "quiet" is the slower, dimmer continuation used on Services.
const looks = {
  hero: { scale: "1.35", t: [".035", ".03", ".05", ".04"], deep: ".25,.75", quiet: ".55,1.,length(q))*.45", acc: ".55,.95,w.x)*.38", vig: ".5,1.,smoothstep(.12,.75,d)", start: 12 },
  quiet: { scale: "1.2", t: [".02", ".018", ".03", ".025"], deep: ".3,.8", quiet: ".6,1.,length(q))*.3", acc: ".62,.98,w.x)*.22", vig: ".42,1.,smoothstep(.1,.8,d)", start: 30 },
} as const;

type Look = keyof typeof looks;

const fragment = (look: Look) => {
  const l = looks[look];
  return `precision mediump float;
uniform vec2 r;uniform float t;uniform vec2 m;uniform vec3 acc;
vec3 perm(vec3 x){return mod(((x*34.)+1.)*x,289.);}
float sn(vec2 v){const vec4 C=vec4(.211324865,.366025404,-.577350269,.024390244);
vec2 i=floor(v+dot(v,C.yy));vec2 x0=v-i+dot(i,C.xx);vec2 i1=(x0.x>x0.y)?vec2(1.,0.):vec2(0.,1.);
vec4 x12=x0.xyxy+C.xxzz;x12.xy-=i1;i=mod(i,289.);
vec3 p=perm(perm(i.y+vec3(0.,i1.y,1.))+i.x+vec3(0.,i1.x,1.));
vec3 mm=max(.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.);mm=mm*mm;mm=mm*mm;
vec3 x=2.*fract(p*C.www)-1.;vec3 h=abs(x)-.5;vec3 ox=floor(x+.5);vec3 a0=x-ox;
mm*=1.79284291-.85373472*(a0*a0+h*h);vec3 g;g.x=a0.x*x0.x+h.x*x0.y;g.yz=a0.yz*x12.xz+h.yz*x12.yw;
return 130.*dot(mm,g);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=a*sn(p);p*=2.02;a*=.5;}return v*.5+.5;}
void main(){
vec2 uv=gl_FragCoord.xy/r.y*${l.scale};
vec2 q=vec2(fbm(uv+t*${l.t[0]}),fbm(uv+vec2(5.2,1.3)-t*${l.t[1]}));
vec2 w=vec2(fbm(uv+2.*q+vec2(1.7,9.2)+t*${l.t[2]}+(m-.5)*.35),fbm(uv+2.*q+vec2(8.3,2.8)+t*${l.t[3]}));
float f=fbm(uv+2.2*w);
vec3 base=vec3(.075,.063,.102);vec3 deep=vec3(.149,.090,.196);vec3 quiet=vec3(.294,.259,.376);
vec3 col=mix(base,deep,smoothstep(${l.deep},f));
col=mix(col,quiet,smoothstep(${l.quiet});
col=mix(col,acc,smoothstep(${l.acc});
vec2 c=gl_FragCoord.xy/r-.5;c.x*=r.x/r.y;
float d=length(c*vec2(.75,1.35));
col*=mix(${l.vig});
gl_FragColor=vec4(col,1.);}`;
};

export function FluidField({
  look = "hero",
  speed = 1,
  className,
}: {
  look?: Look;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    // preserveDrawingBuffer lets the Inqbex × BAZ tear copy the current frame of the field
    const gl = canvas?.getContext("webgl", { antialias: false, premultipliedAlpha: false, preserveDrawingBuffer: true });
    // The CSS fallback behind the canvas stays visible until the field paints
    if (!canvas || !gl || gl.isContextLost()) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vertex));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fragment(look)));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const u = {
      r: gl.getUniformLocation(prog, "r"),
      t: gl.getUniformLocation(prog, "t"),
      m: gl.getUniformLocation(prog, "m"),
      acc: gl.getUniformLocation(prog, "acc"),
    };
    gl.uniform3f(u.acc, ...ACCENT);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mouse = [0.5, 0.5];
    const eased = [0.5, 0.5];
    let time: number = looks[look].start;
    let last = performance.now();
    let raf = 0;
    let visible = true;

    const draw = (now: number) => {
      const w = Math.max(1, Math.floor(canvas.clientWidth * 0.5));
      const h = Math.max(1, Math.floor(canvas.clientHeight * 0.5));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      if (!reduce.matches) time += Math.min(0.05, (now - last) / 1000) * speed;
      last = now;
      eased[0] += (mouse[0] - eased[0]) * 0.03;
      eased[1] += (mouse[1] - eased[1]) * 0.03;
      gl.uniform2f(u.r, w, h);
      gl.uniform1f(u.t, time);
      gl.uniform2f(u.m, eased[0], eased[1]);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const loop = (now: number) => {
      draw(now);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      cancelAnimationFrame(raf);
      last = performance.now();
      if (reduce.matches) {
        raf = requestAnimationFrame(draw); // one still frame
      } else if (visible && !document.hidden) {
        raf = requestAnimationFrame(loop);
      }
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse[0] = (e.clientX - r.left) / r.width;
      mouse[1] = 1 - (e.clientY - r.top) / r.height;
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else cancelAnimationFrame(raf);
    });
    const ro = new ResizeObserver(() => reduce.matches && start());

    io.observe(canvas);
    ro.observe(canvas);
    // Only the Home field follows the pointer; the quiet field just drifts
    if (look === "hero") window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("visibilitychange", start);
    reduce.addEventListener("change", start);
    // A lost context (GPU reset, too many contexts) hides the canvas so the fallback shows
    const onLost = () => {
      cancelAnimationFrame(raf);
      canvas.dataset.ready = "false";
    };
    canvas.addEventListener("webglcontextlost", onLost);
    canvas.dataset.ready = "true";
    start();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", start);
      reduce.removeEventListener("change", start);
      canvas.removeEventListener("webglcontextlost", onLost);
      // Free GPU resources but keep the context, so a remount of this canvas can reuse it
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
    };
  }, [look, speed]);

  return (
    <div aria-hidden className={className}>
      {/* Fallback glow: shows until WebGL paints, or for good if it can't */}
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_30%_30%,rgb(157_78_221/0.22),transparent_70%),radial-gradient(55%_45%_at_75%_70%,#261732,transparent_70%)]" />
      <canvas
        ref={ref}
        className="absolute inset-0 block size-full opacity-0 transition-opacity duration-700 data-[ready=true]:opacity-100"
      />
    </div>
  );
}
