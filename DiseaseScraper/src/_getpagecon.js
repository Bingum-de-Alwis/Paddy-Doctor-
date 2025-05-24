import axios from 'axios';
import * as cheerio from 'cheerio';

export default async function GetContent(URL) {
    try {
        const { data } = await axios.get(URL);
        const $ = cheerio.load(data);

        const result = {
            causativeAgent: '',
            affectedParts: [],
            symptoms: [],
            additionalInfo: [],
            images: []
        };

        $('.elementor-widget-text-editor').each((i, element) => {
            const widget = $(element);
            const content = widget.find('.elementor-widget-container').text().trim();

            if (content.includes('Causative agent')) {
                result.causativeAgent = content.split('Causative agent')[1].split('Plant parts')[0].trim();
            }

            if (content.includes('Plant parts and life stages affected')) {
                result.affectedParts = content.split('Plant parts and life stages affected')[1]
                    .split('Symptoms')[0]
                    .split('\n')
                    .map(item => item.trim())
                    .filter(item => item.length > 0);
            }

            if (content.includes('Symptoms')) {
                result.symptoms = content.split('Symptoms')[1]
                    .split('\n')
                    .map(item => item.trim())
                    .filter(item => item.length > 0);
            }
        });

        $('.elementor-widget-image').each((i, element) => {
            const imgSrc = $(element).find('img').attr('src');
            if (imgSrc) {
                result.images.push({
                    url: imgSrc,
                    alt: $(element).find('img').attr('alt') || 'disease-image',
                    caption: $(element).find('figcaption').text().trim() || ''
                });
            }
        });

        return result;

    } catch (error) {
        console.error('Scraping Error:', error.message);
        return false;
    }
}

