# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ChatVRM is a fork of Pixiv's ChatVRM that replaces proprietary backends with OSS alternatives:
- **LLM:** Ollama (localhost:11434) instead of ChatGPT
- **TTS:** VOICEVOX (localhost:50021) instead of Koemotion
- UI is in Japanese

## Commands

```bash
pnpm dev          # Start dev server (localhost:3000)
pnpm build        # Production build
pnpm lint         # ESLint (next/core-web-vitals + prettier)
pnpm format       # Prettier auto-fix
pnpm lint:format  # Prettier check only
pnpm test         # Jest
```

Package manager is **pnpm** (corepack-managed). Node 24+.

## Architecture

Next.js 15 (Pages Router) + React 19 + Three.js + @pixiv/three-vrm.

### Key directories under `src/`

- **pages/index.tsx** — Main page; orchestrates chat, speech, and 3D rendering. Most application state lives here via React hooks.
- **features/chat/ollamaChat.ts** — Streaming chat via Ollama `/api/chat`. Returns a ReadableStream.
- **features/speak/voicevox.ts** — TTS via VOICEVOX two-step API (audio_query → synthesis).
- **features/messages/** — Converts LLM responses into `Screenplay` objects (emotion tag + speech text). `speakCharacter.ts` coordinates voice playback with lip-sync.
- **features/vrmViewer/** — `Viewer` (Three.js scene/camera/renderer), `Model` (VRM loading, expression/animation control), `viewerContext.ts` (React context).
- **features/emoteController/** — Maps emotion tags (`[happy]`, `[angry]`, etc.) to VRM blend shape expressions. Includes `AutoBlink` and `AutoLookAt`.
- **features/lipSync/** — Audio-driven lip-sync via AnalyserNode FFT.
- **components/** — React UI (menu, settings, chat log, message input, model selector).
- **constants/api.ts** — Ollama and VOICEVOX endpoint URLs.
- **lib/VRMAnimation/** — VRM animation (.vrma) loader built on @gltf-transform/core.

### Data flow

1. User input → `getChatResponseStream()` (streaming Ollama) → parse sentences
2. Sentences tagged with `[emotion]` → `Screenplay` objects
3. `speakCharacter()` → VOICEVOX audio → playback with lip-sync + expression animation
4. VRM model rendered in Three.js canvas with OrbitControls, idle animation loop

### Path alias

`@/*` maps to `./src/*` (tsconfig paths).

## Environment

`.env` file with `NEXT_PUBLIC_PERSONALITY` — system prompt for the character (Japanese text).

Requires Ollama and VOICEVOX running locally.

## Development Workflow

Must follow these steps sequentially for any non-trivial implementation:

### 1. Spec

Use `spec-plugin:spec` subagent to clarify requirements and produce a specification before writing any code.

### 2. Coding

Use `typescript-plugin:coding` subagent to implement the feature following TDD Red-Green-Refactor cycle with strict type safety.

### 3. Review & Testing

Run all three of the following subagents to validate the implementation:

- `typescript-plugin:code-review` — Review for readability, maintainability, and TypeScript idioms
- `typescript-plugin:testing` — Run tests, analyze coverage, and identify gaps
- `typescript-plugin:security` — Audit for vulnerabilities and insecure patterns

### 4. E2E Verification

Use `typescript-plugin:e2e` subagent to verify end-to-end behavior. If E2E tests fail, loop back to step 2 (Coding) to fix the implementation and repeat from there.
