/**
 * Evaluation data for the road-surface monitoring project.
 *
 * These are the published results of the method the project is built on —
 * Varona, Monteserin & Teyseyre, "A deep learning approach to automatic road
 * surface monitoring and pothole detection", Personal and Ubiquitous Computing
 * 24:519–534 (2020). Tables 1–2 and Figures 11–13.
 *
 * Transcribed verbatim. Do not round, re-scale or "improve" these numbers: the
 * whole point of showing them is that they are somebody's actual measurements,
 * including the parts that look bad.
 */

export type ModelId = "cnn" | "lstm" | "rc" | "tc" | "dtw" | "egr";

export const MODELS: { id: ModelId; label: string; family: "deep" | "baseline" }[] = [
  { id: "cnn", label: "CNN", family: "deep" },
  { id: "lstm", label: "LSTM", family: "deep" },
  { id: "rc", label: "Reservoir", family: "deep" },
  { id: "tc", label: "TClass", family: "baseline" },
  { id: "dtw", label: "DTW", family: "baseline" },
  { id: "egr", label: "EasyGR-NB", family: "baseline" },
];

export type TaskId = "surface" | "event" | "binary";

export const TASKS: {
  id: TaskId;
  label: string;
  short: string;
  question: string;
  classes: string[];
}[] = [
  {
    id: "surface",
    label: "Road surface classification",
    short: "Surface",
    question: "What am I driving on?",
    classes: ["Asphalt", "Cobbles", "Concrete", "Dirt"],
  },
  {
    id: "event",
    label: "Stability event classification",
    short: "Event",
    question: "What just shook the vehicle?",
    classes: ["Call", "Door", "Message", "Pothole", "Speed bump", "Street gutter"],
  },
  {
    id: "binary",
    label: "Pothole / no-pothole",
    short: "Pothole",
    question: "Was that a pothole, or not?",
    classes: ["Pothole", "No pothole"],
  },
];

/** Overall accuracy per model per task. Only CNN is reported for the binary task. */
export const ACCURACY: Record<TaskId, Partial<Record<ModelId, number>>> = {
  surface: { cnn: 0.85, lstm: 0.66, rc: 0.68, tc: 0.84, dtw: 0.54, egr: 0.64 },
  event: { cnn: 0.93, lstm: 0.82, rc: 0.75, tc: 0.78, dtw: 0.78, egr: 0.79 },
  binary: { cnn: 0.98 },
};

/**
 * Confusion matrices, rows = true label, columns = predicted label.
 * Figures 11 (surface), 12 (event) and 13 (binary).
 */
export const CONFUSION: Record<TaskId, Partial<Record<ModelId, number[][]>>> = {
  surface: {
    cnn: [
      [2205, 99, 11, 37],
      [227, 1982, 52, 58],
      [99, 127, 1716, 239],
      [57, 211, 189, 1906],
    ],
    lstm: [
      [2203, 60, 15, 74],
      [501, 1383, 182, 253],
      [362, 185, 1132, 502],
      [345, 292, 368, 1358],
    ],
    rc: [
      [2020, 168, 47, 116],
      [622, 670, 509, 516],
      [197, 73, 1596, 172],
      [365, 96, 416, 1484],
    ],
    tc: [
      [2196, 116, 17, 23],
      [160, 1967, 63, 129],
      [68, 80, 1853, 180],
      [147, 279, 165, 1772],
    ],
    dtw: [
      [1541, 45, 418, 347],
      [197, 1184, 425, 511],
      [95, 386, 1260, 297],
      [565, 324, 550, 922],
    ],
    // NB: the paper prints the RC matrix again under EasyGR-NB even though the
    // stated accuracies differ (0.68 vs 0.64). Reproduced as published.
    egr: [
      [2020, 168, 47, 116],
      [622, 670, 509, 516],
      [197, 73, 1596, 172],
      [365, 96, 416, 1484],
    ],
  },
  event: {
    cnn: [
      [256, 6, 9, 1, 3, 0],
      [0, 302, 0, 0, 0, 0],
      [3, 13, 246, 1, 0, 0],
      [0, 0, 1, 246, 5, 0],
      [9, 0, 7, 28, 200, 12],
      [0, 0, 3, 1, 15, 241],
    ],
    lstm: [
      [244, 6, 6, 14, 0, 5],
      [0, 299, 1, 2, 0, 0],
      [1, 13, 236, 1, 2, 10],
      [0, 0, 0, 251, 1, 0],
      [76, 0, 3, 32, 84, 61],
      [0, 0, 3, 1, 52, 204],
    ],
    rc: [
      [251, 8, 15, 0, 1, 0],
      [0, 301, 1, 0, 0, 0],
      [1, 13, 249, 0, 0, 0],
      [0, 0, 1, 235, 15, 1],
      [0, 0, 5, 34, 164, 53],
      [0, 0, 3, 1, 251, 5],
    ],
    tc: [
      [233, 3, 28, 8, 3, 0],
      [0, 262, 35, 4, 1, 0],
      [8, 8, 243, 1, 1, 2],
      [0, 0, 0, 236, 15, 1],
      [0, 1, 1, 32, 172, 50],
      [0, 0, 3, 0, 143, 114],
    ],
    dtw: [
      [220, 5, 48, 0, 0, 0],
      [0, 299, 2, 0, 0, 0],
      [1, 18, 242, 0, 0, 0],
      [0, 2, 1, 248, 0, 0],
      [0, 0, 9, 30, 173, 43],
      [32, 0, 3, 1, 151, 72],
    ],
    egr: [
      [259, 5, 3, 3, 3, 0],
      [1, 293, 7, 0, 0, 0],
      [18, 12, 231, 0, 0, 0],
      [14, 0, 4, 227, 6, 0],
      [0, 0, 2, 32, 203, 18],
      [0, 6, 3, 1, 191, 58],
    ],
  },
  binary: {
    cnn: [
      [246, 6],
      [31, 1325],
    ],
  },
};

/**
 * Per-class F-measure for the stability-event task (Table 2). This is the most
 * informative view in the paper: every model finds potholes, and almost every
 * model falls apart on the two classes that *cause* false pothole reports.
 */
export const F_MEASURE: { cls: string; scores: Record<ModelId, number> }[] = [
  { cls: "Call", scores: { cnn: 0.94, lstm: 0.82, rc: 0.95, tc: 0.9, dtw: 0.84, egr: 0.92 } },
  { cls: "Door", scores: { cnn: 0.97, lstm: 0.96, rc: 0.96, tc: 0.91, dtw: 0.96, egr: 0.95 } },
  { cls: "Message", scores: { cnn: 0.93, lstm: 0.92, rc: 0.93, tc: 0.85, dtw: 0.86, egr: 0.9 } },
  { cls: "Pothole", scores: { cnn: 0.93, lstm: 0.91, rc: 0.9, tc: 0.89, dtw: 0.94, egr: 0.88 } },
  { cls: "Speed bump", scores: { cnn: 0.84, lstm: 0.43, rc: 0.48, tc: 0.58, dtw: 0.6, egr: 0.62 } },
  { cls: "Street gutter", scores: { cnn: 0.94, lstm: 0.76, rc: 0.03, tc: 0.53, dtw: 0.39, egr: 0.35 } },
];

export const PAPER_CREDIT =
  "Varona, Monteserin & Teyseyre — “A deep learning approach to automatic road surface monitoring and pothole detection”, Personal and Ubiquitous Computing 24:519–534 (2020). Figures reproduced from the published results.";
