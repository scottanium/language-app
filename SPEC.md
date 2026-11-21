# Allons-y — French learning app (plan)

A phone-first PWA to help Scott, a native English speaker and French beginner, learn practical French. No accounts. Everything stays on the device. This document is the plan for the full Sunday build; the files beside it are a working first version.

**Do not publish** to GitHub Pages or anywhere else until Scott says yes.

## Goals

- Short daily practice that works offline on a phone, including when added to the home screen.
- Teach useful words and phrases first, with accurate French (accents, gender, register).
- Listen to native-sounding French in the browser, and optionally practice speaking.
- Keep progress in `localStorage`, with export and import so a save can move to a new phone.

## Learning modes

### Spaced-repetition flashcards

- Cards go both ways: French → English and English → French (learner can lock one direction or mix).
- Scheduling uses a simple SM-2 style algorithm (Again / Good / Easy), with “Again” cards returning later in the same session.
- Themed starter decks, each expandable later:
  - **Greetings** — hellos, thanks, names, how-are-you
  - **Numbers** — 0–20, tens, 70/80/90 (the French pattern), 100, 1000, “combien”
  - **Food** — meals, staples, ordering, the check
  - **Travel** — transport, directions, help, open/closed
  - **Everyday verbs** — high-frequency infinitives, with a short note when two verbs look similar (savoir / connaître)
- Nouns always show gender (`le` / `la` / `l’` + (m) or (f); `un` / `une`; plural `les`).
- Later: custom decks, example sentences, and verb conjugation cards.

### Listening and pronunciation

- A tap-to-hear button on cards, quizzes, and lessons uses `speechSynthesis` with `lang: 'fr-FR'` and a French voice when the phone has one installed.
- Optional speaking practice (Sunday): `SpeechRecognition` / webkit prefix where the browser supports it. The learner says the French word; the app compares a normalized transcript and shows close / not yet. If the API is missing, hide the mic and explain why.
- A slower-speech toggle (already useful on day one) and, later, a “say it in a sentence” prompt.

**Limit:** speech quality depends on the device. iPhone and many Androids ship a French voice; some desktops and in-app browsers do not. Recognition support is uneven, especially on iOS.

### Short lessons (Sunday)

Four short, swipeable lesson pages with a tiny drill at the end:

1. **Gender** — nouns are masculine or feminine; why it matters for `le` / `la` and adjectives.
2. **Articles** — `le`, `la`, `l’`, `les`, `un`, `une`, `des`; when to drop the article.
3. **Être and avoir** — present-tense conjugations and the most common uses (I am, I have, age, hunger).
4. **Present tense** — regular `-er` pattern, then a short look at `aller`, `faire`, `venir`.

Lessons should unlock naturally after a few cards in the related deck, but stay open from a Lessons tab.

### Quiz, streak, and daily goal

- Multiple-choice quiz (10 questions): mix of “What does this mean?” and “How do you say…?”, with same-theme distractors and a spoken French prompt.
- Later: type-the-French (accents optional at first, then required) and listening-only quizzes.
- Daily goal (default 10 reviews) on the America/Indianapolis calendar day.
- Streak counts a day as done when the goal is met. Missed days reset the streak.
- Progress screen: streak, reviews today, cards learned, due tomorrow, per-deck bars, plus export and import.

## Technical plan

- Stack: plain HTML, CSS, and vanilla JS. No build step, no framework.
- Offline PWA: `manifest.json` + service worker caching the app shell and icons.
- Saves: `localStorage` key `allonsy-v1`, with a version field and a migration hook for later formats. Export is a JSON file; import replaces or merges after a confirm.
- Hosting (only with Scott’s yes): GitHub Pages, same style of upload used for his other phone apps. Stage first, then publish as one update. Bump the cache name on each publish.
- Timezone for streaks and daily goals: America/Indianapolis.

## Sunday build order

1. Keep the MVP flashcard, audio, and quiz flows; fix anything that looks off on a 390×844 phone screen.
2. Add Lessons and optional speaking practice.
3. Grow decks and add example sentences.
4. Polish progress, export/import, and install-to-home-screen instructions.
5. Stage a zip, screenshot the main screens, and wait for Scott before any live publish.

## Out of scope until Scott asks

Accounts, leaderboards, paid content, social features, or sending audio to a server. Recognition, if added, stays on-device in the browser.
