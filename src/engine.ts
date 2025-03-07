

namespace wphys {

    export class wengine {
        public wobjdict: wphys.core.wobj[];
        public scene: wphys.ui.wscene;
        private tick_speed = 60;


        public tick() {
            this.scene.doTickRender();
        }
        constructor() {
            this.wobjdict = [];
            this.scene = new wphys.ui.wscene(this);

            new wphys.core.wobj(this.scene, 10, new wphys.math.vector2(250,250));
            console.log(this.initialTick());
            
        }
    
        private initialTick() {
            return setInterval(() => {this.tick()}, 1000/this.tick_speed);
        }

        public setTickSpeed(ts:number) {
            this.tick_speed = ts;
        }
        
        public getTickSpeed() {
            return this.tick_speed;
        }
    }
}