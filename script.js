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
    privacyLegend: "Step 3: Anonymity screening",
    privacyHelp:
      "For hidden curriculum work, the main concern is keeping the text anonymous and not sharing workplace-sensitive information unnecessarily. This conservative screen checks for likely identifiers; it is a teaching and review aid, not a FERPA compliance decision.",
    generatedHelp:
      "Copy this prompt into an approved AI tool only after the privacy screen shows Clear to continue.",
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
    privacyLegend: "Step 3: PHI / protected-information screening",
    privacyHelp:
      "For IEP drafting, this safety step matters most. This conservative screen looks for likely identifiers and should show Clear to continue before you generate a prompt. It is a teaching and review aid, not a FERPA compliance decision.",
    generatedHelp:
      "Copy this prompt into an approved AI tool only after the privacy screen shows Clear to continue.",
    reviewHelp:
      "IEP drafting needs stronger review. Check that the output is individualized, accurate, defensible, and aligned with actual student data and team judgment.",
    purposes: [
      {
        value: "present_levels",
        label: "Summarize present levels",
        template: ({ sourceText }) =>
          `Use the following de-identified source notes to draft a present levels summary for educator review.\n\nSource text:\n${sourceText}\n\nPlease:\n1. Organize the information into a clear present levels draft.\n2. Separate strengths, current performance, supports, and areas of need when the source text supports that distinction.\n3. Keep the language specific and educationally useful.\n4. Do not invent data or overstate conclusions.\n5. Flag anything that is missing, unclear, or needs confirmation from the team.\n6. Keep this as a draft for human revision, not a final IEP statement.`,
      },
      {
        value: "iep_goal",
        label: "Draft annual goal options",
        template: ({ sourceText }) =>
          `Use the following de-identified source notes to draft possible annual goal language for educator review.\n\nSource text:\n${sourceText}\n\nPlease:\n1. Draft 2 to 3 possible annual goal options based only on the information provided.\n2. Keep the goals measurable and instructionally meaningful when the source text supports that.\n3. Note the skill area each goal addresses.\n4. Identify any parts that still need baseline data, clearer criteria, or team confirmation.\n5. Do not make placement, service, or readiness decisions.\n6. Keep this as draft language for revision by the educator and team.`,
      },
      {
        value: "iep_notes",
        label: "Organize source notes",
        template: ({ sourceText }) =>
          `Organize the following de-identified IEP source notes into a clearer drafting outline.\n\nSource text:\n${sourceText}\n\nPlease:\n1. Group related information together.\n2. Separate observations, strengths, needs, and possible next drafting steps when supported by the text.\n3. Identify statements that sound subjective or need evidence.\n4. Flag information that appears incomplete or ambiguous.\n5. Keep the output practical for educator drafting and review.`,
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
    privacyLegend: "Step 3: PHI / protected-information screening",
    privacyHelp:
      "For transition planning, use the minimum de-identified text needed. This conservative screen looks for likely identifiers and should show Clear to continue before you generate a prompt. It is a teaching and review aid, not a FERPA compliance decision.",
    generatedHelp:
      "Copy this prompt into an approved AI tool only after the privacy screen shows Clear to continue.",
    reviewHelp:
      "Transition planning output must still be checked against student voice, assessment evidence, feasibility, dignity, and full team review.",
    purposes: [
      {
        value: "assessment_analysis",
        label: "Analyze transition assessment data",
        template: ({ sourceText }) =>
          `Review the following de-identified transition assessment notes and summarize the main patterns for educator review.\n\nSource text:\n${sourceText}\n\nPlease:\n1. Identify themes related to strengths, interests, preferences, support needs, and skill development.\n2. Separate evidence from inference.\n3. Note any contradictions, gaps, or areas that need more information.\n4. Suggest questions the team may still need to discuss.\n5. Do not make final determinations about the student's future or services.`,
      },
      {
        value: "postsecondary_goals",
        label: "Suggest postsecondary goal options",
        template: ({ sourceText }) =>
          `Use the following de-identified transition planning notes to draft possible postsecondary goal options for educator review.\n\nSource text:\n${sourceText}\n\nPlease:\n1. Draft 2 to 3 possible postsecondary goal options grounded in the information provided.\n2. Keep the goals realistic, respectful, and student-centered.\n3. Note what evidence in the source text supports each option.\n4. Flag what still needs direct student input or team confirmation.\n5. Do not present any option as a final decision.`,
      },
      {
        value: "transition_services",
        label: "Draft transition services ideas",
        template: ({ sourceText }) =>
          `Use the following de-identified transition planning notes to draft possible transition services ideas for educator review.\n\nSource text:\n${sourceText}\n\nPlease:\n1. Suggest possible services, supports, or activities that align with the information provided.\n2. Tie each idea to an identified need, goal area, or skill area when possible.\n3. Keep the suggestions practical and school-team appropriate.\n4. Flag anything that depends on missing information or local context.\n5. Do not treat the output as a final service decision.`,
      },
      {
        value: "transition_annual_goals",
        label: "Draft transition annual goals",
        template: ({ sourceText }) =>
          `Use the following de-identified transition planning notes to draft possible annual transition goal language for educator review.\n\nSource text:\n${sourceText}\n\nPlease:\n1. Draft possible annual goals tied to transition-related skill development.\n2. Keep the goals specific and measurable when the source text supports that level of precision.\n3. Identify what baseline information or criteria may still be missing.\n4. Note where student preference or real-world context should shape revision.\n5. Keep this as draft language for educator and team review.`,
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

const privacyDetectors = [
  {
    id: "email",
    severity: "red",
    regex: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi,
    message: "Possible email address found",
    suggestion: "Remove email addresses or replace them with a generic label.",
  },
  {
    id: "phone",
    severity: "red",
    regex: /\b(?:\+?1[-.\s]?)?(?:\(?\d{3}\)?[-.\s]?){2}\d{4}\b/g,
    message: "Possible phone number found",
    suggestion: "Remove phone numbers or replace them with a generic label.",
  },
  {
    id: "address",
    severity: "red",
    regex:
      /\b\d{1,5}\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,4}\s(?:Street|St|Avenue|Ave|Road|Rd|Lane|Ln|Drive|Dr|Court|Ct|Boulevard|Blvd|Way|Circle|Cir|Place|Pl)\b/g,
    message: "Possible street address found",
    suggestion: "Remove street addresses and replace them with a non-identifying description.",
  },
  {
    id: "street_reference",
    severity: "red",
    regex:
      /\b(?:\d{1,3}(?:st|nd|rd|th)|[A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,2})\s(?:Street|St|Avenue|Ave|Road|Rd|Lane|Ln|Drive|Dr|Court|Ct|Boulevard|Blvd|Way|Circle|Cir|Place|Pl)\b/g,
    message: "Possible street or work-site reference found",
    suggestion: "Remove street names, street numbers, and work-site location details.",
  },
  {
    id: "dob",
    severity: "red",
    regex: /\b(?:DOB|D\.O\.B\.|date of birth|born on)\b[:\s-]*[A-Z0-9/,-]*/gi,
    message: "Possible date-of-birth detail found",
    suggestion: "Remove date-of-birth or birth-date references.",
  },
  {
    id: "student_id",
    severity: "red",
    regex: /\b(?:student id|ssid|id number|case number)\b[:#\s-]*[A-Z0-9-]{4,}\b/gi,
    message: "Possible student or case ID found",
    suggestion: "Remove ID or case numbers.",
  },
  {
    id: "labeled_name",
    severity: "red",
    regex:
      /\b(?:student|teacher|case manager|guardian|parent|mother|father|job coach|supervisor|counselor|principal|para|paraprofessional|manager|staff)\s*[:\-]?\s*[A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,2}\b/g,
    message: "Possible labeled person name found",
    suggestion: "Replace personal names with a role label such as 'student' or 'teacher'.",
  },
  {
    id: "titled_name",
    severity: "red",
    regex: /\b(?:Mr|Mrs|Ms|Miss|Dr)\.?\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?\b/g,
    message: "Possible personal name found",
    suggestion: "Remove titles and names or replace them with a generic role.",
  },
  {
    id: "initials",
    severity: "red",
    regex: /\b(?:[A-Z]\.){2,3}(?=\s|$)/g,
    message: "Possible student initials found",
    suggestion: "Remove initials and use a generic role such as 'student'.",
  },
  {
    id: "full_name",
    severity: "red",
    regex: /\b[A-Z][a-z]{1,}(?:\s+[A-Z][a-z]{1,}){1,2}\b/g,
    message: "Possible name or named place found",
    suggestion: "Remove personal names and generalize named places, schools, or employers.",
  },
  {
    id: "first_name_context",
    severity: "red",
    regex: /\b(?:Aiden|Ava|Daniel|Emma|Emily|James|Jennifer|John|Jordan|Joseph|Joshua|Lucas|Maria|Michael|Noah|Olivia|Robert|Sofia|William)\s+(?:is|has|needs|uses|benefits|works|attends|lives)\b/gi,
    message: "Possible personal name found",
    suggestion: "Replace personal names with a generic role such as 'student'.",
  },
  {
    id: "school",
    severity: "red",
    regex:
      /\b[A-Z][A-Za-z]+(?:\s+[A-Z][A-Za-z]+){0,4}\s(?:High School|Middle School|Elementary School|Academy|School District|District|School)\b/g,
    message: "Possible school or district name found",
    suggestion: "Generalize the school or district name.",
  },
  {
    id: "location",
    severity: "red",
    regex: /\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?\,\s?(?:AL|AK|AZ|AR|CA|CO|CT|DE|FL|GA|HI|IA|ID|IL|IN|KS|KY|LA|MA|MD|ME|MI|MN|MO|MS|MT|NC|ND|NE|NH|NJ|NM|NV|NY|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VA|VT|WA|WI|WV|WY)\b/g,
    message: "Possible city or state reference found",
    suggestion: "Generalize the town, city, or state reference if it is not essential.",
  },
  {
    id: "location_context",
    severity: "red",
    regex:
      /\b(?:in|near|from|to)\s+[A-Z][a-z]{2,}(?=[,.]|\s+(?:while|where|when|after|before|for|with|his|her|their)\b|$)/g,
    message: "Possible city or place reference found",
    suggestion: "Remove or generalize town, city, and other location references.",
  },
  {
    id: "class",
    severity: "red",
    regex:
      /\b(?:homeroom|[1-9](?:st|nd|rd|th)\s+period|period\s*[1-9]|[A-Z][a-z]+'s class|classroom\s+\d+|room\s+\d+)\b/gi,
    message: "Possible class or room identifier found",
    suggestion: "Remove class, period, or room identifiers if they are not necessary.",
  },
  {
    id: "medical",
    severity: "red",
    regex:
      /\b(?:medical history|diagnosis|diagnosed with|medication|therapy|hospitalized|autism|adhd|intellectual disability|emotional disturbance|traumatic brain injury)\b/gi,
    message: "Possible protected disability or medical detail found",
    suggestion: "Keep only the minimum protected detail needed, or generalize it further.",
  },
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

  for (const detector of privacyDetectors) {
    if (detector.areas && !detector.areas.includes(area)) continue;
    const regex = new RegExp(detector.regex.source, detector.regex.flags);
    const matches = [...trimmed.matchAll(regex)].slice(0, 3);
    for (const match of matches) {
      findings.push({
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
      copy: "No likely identifying or protected details were detected. You may continue, but this screen cannot guarantee that text is safe to share.",
      flags: [],
      suggestions: [],
      text: trimmed,
      highlights: [],
    };
  }

  const level = "red";
  const uniqueSuggestions = [...new Set(findings.map((finding) => finding.suggestion))];
  const topFindings = findings.slice(0, 6);
  const copy = "Possible identifying or protected information was detected. Remove or generalize every flagged detail before generating a prompt.";

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
  );
  privacySignal.classList.remove(
    "privacy-signal--pending",
    "privacy-signal--green",
    "privacy-signal--red",
  );

  const screenLevel = result.level || "pending";
  privacyScreen.classList.add(`privacy-screen--${screenLevel}`);
  privacySignal.classList.add(`privacy-signal--${screenLevel}`);

  const labelMap = {
    pending: "Needs review",
    green: "Clear to continue",
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
    generatePromptButton.disabled = screenLevel !== "green";
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

if (labForm && generatedPrompt) {
  renderAreaConfig(getSelectedArea());

  labForm.querySelectorAll('input[name="area"]').forEach((input) => {
    input.addEventListener("change", () => {
      renderAreaConfig(input.value);
      generatedPrompt.value = "";
      if (copyStatus) copyStatus.textContent = "";
    });
  });

  sourceTextInput?.addEventListener("input", () => {
    evaluatePrivacyScreen();
    generatedPrompt.value = "";
    if (copyStatus) copyStatus.textContent = "";
  });

  privacyRescan?.addEventListener("click", () => {
    evaluatePrivacyScreen();
  });

  labForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const selectedArea = getSelectedArea();
    const sourceText = sourceTextInput?.value.trim() || "";
    const selectedPurpose = labForm.querySelector('input[name="purpose"]:checked')?.value;
    const selectedConfig = areaConfigs[selectedArea];
    const selectedTemplate = selectedConfig?.purposes.find((purpose) => purpose.value === selectedPurpose);
    const privacyResult = evaluatePrivacyScreen();

    if (!sourceText) {
      generatedPrompt.value = "Paste source text before generating a prompt.";
      return;
    }

    if (privacyResult.level !== "green") {
      generatedPrompt.value =
        "The privacy screen has not cleared this text yet. Remove or generalize the flagged details until the status turns green.";
      return;
    }

    if (!selectedTemplate) {
      generatedPrompt.value = "Choose a drafting task before generating a prompt.";
      return;
    }

    generatedPrompt.value = selectedTemplate.template({ sourceText });
    if (copyStatus) {
      copyStatus.textContent = "Prompt generated.";
    }
  });
}

if (copyPromptButton && generatedPrompt) {
  copyPromptButton.addEventListener("click", async () => {
    if (!generatedPrompt.value.trim()) {
      if (copyStatus) copyStatus.textContent = "Generate a prompt first.";
      return;
    }

    try {
      await navigator.clipboard.writeText(generatedPrompt.value);
      if (copyStatus) copyStatus.textContent = "Prompt copied.";
    } catch {
      generatedPrompt.select();
      document.execCommand("copy");
      if (copyStatus) copyStatus.textContent = "Prompt copied.";
    }
  });
}

if (clearLabButton && labForm && generatedPrompt) {
  clearLabButton.addEventListener("click", () => {
    labForm.reset();
    const defaultArea = labForm.querySelector('input[name="area"][value="hidden_curriculum"]');
    if (defaultArea) defaultArea.checked = true;
    renderAreaConfig("hidden_curriculum");
    if (sourceTextInput) sourceTextInput.value = "";
    generatedPrompt.value = "";
    if (copyStatus) copyStatus.textContent = "";
    evaluatePrivacyScreen();
  });
}
