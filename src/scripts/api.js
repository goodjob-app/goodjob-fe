const BASE_URL = 'http://34.172.64.205:8000';

const ENDPOINT = {
  recommend: `${BASE_URL}/recommend`,
};

class RecommendAPI {
  static async recommend(data) {
    const response = await fetch(ENDPOINT.recommend, {
      method: 'POST',
      body: data,
      redirect: 'follow',
    });

    const json = await response.json();
    return json;
  }
}
