import { FC } from 'react';
import styles from './Photocard.module.scss';
import { IImageState } from '../../../interfaces/ImageState.interface';
import { IUploadImageResponse } from '../../../interfaces/ImageRequests.interface';
import { CardBack } from './components/CardBack/CardBack';
import { LoadingCard } from './components/LoadingCard/LoadingCard';

interface IPhotocardProps {
    imageData: IImageState | null;
    setImageData: (data: IUploadImageResponse, type: 'uploaded' | 'result') => void;
    sendImage: (image: File) => Promise<IUploadImageResponse | undefined>;
    dropImageData: () => void;
    isLoading: boolean;
}

export const Photocard: FC<IPhotocardProps> = (props) => {
    const { imageData, sendImage, setImageData, dropImageData, isLoading } = props;

    return (
        <div className={styles.cardWrapper}>
            <div className={styles.cardContainer}>
                {imageData ? (
                    imageData.type === 'uploaded' ? (
                        <img
                            src={`http://localhost:5000/images/uploaded/${imageData.image}`}
                            alt={`id-${imageData.id}`}
                            className={styles.face}
                        />
                    ) : (
                        <img
                            src={`http://localhost:5000/images/results/${imageData.image}`}
                            alt={`id-${imageData.id}`}
                            className={styles.face}
                        />
                    )
                ) : (
                    <div className={styles.blankCard}>Paste image here</div>
                )}
                {isLoading && (
                    <div className={styles.loadingCard}>
                        <LoadingCard />
                    </div>
                )}
                {!isLoading && (
                    <div className={styles.back}>
                        <CardBack sendImage={sendImage} setImageData={setImageData} dropImageData={dropImageData} />
                    </div>
                )}
            </div>
        </div>
    );
};
