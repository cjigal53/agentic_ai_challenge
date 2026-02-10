/**
 * Utility functions for the Todo App
 */

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Named constants for time thresholds
 */
const ONE_MINUTE = 60 * 1000; // 60 seconds in ms
const ONE_HOUR = 60 * 60 * 1000; // 60 minutes in ms
const ONE_DAY = 24 * 60 * 60 * 1000; // 24 hours in ms

/**
 * Formats a task timestamp to display relative time for recent tasks
 * and absolute dates for older tasks.
 *
 * @param date - The Date object to format
 * @returns Formatted timestamp string
 *
 * @example
 * formatTaskTimestamp(new Date(Date.now() - 30000)) // "just now"
 * formatTaskTimestamp(new Date(Date.now() - 5 * 60000)) // "5 minutes ago"
 * formatTaskTimestamp(new Date(Date.now() - 3 * 3600000)) // "3 hours ago"
 * formatTaskTimestamp(new Date(Date.now() - 2 * 86400000)) // "Feb 10, 2026"
 */
export function formatTaskTimestamp(date: Date): string {
  // Handle invalid dates
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return 'Invalid date';
  }

  const now = Date.now();
  const timestamp = date.getTime();
  const diff = now - timestamp;

  // Handle future dates or negative time (clock skew)
  if (diff < 0) {
    return date.toLocaleDateString();
  }

  // Less than 1 minute: "just now"
  if (diff < ONE_MINUTE) {
    return 'just now';
  }

  // Less than 60 minutes: "X minutes ago"
  if (diff < ONE_HOUR) {
    const minutes = Math.floor(diff / ONE_MINUTE);
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  }

  // Less than 24 hours: "X hours ago"
  if (diff < ONE_DAY) {
    const hours = Math.floor(diff / ONE_HOUR);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  }

  // 24 hours or more: absolute date
  return date.toLocaleDateString();
}
