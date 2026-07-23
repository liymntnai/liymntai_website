(function () {
///////////////////////////////////////
// Project data (one entry per portfolio piece)
const PROJECTS = {
  "kishis-restaurant": {
    pageTitle: "Kishi's Restaurant",
    heading: "Kishi's Restaurant",
    description:
      "Website for a restaurant business. School. Connect with clients to view your meals and book appointments.",
    galleryImage: "img/Restaurant-Desktop-Img.jpg",
    modal: {
      desktop: "img/Restaurant-Desktop.jpg",
      tablet: "img/Restaurant-Tablet.jpg",
      mobile: "img/Resrarant-Mobile.jpg",
    },
    liveSite: null,
  },
  "mike-brighton": {
    pageTitle: "Mike-Brighton",
    heading: "MB High School",
    description:
      "Website for a High School. Provide the latest updates and upcoming events to students and parents. Also used to provide necessary info about the school and admission.",
    galleryImage: "img/Homepage-school-website 1.jpg",
    modal: {
      desktop: "img/School-Desktop.jpg",
      tablet: "img/School-Tablet.jpg",
      mobile: "img/School-Mobile.jpg",
    },
    liveSite: null,
  },
  "international-nursery-school": {
    pageTitle: "International Nursery School",
    heading: "International Nursery School",
    description:
      "Website for a Nursery School. Connect and share ideas with parents concerning the education of kids.",
    galleryImage: "img/Kindergarten-thumbnail.jpg",
    modal: {
      desktop: "img/Kindergarten-Desktop.jpg",
      tablet: "img/Kindergarten-Tablet.jpg",
      mobile: "img/Kindergarten-Mobile.jpg",
    },
    liveSite: null,
  },
  evelyn: {
    pageTitle: "Evelyn Beauty Care",
    heading: "Evelyn Beauty Care",
    description:
      "Website for a beauty products business. Experience beauty that goes beyond the surface.",
    galleryImage: "img/Header Evelyn.jpg",
    modal: {
      desktop: "img/Evelyn-Desktop.jpg",
      tablet: "img/Evelyn-Tablet.jpg",
      mobile: "img/Evelyn-Mobile.jpg",
    },
    liveSite: null,
  },
  "elizy-queens": {
    pageTitle: "Elizy Queens",
    heading: "Elizy Queens",
    description: "Website for the sale of traditional gowns, chains and beed.",
    galleryImage: "img/Elizy-Slice.jpg",
    modal: {
      desktop: "img/Elizy-Desktop1.jpg",
      tablet: "img/Elizy-Tablet.jpg",
      mobile: "img/Elizy-Mobile.jpg",
    },
    liveSite: null,
  },
  "gabriella-bilingual-school": {
    pageTitle: "Gabriella Bilingual School",
    heading: "Gabriella Bilingual School",
    description:
      "Website for a High School. Provide the latest updates and upcoming events to students and parents. Also used to provide necessary info about the school and admission.",
    galleryImage: "img/screencapture-GBS.png",
    modal: {
      desktop: "img/gbs-desktop.png",
      tablet: "img/gbs-tablet.png",
      mobile: "img/gbs-mobile.png",
    },
    liveSite: "https://gbs-tau.vercel.app",
  },
};

///////////////////////////////////////
// Populate the template from the ?project= query param
const slug = new URLSearchParams(window.location.search).get("project");
const data = PROJECTS[slug];

if (data) {
  document.title = data.pageTitle;

  const heading = document.querySelector("#project-heading");
  const description = document.querySelector("#project-description");
  const galleryImage = document.querySelector("#project-gallery-image");
  const modalDesktop = document.querySelector("#modal-img-desktop");
  const modalTablet = document.querySelector("#modal-img-tablet");
  const modalMobile = document.querySelector("#modal-img-mobile");
  const liveSite = document.querySelector("#project-live-site");

  if (heading) heading.textContent = data.heading;
  if (description) description.textContent = data.description;
  if (galleryImage) galleryImage.src = data.galleryImage;
  if (modalDesktop) modalDesktop.src = data.modal.desktop;
  if (modalTablet) modalTablet.src = data.modal.tablet;
  if (modalMobile) modalMobile.src = data.modal.mobile;

  if (liveSite) {
    if (data.liveSite) {
      liveSite.href = data.liveSite;
      liveSite.style.display = "";
    } else {
      liveSite.style.display = "none";
    }
  }
} else {
  window.location.href = "/";
}
})();
