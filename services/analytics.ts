function logStepCompleted(stepNumber: number): void {
  console.log(`[Analytics] User pass step ${stepNumber}`)
}

function logCompletion(): void {
  console.log('[Analytics] User completed the process')
}

function logTestAB(variant: string): void {
  console.log(`[Analytics] Test A/B: Variant: ${variant}`)
}

export const analytics = {
  logStepCompleted,
  logCompletion,
  logTestAB
}