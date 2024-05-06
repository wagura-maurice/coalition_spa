// src/utility/helper.ts
import { format } from 'date-fns';

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

export function formatDueDate(dueDate: any): string {
  // Check if dueDate is already a Date object
  if (!(dueDate instanceof Date)) {
    // Parse dueDate to a Date object if it's not already
    dueDate = new Date(dueDate);
  }
  
  if (!dueDate || isNaN(dueDate.getTime())) return ''; // Return empty string if dueDate is null, undefined, or not a valid date
  return format(dueDate, 'MMM dd, yyyy hh:mm:ss a'); // Customize the format as needed
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

export const Priority = {
  URGENT: 'Urgent',
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low',
  CRITICAL: 'Critical',
  NORMAL: 'Normal',
  EMERGENCY: 'Emergency',
  DEFERRED: 'Deferred',
  OPTIONAL: 'Optional',
  ROUTINE: 'Routine'
};

export function getPriorityName(priority: number): string {
  switch (priority) {
    case 0: return Priority.URGENT;
    case 1: return Priority.HIGH;
    case 2: return Priority.MEDIUM;
    case 3: return Priority.LOW;
    case 4: return Priority.CRITICAL;
    case 5: return Priority.NORMAL;
    case 6: return Priority.EMERGENCY;
    case 7: return Priority.DEFERRED;
    case 8: return Priority.OPTIONAL;
    case 9: return Priority.ROUTINE;
    default: return '';
  }
}

export function getPriorityColor(priority: number): string {
  switch (priority) {
    case 0: return 'bg-red-500'; // Urgent
    case 1: return 'bg-yellow-500'; // High
    case 2: return 'bg-green-500'; // Medium
    case 3: return 'bg-blue-500'; // Low
    case 4: return 'bg-purple-500'; // Critical
    case 5: return 'bg-gray-500'; // Normal
    case 6: return 'bg-yellow-500'; // Emergency
    case 7: return 'bg-gray-500'; // Deferred
    case 8: return 'bg-gray-500'; // Optional
    case 9: return 'bg-gray-500'; // Routine
    default: return 'bg-gray-500'; // Default color
  }
}

export const Status = {
  PENDING: 'Pending',
  PROCESSING: 'Processing',
  PROCESSED: 'Processed',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled'
};

export function getStatusName(status: number): string {
  switch (status) {
    case 0: return Status.PENDING;
    case 1: return Status.PROCESSING;
    case 2: return Status.PROCESSED;
    case 3: return Status.COMPLETED;
    case 4: return Status.CANCELLED;
    default: return '';
  }
}

export function getStatusColor(status: number): string {
  switch (status) {
    case 0: return 'bg-blue-500'; // Pending
    case 1: return 'bg-yellow-500'; // Processing
    case 2: return 'bg-green-500'; // Processed
    case 3: return 'bg-purple-500'; // Completed
    case 4: return 'bg-red-500'; // Cancelled
    default: return 'bg-gray-500'; // Default color
  }
}

export function truncatedDescription(text: string): string {
  if (!text) return '';

  const maxLength = 100;
  if (text.length <= maxLength) return text;

  // Find the index of the last space within the first 100 characters
  const lastSpaceIndex = text.lastIndexOf(' ', maxLength);

  // If the last space exists and is not the last character, truncate the text
  if (lastSpaceIndex !== -1 && lastSpaceIndex !== maxLength - 1) {
    return text.substring(0, lastSpaceIndex) + '...';
  } else {
    // If no space found or last space is the last character, truncate at 100 characters
    return text.substring(0, maxLength) + '...';
  }
}
