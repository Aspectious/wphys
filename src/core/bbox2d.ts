namespace wphys.core {
    // Physics Collision Bounding Box
    /*
        NOTE: Bounding Boxes are defined by two points, one in the bottom left corner and one in the top right corner
            - Both points are defined by two vector2, each a vector from the center of the model
            - The center of the bounding box is ALWAYS attached to the center of the wobj.
    */
    export class bbox2d {
        public vL:wphys.math.vector2;
        public vR:wphys.math.vector2;
        private parentWobj: wphys.core.wobj;

        constructor(parentWobj:wphys.core.wobj, leftVertice?:wphys.math.vector2, rightVertice?:wphys.math.vector2) {
            if (leftVertice == null || rightVertice == null) {
                throw new Error("Invalid Bounding Box! Automatic Bounding Box Fitting Not Implemented!");
            } else {
                this.parentWobj = parentWobj;
                this.vR = rightVertice;
                this.vL = leftVertice;
            }
        }
        
    }
}
