const nav = document.querySelector(".site-nav");
const menuToggle = document.querySelector(".menu-toggle");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const currentPage = document.body.dataset.page;
const navMap = {
  home: "index.html",
  "start-here": "start-here.html",
  "safe-framework": "safe-framework.html",
  "use-ai-for-this": "use-ai-for-this.html",
  "use-ai-carefully": "use-ai-carefully.html",
  "ai-lab": "hidden-curriculum-ai-lab.html",
  about: "about.html",
};

if (nav && currentPage && navMap[currentPage]) {
  const activeHref = navMap[currentPage];
  for (const link of nav.querySelectorAll("a")) {
    const normalized = link.getAttribute("href");
    if (normalized === activeHref) {
      link.classList.add("is-active");
      link.setAttribute("aria-current", "page");
    }
  }
}

const areaConfigs = {
  hidden_curriculum: {
    sourceLabel: "Step 2: Paste workplace text",
    sourceHelp:
      "Use short workplace text that staff could reasonably review and discuss, such as a rule, task description, training excerpt, or supervisor expectation.",
    sourcePlaceholder:
      "Paste workplace text here. Remove names and identifying details first.",
    purposeHelp:
      "Choose the kind of staff support you want to draft. The task changes the prompt structure and review emphasis.",
    privacyLegend: "Step 3: Identifier checks and contextual review",
    privacyHelp:
      "All three areas use the same browser-based identifier checks. The area changes drafting tasks and review emphasis, not detection strength. This is a teaching and review aid, not a FERPA compliance decision. Changing capitalization does not remove an identifier.",
    generatedHelp:
      "Review this prompt and copy it into an approved AI tool only after checking identifiers and completing contextual review.",
    reviewHelp:
      "The prompt may produce useful ideas, but the output still needs educator review before it becomes instruction, feedback, or a support plan.",
    purposes: [
      {
        value: "hidden_curriculum",
        label: "Find hidden curriculum",
        template: ({ sourceText }) =>
          `Review the following workplace text and identify the hidden curriculum a student may need explicit instruction to understand.\n\nWorkplace text:\n${sourceText}\n\nPlease:\n1. Separate explicit expectations from implied expectations.\n2. Identify unwritten social, timing, communication, or behavioral rules.\n3. Note any vocabulary, tone, pace, or assumptions that may need direct teaching.\n4. Suggest specific ways an educator or job coach could turn these into teachable supports.\n5. Flag anything that is unclear and should be confirmed with the actual workplace.\n6. Avoid adding details that are not supported by the text.`,
      },
      {
        value: "student_friendly",
        label: "Rewrite in student-friendly language",
        template: ({ sourceText }) =>
          `Rewrite the following workplace text in student-friendly language for instructional planning.\n\nWorkplace text:\n${sourceText}\n\nPlease:\n1. Keep the meaning accurate.\n2. Use plain language without sounding childish.\n3. Point out any terms or expectations that may still need direct teaching.\n4. Keep the tone respectful, realistic, and workplace-appropriate.\n5. Do not make decisions or assumptions about a specific student.\n6. Add a short note for the educator about what still needs human explanation or context.`,
      },
      {
        value: "role_play",
        label: "Create a role-play",
        template: ({ sourceText }) =>
          `Create a short workplace role-play based on the following workplace text.\n\nWorkplace text:\n${sourceText}\n\nPlease:\n1. Show the hidden expectations involved.\n2. Include a realistic workplace interaction with clear context.\n3. Offer at least two possible responses for the student to practice.\n4. Note what a job coach or educator should watch for during the role-play.\n5. Add a short educator note about what should be reviewed before use.\n6. Keep the scenario respectful, practical, and grounded in the text provided.`,
      },
      {
        value: "job_coach",
        label: "Create a job coach support prompt",
        template: ({ sourceText }) =>
          `Use the following workplace text to create a support prompt for a job coach.\n\nWorkplace text:\n${sourceText}\n\nPlease:\n1. Identify the likely support needs implied by the text.\n2. Suggest observation points for the job coach.\n3. Note possible hidden curriculum issues to watch for.\n4. Suggest how the coach might prompt, fade support, or clarify expectations.\n5. Keep the guidance practical and tied to the text.\n6. Do not make assumptions beyond what the text reasonably supports.`,
      },
      {
        value: "discussion",
        label: "Create discussion questions",
        template: ({ sourceText }) =>
          `Create discussion questions for staff or instructional planning based on the following workplace text.\n\nWorkplace text:\n${sourceText}\n\nPlease:\n1. Identify questions about hidden curriculum or unclear expectations.\n2. Include questions about what may need direct instruction.\n3. Include at least one question about privacy, dignity, or respectful support.\n4. Include at least one question about what should be confirmed with the real workplace.\n5. Keep the questions practical and transition-focused.`,
      },
      {
        value: "task_analysis",
        label: "Create a task analysis draft",
        template: ({ sourceText }) =>
          `Create a draft task analysis based on the following workplace text.\n\nWorkplace text:\n${sourceText}\n\nPlease:\n1. Break the task or expectation into likely teachable steps.\n2. Flag any steps that may need clarification from staff or the workplace.\n3. Note likely hidden curriculum, communication, or social expectations.\n4. Separate observable actions from assumptions that still need confirmation.\n5. Keep this as a draft for human review and revision in the real setting.`,
      },
    ],
  },
  iep: {
    sourceLabel: "Step 2: Paste de-identified IEP source text",
    sourceHelp:
      "Use de-identified present-level notes, strengths and needs summaries, draft language, or source notes that need organization. Do not paste full identifiable records.",
    sourcePlaceholder:
      "Paste de-identified IEP source text here. Remove names, dates, and protected details first.",
    purposeHelp:
      "Choose the drafting task you want help structuring. These prompts are for drafting support only, not final team decisions.",
    privacyLegend: "Step 3: Identifier checks and contextual review",
    privacyHelp:
      "All three areas use the same browser-based identifier checks. The area changes drafting tasks and review emphasis, not detection strength. This is a teaching and review aid, not a FERPA compliance decision. Changing capitalization does not remove an identifier.",
    generatedHelp:
      "Review this prompt and copy it into an approved AI tool only after checking identifiers and completing contextual review.",
    reviewHelp:
      "IEP drafting needs stronger review. Check that the output is individualized, accurate, defensible, and aligned with actual student data and team judgment.",
    purposes: [
      {
        value: "present_levels",
        label: "Summarize present levels",
        template: ({ sourceText }) =>
          `Use the following source notes to draft a present levels summary for educator review.\n\nSource text:\n${sourceText}\n\nPlease:\n1. Organize the information into a clear present levels draft.\n2. Separate strengths, current performance, supports, and areas of need when the source text supports that distinction.\n3. Keep the language specific and educationally useful.\n4. Do not invent data or overstate conclusions.\n5. Flag anything that is missing, unclear, or needs confirmation from the team.\n6. Keep this as a draft for human revision, not a final IEP statement.`,
      },
      {
        value: "iep_goal",
        label: "Draft annual goal options",
        template: ({ sourceText }) =>
          `Use the following source notes to draft possible annual goal language for educator review.\n\nSource text:\n${sourceText}\n\nPlease:\n1. Draft 2 to 3 possible annual goal options based only on the information provided.\n2. Keep the goals measurable and instructionally meaningful when the source text supports that.\n3. Note the skill area each goal addresses.\n4. Identify any parts that still need baseline data, clearer criteria, or team confirmation.\n5. Do not make placement, service, or readiness decisions.\n6. Keep this as draft language for revision by the educator and team.`,
      },
      {
        value: "iep_notes",
        label: "Organize source notes",
        template: ({ sourceText }) =>
          `Organize the following IEP source notes into a clearer drafting outline.\n\nSource text:\n${sourceText}\n\nPlease:\n1. Group related information together.\n2. Separate observations, strengths, needs, and possible next drafting steps when supported by the text.\n3. Identify statements that sound subjective or need evidence.\n4. Flag information that appears incomplete or ambiguous.\n5. Keep the output practical for educator drafting and review.`,
      },
    ],
  },
  transition_plan: {
    sourceLabel: "Step 2: Paste de-identified transition planning text",
    sourceHelp:
      "Use de-identified transition assessment notes, student preference summaries, strengths and needs notes, or planning language related to goals and services.",
    sourcePlaceholder:
      "Paste de-identified transition planning text here. Remove names and identifying details first.",
    purposeHelp:
      "Choose the drafting task you need. These prompts should help staff think and organize, not decide the student's future.",
    privacyLegend: "Step 3: Identifier checks and contextual review",
    privacyHelp:
      "All three areas use the same browser-based identifier checks. The area changes drafting tasks and review emphasis, not detection strength. This is a teaching and review aid, not a FERPA compliance decision. Changing capitalization does not remove an identifier.",
    generatedHelp:
      "Review this prompt and copy it into an approved AI tool only after checking identifiers and completing contextual review.",
    reviewHelp:
      "Transition planning output must still be checked against student voice, assessment evidence, feasibility, dignity, and full team review.",
    purposes: [
      {
        value: "assessment_analysis",
        label: "Analyze transition assessment data",
        template: ({ sourceText }) =>
          `Review the following transition assessment notes and summarize the main patterns for educator review.\n\nSource text:\n${sourceText}\n\nPlease:\n1. Identify themes related to strengths, interests, preferences, support needs, and skill development.\n2. Separate evidence from inference.\n3. Note any contradictions, gaps, or areas that need more information.\n4. Suggest questions the team may still need to discuss.\n5. Do not make final determinations about the student's future or services.`,
      },
      {
        value: "postsecondary_goals",
        label: "Suggest postsecondary goal options",
        template: ({ sourceText }) =>
          `Use the following transition planning notes to draft possible postsecondary goal options for educator review.\n\nSource text:\n${sourceText}\n\nPlease:\n1. Draft 2 to 3 possible postsecondary goal options grounded in the information provided.\n2. Keep the goals realistic, respectful, and student-centered.\n3. Note what evidence in the source text supports each option.\n4. Flag what still needs direct student input or team confirmation.\n5. Do not present any option as a final decision.`,
      },
      {
        value: "transition_services",
        label: "Draft transition services ideas",
        template: ({ sourceText }) =>
          `Use the following transition planning notes to draft possible transition services ideas for educator review.\n\nSource text:\n${sourceText}\n\nPlease:\n1. Suggest possible services, supports, or activities that align with the information provided.\n2. Tie each idea to an identified need, goal area, or skill area when possible.\n3. Keep the suggestions practical and school-team appropriate.\n4. Flag anything that depends on missing information or local context.\n5. Do not treat the output as a final service decision.`,
      },
      {
        value: "transition_annual_goals",
        label: "Draft transition annual goals",
        template: ({ sourceText }) =>
          `Use the following transition planning notes to draft possible annual transition goal language for educator review.\n\nSource text:\n${sourceText}\n\nPlease:\n1. Draft possible annual goals tied to transition-related skill development.\n2. Keep the goals specific and measurable when the source text supports that level of precision.\n3. Identify what baseline information or criteria may still be missing.\n4. Note where student preference or real-world context should shape revision.\n5. Keep this as draft language for educator and team review.`,
      },
    ],
  },
};

