import cards from '/js/pages/projects/projects-data.js';

function createCard(cards) {
  const cardsContainer = document.querySelector('.cards');
  cards.forEach(card => {
    const cardElement = document.createElement('div');
    cardElement.className = 'card';
    const imgDirectory = `/assets/projects/${card.images[0]}/`;
    cardElement.innerHTML = `
      <div class="top">
        <div class="slideshow">
            ${card.images.slice(1).map((image, index) => `
            <div class="slide" data-project="${card.title}">
              <img src="${imgDirectory}/${image}" alt="${card.title}" class="card-image"/>
              <a class="prev" data-project="${card.title}">&#10094;</a>
              <a class="next" data-project="${card.title}">&#10095;</a>
            </div>
            `).join('')}
        </div>
        <div class="card-info">
          <div class="card-text">
            <h3>${card.title}</h3>
            <p>${card.description}</p>
          </div>
        </div>
      </div>
      <div class="info-bar">
            <div class="tech"></div>
            <div class="links"></div>
      </div>
    `;
    if (card.has_github) {
      const githubLink = document.createElement('a');
      githubLink.href = card.github_link;
      githubLink.target = '_blank';
      githubLink.rel = 'noopener noreferrer';
      const githubIcon = document.createElement('img');
      githubIcon.src = '/assets/icons/github.svg';
      githubLink.className = 'github-link';
      githubLink.appendChild(githubIcon);
      githubLink.onclick = (e) => e.stopPropagation();
      cardElement.querySelector('.links').appendChild(githubLink);
    }

    if (card.has_demo) {
      const demoLink = document.createElement('a');
      demoLink.href = card.demo_link;
      demoLink.target = '_blank';
      demoLink.rel = 'noopener noreferrer';
      const demoIcon = document.createElement('img');
      demoIcon.src = '/assets/icons/link.svg';
      demoLink.className = 'demo-link';
      demoLink.appendChild(demoIcon);
      demoLink.onclick = (e) => e.stopPropagation();
      cardElement.querySelector('.links').appendChild(demoLink);
    }

    if (!card.has_github && !card.has_demo) {
      cardElement.querySelector('.links').style.display = 'none';
    }

    const techContainer = cardElement.querySelector('.tech');
    card.icons.forEach(tech_icon => {
      const techIcon = document.createElement('div');
      techIcon.innerHTML = `
      <img src="${tech_icon[0]}" alt="${tech_icon[1]} icon"/>
      <p class="name">${tech_icon[1]}</p>
      `
      techIcon.className = 'tech-icon';
      techContainer.appendChild(techIcon);
    });
    cardsContainer.appendChild(cardElement);
  });
}

createCard(cards);

let slideIndices = {};
cards.forEach(card => {
  slideIndices[card.title] = 1;
});

function plusSlides(n, projectName) {
  showSlides(slideIndices[projectName] += n, projectName);
}

function showSlides(n, projectName) {
  let i;
  let slides = document.querySelectorAll(`.slide[data-project="${projectName}"]`);
  if (n > slides.length) {slideIndices[projectName] = 1}
  if (n < 1) {slideIndices[projectName] = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndices[projectName]-1].style.display = "block";
}

const prevs = document.querySelectorAll(".prev");
const nexts = document.querySelectorAll(".next");
prevs.forEach((prev) => {
  const projectName = prev.dataset.project;
  prev.onclick = (e) => {
    e.stopPropagation();
    plusSlides(-1, projectName);
  }
});
nexts.forEach((next) => {
  const projectName = next.dataset.project;
  next.onclick = (e) => {
    e.stopPropagation();
    plusSlides(1, projectName);
  }
});

cards.forEach(card => {
  showSlides(slideIndices[card.title], card.title);
})
