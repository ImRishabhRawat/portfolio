gsap.registerPlugin(ScrollTrigger);



function init() {
	gsap.registerPlugin(ScrollTrigger);

	// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

	const locoScroll = new LocomotiveScroll({
		el: document.querySelector("#main"),
		smooth: true,
	});
	// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
	locoScroll.on("scroll", ScrollTrigger.update);

	// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
	ScrollTrigger.scrollerProxy("#main", {
		scrollTop(value) {
			return arguments.length
				? locoScroll.scrollTo(value, 0, 0)
				: locoScroll.scroll.instance.scroll.y;
		}, // we don't have to define a scrollLeft because we're only scrolling vertically.
		getBoundingClientRect() {
			return {
				top: 0,
				left: 0,
				width: window.innerWidth,
				height: window.innerHeight,
			};
		},
		// LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
		pinType: document.querySelector("#main").style.transform
			? "transform"
			: "fixed",
	});

	ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

	ScrollTrigger.refresh();
}

init();


function circleMouseFolower(x, y) {
	let width = x / 2;
	let height = y / 2;

	document.addEventListener("mousemove", function (dets) {
		let cursorx = dets.x - width + "px";
		let cursory = dets.y - height + "px";

		cursor.style.transform = `translate(${cursorx},${cursory})`;
	});
}
var cursor = document.querySelector("#cursor");
var width = cursor.offsetWidth;
var height = cursor.offsetHeight;
circleMouseFolower(width, height);

function head() {
	let heading = document.querySelector("#heading");

	heading.addEventListener("mousemove", () => {
		cursor.style.width = 150 + "px";
		cursor.style.height = 150 + "px";
		let x = 150;
		let y = 150;
		circleMouseFolower(x, y);
	});

	heading.addEventListener("mouseleave", () => {
		cursor.style.width = 10 + "px";
		cursor.style.height = 10 + "px";
		let x = 10;
		let y = 10;
		circleMouseFolower(x, y);
	});
}
head();

const timeline = gsap.timeline();
timeline.from("#nav", { opacity: 0, y: -50, stagger: 0.3 });
timeline.from("#heading h1, #heading h2", { opacity: 0, y: 50, stagger: 0.2 });
timeline.from(".rotated", { opacity: 0, rotation: -45, y: -20 }, "-=0.5");
timeline.from(".text h6, .circle", { opacity: 0, x: -20 }, "-=0.3");


var tl = gsap.timeline({
	scrollTrigger: {
		trigger: "#heading h1",
		scroller: "#main",
		// markers: true,
		start: "top 20%",
		end: "top -10%",
		scrub: 3,
	},
});
tl.to(
	"#heading h1",
	{
		y: -118,
	},
	"anim"
);

tl.to(
	"#heading h2",
	{
		y: 105,
	},
	"anim"
);
tl.to(
	".text h6, .text p , .circle",
	{
		opacity: 0.2,
	},
	"nim"
);
tl.to(
	".circle",
	{
		transform: "rotate(360deg) ",
	},
	"nim"
);

tl.to("#home img", {
	width: "90%",
	height: "700px",
});

var tl2 = gsap.timeline({
	scrollTrigger: {
		trigger: "#home ",
		scroller: "#main",
		// markers: true,
		start: "top -100%",
		end: "top -150%",
		scrub: 3,
	},
});
tl2.to("#main", {
	backgroundColor: "#f5f5f5",
});


function boxx() {
	let boxes = document.querySelectorAll(".box");

	boxes.forEach(function (elem) {
		elem.addEventListener("mousemove", function () {
			let att = elem.getAttribute("data-image");
			cursor.style.width = "300px";
			cursor.style.height = "250px";
			cursor.style.borderRadius = "0";
			cursor.style.backgroundImage = `url(${att})`;
			cursor.style.mixBlendMode = "";
			let x = 300;
			let y = 250;
			circleMouseFolower(x, y);
		});
		elem.addEventListener("mouseleave", function () {
			let att = elem.getAttribute("data-image");
			cursor.style.width = "10px";
			cursor.style.height = "10px";
			cursor.style.borderRadius = "50%";
			cursor.style.backgroundImage = "none";
			cursor.style.mixBlendMode = "difference";
			let x = 10;
			let y = 10;
			circleMouseFolower(x, y);
		});
	})
}

boxx();

var tl3 = gsap.timeline({
	scrollTrigger: {
		trigger: "#work",
		scroller: "#main",
		// markers: true,
		start: "top -150%",
		end: "top -190%",
		scrub: 3,
	},
});
tl3.to("#main", {
	backgroundColor: "#0f0d0d",
});