const labForm = document.querySelector("#ai-lab-form");
const generatedPrompt = document.querySelector("#generated-prompt");
const copyPromptButton = document.querySelector("#copy-prompt");
const clearLabButton = document.querySelector("#clear-lab");
const copyStatus = document.querySelector("#copy-status");
const purposeGrid = document.querySelector("#purpose-grid");
const sourceTextLabel = document.querySelector("#source-text-label");
const sourceTextHelp = document.querySelector("#source-text-help");
const sourceTextInput = document.querySelector("#source-text");
const purposeHelp = document.querySelector("#purpose-help");
const generatedPromptHelp = document.querySelector("#generated-prompt-help");
const reviewHelp = document.querySelector("#review-help");
const privacyLegend = document.querySelector("#privacy-legend");
const privacyHelp = document.querySelector("#privacy-help");
const privacyScreen = document.querySelector("#privacy-screen");
const privacySignal = document.querySelector("#privacy-signal");
const privacyStatusCopy = document.querySelector("#privacy-status-copy");
const privacyFlags = document.querySelector("#privacy-flags");
const privacyPreview = document.querySelector("#privacy-preview");
const privacyPreviewText = document.querySelector("#privacy-preview-text");
const privacyRescan = document.querySelector("#privacy-rescan");
const generatePromptButton = document.querySelector("#generate-prompt");

