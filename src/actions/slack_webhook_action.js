console.log('Welcome to Zen.Watch IFTTT EVM action development!');

/**
 
https://api.slack.com/messaging/webhooks

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

// This example shows a simple action that posts a custom message to a Slack webhook
async function post_custom_message_to_slack_webhook(zenwatch, payload) {
    try {
        const response = await fetch(payload.params.webhook_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                text: payload.params.message,
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

// This example shows how to take the payload info from the blockchain and send it to a webhook
// We recommend setting the visibility to private for use-cases that are unique to your situation
async function post_custom_message_to_slack_webhook_with_blockchain_data(zenwatch, payload) {
    try {
        const response = await fetch(payload.params.webhook_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                text: `${payload.params.message} ${payload.from} sent ${payload.to} value: ${payload.value}`,
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
    // Replace the webhook_url with your own Slack webhook URL & message with your own message
    const payload = {
        params: {
            webhook_url: "https://hooks.slack.com/services/xx/yy/zz",
            message: "Hi,",
        },
        to: '0xbAaD23Aa7c387BD66BA0656F63527e5b54548bEe',
        from: '0xeE52f6E8F8F075Bb6119958c1ACeB16C788e57d6',
        value: '1000000000000.0',
    };

    post_custom_message_to_slack_webhook(zenwatch, payload).then(() => {
        console.log('Action completed!');
    }).catch((err) => {
        console.log('Action failed: ', err);
    });
}

// Call the main function
invoke_action();