class InputController {
    constructor() {
        this.keys = {};
        this.init();
    }

    init() {
        document.addEventListener('keydown', (e) => {
            this.keys[e.key.toLowerCase()] = true;
        });

        document.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
        });
    }

    isPressed(key) {
        return this.keys[key.toLowerCase()] || false;
    }
}

export default InputController;
