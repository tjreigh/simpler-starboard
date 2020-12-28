enum LogLevel {
	Error,
	Warning,
	Info,
	Debug,
}

export class Logger {
	constructor(level?: LogLevel) {
		this.level = level ?? LogLevel.Error;
	}

	public level: LogLevel;
}
