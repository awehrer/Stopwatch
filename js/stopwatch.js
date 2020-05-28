class Stopwatch
{
	constructor(clockElement)
	{
		this.clockElement = clockElement;
		this.timeSinceUpdate = -1;
		this.totalTimeElapsed = 0; // in milliseconds
		this.intervalId = -1;
	}
	
	start()
	{
		if (this.timeSinceUpdate < 0)
		{
			this.timeSinceUpdate = Date.now();
			
			// update clock ever 10 milliseconds (10 ms minimum time possible)
			this.intervalId = window.setInterval(this.update.bind(this), 10);
		}
	}
	
	stop()
	{
		if (this.intervalId >= 0)
		{
			clearInterval(this.intervalId);
			this.intervalId = -1;
			
			if (this.timeSinceUpdate > 0)
				this.update();
			
			this.timeSinceUpdate = -1;
		}
	}
	
	update()
	{
		var time = Date.now();
		this.totalTimeElapsed += time - this.timeSinceUpdate;
		this.timeSinceUpdate = time;
		
		time = new Date(this.totalTimeElapsed);
		var hours = time.getUTCHours().toString(); // regular getHours returns with timezone issues
		var min = time.getMinutes().toString();
		var sec = time.getSeconds().toString();
		var centisec = (Math.ceil(time.getMilliseconds() / 10) % 100).toString();
		
		this.clockElement.textContent = ""
										+ (hours.length < 2 ? "0" : "") + hours + ":"
										+ (min.length < 2 ? "0" : "") + min + ":"
										+ (sec.length < 2 ? "0" : "") + sec + "."
										+ (centisec.length < 2 ? "0" : "") + centisec;
	}
	
	resetToZero()
	{
		this.stop();
		this.totalTimeElapsed = 0;
		this.clockElement.textContent = "00:00:00.00";
	}
	
	isRunning()
	{
		return this.timeSinceUpdate >= 0;
	}
}