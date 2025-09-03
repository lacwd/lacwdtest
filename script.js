// add classes for mobile navigation toggling
var CSbody = document.querySelector("body");
const CSnavbarMenu = document.querySelector("#cs-navigation");
const CShamburgerMenu = document.querySelector("#cs-navigation .cs-toggle");

CShamburgerMenu.addEventListener("click", function () {
  CShamburgerMenu.classList.toggle("cs-active");
  CSnavbarMenu.classList.toggle("cs-active");
  CSbody.classList.toggle("cs-open");
  // run the function to check the aria-expanded value
  ariaExpanded();
});

// checks the value of aria expanded on the cs-ul and changes it accordingly whether it is expanded or not
function ariaExpanded() {
  const csUL = document.querySelector("#cs-expanded");
  const csExpanded = csUL.getAttribute("aria-expanded");

  if (csExpanded === "false") {
    csUL.setAttribute("aria-expanded", "true");
  } else {
    csUL.setAttribute("aria-expanded", "false");
  }
}

// This script adds a class to the body after scrolling 100px
// and we used these body.scroll styles to create some on scroll
// animations with the navbar

document.addEventListener("scroll", (e) => {
  const scroll = document.documentElement.scrollTop;
  if (scroll >= 100) {
    document.querySelector("body").classList.add("scroll");
  } else {
    document.querySelector("body").classList.remove("scroll");
  }
});

// mobile nav toggle code
const dropDowns = Array.from(
  document.querySelectorAll("#cs-navigation .cs-dropdown")
);
for (const item of dropDowns) {
  const onClick = () => {
    item.classList.toggle("cs-active");
  };
  item.addEventListener("click", onClick);
}
// tertiary nav toggle code
const tertiaryDrop = Array.from(
  document.querySelectorAll("#cs-navigation .cs-drop3-main")
);

for (const item of tertiaryDrop) {
  item.addEventListener("click", (e) => {
    e.stopPropagation();
    item.classList.toggle("drop3-active");
  });
}
// FAQ
const faqItems = Array.from(document.querySelectorAll(".cs-faq-item"));
for (const item of faqItems) {
  const onClick = () => {
    item.classList.toggle("active");
  };
  item.addEventListener("click", onClick);
}

class FAQFilter {
  filtersSelector = ".cs-option";
  FAQselector = ".cs-faq-group";
  activeClass = "cs-active";
  hiddenClass = "cs-hidden";

  constructor() {
    const $filters = document.querySelectorAll(this.filtersSelector);
    this.$activeFilter = $filters[0];
    this.$images = document.querySelectorAll(this.FAQselector);

    this.$activeFilter.classList.add(this.activeClass);

    for (const $filter of $filters) {
      $filter.addEventListener("click", () => this.onClick($filter));
    }
  }

  onClick($filter) {
    this.filter($filter.dataset.filter);

    const { activeClass } = this;

    this.$activeFilter.classList.remove(activeClass);
    $filter.classList.add(activeClass);

    this.$activeFilter = $filter;
  }

  filter(filter) {
    const showAll = filter == "all";
    const { hiddenClass } = this;

    for (const $image of this.$images) {
      const show = showAll || $image.dataset.category == filter;
      $image.classList.toggle(hiddenClass, !show);
    }
  }
}

new FAQFilter();

function isiOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

if (isiOS()) {
  // Force the --primary CSS variable
  document.documentElement.style.setProperty("--primary", "rgb(238,108,3)");

  // Force all elements that might use the primary color
  const allElements = document.querySelectorAll("*");

  allElements.forEach((el) => {
    const computed = getComputedStyle(el);

    // Force text color if it matches your primary variable or is close
    if (
      computed.color === "rgb(238,108,3)" ||
      computed.color === "rgb(238, 108, 3)"
    ) {
      el.style.color = "rgb(238,108,3)";
    }

    // Force background color if it matches your primary
    if (
      computed.backgroundColor === "rgb(238,108,3)" ||
      computed.backgroundColor === "rgb(238, 108, 3)"
    ) {
      el.style.backgroundColor = "rgb(238,108,3)";
    }

    // Optional: force fill for SVGs (like your logo)
    if (el.tagName.toLowerCase() === "svg" || el.querySelector("svg")) {
      el.querySelectorAll("*").forEach((svgEl) => {
        svgEl.style.fill = "rgb(238,108,3)";
      });
    }
  });
}
