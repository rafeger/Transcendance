type Category = {
    id: number;
    name: string;
};

type CategoriesResponse = {
    trivia_categories: Category[];
};

type TokenResponse = {
    response_code: ResponseCode;
    response_message: string;
    token: string;
}

// as received from opentdb with encode=base64
type RawQuestion = {
    type: string;
    difficulty: string;
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

type DecodedQuestion = {
    type: string;
    difficulty: string;
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
};

type QuestionsResponse = {
    response_code: ResponseCode;
    results: RawQuestion[];
}

type CategoryQuestionCount = {
    total_question_count: number;
    total_easy_question_count: number;
    total_medium_question_count: number;
    total_hard_question_count: number;
}

type CountResponse = {
    category_id: number;
    category_question_count: CategoryQuestionCount;
}

enum ResponseCode {
    Success = 0,
    NoResults = 1,
    InvalidParameter = 2,
    TokenNotFound = 3,
    TokenEmpty = 4,
    RateLimit = 5,
}

const DELAY_MS = 5500;
const MAX_ATTEMPTS = 5;
let lastCallAt = 0;

const BASE_URL = "https://opentdb.com";

// promise - function to  resolve the promise and to reject the promise

function sleep (ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// async means await inside function 
// which means pause this function here until
// promise has its results
async function callApi(url: string): Promise<any>
{
    let attempts: number = 0;
    while (attempts < MAX_ATTEMPTS)
    {
        const elapsed: number = Date.now() - lastCallAt;
        if (elapsed < DELAY_MS)
        {
            await sleep(DELAY_MS - elapsed); // wait for remaining time
        }
        // res is fetch(url)'s Response object
        // res.ok - true, res.status - 200, res.headers, res.body - content
        // when fetch comes, have status and headers 
        const res = await fetch(url); // wait for HTTP response
        lastCallAt = Date.now();
        if (!res.ok)
        {
            throw new Error(`HTTP ${res.status} for ${url}`);
        }
        const data = await res.json(); // webserver receives
        // in buffer whole body, trest buf as string, and parse field yb field, res.json
        // does it all in one call
        if (data.response_code === ResponseCode.RateLimit)
        {
            attempts++;
            continue;
        }
        return data; // succes - stop here
    }

    throw new Error(`Rate limited ${MAX_ATTEMPTS} times for ${url}`);
}

async function fetchCategories(): Promise<Category[]>
{
    const url = `${BASE_URL}/api_category.php`;

    const data: CategoriesResponse = await callApi(url);
    return data.trivia_categories; 
}

async function requestToken(): Promise<string>
{
    const url = `${BASE_URL}/api_token.php?command=request`;

    const data: TokenResponse = await callApi(url);
    if (data.response_code !== ResponseCode.Success)
    {
        throw new Error(`Token request failed (code ${data.response_code}): ${data.response_message}`);
    }
    return data.token;
}

async function resetToken(oldToken : string): Promise<string>
{
    const url = `${BASE_URL}/api_token.php?command=reset&token=${oldToken}`;
    const data: TokenResponse = await callApi(url);
    if (data.response_code !== ResponseCode.Success)
    {
        throw new Error(`Token reset request failed (code ${data.response_code})
            : ${data.response_message}`);
    }
    console.log("Old token successfully reset");
    return data.token;
}

async function fetchQuestionCount(categoryId: number): Promise<number> {
    const url = `${BASE_URL}/api_count.php?category=${categoryId}`;
    const data: CountResponse = await callApi(url);
    return data.category_question_count.total_question_count;
}

async function fetchBatch(
    categoryId: number,
    token: string,
    amount: number
): Promise<QuestionsResponse>
{
    const url = `${BASE_URL}/api.php?amount=${amount}&category=${categoryId}&token=${token}&encode=base64`;
    const data: QuestionsResponse = await callApi(url);
    if (data.response_code === ResponseCode.InvalidParameter || data.response_code === ResponseCode.TokenNotFound)
    {
        throw new Error(`Batch failed for category ${categoryId} 
            (code ${data.response_code})`);
    }
    return data;
}

function decodeBase64(encoded: string): string {
    const bytes = Buffer.from(`${encoded}`, "base64");
    const txt = bytes.toString("utf8");
    return txt;
}

function decodeQuestion(raw: RawQuestion): DecodedQuestion {
  return {
    type: decodeBase64(raw.type),
    difficulty: decodeBase64(raw.difficulty),
    category: decodeBase64(raw.category),
    question: decodeBase64(raw.question),
    correct_answer: decodeBase64(raw.correct_answer),
    incorrect_answers: raw.incorrect_answers.map((answer) => decodeBase64(answer)),
  };
}

// function decodeAll(encodedList: string[]): string[] {
//     const result: string[] = [];
//     let i = 0;
//     while (i < encodedList.length)
//     {
//         result.push(decodeBase64(encodedList[i]));
//         i++;
//     }
//     return result;
// }

async function main() {
    // const first- from whatever json my server sent
    // trivia_categories come from : opentdb at run time
    // datta = await res.json() takes the response texst

    // const categories = await fetchCategories();
    // console.log(categories.length);
    // console.log(categories[0]);

    const token = await requestToken();
    console.log("token:", token);


    // const totalcount = await fetchQuestionCount(9);
    // console.log("count total: ", totalcount);

    const batch = await fetchBatch(9, token, 3);
    console.log("code: ", batch.response_code);
    console.log("got", batch.results.length, " questions");
    console.log(decodeQuestion(batch.results[0]));

}

main();