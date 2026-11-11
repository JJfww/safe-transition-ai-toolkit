# SAFE Transition AI Toolkit

A practical, staff-facing resource for transition and special education educators, job coaches, paraprofessionals, and program leaders who support young adults with disabilities. It helps teams use AI in ways that are useful, safe, student-centered, and grounded in human judgment.

## What's inside

- **Start Here**: a quick orientation to the toolkit's purpose and boundaries
- **SAFE Framework**: guardrails for deciding when and how to use AI
- **Use AI for This / Use AI Carefully**: realistic use cases, and the ones that need extra caution
- **AI Drafting Lab**: a browser-based prompt builder for transition and special education drafting tasks, such as hidden curriculum lessons, with privacy screening built in
- **Visual Supports**: example materials such as task analyses, role-play scripts, vocabulary cards, and interview practice
- **About**: why the toolkit is scoped the way it is

## What this toolkit is not

- A tool that makes decisions about students
- A replacement for student voice, IEP team discussion, or professional judgment
- A live AI product. Nothing typed on this site is saved or sent to an AI service. The lab builds a prompt in your browser, and an outside AI tool is involved only if you choose to copy that prompt there.

## Run it locally

No build step is needed. Open `index.html`, or serve the folder:

```sh
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

## Project layout

| Path | Contents |
| --- | --- |
| `*.html` | Public pages |
| `styles.css`, `script.js` | Shared styles and page behavior, including the AI Lab |
| `content/` | Draft Markdown source for each page |
| `content/Visual Supports/` | Example visual supports (PDF and PNG) |

## Author

Jennifer Burnes, PhD, Transition Specialist.

## License

[CC BY-NC 4.0](LICENSE). You may share and adapt these materials for non-commercial purposes with credit to Jennifer Burnes. Some example images were created with AI tools under the author's direction.
