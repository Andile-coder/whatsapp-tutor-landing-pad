export type BaseDocumentFormState = {
  document_type: string;
  description: string;
  year: string;
  grade: string;
  subject: string;
  paper: string;
  language: string;
  publisher: string;
  province: string;
  term: string;
};

export const documentTypeOptions = [
  { value: "question_paper", label: "Question paper" },
  { value: "memorandum", label: "Memorandum" },
  { value: "study_guide", label: "Study guide" },
  { value: "prospectus", label: "Prospectus" },
];

export const gradeOptions = ["8", "9", "10", "11", "12"];
export const languageOptions = ["English", "Afrikaans"];
export const paperOptions = ["P1", "P2", "P3"];
export const publisherOptions = ["DBE", "IEB", "School", "Other"];
export const provinceOptions = [
  "National",
  "Eastern Cape",
  "Free State",
  "Gauteng",
  "KwaZulu-Natal",
  "Limpopo",
  "Mpumalanga",
  "North West",
  "Northern Cape",
  "Western Cape",
];
export const termOptions = [
  "February/March",
  "June",
  "September",
  "November",
  "Trial",
  "Term 1",
  "Term 2",
  "Term 3",
  "Term 4",
];

export const sanitizeFileName = (filename: string) =>
  filename.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9._-]/g, "");

export const buildPaperFolderPath = (form: Pick<BaseDocumentFormState, "year" | "grade">) => {
  const year = form.year.trim() || "unknown-year";
  const grade = form.grade.trim() || "unknown-grade";

  return `past-exam-papers/${year}/${grade}`;
};

export const buildDefaultDescription = (form: BaseDocumentFormState) =>
  [
    `Grade ${form.grade}`.trim(),
    form.subject.trim(),
    form.paper.trim(),
    form.term.trim(),
    form.year.trim(),
    form.language.trim(),
    form.document_type === "memorandum" ? "memorandum" : "question paper",
  ]
    .filter(Boolean)
    .join(" ");
