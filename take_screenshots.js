import puppeteer from 'puppeteer';

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Set viewport to a typical mobile size (iPhone 12/13/14)
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  
  console.log('Capturing Login screen...');
  await page.goto('http://localhost:5173/');
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: 'docs/wireframe_login.png' });
  
  console.log('Capturing Register screen...');
  await page.goto('http://localhost:5173/register');
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: 'docs/wireframe_register.png' });
  
  // Login properly by typing credentials
  console.log('Logging in...');
  await page.goto('http://localhost:5173/');
  await new Promise(r => setTimeout(r, 1500));
  
  // Type student credentials
  await page.type('input[type="email"]', 'rowllyalfairo496@gmail.com');
  await page.type('input[type="password"]', 'password123');
  
  // Click login
  await page.click('button[type="submit"]');
  await new Promise(r => setTimeout(r, 2500)); // wait for login logic and navigation
  
  console.log('Capturing Dashboard screen...');
  await page.screenshot({ path: 'docs/wireframe_dashboard.png' });
  
  console.log('Capturing Add Task screen...');
  await page.goto('http://localhost:5173/add-task');
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: 'docs/wireframe_add_task.png' });

  console.log('Capturing Task Detail screen...');
  await page.goto('http://localhost:5173/task/1');
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: 'docs/wireframe_task_detail.png' });

  console.log('Capturing Edit Task screen...');
  await page.goto('http://localhost:5173/edit-task/1');
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: 'docs/wireframe_edit_task.png' });

  console.log('Capturing Calendar screen...');
  await page.goto('http://localhost:5173/calendar');
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: 'docs/wireframe_calendar.png' });

  console.log('Capturing Notifications screen...');
  await page.goto('http://localhost:5173/notifications');
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: 'docs/wireframe_notifications.png' });

  console.log('Capturing Profile screen...');
  await page.goto('http://localhost:5173/profile');
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: 'docs/wireframe_profile.png' });

  console.log('Capturing Settings screen...');
  await page.goto('http://localhost:5173/settings');
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: 'docs/wireframe_settings.png' });

  console.log('Capturing Help screen...');
  await page.goto('http://localhost:5173/help');
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: 'docs/wireframe_help.png' });

  await browser.close();
  console.log('Screenshots captured successfully for all screens!');
})();
