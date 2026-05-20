import { defineConfig } from "allure";
// Charts configuration with all chart types and all options set to default values
const allChartsDefaultValues = [
  {
    type: "currentStatus",
    title: "Current status",
    statuses: ["passed", "failed", "broken", "skipped", "unknown"], //included statuses
    metric: "passed", // status used to calculate the central percentage value
  },

  {
    type: "testResultSeverities",
    title: "Test results by severities",
    levels: ["blocker", "critical", "normal", "minor", "trivial"],  //included severities
    statuses: ["passed", "failed", "broken", "skipped", "unknown"], //included statuses
    includeUnset: true, //whether to show the “No severity“ section
  },

  {
    type: "statusDynamics",
    title: "Status dynamics",
    limit: 10, // number of shown runs, including the latest
    statuses: ["passed", "failed", "broken", "skipped", "unknown"], //included statuses
  },

  {
    type: "statusTransitions",
    title: "Status transitions",
    limit: 10, // number of shown runs, including the latest
  },

  {
    type: "testBaseGrowthDynamics",
    title: "Test base growth dynamics",
    statuses: ["passed", "failed", "broken", "skipped", "unknown"], //included statuses
    limit: 10, // number of shown runs, including the latest
  },  

  {
    type: "coverageDiff",
    title: "Coverage diff map",
  },

  {
    type: "successRateDistribution",
    title: "Success rate distribution",
  },

  {
    type: "problemsDistribution",
    title: "Problems distribution by environment",
    by: "environment", //can only be grouped by environments
  },

  {
    type: "stabilityDistribution",
    title: "Stability distribution by features",
    threshold: 90, // acceptable stability level in %
    skipStatuses: ["skipped", "unknown"], //skipped test statuses
    groupBy: "feature", //by what label to group the tests together
  },

  {
    type: "stabilityDistribution",
    title: "Stability distribution by epics",
    threshold: 90, // acceptable stability level in %
    skipStatuses: ["skipped", "unknown"], //skipped test statuses
    groupBy: "epic", //by what label to group the tests together
  },

  {
    type: "stabilityDistribution",
    title: "Stability distribution by stories",
    threshold: 90,  // acceptable stability level in %
    skipStatuses: ["skipped", "unknown"], //skipped test statuses
    groupBy: "story", //by what label to group the tests together
  },

  {
    type: "durations",
    title: "Durations histogram",
    groupBy: "none", //whether to group the tests by layer (other labels not supported)
  },

  {
    type: "durations",
    title: "Durations by layer histogram",
    groupBy: "layer", //whether to group the tests by layer (other labels not supported)
  },

  {
    type: "durationDynamics",
    title: "Durations dynamics",
    limit: 10, // number of shown runs, including the latest
  },

  {
    type: "statusAgePyramid",
    title: "Status age pyramid",
    limit: 10, // number of shown runs, including the latest
  },

  {
    type: "testingPyramid",
    title: "Testing pyramid",
    layers: ["unit", "integration", "e2e"], //layers of the pyramid, bottom to top
  },
];

export default defineConfig({
name: "Stratpoint Automation Template Report",
  output: "./allure-report",
  // history file configuration is required to populate most charts
  historyPath: "./history.jsonl",
  // knownIssuesPath: "",
  appendHistory: true,
  variables: {
    "App Version": "1.0.0",
    "Test Suite": "Regression v1.0",
    "Launch Date": "2026-3-19",
    "Build Number": "Dev#1923",
    "Environment": "QA/UAT"
  },
  environments: {
    windows: {
      matcher: ({ labels }) =>
        labels.find(({ name, value }) => name === "os" && value === "Windows"),
      variables: {
        "OS": "Windows 11",
        "Architecture": "x64"
      }
    },
    macos: {
      matcher: ({ labels }) =>
        labels.find(({ name, value }) => name === "os" && value === "macOS"),
      variables: {
        "OS": "macOS Sonoma",
        "Architecture": "arm64"
      }
    },
    linux: {
      matcher: ({ labels }) =>
        labels.find(({ name, value }) => name === "os" && value === "Linux"),
      variables: {
        "OS": "Ubuntu 22.04",
        "Architecture": "x64"
      }
    }
  },
  defaultLabels: {
    "severity": "normal",
    "owner": "unassigned",
    "layer": "unknown",
    "tags": ["needs-review"]
  },
  plugins: {
    awesome: {
      options: {
        reportName: "Allure Report",
        singleFile: false,
        reportLanguage: "en",
        // charts configuration used within the Awesome report
        charts: allChartsDefaultValues, 
      },
    },
  },
  qualityGate: {
    rules: [
      {
        id: "failure-threshold",
        maxFailures: 0, //Maximum allowed number of failed tests
        // fastFail: true,
      },
      {
        id: "success-rate-check",
        successRate: 0.95, //Minimum required success rate for tests Ratio (0.0 to 1.0)
      },
      {
        id: "test-volume-check",
        minTestsCount: 10, //Minimum required number of executed tests
      },
      {
        id: "test-duration-check",
        maxDuration: 30000, //Maximum allowed duration for any single test
      },
    ],
  }
});