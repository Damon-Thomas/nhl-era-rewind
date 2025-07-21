import puppeteer from "puppeteer";
import fs from "fs";

const startYear = 1917;
const endYear = 2024;

const getUrlForYear = (year) => {
  const endYearShort = (year + 1).toString().slice(2);
  return `https://www.quanthockey.com/nhl/nationality-totals/nhl-players-${year}-${endYearShort}-stats.html`;
};

const scrapeSeason = async (year, page) => {
  const url = getUrlForYear(year);

  console.log(`Scraping ${url}`);

  try {
    await page.goto(url, { waitUntil: "load", timeout: 60000 });

    // Wait for the table
    const tableSelector = "table#statistics";
    await page.waitForSelector(tableSelector, { timeout: 20000 });

    // Evaluate inside page context
    const data = await page.evaluate(
      (selector, year) => {
        const rows = Array.from(
          document.querySelectorAll(`${selector} tbody tr`)
        );
        return rows.map((row) => {
          const cells = row.querySelectorAll("th, td");
          return {
            Season: `${year}-${(year + 1).toString().slice(2)}`,
            Nationality: cells[2]?.innerText.trim() || null, // 3rd cell (th)
            Players: parseInt(cells[3]?.innerText.trim(), 10) || 0, // 4th cell (td)
          };
        });
      },
      tableSelector,
      year
    );

    return data;
  } catch (err) {
    console.error(`Error scraping ${url}:`, err.message);
    return [];
  }
};

const scrapeAll = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-blink-features=AutomationControlled",
    ],
    defaultViewport: null,
  });

  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36"
  );

  const allData = [];
  for (let year = startYear; year <= endYear; year++) {
    try {
      const seasonData = await scrapeSeason(year, page);
      allData.push(...seasonData);
    } catch (err) {
      console.error(`Failed to scrape ${year}:`, err.message);
    }
  }

  await browser.close();

  fs.writeFileSync(
    "nhl_nationality_data.json",
    JSON.stringify(allData, null, 2)
  );
  console.log("Scraping complete. Data saved to nhl_nationality_data.json");
};

scrapeAll();
