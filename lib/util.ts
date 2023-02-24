export function formDataToObject(fd: FormData): Record<string, string> {
  const toReturn = {};
  for (const [key, value] of fd.entries()) {
    toReturn[key] = value;
  }

  return toReturn;
}
