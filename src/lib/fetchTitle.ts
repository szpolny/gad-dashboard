import { JSDOM } from 'jsdom';

async function fetchTitle(url: string) {
  const response = await fetch(url);
  const text = await response.text();
  const dom = new JSDOM(text);
  const { title } = dom.window.document;
  return title;
}

export default fetchTitle;
