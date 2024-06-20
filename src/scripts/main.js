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

  result.innerHTML = `
    <div class="response-message">
      <i class="fas fa-check"></i>
      <span class="message">${message}</span>
    </div>
    <div class="recommendation-result">
      <div>
        <div class="result-title">Result:</div>
        <div class="job-item">${data.jobs[0]}</div>
        <div class="job-item">${data.jobs[1]}</div>
        <div class="job-item">${data.jobs[2]}</div>
        <div class="job-item">${data.jobs[3]}</div>
        <div class="job-item">${data.jobs[4]}</div>
        <div class="job-item">${data.jobs[5]}</div>
        <div class="job-item">${data.jobs[6]}</div>
        <div class="job-item">${data.jobs[7]}</div>
        <div class="job-item">${data.jobs[8]}</div>
        <div class="job-item">${data.jobs[9]}</div>
      </div>
    </div>
  `;
}
