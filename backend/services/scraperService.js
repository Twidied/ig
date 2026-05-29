const { chromium } = require('playwright');

const scrapeFollowers = async () => {

    const context = await chromium.launchPersistentContext(
        './instagram-session',
        {
            headless: false
        }
    );

    const page = await context.newPage();

    await page.goto('https://www.instagram.com/');

    await page.waitForTimeout(5000);

    const usernameInput = await page.locator(
        'input[name="username"]'
    ).count();

    if (usernameInput > 0) {

        console.log('HACIENDO LOGIN...');

        await page.fill(
            'input[name="username"]',
            process.env.IG_USERNAME
        );

        await page.fill(
            'input[name="password"]',
            process.env.IG_PASSWORD
        );

        await page.click('button[type="submit"]');

        await page.waitForTimeout(10000);

    } else {

        console.log('SESION YA INICIADA');

    }

    const username = process.env.IG_USERNAME;

    await page.goto(
        `https://www.instagram.com/${username}/`
    );

    await page.waitForTimeout(5000);

    console.log('ENTRO AL PERFIL');

    const followersLink = page.locator('a').filter({
        hasText: 'seguidores'
    }).first();

    await followersLink.click();

    console.log('CLICK FOLLOWERS');

    await page.waitForTimeout(5000);

    const modal = page.locator(
        'div[role="dialog"]'
    ).first();

    console.log('MODAL ENCONTRADO');

    await modal.hover();

    for (let i = 0; i < 15; i++) {

        await page.mouse.wheel(0, 3000);

        console.log(`SCROLL ${i + 1}`);

        await page.waitForTimeout(2000);

    }

    const followers = await page.evaluate(() => {

        const links = document.querySelectorAll(
            'div[role="dialog"] a'
        );

        const usernames = [];

        links.forEach((link) => {

            const text = link.textContent;

            if (
                text &&
                text.length < 40 &&
                !text.includes('Seguir') &&
                !text.includes('Following')
            ) {

                usernames.push(text);

            }

        });

        console.log(
            'LINKS ENCONTRADOS:',
            usernames
        );

        return [...new Set(usernames)];

    });

    console.log(followers);

    return followers;

};

module.exports = scrapeFollowers;