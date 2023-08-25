"use strict";
import data from "../data.json" assert { type: "json" };

let sectionContainer = document.querySelector(".section--container");
const filterContainer = document.querySelector(".filter--container");
const clearBtn = document.querySelector("button");
const categoryFilter = document.querySelector(".category--filter");
let selectedFilter = [];

data.map((objValue) => {
  // TODO: Jobs listing

  let html = `<section class="${objValue.company}--container relative mt-10 flex w-full flex-col items-center justify-between rounded ${
    objValue.new && objValue.featured
      ? `border-l-[5px] border-l-desaturatedDarkCyan`
      : ""
    }  bg-white px-4 py-3 md:flex-row">
          <div class="info--container flex w-full items-center md:w-1/2">
            <figure class="absolute w-[40px] translate-y-[-62px] md:relative md:mr-6 md:w-[80px] md:translate-y-0">
              <img
                src="${objValue.logo}"
                alt="${objValue.company}"
                class="top-0 left-0 w-full"
              />
            </figure>

            <div class="info mt-4 flex flex-col justify-center gap-[0.5rem] md:mt-0">
              <div class="company--section flex items-center gap-[0.5rem]">
                <p class="font-bold text-desaturatedDarkCyan">${
                  objValue.company
                }</p>
                ${
                  objValue.new
                    ? `<span class="rounded-full bg-desaturatedDarkCyan px-2 py-[1px] text-sm font-bold text-white">NEW!</span>`
                    : ""
                }

                ${
                  objValue.featured
                    ? `<span class="rounded-full bg-veryDarkGrayishCyan px-2 py-[1px] text-sm font-bold text-white">FEATURED</span>`
                    : ""
                }
              </div>

              <p class="font-bold text-veryDarkGrayishCyan">
                ${objValue.company}
              </p>

              <div class="job--listing-info--section flex gap-[1rem]">
                <span class="text-sm text-darkGrayishCyan">${
                  objValue.postedAt
                }</span>
                <span>.</span>
                <span class="text-sm text-darkGrayishCyan">${
                  objValue.contract
                }</span>
                <span>.</span>
                <span class="text-sm text-darkGrayishCyan">${
                  objValue.location
                }</span>
              </div>
            </div>
          </div>

          <div
            class="categories--container mt-8 flex w-full flex-wrap gap-[0.5rem] border-t border-t-darkGrayishCyan pt-4 md:mt-0 md:h-[88px] md:w-1/2 md:items-center md:justify-end md:border-none md:pt-0"
          >
            <span
              data-role="${objValue.role}"
              class="tablet cursor-pointer rounded bg-lightGrayishCyanFilter py-[2px] px-2 font-bold text-desaturatedDarkCyan hover:bg-desaturatedDarkCyan hover:text-white"
              >${objValue.role}</span>

            <span
              data-level="${objValue.level}"
              class="tablet cursor-pointer rounded bg-lightGrayishCyanFilter py-[2px] px-2 font-bold text-desaturatedDarkCyan hover:bg-desaturatedDarkCyan hover:text-white"
              >${objValue.level}</span>


          ${objValue.languages
            .map((lang) => {
              return `<span
              data-languages="${lang}"
              class="tablet cursor-pointer rounded bg-lightGrayishCyanFilter py-[2px] px-2 font-bold text-desaturatedDarkCyan hover:bg-desaturatedDarkCyan hover:text-white"
              >${lang}</span>`;
            })
            .join("")}

            ${objValue.tools
              .map((tool) => {
                return `<span
              data-tools="${tool}"
              class="tablet cursor-pointer rounded bg-lightGrayishCyanFilter py-[2px] px-2 font-bold text-desaturatedDarkCyan hover:bg-desaturatedDarkCyan hover:text-white"
              >${tool}</span>`;
              })
              .join("")}
          </div>
        </section>`;

  sectionContainer.insertAdjacentHTML("beforeend", html);
});

const section = document.querySelectorAll("section");

document.addEventListener("DOMContentLoaded", function () {
  sectionContainer.addEventListener("click", function (e) {
    let clickedTablet = e.target.closest(".tablet");

    if (!clickedTablet) return;

    let textContent = clickedTablet.textContent;

    // remove hidden class
    filterContainer.classList.remove("hide");
    filterContainer.classList.add("show");

    categoryFilter.innerHTML += renderFilter(textContent);

    filterJobs();
  });
});

const renderFilter = function (value) {
  //push clicked tablets to array
  // checking to see if the same tablet was clicked twice any where in the DOM
  if (selectedFilter.includes(value)) return "";

  selectedFilter.push(value);

  return `<div class="selected--filter hide flex cursor-pointer items-center rounded bg-lightGrayishCyanFilter">
        <span class="px-2 font-bold text-desaturatedDarkCyan">${value}</span>
        <figure class="h-full rounded-r bg-desaturatedDarkCyan px-2 py-2 hover:bg-veryDarkGrayishCyan">
            <img src="./images/icon-remove.svg" alt="icon-remove" />
        </figure>
  </div>`;
};

const filterJobs = function () {
  let childEl;
  let filteredSections = [];

  section.forEach((sect) => {
    // * converting to an iterable nodelist of children element(span)
    childEl = Array.from(sect.lastElementChild.children);
    if (
      selectedFilter.every((element) =>
        childEl.some((child) => child.textContent === element)
      )
    ) {
      filteredSections.push(sect);
    }
  });

  let htmlString = "";
  filteredSections.forEach((el) => (htmlString += el.outerHTML));
  sectionContainer.innerHTML = htmlString;
};

filterContainer.addEventListener("click", function (e) {
  let clickedEl = e.target.closest(".selected--filter");

  if (!clickedEl) return;

  let textContentValue = clickedEl.firstElementChild.textContent;

  // accessing the index of the selected content
  const index = selectedFilter.indexOf(textContentValue);

  // if true
  if (index > -1) selectedFilter.splice(index, 1);

  clickedEl.remove();
  filterJobs();

  if (categoryFilter.children.length === 0) hideContainer();
});

const hideContainer = function () {
  // remove hidden class
  filterContainer.classList.add("hide");
  filterContainer.classList.remove("show");
  categoryFilter.innerHTML = "";
};

clearBtn.addEventListener("click", function () {
  hideContainer();
  selectedFilter = [];
  filterJobs();
});

// modal window section

// const modal = document.querySelector(".modal--window");
// const overlay = document.querySelector(".overlay");

// const closeModal = function () {
//   overlay.classList.add("hide");
//   modal.classList.add("hide");
// };

// document.addEventListener("DOMContentLoaded", function () {
//   overlay.addEventListener("click", closeModal);

//   // should incase the user doesn't click the overlay
//   setTimeout(() => closeModal(), 10000);
// });