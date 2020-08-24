const styleRules = `
    body {
        padding-bottom: 150px;
    }
    .bar-bottom {
        background: #1aa96a;
        background-image: linear-gradient(to right, #1aa96a , #0b434a);
        height: 72px;
        display: flex;
        justify-content: space-between;
        position: relative;
    }
    .arrow {
        border: solid white;
        border-width: 0 1.4px 1.4px 0;
        display: inline-block;
        padding: 8px;
        margin-top: 26px;
        margin-left: 26px;
        cursor: pointer;
    }
    .right {
        transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg);
    }
    .left {
        transform: rotate(135deg);
        -webkit-transform: rotate(135deg);
    }  
    .sticky {
        position: fixed;
        bottom: 0;
        width: 100%;
        z-index: 1;
    }
`;
class BottomBar extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        this.createComponent();
        let elements = document.getElementsByClassName('container-bar')[0];
        elements.classList.add("sticky");


        if (window.location.href.includes('detail')) {
            setCookie('route', 'detail');
            document.getElementsByClassName('arrow right')[0].style.display = "none";
        }

        if (getCookie('route') === null) {
            document.getElementsByClassName('arrow right')[0].style.display = "none";
        }

        console.log(window.location.href)
        console.log(window.location.href.includes('home'))

    }

    forward() {
        window.history.pushState(null, null, `${getCookie('route')}`);
        window.history.go();
    }

    back() {
        window.history.back();
    }

    createComponent() {
        let style = document.createElement("style");
        style.appendChild(document.createTextNode(styleRules));
        this.appendChild(style);

        let bar = this.createBar();
        this.appendChild(bar);

    }

    createBar() {

        let divContainer = document.createElement("div");
        divContainer.classList.add('container-bar');

        let divBar = document.createElement("div");
        divBar.classList.add("bar-bottom");

        let containerArrow = document.createElement("div");
        containerArrow.classList.add("container-arrow");

        let leftArrow = document.createElement("a");
        leftArrow.classList.add("arrow", "left");

        leftArrow.addEventListener('click', this.back)

        containerArrow.appendChild(leftArrow);

        let rightArrow = document.createElement("a");
        rightArrow.classList.add("arrow", "right");

        rightArrow.addEventListener('click', this.forward)

        containerArrow.appendChild(rightArrow);
        divBar.appendChild(containerArrow);

        divContainer.appendChild(divBar);

        return divContainer;
    }

}
customElements.define("bottom-bar", BottomBar);

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\[").replace(/[\]]/, "\]");
    var regex = new RegExp("[\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return null;
}

function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue + ";" + ";path=/";
}