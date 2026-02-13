# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
See AGENTS.md

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
