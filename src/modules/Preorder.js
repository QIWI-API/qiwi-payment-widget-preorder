import 'url-search-params-polyfill';
import config from '../config/default';
import {stylesArrayToObject, formatReferrer} from "../modules/helpers";

export default class Preorder {
    _getParameterByName(param, urlSearch = window.location.search) {
        const searchParams = new URLSearchParams(urlSearch);

        return searchParams.get(param);
    }

    _getAlias() {
        return window.location.pathname.match(/([^/]*)\/*$/)[1];
    }

    _getWidgetReferrerFromUrl() {
        return this._getParameterByName('widgetReferrer');
    }

    _getNoCacheFlag () {
        return this._getParameterByName('noCache');
    }

    _getHostName(url = '') {
        const hostname = url
            .split('//')[1]
            .split('/')[0]
            .split(':')[0];

        return hostname.replace(/\./g, '-');
    }

    _makeLinkCheckout(params, customFields) {
        const url = config.oplataUrl;

        const parsedParams = new URLSearchParams();

        Object.getOwnPropertyNames(params)
            .filter(key => !!params[key])
            .forEach(key => parsedParams.append(key, params[key]))

        Object.getOwnPropertyNames(customFields).forEach(customFieldName => {
            parsedParams.append(`customFields[${customFieldName}]`, `${customFields[customFieldName]}`);
        });

        return `${url}?${parsedParams.toString()}`;
    }

    _makeRequest() {
        let url = config.widgetsApiUrl;

        let params = `merchantSitePublicKey=${this._widgetId}`;

        if (this._widgetAliasCode && !this._widgetId) {
            params = `widgetAliasCode=${this._widgetAliasCode}`;
        }
        const noCacheFlag = this._getNoCacheFlag();
        if (noCacheFlag) {
            params += `&noCache=${noCacheFlag}`;
        }

        params += `&widgetTypeCode=PREORDER`;

        return fetch(`${url}?${params}`, {
            mode: 'cors'
        })
            .then((response) => {
                if (response.status >= 400) {
                    window.dataLayer.push({
                        event: 'load.error',
                        eventAction: 'Mechant name load error'
                    });

                    throw new Error('LoadError');
                }
                return response;
            })
            .then((response) => response.json());
    }

    async getwidgetInfo() {
        this._widgetId = this._getParameterByName('publicKey');

        this._widgetAliasCode = this._getAlias();

        if (this._widgetId || this._widgetAliasCode) {
            try {
                const data = await this._makeRequest();

                data.result.widgetStyles = stylesArrayToObject(data.result.widgetStyles);
                this._widgetInfo = data.result;

                return data.result;
            } catch (err) {
                throw err;
            }
        } else {
            throw new Error('No public key or alias in url');
        }
    }

    redirect = (amount, isDirect) => {
        const {
            widgetSuccessUrl,
            widgetFailUrl,
            merchantSitePublicKey,
            widgetAliasCode,
            themeCode
        } = this._widgetInfo;

        const publicKey = merchantSitePublicKey;

        const successUrl = widgetSuccessUrl || '';

        const failUrl = widgetFailUrl || '';

        const widgetAlias = widgetAliasCode || '';

        const widgetReferrer = formatReferrer(this._getWidgetReferrerFromUrl() || document.referrer) || 'my.qiwi.com';

        const embedded = this.isEmbedded()

        if (publicKey) {
            const checkoutParams = {
                publicKey,
                amount,
                successUrl,
                failUrl,
                embedded
            };

            const customFields = {
                widgetAlias: widgetAlias.toLowerCase(),
                widgetReferrer,
                themeCode
            };

            let link = this._makeLinkCheckout(checkoutParams, customFields);

            if (isDirect) {
                window.location.href = link;
            } else {
                window.open(link, '_blank');
            }
        }
    };

    addMetricCounter = (counter) => {
        if (!counter) {
            return false;
        }

        try {
            const yaCounter = `yaCounter${counter}`;
            window[yaCounter] = new window.Ya.Metrika({
                id: counter,
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true
            });
        } catch (e) {}
    };

    isEmbedded () {
        return this._getParameterByName('embedded');
    };
}
