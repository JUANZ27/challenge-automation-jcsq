export function logInfo(message: string): void {
  console.log(`[${new Date().toISOString()}] ${message}`);
}

export function logTestFinished(testTitle: string): void {
  console.log(`[${new Date().toISOString()}] Test finished: ${testTitle}`);
}
