# Zen.Watch IFTTT Developer Starter Kit

Zen.Watch starter kit for developers to build IFTTT triggers and actions for https://zen.watch

This is the open-source github repository behind the [Replit version of the developer kit](https://replit.com/@MarcoN4/ZenWatch-IFTTT-Starter-Kit).

We are maintaining this repo for the developers who prefer to build IFTTT templates from their computers instead of using Replit.

This repo contains all the dependencies and versions used at product runtime to test your new triggers against.

We plan to add to more fun IFTTT recipes to this open-source repository over the coming weeks and months! Stay tuned!

### Installation
``` npm install ```
Installs the dependencies for the the app with node command.

### Local Setup
- Go the the respective folder `triggers` or `actions`:
- Run the individual files with node js.

For example, to run the file `src/actions/discord_webhook_action.js:
- Replace your webhook details and execute the following command
``` nodejs src/actions/discord_webhook_action.js ```

### Developing new code
You can copy the node.js file or create a new method, test locally.

### Submit to Zen.Watch
Once you are satisfied, submit the new function to Zen.Watch using the [Admin Portal](https://admin.zen.watch)

Steps:
- Go to the create Trigger or Action section
- Fill out the details
- Submit the code
- Once approved, anyone from the community can use your code
- Please use the [discord community](https://discord.com/invite/7gMv9ZwgkV) for any questions
