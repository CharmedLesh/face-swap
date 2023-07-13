import { FC } from 'react';
import { IUploadImageResponse } from '../../../../../interfaces/ImageRequests.interface';
import { ImageInput } from '../../../../inputs/ImageInput/ImageInput';
import styles from './CardBack.module.scss';

interface ICardBackProps {
    setImageData: (data: IUploadImageResponse, type: 'uploaded' | 'result') => void;
    sendImage: (image: File) => Promise<IUploadImageResponse | undefined>;
    dropImageData: () => void;
}

export const CardBack: FC<ICardBackProps> = (props) => {
    const { setImageData, sendImage, dropImageData } = props;

    return (
        <div className={styles.wrapper}>
            <ImageInput sendImage={sendImage} setImageData={setImageData} dropImageData={dropImageData} />
        </div>
    );
};
