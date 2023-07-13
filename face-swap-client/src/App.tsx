import { useState, useEffect } from 'react';
import axios from 'axios';
import { IUploadImageResponse } from './interfaces/ImageRequests.interface';
import { IImageState } from './interfaces/ImageState.interface';
import styles from './App.module.scss';
import { Photocard } from './components/cards/Photocard';
import { ActionButton } from './components/buttons/ActionButton/ActionButton';
import { ArrowsButton } from './components/buttons/ArrowsButton/ArrowsButton';

function App() {
    const [firstImage, setFirstImage] = useState<IImageState | null>(null);
    const [secondImage, setSecondImage] = useState<IImageState | null>(null);

    const [status, setStatus] = useState<'pending' | 'available' | 'unavailable'>('unavailable');

    useEffect(() => {
        if (firstImage && secondImage) {
            if (firstImage.type === 'uploaded' && secondImage.type === 'uploaded') {
                setStatus('available');
            } else {
                setStatus('unavailable');
            }
        } else {
            setStatus('unavailable');
        }
    }, [firstImage, secondImage]);

    const sendImage = async (image: File) => {
        if (image) {
            if (image.type === 'image/png' || image.type === 'image/jpeg') {
                const apiUrl = 'http://localhost:5000/images/upload';

                const formData = new FormData();
                formData.append('image', image);

                try {
                    const response = await axios.post(apiUrl, formData);
                    const data: IUploadImageResponse = response.data;
                    return data;
                } catch (error) {
                    if (axios.isAxiosError(error)) {
                        window.alert(error.message);
                    } else {
                        window.alert(error);
                    }
                }
            } else {
                window.alert('Only jpg or png allowed');
            }
        }
    };

    const setFirstImageData = (data: IUploadImageResponse, type: 'uploaded' | 'result') => {
        setFirstImage({ ...data, type: type });
    };

    const dropFirstImageData = () => {
        setFirstImage(null);
    };

    const setSecondImageData = (data: IUploadImageResponse, type: 'uploaded' | 'result') => {
        setSecondImage({ ...data, type: type });
    };

    const dropSecondImageData = () => {
        setSecondImage(null);
    };

    const swapFacesAction = async () => {
        if (firstImage && secondImage) {
            if (firstImage.type === 'uploaded' && secondImage.type === 'uploaded') {
                const swapedFaces = await swapFaces(firstImage.image, secondImage.image);
                if (swapedFaces) {
                    setStatus('unavailable');
                    setFirstImage({ ...firstImage, image: swapedFaces.firstImage, type: 'result' });
                    setSecondImage({ ...secondImage, image: swapedFaces.secondImage, type: 'result' });
                } else {
                    setStatus('unavailable');
                    dropFirstImageData();
                    dropSecondImageData();
                }
            } else {
                window.alert('Paste NEW images');
            }
        } else {
            window.alert('Paste images');
        }
    };

    const swapFaces = async (firstImage: string, secondImage: string) => {
        setStatus('pending');
        const apiUrl = 'http://localhost:5000/images/swap-faces';

        try {
            const request = axios.post(apiUrl, { firstImage, secondImage });
            const response = await request;
            const data: { firstImage: string; secondImage: string } = response.data;

            return data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                window.alert(error.message);
            } else {
                window.alert(error);
            }
        }
    };

    return (
        <div className={styles.app}>
            <div className={styles.wrapper}>
                <div className={styles.cardsContainer}>
                    <Photocard
                        imageData={firstImage}
                        sendImage={sendImage}
                        setImageData={setFirstImageData}
                        dropImageData={dropFirstImageData}
                        isLoading={status === 'pending' ? true : false}
                    />
                    <ArrowsButton
                        actionHandler={swapFacesAction}
                        isActionAvailable={status === 'available' ? true : false}
                    />
                    <Photocard
                        imageData={secondImage}
                        sendImage={sendImage}
                        setImageData={setSecondImageData}
                        dropImageData={dropSecondImageData}
                        isLoading={status === 'pending' ? true : false}
                    />
                </div>
                <ActionButton
                    actionHandler={swapFacesAction}
                    isActionAvailable={status === 'available' ? true : false}
                />
            </div>
        </div>
    );
}

export default App;
