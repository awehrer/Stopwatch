var nextTimerId = 0;

/*
<div id="stopwatch[ID]" class="stopwatch-container">
	<span id="clock[ID]" class="clock">00:00:00.00</span>
	<div class="stopwatch-buttons">
		<button id="toggleRunButton0">Start</button>
		<button id="resetButton0">Reset</button>
	<div>
</div>
*/
function createStopwatchElement(id)
{
	var stopwatchElement = document.createElement("div");
	stopwatchElement.setAttribute("id", "stopwatch" + id);
	stopwatchElement.setAttribute("class", "stopwatch-container");
	
	var clockElement = document.createElement("span");
	clockElement.setAttribute("id", "clock" + id);
	clockElement.setAttribute("class", "clock");
	clockElement.textContent = "00:00:00.00";
	
	var stopwatchButtonPane = document.createElement("div");
	stopwatchButtonPane.setAttribute("class", "stopwatch-buttons");
	
	var runButton = document.createElement("button");
	runButton.setAttribute("id", "toggleRunButton" + id);
	runButton.textContent = "Start";
	
	var resetButton = document.createElement("button");
	resetButton.setAttribute("id", "resetButton" + id);
	resetButton.textContent = "Reset";
	
	stopwatchButtonPane.appendChild(runButton);
	stopwatchButtonPane.appendChild(resetButton);
	stopwatchElement.appendChild(clockElement);
	stopwatchElement.appendChild(stopwatchButtonPane);
	
	return stopwatchElement;
}

function setupStopwatchControls(id)
{
	var stopwatch = new Stopwatch(document.getElementById("clock" + id));
	var toggleRunButton = document.getElementById("toggleRunButton" + id);
	toggleRunButton.addEventListener("click", function()
	{
		if (stopwatch.isRunning())
		{
			stopwatch.stop();
			toggleRunButton.textContent = "Start";
		}
		else
		{
			stopwatch.start();
			toggleRunButton.textContent = "Stop";
		}
	});
	
	var resetButton = document.getElementById("resetButton" + id);
	
	resetButton.addEventListener("click", function()
	{
		stopwatch.resetToZero();
		toggleRunButton.textContent = "Start";
	});
	
}

function createNewStopwatch()
{
	var id = nextTimerId;
	nextTimerId++;
	
	var stopwatchElement = createStopwatchElement(id);
	document.getElementById("stopwatches").appendChild(stopwatchElement);
	setupStopwatchControls(id);
}

document.getElementById("addStopwatchButton").addEventListener("click", function()
{
	createNewStopwatch();
});