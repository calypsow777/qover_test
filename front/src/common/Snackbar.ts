type Severity = 'error' | 'success' | 'info' | 'warning' | undefined;

interface ConstructorParams {
  severity: Severity,
  msg: string,
  duration: number | null,
  canBeDumped: boolean,
  showClose: boolean,
}

export interface SnackbarOverride {
  severity?: string,
  msg?: string,
  duration?: number | null,
  canBeDumped?: boolean,
  showClose?: boolean,
}

export class Snackbar {
  severity: Severity;

  msg: string;

  duration: number | null;

  canBeDumped: boolean;

  showClose: boolean;

  constructor({
    severity, msg, duration, canBeDumped = false, showClose = false,
  }: ConstructorParams) {
    this.severity = severity;
    this.msg = msg;
    this.duration = duration;
    this.canBeDumped = canBeDumped;
    this.showClose = showClose;
  }
}
