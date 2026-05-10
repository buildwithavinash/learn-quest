const ROADMAPS_KEY = "learnquest-roadmaps";
const PROGRESS_KEY = "learnquest-progress";

function readJson(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (error) {
    console.error(`Unable to read ${key} from localStorage:`, error);
    return fallback;
  }
}

export function getRoadmaps() {
  const roadmaps = readJson(ROADMAPS_KEY, []);

  if (!Array.isArray(roadmaps)) {
    return [];
  }

  return roadmaps.filter((roadmap) => {
    return (
      roadmap &&
      roadmap.id !== undefined &&
      typeof roadmap.goal === "string" &&
      Array.isArray(roadmap.weeks)
    );
  });
}

export function saveRoadmaps(roadmaps) {
  localStorage.setItem(ROADMAPS_KEY, JSON.stringify(roadmaps));
}

export function getProgress() {
  const progress = readJson(PROGRESS_KEY, {});
  return progress && typeof progress === "object" && !Array.isArray(progress)
    ? progress
    : {};
}

export function saveProgress(progress) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}
