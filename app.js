
emailjs.init('BTgLxYpYEkUmePWB_');

let fullName = document.querySelector("#name");
let businessName = document.querySelector("#business-name") ? document.querySelector("#business-name") : null;
let enquiry = document.querySelector("#enquiry")
let email = document.querySelector("#email")
let number = document.querySelector("#telephone")
let message = document.querySelector("#message")
let fixedBox = document.querySelector("#fixed-box")
let menuList = document.querySelector("#menu-items")
let hamburger = document.querySelector(".hamburger-menu")
let backToTop = document.querySelector(".back-to-top")

let invalidate = (arr)=> {
	for (let item of arr) {
		item.style.border = "3px solid red"
	}	
}
let formValues=[fullName, enquiry, email, number, message]
let resetValues = ()=> {
	for (let item of formValues) {
		item.value = ""
		item.style.border = "none"
	}
	if (businessName) {
		businessName.value = ""
		businessName.style.border = "none"
	}
}
let invalid = []
let readyToSend = false;
let clearValues = (arr)=> {
	for (let item of arr) {
		item.style.border = "none"
	}
}
let formResults = {}
const validateAndSend = ()=> {
	invalid = []
	clearValues(formValues)
	if (fullName.value === "") {
		invalid.push(fullName)
	}
	if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
		invalid.push(email)
	}
	if (!/(^[0-9]{11})$/g.test(number.value)) {
		invalid.push(number)
	}
	if (message.value === "") {
		invalid.push(message)
	}
	validateResponse()
	if (invalid.length === 0 && validUser) {
		formResults.businessName = document.querySelector("#business-name") ? document.querySelector("#business-name").value : "",
		formResults.fullName = fullName.value
		formResults.enquiry = enquiry.value
		formResults.telephone = number.value
		formResults.email = email.value
		formResults.message = message.value
		resetValues()
		readyToSend = true;
		return
	} else {
		invalidate(invalid)
		readyToSend = false;
		return
	}
}

let validUser = false;
const validateResponse = ()=> {
	let response = grecaptcha.getResponse()
	if (response.length > 0) {
		validUser = true;
	} else {
		validUser = false;
	}	
}


document.querySelector(".form-submit-btn").addEventListener("click", (e)=> {
	e.preventDefault()
	validateAndSend()
			if (readyToSend) {
				emailjs.send("service_us0xbqi","template_xu4c43j", formResults).then(
					(response) => {
					  console.log("SUCCESS!", response.status, response.text);
					},
					(error) => {
					  console.log("FAILED...", error);
					})	
			}
})

const addSubmit = ()=> {
	if (window.innerWidth >= 768) {
		document.querySelector(".fixed-box-contact").addEventListener("click", (e)=> {
			e.preventDefault()
			validateAndSend()
			if (readyToSend) {
				emailjs.send("service_us0xbqi","template_xu4c43j", formResults).then(
					(response) => {
					  console.log("SUCCESS!", response.status, response.text);
					},
					(error) => {
					  console.log("FAILED...", error);
					})	
			}
		})
	}	
}

hamburger.addEventListener("click", ()=> {
	if (window.innerWidth >=768) {
		menuList.classList.toggle("hidden")
		menuList.classList.toggle("small")
		hamburger.classList.toggle("activeHamburger")
		addHamburgerEvents("hidden")
	} 	
})

const checkHamburger = (destination)=> {
	menuList.classList=""
	hamburger.classList=""
	if (window.innerWidth >=1200 && destination === "homepage") {
		menuList.classList.add("menu-items", "col-lg-7", "col-md-3", "d-md-flex", "d-none")
		hamburger.classList.add("hamburger-menu", "no-display", "d-md-flex", "d-none")
	} else if (window.innerWidth >=1200) {
		menuList.classList.add("menu-items", "col-lg-7", "col-md-3", "d-md-flex", "d-none", "small", "hamburger-menu-toggle", "hidden")
		hamburger.classList.add("hamburger-menu", "d-md-flex", "d-none")
	} else if (window.innerWidth >=768) {
		menuList.classList.add("menu-items", "col-lg-7", "col-md-3", "d-md-flex", "d-none", "small", "hamburger-menu-toggle", "hidden")
		hamburger.classList.add("hamburger-menu", "d-md-flex", "d-none")
	} else {
		menuList.classList.add("menu-items", "col-lg-7", "col-md-3", "d-md-flex", "d-none")
		hamburger.classList.add("hamburger-menu", "no-display", "d-md-flex", "d-none")
	}
}

