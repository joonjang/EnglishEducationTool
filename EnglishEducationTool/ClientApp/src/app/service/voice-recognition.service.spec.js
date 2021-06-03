"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var voice_recognition_service_1 = require("./voice-recognition.service");
describe('VoiceRecognitionService', function () {
    var service;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(voice_recognition_service_1.VoiceRecognitionService);
    });
    it('should be created', function () {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=voice-recognition.service.spec.js.map