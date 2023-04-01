// Think of action like a middleware to relay your web3 output under watch to your web2 server
// Zen.Watch currently offers POST and GET actions, for most use cases, POST is sufficient
// If you need to have your own custom action, you can write your own action logic using the sample code below
// And submit the action function using Zen.Watch portal
// For more questions, please reach out on our discord
console.log('Welcome to Zen.Watch IFTTT EVM action development!');

// This class mimics how Zen.Watch handles your action
// This class prints the payload to the console, while in production, the appropriate action will be invoked
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

// DON'T MODIFY THIS FUNCTION
// This is a sample function that sends a POST request to a URL with the API key in the header
// Then calls the appropriate Zen.Watch handler to handle the response or error
// You can use this function as a reference to write your own action logic
async function post_with_api_key_on_header(zenwatch, payload) {
    try {
        // Payload object contains the web3 output of your action as well as any additional parameter you configure with the instance
        // payload.params holds your configured input and rest of the parameters flow through the payload object, ex. payload.from comes from the web3 output
        // Reach out to our discord to get help on how to use the payload object or develop your own action logic, we are happy to help!
        const response = await fetch(payload.params.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': payload.params.api_key,
            },
            body: JSON.stringify({
                email: payload.params.email,
                from: payload.from,
                to: payload.to,
                value: payload.value,
            }),
        });

        const resp_json = await response.json();
        if (!response.ok) {
            zenwatch.handle_error(resp_json);
        }
        else {
            zenwatch.handle_action(resp_json);
        }
    }
    catch (err) {
        zenwatch.handle_fatal_error(err);
    }
}

// You might need a new action logic, if you run on a different protocol or authentication scheme 
// Modify this code, and add your own action logic & rename the function
// You can use the sample code above as a reference
// Please remember to remove any console.log statements before submitting your code
// Once you are done, please submit this method using the Zen.Watch portal
async function your_new_action(zenwatch, payload) {
    try {
        // Add your action logic here
    } catch (err) {
        // Fatal error happen mostly due to incorrect payload format, but could also happen due to platform errors
        // But logging this helps us debug your action
        zenwatch.handle_fatal_error(err);
    }
}

function invoke_action() {

    // ---- DO NOT MODIFY THIS CODE ----
    const zenwatch = new ZenWatchActionHandler();
    // ---------------------------------

    // This is a sample input json to your action
    // params data comes from the input you provided during instance creation in the zen.watch portal
    // from, to, value comes from the web3 output of your action
    // In this action, we pass on the data to your web2 server to handle as you see fit
    const payload = {
        "params": {
            "url": "https://example.com/api/endpoint",
            "api_key": "my_api_key",
            "email": "user@example.com"
        },
        "from": "0x123...",
        "to": "0x456...",
        "value": "1000000000000000000"
    };

    post_with_api_key_on_header(zenwatch, payload).then(() => {
        console.log('Action completed!');
    }).catch((err) => {
        console.log('Action failed: ', err);
    });
    // ------------------------------------------------------------
    // your_new_action(zenwatch, payload).then(() => {
    //    console.log('Action completed!');
    // }).catch((err) => {
    //    console.log('Action failed: ', err);
    // });


}

// Call the main function
invoke_action();