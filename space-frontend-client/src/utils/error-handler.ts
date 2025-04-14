/**
 * Helper function to extract error messages from API errors
 * @param error Error object from API call
 * @param fallbackMessage Default message if API doesn't provide one
 * @returns Error message string
 */
export const getErrorMessage = (
  error: unknown,
  fallbackMessage = "Ocorreu um erro inesperado. Tente novamente mais tarde.",
): string => {
  // If it's a regular Error object, return its message
  if (error instanceof Error) {
    return error.message;
  }

  // For any other type of error, return the fallback message
  return fallbackMessage;
};

/**
 * Helper function to get the appropriate severity for API error status codes
 * @param statusCode HTTP status code
 * @returns 'error', 'warning', or 'info' based on status code
 */
export const getErrorSeverity = (
  statusCode: number,
): "error" | "warning" | "info" => {
  if (statusCode >= 500) {
    return "error";
  }
  if (statusCode >= 400) {
    return "warning";
  }
  return "info";
};
