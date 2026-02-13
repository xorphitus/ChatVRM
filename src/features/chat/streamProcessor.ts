/**
 * Extract a leading [emotion] tag from streamed text.
 */
export function extractEmotionTag(text: string): {
  tag: string;
  remaining: string;
} {
  const tagMatch = text.match(/^\[(.*?)]/);
  if (tagMatch && tagMatch[0]) {
    return {
      tag: tagMatch[0],
      remaining: text.slice(tagMatch[0].length),
    };
  }
  return { tag: "", remaining: text };
}

/**
 * Split Japanese text at sentence boundaries.
 * Matches: any text ending with 。．！？\n, or 10+ chars followed by 、,
 */
export function extractSentence(text: string): {
  sentence: string;
  remaining: string;
} | null {
  const sentenceMatch = text.match(/^(.+[。．！？\n]|.{10,}[、,])/);
  if (sentenceMatch && sentenceMatch[0]) {
    const sentence = sentenceMatch[0];
    return {
      sentence,
      remaining: text.slice(sentence.length).trimStart(),
    };
  }
  return null;
}

/**
 * Returns false for strings that consist only of brackets/whitespace/punctuation.
 */
export function isSpeakable(sentence: string): boolean {
  return !!sentence.replace(
    /^[\s\[({「［（【『〈《〔｛«‹〘〚〛〙›»〕》〉』】）］」})\]]+$/g,
    "",
  );
}
