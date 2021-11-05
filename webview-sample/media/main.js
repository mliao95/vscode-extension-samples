// This script will be run within the webview itself
// It cannot access the main VS Code APIs directly.

(function () {
    const counter = /** @type {HTMLElement} */ (document.getElementById('lines-of-code-counter'));

    let currentCount = 0;
    counter.textContent = `${currentCount}`;

    setInterval(() => {
        counter.textContent = `${currentCount++} `;

        // Update state

        // Alert the extension when the cat introduces a bug
        if (Math.random() < Math.min(0.001 * currentCount, 0.05)) {
        }
    }, 100);

    // Handle messages sent from the extension to the webview
    window.addEventListener('message', event => {
        const message = event.data; // The json data that the extension sent
        switch (message.command) {
            case 'refactor':
                currentCount = Math.ceil(currentCount * 0.5);
                counter.textContent = `${currentCount}`;
                break;
        }
    });

    const imageElement = document.getElementById('testImage');
    if (imageElement) {
        for (const eventName of ['keydown', 'keyup', 'keypress']) {
            imageElement.addEventListener(eventName, event => {
                // @ts-ignore
                let keyboardEvent = event;
                switch (keyboardEvent.type) {
                    case 'keydown':
                      if (keyboardEvent instanceof KeyboardEvent && keyboardEvent.ctrlKey) {
                          keyboardEvent.preventDefault();
                      }
                      break;
                    case 'keyup':
                      break;
                    case 'keypress':
                      break;
                    default:
                      return;
                }
            });
        }
    }
}());
