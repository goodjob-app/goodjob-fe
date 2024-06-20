const skillForm = document.getElementById('skillForm');

const loadingRecommend = document.querySelector('.result-container .loading');
const recommendError = document.querySelector('.result-container #recommendError');
const result = document.querySelector('.result-container #result');

const skillFormFormData = new FormData();

hideElement(loadingRecommend);

['submit'].forEach((eventName) => {
  skillForm.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(event) {
  event.preventDefault();
  event.stopPropagation();
}

skillForm.addEventListener('submit', skillFormFormSubmitHandler);

function skillFormFormSubmitHandler() {
  const skillInput = document.querySelector('#skillInput');
  skillFormFormData.set("skills", skillInput.value);
  submitSkill(skillFormFormData);
}

async function submitSkill(formData) {
  try {
    hideElement(result);
    showElement(loadingRecommend);

    const response = await RecommendAPI.recommend(formData);

    showRecommendResult(response);
    showElement(result);
  } catch (error) {
    console.error(error);

    recommendError.textContent = error.message;
  } finally {
    hideElement(loadingRecommend);
  }
}

function showRecommendResult(response) {
  const { message, data } = response;

  let jobItems = '';
  for (let i = 0; i < data.jobs.length; i++) {
    jobItems += `<div class="job-item">${data.jobs[i]}</div>`;
  }

  result.innerHTML = `
    <div class="response-message">
      <i class="fas fa-check"></i>
      <span class="message">${message}</span>
    </div>
    <div class="recommendation-result">
      <div>
        <div class="result-title">Result:</div>
        ${jobItems}
      </div>
    </div>
  `;
}
