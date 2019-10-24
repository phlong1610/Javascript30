let countDown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds){
	clearInterval(countDown);
	const now = Date.now();
	const then = now + seconds * 1000;
	displayTimeLeft(seconds);
	displayEndTime(then);
	countDown = setInterval(() => {
		const secondsLeft = Math.round((then - Date.now()) / 1000);
		if(secondsLeft < 0){
			clearInterval(countDown);
			return;
		}

		displayTimeLeft(secondsLeft);
	},1000);
}

function displayTimeLeft(seconds){
	const days = Math.floor(seconds / (3600 * 24));
	let remainSeconds = seconds % (3600 * 24);
	const hours = Math.floor(remainSeconds / 3600);
	remainSeconds = remainSeconds % 3600;
	const minutes = Math.floor(remainSeconds / 60);
	remainSeconds = remainSeconds % 60;
	const display = `${minutes}:${remainSeconds < 10 ? '0' : ''}${remainSeconds}`;
	// console.log(days,hours,minutes,remainSeconds);
	document.title = display;
	timerDisplay.textContent = display;
}
function displayEndTime(timestamp){
	const end = new Date(timestamp);
	const hour = end.getHours();
	const adjHour = hour > 12 ? hour - 12 : hour;
	const minutes = end.getMinutes();
	endTime.textContent = `Be Back At ${adjHour}:${minutes < 10 ? '0' : ''}${minutes}`;
}
function startTimer(){
	const seconds = parseInt(this.dataset.time);
	timer(seconds);
}
buttons.forEach(button => button.addEventListener('click', startTimer));

document.customForm.addEventListener('submit',function(e){
	e.preventDefault();
	const mins = this.minutes.value;
	console.log(mins);
	timer(mins * 60);
	this.reset();
})