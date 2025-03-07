"use strict";
var wphys;
(function (wphys) {
    class wengine {
        tick() {
            this.scene.doTickRender();
        }
        constructor() {
            this.tick_speed = 60;
            this.wobjdict = [];
            this.scene = new wphys.ui.wscene(this);
            new wphys.core.wobj(this.scene, 10, new wphys.math.vector2(250, 250));
            console.log(this.initialTick());
        }
        initialTick() {
            return setInterval(() => { this.tick(); }, 1000 / this.tick_speed);
        }
        setTickSpeed(ts) {
            this.tick_speed = ts;
        }
        getTickSpeed() {
            return this.tick_speed;
        }
    }
    wphys.wengine = wengine;
})(wphys || (wphys = {}));
var wphys;
(function (wphys) {
    var core;
    (function (core) {
        // Physics Collision Bounding Box
        /*
            NOTE: Bounding Boxes are defined by two points, one in the bottom left corner and one in the top right corner
                - Both points are defined by two vector2, each a vector from the center of the model
                - The center of the bounding box is ALWAYS attached to the center of the wobj.
        */
        class bbox2d {
            constructor(parentWobj, leftVertice, rightVertice) {
                if (leftVertice == null || rightVertice == null) {
                    throw new Error("Invalid Bounding Box! Automatic Bounding Box Fitting Not Implemented!");
                }
                else {
                    this.parentWobj = parentWobj;
                    this.vR = rightVertice;
                    this.vL = leftVertice;
                }
            }
        }
        core.bbox2d = bbox2d;
    })(core = wphys.core || (wphys.core = {}));
})(wphys || (wphys = {}));
var wphys;
(function (wphys) {
    var core;
    (function (core) {
        class wobj {
            // Implemented as a simple square for testing
            constructor(scene, length, startpos) {
                this.restitution = 0.999;
                this.gravity = true;
                // Object Creation 
                this.pos = startpos;
                this.scene = scene;
                this.vel = new wphys.math.vector2(0, 0);
                this.accl = new wphys.math.vector2(0, 0);
                let vL = new wphys.math.vector2(0 - length, 0 - length);
                let vR = new wphys.math.vector2(length, length);
                this.boundingBox = new wphys.core.bbox2d(this, vL, vR);
                // Object Assignment
                this.scene.engine.wobjdict.push(this);
            }
            doTick() {
                if (this.gravity == true)
                    this.accl = new wphys.math.vector2(0, 0.98);
                this.vel = wphys.math.v2tools.addvec2(this.vel, this.accl);
                // Check one step ahead, adding bounding box points to position to calculate where it impacts.
                // If it crosses the edges defined by the vectors on the canvas, invert the velocity in the direction away from the wall.
                let nextsteppos = wphys.math.v2tools.addvec2(this.pos, this.accl);
                let nextstepbboxlp = wphys.math.v2tools.addvec2(nextsteppos, this.boundingBox.vL);
                let nextstepbboxrp = wphys.math.v2tools.addvec2(nextsteppos, this.boundingBox.vR);
                console.log(nextstepbboxlp);
                console.log(nextstepbboxrp);
                if (nextstepbboxlp.x < 0 || nextstepbboxrp.x > this.scene.rcorner.x) {
                    this.vel.x = (0 - this.restitution * this.vel.x);
                    // Inverts Velocity, then recalculates nextsteppos;
                    nextsteppos = wphys.math.v2tools.addvec2(this.vel, this.accl);
                }
                if (nextstepbboxrp.y < 0 || nextstepbboxlp.y > this.scene.lcorner.y) {
                    this.vel.y = (0 - this.restitution * this.vel.y);
                    // Inverts Velocity, then recalculates nextsteppos;
                    nextsteppos = wphys.math.v2tools.addvec2(this.vel, this.accl);
                }
                this.pos = wphys.math.v2tools.addvec2(this.pos, this.vel);
            }
        }
        core.wobj = wobj;
    })(core = wphys.core || (wphys.core = {}));
})(wphys || (wphys = {}));
var wphys;
(function (wphys) {
    var math;
    (function (math) {
        class v2tools {
            static addvec2(v1, v2) {
                let fx = v1.x + v2.x;
                let fy = v1.y + v2.y;
                return new math.vector2(fx, fy);
            }
            static multvec2(v1, v2) {
                let fx = v1.x * v2.x;
                let fy = v1.y * v2.y;
                return new math.vector2(fx, fy);
            }
        }
        math.v2tools = v2tools;
    })(math = wphys.math || (wphys.math = {}));
})(wphys || (wphys = {}));
var wphys;
(function (wphys) {
    var math;
    (function (math) {
        class vector2 {
            constructor(xval, yval) {
                this.x = 0;
                this.y = 0;
                if (xval == undefined || yval == undefined) {
                    this.x = 0;
                    this.y = 0;
                }
                else {
                    this.x = xval;
                    this.y = yval;
                }
            }
        }
        math.vector2 = vector2;
    })(math = wphys.math || (wphys.math = {}));
})(wphys || (wphys = {}));
var wphys;
(function (wphys) {
    var tools;
    (function (tools) {
        class devtools {
            static renderDevBrushes() {
            }
        }
        devtools.DTEnable = false;
        tools.devtools = devtools;
    })(tools = wphys.tools || (wphys.tools = {}));
})(wphys || (wphys = {}));
var wphys;
(function (wphys) {
    var ui;
    (function (ui) {
        class wscene {
            constructor(parentengine) {
                this.engine = parentengine;
                let canvas = document.getElementById("wphys-root");
                this.rcorner = new wphys.math.vector2(canvas.width, 0);
                this.lcorner = new wphys.math.vector2(0, canvas.height);
                this.context = canvas.getContext("2d");
            }
            doTickRender() {
                let context = this.context;
                context.beginPath();
                context.lineWidth = 1;
                context.strokeStyle = "#000000";
                context.fillStyle = "#ffffff";
                context.rect(0, 0, this.rcorner.x, this.lcorner.y);
                context.fill();
                context.closePath();
                this.engine.wobjdict.forEach((wobj) => {
                    wobj.doTick();
                    context.beginPath();
                    context.strokeStyle = "#00ff00";
                    context.fillStyle = "#ffffff";
                    context.lineWidth = 5;
                    let bboxlnx, bboxlny, bboxrnx, bboxrny;
                    //console.log(wobj.pos.y);
                    let VlC = wphys.math.v2tools.addvec2(wobj.pos, wobj.boundingBox.vL);
                    let VrC = wphys.math.v2tools.addvec2(wobj.pos, wobj.boundingBox.vR);
                    bboxlnx = VlC.x;
                    bboxlny = wobj.pos.y + wobj.boundingBox.vL.y;
                    bboxrnx = wobj.pos.x + wobj.boundingBox.vR.x;
                    bboxrny = VrC.y;
                    let bboxW = Math.abs(wobj.boundingBox.vL.x) + Math.abs(wobj.boundingBox.vR.x);
                    let bboxH = Math.abs(wobj.boundingBox.vL.y) + Math.abs(wobj.boundingBox.vR.y);
                    context.rect(bboxlnx, bboxrny, bboxW, bboxH);
                    context.stroke();
                });
            }
        }
        ui.wscene = wscene;
    })(ui = wphys.ui || (wphys.ui = {}));
})(wphys || (wphys = {}));
