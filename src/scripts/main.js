const skillForm = document.getElementById('skillForm');

const searchBar = document.querySelector('#searchBar');

const skillDropdown = document.querySelector('#skillForm #skillDropdown');

const loadingRecommend = document.querySelector('.result-container .loading');
const recommendError = document.querySelector('.result-container #recommendError');
const result = document.querySelector('.result-container #result');

let skills = ['service', 'technical', 'foundation', 'website', 'critical', 'cloud', 'iptables', 'reporting', 'problem', 'patterns', 'designer', 'visio', 'databases', 'jquery', 'tech', 'framework', 'volleyball', 'processing', 'development', 'vbnet', 'data', 'media', 'neural', 'coaching', 'lte', 'git', 'postfix', 'ajax', 'http', 'wordpress', 'solution', 'troubleshooting', 'assembly', 'analytics', 'technologies', 'linux', 'spark', 'manager', 'presentation', 'operating', 'fortran', 'hadoop', 'analytical', 'iphone', 'certifications', 'mobile', 'swing', 'documentation', 'thinking', 'word', 'communication', 'innovation', 'go', 'insights', 'support', 'sas', 'python', 'prestashop', 'wimax', 'collaboration', 'design', 'extjs', 'software', 'penetration', 'tableau', 'shiny', 'windows', 'php', 'priorities', 'social', 'renewable', 'eclipse', 'multitasking', 'system', 'teamwork', 'pascal', 'customer', 'nodejs', 'analysis', 'big', 'javascript', 'mentoring', 'web', 'time', 'programming', 'modeling', 'deep', 'engineering', 'server', 'mathematics', 'phonegap', 'security', 'debugging', 'powershell', 'networks', 'frontend', 'bootstrap', 'svg', 'ai', 'touch', 'android', 'dos', 'to', 'telecom', 'maven', 'marketing', 'digital', 'project', 'statistical', 'detail', 'ecommerce', 'solving', 'testing', 'content', 'artificial', 'learning', 'matlab', 'electronics', 'mining', 'dom', 'aspnet', 'systems', 'angular', 'diagnostics', 'sql', 'energy', 'implementation', 'html', 'internet', 'control', 'machine', 'jsp', 'scrum', 'collection', 'leadership', 'desk', 'coding', 'consulting', 'training', 'backend', 'ensemble', 'services', 'graphic', 'sencha', 'less', 'prototyping', 'tools', 'hive', 'management', 'assembleur', 'computing', 'network', 'organizational', 'attention', 'hardware'];
skills.sort();

const skillFormFormData = new FormData();
let skillInput = [];

hideElement(loadingRecommend);

['submit'].forEach((eventName) => {
  skillForm.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(event) {
  event.preventDefault();
  event.stopPropagation();
}

updateDropdown("");

searchBar.addEventListener('input', () => {
  updateDropdown(searchBar.value);
});

function updateDropdown(queryString) {
  skillDropdown.innerHTML = ``;
  for (let skill of skills) {
    if (skill.includes(queryString)) {
      skillDropdown.innerHTML += `<option value="${skill}">${skill}</option>`
    }
  }
}

skillDropdown.addEventListener('change', function() {
  const selectedOptions = Array.from(skillDropdown.selectedOptions).map(option => option.value);
  for (let option of selectedOptions) {
    if (!skillInput.includes(option)) {
      skillInput.push(option);
    }
  }
  updateSkills();
});

function updateSkills() {
  skillInput.sort();
}

skillForm.addEventListener('submit', skillFormFormSubmitHandler);

function skillFormFormSubmitHandler() {
  let skillString = skillInput.join(" ");
  console.log(skillString);
  skillFormFormData.set("skills", skillString);
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
