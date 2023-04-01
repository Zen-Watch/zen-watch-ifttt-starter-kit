const { ethers } = require("ethers");

// Think of a Zen.Watch IFTTT trigger like a middleware to keep tabs on web3 events of your choice
// Currently. Zen.Watch supports Polygon & Ethereum triggers only, but we plan to expand to other EVM chains soon
console.log('Welcome to Zen.Watch IFTTT EVM trigger development!');

let is_trigger_invoked = false;

// This class mimics how Zen.Watch handles your trigger
// This class prints the payload to the console, while in production, the appropriate action will be invoked
// DON'T MODIFY THIS CLASS
class ZenWatchTriggerHandler {
    handle_trigger = (payload) => {
        console.log('Received trigger payload: ', payload);
    }

    handle_error = (error) => {
        console.log('Error: ', error);
    }

    handle_fatal_error = (error) => {
        console.log('Fatal error: ', error);
    }
}

// DON'T MODIFY THIS FUNCTION
function get_alchemy_provider(target_resource_name) {
    switch (target_resource_name) {
        case 'ethereum_mainnet':
            return new ethers.providers.AlchemyProvider('homestead', ALCHEMY_API_KEY);
        case 'matic_mainnet':
            return new ethers.providers.AlchemyProvider('matic', ALCHEMY_API_KEY);
        default:
            return new ethers.providers.AlchemyProvider('matic', ALCHEMY_API_KEY);
    }
}

// This is an example trigger function to serve as a reference
async function watch_erc_token_deposit(zenwatch, payload, ethers, provider) {
    try {
        console.log('Watching for ERC20 token deposits...');
        const contract = new ethers.Contract(payload.contract_address, [
            'event Transfer(address indexed from, address indexed to, uint256 value)',
        ], provider);

        const listener = (from, to, amount, event) => {
            if (to.toUpperCase() === payload.target_address.toUpperCase()) {
                let info = {
                    from: from,
                    to: to,
                    value: ethers.utils.formatUnits(amount, 6),
                    data: event
                }
                zenwatch.handle_trigger(info);
            }
        };

        contract.on('Transfer', listener);
        return contract;
    } catch (err) {
        zenwatch.handle_fatal_error(err);
    }
}

async function watch_erc_token_send(zenwatch, payload, ethers, provider) {
    try {
        const contract = new ethers.Contract(payload.contract_address, [
            'event Transfer(address indexed from, address indexed to, uint256 value)',
        ], provider);

        const listener = (from, to, amount, event) => {
            if (from.toUpperCase() === payload.target_address.toUpperCase()) {
                let info = {
                    from: from,
                    to: to,
                    value: ethers.utils.formatUnits(amount, 6),
                    data: event
                }
                zenwatch.handle_trigger(info);
            }
        };

        contract.on('Transfer', listener);
        return contract;
    } catch (err) {
        zenwatch.handle_fatal_error(err);
    }
}


// Modify this code, and add your own trigger logic & rename the function
// You can use the sample code above as a reference
// Your runtime provides access to ethers v5 and the alchemy provider object 
// Replace with your alchemy API in the provider object
// Please remember to remove any console.log & comment statements before submitting your code
// Once you are done, please submit this method using the Zen.Watch portal
async function your_evm_trigger(zenwatch, payload, ethers, provider) {
    try {
        // Add your trigger logic here
    } catch (err) {
        // Fatal error happen mostly due to incorrect payload format, but could also happen due to platform errors
        // But logging this helps us debug your trigger
        zenwatch.handle_fatal_error(err);
    }
}

// Get an alchemy API key from https://www.alchemy.com/
const ALCHEMY_API_KEY = "your-api-key"; // Replace with your alchemy API key
const target_resource_name = "polygon_mainnet"; // Replace with your target resource name

function invoke_triger_function() {
    console.log('Invoking EVM trigger function...');
    // --------- DON'T MODIFY THIS SECTION ----------
    const zenwatch = new ZenWatchTriggerHandler();
    const provider = get_alchemy_provider(target_resource_name);
    // ----------------------------------------------
    // --------- MODIFY THIS SECTION ----------------
    // Comment out the sample code and and uncomment the your_evm_trigger function
    // Define your payload object, which is the input json to your function
    // this is the same as the input json you defined in the Zen.Watch portal
    const payload = {
        "contract_address": "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
        "target_address": "0xbAaD23Aa7c387BD66BA0656F63527e5b54548bEe"
    }

    watch_erc_token_deposit(zenwatch, payload, ethers, provider).then((contract) => {
        //console.log('Contract: ', contract);
    }).catch((err) => {
        console.log('Error: ', err);
    });
    // ----------------------------------------------
    // your_evm_trigger(zenwatch, payload, ethers, provider).then((contract) => {
    //     console.log('Contract: ', contract);
    // }).catch((err) => {
    //     console.log('Error: ', err);
    // });
}

function run_task() {
    console.log('Running task... EVM Triggers are long-running, so you should see this message every 10 seconds.');
    if (!is_trigger_invoked) {
        invoke_triger_function();
        is_trigger_invoked = true;
    }
    setTimeout(run_task, 10000);
}

run_task();