// Rules recognize formats and person-label/subject context, not a name dictionary.
// Case folding and Unicode letters keep capitalization from becoming a bypass.
const privacyDetectors = [
  { id: "email", severity: "red", regex: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi,
    message: "Possible email address", suggestion: "Remove email addresses." },
  { id: "phone", severity: "red", regex: /(?<!\d)(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}(?!\d)|\+\d{1,3}[ -](?:\d[ -]?){7,12}\d/g,
    message: "Possible phone number", suggestion: "Remove phone numbers." },
  { id: "address", severity: "red", regex: /\b\d{1,6}[ \t]+(?:[\p{L}\p{M}\d.'’-]+[ \t]+){1,6}(?:street|st|avenue|ave|road|rd|lane|ln|drive|dr|court|ct|boulevard|blvd|way|circle|cir|place|pl|terrace|ter|parkway|pkwy)\b/giu,
    message: "Possible street address", suggestion: "Replace addresses with a general setting." },
  { id: "po_box", severity: "red", regex: /\b(?:p\.?[ \t]*o\.?[ \t]*box|post office box)[ \t]*\d+[A-Z0-9-]*/gi,
    message: "Possible PO box", suggestion: "Remove mailing addresses." },
  { id: "dob", severity: "red", regex: /\b(?:dob|d\.o\.b\.|date of birth|birth[ -]?date|birthday|born on)[ \t]*[:=-]?[ \t]*(?:\d{1,4}[-/.]\d{1,2}[-/.]\d{1,4}|[\p{L}]+[ \t]+\d{1,2}(?:,[ \t]*|[ \t]+)\d{4}|\d{1,2}[ \t]+[\p{L}]+[ \t]+\d{4})/giu,
    message: "Possible birth date", suggestion: "Remove birth dates." },
  { id: "student_id", severity: "red", regex: /\b(?:student[ \t]+(?:id|number|no\.?)|ssid|id number|case[ \t]+(?:number|id)|record number)[ \t]*[:#=-]*[ \t]*[A-Z0-9][A-Z0-9-]{2,}\b/gi,
    message: "Possible student or record identifier", suggestion: "Remove student, case, and record numbers." },
  { id: "ssn", severity: "red", regex: /\b\d{3}-\d{2}-\d{4}\b|\b(?:ssn|social security(?: number)?)[ \t]*[:#=-]?[ \t]*\d{9}\b/gi,
    message: "Possible Social Security number", suggestion: "Remove identification numbers, including synthetic examples in these formats." },
  { id: "labeled_name", severity: "red", regex: /\b(?:(?:student|teacher|parent|guardian|supervisor|job coach|case manager|staff)(?:[ \t]+name)?|name|student initials)[ \t]*[:=][ \t]*[\p{L}\p{M}][\p{L}\p{M}.'’-]*(?:[ \t]+[\p{L}\p{M}.'’-]+){0,3}/giu,
    message: "Possible labeled person name", suggestion: "Replace names with a generic role; use [Student Name] for a blank template.",
    accept: (match) => !/[:=]\s*(?:learning goals|student|learner|teacher|guardian|supervisor)[.\s]*$/i.test(match[0]) },
  { id: "titled_name", severity: "red", regex: /\b(?:mr|mrs|ms|miss|dr)\.?[ \t]+[\p{L}\p{M}][\p{L}\p{M}.'’-]*/giu,
    message: "Possible titled person name", suggestion: "Replace personal names with a generic role." },
  { id: "person_subject", severity: "red", regex: /(?:^|(?<=[.!?\n]))[ \t]*(?:[\p{L}\p{M}][\p{L}\p{M}'’-]*[ \t]+){1,4}(?=(?:needs?|uses?|benefits?|works?|attends?|lives?|completes?|completed|asks?|has|is)[ \t])/giu,
    message: "Possible person name in a sentence", suggestion: "Review the highlighted subject and replace personal names with a generic role.",
    accept: (match) => !/\b(?:the|a|an|this|that|student|learner|worker|staff|teacher|supervisor|coach|parent|guardian|they|he|she|it|who|everyone|someone|person|team|group|checklist|task|support|instruction|schedule|worksheet|tool|text|prompt|material|activity|lesson|plan|work|practice|communication|equipment)\b/i.test(match[0]) },
  { id: "initials", severity: "red", regex: /\b(?:[A-Z]\.){2,3}(?=\s|$)/gi,
    message: "Possible person initials", suggestion: "Use a generic role instead of initials." },
  { id: "place_label", severity: "red", regex: /\b(?:school|employer|workplace|home address|mailing address|city)[ \t]*[:=][ \t]*[^\n.;\[\]]+/gi,
    message: "Possible labeled place", suggestion: "Replace named schools, employers, and places with general settings." },
  { id: "school", severity: "review", regex: /\b(?:[\p{L}][\p{L}'’-]*[ \t]+){1,3}(?:high school|middle school|elementary school|academy|school district)\b/giu,
    message: "Context review: possible school reference", suggestion: "Generalize any actual school name; instructional discussion alone is not an identifier." },
  { id: "class", severity: "review", regex: /\b(?:homeroom|[1-9](?:st|nd|rd|th)[ \t]+period|period[ \t]*[1-9]|classroom[ \t]+\d+|room[ \t]+\d+)\b/gi,
    message: "Context review: class or room detail", suggestion: "Remove specific class or room details if they identify someone in context." },
  { id: "medical", severity: "review", regex: /\b(?:medical history|diagnos(?:is|ed with)|medication|therapy|hospitalized|autism|adhd|attention deficit disorder|intellectual disability|developmental disability|learning disability|specific learning disability|orthopedic impairment|other health impairment|speech or language impairment|emotional disturbance|traumatic brain injury|cerebral palsy|down syndrome|deaf|hard of hearing|visual impairment|epilepsy|diabetes|takes[ \t]+[\p{L}]+[ \t]+(?:at|daily))\b|\b(?:has|diagnosed with)[ \t]+ADD\b/giu,
    message: "Context review: sensitive health or disability information", suggestion: "Remove private medical details. Prefer a functional description of supports; retain only information permitted for the task and approved tool." },
];

function summarizeSnippet(match) {
  return match.length > 42 ? `${match.slice(0, 39)}...` : match;
}

function screenSourceText(text, area) {
  const trimmed = text.trim();
  if (!trimmed) {
    return {
      level: "pending",
      copy: "Paste text to run the privacy screen.",
      flags: [],
      suggestions: [],
    };
  }

  const findings = [];
  // Ignore only known blank placeholders, preserving exact offsets for highlighting.
  const screened = trimmed.replace(/\[(?:student name|support type|workplace name|name|student|support|workplace|task)\]/gi,
    (placeholder) => " ".repeat(placeholder.length));

  for (const detector of privacyDetectors) {
    if (detector.areas && !detector.areas.includes(area)) continue;
    const regex = new RegExp(detector.regex.source, detector.regex.flags);
    const matches = [...screened.matchAll(regex)];
    for (const match of matches) {
      if (detector.accept && !detector.accept(match)) continue;
      findings.push({
        id: detector.id,
        severity: detector.severity,
        message: detector.message,
        snippet: summarizeSnippet(match[0]),
        suggestion: detector.suggestion,
        start: match.index,
        end: match.index + match[0].length,
      });
    }
  }

  if (!findings.length) {
    return {
      level: "green",
      copy: "No identifiers detected by these checks. Complete the contextual review before generating. This screen cannot guarantee that text is safe to share.",
      flags: [],
      suggestions: [],
      text: trimmed,
      highlights: [],
    };
  }

  const level = findings.some((finding) => finding.severity === "red") ? "red" : "review";
  const uniqueSuggestions = [...new Set(findings.map((finding) => finding.suggestion))];
  const topFindings = findings;
  const copy = level === "red"
    ? "Possible identifiers detected. Remove or generalize these details, then review again. Sensitive-content findings also require your judgment."
    : "Sensitive or contextual details need your review. Remove private details and keep only the minimum permitted functional information. These findings alone do not establish identity.";

  return {
    level,
    copy,
    flags: topFindings,
    suggestions: uniqueSuggestions,
    text: trimmed,
    highlights: findings,
  };
}

function escapeHTML(value) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    "\"": "&quot;",
  })[character]);
}

function createHighlightedTextMarkup(text, findings) {
  const ranges = findings
    .map(({ start, end }) => ({ start, end }))
    .sort((a, b) => a.start - b.start || b.end - a.end)
    .reduce((merged, range) => {
      const previous = merged.at(-1);
      if (previous && range.start <= previous.end) {
        previous.end = Math.max(previous.end, range.end);
      } else {
        merged.push(range);
      }
      return merged;
    }, []);

  let cursor = 0;
  let markup = "";
  for (const range of ranges) {
    markup += escapeHTML(text.slice(cursor, range.start));
    markup += `<mark>${escapeHTML(text.slice(range.start, range.end))}</mark>`;
    cursor = range.end;
  }
  return `${markup}${escapeHTML(text.slice(cursor))}`;
}

function renderPrivacyScreen(result) {
  if (!privacyScreen || !privacySignal || !privacyStatusCopy || !privacyFlags) return;

  privacyScreen.classList.remove(
    "privacy-screen--pending",
    "privacy-screen--green",
    "privacy-screen--red",
    "privacy-screen--review",
  );
  privacySignal.classList.remove(
    "privacy-signal--pending",
    "privacy-signal--green",
    "privacy-signal--red",
    "privacy-signal--review",
  );

  const screenLevel = result.level || "pending";
  privacyScreen.classList.add(`privacy-screen--${screenLevel}`);
  privacySignal.classList.add(`privacy-signal--${screenLevel}`);

  const labelMap = {
    pending: "Needs review",
    green: "No identifiers detected by these checks",
    review: "Contextual review needed",
    red: "Stop: remove details",
  };

  privacySignal.textContent = labelMap[screenLevel];
  privacyStatusCopy.textContent = result.copy;

  if (!result.flags.length && !result.suggestions.length) {
    privacyFlags.innerHTML = "";
  } else {
    const flagItems = result.flags.map(
      (flag) => `<li><strong>${escapeHTML(flag.message)}:</strong> “${escapeHTML(flag.snippet)}”</li>`,
    );
    const suggestionItems = result.suggestions.map(
      (suggestion) => `<li><strong>Suggestion:</strong> ${escapeHTML(suggestion)}</li>`,
    );
    privacyFlags.innerHTML = [...flagItems, ...suggestionItems].join("");
  }

  if (privacyPreview && privacyPreviewText) {
    const hasHighlights = result.highlights?.length;
    privacyPreview.hidden = !hasHighlights;
    privacyPreviewText.innerHTML = hasHighlights
      ? createHighlightedTextMarkup(result.text, result.highlights)
      : "";
  }

  if (generatePromptButton) {
    generatePromptButton.disabled = !screeningReady || !contextReview.checked || !["green", "review"].includes(screenLevel);
  }
}

function evaluatePrivacyScreen() {
  const area = getSelectedArea();
  const sourceText = sourceTextInput?.value || "";
  const result = screenSourceText(sourceText, area);
  renderPrivacyScreen(result);
  return result;
}

function getSelectedArea() {
  return labForm?.querySelector('input[name="area"]:checked')?.value || "hidden_curriculum";
}

function renderAreaConfig(area) {
  if (!labForm || !purposeGrid || !sourceTextLabel || !sourceTextHelp || !sourceTextInput) return;
  const config = areaConfigs[area];
  if (!config) return;

  sourceTextLabel.textContent = config.sourceLabel;
  sourceTextHelp.textContent = config.sourceHelp;
  sourceTextInput.placeholder = config.sourcePlaceholder;
  if (purposeHelp) purposeHelp.textContent = config.purposeHelp;
  if (privacyLegend) privacyLegend.textContent = config.privacyLegend;
  if (privacyHelp) privacyHelp.textContent = config.privacyHelp;
  if (generatedPromptHelp) generatedPromptHelp.textContent = config.generatedHelp;
  if (reviewHelp) reviewHelp.textContent = config.reviewHelp;

  purposeGrid.innerHTML = config.purposes
    .map(
      (purpose, index) =>
        `<label class="purpose-card"><input type="radio" name="purpose" value="${purpose.value}" ${
          index === 0 ? "checked" : ""
        } /> <span>${purpose.label}</span></label>`,
    )
    .join("");

  evaluatePrivacyScreen();
}

const contextReview = document.querySelector("#context-review");
const screeningUnavailable = document.querySelector("#screening-unavailable");
let screeningReady = false;
let outputRevision = 0;
let generatedState = "";

function currentDraftState() {
  return JSON.stringify([sourceTextInput.value, getSelectedArea(),
    labForm.querySelector('input[name="purpose"]:checked')?.value, contextReview.checked]);
}

function invalidatePrompt(resetReview = false) {
  outputRevision += 1;
  generatedState = "";
  generatedPrompt.value = "";
  copyPromptButton.disabled = true;
  copyStatus.textContent = "";
  if (resetReview) contextReview.checked = false;
}

function disableScreening() {
  screeningReady = false;
  sourceTextInput.disabled = true;
  generatePromptButton.disabled = true;
  privacyRescan.disabled = true;
  contextReview.disabled = true;
  invalidatePrompt(true);
  screeningUnavailable.hidden = false;
}

// Fail closed after a screening/event error as well as during initialization.
function labAction(action) {
  return (...args) => {
    try { return action(...args); } catch { disableScreening(); }
  };
}

if (labForm && generatedPrompt) {
  try {
    // Verify required controls before enabling entry. No form exists to submit.
    if (![sourceTextInput, generatePromptButton, copyPromptButton, clearLabButton,
      copyStatus, purposeGrid, privacyRescan, contextReview, screeningUnavailable,
      privacyScreen, privacySignal, privacyStatusCopy, privacyFlags, privacyPreview,
      privacyPreviewText, sourceTextLabel, sourceTextHelp].every(Boolean)) {
      throw new Error("Screening controls unavailable");
    }
    renderAreaConfig(getSelectedArea());
    labForm.querySelectorAll('input[name="area"]').forEach((input) => {
      input.addEventListener("change", labAction(() => {
        invalidatePrompt(true);
        renderAreaConfig(input.value);
      }));
    });
    purposeGrid.addEventListener("change", labAction(() => invalidatePrompt()));
    sourceTextInput.addEventListener("input", labAction(() => {
      invalidatePrompt(true);
      evaluatePrivacyScreen();
    }));
    privacyRescan.addEventListener("click", labAction(() => {
      invalidatePrompt(true);
      evaluatePrivacyScreen();
    }));
    contextReview.addEventListener("change", labAction(() => {
      invalidatePrompt();
      evaluatePrivacyScreen();
    }));
    generatePromptButton.addEventListener("click", labAction(() => {
      invalidatePrompt();
      const result = evaluatePrivacyScreen();
      if (!screeningReady || !contextReview.checked || !["green", "review"].includes(result.level)) return;
      const purpose = labForm.querySelector('input[name="purpose"]:checked')?.value;
      const template = areaConfigs[getSelectedArea()].purposes.find((item) => item.value === purpose);
      if (!template) return;
      generatedPrompt.value = template.template({ sourceText: sourceTextInput.value.trim() });
      generatedState = currentDraftState();
      copyPromptButton.disabled = false;
      copyStatus.textContent = "Prompt generated. Review it before copying.";
    }));
    copyPromptButton.addEventListener("click", async () => {
      const revision = outputRevision;
      try {
        if (!screeningReady || !generatedState || generatedState !== currentDraftState()) {
          invalidatePrompt(true);
          evaluatePrivacyScreen();
          return;
        }
        const result = evaluatePrivacyScreen();
        if (!["green", "review"].includes(result.level)) { invalidatePrompt(true); return; }
        let copied = false;
        try { await navigator.clipboard.writeText(generatedPrompt.value); copied = true; } catch {
          // Never copy a different draft after the asynchronous clipboard attempt.
          if (revision !== outputRevision) return;
          generatedPrompt.focus();
          generatedPrompt.select();
          try { copied = document.execCommand("copy") === true; } catch { copied = false; }
        }
        if (revision === outputRevision) copyStatus.textContent = copied
          ? "Prompt copied."
          : "Automatic copy failed. The prompt is selected; copy it manually with Ctrl+C or Command+C, or your device’s Copy menu.";
      } catch { disableScreening(); }
    });
    clearLabButton.addEventListener("click", labAction(() => {
      sourceTextInput.value = "";
      invalidatePrompt(true);
      labForm.querySelector('input[name="area"][value="hidden_curriculum"]').checked = true;
      renderAreaConfig("hidden_curriculum");
    }));
    // Enable last, only after an actual scan and all handlers are installed.
    screeningReady = true;
    evaluatePrivacyScreen();
    sourceTextInput.disabled = false;
    privacyRescan.disabled = false;
    contextReview.disabled = false;
    screeningUnavailable.hidden = true;
  } catch {
    // Initial HTML already disables entry and generation even for syntax errors.
    screeningReady = false;
    if (sourceTextInput) sourceTextInput.disabled = true;
    if (generatePromptButton) generatePromptButton.disabled = true;
    if (screeningUnavailable) screeningUnavailable.hidden = false;
  }
}

async function copyTextToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const fallback = document.createElement("textarea");
    fallback.value = text;
    fallback.setAttribute("readonly", "");
    fallback.style.position = "fixed";
    fallback.style.opacity = "0";
    document.body.append(fallback);
    fallback.select();
    try {
      if (!document.execCommand("copy")) throw new Error("Copy failed");
    } finally { fallback.remove(); }
  }
}

for (const promptDetails of document.querySelectorAll(".example-prompt")) {
  const promptCode = promptDetails.querySelector("pre code");
  const promptPre = promptDetails.querySelector("pre");
  if (!promptCode || !promptPre) continue;

  const copyRow = document.createElement("div");
  copyRow.className = "prompt-copy-row";
  const copyButton = document.createElement("button");
  copyButton.className = "prompt-copy-button";
  copyButton.type = "button";
  copyButton.innerHTML = `<svg aria-hidden="true" viewBox="0 0 24 24"><rect x="8" y="8" width="11" height="12" rx="2"></rect><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"></path></svg><span>Copy prompt</span>`;
  copyButton.setAttribute("aria-label", "Copy this example prompt");
  const copyStatusText = document.createElement("span");
  copyStatusText.className = "prompt-copy-status";
  copyStatusText.setAttribute("aria-live", "polite");
  copyRow.append(copyButton, copyStatusText);
  promptPre.before(copyRow);

  copyButton.addEventListener("click", async () => {
    try {
      await copyTextToClipboard(promptCode.textContent.trim());
      copyStatusText.textContent = "Copied";
    } catch {
      copyStatusText.textContent = "Automatic copy failed. Select the prompt and copy it manually.";
      return;
    }
    window.setTimeout(() => {
      copyStatusText.textContent = "";
    }, 1800);
  });
}
