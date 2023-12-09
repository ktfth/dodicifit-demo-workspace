import { BaseService } from 'dodicifit';

class ApiService extends BaseService {
  async getRandomQuote() {
    const response = await this.makeRequest({
      method: 'GET',
      path: '/',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.statusCode !== 200) {
      throw new Error(`Failed to fetch random quote. Status code: ${response.statusCode}`);
    }

    return response.data.result.quote;
  }
}

const apiService = new ApiService('https://fresh-bat-59.deno.dev');

console.log('Fetching random quote...');

apiService.getRandomQuote()
  .then((quote) => {
    console.log(quote);
  })
  .catch((error) => {
    console.error(error);
  });
