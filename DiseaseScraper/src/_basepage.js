import '../config.js';
import axios from 'axios';
import * as cheerio from 'cheerio';


export default async function BasePage() {
    try {
        const { data } = await axios.get(global.TARGET_URL);
        const $ = cheerio.load(data);
        const diseases = [];

        $('.elementor-column.elementor-top-column').each((index, element) => {
            const diseaseElement = $(element);

            const disease = {
                link1: diseaseElement.find('.elementor-heading-title a').attr('href'),
                link2: diseaseElement.find('.elementor-size-medium a').attr('href')
            };

            if (disease.link1 || disease.link2) {
                diseases.push(disease);
            }
        });
        return diseases;
    } catch (error) {
        console.error('Scraping failed:', error.message);
        return [];
    }
}