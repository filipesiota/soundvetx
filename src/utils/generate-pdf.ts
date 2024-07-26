import puppeteer from "puppeteer";
import chromium from "@sparticuz/chromium";
import { ComboReturn } from "@/@types/combo-return";
import { RequestError } from "@/@types/request-response";
import { readFileSync } from "fs";

export async function generatePDF(): Promise<ComboReturn<string, RequestError>> {
    try {
        let browser;

        if (process.env.VERCEL_ENV === "production") {
            browser = await puppeteer.launch({
                args: chromium.args,
                defaultViewport: chromium.defaultViewport,
                executablePath: await chromium.executablePath(),
                headless: chromium.headless
            });
        } else {
            browser = await puppeteer.launch({
                headless: true
            });
        }

        const page = await browser.newPage();
        const absolutePath = `${process.env.VERCEL_URL}/templates/report.html`;
        const outputPath = "public/uploads/report.pdf";

        await page.goto(absolutePath, { waitUntil: "networkidle0" });

        await page.pdf({ path: outputPath, format: "A4" });
        await browser.close();

        if (readFileSync(outputPath).length === 0) {
            return {
                data: null,
                error: {
                    message: "Failed to generate PDF",
                },
            };
        }

        console.log(`${process.env.VERCEL_URL}/uploads/report.pdf`);

        return {
            data: `${process.env.VERCEL_URL}/uploads/report.pdf`,
            error: null
        };
    } catch (error: any) {
        return {
            data: null,
            error: {
                message: error.message || "An unexpected error occurred",
            },
        };
    }
}
