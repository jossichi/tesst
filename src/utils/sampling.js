// src/utils/sampling.js
export function sampleWithBadge(array, maxItems = 30) {
  const total = array.length;
  const sampled = array.slice(0, maxItems);
  const extra = total - sampled.length;

  return { sampled, total, extra, maxItems };
}

export function sampleObjectEntries(obj, maxItems = 30) {
  const entries = Object.entries(obj);
  return sampleWithBadge(entries, maxItems);
}
