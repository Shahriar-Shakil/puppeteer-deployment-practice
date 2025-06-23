import assert from "node:assert";
import test, { after, before, describe, it } from "node:test";
import puppeteer from "puppeteer";

// test("test title", () => {
//   assert.strictEqual(1, 2);
// });

// describe("test title describing", () => {
//   it("should pass title", () => {
//     assert.strictEqual(1, 2);
//   });
//   it("should pass title", () => {
//     assert.strictEqual(1, 2);
//   });
// });
let browser;
let page;

describe("example.com", () => {
  before(async () => {
    if (!browser) {
      browser = await puppeteer.launch({
        // executablePath: "/opt/google/chrome/google-chrome",
      });
    }
    if (!page) {
      page = await browser.newPage();
    }
  });
  it("should load the page", async () => {
    await page.goto("https://example.com");
  });
  it("should have a title", async () => {
    const title = await page.title();
    assert.strictEqual(title, "Example Domain");
  });
  it("should have a description", async () => {
    const description = await page.$eval("meta[name='description']", (el) =>
      el.getAttribute("content")
    );
    assert.strictEqual(description, "Example Domain");
  });
  it("should have a link", async () => {
    const link = await page.$eval("a", (el) => el.href);
    assert.strictEqual(link, "https://www.iana.org/domains/example");
  });
  after(async () => {
    if (page) {
      await page.close();
      page = null;
    }
    if (browser) {
      await browser.close();
      browser = null;
    }
  });
});
