import "./assets/css/output.css";
import emailjs from '@emailjs/browser';

// tabs

let tabs = document.querySelectorAll(".tab")
let indicator = document.querySelector(".indicator")
let panels = document.querySelectorAll(".tab-panel")

if (indicator) {
  indicator["style"].width = tabs[0].getBoundingClientRect().width + 'px'

  if (tabs && tabs.length > 0 && tabs[0].parentElement) {
    indicator["style"].left = tabs[0].getBoundingClientRect().left - tabs[0].parentElement.getBoundingClientRect().left + 'px'
  }
}


tabs.forEach(tab =>{
  tab.addEventListener("click", ()=>{
    let tabTarget = tab.getAttribute("aria-controls")

    if (indicator) {
      indicator["style"].width = tab.getBoundingClientRect().width + 'px'

      if (tab && tab.parentElement) {
        indicator["style"].left = tab.getBoundingClientRect().left - tab.parentElement.getBoundingClientRect().left + 'px'
      }
    }


    panels.forEach(panel =>{
      let panelId = panel.getAttribute("id")
      if(tabTarget === panelId){
        panel.classList.remove("invisible", "opacity-0")
        panel.classList.add("visible", "opacity-100")
      } else {
        panel.classList.add("invisible", "opacity-0")
      }
    })
  })
})


// autoscroll
var intro = document.getElementById("intro");
var details = document.getElementById("details");
var scrolling = false

async function scrollSectionIntoView (section: HTMLElement | null) {
  scrolling = true
  section?.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest"
  });
  await new Promise(r => setTimeout(r, 100));
  scrolling = false
}

var introY = intro?.getBoundingClientRect()['y'] || 0
var detailsY = details?.getBoundingClientRect()['y'] || 0

document.addEventListener('scroll', async () => {
  let newIntroY = intro?.getBoundingClientRect()['y'] || 0
  let newDetailsY = details?.getBoundingClientRect()['y'] || 0

  if (!scrolling) {
    if (newIntroY - introY > 0) {
      // console.log("Scroll Up")
      await scrollSectionIntoView(intro)
    } else {
      // console.log("Scroll Down")
      await scrollSectionIntoView(details)
    }
  }

  introY = newIntroY
  detailsY = newDetailsY
})

// contact form/emails
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const EMAILJS_SERVICE_ID = "service_d1bemyf";
const EMAILJS_TEMPLATE_ID = "template_thyv13l";

const SUBMIT_SUCCESS_MSG = document.getElementById("submit-success");
const SUBMIT_FAILURE_MSG = document.getElementById("submit-failure");
SUBMIT_SUCCESS_MSG.style.display = 'none';
SUBMIT_FAILURE_MSG.style.display = 'none';

emailjs.init({
  publicKey: EMAILJS_PUBLIC_KEY,
});

async function submitContactFormHandler(event: Event) {
  event.preventDefault();

  try {
    await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, this);
    console.log('Successfully sent email');
    SUBMIT_SUCCESS_MSG.style.display = 'block'; 
    SUBMIT_FAILURE_MSG.style.display = 'none';
    this.reset();
  } catch (error) {
    console.log('Failed to send email via EmailJS', error)
    SUBMIT_FAILURE_MSG.style.display = 'block';
    SUBMIT_SUCCESS_MSG.style.display = 'none';
  }
}

document.getElementById('contact-form')?.addEventListener('submit', submitContactFormHandler)