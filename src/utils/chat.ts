export function retrieveCodeFromMdString(mdString: string): string | null {
  const codeRegex = /```(.|\n)*?```/g;
  const codeMatch = mdString.match(codeRegex);
  if (codeMatch) {
    const code = codeMatch[0];
    return code.replaceAll('```', '');
  }
  const codeRegex2 = /\n\n`(.|\n)*?`/g;
  const codeMatch2 = mdString.match(codeRegex2);
  if (codeMatch2) {
    const code = codeMatch2[0].trim();
    return code.replace(/^`/, '').replace(/`$/, '');
  }
  return null;
}
