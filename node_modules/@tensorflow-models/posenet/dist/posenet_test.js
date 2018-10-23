"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tf = require("@tensorflow/tfjs");
var jasmine_util_1 = require("@tensorflow/tfjs-core/dist/jasmine_util");
var posenetModel = require("./posenet_model");
jasmine_util_1.describeWithFlags('PoseNet', tf.test_util.NODE_ENVS, function () {
    var net;
    beforeAll(function (done) {
        spyOn(posenetModel.mobilenetLoader, 'load').and.callFake(function () {
            return {
                predict: function () { return tf.zeros([1000]); },
                convToOutput: function (mobileNetOutput, outputLayerName) {
                    var shapes = {
                        'heatmap_2': [16, 16, 17],
                        'offset_2': [16, 16, 34],
                        'displacement_fwd_2': [16, 16, 32],
                        'displacement_bwd_2': [16, 16, 32]
                    };
                    return tf.zeros(shapes[outputLayerName]);
                }
            };
        });
        posenetModel.load()
            .then(function (posenetInstance) {
            net = posenetInstance;
        })
            .then(done)
            .catch(done.fail);
    });
    it('estimateSinglePose does not leak memory', function (done) {
        var input = tf.zeros([513, 513, 3]);
        var beforeTensors = tf.memory().numTensors;
        net.estimateSinglePose(input)
            .then(function () {
            expect(tf.memory().numTensors).toEqual(beforeTensors);
        })
            .then(done)
            .catch(done.fail);
    });
    it('estimateMultiplePoses does not leak memory', function (done) {
        var input = tf.zeros([513, 513, 3]);
        var beforeTensors = tf.memory().numTensors;
        net.estimateMultiplePoses(input)
            .then(function () {
            expect(tf.memory().numTensors).toEqual(beforeTensors);
        })
            .then(done)
            .catch(done.fail);
    });
});
//# sourceMappingURL=posenet_test.js.map