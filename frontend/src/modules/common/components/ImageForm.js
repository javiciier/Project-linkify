import {useRef, useState} from 'react';
import { Button, FormLabel, Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import {PropTypes} from 'prop-types';

/* ************************************ ESTILOS (CSS) ************************************ */
const useStyles = makeStyles( () => ({
    component: {
        display: 'flex',
        flexDirection: 'inline',
        justifyContent: 'center',
        //alignItems: 'center',
        margin: '1vh 0 1vh 0'
    },
    label: {
        margin: '1em',
        fontSize: '1em',
        fontWeight: 'bold',
        color: 'grey'

    },
    input: {
        display: 'none',
    },
    button: {
        background: '#E8F1F5',
        fontWeight: 'bold',
        fontSize: '1em',
    },
    imgPreview : {

    }
}))

/* ************************************ COMPONENTE ************************************ */
/**
 * Componente para insertar una imagen en un formulario.
 * MÁS INFO:
 *  - https://medium.com/web-dev-survey-from-kyoto/how-to-customize-the-file-upload-button-in-react-b3866a5973d8
 */
const ImageForm = ({onChangeCallback, formName, labelText}) => {
    const styles = useStyles();
    const [imageB64String, setImageB64String] = useState('');
    let hiddenInput = useRef();

    /* ************************************ FUNCIONES ************************************ */
    const handleClick = () => {
        hiddenInput.current.click();
    };

    const handleChange = (e) => {
        // Extraer imagen
        const image = e.target.files[0];

        // Convertir imagen a string en Base64 cuando se cargue fichero
        const reader = new FileReader();
        reader.onload = () => {
            let b64String = reader.result
                                .replace('data:', '')
                                .replace(RegExp(/^.+,/,), '');
            setImageB64String(b64String);
        }
        reader.readAsDataURL(image);

        onChangeCallback();
    }


    /* *********************************** COMPONENTE ************************************ */
    return (
        <>
            <Input
                id={formName}
                className={styles.input}
                type='file'
                acept='images/*'
                inputRef={hiddenInput}
                onChange={handleChange}
            />


            <div className={styles.component}>
                <FormLabel className={styles.label}>
                    {labelText}
                </FormLabel>

                { (imageB64String) ?
                    <img
                        className={styles.imgPreview}
                        src={`data:image/png;base64, ${imageB64String}`}
                    />
                    :
                    <Button
                        className={styles.button}
                        onClick={handleClick}
                    >
                        Subir imagen
                    </Button>
                }
                {/* TODO: Añadir un botón para borrar imagen cargada (y poder subir otra si usuario desea) */}
            </div>
        </>
    )
}


ImageForm.propTypes = {
    onChangeCallback : PropTypes.func,
    formName : PropTypes.string.isRequired,
    labelText : PropTypes.string,
}

export default ImageForm;