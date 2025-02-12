export function esfsDateConvertHtmlToJs(htmlDate: string): Date | null {
  if (htmlDate === '') {
    return null;
  }

  return new Date(htmlDate);
}

export function esfsDateConvertJsToHtml(jsDate: Date | null): string {
  if (!jsDate || isNaN(jsDate.getTime())) {
    return '';
  }

  return jsDate.toISOString().split('T')[0];
}

export function esfsDateIsValid(date: string | Date | null): boolean {
  if (typeof date === 'string') {
    const d = esfsDateConvertHtmlToJs(date);
    return esfsDateIsValid(d);
  }

  if (date === null) {
    return false;
  }

  return !isNaN(date.getTime());
}
