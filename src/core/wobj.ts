namespace wphys.core {
    export class wobj {
        // Essentials
        public pos:wphys.math.vector2;
        private vel:wphys.math.vector2;
        private accl:wphys.math.vector2;
        public boundingBox:wphys.core.bbox2d;
        private scene:wphys.ui.wscene;

        private restitution:number = 0.999;
        public gravity:boolean = true;

        // Implemented as a simple square for testing
        constructor(scene:wphys.ui.wscene, length:number, startpos:wphys.math.vector2) {

            // Object Creation 
            this.pos = startpos;
            this.scene = scene;
            this.vel = new wphys.math.vector2(0,0); 
            this.accl = new wphys.math.vector2(0,0); 
            let vL = new wphys.math.vector2(0-length,0-length);
            let vR = new wphys.math.vector2(length,length);
            this.boundingBox = new wphys.core.bbox2d(this, vL, vR);

            // Object Assignment
            this.scene.engine.wobjdict.push(this);
        }

        doTick() {
            if (this.gravity == true) this.accl = new wphys.math.vector2(0,0.98);
            this.vel = math.v2tools.addvec2(this.vel,this.accl);
            // Check one step ahead, adding bounding box points to position to calculate where it impacts.
            // If it crosses the edges defined by the vectors on the canvas, invert the velocity in the direction away from the wall.
            let nextsteppos = math.v2tools.addvec2(this.pos, this.accl);
            let nextstepbboxlp = math.v2tools.addvec2(nextsteppos,this.boundingBox.vL);
            let nextstepbboxrp = math.v2tools.addvec2(nextsteppos,this.boundingBox.vR);
            console.log(nextstepbboxlp);
            console.log(nextstepbboxrp);
            if (nextstepbboxlp.x < 0 || nextstepbboxrp.x > this.scene.rcorner.x) {
                this.vel.x = (0-this.restitution * this.vel.x);
                // Inverts Velocity, then recalculates nextsteppos;
                nextsteppos = math.v2tools.addvec2(this.vel,this.accl);
            }
            if (nextstepbboxrp.y<0 || nextstepbboxlp.y > this.scene.lcorner.y) {
                this.vel.y = (0- this.restitution * this.vel.y);
                // Inverts Velocity, then recalculates nextsteppos;
                nextsteppos = math.v2tools.addvec2(this.vel,this.accl);
            }
            this.pos = math.v2tools.addvec2(this.pos, this.vel);
        }

    }
}