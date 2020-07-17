import React, {useState, useEffect} from 'react';
import { Stage, Layer, Circle, Image } from "react-konva";
import { useSelector, useDispatch } from "react-redux";
import { addDeskProduct, showProductModal, deselectAllDeskProducts, selectDeskProduct, setCurrentDeskProduct } from '../../redux/actions';


export default function Canvas(props) {

    const dispatch = useDispatch();
    const deskProducts = useSelector(store => store.deskProducts);
    const [image, setImage] = useState(new window.Image());

    useEffect(() => {
        const img = new window.Image();
        img.src = props.image;
        img.onload = () => {
            var scale = Math.min((600/img.width),(600/img.height));
            img.width = img.width*scale;
            img.height = img.height*scale;
            setImage(img);
        }
      }, [props.image]);

    const layerHandleClick = (e) => {
        if (props.share && !e.target.attrs.radius) {
            let newProduct = {
                coordX: e.evt.layerX,
                coordY: e.evt.layerY,
                saved: false
            };
            dispatch(setCurrentDeskProduct(newProduct));
            dispatch(addDeskProduct(newProduct, false, true));
            dispatch(showProductModal());
        }
    }

    const handleHover = (e) => {
        if (e.target.attrs.deskProduct) {
            dispatch(selectDeskProduct(e.target.attrs.deskProduct));
        } else {
            dispatch(deselectAllDeskProducts());
        }
    }
    
    return (
    <div className={props.show ? "Canvas" : "hidden"} style={{zIndex: 1050}}>
        <Stage width={600} height={500} onMouseOver={handleHover}>
            <Layer onClick={layerHandleClick} >
            <Image x={0} y={0} image={image} />
            
            {deskProducts.allIds.map((id, i) =>  
                {
                    let { deskProduct, selected } = deskProducts.byIds[id];
                    return (<Circle 
                    key={i}
                    x={deskProduct.coordX} 
                    y={deskProduct.coordY} 
                    width={ selected ? 30 : 20} 
                    height={ selected ? 30 : 20} 
                    fill={ "white" }
                    shadowBlur={2}
                    opacity={ 1 }
                    deskProduct={deskProduct}
                    />)
                }
            )}
            </Layer>
        </Stage>
      </div>
  )
}