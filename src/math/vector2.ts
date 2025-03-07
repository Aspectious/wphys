namespace wphys.math {
    export class vector2 {

        x:number = 0;
        y:number = 0;
        constructor(xval?:number,yval?:number) {
            if (xval == undefined || yval == undefined) {
                this.x = 0;
                this.y = 0;
            } else {
                this.x = xval;
                this.y = yval;
            }
        }
    }
}