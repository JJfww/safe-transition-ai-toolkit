# Repository Guidelines

## Project Structure & Module Organization

This repository is a static website for the SAFE Transition AI Toolkit. Public pages live at the repo root, including [index.html](/Users/jennifer/Desktop/Capstone/index.html), [start-here.html](/Users/jennifer/Desktop/Capstone/start-here.html), and [hidden-curriculum-ai-lab.html](/Users/jennifer/Desktop/Capstone/hidden-curriculum-ai-lab.html). Shared presentation and interaction logic live in [styles.css](/Users/jennifer/Desktop/Capstone/styles.css) and [script.js](/Users/jennifer/Desktop/Capstone/script.js). Draft source content belongs in `/content/*.md`; update Markdown first, then promote approved copy into public HTML.

## Build, Test, and Development Commands

No build step is required. Open the HTML files directly or serve the folder locally:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000`. Useful checks:

```sh
rg --files
rg -n "page-hero|signature-copy" styles.css *.html
```

Use these to inspect files.

## Coding Style & Naming Conventions

Use plain HTML, CSS, and JavaScript only. Prefer 2-space indentation in HTML, CSS, and JS. Keep filenames lowercase and hyphenated, for example `use-ai-carefully.html` and `start-here.md`. Reuse existing shared classes instead of creating one-off variants unless the page genuinely needs a new pattern. Write content in Markdown first and keep public copy transition-specific, plain-language, and reviewable.

## Example Resources

Store example artifacts in a descriptive `/content/<topic>/` folder, such as `/content/Visual Supports/WorkExperienceOptions.png`. Add a clear button-style link beside the matching use case on the public page and record it in that page's Markdown draft. When an example was AI-assisted, add the reviewed prompt only after the author supplies it; present it in a collapsible “How this example was drafted” section with a human-review note.

## Testing Guidelines

There is no automated test suite in v1. Validate changes through source-level QA and local browser review. Check that navigation links resolve, layouts remain readable on desktop and mobile, and the Hidden Curriculum AI Lab still supports paste, privacy check, purpose selection, generate, copy, and clear flows. When changing shared styles, review at least one standard content page and the lab page.

## Commit & Pull Request Guidelines

Git history is not available in this workspace, so follow a simple convention: use short imperative commit messages such as `Refine interior page hero hierarchy` or `Update Start Here draft copy`. Keep PRs scoped to one concern. Include a brief description, affected pages, and screenshots for visual changes, especially homepage, interior hero sections, or lab UI updates.

## Content & Safety Notes

Do not publish draft AI wording without review. Keep student voice, privacy, and human judgment explicit. Never include identifiable student, family, IEP, disability, assessment, or employer-sensitive information in examples, prompts, or tool text.
