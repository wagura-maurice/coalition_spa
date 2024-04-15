// src/utility/helper.ts
export function getQueryString(filters: any): string {
  let queryString = '';
  for (const key in filters) {
    if (filters[key]) {
      // Append the key and value in the desired format
      queryString += `filter[${key}]=${filters[key]}&`;
    }
  }
  // Remove the trailing '&' if it exists
  if (queryString.endsWith('&')) {
    queryString = queryString.slice(0, -1);
  }
  return queryString;
}

export function toUpperCase(value: string): string {
  return value.toUpperCase();
}

export function toLowerCase(value: string): string {
  return value.toLowerCase();
}

export function toTitleCase(value: string): string {
  return value.replace(/\b\w/g, char => char.toUpperCase());
}
