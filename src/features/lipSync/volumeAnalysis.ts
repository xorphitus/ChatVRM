/**
 * Calculate volume from time-domain audio data.
 * Finds max absolute amplitude, applies sigmoid transform, and thresholds.
 */
export function calculateVolume(timeDomainData: Float32Array): number {
  let volume = 0.0;
  for (let i = 0; i < timeDomainData.length; i++) {
    volume = Math.max(volume, Math.abs(timeDomainData[i]));
  }

  // Sigmoid cook
  volume = 1 / (1 + Math.exp(-45 * volume + 5));
  if (volume < 0.1) volume = 0;

  return volume;
}
