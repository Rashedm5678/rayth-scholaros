# Project Evolution

## Phase 1 — Study-tool idea

The project began as a plan for an AI study environment with note summarization, flashcards, quizzes, and planning tools.

## Phase 2 — Real data collection

The project shifted toward a more useful problem: automatically collecting school information and remembering what changed between scans.

Key ideas added:

- current and previous snapshots
- stable item keys
- change detection
- assignment/material/stream separation

## Phase 3 — Resilience

Browser automation is unreliable, so the system added:

- retries
- class aliases
- fallback to last-good data
- verification after writes
- protection against overwriting good data after a partial scan

## Phase 4 — Attachments and detail packages

The system added persistent attachment memory so existing files are not repeatedly downloaded. Classwork detail pages are opened selectively and cached as planner-readable packages.

## Phase 5 — Planner v3

The current architecture adds:

- external editable class configuration
- multi-alias class matching
- RUNNING/COMPLETED health output
- per-class freshness/fallback status
- a compact daily planner index
- explicit user overrides
- automatic Classroom class discovery

## Current reliability backlog

The next engineering pass focuses on:

1. more robust Classroom item matching when exact visible titles fail
2. stable Gmail thread/attachment identification instead of depending heavily on inbox row positions
3. clearer run states such as `COMPLETED_WITH_WARNINGS`
4. adaptive waits to reduce runtime without making the scanner brittle
5. more synthetic tests around change detection and planner classification
