namespace wphys.ui {
    export class wscene {
        lcorner:wphys.math.vector2;
        rcorner:wphys.math.vector2;
        engine:wphys.wengine;

        context:CanvasRenderingContext2D;

        constructor(parentengine:wphys.wengine) {
            this.engine = parentengine;

            let canvas:HTMLCanvasElement = document.getElementById("wphys-root") as HTMLCanvasElement;
            this.rcorner = new wphys.math.vector2(canvas.width,0);
            this.lcorner = new wphys.math.vector2(0,canvas.height);
            this.context = canvas.getContext("2d") as CanvasRenderingContext2D;



        }

        public doTickRender() {
            let context = this.context;
            context.beginPath();
            context.lineWidth = 1;
            context.strokeStyle = "#000000";
            context.fillStyle = "#ffffff";
            context.rect(0,0,this.rcorner.x,this.lcorner.y);
            context.fill();
            context.closePath();
            this.engine.wobjdict.forEach((wobj:wphys.core.wobj) => {
                wobj.doTick();
                context.beginPath();
               context.strokeStyle = "#00ff00";
               context.fillStyle = "#ffffff";
               context.lineWidth = 5;
               let bboxlnx,bboxlny,bboxrnx,bboxrny;
               //console.log(wobj.pos.y);

               let VlC = math.v2tools.addvec2(wobj.pos, wobj.boundingBox.vL);
               
               let VrC = math.v2tools.addvec2(wobj.pos, wobj.boundingBox.vR);
               bboxlnx = VlC.x;
               bboxlny = wobj.pos.y+wobj.boundingBox.vL.y;
               bboxrnx = wobj.pos.x+wobj.boundingBox.vR.x;
               bboxrny = VrC.y;

               let bboxW = Math.abs(wobj.boundingBox.vL.x) + Math.abs(wobj.boundingBox.vR.x);
               let bboxH = Math.abs(wobj.boundingBox.vL.y) + Math.abs(wobj.boundingBox.vR.y);
               context.rect(bboxlnx,bboxrny,bboxW,bboxH);



               context.stroke();

            })
        }
    }
}