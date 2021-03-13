import { Controller } from "stimulus"

export default class extends Controller {
    play() {
        this.element.children[1].children[0].play();
    }
}
