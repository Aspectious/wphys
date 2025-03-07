namespace wphys.math {
    export class v2tools {
        static addvec2(v1:vector2, v2:vector2) {
            let fx = v1.x + v2.x;
            let fy = v1.y + v2.y;
            return new vector2(fx,fy);
        }

        static multvec2(v1:vector2, v2:vector2) {
            let fx = v1.x * v2.x;
            let fy = v1.y * v2.y;
            return new vector2(fx,fy);
        }
    }
}