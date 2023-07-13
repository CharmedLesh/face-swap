import { FC, ChangeEvent } from 'react';
import { IUploadImageResponse } from '../../../interfaces/ImageRequests.interface';
import { UploadImage } from '../../../assets';
import styles from './ImageInput.module.scss';

interface IImageInputProps {
    setImageData: (data: IUploadImageResponse, type: 'uploaded' | 'result') => void;
    sendImage: (image: File) => Promise<IUploadImageResponse | undefined>;
    dropImageData: () => void;
}

export const ImageInput: FC<IImageInputProps> = (props) => {
    const { setImageData, sendImage, dropImageData } = props;

    const fileInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const uploadResponse = await sendImage(event.target.files[0]);

            if (uploadResponse) {
                setImageData(uploadResponse, 'uploaded');
            } else {
                dropImageData();
            }
        }
    };

    return (
        <div className={styles.wrapper}>
            <label className={styles.label} htmlFor="file_input">
                <div className={styles.iconContainer}>
                    <UploadImage className={styles.uploadImageIcon} />
                </div>
                <div className={styles.labelText} />
            </label>
            <input
                className={styles.fileInput}
                aria-describedby="file_input_help"
                id="file_input"
                type="file"
                accept="image/png, image/jpeg"
                onChange={fileInputChange}
            />
            <div className={styles.info} id="file_input_help">
                JPG, PNG
            </div>
        </div>
    );
};
