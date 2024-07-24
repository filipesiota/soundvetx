import puppeteer from "puppeteer";
import path from "path";
import { ComboReturn } from "@/@types/combo-return";
import { RequestError } from "@/@types/request-response";
import { readFileSync } from "fs";

export async function generatePDF(): Promise<ComboReturn<string, RequestError>> {
	const browser = await puppeteer.launch({ headless: true });
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
