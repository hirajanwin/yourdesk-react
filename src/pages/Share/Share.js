import React, { useState } from 'react';
import ProductList from '../../components/ProductList/ProductList';
import ProductModal from '../../components/ProductModal/ProductModal';
import Canvas from '../../components/Canvas/Canvas';
import ShareForm from '../../components/ShareForm/ShareForm';
import Dropzone from 'react-dropzone';
import './Share.css';
import Fade from '../../components/Util/Fade';
import { Alert } from 'react-bootstrap';

export default function Share() {
    const [image, setImage] = useState(null);
    const [showAlert, setShowAlert] = useState("");

    const handleDrop = (e) => {
        if (e.length === 0) {
            setShowAlert("Sorry, only image files please!");
        } else {
            let file = e[0];
            let blob = URL.createObjectURL(file);
            setImage({
                blob: blob,
                file: file,
            });
        }
    }

    let show = (image !== null);

    const DrozoneComponent = (<Dropzone 
        onDrop={handleDrop}
        multiple={false}
        accept="image/*"
        >
        {({getRootProps, getInputProps}) => (
            <div {...getRootProps()} className="Dropzone">
                <input {...getInputProps()} />
                <p className="DropzonePrompt">Drop an image of your desk here.</p>
            </div>
        )}
        </Dropzone>);

    const onSuccessfulUpload = () => {
        setImage(null);
    }

    return (
        <div className="ShareBody">
            {<Fade in={showAlert ? true : false} component={<Alert onClick={() => setShowAlert("")} variant={'danger'} dismissible>{showAlert}</Alert>} />}
            <ProductModal/>
            { (!show) && <Fade in={!show} component={DrozoneComponent} />} 
            <div className="NewBody">
                {<Fade in={show} component={<Canvas show={show} share image={image ? image.blob : null}/>} />}
                {<Fade in={show} component={<ProductList show={show} share/>} />}
            </div>      
            <br/>
            <br/>
            <br/>
            {<Fade in={show} component={<ShareForm alert={setShowAlert} onSuccessfulUpload={onSuccessfulUpload} show={show} image={image} share/>} />}
        </div>
    );
}