import { Controller } from "stimulus"

export default class extends Controller {
    static targets = [ "input" ];

    initialize() {
        this.dT = new ClipboardEvent('').clipboardData || new DataTransfer();
        this.chunks = [];
        this.recorder = null;
        this.isActive = false;
        this.stream = null;
    }

    record() {
        if (this.isActive) {
            return;
        }
        navigator.mediaDevices.getUserMedia({audio: true})
            .then(stream => {
                this.stream = stream;
                this.recorder = new MediaRecorder(stream, {type: 'audio/wav'});
                this.recorder.start();
                this.isActive = true;
                this.recorder.addEventListener('dataavailable', e => {
                    this.chunks.push(e.data);
                });
            }).catch( () => { alert("Feature non supportée")})
        ;
    }
    pause() {
        if (this.isActive) {
            this.recorder.stop();
            this.removeStream();
            this.isActive = false;
        }
    }
    save() {
        if (this.stream === null) {
            return;
        }
        this.pause();
        this.recorder.addEventListener('stop', () => {
            let audioBlob = new Blob(this.chunks, {type: 'audio'});
            let file = new File([audioBlob], 'audio.wav', {type: 'audio/wav'});
            this.dT.items.add(file);
            this.inputTarget.files = this.dT.files;
            this.inputTarget.parentNode.submit();
            this.removeStream();
            this.initialize();
        });
    }

    removeStream() {
        if (this.stream === null) {
            return;
        }
        this.stream.getTracks().forEach((track) => track.stop())
        this.stream = null;
    }
}
