import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByRole("textbox").click();
  await page.getByRole("textbox").fill("cyber");

  // create a flag variable to indicate whether the network request is made
  let isRequestMade = false;

  // start listening to the 'request' event
  page.route("https://tigerhall.com/api/v2/", (route, request) => {
    isRequestMade = true;
    route.continue();
  });

  await page.getByRole("textbox").click();
  await page.getByRole("textbox").fill("cyber");

  // input spinner should be shown while network request in progress
  const spinnerWhileRequest = await page.$(".input-spinner");
  expect(spinnerWhileRequest).not.toBeNull();

  const loadingSkeletons = await page.$$(".chakra-skeleton__group");
  expect(loadingSkeletons.length).toBe(9);

  // check that no request is made immediately after input
  expect(isRequestMade).toBe(false);

  // wait for 300ms (debounce time)
  await page.waitForTimeout(1500);

  // check that a request is made after 300ms
  expect(isRequestMade).toBe(true);

  // stop listening to the 'request' event
  page.unroute("https://tigerhall.com/api/v2/");

  // spinner should be hidden after response
  const spinnerAfterResponse = await page.$(".input-spinner");
  expect(spinnerAfterResponse).toBeNull();
});
