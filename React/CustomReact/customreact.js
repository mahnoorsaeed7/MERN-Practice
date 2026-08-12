// inefficient == manually setting up all attributes 

   /* function customreander(reactElement, container) {
    const domElement = document.createElement(reactElement.type);
    domElement.innerHTML = reactElement.Children;
    domElement.setAttribute("href", reactElement.props.href);
    domElement.setAttribute("target", reactElement.props.target);

    container.appendChild(domElement)
    } */


 function customreander(reactElement, container){
    const domElement =  document.createElement(reactElement.type)
    domElement.innerHTML = reactElement.Children
    for (const prop in reactElement.props) {
        if (prop === 'children') continue;        
        domElement.setAttribute(prop , reactElement.props[prop])
        container.appendChild(domElement)
    }
 }


const maincontainer = document.querySelector("#root");

const reactElement = {
  type: "a",
  props: {
    href: "https://google.com",
    target: "_blank",
  },
  Children: "click to go to google webpage",
};

customreander(reactElement, maincontainer);
