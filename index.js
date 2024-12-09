const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false, // Set to True if you want to run without opening a window
  });

  const page = await browser.newPage();

  const url = 'https://testsite.getjones.com/ExampleForm/';
  await page.goto(url, {
    waitUntil: 'networkidle2',
  });

  console.log(`Navigated to ${url}`);

  // Fill in the form fields - Mimics real user typing behavior with delay
  // in the page-interactions at https://pptr.dev/guides/page-interactions there is a use of the {await page.locator('input').fill('value');}
  // I used the { page.type } but each has its own advantages.

  await page.type('#name', 'John Doe',{ delay: 100 }); // Type into the "Name" field
  console.log('Entered Name: John Doe');

  await page.type('#email', 'johndoe@example.com',{ delay: 100 }); // Type into the "Email" field
  console.log('Entered Email: johndoe@example.com');

  await page.type('#phone', '+1234567890',{ delay: 100 }); // Type into the "Phone" field
  console.log('Entered Phone: +1234567890');

  await page.type('#company', 'Doe Industries',{ delay: 100 }); // Type into the "Company" field
  console.log('Entered Company: Doe Industries');

  // Select the "51-500" option in the dropdown
  await page.select('#employees', '51-500'); // Select the desired value
  console.log('Changed Number of Employees to: 51-500');

  // Take a screenshot
  await page.screenshot({ path: 'form_with_selection.png' });
  console.log('Screenshot saved as form_with_selection.png');

  // Click the "Request a call back" button
  await page.click('button[type="submit"]'); // Update the selector if necessary
  console.log('Clicked the "Request a call back" button.');

  // Wait for navigation to the thank-you page
  await page.waitForNavigation({ waitUntil: 'networkidle2' });
  console.log('Reached the Thank You page.');

  // Close the browser
  await browser.close();
})();
