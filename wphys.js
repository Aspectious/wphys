class wphysbox extends HTMLElement {
    static min_dim = "";
    constructor() {
        super();
    }

    connectedCallback() {
        this.setAttribute("id","wphysbox" + phys.wboxcount);
        console.log("we chill");
    }
}
class wengine {
    tick() {
        console.log("tick");
    }
    constructor() {
        setInterval(this.tick(), 1000);
    }



}
class obj {
}

class wphys {
    wboxcount = 0;
    constructor() {
        customElements.define("wphys-box",wphysbox);
        this.engine = new wengine();
    }
    static wbox = wphysbox;
}




const phys = new wphys();
