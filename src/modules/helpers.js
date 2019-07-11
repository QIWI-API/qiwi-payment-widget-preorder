import {commonColors} from '../styles/index'

export const media = {
    mobile: '(max-width: 819px)'
}

export function convertHexToRgb(hex) {
    if (hex) {
        let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.toString().replace(shorthandRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
        });

        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
}

export function formatReferrer(rawReferrer) {
    let newReferrer = rawReferrer;

    newReferrer = newReferrer.replace(/^https:\/\//, '');
    newReferrer = newReferrer.replace(/^http:\/\//, '');
    newReferrer = newReferrer.replace(/^www\./, '');

    return newReferrer;
}

export function stylesArrayToObject(styles) {
    if (!styles) return {};

    return styles.reduce((acc, item) => {
        acc[item.widgetStyleCode] = item.widgetStyleValue;
        return acc;
    }, {});
}

export function getContrastColorByBackground(backgroundColor) {
    const rgbBackgroundColor = convertHexToRgb(backgroundColor);
    if (rgbBackgroundColor) {
        let a = 1 - (0.299 * rgbBackgroundColor.r + 0.587 * rgbBackgroundColor.g + 0.114 * rgbBackgroundColor.b) / 255;
        return a <= 0.34 ? commonColors.BLACK : commonColors.WHITE;
    } else return null;
}

export function getImageByUrl(url) {
    return new Promise(function (resolve) {
        let testImg = new Image();

        let timedOut = false;
        let timer;
        testImg.onload = function () {
            if (!timedOut) {
                clearTimeout(timer);
                resolve(testImg);
            }
        };
        testImg.src = url;
        timer = setTimeout(function () {
            timedOut = true;
            testImg.src = '??/invalidUrl.jpg';
        }, 5000);
    })
}