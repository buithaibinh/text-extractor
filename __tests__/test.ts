import { fromUrl, fromBufferWithMimeType, fromBuffer } from '../src/index';

import * as path from 'path';
import * as fs from 'fs';

describe('must crawl fromUrl correct', function () {
  it.skip('should set error when url is not found', async function () {
    let url = 'https://www.google.com/404';
    try {
      await fromUrl({ url });
      // Fail test if above expression doesn't throw anything.
      expect(true).toBe(false);
    } catch (e: any) {
      expect(e.message).toBe('Request failed with status code 404');
    }
  });

  it.skip('should get data when url is pdf', async function () {
    let url =
      'https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/d6cfdcdd-75e4-460c-9ec0-af4f952e03d5/20210906_meeting_promoting_01.pdf';
    const res = await fromUrl({ url });
    // console.log(res);
    expect(res).not.toBe('');
  });

  it.skip('should get data when url is html', async function () {
    let url =
      'https://setagaya-bousai.my.site.com/#notice';
    const opt: any = {
      ignoreImage: true,
      preserveNewlines: true,
      wordwrap: false,
      uppercaseHeadings: false,
      hideLinkHrefIfSameAsText: true,
      baseElements: { selectors: ['p'] },
      ignoreHref: true,
    };
    const res = await fromUrl({ url, option: opt });
    console.log(res);
    expect(res).not.toBe('');
  });

  // test basic auth
  it('should get data when url is html with basic auth', async function () {
    let url = 'https://app-dev.crawler.uni-voice.biz';
    const res = await fromUrl({
      url,
      axiosConfig: {
        // auth: {
        //   username: 'demo',
        //   password: '12345678',
        // },
        headers: {
          'Authorization': 'Basic ZGVtbzoxMjM0NTY3OA==',
        }
      },
    });
    console.log(res);
  });

  // test with no html tag
  it.skip('should get data when url is html with no html tag', async function () {
    let url = 'https://setagaya-bousai.my.site.com/';
    const res = await fromUrl({ url });
    console.log(res);
    expect(res).not.toBe('');
  });
});

describe.skip('fromBufferWithMimeType must work correct', () => {
  it('test local file pdf', async () => {
    let file = fs.readFileSync(path.join(__dirname, 'sample.pdf'));
    const res = await fromBufferWithMimeType(file, 'application/pdf');
    expect(res).not.toBeNull();
  });

  it('test local file html', async () => {
    let file = fs.readFileSync(path.join(__dirname, 'sample.html'));
    const res = await fromBufferWithMimeType(file, 'text/html');
    expect(res).not.toBeNull();
  });
});

describe.skip('fromBuffer must work correct', () => {
  it('test local file pdf', async () => {
    let file = fs.readFileSync(path.join(__dirname, 'sample.pdf'));
    const res = await fromBuffer(file);
    // console.log(res);
    expect(res).not.toBeNull();
  });

  it('test local html file', async () => {
    let file = fs.readFileSync(path.join(__dirname, 'sample.html'));
    const res = await fromBuffer(file);
    // console.log(res);
    expect(res).not.toBeNull();
  });
});

describe.skip('test image', () => {
  it('should detect text from local image', async () => {
    let file = fs.readFileSync(path.join(__dirname, 'sample.png'));
    const res = await fromBuffer(file);
    // console.log(res);
    expect(res).not.toBeNull();
  });

  it('should detect text from remote image', async () => {
    let url = 'https://tesseract.projectnaptha.com/img/eng_bw.png';
    const res = await fromUrl({ url });
    // console.log(res);
    expect(res).not.toBeNull();
  });
});

describe('test pdf', () => {
  it.skip('test local file pdf', async () => {
    // TODO: replace with your own file path
    let file = fs.readFileSync(path.join(__dirname, 'sample.pdf'));
    const res = await fromBuffer(file, {});
    // console.log(res);
    expect(res).not.toBeNull();
  });

  it.skip('test remote file pdf', async () => {
    let url = 'https://www.orixlife.co.jp/about/news/2023/pdf/n240209.pdf';
    const res = await fromUrl({ url });
    console.log(res);
    expect(res).not.toBe('');
  });
});
