const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


function togglePlay(){
	const method = video.paused ? 'play' : 'pause';
	video[method]();
}

function updateButtonPlay(){
	const icon = this.paused ? '►' : '❚ ❚';
	toggle.textContent = icon;
}
function skipTime(){
	video.currentTime += parseInt(this.dataset.skip);
	console.log(video.currentTime);
}
function handleRangeUpdate(){
	video[this.name] = this.value;
}
function handleProgress(){
	const percent = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${percent}%`;
}
function scrub(ele){
	const scrubTime = (ele.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = scrubTime;
}
video.addEventListener('click',togglePlay);
video.addEventListener('play',updateButtonPlay);
video.addEventListener('pause',updateButtonPlay);
video.addEventListener('timeupdate',handleProgress);
toggle.addEventListener('click',togglePlay);
skipButtons.forEach(button => button.addEventListener('click',skipTime));
ranges.forEach(range => range.addEventListener('click',handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove',handleRangeUpdate));
let mouse = false;
progress.addEventListener('click',scrub);
progress.addEventListener('mousemove',(e) => mouse && scrub(e));
progress.addEventListener('mousedown',() => mouse = true);
progress.addEventListener('mouseup',() => mouse = false);