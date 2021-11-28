const { publishSupplyWarningNotification } = require("./DomainNotifications");
const axios = require("axios");
require('@sap/xsenv').loadEnv();

/** Below are 2 parameters to change based on your environment & user.
 * 
 * BOOK_SERVICE: refers to the service which it the logic checks the API endpoint for the list of books.
 * RECIPIENT_TO_SEND: refers to the recipient to send the notification to.
 * 
 */
const BOOK_SERVICE = "https://bookcatalog-8221c96ftrial.cfapps.eu10.hana.ondemand.com/manage/Books?$format=json";
const RECIPIENT_TO_SEND = "jacob.tan@sap.com";

(async () => {
    try {
        const res = await axios(BOOK_SERVICE);
        const stockLimit = 20;
        const criticalSupplyOfCategory6 = res.data.value.filter(a => a.stock <= stockLimit);

        await Promise.all(criticalSupplyOfCategory6.map(product => publishSupplyWarningNotification({
            product: product.title,
            stock: `${product.stock}`,
            recipients: [RECIPIENT_TO_SEND]
        })));

        console.log("Success sending of Notifications via the API.");
    } catch (e) {
        if (e.response) {
            console.error(`${e.response.statusText} (${e.response.status}): ${JSON.stringify(e.response.data.error.message)}.`)
        } else {
            console.error(e)
        }
    }
})()