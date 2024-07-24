import path from "path";
import puppeteer from "puppeteer";
import puppeteerCore from "puppeteer-core";
import chromium from "@sparticuz/chromium";

import { ComboReturn } from "@/@types/combo-return";
import { RequestError } from "@/@types/request-response";
import { readFileSync } from "fs";

export async function generatePDF(): Promise<ComboReturn<string, RequestError>> {
	let browser = null;

	if (process.env.NODE_ENV === "development") {
		browser = await puppeteer.launch({
			args: ["--no-sandbox", "--disable-setuid-sandbox"],
			headless: true
		});
	} else if (process.env.NODE_ENV === "production") {
		browser = await puppeteerCore.launch({
			args: chromium.args,
			defaultViewport: chromium.defaultViewport,
			executablePath: await chromium.executablePath(),
			headless: chromium.headless
		});
	} else {
        return {
            data: null,
            error: {
                message: "Invalid environment"
            }
        };
    }

	const page = await browser.newPage();
	const absolutePath = path.resolve("src/templates/report.html");
	await page.goto(`file://${absolutePath}`, { waitUntil: "networkidle0" });
	await page.pdf({ path: path.resolve("public/report.pdf"), format: "A4" });
	await browser.close();

	if (readFileSync(path.resolve("public/report.pdf")).length === 0) {
		return {
			data: null,
			error: {
				message: "Failed to generate PDF"
			}
		};
	}

	return {
		data: `${process.env.PUBLIC_URL}/report.pdf`,
		error: null
	};
}
