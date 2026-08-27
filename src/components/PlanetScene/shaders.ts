/**
 * Shared vertex stage: hand world-space normal + position to the fragment
 * stage so both the body and its atmosphere can compute a view-dependent rim.
 */
export const planetVertex = /* glsl */ `
  varying vec3 vNormalW;
  varying vec3 vPosW;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vNormalW = normalize(mat3(modelMatrix) * normal);
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vPosW = worldPos.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

/**
 * Planet body. A soft terminator plus low-contrast fbm banding — the point is
 * a believable *distant* world, not a texture showcase, so everything here is
 * deliberately low amplitude.
 */
export const planetFragment = /* glsl */ `
  uniform vec3 uLightDir;
  uniform vec3 uBase;
  uniform vec3 uLit;
  uniform vec3 uRim;
  uniform float uTime;

  varying vec3 vNormalW;
  varying vec3 vPosW;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p *= 2.03;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec3 N = normalize(vNormalW);
    vec3 V = normalize(cameraPosition - vPosW);
    vec3 L = normalize(uLightDir);

    float ndl = dot(N, L);
    float lit = smoothstep(-0.18, 0.62, ndl);

    // Latitudinal banding, drifting far too slowly to read as "spinning".
    float surface = fbm(vUv * vec2(7.0, 3.2) + vec2(uTime * 0.005, 0.0));
    float bands = fbm(vec2(vUv.y * 15.0, uTime * 0.003));

    vec3 color = mix(uBase, uLit, lit);
    color *= 0.84 + 0.30 * surface;
    color += uRim * 0.06 * bands * lit;

    // Fresnel, gated by the light term so the halo forms a crescent rather
    // than ringing the whole silhouette.
    float fres = pow(1.0 - max(dot(N, V), 0.0), 3.0);
    color += uRim * fres * smoothstep(-0.45, 0.75, ndl) * 1.45;

    gl_FragColor = vec4(color, 1.0);
    #include <colorspace_fragment>
  }
`;

/** Additive back-facing shell that reads as atmospheric scatter. */
export const atmosphereFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uLightDir;
  uniform float uStrength;

  varying vec3 vNormalW;
  varying vec3 vPosW;
  varying vec2 vUv;

  void main() {
    vec3 N = normalize(vNormalW);
    vec3 V = normalize(cameraPosition - vPosW);
    float fres = pow(1.0 - abs(dot(N, V)), 2.6);
    float ndl = smoothstep(-0.65, 0.85, dot(N, normalize(uLightDir)));
    gl_FragColor = vec4(uColor, fres * (0.18 + 0.82 * ndl) * uStrength);
    #include <colorspace_fragment>
  }
`;