const addHamburgerEvents = (hiddenType)=> {
	let hamburgerMenuItems = document.querySelectorAll(".menu-items a")
	for (let item of hamburgerMenuItems) {
		item.addEventListener("click", ()=> {
				menuList.classList.add(hiddenType)
				menuList.classList.add("small")
				hamburger.classList.remove("activeHamburger")
			})
		}
}

const moveToPage = (origin, destination)=> {
	fixedBox.className = ""
	fixedBox.innerHTML = destination === "contact" ? setTimeout(()=> {
		fixedBox.innerHTML = "<button id='submit-btn' class='btn contact-btn'>Submit</button>"
		addSubmit()
	},500) : ""
	fixedBox.classList.add(`fixed-box-${destination}`)
	checkHamburger(destination)
	if (destination === "businesses" && origin === "individuals") {
		fixedBox.classList.add("businessFromIndAnimation")
	} else if (destination === "businesses") {
		fixedBox.classList.add("businessAnimation")
	} else if (destination === "individuals" && origin === "businesses") {
		fixedBox.classList.add("individualsFromBusAnimation")
	} else if (destination === "individuals") {
		fixedBox.classList.add("individualsAnimation")
	} else if (origin === "businesses") {
		fixedBox.classList.add("fromBusinessAnimation")
	} else if (origin === "individuals") {
		fixedBox.classList.add("fromIndividualsAnimation")
	}
	if (destination === "homepage" && !backToTop.classList.contains("hidden")) {
		backToTop.classList.add("hidden")
	} else if (backToTop.classList.contains("hidden")) {
		backToTop.classList.remove("hidden")
	}
	if (destination === "pricing" && window.innerWidth <=1200) {
		count = 0;
		document.querySelector(".card-wrapper").style.transform = "translateX(0%)"
	}	
}

new fullpage(".full-page-container", {
	scrollingSpeed: 2000, 
	licenseKey: "81HKK-5KS98-1K4OI-1JO37-QYTSP",
	scrollOverflow: false,
	easingcss3: 'cubic-bezier(0.23, 1, 0.32, 1)',	
	touchSensitivity: 1,
	recordHistory: false,
	responsiveWidth: 768,
	navigation: true,
	navigationPosition: "right",
	loopBottom: true,
	onLeave: function(origin, destination) {
		// document.querySelector(`[data-anchor*=${destination.anchor}]`).classList.remove("no-opacity");
		// document.querySelector(`[data-anchor*=${origin.anchor}]`).classList.add("no-opacity")
		moveToPage(origin.anchor, destination.anchor)
	}
})

window.addEventListener("load", ()=> {
	if (window.innerWidth >=768) {
		fullpage_api.moveTo(1)
		checkHamburger("homepage")
	}
	if (window.innerWidth <=1200) {
		count = 0;
		pricingCards.style.transform = "translateX(0%)"
		nextArrow.style.color = "white"
		backArrow.style.color = "rgb(26, 23, 23)"
	} 	
})
window.addEventListener("resize", ()=> {
	if (window.innerWidth >=768) {
		fullpage_api.moveTo(1)
		checkHamburger("homepage")
	}
	if (window.innerWidth <=1200) {
		count = 0;
		pricingCards.style.transform = "translateX(0%)"
		nextArrow.style.color = "white"
		backArrow.style.color = "rgb(26, 23, 23)"
	}
})

let nextArrow = document.querySelector(".next-arrow");
let backArrow = document.querySelector(".back-arrow");
let pricingCards = document.querySelector(".card-wrapper");
let count = 0;
nextArrow.addEventListener("click", ()=> {
	if (count === 0) {
		pricingCards.style.transform = "translateX(-100vw)"
		count ++
		backArrow.style.color = "white"
	} else if (count === 1) {
		pricingCards.style.transform = "translateX(-200vw)"
		count ++
		nextArrow.style.color = "rgb(26, 23, 23)"
	}
})
backArrow.addEventListener("click", ()=> {
	if (count === 1) {
		pricingCards.style.transform = "translateX(0vw)"
		count --
		backArrow.style.color = "rgb(26, 23, 23)"
	} else if (count === 2) {
		pricingCards.style.transform = "translateX(-100vw)"
		count --
		nextArrow.style.color = "white"
	}
})