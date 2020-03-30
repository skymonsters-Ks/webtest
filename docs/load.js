var Module = {

	// TOTAL_MEMORY: 1024 * 1024 * 16,
	preRun: [],
	postRun: [],

	print: function(text) {
		if (text) {
			console.log(text);
		}
	},

	printErr: function(text) {
		console.error(text);
	},

	canvas: document.getElementById('canvas'),

	setStatus: function(text) {
		if (!this.pretext) this.pretext = '';
		if (text === this.pretext) return;
		this.pretext = text;
		const statusElement = document.getElementById('status');
		if (!text) {
			statusElement.style.display = 'none';
		} else {
			console.log(text);
		}
		statusElement.innerHTML = text;
	},
	
	arguments: [PRELOAD_FILES[0]]
};

Module.setStatus('Loading...');

Module.preRun.push(function() {
	let loadcnt = 0;
	const dirList = [];
	for (const fn of PRELOAD_FILES) {
		const idx = fn.lastIndexOf('/');
		if (idx > 0) {
			const dir = fn.slice(0, idx);
			if (dirList.indexOf(dir) < 0) {
				dirList.push(dir);
				FS.mkdir(dir);
			}
		}
		console.log('!!!');
		FS.createPreloadedFile(fn, '', '' + fn, true, false, ()=>{
			loadcnt++;
			Module.setStatus('Loading... (' + loadcnt + '/' + PRELOAD_FILES.length + ')');
		});
	}
	ENV = JSON.parse(DISH_ENV);
});

function resizeCanvas() {
	const w = window.innerWidth;
	const h = window.innerHeight;
	const cs = Module.canvas.style;
	const cw = Module.canvas.width;
	const ch = Module.canvas.height;
	if (w * ch / cw > h) {
		const nw = h * cw / ch;
		cs.width = nw + 'px';
		cs.top = '0';
		cs.left = (w - nw) / 2 + 'px';
	} else {
		const nh = w * ch / cw;
		cs.width = '100%';
		cs.top = (h - nh) / 2 + 'px';
		cs.left = '0';
	}
}

window.onresize = resizeCanvas;
resizeCanvas();
