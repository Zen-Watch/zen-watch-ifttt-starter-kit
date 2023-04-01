console.log('Welcome to Zen.Watch IFTTT EVM action development!');

/**
 
To enable Discord webhooks, you will need to have access to a Discord server and be authorized to create and manage webhooks for the server. Here are the steps to enable webhooks in Discord:

Navigate to the Discord server where you want to enable webhooks and click on the server settings (gear icon) in the bottom left corner.

Click on "Integrations" and then click on the "Create Webhook" button.

Give your webhook a name and select the channel where you want to post messages.

Customize the settings for your webhook, such as the profile picture and username to use for the bot that sends messages.

Copy the webhook URL provided by Discord. You will need this URL to send messages to the specified channel.

Once you have enabled webhooks and obtained the webhook URL, you can use this URL to send messages to the specified channel using the fetch function in your JavaScript code.

*/


/**
 * 
 * Mock Response object:
 * {
  [Symbol(realm)]: null,
  [Symbol(state)]: {
    aborted: false,
    rangeRequested: false,
    timingAllowPassed: true,
    requestIncludesCredentials: true,
    type: 'default',
    status: 204,
    timingInfo: {
      startTime: 70.92686414718628,
      redirectStartTime: 0,
      redirectEndTime: 0,
      postRedirectStartTime: 70.92686414718628,
      finalServiceWorkerStartTime: 0,
      finalNetworkResponseStartTime: 0,
      finalNetworkRequestStartTime: 0,
      endTime: 0,
      encodedBodySize: 0,
      decodedBodySize: 0,
      finalConnectionTimingInfo: null
    },
    cacheState: '',
    statusText: 'No Content',
    headersList: HeadersList {
      [Symbol(headers map)]: [Map],
      [Symbol(headers map sorted)]: null
    },
    urlList: [ [URL] ],
    body: null
  },
  [Symbol(headers)]: HeadersList {...}
 */

// DON'T MODIFY THIS CLASS
class ZenWatchActionHandler {
    handle_action = (payload) => {
        console.log('Received action payload: ', payload);
    }

    handle_error = (error) => {
        console.log('Error: ', error);
    }

    handle_fatal_error = (error) => {
        console.log('Fatal error: ', error);
    }
}

async function post_custom_message_to_discord_webhook(zenwatch, payload) {
    try {
        const response = await fetch(payload.params.webhook_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                content: payload.params.message,
            }),
        });
        if (!response.ok) {
            zenwatch.handle_error(response);
        }
        else {
            const resp_json = {
                status: response.status,
                statusText: response.statusText,
            }
            zenwatch.handle_action(resp_json);
        }
    } catch (err) {
        zenwatch.handle_fatal_error(err);
    }
}

// Learn more about discord webhooks development here: https://discord.com/developers/docs/resources/webhook
async function post_custom_message_to_discord_webhook_with_blockchain_data(zenwatch, payload) {
    try {
        const response = await fetch(payload.params.webhook_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                content: `${payload.params.message} ${payload.from} sent ${payload.to} value: ${payload.value}`,
            }),
        });
        if (!response.ok) {
            zenwatch.handle_error(response);
        }
        else {
            const resp_json = {
                status: response.status,
                statusText: response.statusText,
            }
            zenwatch.handle_action(resp_json);
        }
    } catch (err) {
        zenwatch.handle_fatal_error(err);
    }
}

function invoke_action() {

    // ---- DO NOT MODIFY THIS CODE ----
    const zenwatch = new ZenWatchActionHandler();
    // ---------------------------------
    // Replace the webhook_url with your own discord webhook URL & message with your own message
    const payload = {
        params: {
            webhook_url: "https://discord.com/api/webhooks/xx/yy",
            message: "Hi,",
        },
        to: '0xbAaD23Aa7c387BD66BA0656F63527e5b54548bEe',
        from: '0xeE52f6E8F8F075Bb6119958c1ACeB16C788e57d6',
        value: '1000000000000.0',
    };

    post_custom_message_to_discord_webhook(zenwatch, payload).then(() => {
        console.log('Action completed!');
    }).catch((err) => {
        console.log('Action failed: ', err);
    });
}

// Call the main function
invoke_action();